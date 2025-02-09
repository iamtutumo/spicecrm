<?php

namespace SpiceCRM\modules\Administration\api\controllers;

use SpiceCRM\includes\database\DBManagerFactory;
use SpiceCRM\includes\DataStreams\StreamFactory;
use SpiceCRM\includes\ErrorHandlers\Exception;
use SpiceCRM\data\SpiceBean;
use SpiceCRM\modules\Relationships\Relationship;
use SpiceCRM\includes\ErrorHandlers\UnauthorizedException;
use SpiceCRM\includes\Logger\LoggerManager;
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
use SpiceCRM\includes\SpiceUI\SpiceUIConfLoader;
use SpiceCRM\includes\SpiceCache\SpiceCache;
use SpiceCRM\includes\SugarObjects\LanguageManager;
use SpiceCRM\includes\SugarObjects\SpiceConfig;
use SpiceCRM\includes\SugarObjects\SpiceModules;
use SpiceCRM\includes\SugarObjects\VardefManager;
use SpiceCRM\includes\utils\FileUtils;
use SpiceCRM\includes\utils\SpiceFileUtils;
use SpiceCRM\includes\utils\SpiceUtils;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\includes\SpiceFTSManager\SpiceFTSHandler;
use SpiceCRM\modules\Configurator\Configurator;
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryVardefs;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

use SpiceCRM\includes\ErrorHandlers\ForbiddenException;
use SpiceCRM\includes\authentication\AuthenticationController;

use Psr\Http\Message\ServerRequestInterface as Request;
use SpiceCRM\includes\SpiceSlim\SpiceResponse as Response;
use function DI\string;

class AdminController
{

    /**
     * post request that expects the username and password in the body
     * executes a git pull command with the params for username and password on the shell
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function pullFromRepository(Request $req, Response $res, array $args): Response {
        // get the body
        $postBody = $req->getParsedBody();

        // extract username and password or token from the body
        $username = str_replace('@','%40',$postBody['username']);
        if (empty($postBody['password'])){
            $password = $postBody['token'];
        } else
            $password = $postBody['password'];

        // execute git pull
        $gitPullLog = '';


        // get the remote url
        $output = '';
        exec("git config --get remote.origin.url", $output);



        // if success
        if (empty($postBody['password'])) {
            $remoteUrl = str_replace('//', '//' . $password . '@', $output);
        } else
            $remoteUrl = str_replace('//', '//' . $username . ':' . $password . '@', $output);

        $remoteUrl =  trim($remoteUrl[0], '.git');

        $currentBranch = null;
        exec("git branch --show-current", $currentBranch);

        exec("git pull $remoteUrl $currentBranch[0] 2>&1", $gitPullLog);


        // error handling if this fails
        if(empty($gitPullLog)){
            $gitPullLog = ['Something went wrong, please check the login credentials'];
        }

        return $res->withJson(['success' => true, 'output' => $gitPullLog]);

    }    public function showStatusRepository(Request $req, Response $res, array $args): Response {

        // execute git status
        $gitStatus = '';

        exec("git status", $gitStatus);

        return $res->withJson(['success' => true, 'output' => $gitStatus]);
    }

    /**
     * resets the cache
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function resetCache(Request $req, Response $res, array $args): Response {
        SpiceCache::instance()->resetFull();
        return $res->withJson(['success' => true]);
    }

    /**
     * build stats for the system
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws ForbiddenException
     */
    public function systemstats(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        $db = DBManagerFactory::getInstance();

        $statsArray = [];

        if (!$current_user->is_admin) {
            throw new ForbiddenException();
        }

        $dbSize = 0;
        $dbCount = 0;
        $dbStats = $db->getStats();
        $statsArray['database'] = $dbStats['tables'];
        // get the fts stats
        $statsArray['elastic'] = SpiceFTSHandler::getInstance()->getStats();

        $statsArray['uploadfiles'] = StreamFactory::getStats('upload');

        $params = $req->getQueryParams();
        if ($params['summary']) {
            return $res->withJson([
                'database' => ['size' => $dbStats['size'], 'count' => $dbStats['count']],
                'uploadfiles' => $statsArray['uploadfiles'],
                'elastic' => ['size' => $statsArray['elastic']['_all']['total']['store']['size_in_bytes'], 'count' => $statsArray['elastic']['_all']['total']['docs']['count']],
                'users' => $db->fetchByAssoc($db->fetchByAssoc("SELECT count(id) usercount FROM users WHERE status='Active'"))['usercount']
            ]);
        }
        return $res->withJson($statsArray);
    }

