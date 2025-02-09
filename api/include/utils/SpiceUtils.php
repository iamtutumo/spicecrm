<?php
namespace SpiceCRM\includes\utils;

use DateTime;
use DirectoryIterator;
use SpiceCRM\includes\authentication\AuthenticationController;
use SpiceCRM\includes\database\DBManagerFactory;
use SpiceCRM\includes\ErrorHandlers\Exception;
use SpiceCRM\includes\ErrorHandlers\ValidationException;
use SpiceCRM\includes\Localization\Localization;
use SpiceCRM\includes\LogicHook\LogicHook;
use SpiceCRM\includes\SpiceLanguages\SpiceLanguageManager;
use SpiceCRM\includes\SugarObjects\SpiceConfig;
use SpiceCRM\includes\SpiceUI\api\controllers\SpiceUIModulesController;
use SpiceCRM\includes\Logger\LoggerManager;
use SpiceCRM\data\SpiceBean;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\includes\SpiceCache\SpiceCache;
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryVardefs;
use SpiceCRM\includes\SugarObjects\SpiceModules;

/**
 * Class SpiceUtils
 *
 * A Helper class containing static functions used throughout the system.
 */
class SpiceUtils
{
    /**
     * get the execution class and method and return an object
     * @return null|object
     */
    public static function loadExecutionClassMethod($method)
    {
        $isFunction = strpos(html_entity_decode($method), 'function::') === 0;
        $separator = $isFunction ? '::' : '->';
        $methodArray = explode($separator, html_entity_decode($method));
        $className = $methodArray[0];
        $methodName = $methodArray[1];

        if ($isFunction) {
            if (!is_callable($methodName)) {
                return null;
            }
            return (object)['class' => null, 'method' => $methodName];
        }

        if (!class_exists($className)) {
            return null;
        }

        $classInstance = new $className();

        if (!is_callable([$classInstance, $methodName])) {
            return null;
        }

        return (object)['class' => $classInstance, 'method' => $methodName];
    }
    /**
     * catches the request_uri and php_self and checks if one of them matches the allowed backend paths
     * @return mixed|string|null
     */
    public static function determineAppBasePath() {
        $appBasePath = null;
        if (SpiceConfig::getInstance()->configExists() && isset(SpiceConfig::getInstance()->config['app_base_path'])) {
            $appBasePath = SpiceConfig::getInstance()->config['app_base_path'];
        } else {
            //fallback, check known directory names
            $appBasePath = $currentDirectoryName = dirname($_SERVER['PHP_SELF']);
            if (in_array($currentDirectoryName, ['/api', '/back', '/backend', '/spicecrm_be_factory'])) {
                $appBasePath = $currentDirectoryName;
            }
        }

        /**
         * backwards compatibility trying to determine if we have KREST in the Route
         * if yes add it to the basepath
         * ToDo: remove in later version when we abandon KREST bwd compatibility
         */
        if (strpos($_SERVER['REQUEST_URI'], 'KREST') !== false) {
            $appBasePath .= '/KREST';
        }

        return $appBasePath;
    }

    /**
     * A temporary method of generating GUIDs of the correct format for our DB.
     * @return String containing a GUID in the format: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
     *
     * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
     * All Rights Reserved.
     * Contributor(s): ______________________________________..
     */
    public static function createGuid(): string {
        $microTime = microtime();
        list($a_dec, $a_sec) = explode(" ", $microTime);

        $dec_hex = dechex($a_dec * 1000000);
        $sec_hex = dechex($a_sec);

        self::ensureLength($dec_hex, 5);
        self::ensureLength($sec_hex, 6);

        $guid = "";
        $guid .= $dec_hex;
        $guid .= self::createGuidSection(3);
        $guid .= '-';
        $guid .= self::createGuidSection(4);
        $guid .= '-';
        $guid .= self::createGuidSection(4);
        $guid .= '-';
        $guid .= self::createGuidSection(4);
        $guid .= '-';
        $guid .= $sec_hex;
        $guid .= self::createGuidSection(6);

        return $guid;
    }

    /**
     * @param $characters
     * @return string
     */
    public static function createGuidSection($characters): string {
        $return = "";
        for ($i = 0; $i < $characters; $i++) {
            $return .= dechex(mt_rand(0, 15));
        }
        return $return;
    }

    /**
     * @param $string
     * @param $length
     */
    public static function ensureLength(&$string, $length): void {
        $strlen = strlen($string);
        if ($strlen < $length) {
            $string = str_pad($string, $length, "0");
        } else if ($strlen > $length) {
            $string = substr($string, 0, $length);
        }
    }

    /**
     * Returns a translated abbreviation for a week day.
     * In case no translation is provided, just the default english version is returned.
     *
     * @param DateTime $date
     * @param string $language
     * @return string
     * @deprecated since release 2023.01.001
     */
    public static function getShortWeekdayName(DateTime $date, string $language = 'de_DE'): string {
        // todo move that array once it grows.
        $weekdayStrings = [
            'de_DE' => [
                'Mon' => 'Mo',
                'Tue' => 'Di',
                'Wed' => 'Mi',
                'Thu' => 'Do',
                'Fri' => 'Fr',
                'Sat' => 'Sa',
                'Sun' => 'So',
            ],
        ];

        $weekday = $date->format('D');

        return ($weekdayStrings[$language][$weekday]) ?? $weekday;
    }


    /**
     * get max value for property in array of objects
     * @param array $arr
     * @param string $property
     * @return mixed
     */
    public static function getMaxDate(array $arr, string $property) {
        return max(array_column($arr, $property));
    }

    /**
     * get min value for property in array of objects
     * @param array $arr
     * @param string $property
     * @return mixed
     */
    public static function getMinDate(array $arr, string $property) {
        return min(array_column($arr, $property));
    }

    /**
     * An example validation rule for the validation middleware.
     * An exception is thrown if the string length is odd.
     * Otherwise the validation is passed.
     *
     * @param $value
     * @throws Exception
     * @deprecated since release 2023.01.001
     */
    public static function exampleValidationRule($value) {
        if (strlen($value) % 2) {
            throw new ValidationException('String length is odd.');
        }
    }

