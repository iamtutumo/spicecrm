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

SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket'] = [
    'table' => 'servicetickets',
    'comment' => 'ServiceTickets Module',
    'audited' => true,
    'fields' => [
        'name' => [
            'name' => 'name',
            'vname' => 'LBL_TOPIC',
            'type' => 'varchar',
            'len' => 100,
            'required' => false
        ],
        'has_notification' => [
            'name' => 'has_notification',
            'vname' => 'LBL_HAS_NOTIFICATION',
            'type' => 'bool',
            'default' => 0,
            'comment' => 'inidcates that there is a new notification'
        ],
        'email1' => [
            'name' => 'email1',
            'vname' => 'LBL_EMAIL1',
            'source' => 'non-db',
            'required' => false
        ],
        'customer_type' => [
            'name' => 'customer_type',
            'vname' => 'LBL_CUSTOMER_TYPE',
            'type' => 'enum',
            'length' => 1,
            'options' => 'customer_type_dom',
            'default' => 'B',
            'required' => true
        ],
        //account
        'account_id' => [
            'name' => 'account_id',
            'vname' => 'LBL_ACCOUNT_ID',
            'type' => 'id',
        ],
        'account_name' => [
            'name' => 'account_name',
            'vname' => 'LBL_ACCOUNT',
            'type' => 'relate',
            'source' => 'non-db',
            'len' => '255',
            'id_name' => 'account_id',
            'rname' => 'name',
            'module' => 'Accounts',
            'link' => 'accounts',
            'join_name' => 'accounts'
        ],
        'accounts' => [
            'name' => 'accounts',
            'module' => 'Accounts',
            'type' => 'link',
            'relationship' => 'servicetickets_accounts',
            'link_type' => 'one',
            'source' => 'non-db',
            'vname' => 'LBL_ACCOUNTS',
        ],
        //parent
        'parent_id' => [
            'name' => 'parent_id',
            'vname' => 'LBL_LIST_RELATED_TO_ID',
            'type' => 'id',
            'comment' => 'The ID of the parent Sugar object identified by parent_type'
        ],
        'parent_type' => [
            'name' => 'parent_type',
            'vname' => 'LBL_PARENT_TYPE',
            'type' => 'parent_type',
            'dbType' => 'varchar',
            'required' => false,
            'len' => 255,
            'comment' => 'The Sugar object to which the call is related',
        ],
        'parent_name' => [
            'name' => 'parent_name',
            'type_name' => 'parent_type',
            'id_name' => 'parent_id',
            'vname' => 'LBL_RELATED_TO',
            'type' => 'parent',
            'source' => 'non-db',
        ],
        'contacts' => [
            'vname' => 'LBL_CONTACTS',
            'name' => 'contacts',
            'type' => 'link',
            'module' => 'Contacts',
            'relationship' => 'servicetickets_contacts',
            'link_type' => 'one',
            'source' => 'non-db'
        ],
        'consumers' => [
            'vname' => 'LBL_CONSUMERS',
            'name' => 'consumers',
            'type' => 'link',
            'module' => 'Consumers',
            'relationship' => 'servicetickets_consumers',
            'link_type' => 'one',
            'source' => 'non-db'
        ],
        'users' => [
            'vname' => 'LBL_USERS',
            'name' => 'users',
            'type' => 'link',
            'module' => 'Users',
            'relationship' => 'servicetickets_users',
            'link_type' => 'one',
            'source' => 'non-db'
        ],
        'date_closed' => [
            'name' => 'date_closed',
            'vname' => 'LBL_DATE_CLOSED',
            'type' => 'datetime',
            'comment' => 'Date ticket was closed',
        ],
        'serviceticket_status' => [
            'name' => 'serviceticket_status',
            'vname' => 'LBL_STATUS',
            'type' => 'enum',
            'len' => 100,
            'options' => 'serviceticket_status_dom',
            'comment' => 'Status (ex: new, planned, scheduled, completed, cancelled)',
        ],
        'serviceticket_type' => [
            'name' => 'serviceticket_type',
            'vname' => 'LBL_TYPE',
            'type' => 'enum',
            'len' => 25,
            'options' => 'serviceticket_type_dom'
        ],
        'serviceticket_class' => [
            'name' => 'serviceticket_class',
            'vname' => 'LBL_CLASS',
            'type' => 'enum',
            'len' => 100,
            'options' => 'serviceticket_class_dom',
            'comment' => 'Class (ex: severe, moderate, low impact)',
        ],
        'serviceticket_number' => [
            'name' => 'serviceticket_number',
            'vname' => 'LBL_TICKET_NUMBER',
            'type' => 'varchar',
            'len' => 10,
            'comment' => 'Number',
        ],
        'respond_until' => [
            'name' => 'respond_until',
            'vname' => 'LBL_RESPOND_UNTIL',
            'type' => 'datetime'
        ],
        'resolve_until' => [
            'name' => 'resolve_until',
            'vname' => 'LBL_RESOLVE_UNTIL',
            'type' => 'datetime'
        ],
        'resolve_date' => [
            'name' => 'resolve_date',
            'vname' => 'LBL_RESOLVE_DATE',
            'type' => 'datetime'
        ],
        'sladeviation_reason' => [
            'name' => 'sladeviation_reason',
            'vname' => 'LBL_SLADEVIATION_REASON',
            'type' => 'text',
            'comment' => ' a textual description why the SLA was not met'
        ],
        'prolonged_until' => [
            'name' => 'prolonged_until',
            'vname' => 'LBL_PROLONGED_UNTIL',
            'type' => 'date'
        ],
        //categories
        'sysservicecategory' => [
            'name' => 'sysservicecategory',
            'vname' => 'LBL_SYSSERVICECATEGORY',
            'type' => 'categories',
            'required' => false,
            'source' => 'non-db'
        ],
        'sysservicecategory_id1' => [
            'name' => 'sysservicecategory_id1',
            'vname' => 'LBL_SYSSERVICECATEGORY_ID1',
            'type' => 'category',
            'dbType' => 'varchar',
            'len' => 36
        ],
        'sysservicecategory_id2' => [
            'name' => 'sysservicecategory_id2',
            'vname' => 'LBL_SYSSERVICECATEGORY_ID2',
            'type' => 'category',
            'dbType' => 'varchar',
            'len' => 36
        ],
        'sysservicecategory_id3' => [
            'name' => 'sysservicecategory_id3',
            'vname' => 'LBL_SYSSERVICECATEGORY_ID3',
            'type' => 'category',
            'dbType' => 'varchar',
            'len' => 36
        ],
        'sysservicecategory_id4' => [
            'name' => 'sysservicecategory_id4',
            'vname' => 'LBL_SYSSERVICECATEGORY_ID4',
            'type' => 'category',
            'dbType' => 'varchar',
            'len' => 36
        ],
        'add_params' => [
            'name' => 'add_params',
            'vname' => 'LBL_ADD_PARAMS',
            'type' => 'json',
            'dbType' => 'shorttext',
            'comment' => 'the addparams collected from the categorytree'
        ],
        'solution' => [
            'name' => 'solution',
            'vname' => 'LBL_SOLUTION',
            'type' => 'text',
        ],
        'resaction' => [
            'name' => 'resaction',
            'vname' => 'LBL_RESACTION',
            'type' => 'enum',
            'len' => 20,
            'options' => 'serviceticket_resaction_dom'
        ],
        'worklog' => [
            'name' => 'worklog',
            'vname' => 'LBL_WORKLOG',
            'type' => 'text',
        ],
        'costcenter_id' => [
            'name' => 'costcenter_id',
            'vname' => 'LBL_COSTCENTER_ID',
            'type' => 'id',
            'required' => false,
        ],
        'costcenter_name' => [
            'name' => 'costcenter_name',
            'vname' => 'LBL_COSTCENTER',
            'type' => 'relate',
            'source' => 'non-db',
            'len' => '255',
            'id_name' => 'costcenter_id',
            'rname' => 'name',
            'module' => 'CostCenters',
            'link' => 'costcenters',
            'join_name' => 'costcenters',
        ],
        'costcenters' => [
            'vname' => 'LBL_COSTCENTER',
            'name' => 'costcenters',
            'type' => 'link',
            'module' => 'CostCenters',
            'relationship' => 'servicetickets_costcenters',
            'source' => 'non-db',
        ],
        'questionnaire_answers' => [
            'name' => 'questionnaire_answers',
            'vname' => 'LBL_QUESTIONNAIRE',
            'type' => 'json',
            'source' => 'non-db',
        ],
        //questionnaire
        'questionnaire_id' => [
            'name' => 'questionnaire_id',
            'vname' => 'LBL_QUESTIONNAIRE_ID',
            'type' => 'id',
            'comment' => 'The ID of the questionnaire',
            'required' => false,
        ],
        'questionnaire_name' => [
            'name' => 'questionnaire_name',
            'vname' => 'LBL_QUESTIONNAIRE',
            'type' => 'relate',
            'source' => 'non-db',
            'len' => '255',
            'id_name' => 'questionnaire_id',
            'rname' => 'name',
            'module' => 'Questionnaires',
            'link' => 'questionnaires',
            'join_name' => 'questionnaires',
        ],
        'questionnaires' => [
            'vname' => 'LBL_QUESTIONNAIRES',
            'name' => 'questionnaires',
            'type' => 'link',
            'module' => 'Questionnaires',
            'relationship' => 'servicetickets_questionnaires',
            'link_type' => 'one',
            'side' => 'right',
            'source' => 'non-db',
        ],
        // emails
        'emails_as_parent' => [
            'name' => 'emails_as_parent',
            'vname' => 'LBL_EMAILS_AS_PARENT',
            'type' => 'link',
            'relationship' => 'servicetickets_emails',
            'module' => 'Emails',
            'bean_name' => 'Email',
            'source' => 'non-db'
        ],
    ],
    'relationships' => [
        'servicetickets_accounts' => [
            'lhs_module' => 'Accounts',
            'lhs_table' => 'accounts',
            'lhs_key' => 'id',
            'rhs_module' => 'ServiceTickets',
            'rhs_table' => 'servicetickets',
            'rhs_key' => 'account_id',
            'relationship_type' => 'one-to-many'
        ],
        'servicetickets_contacts' => [
            'lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'ServiceTickets',
            'rhs_table' => 'servicetickets',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts',
        ],
        'servicetickets_consumers' => [
            'lhs_module' => 'Consumers',
            'lhs_table' => 'consumers',
            'lhs_key' => 'id',
            'rhs_module' => 'ServiceTickets',
            'rhs_table' => 'servicetickets',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Consumers',
        ],
        'servicetickets_users' => [
            'lhs_module' => 'Users',
            'lhs_table' => 'users',
            'lhs_key' => 'id',
            'rhs_module' => 'ServiceTickets',
            'rhs_table' => 'servicetickets',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Users',
        ],
        'servicetickets_costcenters' => [
            'lhs_module' => 'CostCenters',
            'lhs_table' => 'costcenters',
            'lhs_key' => 'id',
            'rhs_module' => 'ServiceTickets',
            'rhs_table' => 'servicetickets',
            'rhs_key' => 'costcenter_id',
            'relationship_type' => 'one-to-many',
        ],
        'servicetickets_questionnaires' => [
            'lhs_module' => 'Questionnaires',
            'lhs_table' => 'questionnaires',
            'lhs_key' => 'id',
            'rhs_module' => 'ServiceTickets',
            'rhs_table' => 'servicetickets',
            'rhs_key' => 'questionnaire_id',
            'relationship_type' => 'one-to-many',
        ],
    ],
    'indices' => [
        ['name' => 'idx_serviceticket_accid', 'type' => 'index', 'fields' => ['account_id']],
        ['name' => 'idx_serviceticket_parentdel', 'type' => 'index', 'fields' => ['parent_id', 'parent_type', 'deleted']],
        ['name' => 'idx_serviceticket_accparentiddel', 'type' => 'index', 'fields' => ['account_id', 'parent_id', 'deleted']]
    ]
];

