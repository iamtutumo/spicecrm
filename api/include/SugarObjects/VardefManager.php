<?php
/*********************************************************************************
* SugarCRM Community Edition is a customer relationship management program developed by
* SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
*
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation with the addition of the following permission added
* to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
* IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
* OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
*
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
*
* You should have received a copy of the GNU Affero General Public License along with
* this program; if not, see http://www.gnu.org/licenses or write to the Free
* Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301 USA.
*
* You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
* SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
*
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
*
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* SugarCRM" logo. If the display of the logo is not reasonably feasible for
* technical reasons, the Appropriate Legal Notices must display the words
* "Powered by SugarCRM".
********************************************************************************/

namespace SpiceCRM\includes\SugarObjects;

use FilesystemIterator;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\includes\Logger\LoggerManager;
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryVardefs;
use SpiceCRM\includes\SpiceCache\SpiceCache;
use SpiceCRM\includes\utils\FileUtils;
use SpiceCRM\includes\utils\SpiceFileUtils;
use SpiceCRM\includes\utils\SpiceUtils;

/**
 * Vardefs management
 * @api
 */
class VardefManager{
//    static $custom_disabled_modules = [];
    static $linkFields;

    /**
     * this method is called within a vardefs.php file which extends from a SugarObject.
     * It is meant to load the vardefs from the SugarObject.
     */
    static function createVardef($module, $object, $templates = ['default'])
    {
        $handler = SpiceDictionaryHandler::getInstance();
        $vardefs = ['fields' => [], 'relationships' => [], 'indices' => []];

        foreach ($templates as $template) {

            $templateVardefs = self::getTemplateVardefs($module, $object, $template);

            $vardefs['fields'] = array_merge($vardefs['fields'], $templateVardefs['fields']);
            $vardefs['relationships'] = array_merge($vardefs['relationships'], $templateVardefs['relationships']);
            $vardefs['indices'] = SpiceDictionaryVardefs::mergeIndices($vardefs['indices'], $templateVardefs['indices']);

            # maintain a record of this objects inheritance from the SugarObject templates
            $handler->dictionary[$object]['templates'][$template] = $template;
        }

        self::updateDictionaryVardefs($vardefs, $object);
    }

    /**
     * update dictionary vardefs from the passed vardefs e.g. template vardefs
     * @param $vardefs
     * @param $object
     * @return void
     */
    static public function updateDictionaryVardefs($vardefs, $object)
    {
        $handler = SpiceDictionaryHandler::getInstance();

        $handler->dictionary[$object]['fields'] = array_merge($vardefs['fields'], $handler->dictionary[$object]['fields'] ?? []);
        $handler->dictionary[$object]['relationships'] = array_merge($vardefs['relationships'], $handler->dictionary[$object]['relationships'] ?? []);
        $handler->dictionary[$object]['indices'] = SpiceDictionaryVardefs::mergeIndices($vardefs['indices'], $handler->dictionary[$object]['indices'] ?? []);
    }

    /**
     * get template vardefs
     * @param $module
     * @param $object
     * @param $template
     * @return array|array[]
     */
    static function getTemplateVardefs($module, $object, $template): array
    {
        global $vardefs;

        if ($template == 'default') $template = 'basic';

        $fields = [];

        $object_name = strtolower($object);
        $table_name = SpiceDictionaryHandler::getInstance()->dictionary[$object]['table'] ?? strtolower($module);

        $path = SpiceUtils::getCustomFileIfExists("include/SugarObjects/templates/$template/vardefs.php");

        if (file_exists($path)) {
            require($path);
            $templateVardefs = $vardefs;
        } else {
            $path = SpiceUtils::getCustomFileIfExists("include/SugarObjects/implements/$template/vardefs.php");

            if (file_exists($path)) {
                require($path);
                $templateVardefs = $vardefs;
            }
        }

        if (empty($templateVardefs)) {
            return ['fields' => [], 'relationships' => [], 'indices' => []];
        }

        return [
            'fields' => $templateVardefs['fields'] ?? [],
            'relationships' => $templateVardefs['relationships'] ?? [],
            'indices' => $templateVardefs['indices'] ?? [],
        ];
    }

    /**
     * add template directly to dictionary
     * @param $module
     * @param $object
     * @param $template
     * @return void
     */
    static public function addTemplate($module, $object, $template)
    {
        $vardefs = self::getTemplateVardefs($module, $object, $template);
        self::updateDictionaryVardefs($vardefs, $object);
    }