    /**
     * Checks if a module name string corresponds to a module name that is registered in the system.
     *
     * @param string $moduleName
     * @return bool
     */
    public static function isValidModule(string $moduleName): bool {
        return SpiceModules::getInstance()->moduleExists($moduleName);
    }

    /**
     * A cleanup function that is registered to run after a script has finished or exit() was called.
     *
     * @param bool $exit
     */
    public static function spiceCleanup(bool $exit = false) {
        if (SpiceConfig::getInstance()->configExists()) { // workaround for installer for now. variable is set in SpiceInstallerController ... find a better way
            $db = DBManagerFactory::getInstance();
            if($db) $db->disconnect();
        }
        if ($exit) {
            exit;
        }
    }

    /**
     * returns the current client IP
     *
     * @return mixed|string
     */
    public static function getClientIP() {
        if ($_SERVER['HTTP_CLIENT_IP'])
            return $_SERVER['HTTP_CLIENT_IP'];
        else if ($_SERVER['HTTP_X_FORWARDED_FOR'])
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if ($_SERVER['HTTP_X_FORWARDED'])
            return $_SERVER['HTTP_X_FORWARDED'];
        else if ($_SERVER['HTTP_FORWARDED_FOR'])
            return $_SERVER['HTTP_FORWARDED_FOR'];
        else if ($_SERVER['HTTP_FORWARDED'])
            return $_SERVER['HTTP_FORWARDED'];
        else if ($_SERVER['REMOTE_ADDR'])
            return $_SERVER['REMOTE_ADDR'];
        else
            return 'UNKNOWN';

    }

    /**
     * Check if user is admin for at least one module.
     *
     * @param $user
     * @return bool
     * @deprecated since release 2023.01.001
     */
    public static function isAdminForAnyModule($user): bool {
        if (!isset($user)) {
            return false;
        }
        if ($user->isAdmin()) {
            return true;
        }
        return false;
    }

    /**
     * Check if user id belongs to a system admin.
     * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
     * All Rights Reserved.
     * Contributor(s): ______________________________________..
     *
     * @param $user
     * @return bool
     */
    public static function isAdmin($user): bool {
        if (empty($user)) {
            return false;
        }

        return $user->isAdmin();
    }

    /**
     * @param $string
     * @param string $mod
     * @param string $selectedValue
     * @return mixed|string
     */
    public static function translate($string, string $mod = '', string $selectedValue = '') {
        global $mod_strings, $app_strings, $app_list_strings, $current_language;

        $returnValue = '';

        if (!isset( $app_list_strings )) {
            $app_list_strings = self::returnAppListStringsLanguage($current_language);
        }

        if (isset($mod_strings[$string])) {
            $returnValue = $mod_strings[$string];
        } elseif (isset($app_strings[$string])) {
            $returnValue = $app_strings[$string];
        } elseif (isset($app_list_strings[$string])) {
            $returnValue = $app_list_strings[$string];
        } elseif (isset($app_list_strings['moduleList']) && isset($app_list_strings['moduleList'][$string])) {
            $returnValue = $app_list_strings['moduleList'][$string];
        }

        if (empty($returnValue)) {
            return $string;
        }

        // Bug 48996 - Custom enums with '0' value were not returning because of empty check
        // Added a numeric 0 checker to the conditional to allow 0 value indexed to pass
        if (is_array($returnValue) && (!empty($selectedValue) || (is_numeric($selectedValue) && $selectedValue == 0))
            && isset($returnValue[$selectedValue])) {
            return $returnValue[$selectedValue];
        }

        return $returnValue;
    }

    /**
     * Designed to take a string passed in the URL as a parameter and clean all "bad" data from it
     *
     * @param string $str
     * @param string $filter which corresponds to a regular expression to use; choices are:
     * 		"STANDARD" ( default )
     * 		"STANDARDSPACE"
     * 		"FILE"
     * 		"NUMBER"
     * 		"SQL_COLUMN_LIST"
     * 		"PATH_NO_URL"
     * 		"SAFED_GET"
     * 		"UNIFIED_SEARCH"
     * 		"AUTO_INCREMENT"
     * 		"ALPHANUM"
     * @param boolean $dieOnBadData true (default) if you want to die if bad data if found, false if not
     */
    public static function cleanString(string $str, string $filter = "STANDARD", bool $dieOnBadData = true) {
        $filters = [
            "STANDARD" => '#[^A-Z0-9\-_\.\@]#i',
            "STANDARDSPACE" => '#[^A-Z0-9\-_\.\@\ ]#i',
            "FILE" => '#[^A-Z0-9\-_\.]#i',
            "NUMBER" => '#[^0-9\-]#i',
            "SQL_COLUMN_LIST" => '#[^A-Z0-9\(\),_\.]#i',
            "PATH_NO_URL" => '#://#i',
            "SAFED_GET" => '#[^A-Z0-9\@\=\&\?\.\/\-_~+]#i', /* range of allowed characters in a GET string */
            "UNIFIED_SEARCH" => "#[\\x00]#", /* cn: bug 3356 & 9236 - MBCS search strings */
            "AUTO_INCREMENT" => '#[^0-9\-,\ ]#i',
            "ALPHANUM" => '#[^A-Z0-9\-]#i',
        ];

        if (preg_match($filters[$filter], $str)) {
            if ((LoggerManager::getLogger())) {
                LoggerManager::getLogger()->fatal("SECURITY[$filter]: bad data passed in; string: {$str}");
            }
            if ($dieOnBadData) {
                die("Bad data passed in;");
            }
            return false;
        } else {
            return $str;
        }
    }

    /**
     * @param $value
     * @return array|string|string[]
     */
    public static function securexss($value) {
        if (is_array($value)) {
            $new = [];
            foreach ($value as $key => $val) {
                $new[$key] = self::securexss($val);
            }
            return $new;
        }
        static $xss_cleanup = ["&quot;" => "&#38;", '"' => '&quot;', "'" => '&#039;', '<' => '&lt;', '>' => '&gt;'];
        $value = preg_replace(['/javascript:/i', '/\0/'], ['java script:', ''], $value);
        $value = preg_replace('/javascript:/i', 'java script:', $value);
        return str_replace(array_keys($xss_cleanup), array_values($xss_cleanup), $value);
    }