    /**
     * get function to read the contents of system default locales in config table
     *
     * @param Request $req
     * @param Response $res
     * @param $args
     * @return Response
     * @throws ForbiddenException
     */
    public function getGeneralSettings(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        $db = DBManagerFactory::getInstance();

        if (!$current_user->is_admin) {
            throw (new ForbiddenException('No administration privileges.'))->setErrorCode('notAdmin');
        }

        return $res->withJson([
            'system' => [
                'name' => SpiceConfig::getInstance()->config['system']['name'],
                'site_url' => SpiceConfig::getInstance()->config['site_url'],
                'unique_key' => SpiceConfig::getInstance()->config['unique_key'],
            ],
            'advanced' => [
                'developerMode' => SpiceConfig::getInstance()->config['developerMode'],
                'stack_trace_errors' => SpiceConfig::getInstance()->config['stack_trace_errors'],
                'dump_slow_queries' => SpiceConfig::getInstance()->config['dump_slow_queries'],
                'log_memory_usage' => SpiceConfig::getInstance()->config['log_memory_usage'],
                'slow_query_time_msec' => SpiceConfig::getInstance()->config['slow_query_time_msec'],
                'upload_maxsize' => SpiceConfig::getInstance()->config['upload_maxsize'],
                'upload_dir' => SpiceConfig::getInstance()->config['upload_dir'],
                'international_email_addresses' => SpiceConfig::getInstance()->config['international_email_addresses'],
            ],
            'cache' => [
                'class' => SpiceConfig::getInstance()->config['cache']['class'] ?? 'SpiceCacheFile',
                'external_cache_disabled' => SpiceConfig::getInstance()->config['cache']['external_cache_disabled'] ?? false,
                'redis_host' => SpiceConfig::getInstance()->config['cache']['redis_host'] ?? 'localhost',
                'redis_port' => SpiceConfig::getInstance()->config['cache']['redis_port'] ?? 6379,
                'memcached_host' => SpiceConfig::getInstance()->config['cache']['memcached_host'] ?? '127.0.0.1',
                'memcached_port' => SpiceConfig::getInstance()->config['cache']['memcached_port'] ?? 11211,
                'file_location' => SpiceConfig::getInstance()->config['cache']['file_location'] ?? 'cache',
                'file_transparentnames' => SpiceConfig::getInstance()->config['cache']['file_transparentnames'] ?? false,
            ],
            'logger' => SpiceConfig::getInstance()->config['logger']
        ]);

    }