VardefManager::createVardef('ServiceTickets', 'ServiceTicket', ['default', 'assignable', 'activities']);

if (file_exists('extensions/modules/ServiceOrders')) {
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceorders'] = [
        'vname' => 'LBL_SERVICEORDERS',
        'name' => 'serviceorders',
        'type' => 'link',
        'module' => 'ServiceOrders',
        'relationship' => 'serviceorder_parent_serviceticket',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
}
if (file_exists('extensions/modules/ServiceQueues')) {
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicequeue_id'] = [
        'name' => 'servicequeue_id',
        'vname' => 'LBL_SERVICEQUEUE_ID',
        'type' => 'id',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicequeue_name'] = [
        'name' => 'servicequeue_name',
        'vname' => 'LBL_SERVICEQUEUE',
        'type' => 'relate',
        'source' => 'non-db',
        'len' => '255',
        'id_name' => 'servicequeue_id',
        'rname' => 'name',
        'module' => 'ServiceQueues',
        'link' => 'servicequeues',
        'join_name' => 'servicequeues',
        'required' => false,
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicequeues'] = [
        'vname' => 'LBL_SERVICEQUEUES',
        'name' => 'servicequeues',
        'type' => 'link',
        'module' => 'ServiceQueues',
        'relationship' => 'servicetickets_servicequeues',
        'source' => 'non-db'
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['relationships']['servicetickets_servicequeues'] = [
        'lhs_module' => 'ServiceQueues',
        'lhs_table' => 'servicequeues',
        'lhs_key' => 'id',
        'rhs_module' => 'ServiceTickets',
        'rhs_table' => 'servicetickets',
        'rhs_key' => 'servicequeue_id',
        'relationship_type' => 'one-to-many'
    ];

}