    /**
     * @param false $msg
     */
    public static function displayNotice($msg = false):void {
        global $error_notice;
        //no error notice - lets just display the error to the user
        if (!isset($error_notice)) {
            echo '<br>' . $msg . '<br>';
        } else {
            $error_notice .= $msg . '<br>';
        }
    }

    /**
     * @param $errno
     * @param $errstr
     * @param $errfile
     * @param $errline
     * @deprecated since relese 2023.01.001
     */
    public static function StackTraceErrorHandler($errno, $errstr, $errfile, $errline) {
        $error_msg = " $errstr occurred in <b>$errfile</b> on line $errline [" . date("Y-m-d H:i:s") . ']';
        $halt_script = true;
        switch ($errno) {
            case 2048: return; //depricated we have lots of these ignore them
            case E_USER_NOTICE:
            case E_NOTICE:
                if (error_reporting() & E_NOTICE) {
                    $halt_script = false;
                    $type = 'Notice';
                } else
                    return;
                break;
            case E_USER_WARNING:
            case E_COMPILE_WARNING:
            case E_CORE_WARNING:
            case E_WARNING:

                $halt_script = false;
                $type = "Warning";
                break;

            case E_USER_ERROR:
            case E_COMPILE_ERROR:
            case E_CORE_ERROR:
            case E_ERROR:

                $type = "Fatal Error";
                break;

            case E_PARSE:

                $type = "Parse Error";
                break;

            default:
                //don't know what it is might not be so bad
                $halt_script = false;
                $type = "Unknown Error ($errno)";
                break;
        }
        $error_msg = '<b>' . $type . '</b>:' . $error_msg;
        echo $error_msg;
        self::displayStackTrace();
        if ($halt_script) {
            exit - 1;
        }
    }

    /**
     * @param false $textOnly
     * @deprecated since release 2023.01.001
     */
    public static function displayStackTrace(bool $textOnly = false): void {
        $stack = debug_backtrace();

        echo "\n\n display_stack_trace caller, file: " . $stack[0]['file'] . ' line#: ' . $stack[0]['line'];

        if (!$textOnly) {
            echo '<br>';
        }

        $first = true;
        $out = '';

        foreach ($stack as $item) {
            $file = '';
            $class = '';
            $line = '';
            $function = '';

            if (isset($item['file'])) {
                $file = $item['file'];
            }
            if (isset($item['class'])) {
                $class = $item['class'];
            }
            if (isset($item['line'])) {
                $line = $item['line'];
            }
            if (isset($item['function'])) {
                $function = $item['function'];
            }

            if (!$first) {
                if (!$textOnly) {
                    $out .= '<font color="black"><b>';
                }

                $out .= $file;

                if (!$textOnly) {
                    $out .= '</b></font><font color="blue">';
                }

                $out .= "[L:{$line}]";

                if (!$textOnly) {
                    $out .= '</font><font color="red">';
                }

                $out .= "({$class}:{$function})";

                if (!$textOnly) {
                    $out .= '</font><br>';
                } else {
                    $out .= "\n";
                }
            } else {
                $first = false;
            }
        }

        echo $out;
    }

    /**
     * tries to determine whether the Host machine is a Windows machine
     */
    public static function isWindows(): ?bool {
        static $is_windows = null;
        if (!isset($is_windows)) {
            $is_windows = strtoupper(substr(PHP_OS, 0, 3)) == 'WIN';
        }
        return $is_windows;
    }

    /**
     * This function will take a string that has tokens like {0}, {1} and will replace
     * those tokens with the args provided
     * @param    $format string or null to format
     * @param    $args args to replace
     * @return array|string|string[] $result a formatted string
     */
    public static function stringFormat($format, $args) {
        if(empty($format)){
            return '';
        }

        $result = $format;

        /** Bug47277 fix.
         * If args array has only one argument, and it's empty, so empty single quotes are used '' . That's because
         * IN () fails and IN ('') works.
         */
        if (count($args) == 1) {
            reset($args);
            $singleArgument = current($args);
            if (empty($singleArgument)) {
                return str_replace("{0}", "''", $result);
            }
        }
        /* End of fix */

        for ($i = 0; $i < count($args); $i++) {
            $result = str_replace('{' . $i . '}', $args[$i], $result);
        }
        return $result;
    }

    /**
     * Identical to sugarArrayMerge but with some speed improvements and used specifically to merge
     * language files.  Language file merges do not need to account for null values so we can get some
     * performance increases by using this specialized function. Note this merge function does not properly
     * handle null values.
     *
     * @param $gimp
     * @param $dom
     * @return array
     */
    public static function spiceLangArrayMerge($gimp, $dom): array {
        if (is_array($gimp) && is_array($dom)) {
            foreach ($dom as $domKey => $domVal) {
                if (isset($gimp[$domKey])) {
                    if (is_array($domVal)) {
                        $tempArr = [];
                        foreach ($domVal as $domArrKey => $domArrVal)
                            $tempArr[$domArrKey] = $domArrVal;
                        foreach ($gimp[$domKey] as $gimpArrKey => $gimpArrVal)
                            if (!isset($tempArr[$gimpArrKey]))
                                $tempArr[$gimpArrKey] = $gimpArrVal;
                        $gimp[$domKey] = $tempArr;
                    }
                    else {
                        $gimp[$domKey] = $domVal;
                    }
                } else {
                    $gimp[$domKey] = $domVal;
                }
            }
        }
        // if the passed value for gimp isn't an array, then return the $dom
        elseif (is_array($dom)) {
            return $dom;
        }

        return $gimp;
    }