    /**
     * writes the values of system default settings in the config table
     *
     * @param Request $req
     * @param Response $res
     * @param $args
     * @return Response
     * @throws ForbiddenException
     */
    public function writeGeneralSettings(Request $req, Response $res, array $args): Response {
        $db = DBManagerFactory::getInstance();

        $diffArray = [];

        $postBody = $req->getParsedBody();

        if (!empty($postBody)) {
            // handle sytem settings
            foreach ($postBody['system'] as $itemname => $itemvalue) {
                switch ($itemname) {
                    // do not write the unique key
                    case 'unique_key':
                        break;
                        // name goes to database
                    case 'name':
                        SpiceConfig::getInstance()->config['system']['name'] = $itemvalue;
                        $query = "UPDATE config SET value = '$itemvalue' WHERE category = 'system' AND name = '$itemname'";
                        $db->query($query);
                        break;
                    default:
                        SpiceConfig::getInstance()->config[$itemname] = $itemvalue;
                        $diffArray[$itemname] = $itemvalue;
                }
            }

            // handle advanced settings
            foreach ($postBody['advanced'] as $itemname => $itemvalue) {
                if(!$itemvalue) continue;
                SpiceConfig::getInstance()->config[$itemname] = $itemvalue;
                $diffArray[$itemname] = $itemvalue;
            }

            // handle the cache settings
            foreach ($postBody['cache'] as $itemname => $itemvalue) {
                if($itemvalue == null) continue;
                SpiceConfig::getInstance()->config['cache'][$itemname] = $itemvalue;
                $diffArray['cache'][$itemname] = $itemvalue;
            }

            // handle logger settings
            if($postBody['logger']) {
                SpiceConfig::getInstance()->config['logger'] = $postBody['logger'];
                $diffArray['logger'] = $postBody['logger'];
            }

            // handle default currency settings settings
            foreach ($postBody['currencies'] as $itemname => $itemvalue) {
                SpiceConfig::getInstance()->config['currencies'][$itemname] = $itemvalue;
                $query = "UPDATE config SET value = '$itemvalue' WHERE category = 'currencies' AND name = '$itemname'";
                $db->query($query);
            }

        }

        $configurator = new Configurator();
        $configurator->handleOverrideFromArray($diffArray);

        // clear the config cache
        SpiceCache::clear('dbconfig');

        return $res->withJson([
            'status' => boolval($query)
        ]);
    }

    /**
     * building the query for a relationship repair
     */
    public function buildSQLforRepair($dictionaryNames = [])
    {
        $sql = self::buildSQLQueries($dictionaryNames);

        // rebuild relationships
//        $this->rebuildRelationships();
        return $sql;

    }

    /**
     * Go through the vardefs and prepare SQL Queries
     * @param array $dictionaryNames
     * @return string
     * @throws \Exception
     */
    public static function buildSQLQueries($dictionaryNames = []){
        if(empty($dictionaryNames))
            VardefManager::clearVardef();

        $sql = '';
        $vardefs = SpiceDictionaryVardefs::loadVardefs($dictionaryNames);

        // check on specific tables
        $sysvardefs = SpiceDictionaryVardefs::loadVardefs(['sysdictionaryfields', 'sysdictionaryindices']);
        $sysDicFieldsSql = SpiceDictionaryVardefs::repairTable($sysvardefs['sysdictionaryfields']);
        $sysDicIndicesSql = SpiceDictionaryVardefs::repairTable($sysvardefs['sysdictionaryindices']);

        $db = DBManagerFactory::getInstance();

        if (!empty($sysDicIndicesSql)) {
            $db->query($sysDicIndicesSql);
        }

        if(!empty($sysDicFieldsSql)){
            $db->query($sysDicFieldsSql);
        }

        foreach($vardefs as $dictName => $dict){
            // remove deprecated properties
//            SpiceDictionaryVardefs::unsetDeprecatedDictionaryProperties($dict);

            // Classic scenario will be: creating a new dictionary item, going to repair database and expecting the variable to be available right away
            // We therefore save the dictionary field definitions to the proper cache table
            // SpiceDictionaryVardefs::saveDictionaryCacheToDb($dict);

            // repair table if there is any
            if(!empty($dict['table'])) {
                $sql .= SpiceDictionaryVardefs::repairTable($dict);
                $repairedTables[$dict['table']] = true;
                if (isset($dict['audited']) && $dict['audited'] == true) {
                    $sql .= SpiceDictionaryVardefs::repairAuditTable($dict);
                    $repairedTables[$dict['table'] . '_audit'] = true;
                }
            }
        }

        // clear the complete cache
        SpiceCache::instance()->resetFull();

        return $sql;
    }


