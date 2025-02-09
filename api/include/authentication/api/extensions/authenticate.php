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


use SpiceCRM\includes\authentication\SpiceCRMAuthenticate\SpiceCRMPasswordUtils;
use SpiceCRM\includes\Middleware\ValidationMiddleware;
use SpiceCRM\includes\RESTManager;
use SpiceCRM\includes\SugarObjects\SpiceConfig;
use SpiceCRM\includes\authentication\api\controllers\AuthenticateController;

$RESTManager = RESTManager::getInstance();

$routes = [
    [
        'method' => 'post',
        'oldroute' => '/passwordtoken/token/{token}',
        'route' => '/authentication/passwordtoken/token/{token}',
        'class' => AuthenticateController::class,
        'function' => 'authResetPasswordByToken',
        'description' => '',
        'options' => ['noAuth' => true, 'adminOnly' => false, 'validate' => true ],
        'parameters' => [
            'token' => [
                'in' => 'path',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_STRING,
                'required' => true,
                'example' => 'iie94894hjf'
            ],
            'newPassword' => [
                'in' => 'body',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_STRING,
                'required' => true,
                'example' => 'newP@$$word1!!'
            ],
        ]
    ],
    [
        'method' => 'get',
        'oldroute' => '/passwordtoken/email/{emailAddress}',
        'route' => '/authentication/passwordtoken/email/{emailAddress}',
        'class' => AuthenticateController::class,
        'function' => 'authSendTokenToUser',
        'description' => '',
        'options' => ['noAuth' => true, 'adminOnly' => false],
        'parameters' => [
            'emailAddress' => [
                'in' => 'path',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_EMAIL,
                'required' => true,
                'example' => 'max.mustermann@twentyreasons.com'
            ],
        ],
    ],
    [
        'method' => 'post',
        'oldroute' => '/changepassword',
        'route' => '/authentication/changepassword',
        'class' => AuthenticateController::class,
        'function' => 'authChangePassword',
        'description' => '',
        'options' => ['noAuth' => true, 'adminOnly' => false],
        'params' => [
            'username' => [
                'in' => 'body',
                'description' => 'The Username',
                'type' => 'string',
                'example' => 'admin',
                'required' => true
            ],

            'password' => [
                'in' => 'body',
                'description' => 'The old Password',
                'type' => 'string',
                'example' => 'oldpassword',
                'required' => true
            ],

            'newPassword' => [
                'in' => 'body',
                'description' => 'The new Password',
                'type' => 'string',
                'example' => 'newpassword',
                'required' => true
            ]
        ],
    ],
    [
        'method' => 'post',
        'route' => '/module/Users/{id}/password/reset',
        'class' => AuthenticateController::class,
        'function' => 'authSetNewPassword',
        'description' => '',
        'options' => ['noAuth' => false, 'adminOnly' => false],
        'parameters' => [
            'id' => [
                'in' => 'path',
                'description' => 'ID of the user',
                'type' => ValidationMiddleware::TYPE_GUID,
                'required' => true,
                'example' => '40109eab-ddc0-01fb-3a85-b3f3f87cfa1c'
            ],
            'newPassword' => [
                'in' => 'body',
                'description' => 'ID of the user',
                'type' => ValidationMiddleware::TYPE_STRING,
                'required' => true,
                'example' => 'newP@$$word1!!'
            ],
            'sendEmail' => [
                'in' => 'body',
                'description' => 'Whether send the password to the user via email',
                'type' => ValidationMiddleware::TYPE_BOOL,
                'required' => true,
                'example' => true
            ],
            'forceReset' => [
                'in' => 'body',
                'description' => 'Force user to change the password on next login',
                'type' => ValidationMiddleware::TYPE_BOOL,
                'required' => true,
                'example' => false
            ],
        ],
    ],
    [
        'method' => 'get',
        'oldroute' => '/user/preferencesformats',
        'route' => '/module/Users/preferencesformats',
        'class' => AuthenticateController::class,
        'function' => 'authGetFormat',
        'description' => '',
        'options' => ['noAuth' => false, 'adminOnly' => false],
        'parameters' => [

        ]
    ],
    [
        'method' => 'get',
        'route' => '/authentication/totp',
        'class' => AuthenticateController::class,
        'function' => 'checkTOTPActive',
        'description' => '',
        'options' => ['noAuth' => false, 'adminOnly' => false],
        'parameters' => [
            'onBehalfUserId' => [
                'in' => 'query',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_GUID,
                'required' => false
            ]
        ]
    ],
    [
        'method' => 'delete',
        'route' => '/authentication/totp',
        'class' => AuthenticateController::class,
        'function' => 'deleteTOTPActive',
        'description' => '',
        'options' => ['noAuth' => false, 'adminOnly' => false],
        'parameters' => [
            'onBehalfUserId' => [
                'in' => 'query',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_GUID,
                'required' => false
            ]
        ]
    ],
    [
        'method' => 'post',
        'route' => '/authentication/totp/generate',
        'class' => AuthenticateController::class,
        'function' => 'generateTOTPSecret',
        'description' => '',
        'options' => ['noAuth' => true, 'adminOnly' => false],
        'parameters' => [
            'onBehalfUserId' => [
                'in' => 'query',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_GUID,
                'required' => false
            ]
        ]
    ],
    [
        'method' => 'put',
        'route' => '/authentication/totp/validate/{code}',
        'class' => AuthenticateController::class,
        'function' => 'validateTOTPCode',
        'description' => '',
        'options' => ['noAuth' => true, 'adminOnly' => false],
        'parameters' => [
            'code' => [
                'in' => 'path',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_STRING,
                'required' => true,
                'example' => 'iie94894hjf'
            ],
            'onBehalfUserId' => [
                'in' => 'query',
                'description' => '',
                'type' => ValidationMiddleware::TYPE_GUID,
                'required' => false
            ]
        ]
    ]
];

$config = SpiceConfig::getInstance()->config;

$RESTManager->registerExtension('userpassword', '2.0', [
    'oneupper' => (boolean)$config['passwordsetting']['oneupper'],
    'onelower' => (boolean)$config['passwordsetting']['onelower'],
    'onenumber' => (boolean)$config['passwordsetting']['onenumber'],
    'onespecial' => (boolean)$config['passwordsetting']['onespecial'],
    'minpwdlength' => $config['passwordsetting']['minpwdlength'],
    'regex' => '^' . SpiceCRMPasswordUtils::getPwdCheckRegex() . '$'
],
    $routes
);