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

SpiceDictionaryHandler::getInstance()->dictionary['syshooks'] = [
    'table' => 'syshooks',
    'fields' => [
        'id' => [
            'name' => 'id',
            'type' => 'id'
        ],
        'module' => [
            'name' => 'module',
            'type' => 'varchar',
            'len' => 50
        ],
        'event' => [
            'name' => 'event',
            'type' => 'varchar',
            'len' => 50
        ],
        'hook_index' => [
            'name' => 'hook_index',
            'type' => 'int',
        ],
        'hook_include' => [
            'name' => 'hook_include',
            'type' => 'varchar',
            'len' => 100
        ],
        'hook_class' => [
            'name' => 'hook_class',
            'type' => 'varchar',
            'len' =>  100
        ],
        'hook_method' => [
            'name' => 'hook_method',
            'type' => 'varchar',
            'len' => 50
        ],
        'hook_active' => [
            'name' => 'hook_active',
            'type' => 'bool',
            'default' => 0
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
        [
            'name' => 'syshookspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_syshooks_module',
            'type' => 'index',
            'fields' => ['module']
        ]
    ]
];

SpiceDictionaryHandler::getInstance()->dictionary['syscustomhooks'] = [
    'table' => 'syscustomhooks',
    'fields' => SpiceDictionaryHandler::getInstance()->dictionary['syshooks']['fields'],
    'indices' => [
        [
            'name' => 'syscustomhookspk',
            'type' => 'primary',
            'fields' => ['id']
        ],
        [
            'name' => 'idx_syscustomhooks_module',
            'type' => 'index',
            'fields' => ['module']
        ]
    ]
];
