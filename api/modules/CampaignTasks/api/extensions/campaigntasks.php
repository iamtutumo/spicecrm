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

use SpiceCRM\includes\RESTManager;
use SpiceCRM\modules\CampaignTasks\api\controllers\CampaignTasksController;
use SpiceCRM\includes\Middleware\ValidationMiddleware;
use SpiceCRM\includes\SugarObjects\SpiceConfig;

/**
 * get a Rest Manager Instance
 */
$RESTManager = RESTManager::getInstance();

/**
 * register the Extension
 */
$RESTManager->registerExtension('campaigntasks', '1.0', ['pdflimit' => SpiceConfig::getInstance()->config['mailmerge']['pdflimit']]);

$routes = [
    [
        'method'      => 'get',
        'route'       => '/module/CampaignTasks/{id}/items',
        'oldroute'    => '/module/CampaignTasks/{campaignid}/items',
        'class'       => CampaignTasksController::class,
        'function'    => 'getCampaignTaskItems',
        'description' => 'get campaign tasks defined for a specific campaign',
        'options'     => ['noAuth' => false, 'adminOnly' => false],
        'parameters'  => [
            'offset' => [
                'in' => 'query',
                'type' => ValidationMiddleware::TYPE_NUMERIC,
                'description' => 'offset for list',
                'example' => 25,
                'required' => false
            ],
            'limit' => [
                'in' => 'query',
                'type' => ValidationMiddleware::TYPE_NUMERIC,
                'description' => 'limit for list',
                'example' => 50,
                'required' => false
            ]
        ]
    ],
    [
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/activate',
        'oldroute'    => '/module/CampaignTasks/{campaigntaskid}/activate',
        'class'       => CampaignTasksController::class,
        'function'    => 'activateCampaignTask',
        'description' => 'delete old campaign logs and activate campaign task by inserting new ones (prospect lists of type test will be ignored)',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ],
        ],
    ],[
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/activateEventTask',
        'class'       => CampaignTasksController::class,
        'function'    => 'activateEventTask',
        'description' => 'delete old campaign logs and activate campaign task by inserting new ones (prospect lists of type test will be ignored)',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ],
        ],
    ],
    [
        'method'      => 'get',
        'route'    => '/module/CampaignTasks/{id}/targetcount',
        'class'       => CampaignTasksController::class,
        'function'    => 'getTargetCount',
        'description' => 'returns the number of targets via linked target lists',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID
            ]
        ]
    ],
    [
        'method'      => 'get',
        'route'    => '/module/CampaignTasks/{id}/mailmerge',
        'class'       => CampaignTasksController::class,
        'function'    => 'mailmergeCampaignTask',
        'description' => 'genereate a PDF for a mailmerge campaign',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID
            ],
            'start'    => [
                'in'          => 'path',
                'description' => 'the index to start the letter from',
                'type'        => ValidationMiddleware::TYPE_NUMERIC
            ],
            'limit'    => [
                'in'          => 'path',
                'description' => 'the number of records to print',
                'type'        => ValidationMiddleware::TYPE_NUMERIC
            ]
        ]
    ],
    [
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/sendtestmail',
        'oldroute'    => '/module/CampaignTasks/{campaigntaskid}/sendtestmail',
        'class'       => CampaignTasksController::class,
        'function'    => 'sendCampaignTaskTestEmail',
        'description' => 'send a test mail for campaign task',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ],
        ],
    ],
    [
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/queuemail',
        'oldroute'    => '/module/CampaignTasks/{campaigntaskid}/queuemail',
        'class'       => CampaignTasksController::class,
        'function'    => 'queueCampaignTaskEmail',
        'description' => '',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ],
        ],
    ],
    [
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/livecompile/{parentmodule}/{parentid}',
        'oldroute'    => '/CampaignTasks/liveCompile/{module}/{parent}',
        'class'       => CampaignTasksController::class,
        'function'    => 'liveCompileEmailBody',
        'description' => '',
        'options'     => ['noAuth' => false, 'adminOnly' => false],
        'parameters'  => [
            'parentmodule' => [
                'in' => 'path',
                'type' => ValidationMiddleware::TYPE_STRING,
                'description' => 'name of parent module',
                'example' => 'Accounts',
                'required' => true
            ],
            'parentid' => [
                'in' => 'path',
                'type' => 'guid',
                'description' => 'if of parent bean',
                'example' => '2816ba5c-97e7-11eb-8c42-00fffe0c4f07',
                'required' => true
            ],
            'html' => [
                'in' => 'body',
                'type' => ValidationMiddleware::TYPE_STRING,
                'description' => 'html string',
                'example' => '',
                'required' => true
            ],
            'field' => [
                'in' => 'body',
                'type' => ValidationMiddleware::TYPE_STRING,
                'description' => 'html field',
                'example' => '',
                'required' => false
            ]
        ]
    ],
    [
        'method'      => 'get',
        'route'       => '/module/CampaignTasks/export/reports',
        'class'       => CampaignTasksController::class,
        'function'    => 'getExportReports',
        'description' => 'get all reports based on CampaignTasks module',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
    ],
    [
        'method'      => 'get',
        'route'       => '/module/CampaignTasks/{id}/targets',
        'class'       => CampaignTasksController::class,
        'function'    => 'getTargets',
        'description' => 'get all targets for a comaping task',
        'options'     => ['validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ],
            'searchTerm'    => [
                'in'          => 'query',
                'description' => 'query search term',
                'type'        => ValidationMiddleware::TYPE_STRING,
            ],
            'offset'    => [
                'in'          => 'query',
                'description' => 'query offset',
                'type'        => ValidationMiddleware::TYPE_NUMERIC,
            ],
            'limit'    => [
                'in'          => 'query',
                'description' => 'query limit',
                'type'        => ValidationMiddleware::TYPE_NUMERIC,
            ],
            'prospectListIds'    => [
                'in'          => 'query',
                'description' => 'query list ids',
                'type'        => ValidationMiddleware::TYPE_ARRAY,
            ],
            'status'    => [
                'in'          => 'query',
                'description' => 'query status filter',
                'type'        => ValidationMiddleware::TYPE_STRING,
            ],
            'modules'    => [
                'in'          => 'query',
                'description' => 'query modules filter',
                'type'        => ValidationMiddleware::TYPE_STRING,
            ],
            'sort'    => [
                'in'          => 'query',
                'description' => 'query sort field',
                'type'        => ValidationMiddleware::TYPE_OBJECT,
            ]
        ]
    ],
    [
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/targets/status/{status}',
        'class'       => CampaignTasksController::class,
        'function'    => 'setTargetsStatus',
        'description' => 'set targets status',
        'options'     => ['validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ],
            'targets'    => [
                'in'          => 'body',
                'description' => 'targets to set status',
                'type'        => ValidationMiddleware::TYPE_ARRAY,
            ],
            'status'    => [
                'in'          => 'path',
                'description' => 'targets status',
                'type'        => ValidationMiddleware::TYPE_STRING,
            ],
        ]
    ],
    [
        'method'      => 'post',
        'route'       => '/module/CampaignTasks/{id}/targets/list/inclusion',
        'class'       => CampaignTasksController::class,
        'function'    => 'createInclusionList',
        'description' => 'create campaign task inclusion list',
        'options'     => ['validate' => true],
        'parameters'  => [
            'id'    => [
                'in'          => 'path',
                'description' => 'Campaign Task id',
                'type'        => ValidationMiddleware::TYPE_GUID,
            ]
        ]
    ],
];

$RESTManager->registerRoutes($routes);
