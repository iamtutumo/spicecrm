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
use SpiceCRM\includes\SugarObjects\VardefManager;

SpiceDictionaryHandler::getInstance()->dictionary['UserQuota'] = [
    'table' => 'userquotas',
    'fields' => [
        'period' => [
            'name' => 'period',
            'type' => 'int'
        ],
        'year' => [
            'name' => 'year',
            'type' => 'int'
        ],
        'sales_quota' => [
            'name' => 'sales_quota',
            'type' => 'currency'
        ],
        'period_date' => [
            'name' => 'period_date',
            'type' => 'date'
        ],
        'user' => [
            'name' => 'user',
            'type' => 'link',
            'relationship' => 'users_userquotas',
            'source' => 'non-db',
            'vname' => 'LBL_USER',
        ]
    ],
    'relationships' => [
        'users_userquotas' =>
            [
                'lhs_module' => 'Users',
                'lhs_table' => 'users',
                'lhs_key' => 'id',
                'rhs_module' => 'UserQuotas',
                'rhs_table' => 'userquotas',
                'rhs_key' => 'assigned_user_id',
                'relationship_type' => 'one-to-many'
            ]
    ],
    'indices' => [
        [
            'name' => 'idx_userquotasuserid',
            'type' => 'index',
            'fields' => ['assigned_user_id']
        ]
    ]
];

VardefManager::createVardef('UserQuotas', 'UserQuota', ['default', 'assignable']);