    /**
     * Similiar to sugarArrayMerge except arrays of N depth are merged.
     *
     * @param array gimp the array whose values will be overloaded
     * @param array dom the array whose values will pwn the gimp's
     * @return array beaten gimp
     */
    public static function spiceArrayMergeRecursive($gimp, $dom): array {
        if (is_array($gimp) && is_array($dom)) {
            foreach ($dom as $domKey => $domVal) {
                if (array_key_exists($domKey, $gimp)) {
                    if (is_array($domVal) && is_array($gimp[$domKey])) {
                        $gimp[$domKey] = self::spiceArrayMergeRecursive($gimp[$domKey], $domVal);
                    } else {
                        $gimp[$domKey] = $domVal;
                    }
                } else {
                    $gimp[$domKey] = $domVal;
                }
            }
        }
        // if the passed value for gimp isn't an array, then return the $dom
        elseif (is_array($dom)) {
            return $dom;
        }

        return $gimp;
    }

    /**
     * @return bool
     */
    public static function inDeveloperMode(): bool {
        return isset(SpiceConfig::getInstance()->config['developerMode'])
            && SpiceConfig::getInstance()->config['developerMode'] === true;
    }

    /**
     * @return bool
     */
    public static function stackTrace(): bool {
        return isset(SpiceConfig::getInstance()->config['stack_trace_errors'])
            && SpiceConfig::getInstance()->config['stack_trace_errors'] === true;
    }

    /**
     * @param $string
     * @return array|false|string[]
     */
    public static function unencodeMultienum($string) {

        if (is_array($string)) {
            return $string;
        }

        if (empty($string)) {
            return [];
        }

        if (substr($string, 0, 1) == "^" && substr($string, -1) == "^") {
            $string = substr(substr($string, 1), 0, strlen($string) - 2);
        }

        return explode('^,^', $string);
    }

    /**
     * @param $arr
     * @return mixed|string
     */
    public static function encodeMultienumValue($arr) {
        if (!is_array($arr)) {
            return $arr;
        }

        if (empty($arr)) {
            return "";
        }

        return "^" . implode('^,^', $arr) . "^";
    }

    /**
     * @deprecated since release 2023.01.001 function cmp_beans removed
     * @param $beans
     * @param $field_name
     * @return mixed
     */
    public static function orderBeans($beans, $field_name) {
        //Since php 5.2 doesn't include closures, we must use a global to pass the order field to cmp_beans.
        global $sugar_web_service_order_by;
        $sugar_web_service_order_by = $field_name;
        usort($beans, "cmp_beans");
        return $beans;
    }

    /**
     * This function handles the repetitive code we have where we first check if a file exists in the
     * custom directory to determine whether we should load it, require it, include it, etc.  This function returns the
     * path of the custom file if it exists.  It basically checks if custom/{$file} exists and returns this path if so;
     * otherwise it return $file
     *
     * @param $file String of filename to check
     * @return string $file String of filename including custom directory if found
     */
    public static function getCustomFileIfExists(string $file): string {
        return file_exists("custom/{$file}") ? "custom/{$file}" : $file;
    }

    /**
     * Remove vars marked senstitive from array
     * @param array $defs
     * @param SpiceBean|array $data
     * @return mixed $data without sensitive fields
     */
    public static function cleanSensitiveData($defs, $data) {
        foreach ($defs as $field => $def) {
            if (!empty($def['sensitive'])) {
                if (is_array($data)) {
                    $data[$field] = '';
                }
                if ($data instanceof SpiceBean) {
                    $data->$field = '';
                }
            }
        }
        return $data;
    }

    /**
     * Gets the list of "*type_display*".
     *
     * @return array
     */
    public static function getTypeDisplayList(): array {
        return ['record_type_display', 'parent_type_display', 'record_type_display_notes'];
    }

    /**
     * get any Relationship between two modules as raw table rows
     *
     * @param $lhs_module
     * @param $rhs_module
     * @param string $name
     * @param string $type
     * @return array
     * @throws \Exception
     */
    public static function findRelationships($lhs_module, $rhs_module, $name = "", $type = ""): array {
        $db = DBManagerFactory::getInstance();

        $rels = [];
        // copied from Relationship module, but needed to modifiy, if there are more than one relationships of that combination
        $sql = "SELECT * FROM relationships
            WHERE deleted = 0
            AND (
            (lhs_module = '" . $lhs_module . "' AND rhs_module = '" . $rhs_module . "')
            OR
            (lhs_module = '" . $rhs_module . "' AND rhs_module = '" . $lhs_module . "')
            )
            ";
        if (!empty($type)) {
            $sql .= " AND relationship_type = '$type'";
        }
        if (!empty($name)) {
            $sql .= " AND relationship_name = '$name'";
        }
        $result = $db->query($sql, true, " Error searching relationships table...");
        while ($row = $db->fetchByAssoc($result)) {
            $rels [] = $row;
        }
        return $rels;
    }

    /**
     * @param null $year
     * @param null $mnth
     * @param null $day
     * @return mixed
     */
    public static function createDate($year = null, $mnth = null, $day = null) {
        $timedate = TimeDate::getInstance();
        $now = $timedate->getNow();
        if ($day==null) {
            $day=$now->day+mt_rand(0,365);
        }
        return $timedate->asDbDate($now->get_day_begin($day, $mnth, $year));
    }

    /**
     * Create a short url and save it in the DB.
     *
     * @param $route The route (long url).
     * @param int $active 1 (default) or 0 to indicate if the short url is (still/yet) usable.
     * @return false|string Returns the key of the short url or false in case of unsuccessful creation.
     * @throws \Exception
     */
    public static function createShortUrl($route, $active = 1) {
        $db = DBManagerFactory::getInstance();
        $maxAttempts = 100000;
        $route = $db->quote($route); // prevent sql injection
        $active *= 1; // prevent sql injection

        # Generate a random key for the short url and (in the hope of uniqueness) try to save it to the DB.
        # Do a specific number of attempts to get a unused key.
        # Concerning the complicated sql, see: https://stackoverflow.com/questions/3164505/mysql-insert-record-if-not-exists-in-table ("Insert record if not exists in table")
        $attemptCounter = 0;
        do {
            $attemptCounter++;
            $key = self::generateShortUrlKey(6);
            $guid = SpiceUtils::createGuid();
            $result = $db->limitQuery(sprintf(
                'INSERT INTO sysshorturls ( id, urlkey, route, active ) SELECT * FROM ( SELECT "%s" AS id, "%s" AS urlkey, "%s" AS route, %d AS active) AS tmp WHERE NOT EXISTS ( SELECT urlkey FROM sysshorturls WHERE urlkey = "%s" )',
                $guid, $key, $route, $active, $key), 0, 1);
        } while ($db->getAffectedRowCount($result) === 0 and $attemptCounter < $maxAttempts);

        if ($attemptCounter === $maxAttempts) {
            LoggerManager::getLogger()->fatal('Could not create short url, could not get any free key. Did '.$maxAttempts.' attempts. Last unsuccessful attempt with key "'.$key.'" (and GUID "'.$guid.'").');
            return false;
        } else {
            return $key;
        }
    }