    /**
     * Remove invalid field definitions
     * @static
     * @param Array $fieldDefs
     * @return  Array
     */
    static function cleanVardefs($fieldDefs)
    {
        foreach($fieldDefs as $field => $defs)
        {
            if (empty($def['name']) || empty($def['type']))
            {
                unset($fieldDefs[$field]);
            }
        }

        return $fieldDefs;
    }

    /**
     * @deprecated
     * Save the dictionary object to the cache
     * @param string $module the name of the module
     * @param string $object the name of the object
     */
    static function saveCache($module, $object, $additonal_objects= []){

        if (empty(SpiceDictionaryHandler::getInstance()->dictionary[$object]))
            $object = BeanFactory::getObjectName($module);
        $file = FileUtils::createCacheDirectory('modules/' . $module . '/' . $object . 'vardefs.php');

//        $out="<?php \n \$GLOBALS[\"dictionary\"][\"". $object . "\"]=" . var_export(SpiceDictionaryHandler::getInstance()->dictionary[$object], true) .";";
        $out = "<?php \n";
        $out .= "use " . SpiceDictionaryHandler::class . ";\n";
        $out .= "SpiceDictionaryHandler::getInstance()->dictionary[\"". $object . "\"]=" . var_export(SpiceDictionaryHandler::getInstance()->dictionary[$object], true) .";";
        SpiceFileUtils::spiceFilePutContentsAtomic($file, $out);
        if (SpiceFileUtils::spiceIsFile($file) && is_readable($file)) {
            include($file);
        }

        // put the item in the sugar cache.
        $key = "VardefManager.$module.$object";
        //Sometimes bad definitions can get in from left over extensions or file system lag(caching). We need to clean those.
        $data = self::cleanVardefs(SpiceDictionaryHandler::getInstance()->dictionary[$object]);
        SpiceCache::set($key,$data);
    }

    /**
     * @deprecated
     * clear out the vardef cache. If we receive a module name then just clear the vardef cache for that module
     * otherwise clear out the cache for every module
     * @param string module_dir the module_dir to clear, if not specified then clear
     *                      clear vardef cache for all modules.
     * @param string object_name the name of the object we are clearing this is for sugar_cache
     */
    static function clearVardef($module_dir = '', $object_name = ''){
        //if we have a module name specified then just remove that vardef file
        //otherwise go through each module and remove the vardefs.php
        if (!empty($module_dir) && !empty($object_name)) {
            self::_clearCache($module_dir, $object_name);
        } else {
            foreach (SpiceModules::getInstance()->getBeanList() as $module_dir => $object_name) {
                self::_clearCache($module_dir, $object_name);
            }
        }
    }

    /**
     * @deprecated
     * PRIVATE function used within clearVardefCache so we do not repeat logic
     * @param string module_dir the module_dir to clear
     * @param string object_name the name of the object we are clearing this is for sugar_cache
     */
    static function _clearCache($module_dir = '', $object_name = ''){
        if(!empty($module_dir) && !empty($object_name)){

            //Some modules like cases have a bean name that doesn't match the object name
            if (empty(SpiceDictionaryHandler::getInstance()->dictionary[$object_name])) {
                $newName = BeanFactory::getObjectName($module_dir);
                $object_name = $newName != false ? $newName : $object_name;
            }

            $file = SpiceFileUtils::spiceCached('modules/').$module_dir.'/' . $object_name . 'vardefs.php';

            if(file_exists($file)){
                unlink($file);
                $key = "VardefManager.$module_dir.$object_name";
                SpiceCache::clear($key);
            }
        }
    }