    /**
     * compares vardefs and columns, indexes in database,  for each difference found:
     * delivers an array with a commentary, an sql statement and the hash of the sql statement
     *
     * @param Request $req
     * @param Response $res
     * @param $args
     * @return Response
     * @throws \Exception
     */
    public function buildSQLArray(Request $req, Response $res, array $args): Response {
//        VardefManager::clearVardef();
        $dictionaryNames = $req->getParsedBody();
        $sql = self::buildSQLQueries(isset($dictionaryNames['dictionaries']) ? $dictionaryNames['dictionaries'] : []);

        // make an array from the whole sql string
        foreach (explode("\n", $sql) as $line) {
            // not completely right, cant think of something better right now
            if (strpos($line, "Table")) {
                $comment = $line;
            }
            if (strpos($line, ';')) {
                $sqlArray[] = ["comment" => $comment, "statement" => $line, "md5" => md5($line), "selected" => false];
            }
        }

        // rebuild relationships
//        $this->rebuildRelationships();

        // send an empty string for sql if $sqlArray is null
        return $res->withJson(["sql" => (empty($sqlArray) ? "" : $sqlArray), "wholeSQL" => $sql]);

    }

    /**
     * repairs and rebuilds the database
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws \Exception
     */
    public function repairAndRebuild(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        $db = DBManagerFactory::getInstance();
        $errors = [];
        $postBody = $req->getParsedBody();
        if (SpiceUtils::isAdmin($current_user) && !empty($postBody)) {
            $synced = false;
            foreach ($postBody["selectedqueries"] as $query) {
                if ($query["md5"] == md5($query["statement"])) {
                    $stmt = str_replace(';', '', $query["statement"]);
                    if (!$db->query($stmt, true)) {
                        $errors[] = $db->lastError();
                    }
                } else {
                    $errors[] = "md5 hash does not match";
                }

            }

            if (!empty($errors)) {
                $response = false;
            } else {
                $response = true;
            }

        } else {
            $synced = true;
        }
        if ($res) {
            return $res->withJson(['response' => $response,
                'synced' => $synced,
                'error' => $errors]);
        } else {
            return json_encode(['response' => $response,
                'synced' => $synced,
                'error' => $errors]);
        }
    }

    /**
     * repair and rebuild function to call in the installer, since you cant select any queries
     * @return false|string
     * @throws \Exception
     */
    public function repairAndRebuildforInstaller()
    {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        $db = DBManagerFactory::getInstance();
        $errors = [];
        if (SpiceUtils::isAdmin($current_user)) {
            $sql = $this->buildSQLforRepair();
            if (!empty($sql)) {
                $synced = false;
                foreach (explode("\n", $sql) as $line) {
                    if (!strpos($line, '*') && !empty($line)) {
                        $queries[] = $line;
                    }
                }
                foreach ($queries as $query) {
                    $db->query($query, true);
                }
            } else {
                $synced = true;
            }


            if (!empty($errors)) {
                $response = false;
            } else {
                $response = true;
            }

            // rebuild relationships
            // $this->rebuildRelationships();

        }

        return json_encode(['response' => $response,
                'synced' => $synced,
                'sql' => $sql,
                'error' => $errors]);

    }

    /**
     * rebuilds relationships from dictionary definitions
     *
     * ToDo: remove the need to have this
     */
    public function rebuildRelationships()
    {
        $db = DBManagerFactory::getInstance();

        $this->rebuildDictionaryRelationships();

        // using sysdictionary
//        if (isset(SpiceConfig::getInstance()->config['systemvardefs']['dictionary']) && SpiceConfig::getInstance()->config['systemvardefs']['dictionary']) {
//            $this->rebuildDictionaryRelationships();
//        } else { // old fashioned way
//            foreach ($GLOBALS['moduleList'] as $module) {
//                $focus = BeanFactory::getBean($module);
//                if (!$focus) continue;
//                SpiceBean::createRelationshipMeta($focus->getObjectName(), $db, $focus->_tablename, [$focus->_objectname => SpiceDictionaryHandler::getInstance()->dictionary[$focus->_objectname]], $focus->_module);
//            }
//
//            // rebuild the metadata relationships as well
//            $this->rebuildMetadataRelationships();
//
//            // rebuild relationship cache
//            $rel = new Relationship();
//            $rel->build_relationship_cache();
//        }
    }

    /**
     * rebuilds cache for relationships dictionary
     *
     * ToDo: remove the need to have this
     */
    public function rebuildDictionaryRelationships()
    {
        unset($_SESSION['relationships']);

        // rebuild relationship cache
        Relationship::build_relationship_cache();
    }

