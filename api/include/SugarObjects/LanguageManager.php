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

use SpiceCRM\includes\database\DBManagerFactory;
use SpiceCRM\includes\SpiceCache\SpiceCache;

/**
 * Language files management
 * @api
 */
class LanguageManager
{

    /**
     * syslanguage
     * @param bool $sysonly
     * @return array
     */
	public static function getLanguages($sysonly = false){
	    $db = DBManagerFactory::getInstance();

	    $retArray =[
	        'available' => [],
	        'default' => ''
        ];

        $ret = SpiceCache::get('languages');
        if(!$ret) {
            $languages = $db->query("SELECT * FROM syslangs " . ($sysonly ? "WHERE system_language = 1" : "") . " ORDER BY sort_sequence, language_name");
            while ($language = $db->fetchByAssoc($languages)) {
                $retArray['available'][] = [
                    'language_code' => $language['language_code'],
                    'language_name' => $language['language_name'],
                    'system_language' => $language['system_language'],
                    'communication_language' => $language['communication_language']
                ];

                if ($language['is_default']) {
                    $retArray['default'] = $language['language_code'];
                }
            }
            SpiceCache::set('languages', $retArray);
        } else {
            return $ret;
        }

        return $retArray;
    }

    /**
     * returns the code for the default language
     *
     * @return mixed
     * @throws \Exception
     */
    public static function getDefaultLanguage(){
        $db = DBManagerFactory::getInstance();
        $languages = $db->fetchByAssoc($db->query("SELECT language_code FROM syslangs WHERE is_default = 1"));
        return $languages['language_code'];
    }


    /**
     * syslanguage
     * @param $syslang
     * @return array
     */
	public static function loadDatabaseLanguage($syslang, $forceReload = false){
        // return session content if not loaded
        $cached = SpiceCache::get("language{$syslang}");
        if($cached){
            return $cached;
        }

        // get the content
        $retArray = [];

        // get default Labels
        $q = "SELECT syslanguagetranslations.*, syslanguagelabels.name label
        FROM syslanguagetranslations, syslanguagelabels
        WHERE syslanguagetranslations.syslanguagelabel_id = syslanguagelabels.id
          AND syslanguagetranslations.syslanguage = '".$syslang."'
        ORDER BY label ASC";

        if($res = DBManagerFactory::getInstance()->query($q)) {
            while ($row = DBManagerFactory::getInstance()->fetchByAssoc($res)) {
                $retArray[$row['label']] = [
                    'label' => $row['label'],
                    'default' => $row['translation_default'],
                    'short' => $row['translation_short'],
                    'long' => $row['translation_long'],
                ];
            }
        }

        // custom translations to default labels
        $q = "SELECT syslanguagecustomtranslations.*, syslanguagelabels.name label
        FROM syslanguagecustomtranslations, syslanguagelabels
        WHERE (syslanguagecustomtranslations.syslanguagelabel_id = syslanguagelabels.id )
          AND syslanguagecustomtranslations.syslanguage = '".$syslang."' ORDER BY label ASC";
        if($res = DBManagerFactory::getInstance()->query($q)) {
            while ($row = DBManagerFactory::getInstance()->fetchByAssoc($res)) {
                $retArray[$row['label']] = [
                    'label' => $row['label'],
                    'default' => $row['translation_default'],
                    'short' => $row['translation_short'],
                    'long' => $row['translation_long'],
                ];
            }
        }

        // get custom labels
        $q = "SELECT  syslanguagecustomtranslations.*, syslanguagecustomlabels.name label
        FROM syslanguagecustomtranslations, syslanguagecustomlabels
        WHERE syslanguagecustomtranslations.syslanguagelabel_id = syslanguagecustomlabels.id
          AND syslanguagecustomtranslations.syslanguage = '".$syslang."' ORDER BY label ASC";
        if($res = DBManagerFactory::getInstance()->query($q)) {
            while ($row = DBManagerFactory::getInstance()->fetchByAssoc($res)) {
                $retArray[$row['label']] = [
                    'label' => $row['label'],
                    'default' => $row['translation_default'],
                    'short' => $row['translation_short'],
                    'long' => $row['translation_long'],
                ];
            }
        }


        // cache the results
        SpiceCache::set("language{$syslang}", $retArray);

        return $retArray;
    }

    /**
     * return the translation array for a given label in a specific language
     *
     * @param string $label
     * @param string $syslang
     * @return void
     */
    public static function getLabelTranslation(string $label, string $syslang) : array {
        $labelArr = [];

        $cached = SpiceCache::get("language{$syslang}");

        if(empty($labelArr) && $cached && isset($cached[$label])){
            $labelArr = $cached[$label];
        }
        if(empty($labelArr)){
            $labelArr = self::getSpecificLabels($syslang, [$label]);
        }
        if(empty($labelArr)) {
            $labelArr = [];
        }
        return $labelArr;
    }
    /**
     * getSpecificLabels
     * @param $syslang
     * @param $labels
     * @return array Labels
     */
    static function getSpecificLabels( $syslang, $labels ) {
        $retArray = [];
        $db = DBManagerFactory::getInstance();

        // get default Labels
        $q = 'SELECT syslanguagetranslations.*, syslanguagelabels.name label
            FROM syslanguagetranslations, syslanguagelabels
            WHERE syslanguagetranslations.syslanguagelabel_id = syslanguagelabels.id
            AND syslanguagetranslations.syslanguage = \''. $db->quote( $syslang ) . '\'
            AND syslanguagelabels.name IN (\'' . implode( "','", $labels ).'\')';
        if ( $res = $db->query( $q )) {
            while ( $row = $db->fetchByAssoc( $res )) {
                $retArray[$row['label']] = [
                    'default' => $row['translation_default'],
                    'short' => $row['translation_short'],
                    'long' => $row['translation_long'],
                ];
            }
        }

        // custom translations to default labels
        $q = 'SELECT syslanguagecustomtranslations.*, syslanguagelabels.name label
            FROM syslanguagecustomtranslations, syslanguagelabels
            WHERE (syslanguagecustomtranslations.syslanguagelabel_id = syslanguagelabels.id )
            AND syslanguagecustomtranslations.syslanguage = \''. $db->quote( $syslang ).'\' 
            AND syslanguagelabels.name IN (\'' . implode( '\',\'', $labels ).'\')';
        if ( $res = $db->query( $q )) {
            while ( $row = $db->fetchByAssoc( $res )) {
                $retArray[$row['label']] = [
                    'default' => $row['translation_default'],
                    'short' => $row['translation_short'],
                    'long' => $row['translation_long'],
                ];
            }
        }

        // In case labels does not exist in the DB
        foreach ( $labels as $label ) {
            if ( !isset( $retArray[$label] )) {
                $retArray[$label] = [
                    'default' => $label,
                    'short' => $label,
                    'long' => $label
                ];
            }
        }

        return $retArray;
    }

    /**
     * checks if a label is already defined
     * @param $label
     * @return false
     * @throws \Exception
     */
    public static function checkLabelExists(string $label) {
        $db = DBManagerFactory::getInstance();
        return $db->getOne("SELECT id FROM (select id, name from syslanguagelabels UNION select id, name from syslanguagecustomlabels) tblabels WHERE name='$label'");
    }
}