    /**
     * Given a module, search all of the specified locations, and any others as specified
     * in order to refresh the cache file
     *
     * @param string $module the given module we want to load the vardefs for
     * @param string $object the given object we wish to load the vardefs for
     * @param array $additional_search_paths an array which allows a consumer to pass in additional vardef locations to search
     */
    static function refreshVardefs($module, $object, $additional_search_paths = null, $cacheCustom = false, $params = []){

        if(SpiceDictionaryVardefs::isDbManaged()){
            $dict = SpiceDictionaryVardefs::loadVardefsForModule($module, $object);
            SpiceDictionaryVardefs::saveDictionaryCacheToDb($dict);
            return;
        }

        // LEGACY
        $vardef_paths = [
                    'modules/'.$module.'/vardefs.php',
                    'extensions/modules/'.$module.'/vardefs.php',
                    'custom/modules/'.$module.'/Ext/Vardefs/vardefs.ext.php',
                    'custom/modules/'.$module.'/vardefs.php',
                    'custom/Extension/modules/'.$module.'/Ext/Vardefs/vardefs.php'
        ];

        //custom module: add all files located in custom/Extension/modules/$module/Ext/Vardefs to support Extension Vardefs
        if(is_dir('custom/Extension/modules/'.$module.'/Ext/Vardefs')) {
            $fileSystemIterator = new FilesystemIterator('custom/Extension/modules/' . $module . '/Ext/Vardefs');
            foreach ($fileSystemIterator as $fileInfo){
                $additional_search_paths[] = 'custom/Extension/modules/' . $module . '/Ext/Vardefs/'.$fileInfo->getFilename();
            }
        }

        // Add in additional search paths if they were provided.
        if(!empty($additional_search_paths) && is_array($additional_search_paths))
        {
            $vardef_paths = array_merge($vardef_paths, $additional_search_paths);
        }
        $found = false;
        //search a predefined set of locations for the vardef files
        foreach($vardef_paths as $path){
            if(file_exists($path)){
                require($path);
                $found = true;
            }
        }
        //Some modules have multiple beans, we need to see if this object has a module_dir that is different from its module_name
        /*
        if(!$found){
            $temp = \SpiceCRM\data\BeanFactory::newBean($module);
            if ($temp)
            {
                $object_name = \SpiceCRM\data\BeanFactory::getObjectName($temp->_module);
                if ($temp && $temp->_module != $temp->module_name && !empty($object_name))
                {
                    self::refreshVardefs($temp->_module, $object_name, $additional_search_paths, $cacheCustom);
                }
            }
        }
        */

        //Some modules like cases have a bean name that doesn't match the object name
        if (empty(SpiceDictionaryHandler::getInstance()->dictionary[$object])) {
            $newName = BeanFactory::getObjectName($module);
            $object = $newName != false ? $newName : $object;
        }

        //load custom fields into the vardef cache
        /*
        if($cacheCustom){
            require_once("modules/DynamicFields/DynamicField.php");
            $df = new DynamicField ($module) ;
            $df->buildCache($module, false);
        }
        */

        //great! now that we have loaded all of our vardefs.
        //let's go save them to the cache file.
        if(!empty(SpiceDictionaryHandler::getInstance()->dictionary[$object])) {
            self::saveCache($module, $object);
        }
    }

    /**
     * @static
     * @param  $module
     * @param  $object
     * @return array|bool  returns a list of all fields in the module of type 'link'.
     */
    protected static function getLinkFieldsForModule($module, $object)
    {
        //Some modules like cases have a bean name that doesn't match the object name
        if (empty(SpiceDictionaryHandler::getInstance()->dictionary[$object])) {
            $newName = BeanFactory::getObjectName($module);
            $object = $newName != false ? $newName : $object;
        }
        if (empty(SpiceDictionaryHandler::getInstance()->dictionary[$object])) {
            self::loadVardef($module, $object, false, ['ignore_rel_calc_fields' => true]);
        }
        if (empty(SpiceDictionaryHandler::getInstance()->dictionary[$object]))
        {
            LoggerManager::getLogger()->debug("Failed to load vardefs for $module:$object in linkFieldsForModule<br/>");
            return false;
        }

        //Cache link fields for this call in a static variable
        if (!isset(self::$linkFields))
            self::$linkFields = [];

        if (isset(self::$linkFields[$object]))
            return self::$linkFields[$object];

        $vardef = SpiceDictionaryHandler::getInstance()->dictionary[$object];
        $links = [];
        foreach($vardef['fields'] as $name => $def)
        {
            //Look through all link fields for related modules that have calculated fields that use that relationship
            if(!empty($def['type']) && $def['type'] == 'link' && !empty($def['relationship']))
            {
                $links[$name] = $def;
            }
        }

        self::$linkFields[$object] = $links;

        return $links;
    }


    public static function getLinkFieldForRelationship($module, $object, $relName)
    {
        if(empty($object)){
            return false;
        }

        // load relationship from database cache table when turned on
        if (SpiceDictionaryVardefs::isDbManaged()) {
            $cachedRel = SpiceDictionaryVardefs::loadRelationshipsForModuleFromCache($module);
            if(!empty($cachedRel)) {
                LoggerManager::getLogger()->debug('Loading {$object} from DB cache table');
                //return $cachedRel;
            }
            //return false;
        }


        $cacheKey = "LFR{$module}{$object}{$relName}";
        $cacheValue = SpiceCache::get($cacheKey);
        if(!empty($cacheValue))
            return $cacheValue;

        $relLinkFields = self::getLinkFieldsForModule($module, $object);
        $matches = [];
        if (!empty($relLinkFields))
        {
            foreach($relLinkFields as $rfName => $rfDef)
            {
                if ($rfDef['relationship'] == $relName)
                {
                    $matches[] = $rfDef;
                }
            }
        }
        if (empty($matches))
            return false;
        if (sizeof($matches) == 1)
            $results = $matches[0];
        else
            //For relationships where both sides are the same module, more than one link will be returned
            $results = $matches;

        SpiceCache::set($cacheKey, $results);
        return $results ;
    }