    /**
     * rebuilds the metadata relationships
     *
     * TODo: remove this in the next version with the vardef manager
     */
    private function rebuildMetadataRelationships()
    {
        $db = DBManagerFactory::getInstance();

        $rel_dictionary = SpiceDictionaryHandler::getInstance()->dictionary;
        foreach ($rel_dictionary as $rel_name => $rel_data) {
            $table = isset($rel_data ['table']) ? $rel_data ['table'] : "";
            SpiceBean::createRelationshipMeta($rel_name, $db, $table, $rel_dictionary, '');
        }
    }

    /**
     * clears language cache and repairs the language extensions
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function repairLanguage(Request $req, Response $res, array $args): Response {
        $appListStrings = [];
        $appLang = [];
        $langs = LanguageManager::getLanguages();

        foreach ($langs['available'] as $lang) {
            if($lang['system_language']){
                $language = $lang['language_code'];
                $this->merge_files('Ext/Language/', $language . '.lang.ext.php', $language);
                $appListStrings[$language][] = SpiceUtils::returnAppListStringsLanguage($language);
                $appLang[$language][] = $this->loadLanguage($language);
            }
        }

        if (!empty($appListStrings) && !empty($appLang)) {
            $response = 'ok';
        } else {
            $response = 'e';
        }

        return $res->withJson(['response' => $response,
            'appList' => $appListStrings,
            'appLang' => $appLang,
            'languages' => $langs]);
    }

    /**
     * loads the applang labels for a language
     * @param $lang
     * @return array
     */
    private function loadLanguage($lang)
    {
        $syslanguagelabels = LanguageManager::loadDatabaseLanguage($lang);
        $syslanguages = [];
        if (is_array($syslanguagelabels)) {
            foreach ($syslanguagelabels as $syslanguagelbl => $syslanguagelblcfg) {
                $syslanguages[$syslanguagelbl] = [
                    'default' => $syslanguagelblcfg['default'],
                    'short' => $syslanguagelblcfg['short'],
                    'long' => $syslanguagelblcfg['long'],
                ];
            }
        }

        return $syslanguages;
    }

    /**
     * merges the extension files and generates the contents in the cache folder
     * (sugar code)
     * @param $path
     * @param $name
     * @param string $filter
     */
    private function merge_files($path, $name, $filter = '')
    {
        foreach (SpiceModules::getInstance()->getModuleList() as $module) {
            $extension = "<?php \n //WARNING: The contents of this file are auto-generated\n";
            $extension.= "use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;\n";
            $extension.= "use SpiceCRM\includes\SugarObjects\VardefManager;\n";
            $extpath = "modules/$module/$path";
            $module_install = 'custom/Extension/' . $extpath;
            $shouldSave = false;
            if (is_dir($module_install)) {
                $dir = dir($module_install);
                $shouldSave = true;
                $override = [];
                while ($entry = $dir->read()) {
                    if ((empty($filter) || substr_count($entry, $filter) > 0) && is_file($module_install . '/' . $entry)
                        && $entry != '.' && $entry != '..' && strtolower(substr($entry, -4)) == ".php") {
                        if (substr($entry, 0, 9) == '_override') {
                            $override[] = $entry;
                        } else {
                            $file = file_get_contents($module_install . '/' . $entry);
                            LoggerManager::getLogger()->debug(get_class($this) . "->merge_files(): found {$module_install}{$entry}");
                            $extension .= "\n" . str_replace(['<?php', '?>', '<?PHP', '<?', 'use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;', 'use SpiceCRM\includes\SugarObjects\VardefManager;'], ['', '', '', '', '', ''], $file);
                        }
                    }
                }
                foreach ($override as $entry) {
                    $file = file_get_contents($module_install . '/' . $entry);
                    $extension .= "\n" . str_replace(['<?php', '?>', '<?PHP', '<?'], ['', '', '', ''], $file);
                }
            }
            $extension .= "\n?>";

            if ($shouldSave) {
                if (!file_exists("custom/$extpath")) {
                    FileUtils::mkdirRecursive("custom/$extpath", true);
                }
                $out = SpiceFileUtils::spiceFopen("custom/$extpath/$name", 'w');
                fwrite($out, $extension);
                fclose($out);
            } else {
                if (file_exists("custom/$extpath/$name")) {
                    unlink("custom/$extpath/$name");
                }
            }
        }


        LoggerManager::getLogger()->debug("Merging application files for $name in $path");
        //Now the application stuff
        $extension = "<?php \n //WARNING: The contents of this file are auto-generated\n";
        $extpath = "application/$path";
        $module_install = 'custom/Extension/' . $extpath;
        $shouldSave = false;
        if (is_dir($module_install)) {
            $dir = dir($module_install);
            while ($entry = $dir->read()) {
                $shouldSave = true;
                if ((empty($filter) || substr_count($entry, $filter) > 0) && is_file($module_install . '/' . $entry)
                    && $entry != '.' && $entry != '..' && strtolower(substr($entry, -4)) == ".php") {
                    $file = file_get_contents($module_install . '/' . $entry);
                    $extension .= "\n" . str_replace(['<?php', '?>', '<?PHP', '<?'], ['', '', '', ''], $file);
                }
            }
        }
        $extension .= "\n?>";
        if ($shouldSave) {
            if (!file_exists("custom/$extpath")) {
                FileUtils::mkdirRecursive("custom/$extpath", true);
            }
            $out = SpiceFileUtils::spiceFopen("custom/$extpath/$name", 'w');
            fwrite($out, $extension);
            fclose($out);
        } else {
            if (file_exists("custom/$extpath/$name")) {
                unlink("custom/$extpath/$name");
            }
        }

    }





