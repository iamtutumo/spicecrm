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

SpiceDictionaryHandler::getInstance()->dictionary['Inquiry'] = [
    'table' => 'inquiries',
    'fields' => [
        'parent_id' => [
            'name' => 'parent_id',
            'vname' => 'LBL_LIST_RELATED_TO_ID',
            'type' => 'id',
            'required' => true,
        ],
        'parent_type' => [
            'name' => 'parent_type',
            'vname' => 'LBL_PARENT_TYPE',
            'type' => 'parent_type',
            'dbType' => 'varchar',
            'required' => true,
            'len' => 50,
        ],
        'parent_name' => [
            'name' => 'parent_name',
            'parent_type' => 'record_type_display',
            'type_name' => 'parent_type',
            'id_name' => 'parent_id',
            'vname' => 'LBL_RELATED_TO',
            'type' => 'parent',
            'required' => true,
            'source' => 'non-db'
        ],
        'name' => [
            'name' => 'name',
            'type' => 'varchar',
            'len' => 255,
            'required' => false,
            'vname' => 'LBL_INQUIRY_NUMBER',
        ],
        'status' => [
            'name' => 'status',
            'type' => 'enum',
            'options' => 'inquiry_status',
            'len' => 30,
            //'required' => true,
            'vname' => 'LBL_STATUS',
        ],
        'salutation' => [
            'name' => 'salutation',
            'type' => 'enum',
            'options' => 'salutation_dom',
            'len' => 255,
            'vname' => 'LBL_SALUTATION',
        ],
        'first_name' => [
            'name' => 'first_name',
            'type' => 'varchar',
            'len' => 100,
            'vname' => 'LBL_FIRST_NAME',
        ],
        'last_name' => [
            'name' => 'last_name',
            'type' => 'varchar',
            'len' => 100,
            'vname' => 'LBL_LAST_NAME',
        ],
        'email' => [
            'name' => 'email',
            'type' => 'varchar',
            //'type' => 'email',    # <--- don't use type email... will not work anymore in frontend
            //'dbtype' => 'varchar',
            'len' => 100,
            'vname' => 'LBL_EMAIL'
        ],
        'email1' => [
            'name' => 'email1',
            'type' => 'varchar',
            'len' => 100,
            'vname' => 'LBL_EMAIL',
            'source' => 'non-db',
            'comment' => 'a helper field to be used in the activities to find the email of the contact... will be filled in by custom logic inside the bean!',
        ],
        'phone_home' => [
            'name' => 'phone_home',
            'vname' => 'LBL_PHONE_HOME',
            'type' => 'phone',
            'dbType' => 'varchar',
            'len' => 100,
            'unified_search' => true,
        ],
        'phone_mobile' => [
            'name' => 'phone_mobile',
            'vname' => 'LBL_PHONE_MOBILE',
            'type' => 'phone',
            'dbType' => 'varchar',
            'len' => 100,
            'unified_search' => true,
        ],
        'phone_work' => [
            'name' => 'phone_work',
            'vname' => 'LBL_PHONE_WORK',
            'type' => 'phone',
            'dbType' => 'varchar',
            'len' => 100,
            'unified_search' => true,
        ],
        'phone_other' => [
            'name' => 'phone_other',
            'vname' => 'LBL_PHONE_OTHER',
            'type' => 'phone',
            'dbType' => 'varchar',
            'len' => 100,
            'unified_search' => true,
        ],
        'phone_fax' => [
            'name' => 'phone_fax',
            'vname' => 'LBL_PHONE_FAX',
            'type' => 'phone',
            'dbType' => 'varchar',
            'len' => 100,
            'unified_search' => true,
        ],
        'inquiry_type' => [
            'name' => 'inquiry_type',
            'type' => 'enum',
            'len' => 20,
            'vname' => 'LBL_TYPE',
            'options' => 'inquiry_type',
            'required' => true,
        ],
        'inquiry_source' => [
            'name' => 'inquiry_source',
            'type' => 'enum',
            'len' => 20,
            'options' => 'inquiry_source',
            'vname' => 'LBL_SOURCE',
        ],
        'inquiry_source_url' => [
            'name' => 'inquiry_source_url',
            'type' => 'varchar',
            'len' => 255,
            'vname' => 'LBL_URL',
        ],
        'requested_date' => [
            'name' => 'requested_date',
            'type' => 'datetime',
            'vname' => 'LBL_REQUESTED_DATE',
        ],
        'catalogorder_catalogs' => [
            'name' => 'catalogorder_catalogs',
            'type' => 'json',
            'dbType' => 'text',
            'vname' => 'LBL_CATALOGS',
        ],
        'catalogorder_service_provider' => [
            'name' => 'catalogorder_service_provider',
            'type' => 'enum',
            'len' => 50,
            'vname' => 'LBL_SERVICE_PROVIDER',
            'options' => 'catalogorder_service_providers',
        ],
        'catalogorders' => [
            'name' => 'catalogorders',
            'type' => 'link',
            'module' => 'CatalogOrders',
            'relationship' => 'inquiry_catalogorders',
            'source' => 'non-db',
        ],
        'gdpr_data_agreement' => [
            'name' => 'gdpr_data_agreement',
            'vname' => 'LBL_GDPR_DATA_AGREEMENT',
            'type' => 'bool',
            'default' => false,
            'comment' => 'GDPR(General Data Protection Rule) - DSGVO Datenverarbeitungs Zustimmung'
        ],
        'gdpr_marketing_agreement' => [
            'name' => 'gdpr_marketing_agreement',
            'vname' => 'LBL_GDPR_MARKETING_AGREEMENT',
            'type' => 'bool',
            'default' => false,
            'comment' => 'GDPR(General Data Protection Rule) - DSGVO Marketing Zustimmung'
        ],
        'inquiry_address_street' => [
            'name' => 'inquiry_address_street',
            'vname' => 'LBL_STREET',
            'type' => 'varchar',
            'len' => '150',
            'comment' => 'Street address for profile address',
            'merge_filter' => 'enabled',
        ],
        'inquiry_address_street_2' => [
            'name' => 'inquiry_address_street_2',
            'vname' => 'LBL_STREET_2',
            'type' => 'varchar',
            'len' => '150',
            'source' => 'non-db',
        ],
        'inquiry_address_street_3' => [
            'name' => 'inquiry_address_street_3',
            'vname' => 'LBL_STREET_3',
            'type' => 'varchar',
            'len' => '150',
            'source' => 'non-db',
        ],
        'inquiry_address_attn' => [
            'name'  => 'inquiry_address_attn',
            'type'  => 'varchar',
            'len'   => 150,
            'vname' => 'LBL_ACCOUNT',
        ],
        'inquiry_address_city' => [
            'name' => 'inquiry_address_city',
            'vname' => 'LBL_CITY',
            'type' => 'varchar',
            'len' => '100',
            'comment' => 'City for profile address',
            'merge_filter' => 'enabled',
        ],
        'inquiry_address_state' => [
            'name' => 'inquiry_address_state',
            'vname' => 'LBL_STATE',
            'type' => 'varchar',
            'len' => '100',
            'comment' => 'State for profile address',
            'merge_filter' => 'enabled',
        ],
        'inquiry_address_postalcode' => [
            'name' => 'inquiry_address_postalcode',
            'vname' => 'LBL_POSTALCODE',
            'type' => 'varchar',
            'len' => '20',
            'comment' => 'Postal code for profile address',
            'merge_filter' => 'enabled',
        ],
        'inquiry_address_pobox' => [
            'name' => 'inquiry_address_pobox',
            'vname' => 'LBL_POBOX',
            'type' => 'varchar',
            'len' => '20',
            'comment' => 'Ppobox for profile address',
            'merge_filter' => 'enabled',
        ],
        'inquiry_address_country' => [
            'name' => 'inquiry_address_country',
            'vname' => 'LBL_COUNTRY',
            'type' => 'varchar',
            'comment' => 'Country for profile address',
            'merge_filter' => 'enabled',
        ],
        'inquiry_address_latitude' => [
            'name' => 'inquiry_address_latitude',
            'vname' => 'LBL_LATITUDE',
            'type' => 'double',
        ],
        'inquiry_address_longitude' => [
            'name' => 'inquiry_address_longitude',
            'vname' => 'LBL_LONGITUDE',
            'type' => 'double',
        ],
        'emails' => [
            'name' => 'emails',
            'vname' => 'LBL_EMAILS',
            'type' => 'link',
            'relationship' => 'emails_inquiries',
            'module' => 'Emails',
            'bean_name' => 'Email',
            'source' => 'non-db'
        ],
        'productgroup_id' => [
            'name' => 'productgroup_id',
            'type' => 'varchar',
            'len' => 36,
        ],
        'productgroup' => [
            'name' => 'productgroup',
            'type' => 'link',
            'module' => 'ProductGroups',
            'relationship' => 'productgroup_inquiries',
            'source' => 'non-db',
        ],
        'productgroup_name' => [
            'name' => 'productgroup_name',
            'rname' => 'name',
            'id_name' => 'productgroup_id',
            'type' => 'relate',
            'link' => 'productgroup',
            'table' => 'productgroups',
            'module' => 'ProductGroups',
            'source' => 'non-db',
            'vname' => 'LBL_PRODUCTGROUP',
        ],
        'contact' => [
            'name' => 'contact',
            'type' => 'link',
            'module' => 'Contacts',
            'relationship' => 'contact_inquiries',
            'source' => 'non-db',
        ],
        'consumer' => [
            'name' => 'consumer',
            'type' => 'link',
            'module' => 'Consumers',
            'relationship' => 'consumer_inquiries',
            'source' => 'non-db',
        ],
        'account' => [
            'name' => 'account',
            'type' => 'link',
            'module' => 'Accounts',
            'relationship' => 'account_inquiries',
            'source' => 'non-db',
        ]
    ],
    'indices' => [

    ],
    'relationships' => [
        'contact_inquiries' => [
            'lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Inquiries',
            'rhs_table' => 'inquiries',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'account_inquiries' => [
            'lhs_module' => 'Accounts',
            'lhs_table' => 'accounts',
            'lhs_key' => 'id',
            'rhs_module' => 'Inquiries',
            'rhs_table' => 'inquiries',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Accounts'
        ],
        'consumer_inquiries' => [
            'lhs_module' => 'Consumers',
            'lhs_table' => 'consumers',
            'lhs_key' => 'id',
            'rhs_module' => 'Inquiries',
            'rhs_table' => 'inquiries',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Consumers'
        ],
        'productgroup_inquiries' => [
            'lhs_module' => 'ProductGroups',
            'lhs_table' => 'productgroups',
            'lhs_key' => 'id',
            'rhs_module' => 'Inquiries',
            'rhs_table' => 'inquiries',
            'rhs_key' => 'productgroup_id',
            'relationship_type' => 'one-to-many'
        ],
        'inquiry_catalogorders' => [
            'lhs_module' => 'Inquiries',
            'lhs_table' => 'inquiries',
            'lhs_key' => 'id',
            'rhs_module' => 'CatalogOrders',
            'rhs_table' => 'catalogorders',
            'rhs_key' => 'inquiry_id',
            'relationship_type' => 'one-to-many'
        ],
    ]
];

VarDefManager::createVardef('Inquiries', 'Inquiry', [
    'default', 'assignable'
]);