    /**
     * applyGlobalAccountRequirements
     *
     * This method ensures that the account_name relationships are set to always be required if the configuration file specifies
     * so.  For more information on this require_accounts parameter, please see the administrators guide or go to the
     * developers.sugarcrm.com website to find articles relating to the use of this field.
     *
     * @param Array $vardef The vardefs of the module to apply the account_name field requirement to
     * @return Array $vardef The vardefs of the module with the updated required setting based on the system configuration
     */
    static function applyGlobalAccountRequirements($vardef)
    {
        if (isset(SpiceConfig::getInstance()->config['require_accounts']))
        {
            if (isset($vardef['fields'])
                && isset($vardef['fields']['account_name'])
                && isset($vardef['fields']['account_name']['type'])
                && $vardef['fields']['account_name']['type'] == 'relate'
                && isset($vardef['fields']['account_name']['required']))
            {
                $vardef['fields']['account_name']['required'] = SpiceConfig::getInstance()->config['require_accounts'];
            }

        }
        return $vardef;
    }


    /**
     * load the vardefs for a given module and object
     * @param string $module the given module we want to load the vardefs for
     * @param string $object the given object we wish to load the vardefs for
     * @param bool   $refresh whether or not we wish to refresh the cache file.
     */
    static function loadVardef($module, $object, $refresh=false, $params = []){
        if(empty($module) || empty($object)) return;

        // load dictionary from database cache table when turned on
        if (SpiceDictionaryVardefs::isDbManaged()) {
            // LoggerManager::getLogger()->debug("Try Loading $object $module from DB cache table");
            $cachedDict = SpiceDictionaryVardefs::getInstance()->getDictionaryCacheFromDbByObject($object, $refresh);
            if(!empty($cachedDict)) {
                SpiceDictionaryHandler::getInstance()->dictionary[$object] = $cachedDict;
                // LoggerManager::getLogger()->debug("Loaded $object from DB cache table ");
            } else{
                // try a refresh
                self::refreshVardefs($module, $object, null, false, $params);
            }
            return;
        }

        // --- LEGACY LOGIC: Retrieve the vardefs from cache or reload on refresh=true --- //
        //here check if the cache file exists, if it does then load it, if it doesn't
        //then call refreshVardef
        //if either our session or the system is set to developerMode then refresh is set to true
        if (SpiceUtils::inDeveloperMode() || !empty($_SESSION['developerMode'])) {
            $refresh = true;
        }

        // legacy logic: Retrieve the vardefs from cache or reload on refresh=true
        if(!$refresh)
        {
            $key = "VardefManager.$module.$object";
            $return_result = SpiceCache::get($key);
            $return_result = self::applyGlobalAccountRequirements($return_result);

            if(!empty($return_result))
            {
                SpiceDictionaryHandler::getInstance()->dictionary[$object] = $return_result;
                return;
            }
        }

        if(empty(SpiceDictionaryHandler::getInstance()->dictionary[$object]) || $refresh){

            //if the consumer has demanded a refresh or the cache/modules... file
            //does not exist, then we should do out and try to reload things

            $cachedfile = SpiceFileUtils::spiceCached('modules/'). $module . '/' . $object . 'vardefs.php';
            if($refresh || !file_exists($cachedfile)){
                self::refreshVardefs($module, $object, null, false, $params);
            }

            //at this point we should have the cache/modules/... file
            //which was created from the refreshVardefs so let's try to load it.
            if(file_exists($cachedfile))
            {
                if (is_readable($cachedfile))
                {
                    include($cachedfile);
                }
                // now that we hae loaded the data from disk, put it in the cache.
                if(!empty(SpiceDictionaryHandler::getInstance()->dictionary[$object]))
                {
                    SpiceDictionaryHandler::getInstance()->dictionary[$object] = self::applyGlobalAccountRequirements(SpiceDictionaryHandler::getInstance()->dictionary[$object]);
                    SpiceCache::set($key,SpiceDictionaryHandler::getInstance()->dictionary[$object]);
                }
            }
        }
    }

}
