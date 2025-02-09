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

SpiceDictionaryHandler::getInstance()->dictionary['SchedulerJobTask'] = [
    'table' => 'schedulerjobtasks',
    'comment' => 'store the scheduler job tasks',
	'fields' => [
        'next_run_date' => [
            'name' => 'next_run_date',
            'vname' => 'LBL_NEXT_RUN_DATE',
            'type' => 'datetime'
        ],
        'last_run_date' => [
            'name' => 'last_run_date',
            'vname' => 'LBL_LAST_RUN_DATE',
            'type' => 'datetime'
        ],
        'last_run_resolution' => [
            'name' => 'last_run_resolution',
            'vname' => 'LBL_LAST_RUN_RESOLUTION',
            'type' => 'varchar',
            'len' => 20
        ],
		'jobtask_status' => [
			'name' => 'jobtask_status',
			'vname' => 'LBL_STATUS',
			'type' => 'enum',
			'options'	=> 'jobtask_status_dom',
			'len' => 15,
            'default' => 'active',
			'required' => true
        ],
		'method' => [
			'name' => 'method',
			'vname' => 'LBL_METHOD',
			'type' => 'varchar',
			'len' => 255,
			'required' => true
        ],
		'method_params' => [
			'name' => 'method_params',
			'vname' => 'LBL_METHOD_PARAMS',
			'type' => 'varchar',
			'len' => 255
        ],
        'hold_on_failure' => [
            'name' => 'hold_on_failure',
            'vname' => 'LBL_HOLD_ON_FAILURE',
            'type' => 'bool',
            'default' => '0'
        ],
        'jobtask_sequence' => [
            'name' => 'jobtask_sequence',
            'vname' => 'LBL_SEQUENCE',
            'type' => 'int',
            'len' => 4,
            'source' => 'non-db'
        ],
        'm2m_next_run_date' => [
            'name' => 'm2m_next_run_date',
            'vname' => 'LBL_NEXT_RUN_DATE',
            'type' => 'datetime',
            'source' => 'non-db'
        ],
        'fallback_task_name' => [
            'name' => 'fallback_task_name',
            'vname' => 'LBL_FALLBACK_TASK_NAME',
            'id_name' => 'fallback_task_id',
            'type' => 'relate',
            'module' => 'SchedulerJobTasks',
            'source' => 'non-db',
        ],
        'fallback_task_id' => [
            'name' => 'fallback_task_id',
            'vname' => 'LBL_FALLBACK_TASK_ID',
            'type' => 'id',
            'reportable' => false,
            'comment' => 'The ID of the parent Sugar object identified by parent_type.'
        ],
	    'jobtask_on_failure' => [
			'name' => 'jobtask_on_failure',
			'vname' => 'LBL_SCHEDULERJOBTASKS_ON_FAILURE',
			'type' => 'link',
			'relationship' => 'schedulerjobtask_on_failure',
            'module' => 'SchedulerJobTasks',
            'source' => 'non-db'
        ],
        'schedulerjobs' => [
            'name' => 'schedulerjobs',
            'vname' => 'LBL_SCHEDULERJOBS',
            'type' => 'link',
            'relationship' => 'schedulerjobs_schedulerjobtasks',
            'module' => 'SchedulerJobs',
            'source' => 'non-db',
            'sequence_field' => 'sequence',
            'rel_fields' => [
                'sequence' => [
                    'map' => 'jobtask_sequence'
                ],
                'next_run_date' => [
                    'map' => 'm2m_next_run_date'
                ]
            ]
        ],
    ],
    'relationships' => [
        'schedulerjobtask_on_failure' => [
            'lhs_module' => 'SchedulerJobTasks',
            'lhs_table' => 'schedulerjobtasks',
            'lhs_key' => 'id',
            'rhs_module' => 'SchedulerJobTasks',
            'rhs_table' => 'schedulerjobtasks',
            'rhs_key' => 'fallback_task_id',
            'relationship_type' => 'one-to-many'
        ]
    ]
];

VardefManager::createVardef('SchedulerJobTasks','SchedulerJobTask', ['default','assignable']);