    /**
     * read the custom vardefs definitions according to backend old way using files
     * @return array
     */
    private function rebuildExtensionVardefs()
    {
        $extensions = [];
        if (is_dir('custom/Extension/modules')) {
            $handle = opendir('custom/Extension/modules');
            while (false !== ($entry = readdir($handle))){
                if ($entry != "." && $entry != "..") {
                    $extensions[$entry] = "";
                    $subHandle = opendir("custom/Extension/modules/{$entry}/Ext/Vardefs");
                    while ($subEntry = readdir(($subHandle))) {
                        if ($subEntry != "." && $subEntry != "..") {
                            $extensions[$entry] = $subEntry;
                        }
                    }
                }
            }
        }
        return $extensions;
    }

    /**
     * rebuilds vardefs extensions
     */
    private function rebuildExtensions()
    {
        $extensions = $this->rebuildExtensionVardefs();

        if (!empty($extensions) && !empty(array_values($extensions))) {
            foreach ($extensions as $extDir => $extFile) {
                $this->merge_files("Ext/Vardefs", 'vardefs.ext.php');
            }
        }
    }

    /**
     * clears the vardef cache, executes rebuilding of vardefs extensions and rebuild relationships
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function repairCache(Request $req, Response $res, array $args): Response {

        return $this->repairCacheFromDb($req, $res, $args);

//        if (isset(SpiceConfig::getInstance()->config['systemvardefs']['dictionary']) && SpiceConfig::getInstance()->config['systemvardefs']['dictionary']) {
//            return $this->repairCacheFromDb($req, $res, $args);
//        } else {
//            return $this->repairCacheFromFiles($req, $res, $args);
//        }
    }

    /**
     * repair cache based on dictionary manager
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    private function repairCacheFromDb(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        if (SpiceUtils::isAdmin($current_user)) {
//            \SpiceCRM\includes\SugarObjects\VardefManager::clearVardef();
            $this->rebuildExtensions();
            $this->merge_files("Ext/TableDictionary/", 'tabledictionary.ext.php');
            $this->rebuildDictionaryRelationships();
        }
        return $res->withJson(['status' => 'ok']);
    }

    /**
     * repair cache the old fashioned way
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    private function repairCacheFromFiles(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        if (SpiceUtils::isAdmin($current_user)) {
            VardefManager::clearVardef();
            $this->rebuildExtensions();
            $this->merge_files("Ext/TableDictionary/", 'tabledictionary.ext.php');
            $this->rebuildRelationships();
        }
        return $res->withJson(['status' => 'ok']);
    }


    /**
     * get all columns from the module-table in the database
     * allowed as admin
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function getDBColumns(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        if (SpiceUtils::isAdmin($current_user)) {
            $db = DBManagerFactory::getInstance();
            $nodeModule = BeanFactory::getBean($args['module']);
            return $res->withJson($db->get_columns($nodeModule->_tablename));
        }

        throw new UnauthorizedException('only admin access');
    }

    /**
     * delete all the given columns in the database (with all data!) be carefully
     * allowed as admin
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws \Exception
     */
    public function repairDBColumns(Request $req, Response $res, array $args): Response {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        if (SpiceUtils::isAdmin($current_user)) {

            $db = DBManagerFactory::getInstance();
            $postBody = $req->getParsedBody();
            $nodeModule = BeanFactory::getBean($postBody['module']);

            // build sql to drop table-column
            $deleteQuery = 'ALTER TABLE ' . $nodeModule->_tablename . ' ';
            foreach ($postBody['dbcolumns'] as $column) {
                $deleteQuery .= 'DROP COLUMN ' . $column['name'] . ', ';
            }
            $deleteQuery = substr($deleteQuery, 0, -2);
            $deleteQuery .= ';';

            //execute query
            $result = $db->query($deleteQuery);

            return $res->withJson($result);
        }

        throw new UnauthorizedException('only admin access');
    }

