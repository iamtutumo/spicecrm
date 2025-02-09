<?php
/*********************************************************************************
 * This file is part of KReporter. KReporter is an enhancement developed
 * by aac services k.s.. All rights are (c) 2016 by aac services k.s.
 *
 * This Version of the KReporter is licensed software and may only be used in
 * alignment with the License Agreement received with this Software.
 * This Software is copyrighted and may not be further distributed without
 * witten consent of aac services k.s.
 *
 * You can contact us at info@kreporter.org
 ********************************************************************************/

use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
use SpiceCRM\includes\SugarObjects\VardefManager;

SpiceDictionaryHandler::getInstance()->dictionary['KReport'] = ['table' => 'kreports',
    'fields' => [
        'report_module' => [
            'name' => 'report_module',
            'type' => 'varchar',
            'len' => '45',
            'vname' => 'LBL_MODULE',
        ],
        'report_status' => [
            'name' => 'report_status',
            'type' => 'enum',
            'options' => 'kreportstatus',
            'len' => '1',
            'vname' => 'LBL_STATUS'
        ],
        'report_type' => [
            'name' => 'report_type',
            'type' => 'enum',
            'options' => 'report_type_dom',
            'len' => '50',
            'vname' => 'LBL_TYPE'
        ],
        'union_modules' => [
            'name' => 'union_modules',
            'type' => 'json',
            'dbtype' => 'text',
        ],
        'reportoptions' => [
            'name' => 'reportoptions',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_REPORTOPTIONS'
        ],
        'listtype' => [
            'name' => 'listtype',
            'type' => 'varchar',
            'len' => '10',
            'vname' => 'LBL_LISTTYPE',
        ],
        'listtypeproperties' => [
            'name' => 'listtypeproperties',
            'type' => 'text',
        ],
        'selectionlimit' => [
            'name' => 'selectionlimit',
            'type' => 'varchar',
            'len' => '25',
            'vname' => 'LBL_SELECTIONLIMIT',
        ],
        'presentation_params' => [
            'name' => 'presentation_params',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_PRESENTATION_PARAMS',
        ],
        'visualization_params' => [
            'name' => 'visualization_params',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_VISUALIZATION_PARAMS',
        ],
        'integration_params' => [
            'name' => 'integration_params',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_INTEGRATION_PARAMS',
        ],
        'wheregroups' => [
            'name' => 'wheregroups',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_WHEREGROUPS',
            //'default' => '[]', //text field can't have a default value
        ],
        'whereconditions' => [
            'name' => 'whereconditions',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_WHERECONDITION',
            //'default' => '[]', //text field can't have a default value
        ],
        'listfields' => [
            'name' => 'listfields',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_LISTFIELDS'
        ],
        'unionlistfields' => [
            'name' => 'unionlistfields',
            'type' => 'json',
            'dbtype' => 'text',
            'vname' => 'LBL_UNIONLISTFIELDS'
        ],
        'advancedoptions' => [
            'name' => 'advancedoptions',
            'type' => 'text',
            'vname' => 'LBL_ADVANCEDOPTIONS'
        ],
        'category_id' => [
            'name' => 'category_id',
            'type' => 'char',
            'len' => 36,
            'vname' => 'LBL_CATEGORIES_ID'
        ],
        'category_name' => [
            'name' => 'category_name',
            'type' => 'name',
            'vname' => 'LBL_CATEGORY',
            'source' => 'non-db'
        ],
        'category_priority' => [
            'name' => 'category_priority',
            'type' => 'int',
            'len' => 6,
            'vname' => 'LBL_PRIORITY'
        ],
    ],
    'indices' => [
        ['name' => 'idx_reminder_name', 'type' => 'index', 'fields' => ['name']],
        ['name' => 'idx_cat', 'type' => 'index', 'fields' => ['category_id']],
    ],
    'optimistic_locking' => true,
];

VardefManager::createVardef('KReports', 'KReport', ['default', 'assignable']);