    /**
     * Generate a random key for a short url.
     *
     * @param $length The length of the key. Default is 6.
     * @return string The generated key.
     */
    public static function generateShortUrlKey($length = 6): string {
        // chars to select from (without specific characters to prevent confusion when reading and retyping the key)
        $LOWERCASE = 'abcdefghijkmnopqrstuvwxyz'; // without "l"!
        $NUMBER = '23456789'; // without "0" and "1"!
        $UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // without "O" and "I"!
        $charBKT = $UPPERCASE . $LOWERCASE . $NUMBER;

        $key = '';
        for ($i = 0; $i < $length; $i++) {  // loop and create key
            $key = $key . substr($charBKT, rand() % strlen($charBKT), 1);
        }
        return $key;
    }

    /**
     * currency_format_number
     *
     * This method is a wrapper designed exclusively for formatting currency values
     * with the assumption that the method caller wants a currency formatted value
     * matching his/her user preferences(if set) or the system configuration defaults
     *(if user preferences are not defined).
     *
     * @param $amount The amount to be formatted
     * @param $params Optional parameters(see @format_number)
     * @return String representation of amount with formatting applied
     */
    public static function currencyFormatNumber($amount, $params = []): string {
        if(is_null($amount) || $amount === '') return '';

        $locale = new Localization();
        if (isset($params['round']) && is_int($params['round'])) {
            $real_round = $params['round'];
        } else {
            $real_round = $locale->getPrecedentPreference('default_currency_significant_digits');
        }
        if (isset($params['decimals']) && is_int($params['decimals'])) {
            $real_decimals = $params['decimals'];
        } else {
            $real_decimals = $locale->getPrecedentPreference('default_currency_significant_digits');
        }
        $real_round = $real_round == '' ? 0 : $real_round;
        $real_decimals = $real_decimals == '' ? 0 : $real_decimals;

        $showCurrencySymbol = $locale->getPrecedentPreference('default_currency_symbol') != '' ? true : false;
        if ($showCurrencySymbol && !isset($params['currency_symbol'])) {
            $params["currency_symbol"] = true;
        }
        return self::formatNumber($amount, $real_round, $real_decimals, $params);

    }

    /**
     * format_number(deprecated)
     *
     * This method accepts an amount and formats it given the user's preferences.
     * Should the values set in the user preferences be invalid then it will
     * apply the system wide Sugar configuration values.  Calls to
     * getPrecendentPreference() method in Localization.php are made that
     * handle this logic.
     *
     * Going forward with Sugar 4.5.0e+ implementations, users of this class should
     * simple call this function with $amount parameter and leave it to the
     * class to locate and apply the appropriate formatting.
     *
     * One of the problems is that there is considerable legacy code that is using
     * this method for non currency formatting.  In other words, the format_number
     * method may be called to just display a number like 1,000 formatted appropriately.
     *
     * Also, issues about responsibilities arise.  Currently the callers of this function
     * are responsible for passing in the appropriate decimal and number rounding digits
     * as well as parameters to control displaying the currency symbol or not.
     *
     * @param $amount The currency amount to apply formatting to
     * @param $round Integer value for number of places to round to
     * @param $decimals Integer value for number of decimals to round to
     * @param $params Array of additional parameter values
     *
     *
     * The following are passed in as an array of params:
     *        boolean $params['currency_symbol'] - true to display currency symbol
     *        boolean $params['convert'] - true to convert from USD dollar
     *        boolean $params['percentage'] - true to display % sign
     *        boolean $params['symbol_space'] - true to have space between currency symbol and amount
     *        String  $params['symbol_override'] - string to over default currency symbol
     *        String  $params['type'] - pass in 'pdf' for pdf currency symbol conversion
     *        String  $params['currency_id'] - currency_id to retreive, defaults to current user
     *        String  $params['human'] - formatting that truncates the first thousands and appends "k"
     * @return String formatted currency value
     * @see include/Localization/Localization.php
     */
    public static function formatNumber($amount, $round = null, $decimals = null, $params = []): string {
        $locale = new Localization();
        $current_user = AuthenticationController::getInstance()->getCurrentUser();
        static $current_users_currency = null;
        static $last_override_currency = null;
        static $override_currency_id = null;
        static $currency;

        $seps = self::getNumberSeperators();
        $num_grp_sep = $seps[0];
        $dec_sep = $seps[1];

        // cn: bug 8522 - sig digits not honored in pdfs
        /** @var $locale Localization */
        if (is_null($decimals)) {
            $decimals = $locale->getPrecision();
        }
        if (is_null($round)) {
            $round = $locale->getPrecision();
        }

        // only create a currency object if we need it
        if ((!empty($params['currency_symbol']) && $params['currency_symbol']) ||
            (!empty($params['convert']) && $params['convert']) ||
            (!empty($params['currency_id']))) {
            // if we have an override currency_id
            if (!empty($params['currency_id'])) {
                if ($override_currency_id != $params['currency_id']) {
                    $override_currency_id = $params['currency_id'];
                    $currency = BeanFactory::getBean('Currencies');
                    $currency->retrieve($override_currency_id);
                    $last_override_currency = $currency;
                } else {
                    $currency = $last_override_currency;
                }

            } elseif (!isset($current_users_currency)) { // else use current user's
                $current_users_currency = BeanFactory::getBean('Currencies');
                if($current_user->getPreference('currency')) $current_users_currency->retrieve($current_user->getPreference('currency'));
                else $current_users_currency->retrieve('-99'); // use default if none set
                $currency = $current_users_currency;
            }
        }
        if (!empty($params['convert']) && $params['convert']) {
            $amount = $currency->convertFromBase($amount, 6);
        }

        if (!empty($params['currency_symbol']) && $params['currency_symbol']) {
            if (!empty($params['symbol_override'])) {
                $symbol = $params['symbol_override'];
            }
            elseif (!empty($params['type']) && $params['type'] == 'pdf') {
                $symbol = $currency->getPdfCurrencySymbol();
                $symbol_space = false;
            } else {
                if(empty($currency->symbol))
                    $symbol = $currency->getDefaultCurrencySymbol();
                else
                    $symbol = $currency->symbol;
                $symbol_space = true;
            }
        } else {
            $symbol = '';
        }

        if (isset($params['charset_convert'])) {
            $symbol = $locale->translateCharset($symbol, 'UTF-8', $locale->getExportCharset());
        }

        if (empty($params['human'])) {
            $amount = number_format(round($amount, $round), $decimals, $dec_sep, $num_grp_sep);
            $amount = self::formatPlaceSymbol($amount, $symbol,(empty($params['symbol_space']) ? false : true));
        } else {
            // If amount is more greater than a thousand(positive or negative)
            if (strpos($amount, '.') > 0) {
                $checkAmount = strlen(substr($amount, 0, strpos($amount, '.')));
            }

            if ($checkAmount >= 1000 || $checkAmount <= -1000) {
                $amount = round(($amount / 1000), 0);
                $amount = number_format($amount, 0, $dec_sep, $num_grp_sep); // add for SI bug 52498
                $amount = $amount . 'k';
                $amount = self::formatPlaceSymbol($amount, $symbol,(empty($params['symbol_space']) ? false : true));
            } else {
                $amount = self::formatPlaceSymbol($amount, $symbol,(empty($params['symbol_space']) ? false : true));
            }
        }

        if (!empty($params['percentage']) && $params['percentage']) {
            $amount .= '%';
        }
        return $amount;

    }