if (file_exists('extensions/modules/ServiceCalls')) {
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicecall_id'] = [
        'name' => 'servicecall_id',
        'vname' => 'LBL_SERVICECALL_ID',
        'type' => 'id',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicecall_name'] = [
        'name' => 'servicecall_name',
        'vname' => 'LBL_SERVICECALL',
        'type' => 'relate',
        'source' => 'non-db',
        'len' => '255',
        'id_name' => 'servicecall_id',
        'rname' => 'name',
        'db_concat_fields' => [0 => 'sysservicecategory_id1', 1 => 'sysservicecategory_id2', 2 => 'sysservicecategory_id3', 3 => 'sysservicecategory_id4'],
        'module' => 'ServiceCalls',
        'link' => 'servicecalls',
        'join_name' => 'servicecalls',
        'required' => false,
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicecalls'] = [
        'vname' => 'LBL_SERVICECALLS',
        'name' => 'servicecalls',
        'type' => 'link',
        'module' => 'ServiceCalls',
        'relationship' => 'servicetickets_servicecalls',
        'source' => 'non-db'
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['relationships']['servicetickets_servicecalls'] = [
        'lhs_module' => 'ServiceCalls',
        'lhs_table' => 'servicecalls',
        'lhs_key' => 'id',
        'rhs_module' => 'ServiceTickets',
        'rhs_table' => 'servicetickets',
        'rhs_key' => 'servicecall_id',
        'relationship_type' => 'one-to-many'
    ];
}

