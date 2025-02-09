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
use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;
use SpiceCRM\includes\SugarObjects\VardefManager;

SpiceDictionaryHandler::getInstance()->dictionary['Contact'] = [
    'table' => 'contacts',
    'audited' => true,
    'fields' =>
        [
            'email_and_name1' => [
                'name' => 'email_and_name1',
                'rname' => 'email_and_name1',
                'vname' => 'LBL_NAME',
                'type' => 'varchar',
                'source' => 'non-db',
                'len' => '510',
                'importable' => 'false',
            ],
            // changed to enum on contact evel
            'gdpr_marketing_agreement' => [
                'name' => 'gdpr_marketing_agreement',
                'vname' => 'LBL_GDPR_MARKETING_AGREEMENT',
                'type' => 'enum',
                'options' => 'gdpr_marketing_agreement_dom',
                'audited' => true
            ],
            'gdpr_marketing_source' => [
                'name' => 'gdpr_marketing_source',
                'vname' => 'LBL_GDPR_MARKETING_SOURCE',
                'type' => 'varchar',
                'len' => '100',
                'audited' => true
            ],
            'gdpr_data_source' => [
                'name' => 'gdpr_data_source',
                'vname' => 'LBL_GDPR_DATA_SOURCE',
                'type' => 'varchar',
                'len' => '100',
                'audited' => true
            ],
            'lead_source' => [
                'name' => 'lead_source',
                'vname' => 'LBL_LEAD_SOURCE',
                'type' => 'enum',
                'options' => 'lead_source_dom',
                'len' => '255',
                'comment' => 'How did the contact come about',
            ],

            'account_name' => [
                'name' => 'account_name',
                'rname' => 'name',
                'id_name' => 'account_id',
                'vname' => 'LBL_ACCOUNT_NAME',
                'join_name' => 'accounts',
                'type' => 'relate',
                'link' => 'accounts',
                'table' => 'accounts',
                'isnull' => 'true',
                'module' => 'Accounts',
                'dbType' => 'varchar',
                'len' => '255',
                'source' => 'non-db',
                'unified_search' => true,
            ],
            'account_id' => [
                'name' => 'account_id',
                'rname' => 'id',
                'id_name' => 'account_id',
                'vname' => 'LBL_ACCOUNT_ID',
                'type' => 'varchar',
                'link' => 'accounts',
                'table' => 'accounts',
                'isnull' => 'true',
                'module' => 'Accounts',
                'dbType' => 'id',
                'reportable' => false,
                'source' => 'non-db',
                'duplicate_merge' => false,
                'hideacl' => true,
            ],
            'opportunity_role_fields' => [
                'name' => 'opportunity_role_fields',
                'rname' => 'id',
                'relationship_fields' => ['id' => 'opportunity_role_id', 'contact_role' => 'opportunity_role', 'propensity_to_buy' => 'opportunity_propensity_to_buy', 'level_of_support' => 'opportunity_level_of_support', 'level_of_influence' => 'opportunity_level_of_influence'],
                'vname' => 'LBL_ACCOUNT_NAME',
                'type' => 'relate',
                'link' => 'opportunities',
                'link_type' => 'relationship_info',
                'join_link_name' => 'opportunities_contacts',
                'source' => 'non-db',
                'importable' => 'false',
                'duplicate_merge' => false,
            ],
            'opportunity_role_id' => [
                'name' => 'opportunity_role_id',
                'type' => 'varchar',
                'source' => 'non-db',
                'vname' => 'LBL_OPPORTUNITY_ROLE_ID',
            ],
            // Opportunities link olus related non db bfelder
            'opportunities' => [
                'name' => 'opportunities',
                'type' => 'link',
                'relationship' => 'opportunities_contacts',
                'source' => 'non-db',
                'module' => 'Opportunities',
                'bean_name' => 'Opportunity',
                'vname' => 'LBL_OPPORTUNITIES',
            ],
            'opportunity_role' => [
                'name' => 'opportunity_role',
                'type' => 'enum',
                'source' => 'non-db',
                'vname' => 'LBL_ROLE',
                'options' => 'opportunity_relationship_type_dom',
            ],
            'opportunity_propensity_to_buy' => [
                'name' => 'opportunity_propensity_to_buy',
                'type' => 'enum',
                'source' => 'non-db',
                'vname' => 'LBL_PROPENSITY_TO_BUY',
                'options' => 'opportunity_relationship_buying_center_dom',
            ],
            'opportunity_level_of_support' => [
                'name' => 'opportunity_level_of_support',
                'type' => 'enum',
                'source' => 'non-db',
                'vname' => 'LBL_LEVEL_OF_SUPPORT',
                'options' => 'opportunity_relationship_buying_center_dom',
            ],
            'opportunity_level_of_influence' => [
                'name' => 'opportunity_level_of_influence',
                'type' => 'enum',
                'source' => 'non-db',
                'vname' => 'LBL_LEVEL_OF_INFLUENCE',
                'options' => 'opportunity_relationship_buying_center_dom',
            ],
            'activity_accept_status' => [
                'name' => 'activity_accept_status',
                'type' => 'enum',
                'source' => 'non-db',
                'vname' => 'LBL_ACTIVITY_ACCEPT_STATUS',
                'options' => 'dom_meeting_accept_status',
                'comment' => 'non db field retrieved from the relationship to the meeting call etc'
            ],
            'activity_status_date_modified' => [
                'name' => 'activity_status_date_modified',
                'type' => 'datetime',
                'source' => 'non-db',
                'vname' => 'LBL_ACTIVITY_STATUS_DATE_MODIFIED',
                'comment' => 'non db field retrieved from the relationship to the meeting call etc'
            ],
            'activity_required' => [
                'name' => 'activity_required',
                'type' => 'bool',
                'source' => 'non-db',
                'vname' => 'LBL_ACTIVITY_REQUIRED',
                'comment' => 'non db field retrieved from the relationship to the meeting call etc'
            ],
            'reports_to_id' => [
                'name' => 'reports_to_id',
                'vname' => 'LBL_REPORTS_TO_ID',
                'type' => 'id',
                'required' => false,
                'reportable' => false,
                'comment' => 'The contact this contact reports to'
            ],
            'report_to_name' => [
                'name' => 'report_to_name',
                'rname' => 'last_name',
                'id_name' => 'reports_to_id',
                'vname' => 'LBL_REPORTS_TO',
                'type' => 'relate',
                'link' => 'reports_to_link',
                'table' => 'contacts',
                'isnull' => 'true',
                'module' => 'Contacts',
                'dbType' => 'varchar',
                'len' => 'id',
                'reportable' => false,
                'source' => 'non-db',
            ],
            'birthdate' => [
                'name' => 'birthdate',
                'vname' => 'LBL_BIRTHDATE',
                'type' => 'date',
                'comment' => 'The birthdate of the contact'
            ],
            'accounts' => [
                'name' => 'accounts',
                'type' => 'link',
                'relationship' => 'accounts_contacts',
                'link_type' => 'one',
                'source' => 'non-db',
                'vname' => 'LBL_ACCOUNT',
                'duplicate_merge' => false,
                'module' => 'Accounts'
            ],
            'prospects' => [
                'name' => 'prospects',
                'type' => 'link',
                'relationship' => 'contacts_prospects',
                'link_type' => 'one',
                'source' => 'non-db',
                'vname' => 'LBL_PROSPECT',
                'duplicate_merge' => 'disabled',
                'module' => 'Prospects'
            ],
            'reports_to_link' => [
                'name' => 'reports_to_link',
                'type' => 'link',
                'relationship' => 'contact_direct_reports',
                'link_type' => 'one',
                'side' => 'right',
                'source' => 'non-db',
                'vname' => 'LBL_REPORTS_TO',
            ],
// CR1000426 cleanup backend, module Bugs removed
//            'bugs' => array(
//                'name' => 'bugs',
//                'type' => 'link',
//                'relationship' => 'contacts_bugs',
//                'source' => 'non-db',
//                'vname' => 'LBL_BUGS',
//            ),
            'calls' => [
                'name' => 'calls',
                'type' => 'link',
                'relationship' => 'calls_contacts',
                'source' => 'non-db',
                'module' => 'Calls',
                'vname' => 'LBL_CALLS',
            ],
            'calls_parent' => [
                'name' => 'calls_parent',
                'type' => 'link',
                'relationship' => 'contact_calls_parent',
                'source' => 'non-db',
                'vname' => 'LBL_CALLS_AS_PARENT',
            ],
            'callattempts_parent' => [
                'name' => 'callattempts_parent',
                'type' => 'link',
                'relationship' => 'contact_callattempts_parent',
                'source' => 'non-db',
                'vname' => 'LBL_CALLATTEMPTS',
            ],
// CR1000426 cleanup backend, module Cases removed
//            'cases' => array(
//                'name' => 'cases',
//                'type' => 'link',
//                'relationship' => 'contacts_cases',
//                'source' => 'non-db',
//                'vname' => 'LBL_CASES',
//            ),
            'direct_reports' => [
                'name' => 'direct_reports',
                'type' => 'link',
                'relationship' => 'contact_direct_reports',
                'source' => 'non-db',
                'vname' => 'LBL_DIRECT_REPORTS',
            ],
            'emails' => [
                'name' => 'emails',
                'type' => 'link',
                'relationship' => 'emails_contacts_rel',
                'module' => 'Emails',
                'bean_name' => 'Email',
                'source' => 'non-db',
                'vname' => 'LBL_EMAILS',
            ],
            'letters' => [
                'name'         => 'letters',
                'type'         => 'link',
                'relationship' => 'contact_letters',
                'module' => 'Letters',
                'bean_name' => 'Letter',
                'source'       => 'non-db',
                'vname'        => 'LBL_LETTERS',
            ],
            'documents' => [
                'name' => 'documents',
                'type' => 'link',
                'relationship' => 'documents_contacts',
                'source' => 'non-db',
                'vname' => 'LBL_DOCUMENTS',
            ],
            'leads' => [
                'name' => 'leads',
                'type' => 'link',
                'relationship' => 'contact_leads',
                'source' => 'non-db',
                'vname' => 'LBL_LEADS',
                'module' => 'Leads'
            ],
            'meetings' => [
                'name' => 'meetings',
                'type' => 'link',
                'relationship' => 'meetings_contacts',
                'source' => 'non-db',
                'vname' => 'LBL_MEETINGS',
            ],
            'meetings_parent' => [
                'name' => 'meetings_parent',
                'type' => 'link',
                'relationship' => 'contact_meetings_parent',
                'source' => 'non-db',
                'vname' => 'LBL_MEETINGS_AS_PARENT',
            ],
            'notes' => [
                'name' => 'notes',
                'type' => 'link',
                'relationship' => 'contact_notes',
                'source' => 'non-db',
                'vname' => 'LBL_NOTES',
            ],
            //@deprecated name project. Use projects
//            'project' => array(
//                'name' => 'project',
//                'type' => 'link',
//                'relationship' => 'projects_contacts',
//                'source' => 'non-db',
//                'vname' => 'LBL_PROJECTS_DEPRECATED',
//            ),
            'projects' => [
                'name' => 'projects',
                'type' => 'link',
                'relationship' => 'projects_contacts',
                'source' => 'non-db',
                'vname' => 'LBL_PROJECTS',
            ],
            'tasks' => [
                'name' => 'tasks',
                'type' => 'link',
                'relationship' => 'contact_tasks',
                'source' => 'non-db',
                'vname' => 'LBL_TASKS',
            ],
            'tasks_parent' => [
                'name' => 'tasks_parent',
                'type' => 'link',
                'relationship' => 'contact_tasks_parent',
                'source' => 'non-db',
                'vname' => 'LBL_TASKS_AS_PARENT',
                'reportable' => false
            ],
            'notes_parent' => [
                'name' => 'notes_parent',
                'type' => 'link',
                'relationship' => 'contact_notes_parent',
                'source' => 'non-db',
                'vname' => 'LBL_NOTES_AS_PARENT',
                'reportable' => false
            ],
            'user_sync' => [
                'name' => 'user_sync',
                'type' => 'link',
                'relationship' => 'contacts_users',
                'source' => 'non-db',
                'vname' => 'LBL_USER_SYNC',
            ],
            'created_by_link' => [
                'name' => 'created_by_link',
                'type' => 'link',
                'relationship' => 'contacts_created_by',
                'vname' => 'LBL_CREATED_BY',
                'link_type' => 'one',
                'module' => 'Users',
                'bean_name' => 'User',
                'source' => 'non-db',
            ],
            'modified_user_link' => [
                'name' => 'modified_user_link',
                'type' => 'link',
                'relationship' => 'contacts_modified_user',
                'vname' => 'LBL_MODIFIED_BY',
                'link_type' => 'one',
                'module' => 'Users',
                'bean_name' => 'User',
                'source' => 'non-db',
            ],
            'assigned_user_link' => [
                'name' => 'assigned_user_link',
                'type' => 'link',
                'relationship' => 'contacts_assigned_user',
                'vname' => 'LBL_ASSIGNED_TO',
                'link_type' => 'one',
                'module' => 'Users',
                'bean_name' => 'User',
                'source' => 'non-db',
                'rname' => 'user_name',
                'id_name' => 'assigned_user_id',
                'table' => 'users',
                'duplicate_merge' => true
            ],
            'campaign_id' => [
                'name' => 'campaign_id',
                'comment' => 'Campaign that generated lead',
                'vname' => 'LBL_CAMPAIGN_ID',
                'rname' => 'id',
                'id_name' => 'campaign_id',
                'type' => 'id',
                'table' => 'campaigns',
                'isnull' => 'true',
                'module' => 'Campaigns',
                'duplicate_merge' => false,
            ],
            'campaign_name' => [
                'name' => 'campaign_name',
                'rname' => 'name',
                'vname' => 'LBL_CAMPAIGN',
                'type' => 'relate',
                'link' => 'campaign_contacts',
                'isnull' => 'true',
                'reportable' => false,
                'source' => 'non-db',
                'table' => 'campaigns',
                'id_name' => 'campaign_id',
                'module' => 'Campaigns',
                'duplicate_merge' => false,
                'comment' => 'The first campaign name for Contact (Meta-data only)',
            ],
            'campaigns' => [
                'name' => 'campaigns',
                'type' => 'link',
                'relationship' => 'contact_campaign_log',
                'module' => 'CampaignLog',
                'bean_name' => 'CampaignLog',
                'source' => 'non-db',
                'vname' => 'LBL_CAMPAIGNLOG',
            ],
            'campaign_contacts' => [
                'name' => 'campaign_contacts',
                'type' => 'link',
                'vname' => 'LBL_CAMPAIGN_CONTACT',
                'relationship' => 'campaign_contacts',
                'source' => 'non-db',
            ],
            'c_accept_status_fields' => [
                'name' => 'c_accept_status_fields',
                'rname' => 'id',
                'relationship_fields' => ['id' => 'accept_status_id', 'accept_status' => 'accept_status_name'],
                'vname' => 'LBL_LIST_ACCEPT_STATUS',
                'type' => 'relate',
                'link' => 'calls',
                'link_type' => 'relationship_info',
                'source' => 'non-db',
                'importable' => 'false',
                'duplicate_merge' => false,
            ],
            'm_accept_status_fields' => [
                'name' => 'm_accept_status_fields',
                'rname' => 'id',
                'relationship_fields' => ['id' => 'accept_status_id', 'accept_status' => 'accept_status_name'],
                'vname' => 'LBL_LIST_ACCEPT_STATUS',
                'type' => 'relate',
                'link' => 'meetings',
                'link_type' => 'relationship_info',
                'source' => 'non-db',
                'importable' => 'false',
                'hideacl' => true,
                'duplicate_merge' => false,
            ],
            'accept_status_id' => [
                'name' => 'accept_status_id',
                'type' => 'varchar',
                'source' => 'non-db',
                'vname' => 'LBL_LIST_ACCEPT_STATUS',
            ],
            'accept_status_name' => [
                'name' => 'accept_status_name',
                'type' => 'enum',
                'source' => 'non-db',
                'vname' => 'LBL_LIST_ACCEPT_STATUS',
                'options' => 'dom_meeting_accept_status',
                'importable' => 'false',
            ],
            'prospect_lists' => [
                'name' => 'prospect_lists',
                'type' => 'link',
                'relationship' => 'prospect_list_contacts',
                'module' => 'ProspectLists',
                'source' => 'non-db',
                'vname' => 'LBL_PROSPECT_LIST',
                'rel_fields' => [
                    'quantity' => [
                        'map' => 'prospectlists_contacts_quantity'
                    ]
                ]
            ],
            'sync_contact' => [
                'name' => 'sync_contact',
                'vname' => 'LBL_SYNC_CONTACT',
                'type' => 'bool',
                'source' => 'non-db',
                'comment' => 'Synch to outlook?  (Meta-Data only)',
            ],
            'eventregistrations' => [
                'name' => 'eventregistrations',
                'vname' => 'LBL_EVENTREGISTRATIONS',
                'type' => 'link',
                'relationship' => 'contact_eventregistrations',
                'source' => 'non-db',
            ],
            'ext_id' => [
                'name' => 'ext_id',
                'vname' => 'LBL_EXT_ID',
                'type' => 'varchar',
                'len' => 50
            ],
            'portal_user_id' => [
                'name' => 'portal_user_id',
                'vname' => 'LBL_PORTAL_USER_ID',
                'type' => 'varchar',
                'len' => 36
            ],
            'events_contact_role' => [
                'name' => 'events_contact_role',
                'vname' => 'LBL_ROLE',
                'type' => 'enum',
                'source' => 'non-db',
                'options' => 'events_contact_roles_dom'
            ],
            'events' => [
                'name' => 'events',
                'type' => 'link',
                'relationship' => 'events_contacts',
                'module' => 'Events',
                'bean_name' => 'Event',
                'source' => 'non-db',
                'vname' => 'LBL_EVENT',
                'rel_fields' => [
                    'contact_role' => [
                        'map' => 'events_contact_role'
                    ]
                ]
            ],
            'bonuscards' => [
                'name' => 'bonuscards',
                'type' => 'link',
                'relationship' => 'bonuscards_contacts',
                'module' => 'BonusCards',
                'bean_name' => 'BonusCard',
                'source' => 'non-db',
                'vname' => 'LBL_BONUSCARDS',
            ],
            'prospectlists_contacts_quantity' => [
                'name' => 'prospectlists_contacts_quantity',
                'vname' => 'LBL_QUANTITY',
                'type' => 'varchar',
                'source' => 'non-db'
            ],
            'catalogorders' => [
                'name' => 'catalogorders',
                'type' => 'link',
                'module' => 'CatalogOrders',
                'relationship' => 'contacts_catalogorders',
                'source' => 'non-db'
            ],
            'inquiries' => [
                'name' => 'inquiries',
                'type' => 'link',
                'module' => 'Inquiries',
                'relationship' => 'contact_inquiries',
                'source' => 'non-db'
            ],
            'relationship_type' => [
                'name' => 'relationship_type',
                'type' => 'enum',
                'source' => 'non-db',
                'options' => 'relationship_type_dom',
                'vname' => 'LBL_RELATIONSHIP_TYPE'
            ],
            'environments' => [
                'name' => 'environments',
                'type' => 'link',
                'relationship' => 'contacts_contacts',
                'module' => 'Contacts',
                'bean_name' => 'Contact',
                'source' => 'non-db',
                'vname' => 'LBL_ENVIRONMENT_CONTACTS',
                'duplicate_merge' => false,
                'link_type' => 'one',
                'rel_fields' =>
                    [
                        'relationship_type' =>
                            [
                                'map' => 'relationship_type'
                            ],
                    ],
            ],
            'agreements_rel' => [
                'name' => 'agreements_rel',
                'type' => 'link',
                'relationship' => 'agreements_contacts',
                'module' => 'Agreements',
                'bean_name' => 'Agreement',
                'source' => 'non-db',
                'vname' => 'LBL_AGREEMENT',
                'comment' => 'many-2-many relationship link'
            ],
            /*
            'portal_user_id' => array(
                'name' => 'portal_user_id',
                'vname' => 'LBL_PORTAL_USER_ID',
                'type' => 'varchar',
                'len' => 36,
                'rname' => 'id',
                'id_name' => 'portal_user_id',
                'vname' => 'LBL_PORTAL_USER_ID',
                'type' => 'relate',
                'table' => 'users',
                'isnull' => 'true',
                'module' => 'Users',
                'dbType' => 'id',
                'reportable' => false,
                'source' => 'non-db',
            ),
            */
            /*
            'portalusers' => array(
                'name' => 'portalusers',
                'type' => 'link',
                'relationship' => 'portalusers_contacts',
                'source' => 'non-db',
                'module' => 'Contacts',
            ),
            */
            /* for now not necessary:
            'portal_user_name' => array(
                'name' => 'portal_user_name',
                'rname' => 'user_name',
                'id_name' => 'portal_user_id',
                'vname' => 'LBL_PORTAL_USER',
                'type' => 'relate',
                'link' => 'portalusers',
                'table' => 'users',
                'isnull' => 'true',
                'module' => 'Users',
                'dbType' => 'varchar',
                'len' => '255',
                'source' => 'non-db',
                'unified_search' => true,
            ),
            */
        ],
    'indices' => [
        [
            'name' => 'idx_cont_last_first',
            'type' => 'index',
            'fields' => ['last_name', 'first_name', 'deleted']
        ],
        [
            'name' => 'idx_contacts_del_last',
            'type' => 'index',
            'fields' => ['deleted', 'last_name'],
        ],
        [
            'name' => 'idx_cont_del_reports',
            'type' => 'index',
            'fields' => ['deleted', 'reports_to_id', 'last_name']
        ],
        [
            'name' => 'idx_reports_to_id',
            'type' => 'index',
            'fields' => ['reports_to_id'],
        ],
        [
            'name' => 'idx_del_id_user',
            'type' => 'index',
            'fields' => ['deleted', 'id', 'assigned_user_id'],
        ],
        [
            'name' => 'idx_cont_assigned',
            'type' => 'index',
            'fields' => ['assigned_user_id']
        ],
        [
            'name' => 'idx__cont__portal_user_id__del',
            'type' => 'index',
            'fields' => ['portal_user_id','deleted']
        ]
//	array(
//		'name' => 'idx_cont_email1',
//		'type' => 'index',
//		'fields' => array('email1')
//	),
//	array(
//		'name' => 'idx_cont_email2',
//		'type' => 'index',
//		'fields' => array('email2')
//	),
    ],
    'relationships' => [
        'contact_direct_reports' => ['lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Contacts',
            'rhs_table' => 'contacts',
            'rhs_key' => 'reports_to_id',
            'relationship_type' => 'one-to-many'],
        'contact_leads' => ['lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Leads',
            'rhs_table' => 'leads',
            'rhs_key' => 'contact_id',
            'relationship_type' => 'one-to-many'],
        'contact_notes' => ['lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Notes',
            'rhs_table' => 'notes',
            'rhs_key' => 'contact_id',
            'relationship_type' => 'one-to-many'],
        'contact_letters' => [
            'lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Letters',
            'rhs_table' => 'letters',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'contact_textmessages' => [
            'lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'TextMessages',
            'rhs_table' => 'textmessages',
            'rhs_key' => 'contact_id',
            'relationship_type' => 'one-to-many',
        ],
        'contact_tasks' => ['lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Tasks',
            'rhs_table' => 'tasks',
            'rhs_key' => 'contact_id',
            'relationship_type' => 'one-to-many'],
        'contact_tasks_parent' => ['lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Tasks',
            'rhs_table' => 'tasks',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'contact_notes_parent' => ['lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'Notes',
            'rhs_table' => 'notes',
            'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'contacts_assigned_user' => ['lhs_module' => 'Users',
            'lhs_table' => 'users',
            'lhs_key' => 'id',
            'rhs_module' => 'Contacts',
            'rhs_table' => 'contacts',
            'rhs_key' => 'assigned_user_id',
            'relationship_type' => 'one-to-many'],
        'contacts_modified_user' => ['lhs_module' => 'Users',
            'lhs_table' => 'users',
            'lhs_key' => 'id',
            'rhs_module' => 'Contacts',
            'rhs_table' => 'contacts',
            'rhs_key' => 'modified_user_id',
            'relationship_type' => 'one-to-many'],
        'contacts_created_by' => ['lhs_module' => 'Users',
            'lhs_table' => 'users',
            'lhs_key' => 'id',
            'rhs_module' => 'Contacts',
            'rhs_table' => 'contacts',
            'rhs_key' => 'created_by',
            'relationship_type' => 'one-to-many'],
        'contact_campaign_log' => [
            'lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'id',
            'rhs_module' => 'CampaignLog',
            'rhs_table' => 'campaign_log',
            'rhs_key' => 'target_id',
            'relationship_type' => 'one-to-many',
            'relationship_role_column' => 'target_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'contact_calls_parent' => [
            'lhs_module' => 'Contacts', 'lhs_table' => 'contacts', 'lhs_key' => 'id',
            'rhs_module' => 'Calls', 'rhs_table' => 'calls', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'contact_meetings_parent' => [
            'lhs_module' => 'Contacts', 'lhs_table' => 'contacts', 'lhs_key' => 'id',
            'rhs_module' => 'Meetings', 'rhs_table' => 'meetings', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        'contact_callattempts_parent' => [
            'lhs_module' => 'Contacts', 'lhs_table' => 'contacts', 'lhs_key' => 'id',
            'rhs_module' => 'CallAttempts', 'rhs_table' => 'callattempts', 'rhs_key' => 'parent_id',
            'relationship_type' => 'one-to-many', 'relationship_role_column' => 'parent_type',
            'relationship_role_column_value' => 'Contacts'
        ],
        /*
        'portalusers_contacts' => array (
            'lhs_module' => 'Contacts',
            'lhs_table' => 'contacts',
            'lhs_key' => 'portal_user_id',
            'rhs_module' => 'Users',
            'rhs_table' => 'users',
            'rhs_key' => 'id',
            'relationship_type' => 'one-to-one',
        )
        */
    ],

    //This enables optimistic locking for Saves From EditView
    'optimistic_locking' => true,
];

// CE version has not all modules...
//set global else error with PHP7.1: Uncaught Error: Cannot use string offset as an array
if (file_exists("extensions/modules/SalesDocs")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['salesdocsop'] = [
        'name' => 'salesdocsop',
        'type' => 'link',
        'vname' => 'LBL_SALESDOCSOP',
        'relationship' => 'salesdocs_contactsop',
        'module' => 'SalesDocs',
        'source' => 'non-db',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['salesdocsrp'] = [
        'name' => 'salesdocsrp',
        'type' => 'link',
        'vname' => 'LBL_SALESDOCSRP',
        'relationship' => 'salesdocs_contactsrp',
        'module' => 'SalesDocs',
        'source' => 'non-db',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['salesdocs'] = [
        'name' => 'salesdocs',
        'type' => 'link',
        'vname' => 'LBL_SALESDOCS',
        'relationship' => 'salesdocs_contacts',
        'module' => 'SalesDocs',
        'source' => 'non-db',
    ];
}

if (file_exists("extensions/modules/ProcurementDocs")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['procurementdoc'] = [
        'name' => 'procurementdoc',
        'type' => 'link',
        'vname' => 'LBL_PROCUREMENTDOCS',
        'relationship' => 'procurementdocs_contacts',
        'module' => 'ProcurementDocs',
        'source' => 'non-db'
    ];
}

if (file_exists("extensions/modules/ContactsOnlineProfiles")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['contactsonlineprofiles'] = [
        'name' => 'contactsonlineprofiles',
        'type' => 'link',
        'vname' => 'LBL_CONTACTSONLINEPROFILES',
        'relationship' => 'contact_contactonlineprofiles',
        'module' => 'ContactsOnlineProfiles',
        'source' => 'non-db',
    ];
}
if (file_exists("extensions/modules/ContactCCDetails")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['contactccdetails'] = [
        'name' => 'contactccdetails',
        'vname' => 'LBL_CONTACTCCDETAILS',
        'type' => 'link',
        'relationship' => 'contacts_contactccdetails',
        'link_type' => 'one',
        'source' => 'non-db',
        'duplicate_merge' => false,
        'default' => true, //UI: load related beans on contact load. module property required!
        'module' => 'ContactCCDetails'
    ];
}
if (file_exists("modules/Addresses")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['addresses'] = [
        'name' => 'addresses',
        'type' => 'link',
        'relationship' => 'contact_addresses',
        'source' => 'non-db',
        'vname' => 'LBL_ADDRESSES',
        'module' => 'Addresses',
        'default' => true
    ];
}
if (file_exists("extensions/modules/ServiceOrders")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['serviceorders'] = [
        'name' => 'serviceorders',
        'type' => 'link',
        'relationship' => 'serviceorders_contacts',
        'source' => 'non-db',
        'vname' => 'LBL_SERVICEORDERS',
        'module' => 'ServiceOrders',
        'default' => false
    ];
}
if (file_exists("modules/ServiceTickets")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['servicetickets'] = [
        'name' => 'servicetickets',
        'type' => 'link',
        'relationship' => 'servicetickets_contacts',
        'source' => 'non-db',
        'vname' => 'LBL_SERVICETICKETS',
        'module' => 'ServiceTickets',
        'default' => false
    ];
}
if (file_exists("extensions/modules/ServiceCalls")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['servicecalls'] = [
        'name' => 'servicecalls',
        'type' => 'link',
        'relationship' => 'servicecalls_contacts',
        'source' => 'non-db',
        'vname' => 'LBL_SERVICECALLS',
        'module' => 'ServiceCalls',
        'default' => false
    ];
}

if (file_exists("extensions/modules/ServiceFeedbacks")) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['servicefeedbacks'] = [
        'name' => 'servicefeedbacks',
        'type' => 'link',
        'relationship' => 'servicefeedbacks_contacts',
        'source' => 'non-db',
        'vname' => 'LBL_SERVICEFEEDBACKS',
        'module' => 'ServiceFeedbacks',
        'default' => false
    ];

}
// Not sure we need this at all.... commented for now
//if (file_exists("extensions/modules/ServiceEquipments")) {
//    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['serviceequipments'] = array(
//        'name' => 'serviceequipments',
//        'type' => 'link',
//        'relationship' => 'serviceequipments_contacts',
//        'source' => 'non-db',
//        'vname' => 'LBL_SERVICEEQUIPMENTS',
//        'module' => 'ServiceEquipments',
//        'default' => false
//    );
//}

if (file_exists('extensions/modules/SalesVouchers')) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['salesvouchers'] = [
        'name' => 'salesvouchers',
        'type' => 'link',
        'relationship' => 'contacts_salesvouchers',
        'module' => 'SalesVouchers',
        'source' => 'non-db',
        'vname' => 'LBL_SALESVOUCHERS',
    ];
}
if (file_exists('extensions/modules/Potentials')) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['potentials'] = [
        'name' => 'potentials',
        'type' => 'link',
        'relationship' => 'contacts_potentials',
        'module' => 'Potentials',
        'source' => 'non-db',
        'vname' => 'LBL_POTENTIALS',
    ];
}
VardefManager::createVardef('Contacts', 'Contact', ['default', 'assignable', 'person']);

SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['primary_address_reference_id'] = [
    'name' => 'primary_address_reference_id',
    'type' => 'varchar',
    'len' => 36,
];

SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['alt_address_reference_id'] = [
    'name' => 'alt_address_reference_id',
    'type' => 'varchar',
    'len' => 36,
];

// CR1000661
if(file_exists('extensions/modules/PartnerAgreements')) {
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['partneragreements'] = [
        'name' => 'partneragreements',
        'vname' => 'LBL_PARTNERAGREEMENTS',
        'type' => 'link',
        'relationship' => 'partneragreements_contacts',
        'module' => 'PartnerAgreements',
        'bean_name' => 'PartnerAgreement',
        'source' => 'non-db',
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['partneragreement_role'] = [
        'name' => 'partneragreement_role',
        'vname' => 'LBL_ROLE',
        'type' => 'enum',
        'options' => 'partneragreement_contact_role_dom',
        'source' => 'non-db',
        'comment' => 'for relationship field partneragreement_role'
    ];
    SpiceDictionaryHandler::getInstance()->dictionary['Contact']['fields']['propensity_to_partnership'] = [
        'name' => 'propensity_to_partnership',
        'vname' => 'LBL_PROPENSITY_TO_PARTNERSHIP',
        'type' => 'enum',
        'options' => 'partneragreement_propensity_role_dom',
        'source' => 'non-db',
        'comment' => 'for relationship field propensity_to_partnership'
    ];
}