    /**
     * @param $amount
     * @param $symbol
     * @param $symbol_space
     * @param string $symbol_position : added in Winter release 2017
     * @return string
     */
    public static function formatPlaceSymbol($amount, $symbol, $symbol_space, $symbol_position = 'left'): string {
        if ($symbol != '') {
            //get symbol_position from spice_config
            if (isset(SpiceConfig::getInstance()->config['default_currency_symbol_position'])) {
                $symbol_position = SpiceConfig::getInstance()->config['default_currency_symbol_position'];
            }

            switch ($symbol_position) {
                case 'right':
                    if ($symbol_space == true) {
                        $amount = $amount . ( function_exists('mb_chr') ? mb_chr(160):' ' ) . $symbol; # mb_chr() exists from PHP 7.2, 160 ... No-Break Space (nbsp)
                    } else {
                        $amount = $amount . $symbol;
                    }
                    break;
                default:
                    if ($symbol_space == true) {
                        $amount = $symbol . ( function_exists('mb_chr') ? mb_chr(160):' ' ) . $amount; # mb_chr() exists from PHP 7.2, 160 ... No-Break Space (nbsp)
                    } else {
                        $amount = $symbol . $amount;
                    }
            }
        }
        return $amount;
    }

    /**
     * Returns user/system preference for number grouping separator character(default ",") and the decimal separator
     *(default ".").  Special case: when num_grp_sep is ".", it will return NULL as the num_grp_sep.
     * @return array Two element array, first item is num_grp_sep, 2nd item is dec_sep
     */
    public static function getNumberSeperators($reset_sep = false): array {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();

        static $dec_sep = null;
        static $num_grp_sep = null;

        // This is typically only used during unit-tests
        // TODO: refactor this. unit tests should not have static dependencies
        if ($reset_sep)
        {
            $dec_sep = $num_grp_sep = null;
        }

        if ($dec_sep == null)
        {
            $dec_sep = SpiceConfig::getInstance()->config['default_decimal_seperator'];
            if (!empty($current_user->id))
            {
                $user_dec_sep = $current_user->getPreference('dec_sep');
                $dec_sep = (empty($user_dec_sep) ? SpiceConfig::getInstance()->config['default_decimal_seperator'] : $user_dec_sep);
            }
        }

        if ($num_grp_sep == null)
        {
            $num_grp_sep = SpiceConfig::getInstance()->config['default_number_grouping_seperator'];
            if (!empty($current_user->id))
            {
                $user_num_grp_sep = $current_user->getPreference('num_grp_sep');
                $num_grp_sep = (empty($user_num_grp_sep) ? SpiceConfig::getInstance()->config['default_number_grouping_seperator'] : $user_num_grp_sep);
            }
        }

        return [$num_grp_sep, $dec_sep];
    }

