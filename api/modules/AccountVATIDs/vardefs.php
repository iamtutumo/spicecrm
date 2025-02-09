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

SpiceDictionaryHandler::getInstance()->dictionary['AccountVATID'] = [
    'table' => 'accountvatids',
    'comment' => 'AccountVATIDs Module',
    'audited' => true,
    'duplicate_merge' => false,
    'unified_search' => false,

    'fields' => [
        'vat_id' => [
            'name' => 'vat_id',
            'type' => 'varchar',
            'len' => '100',
            'vname' => 'LBL_VATID',
        ],
        'vatid_status' => [
            'name' => 'vatid_status',
            'type' => 'varchar',
            'len' => '100',
            'vname' => 'LBL_STATUS',
        ],
        'verification_details' => [
            'name' => 'verification_details',
            'type' => 'text',
            'vname' => 'LBL_VERIFICATION_DETAILS',
        ],
        'country' => [
            'name' => 'country',
            'type' => 'enum',
            'options' => 'vat_country_dom',
            'vname' => 'LBL_COUNTRY',
        ],
        'account_id' => [
            'name' => 'account_id',
            'vname' => 'LBL_ACCOUNT',
            'type' => 'id',
            'required' => false
        ],
        'account_name' => [
            'name' => 'account_name',
            'rname' => 'name',
            'id_name' => 'account_id',
            'vname' => 'LBL_ACCOUNT',
            'type' => 'relate',
            'link' => 'account',
            'isnull' => 'true',
            'table' => 'accounts',
            'module' => 'Accounts',
            'source' => 'non-db',
        ],
        'account' => [
            'name' => 'account',
            'type' => 'link',
            'vname' => 'LBL_ACCOUNT',
            'relationship' => 'account_accountvatids',
            'module' => 'Accounts',
            'source' => 'non-db'
        ],

    ],
    'relationships' => [],

    'indices' => [
        ['name' => 'idx_accountvatids_accid_del', 'type' => 'index', 'fields' => ['account_id', 'deleted'],],
    ],

];

VardefManager::createVardef('AccountVATIDs', 'AccountVATID', ['default', 'assignable']);
