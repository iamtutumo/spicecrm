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


use SpiceCRM\includes\authentication\AuthenticationController;
use SpiceCRM\includes\RESTManager;
use SpiceCRM\includes\authentication\api\controllers\OAuth2Controller;
use SpiceCRM\includes\Middleware\ValidationMiddleware;
use SpiceCRM\includes\SugarObjects\SpiceConfig;

/**
 * get a Rest Manager Instance
 */
$RESTManager = RESTManager::getInstance();
$config      = SpiceConfig::getInstance()->config;

$routes = [
    [
        'method'      => 'get',
        'route'       => '/authentication/oauth2/profile',
        'class'       => OAuth2Controller::class,
        'function'    => 'getUserProfile',
        'description' => 'This is the route used as the redirect URL for OAuth',
        'options'     => ['noAuth' => true, 'adminOnly' => false],
        'parameters'  => [
            'state' => [
                'in'          => 'query',
                'description' => 'This is the value passed on from the login page. It should contain the session ID',
                'type'        => ValidationMiddleware::TYPE_STRING,
                'required'    => false,
            ],
            'code'  => [
                'in'          => 'query',
                'description' => 'Authorization code that needs to be exchanged for the access token.',
                'type'        => ValidationMiddleware::TYPE_STRING,
                'required'    => true,
            ],
        ]
    ],
    [
        'method'      => 'post',
        'route'       => '/authentication/oauth2/accessToken',
        'class'       => OAuth2Controller::class,
        'function'    => 'getAccessToken',
        'description' => 'request access token based on auth code',
        'options'     => ['noAuth' => true, 'adminOnly' => false],
        'parameters'  => [
            'issuer' => [
                'in'          => 'body',
                'description' => '',
                'type'        => ValidationMiddleware::TYPE_STRING,
                'required'    => false,
            ],
            'code'  => [
                'in'          => 'body',
                'description' => 'Authorization code that needs to be exchanged for the access token.',
                'type'        => ValidationMiddleware::TYPE_STRING,
                'required'    => true,
            ],
        ]
    ],
];

try {
    $services = AuthenticationController::loadServices();
} catch (Exception $e) {
    $services = [];
}

/**
 * register the Extension
 */
$RESTManager->registerExtension(
    'oauth2',
    '1.0',
    $services,
    $routes
);