    /**
     * repairs the database and loads the core package
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws UnauthorizedException
     */
    public function repairAndReloadCore(Request $req, Response $res, array $args): Response
    {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        if (SpiceUtils::isAdmin($current_user)) {
            $confLoader = new SpiceUIConfLoader();
            $db = DBManagerFactory::getInstance();
            if (SpiceDictionaryVardefs::isDbManaged()) {
                $this->rebuildExtensions();
                $this->merge_files("Ext/TableDictionary/", 'tabledictionary.ext.php');
                $this->rebuildDictionaryRelationships();
            } else {
                VardefManager::clearVardef();
                $this->rebuildExtensions();
                $this->merge_files("Ext/TableDictionary/", 'tabledictionary.ext.php');
                $this->rebuildRelationships();
            }

            $sql = $this->buildSQLforRepair();
            if (!empty($sql)) {
                foreach (explode("\n", $sql) as $line) {
                    if (!strpos($line, '*') && !empty($line)) {
                        $queries[] = $line;
                    }
                }
                foreach ($queries as $query) {
                    $exec = $db->query($query, true, '', false, true);
                }
            } else {
                $exec = true;
            }

            $resConf = $confLoader->loadPackage('core');
            return $res->withJson(['repair' => $exec, 'core' => $resConf['success']]);
        }
        throw new UnauthorizedException();

    }

    /**
     * Converts the DB charset and collation
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws Exception
     */
    public function convertDatabase(Request $req, Response $res, array $args): Response {
        $db = DBManagerFactory::getInstance();
        $body = $req->getParsedBody();
        $result = $db->convertDBCharset($body['charset'], $this->getCollation($body['charset']));

        return $res->withJson($result);
    }

    /**
     * Convert the charset and collation of the given tables
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws Exception
     */
    public function convertTables(Request $req, Response $res, array $args): Response {
        $body = $req->getParsedBody();
        $db = DBManagerFactory::getInstance();

        foreach ($body['tables'] as $table) {
            $db->convertTableCharset($table, $body['charset'], $this->getCollation($body['charset']));
        }

        return $res->withJson(true);
    }

    /**
     * Returns the charset and collation info for the database and its tables
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws Exception
     */
    public function getDatabaseCharsetInfo(Request $req, Response $res, array $args): Response {
        $db = DBManagerFactory::getInstance();
        $result = $db->getDatabaseCharsetInfo();

        return $res->withJson($result);
    }

    private function getCollation(string $charset): string {
        switch ($charset) {
            case 'utf8mb4':
                return 'utf8mb4_general_ci';
            case 'utf8':
            default:
                return 'utf8_general_ci';
        }
    }
}