    /**
     * This function retrieves an application language file and returns the array of strings included.
     *
     * @param string $language specific language to load
     * @return array lang strings
     */
    public static function returnApplicationLanguage($language): ?array {
        global $app_strings;

        $cache_key = 'app_strings.' . $language;

        // Check for cached value
        $cache_entry = SpiceCache::get($cache_key);
        if (!empty($cache_entry)) {
            return $cache_entry;
        }

        $temp_app_strings = $app_strings;
        $default_language = SpiceLanguageManager::getInstance()->getSystemDefaultLanguage();

        $langs = [];
        if ($language != 'en_us') {
            $langs[] = 'en_us';
        }
        if ($default_language != 'en_us' && $language != $default_language) {
            $langs[] = $default_language;
        }

        $langs[] = $language;

        $app_strings_array = [];

        foreach ($langs as $lang) {
            $app_strings = [];
            if (file_exists("include/language/$lang.lang.php")) {
                include("include/language/$lang.lang.php");
                LoggerManager::getLogger()->info('language', "Found language file: $lang.lang.php");
            }
            if (file_exists("include/language/$lang.lang.override.php")) {
                include("include/language/$lang.lang.override.php");
                LoggerManager::getLogger()->info('language', "Found override language file: $lang.lang.override.php");
            }
            if (file_exists("include/language/$lang.lang.php.override")) {
                include("include/language/$lang.lang.php.override");
                LoggerManager::getLogger()->info('language', "Found override language file: $lang.lang.php.override");
            }
            if (file_exists("custom/application/Ext/Language/$lang.lang.ext.php")) {
                include("custom/application/Ext/Language/$lang.lang.ext.php");
                LoggerManager::getLogger()->info('language', "Found extended language file: $lang.lang.ext.php");
            }
            if (file_exists("custom/include/language/$lang.lang.php")) {
                include("custom/include/language/$lang.lang.php");
                LoggerManager::getLogger()->info('language', "Found custom language file: $lang.lang.php");
            }
            // BEGIN syslanguages
            if (file_exists("custom/application/Ext/Language/$lang.override.ext.php")) {
                global $extlabels;
                include("custom/application/Ext/Language/$lang.override.ext.php");
                $app_strings = array_merge($app_strings, $extlabels);
                LoggerManager::getLogger()->info('language', "Found extended language file: $lang.override.ext.php");
            }
            //END syslanguages
            $app_strings_array[] = $app_strings;
        }

        // BEGIN CR1000108 vardefs to db
        if (SpiceDictionaryVardefs::isDomainManaged()) {
            //load sys_app_list_strings
            $sys_app_list_strings = SpiceDictionaryVardefs::createDictionaryValidationDoms($language);
            // add to app_list_strings
            foreach ($sys_app_list_strings as $dom => $lang) {
                foreach ($lang[$language] as $values => $val) {
                    foreach ($val as $minvalue => $definition) {
                        $app_list_strings[$dom][$definition['enumvalue']] = $definition['translation'];
                    }
                }
            }
        }
// END


        $app_strings = [];
        foreach ($app_strings_array as $app_strings_item) {
            $app_strings = self::spiceLangArrayMerge($app_strings, $app_strings_item);
        }

        if (!isset($app_strings)) {
            LoggerManager::getLogger()->fatal("Unable to load the application language strings");
            return null;
        }

        // If we are in debug mode for translating, turn on the prefix now!
        if (!empty(SpiceConfig::getInstance()->config['translation_string_prefix'])) {
            foreach ($app_strings as $entry_key => $entry_value) {
                $app_strings[$entry_key] = $language . ' ' . $entry_value;
            }
        }
        if (isset($_SESSION['show_deleted'])) {
            $app_strings['LBL_DELETE_BUTTON'] = $app_strings['LBL_UNDELETE_BUTTON'];
            $app_strings['LBL_DELETE_BUTTON_LABEL'] = $app_strings['LBL_UNDELETE_BUTTON_LABEL'];
            $app_strings['LBL_DELETE_BUTTON_TITLE'] = $app_strings['LBL_UNDELETE_BUTTON_TITLE'];
            $app_strings['LBL_DELETE'] = $app_strings['LBL_UNDELETE'];
        }

        // $app_strings['LBL_ALT_HOT_KEY'] = get_alt_hot_key();

        $return_value = $app_strings;
        $app_strings = $temp_app_strings;

        SpiceCache::set($cache_key, $return_value);

        return $return_value;
    }

    /**
     * The dropdown items in custom language files is $app_list_strings['$key']['$second_key'] = $value not
     * $GLOBALS['app_list_strings']['$key'] = $value, so we have to delete the original ones in app_list_strings and relace it with the custom ones.
     * @param file string the language that you want include,
     * @param app_list_strings array the golbal strings
     * @return array
     * @deprecated since release 2023.01.001
     */ //jchi 25347
    public static function mergeCustomAppListStrings($file, $app_list_strings) {
        $app_list_strings_original = $app_list_strings;
        unset($app_list_strings);
        // FG - bug 45525 - $exemptDropdown array is defined (once) here, not inside the foreach
        //                  This way, language file can add items to save specific standard codelist from being overwritten
        $exemptDropdowns = [];
        include($file);
        if (!isset($app_list_strings) || !is_array($app_list_strings)) {
            return $app_list_strings_original;
        }
        //Bug 25347: We should not merge custom dropdown fields unless they relate to parent fields or the module list.
        // FG - bug 45525 - Specific codelists must NOT be overwritten
        $exemptDropdowns[] = "moduleList";
        $exemptDropdowns[] = "moduleListSingular";
        $exemptDropdowns = array_merge($exemptDropdowns, self::getTypeDisplayList());

        foreach ($app_list_strings as $key => $value) {
            if (!in_array($key, $exemptDropdowns) && array_key_exists($key, $app_list_strings_original)) {
                unset($app_list_strings_original["$key"]);
            }
        }
        $app_list_strings = self::spiceArrayMergeRecursive($app_list_strings_original, $app_list_strings);
        return $app_list_strings;
    }