if (file_exists('extensions/modules/ServiceFeedbacks')) {
    //servicefeedbacks
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicefeedbacks'] = [
        'vname' => 'LBL_SERVICEFEEDBACKS',
        'name' => 'servicefeedbacks',
        'type' => 'link',
        'module' => 'ServiceFeedbacks',
        'relationship' => 'servicefeedbacks_servicetickets',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
}

if (file_exists('extensions/modules/ServiceEquipments')) {
    //serviceequipment
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceequipment_id'] = [
        'name' => 'serviceequipment_id',
        'vname' => 'LBL_SERVICEEQUIPMENT_ID',
        'type' => 'id',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceequipment_name'] = [
        'name' => 'serviceequipment_name',
        'vname' => 'LBL_SERVICEEQUIPMENT',
        'type' => 'relate',
        'source' => 'non-db',
        'len' => '255',
        'rname' => 'name',
        'id_name' => 'serviceequipment_id',
        'module' => 'ServiceEquipments',
        'link' => 'serviceequipment',
        'join_name' => 'serviceequipments',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceequipment'] = [
        'vname' => 'LBL_SERVICEEQUIPMENT',
        'name' => 'serviceequipment',
        'type' => 'link',
        'module' => 'ServiceEquipments',
        'relationship' => 'serviceequipments_servicetickets',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['relationships']['serviceequipments_servicetickets'] = [
        'lhs_module' => 'ServiceEquipments',
        'lhs_table' => 'serviceequipments',
        'lhs_key' => 'id',
        'rhs_module' => 'ServiceTickets',
        'rhs_table' => 'servicetickets',
        'rhs_key' => 'serviceequipment_id',
        'relationship_type' => 'one-to-many'
    ];
}

