<?php
/*********************************************************************************
 * This file is part of SpiceCRM. SpiceCRM is an enhancement of SugarCRM Community Edition
 * and is developed by aac services k.s.. All rights are (c) 2016 by aac services k.s.
 * You can contact us at info@spicecrm.io
 *
 * SpiceCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version
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
 *
 * SpiceCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ********************************************************************************/

use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
/**
 * CR1000108
 * Tables for Spice variable definitions
 */
SpiceDictionaryHandler::getInstance()->dictionary['sysdomaindefinitions'] = [
    'table' => 'sysdomaindefinitions',
    'comment' => 'something like sugar var types',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'name' => [
                'name' => 'name',
                'type' => 'varchar',
                'len' => 100
            ],
            'fieldtype' => [
                'name' => 'fieldtype',
                'type' => 'varchar',
                'len' => 50
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdomaindefinitionspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdomaindefinitions'] = [
    'table' => 'syscustomdomaindefinitions',
    'comment' => 'something like sugar var types',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdomaindefinitions']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdomaindefinitionspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdomainfields'] = [
    'table' => 'sysdomainfields',
    'audited' => false,
    'comment' => 'something like database var types',
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id',
                'comment' => 'ID for this row'
            ],
            'name' => [
                'name' => 'name',
                'type' => 'varchar',
                'comment' => 'abstract definition for field name to apply when creating field'
            ],
            'sequence' => [
                'name' => 'sequence',
                'type' => 'int',
                'len' => 4
            ],
            'dbtype' => [
                'name' => 'dbtype',
                'type' => 'varchar',
                'len' => 50,
                'comment' => 'field type in database table'
            ],
            'fieldtype' => [
                'name' => 'fieldtype',
                'type' => 'varchar',
                'len' => 50,
                'comment' => 'field type in crm display'
            ],
            'len' => [
                'name' => 'len',
                'type' => 'varchar',
                'len' => 32,
                'comment' => 'field length in database table'
            ],
            'required' => [
                'name' => 'required',
                'type' => 'bool',
                'default' => 0,
                'comment' => 'field is required'
            ],
            'sysdomaindefinition_id' => [
                'name' => 'sysdomaindefinition_id',
                'type' => 'id',
                'comment' => 'id of related sysdomaindefinition'
            ],
            'sysdomainfieldvalidation_id' => [
                'name' => 'sysdomainfieldvalidation_id',
                'type' => 'id',
                'comment' => 'id of related sysdomainfieldvalidation'
            ],
            'exclude_from_index' => [
                'name' => 'exclude_from_index',
                'type' => 'bool',
                'comment' => 'do not use a field for a table index in database',
                'default' => 0
            ],
            'defaultvalue' => [
                'name' => 'defaultvalue',
                'type' => 'varchar',
                'comment' => 'the default value to set on save where field is not set'
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'label' => [
                'name' => 'label',
                'vname' => 'LBL_LABEL',
                'type' => 'varchar',
                'len' => 100
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        ['name' => 'sysdomainfieldspk', 'type' => 'primary', 'fields' => ['id']],
        ['name' => 'idx_sysdomainfields_sysdodefid', 'type' => 'index', 'fields' => ['sysdomaindefinition_id']],
        ['name' => 'idx_sysdomainfields_sysdofldvalid', 'type' => 'index', 'fields' => ['sysdomainfieldvalidation_id']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdomainfields'] = [
    'table' => 'syscustomdomainfields',
    'audited' => false,
    'comment' => 'something like database var types',
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdomainfields']['fields'],
    'indices' => [
        ['name' => 'syscustomdomainfieldspk', 'type' => 'primary', 'fields' => ['id']],
        ['name' => 'idx_syscustomdomainfields_sysdodefid', 'type' => 'index', 'fields' => ['sysdomaindefinition_id']],
        ['name' => 'idx_syscustomdomainfields_sysdofldvalid', 'type' => 'index', 'fields' => ['sysdomainfieldvalidation_id']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdomainfieldvalidations'] = [
    'table' => 'sysdomainfieldvalidations',
    'comment' => 'holding enum values',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id',
                'comment' => 'ID for this row'
            ],
            'name' => [
                'name' => 'name',
                'type' => 'varchar',
                'len' => 100
            ],
            'validation_type' => [
                'name' => 'validation_type',
                'type' => 'varchar',
                'len' => 32,
                'comment' => 'possible values: options|range'
            ],
            'operator' => [
                'name' => 'operator',
                'type' => 'varchar',
                'len' => 32
            ],
//            'function_name' => [
//                'name' => 'function_name',
//                'type' => 'varchar',
//                'len' => '100'
//            ],
            'order_by' => [
                'name' => 'order_by',
                'type' => 'varchar',
                'comment' => 'name of field to sort by'
            ],
            'sort_flag' => [
                'name' => 'sort_flag',
                'type' => 'varchar',
                'len' => 5,
                'comment' => 'possible values: asc|desc'
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdomainfieldvalidationspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'sysdomainfieldvalidations_alt',
            'type' => 'unique',
            'fields' => ['name']
        ],
        [
            'name' => 'syscustomdomainfieldvalidations_statusdel',
            'type' => 'index',
            'fields' => ['status', 'deleted']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdomainfieldvalidations'] = [
    'table' => 'syscustomdomainfieldvalidations',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdomainfieldvalidations']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdomainfieldvalidationspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'syscustomdomainfieldvalidations_alt',
            'type' => 'unique',
            'fields' => ['name']
        ],
        [
            'name' => 'syscustomdomainfieldvalidations_statusdel',
            'type' => 'index',
            'fields' => ['status', 'deleted']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdomainfieldvalidationvalues'] = [
    'table' => 'sysdomainfieldvalidationvalues',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'sysdomainfieldvalidation_id' => [
                'name' => 'sysdomainfieldvalidation_id',
                'type' => 'id',
            ],
            'valuetype' => [
                'name' => 'valuetype',
                'type' => 'varchar',
                'len' => 12,
                'comment' => 'type for the value: string|integer'
            ],
            'enumvalue' => [
                'name' => 'enumvalue',
                'type' => 'varchar',
                'len' => 160,
                'comment' => 'the key saved to the table'
            ],
//            'minvalue' => [
//                'name' => 'minvalue',
//                'type' => 'varchar',
//                'len' => 160
//            ],
//            'maxvalue' => [
//                'name' => 'maxvalue',
//                'type' => 'varchar',
//                'len' => 160
//            ],
            'sequence' => [
                'name' => 'sequence',
                'type' => 'int',
                'len' => 6
            ],
            'label' => [
                'name' => 'label',
                'vname' => 'LBL_LABEL',
                'type' => 'varchar',
                'len' => 100
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdomainfieldvalidationvaluespk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'sysdomainfieldvalidationvalues_validstatusdel',
            'type' => 'index',
            'fields' => ['sysdomainfieldvalidation_id', 'status', 'deleted']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdomainfieldvalidationvalues'] = [
    'table' => 'syscustomdomainfieldvalidationvalues',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdomainfieldvalidationvalues']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdomainfieldvalidationvaluespk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'syscustomdomainfieldvalidationvalues_validstatusdel',
            'type' => 'index',
            'fields' => ['sysdomainfieldvalidation_id', 'status', 'deleted']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionarydefinitions'] = [
    'table' => 'sysdictionarydefinitions',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'name' => [
                'name' => 'name',
                'type' => 'varchar',
                'len' => 100
            ],
            'tablename' => [
                'name' => 'tablename',
                'type' => 'varchar',
                'len' => 200
            ],
            'tabletype' => [
                'name' => 'tabletype',
                'type' => 'varchar',
                'len' => 32,
                'comment' => 'categorize tables'
            ],
            'audited' => [
                'name' => 'audited',
                'type' => 'bool',
                'default' => '1'
            ],
            'sysdictionary_type' => [
                'name' => 'sysdictionary_type',
                'type' => 'enum',
            ],
            'sysdictionary_contenttype' => [
                'name' => 'sysdictionary_contenttype',
                'type' => 'enum',
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdictionarydefinitionspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_sysdictionarydefinition_del_status_type',
            'type' => 'index',
            'fields' => ['deleted', 'status', 'sysdictionary_type']
        ],
        [
            'name' => 'idx_sysdictionarydefinition_del_status',
            'type' => 'index',
            'fields' => ['deleted', 'status']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionarydefinitions'] = [
    'table' => 'syscustomdictionarydefinitions',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionarydefinitions']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdictionarydefinitionspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_syscustomdictionarydefinitions_del_status_type',
            'type' => 'index',
            'fields' => ['deleted', 'status', 'sysdictionary_type']
        ],
        [
            'name' => 'idx_syscustomdictionarydefinitions_del_status',
            'type' => 'index',
            'fields' => ['deleted', 'status']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryitems'] = [
    'table' => 'sysdictionaryitems',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'name' => [
                'name' => 'name',
                'type' => 'varchar',
                'len' => 50,
                'comment' => 'field name'
            ],
            'sysdictionarydefinition_id' => [
                'name' => 'sysdictionarydefinition_id',
                'type' => 'id',
                'comment' => 'parent dictionary'
            ],
            'sysdictionary_ref_id' => [
                'name' => 'sysdictionary_ref_id',
                'type' => 'id',
                'comment' => 'include other dictionary definition'
            ],
            'sysdomaindefinition_id' => [
                'name' => 'sysdomaindefinition_id',
                'type' => 'id',
            ],
            'label' => [
                'name' => 'label',
                'vname' => 'LBL_LABEL',
                'type' => 'varchar',
                'len' => 100
            ],
            'labelinputhelper' => [
                'name' => 'labelinputhelper',
                'vname' => 'LBL_INPUT_HELPER',
                'type' => 'varchar',
                'len' => 100
            ],
            'non_db' => [
                'name' => 'non_db',
                'type' => 'bool',
            ],
            'exclude_from_audited' => [
                'name' => 'exclude_from_audited',
                'type' => 'bool',
            ],
            'required' => [
                'name' => 'required',
                'type' => 'bool',
                'default' => '0'
            ],
            'default_value' => [
                'name' => 'default_value',
                'type' => 'varchar',
                'comment' => 'The default value to set when field is empty'
            ],
            'sequence' => [
                'name' => 'sequence',
                'type' => 'int',
                'comment' => 'the sequence to sort on for a readable table struture'
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'internal_only' => [
                'name' => 'internal_only',
                'type' => 'bool',
                'default' => 0
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ],
            'duplicate_merge' => [
                'name' => 'duplicate_merge',
                'type' => 'bool',
                'default' => 1
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdictionaryitemspk',
            'type' => 'primary',
            'fields' => ['id']
        ],

    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionaryitems'] = [
    'table' => 'syscustomdictionaryitems',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryitems']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdictionaryitemspk',
            'type' => 'primary',
            'fields' => ['id']
        ],

    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryindices'] = [
    'table' => 'sysdictionaryindices',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'sysdictionaryname' => [
                'name' => 'sysdictionaryname',
                'type' => 'varchar',
                'len' => 150,
                'comment' => 'dictionary name the index is related to'
            ],
            'sysdictionarydefinition_id' => [
                'name' => 'sysdictionarydefinition_id',
                'type' => 'id',
                'comment' => 'dictionary ID the index is related to'
            ],
            'indexname' => [
                'name' => 'indexname',
                'type' => 'varchar',
                'len' => 100,
                'comment' => 'the technical name of the index'
            ],
            'indextype' => [
                'name' => 'indextype',
                'type' => 'varchar',
                'len' => 32,
                'comment' => 'the type of index: primary|index|unique|alternate_key'
            ],
            'indexdefinition' => [
                'name' => 'indexdefinition',
                'type' => 'json',
                'dbtype' => 'text',
                'comment' => 'the full index configuration as json'
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdictionaryindicespk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_sysdictionaryindices_sysdictionarydef',
            'type' => 'index',
            'fields' => ['sysdictionarydefinition_id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryindexes'] = [
    'table' => 'sysdictionaryindexes',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'name' => [
                'name' => 'name',
                'type' => 'varchar',
                'len' => 100
            ],
            'sysdictionarydefinition_id' => [
                'name' => 'sysdictionarydefinition_id',
                'type' => 'id',
            ],
            'indextype' => [
                'name' => 'indextype',
                'type' => 'varchar',
                'len' => 32
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdictionaryindexespk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_sysdictionaryindexes_sysdictionarydef',
            'type' => 'index',
            'fields' => ['sysdictionarydefinition_id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionaryindexes'] = [
    'table' => 'syscustomdictionaryindexes',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryindexes']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdictionaryindexespk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_syscustomdictionaryindexes_sysdictionarydef',
            'type' => 'index',
            'fields' => ['sysdictionarydefinition_id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryindexitems'] = [
    'table' => 'sysdictionaryindexitems',
    'audited' => false,
    'fields' =>
        [
            'id' => [
                'name' => 'id',
                'type' => 'id'
            ],
            'sysdictionaryindex_id' => [
                'name' => 'sysdictionaryindex_id',
                'type' => 'varchar',
                'len' => 36
            ],
            'sysdictionaryitem_id' => [
                'name' => 'sysdictionaryitem_id',
                'type' => 'varchar',
                'len' => 36
            ],
            'sequence' => [
                'name' => 'sequence',
                'type' => 'int',
                'len' => 4
            ],
            'description' => [
                'name' => 'description',
                'type' => 'shorttext',
                'len' => 1000
            ],
            'version' => [
                'name' => 'version',
                'type' => 'varchar',
                'len' => 16
            ],
            'package' => [
                'name' => 'package',
                'type' => 'varchar',
                'len' => 32
            ],
            'status' => [
                'name' => 'status',
                'type' => 'varchar',
                'len' => 1,
                'default' => 'd',
                'comment' => 'the status of the item, d for draft, a for active, i for inactive'
            ],
            'deleted' => [
                'name' => 'deleted',
                'type' => 'bool',
                'default' => 0
            ]
        ],
    'indices' => [
        [
            'name' => 'sysdictionaryindexitemspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionaryindexitems'] = [
    'table' => 'syscustomdictionaryindexitems',
    'audited' => false,
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryindexitems']['fields'],
    'indices' => [
        [
            'name' => 'syscustomdictionaryindexitemspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryrelationships'] = [
    'table' => 'sysdictionaryrelationships',
    'fields' => [
        'id' => [
            'name' => 'id',
            'vname' => 'LBL_ID',
            'type' => 'id',
        ],
        'name' => [
            'name' => 'name',
            'vname' => 'LBL_NAME',
            'type' => 'varchar',
            'required'=>true,
            'len' => 150,
            'comment' => 'the logical name for the relationship'
        ],
        'relationship_name' => [
            'name' => 'relationship_name',
            'vname' => 'LBL_RELATIONSHIP_NAME',
            'type' => 'varchar',
            'required'=>true,
            'len' => 150,
            'comment' => 'the technical name for the relationship'
        ],
        'lhs_sysdictionarydefinition_id' => [
            'name' => 'lhs_sysdictionarydefinition_id',
            'vname' => 'LBL_LHS_TABLE',
            'type' => 'id',
            'required' => true,
            'comment' => 'Dictionary reference for left side'
        ],
        'lhs_sysdictionaryitem_id' => [
            'name' => 'lhs_sysdictionaryitem_id',
            'vname' => 'LBL_LHS_KEY',
            'type' => 'id',
            'required' => true,
            'comment' => 'dictionary item id corresponding to key in table'
        ],
        'lhs_linkname' => [
            'name' => 'lhs_linkname',
            'vname' => 'LBL_LHS_LINKNAME',
            'type' => 'varchar',
            'required' => false,
            'len' => 100
        ],
        'lhs_linklabel' => [
            'name' => 'lhs_linklabel',
            'vname' => 'LBL_LABEL',
            'type' => 'varchar',
            'len' => 100
        ],
        'lhs_linkdefault' => [
            'name' => 'lhs_linkdefault',
            'vname' => 'LBL_DEFAULT',
            'type' => 'bool',
            'default' => false,
            'comment' => 'load link per default'
        ],
        'lhs_duplicatemerge' => [
            'name' => 'lhs_duplicatemerge',
            'vname' => 'LBL_DUPLICTAE_MERGE',
            'type' => 'bool',
        ],
        'rhs_sysdictionarydefinition_id' => [
            'name' => 'rhs_sysdictionarydefinition_id',
            'vname' => 'LBL_RHS_TABLE',
            'type' => 'id',
            'required' => true,
            'comment' => 'Dictionary reference for right side'
        ],
        'rhs_sysdictionaryitem_id' => [
            'name' => 'rhs_sysdictionaryitem_id',
            'vname' => 'LBL_RHS_KEY',
            'type' => 'id',
            'required' => false,
            'comment' => 'dictionary item id corresponding to key in table'
        ],
        'rhs_sysdictionaryitem_name' => [
            'name' => 'rhs_sysdictionaryitem_name',
            'vname' => 'LBL_RHS_KEY_NAME',
            'type' => 'varchar',
            'required' => false,
            'comment' => 'dictionary item name corresponding to field name of the key in table'
        ],
        'rhs_linkname' => [
            'name' => 'rhs_linkname',
            'vname' => 'LBL_RHS_LINKNAME',
            'type' => 'varchar',
            'required' => false,
            'len' => 100
        ],
        'rhs_linklabel' => [
            'name' => 'rhs_linklabel',
            'vname' => 'LBL_LABEL',
            'type' => 'varchar',
            'len' => 100
        ],
        'rhs_linkdefault' => [
            'name' => 'rhs_linkdefault',
            'vname' => 'LBL_DEFAULT',
            'type' => 'bool',
            'default' => false,
            'comment' => 'load link per default'
        ],
        'rhs_duplicatemerge' => [
            'name' => 'rhs_duplicatemerge',
            'vname' => 'LBL_DUPLICTAE_MERGE',
            'type' => 'bool',
        ],
        'rhs_relatename' => [
            'name' => 'rhs_relatename',
            'vname' => 'LBL_RHS_RELATENAME',
            'type' => 'varchar',
            'comment' => 'name of non db field for relate'
        ],
        'rhs_relatelabel' => [
            'name' => 'rhs_relatelabel',
            'vname' => 'LBL_LABEL',
            'type' => 'varchar',
            'len' => 100
        ],
        'join_sysdictionarydefinition_id' => [
            'name' => 'join_sysdictionarydefinition_id',
            'vname' => 'LBL_JOIN_TABLE',
            'type' => 'id',
            'comment' => 'metadata definition is now to be found in a dictionary'
        ],
        'join_lhs_sysdictionaryitem_id' => [
            'name' => 'join_lhs_sysdictionaryitem_id',
            'vname' => 'LBL_DICTIONARYITEM_ID',
            'type' => 'id',
            'comment' => 'dictionary item id corresponding join key in join table'
        ],
        'join_rhs_sysdictionaryitem_id' => [
            'name' => 'join_rhs_sysdictionaryitem_id',
            'vname' => 'LBL_DICTIONARYITEM_ID',
            'type' => 'id',
            'comment' => 'dictionary item id corresponding join key in join table'
        ],
        'relationship_type' => [
            'name' => 'relationship_type',
            'vname' => 'LBL_RELATIONSHIP_TYPE',
            'type' => 'enum',
            'options' => 'relationship_type_dom',
            'len' => 32,
            'comment' => 'relationship type like one-to-many, many-to-many...'
        ],
        'relationship_role_column' => [
            'name' => 'relationship_role_column',
            'vname' => 'LBL_RELATIONSHIP_ROLE_COLUMN',
            'type' => 'varchar',
            'len' => 64
        ],
        'relationship_role_column_value' => [
            'name' => 'relationship_role_column_value',
            'vname' => 'LBL_RELATIONSHIP_ROLE_COLUMN_VALUE',
            'type' => 'varchar',
            'len' => 50
        ],
        'reverse' => [
            'name' => 'reverse',
            'vname' => 'LBL_REVERSE',
            'type' => 'bool',
            'default' => false
        ],
        'status' => [
            'name' => 'status',
            'type' => 'varchar',
            'len' => 1,
            'default' => 'd',
            'comment' => 'the status of the item, d for draft, a for active, i for inactive'
        ],
        'deleted' => [
            'name' => 'deleted',
            'vname' => 'LBL_DELETED',
            'type' => 'bool',
            'default' => false
        ],
        'description' => [
            'name' => 'description',
            'type' => 'shorttext',
            'len' => 1000
        ],
        'version' => [
            'name' => 'version',
            'type' => 'varchar',
            'len' => 16
        ],
        'package' => [
            'name' => 'package',
            'type' => 'varchar',
            'len' => 32
        ]
    ],
    'indices' => [
        ['name' =>'sysdictionaryrelationshipspk', 'type' =>'primary', 'fields'=>['id']],
        ['name' =>'idx_sysdictionaryrelationship_name', 'type' =>'index', 'fields'=>['relationship_name']],
        ['name' =>'idx_sysdictionaryrelationship_del', 'type' =>'index', 'fields'=>['deleted']],
        ['name' =>'idx_sysdictionaryrelationship_lhs', 'type' =>'index', 'fields'=>['lhs_sysdictionarydefinition_id', 'status','deleted']],
        ['name' =>'idx_sysdictionaryrelationship_rhs', 'type' =>'index', 'fields'=>['rhs_sysdictionarydefinition_id', 'status','deleted']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionaryrelationships'] = [
    'table' => 'syscustomdictionaryrelationships',
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryrelationships']['fields'],
    'indices' => [
        ['name' =>'syscustomdictionaryrelationshipspk', 'type' =>'primary', 'fields'=>['id']],
        ['name' =>'idx_syscustomdictionaryrelationships_name', 'type' =>'index', 'fields'=>['relationship_name']],
        ['name' =>'idx_syscustomdictionaryrelationships_del', 'type' =>'index', 'fields'=>['deleted']],
        ['name' =>'idx_syscustomdictionaryrelationship_lhs', 'type' =>'index', 'fields'=>['lhs_sysdictionarydefinition_id', 'status','deleted']],
        ['name' =>'idx_syscustomdictionaryrelationship_rhs', 'type' =>'index', 'fields'=>['rhs_sysdictionarydefinition_id', 'status','deleted']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryrelationshipfields'] = [
    'table' => 'sysdictionaryrelationshipfields',
    'comment' => 'represents former rel_fields attribute in link',
    'fields' => [
        'id' => [
            'name' => 'id',
            'vname' => 'LBL_ID',
            'type' => 'id',
        ],
        'sysdictionaryrelationship_id' => [
            'name' => 'sysdictionaryrelationship_id',
            'vname' => 'LBL_RELATIONSHIP_ID',
            'type' => 'char',
            'len' => '36',
            'comment' => 'id of the m-2-m relationship'
        ],
        'map_to_fieldname' => [
            'name' => 'map_to_fieldname',
            'vname' => 'LBL_MAP_TO_FIELDNAME',
            'type' => 'varchar',
            'comment' => 'name of the non-db field to add to dictionary related to sysdictionarydefinition_id'
        ],
        'sysdictionarydefinition_id' => [
            'name' => 'sysdictionarydefinition_id',
            'vname' => 'LBL_SYSDICTIONARYDEFINITIONS_ID',
            'type' => 'char',
            'len' => '36',
            'comment' => 'the dictionary ID to which we add the non-db fields '
        ],
        'sysdictionaryitem_id' => [
            'name' => 'sysdictionaryitem_id',
            'vname' => 'LBL_SYSDICTIONARYITEM_ID',
            'type' => 'char',
            'len' => '36',
            'comment' => 'the field item ID corresponding to field name in m-2-m join table'
        ],
        'description' => [
            'name' => 'description',
            'type' => 'shorttext',
            'len' => 1000
        ],
        'version' => [
            'name' => 'version',
            'type' => 'varchar',
            'len' => 16
        ],
        'package' => [
            'name' => 'package',
            'type' => 'varchar',
            'len' => 32
        ],
        'status' => [
            'name' => 'status',
            'type' => 'varchar',
            'len' => 1,
            'default' => 'd',
            'comment' => 'the status of the item, d for draft, a for active, i for inactive'
        ],
        'deleted' => [
            'name' => 'deleted',
            'type' => 'bool',
            'default' => 0
        ]
    ],
    'indices' => [
        ['name' =>'sysdictionaryrelationshipfieldspk', 'type' => 'primary', 'fields' => ['id']],
        ['name' =>'idx_sysdictionaryrelationshipfields_delstatus', 'type' => 'index', 'fields' => ['deleted', 'status']],
        ['name' =>'idx_sysdictionaryrelationshipfields_delpackage', 'type' => 'index', 'fields' => ['deleted', 'package']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionaryrelationshipfields'] = [
    'table' => 'syscustomdictionaryrelationshipfields',
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryrelationshipfields']['fields'],
    'indices' => [
        ['name' =>'syscustomdictionaryrelationshipfieldspk', 'type' =>'primary', 'fields'=>['id']],
        ['name' =>'idx_syscustomdictionaryrelationshipfields_delstatus', 'type' => 'index', 'fields' => ['deleted', 'status']],
        ['name' =>'idx_syscustomdictionaryrelationshipfields_delpackage', 'type' => 'index', 'fields' => ['deleted', 'package']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryrelationshiprelatefields'] = [
    'table' => 'sysdictionaryrelationshiprelatefields',
    'comment' => 'represents former db_concat_fields attribute in relate name',
    'fields' => [
        'id' => [
            'name' => 'id',
            'vname' => 'LBL_ID',
            'type' => 'id',
        ],
        'sysdictionaryrelationship_id' => [
            'name' => 'sysdictionaryrelationship_id',
            'vname' => 'LBL_RELATIONSHIP_ID',
            'type' => 'varchar',
            'comment' => 'id of relationship'
        ],
        'sysdictionaryitem_id' => [
            'name' => 'sysdictionaryitem_id',
            'type' => 'id'
        ],
        'description' => [
            'name' => 'description',
            'type' => 'shorttext',
            'len' => 1000
        ],
        'sequence' => [
            'name' => 'sequence',
            'type' => 'int',
            'len' => 4
        ],
        'version' => [
            'name' => 'version',
            'type' => 'varchar',
            'len' => 16
        ],
        'package' => [
            'name' => 'package',
            'type' => 'varchar',
            'len' => 32
        ],
        'status' => [
            'name' => 'status',
            'type' => 'varchar',
            'len' => 1,
            'default' => 'd',
            'comment' => 'the status of the item, d for draft, a for active, i for inactive'
        ],
        'deleted' => [
            'name' => 'deleted',
            'type' => 'bool',
            'default' => 0
        ]
    ],
    'indices' => [
        ['name' =>'sysdictionaryrelationshiprelatefieldspk', 'type' =>'primary', 'fields'=>['id']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomdictionaryrelationshiprelatefields'] = [
    'table' => 'syscustomdictionaryrelationshiprelatefields',
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryrelationshiprelatefields']['fields'],
    'indices' => [
        ['name' =>'syscustomdictionaryrelationshiprelatefieldspk', 'type' =>'primary', 'fields'=>['id']],
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['sysdictionaryfields'] = [
    'table' => 'sysdictionaryfields',
    'comment' => 'used to cache parsed dictionary field definitions',
    'fields' => [
        'id' => [
            'name' => 'id',
            'type' => 'id'
        ],
        'sysdictionaryname' => [
            'name' => 'sysdictionaryname',
            'type' => 'varchar',
            'len' => 150,
            'comment' => 'use to store information about dictionary directly here - waiting for full migration'
        ],
        'sysdictionarytablename' => [
            'name' => 'sysdictionarytablename',
            'type' => 'varchar',
            'len' => 150,
            'comment' => 'use to store information about dictionary directly here - waiting for full migration'
        ],
        'sysdictionarytableaudited' => [
            'name' => 'sysdictionarytableaudited',
            'type' => 'int',
            'len' => 1,
            'comment' => 'use to store information about dictionary directly here - waiting for full migration'
        ],
        'sysdictionarytablecontenttype' => [
            'name' => 'sysdictionarytablecontenttype',
            'type' => 'varchar',
            'len' => 16,
            'comment' => 'store the content type of a table'
        ],
        'sysdictionarydefinition_id' => [
            'name' => 'sysdictionarydefinition_id',
            'type' => 'id',
            'comment' => 'the ID of the sysdictionary definition related to this entry'
        ],
        'sysdomainfield_id' => [
            'name' => 'sysdomainfield_id',
            'type' => 'id',
            'comment' => 'the ID of the sysdomainfield related to this entry. Not used yet - waiting for full migration'
        ],
        'fieldname' => [
            'name' => 'fieldname',
            'type' => 'varchar',
            'comment' => 'the field name'
        ],
        'fieldtype' => [
            'name' => 'fieldtype',
            'type' => 'varchar',
            'len' => 32,
            'comment' => 'the field ytpe'
        ],
        'fielddefinition' => [
            'name' => 'fielddefinition',
            'type' => 'json',
            'dbtype' => 'text',
            'comment' => 'the full field configuration as json'
        ]

    ],
    'indices' => [
        ['name' =>'sysdictionaryfieldspk', 'type' =>'primary', 'fields'=>['id']],
        ['name' =>'idx_sysdictionaryfields_defid', 'type' =>'index', 'fields'=>['sysdictionarydefinition_id']],
        ['name' =>'idx_sysdictionaryfields_domid', 'type' =>'index', 'fields'=>['sysdomainfield_id']],
        ['name' =>'idx_sysdictionaryfields_field', 'type' =>'index', 'fields'=>['fieldname']],
    ]
];

//SpiceDictionaryHandler::getInstance()->dictionary['sysdictionarycache'] = [
//    'table' => 'sysdictionarycache',
//    'comment' => 'used to cache full array of dictionary definitions',
//    'fields' => [
//        'id' => [
//            'name' => 'id',
//            'type' => 'id'
//        ],
//        'sysdictionaryfields' => [
//            'name' => 'sysdictionaryfields',
//            'type' => 'longtext',
//            'comment' => 'base64 encoded gzdeflate serialized array'
//        ]
//    ]
//];