    /**
     * This function retrieves an application language file and returns the array of strings included in the $app_list_strings var.
     *
     * @param string $language specific language to load
     * @return array lang strings
     */
    public static function returnAppListStringsLanguage($language = 'en_us', $scope = 'all'): ?array
    {
        global $app_list_strings;

        $cache_key = 'app_list_strings.' . $language;

        // Check for cached value
        if ($scope == 'all') {
            $cache_entry = SpiceCache::get($cache_key);
            if (!empty($cache_entry)) {
                return $cache_entry;
            }
        }

        $default_language = SpiceLanguageManager::getInstance()->getSystemDefaultLanguage();
        $temp_app_list_strings = $app_list_strings;

        $langs = [];
        if ($language != 'en_us') {
            $langs[] = 'en_us';
        }
        if ($default_language != 'en_us' && $language != $default_language) {
            $langs[] = $default_language;
        }
        $langs[] = $language;

        $app_list_strings_array = [];

//        if (SpiceDictionaryVardefs::isDomainManaged()) {
//            foreach ($langs as $lang) {
//                $app_list_strings = [];
//                if ($scope == 'all' || $scope == 'global') {
//                    if (file_exists("include/language/$lang.lang.php")) {
//                        include("include/language/$lang.lang.php");
//                        LoggerManager::getLogger()->info("Found language file: $lang.lang.php");
//                    }
//                    if (file_exists("include/language/$lang.lang.override.php")) {
//                        include("include/language/$lang.lang.override.php");
//                        LoggerManager::getLogger()->info("Found override language file: $lang.lang.override.php");
//                    }
//                    if (file_exists("include/language/$lang.lang.php.override")) {
//                        include("include/language/$lang.lang.php.override");
//                        LoggerManager::getLogger()->info("Found override language file: $lang.lang.php.override");
//                    }
//                }
//
//                // load BWC custom language app_list_strings
//                if ($scope == 'all' || $scope == 'custom') {
//                    //check custom
//                    if (file_exists("custom/include/language/$lang.lang.php")) {
//                        include("custom/include/language/$lang.lang.php");
//                        LoggerManager::getLogger()->info("Found language file: $lang.lang.php");
//                    }
//                    if (file_exists("custom/include/language/$lang.lang.override.php")) {
//                        include("custom/include/language/$lang.lang.override.php");
//                        LoggerManager::getLogger()->info("Found override language file: $lang.lang.override.php");
//                    }
//                    if (file_exists("custom/include/language/$lang.lang.php.override")) {
//                        include("custom/include/language/$lang.lang.php.override");
//                        LoggerManager::getLogger()->info("Found override language file: $lang.lang.php.override");
//                    }
//                    if (is_dir('custom/Extension/application/Ext/Language')) {
//                        foreach (new DirectoryIterator('custom/Extension/application/Ext/Language') as $langfile) {
//                            if ($langfile->isDot()) continue;
//                            if (preg_match('#^(' . $lang . ')\.#', $langfile->getFilename(), $found)) {
//                                include('custom/Extension/application/Ext/Language/' . $langfile->getFilename());
//                                LoggerManager::getLogger()->info("Found custom language file: {$langfile->getFilename()}");
//                            }
//                        }
//                    }
//                }
//
//                $app_list_strings_array[] = $app_list_strings;
//            }
//
//            $app_list_strings = [];
//            foreach ($app_list_strings_array as $app_list_strings_item) {
//                $app_list_strings = self::spiceLangArrayMerge($app_list_strings, $app_list_strings_item);
//            }
//
//            if ($scope == 'all' || $scope == 'custom') {
//                foreach ($langs as $lang) {
//                    if (file_exists("custom/application/Ext/Language/$lang.lang.ext.php")) {
//                        $app_list_strings = self::mergeCustomAppListStrings("custom/application/Ext/Language/$lang.lang.ext.php", $app_list_strings);
//                        LoggerManager::getLogger()->info("Found extended language file: $lang.lang.ext.php");
//                    }
//                    if (file_exists("custom/include/language/$lang.lang.php")) {
//                        include("custom/include/language/$lang.lang.php");
//                        LoggerManager::getLogger()->info("Found custom language file: $lang.lang.php");
//                    }
//                }
//            }
//        }

        // BEGIN CR1000108 vardefs to db
        if (SpiceDictionaryVardefs::isDomainManaged()) {
            // reset anything you've done so far
            $app_list_strings = [];
            //load sys_app_list_strings
            $sys_app_list_strings = SpiceDictionaryVardefs::createDictionaryValidationDoms($language);

            // add to app_list_strings
            foreach ($sys_app_list_strings as $dom => $lang) {
                foreach ($lang[$language] as $values => $val) {
                    foreach ($val as $enumvalue => $definition) {
                        $app_list_strings[$dom][$definition['enumvalue']] = $definition['translation'];
                    }
                }
            }
        }
        // END

        if (!isset($app_list_strings)) {
            LoggerManager::getLogger()->fatal("Unable to load the application language file for the selected language ($language) or the default language ($default_language) or the en_us language");
            return null;
        }

        $return_value = $app_list_strings;
        $app_list_strings = $temp_app_list_strings;

        //if ($scope != 'all') {
            SpiceCache::set($cache_key, $return_value);
        //}

        return $return_value;
    }

    /**
     * helper function to truncate the last 3 characters of a string
     *
     * @param string $string
     * @param int $limit
     * @return string
     */

    public static function truncateString(string $string, int $limit): string {
        if(strlen($string) <= $limit) {
            return $string;
        }
        $newString = mb_substr(html_entity_decode(strip_tags($string)), 0, $limit -3);


        return self::removeInvalidCharacter($newString).'…';

    }

    /**
     * removing the last characters if they are not regex
     *
     * @param string $string
     * @param int $limit
     * @return string
     */

    public static function removeInvalidCharacter(string $string): string {

        $subString = substr($string,-1);

        if(preg_match('/[^a-z_\-0-9]/i', $subString)){
            $subString = substr($string,0,-1);

            if(strlen($string) === 1) return '';

            $string = self::removeInvalidCharacter($subString);
        }
        return $string;
    }

    /**
     * @deprecated since release 2023.01.001
     * @param $str
     * @return array|string|string[]
     */
    public static function br2nl($str) {
        $regex = "#<[^>]+br.+?>#i";
        preg_match_all($regex, $str, $matches);

        foreach ($matches[0] as $match) {
            $str = str_replace($match, "<br>", $str);
        }

        $brs = array('<br>', '<br/>', '<br />');
        $str = str_replace("\r\n", "\n", $str); // make from windows-returns, *nix-returns
        $str = str_replace("\n\r", "\n", $str); // make from windows-returns, *nix-returns
        $str = str_replace("\r", "\n", $str); // make from windows-returns, *nix-returns
        $str = str_ireplace($brs, "\n", $str); // to retrieve it

        return $str;
    }

    /**
     * will return a list of field names that contain a value for an address country
     * base the search technical address names
     * @return void
     */
    public static function getListOfCountryFields(SpiceBean $bean) {
        $countryFields = [];
        foreach($bean->field_defs as $fieldName => $field){
            if(!preg_match("/(.*)address_country/", $field['name'])){
                continue;
            }
            $countryFields[] = $field['name'];
        }
        return $countryFields;
    }

    /**
     * Call this method instead of die().
     * We print the error message and then die with an appropriate
     * exit code.
     */
    public static function sugarDie($error_message, $exit_code = 1) {
        self::spiceCleanup();
        throw new \Exception( $error_message , 500) ;
    }
}
