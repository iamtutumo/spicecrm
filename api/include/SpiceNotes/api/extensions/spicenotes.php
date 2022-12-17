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
use SpiceCRM\includes\SpiceNotes\api\controllers\SpiceNotesController;
use SpiceCRM\includes\Middleware\ValidationMiddleware;
/**
 * get a Rest Manager Instance
 */
$RESTManager = RESTManager::getInstance();

$routes = [
    [
        'method'      => 'get',
        'route'       => '/module/{beanName}/{beanId}/note',
        'class'       => SpiceNotesController::class,
        'function'    => 'getQuickNotesForBean',
        'description' => 'get the quicknotes for the beans',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'beanName'        => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_MODULE,
                'required'    => true,
                'description' => 'The name of the module',
            ],
            'beanId'          => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_GUID,
                'required'    => true,
                'description' => 'GUID of the bean',
            ],
        ],
    ],
    [
        'method'      => 'post',
        'route'       => '/module/{beanName}/{beanId}/note',
        'class'       => SpiceNotesController::class,
        'function'    => 'saveQuickNote',
        'description' => 'saves the notes',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'beanName' => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_MODULE,
                'required'    => true,
                'description' => 'The name of the module',
            ],
            'beanId'   => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_GUID,
                'required'    => true,
                'description' => 'GUID of the bean',
            ],
            'global'   => [
                'in'          => 'body',
                'type'        => ValidationMiddleware::TYPE_BOOL,
                'required'    => true,
                'description' => '',
            ],
            'text'     => [
                'in'          => 'body',
                'type'        => ValidationMiddleware::TYPE_STRING,
                'required'    => true,
                'description' => '',
            ],
        ],
    ],
    [
        'method'      => 'post',
        'route'       => '/module/{beanName}/{beanId}/note/{noteId}',
        'class'       => SpiceNotesController::class,
        'function'    => 'editQuickNote',
        'description' => 'edits the quicknotes',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            'beanName' => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_MODULE,
                'required'    => true,
                'description' => 'The name of the module',
            ],
            'beanId'   => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_GUID,
                'required'    => true,
                'description' => 'GUID of the bean',
            ],
            'noteId'   => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_GUID,
                'required'    => true,
                'description' => 'SpiceNote GUID',
            ],
            'global'   => [
                'in'          => 'body',
                'type'        => ValidationMiddleware::TYPE_BOOL,
                'required'    => true,
                'description' => '',
            ],
            'text'     => [
                'in'          => 'body',
                'type'        => ValidationMiddleware::TYPE_STRING,
                'required'    => true,
                'description' => '',
            ],
        ],
    ],
    [
        'method'      => 'delete',
        'route'       => '/module/{beanName}/{beanId}/note/{noteId}',
        'class'       => SpiceNotesController::class,
        'function'    => 'deleteQuickNote',
        'description' => 'deletes the quick notes',
        'options'     => ['noAuth' => false, 'adminOnly' => false, 'validate' => true],
        'parameters'  => [
            // todo bean name and ID doesn't seem to be needed for anything
            'beanName' => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_MODULE,
                'required'    => false,
                'description' => 'The name of the module',
            ],
            'beanId'   => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_GUID,
                'required'    => false,
                'description' => 'GUID of the bean',
            ],
            'noteId'   => [
                'in'          => 'path',
                'type'        => ValidationMiddleware::TYPE_GUID,
                'required'    => true,
                'description' => 'SpiceNote GUID',
            ],
        ],
    ],
];

/**
 * register the Extension
 */
$RESTManager->registerExtension('spicenotes', '1.0', [], $routes);