if (file_exists('extensions/modules/ServiceEquipments')) {
//servicelocation
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicelocation_id'] = [
        'name' => 'servicelocation_id',
        'vname' => 'LBL_SERVICELOCATION_ID',
        'type' => 'id',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicelocation_name'] = [
        'name' => 'servicelocation_name',
        'vname' => 'LBL_SERVICELOCATION',
        'type' => 'relate',
        'source' => 'non-db',
        'len' => '255',
        'rname' => 'name',
        'id_name' => 'servicelocation_id',
        'module' => 'ServiceLocations',
        'link' => 'servicelocation',
        'join_name' => 'servicelocations',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['servicelocation'] = [
        'vname' => 'LBL_SERVICELOCATION',
        'name' => 'servicelocation',
        'type' => 'link',
        'module' => 'ServiceLocations',
        'relationship' => 'servicetickets_servicelocation',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['relationships']['servicetickets_servicelocation'] = [
        'lhs_module' => 'ServiceLocations',
        'lhs_table' => 'servicelocations',
        'lhs_key' => 'id',
        'rhs_module' => 'ServiceTickets',
        'rhs_table' => 'servicetickets',
        'rhs_key' => 'servicelocation_id',
        'relationship_type' => 'one-to-many'
    ];

}

if (file_exists('extensions/modules/ServiceTicketSLAs')) {
    //serviceslas
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceticketsla_id'] = [
        'name' => 'serviceticketsla_id',
        'vname' => 'LBL_SERVICETICKETSLA_ID',
        'type' => 'id',
    ];

    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceticketsla_name'] = [
        'name' => 'serviceticketsla_name',
        'vname' => 'LBL_SERVICETICKETSLA',
        'type' => 'relate',
        'source' => 'non-db',
        'len' => '255',
        'rname' => 'name',
        'id_name' => 'serviceticketsla_id',
        'module' => 'ServiceTicketSLAs',
        'link' => 'serviceticketsla',
        'join_name' => 'serviceticketsla',
    ];

    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceticketsla'] = [
        'vname' => 'LBL_SERVICETICKETSLA',
        'name' => 'serviceticketsla',
        'type' => 'link',
        'module' => 'ServiceTicketSLAs',
        'relationship' => 'serviceticketslas_servicetickets',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
}

if (file_exists('extensions/modules/ServiceTicketNotes')) {
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceticketnotes'] = [
        'vname' => 'LBL_SERVICETICKETNOTES',
        'name' => 'serviceticketnotes',
        'type' => 'link',
        'module' => 'ServiceTicketNotes',
        'relationship' => 'serviceticket_serviceticketnotes',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
}
if (file_exists('extensions/modules/ServiceTicketStages')) {

    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['serviceticketstages'] = [
        'name' => 'serviceticketstages',
        'module' => 'ServiceTicketStages',
        'type' => 'link',
        'relationship' => 'serviceticket_serviceticketstages',
        'link_type' => 'one',
        'source' => 'non-db',
        'vname' => 'LBL_SERVICETICKETSTAGES',
    ];
}

if (file_exists('extensions/modules/SystemDeploymentReleases')) {
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['fields']['systemdeploymentreleases'] = [
        'vname' => 'LBL_RELEASES',
        'name' => 'systemdeploymentreleases',
        'type' => 'link',
        'module' => 'SystemDeploymentReleases',
        'relationship' => 'serviceticket_systemdeploymentreleases',
        'link_type' => 'one',
        'source' => 'non-db'
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['ServiceTicket']['relationships']['serviceticket_systemdeploymentreleases'] = [
        'lhs_module' => 'ServiceDeploymentReleases',
        'lhs_table' => 'servicedeploymentreleases',
        'lhs_key' => 'id',
        'rhs_module' => 'ServiceTickets',
        'rhs_table' => 'servicetickets',
        'rhs_key' => 'servicedeploymentrelease_id',
        'relationship_type' => 'one-to-many',
    ];
}