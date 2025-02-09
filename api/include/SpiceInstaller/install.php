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


// go to the webroot and also correct the self path
chdir('../..');
$_SERVER['PHP_SELF'] = str_replace('/include/SpiceInstaller', '', $_SERVER['PHP_SELF']);

// require the autoloader
require_once 'vendor/autoload.php';

use Fig\Http\Message\StatusCodeInterface;
use Slim\Factory\AppFactory;
use DI\Container;
use SpiceCRM\includes\SpiceSlim\SpiceResponseFactory;
use SpiceCRM\includes\utils\SpiceUtils;
use SpiceCRM\includes\SugarObjects\SpiceConfig;

register_shutdown_function([SpiceUtils::class, 'spiceCleanup']);

//set some basic php settings ensure they are proper if not set in the php.ini as it shoudl have been
error_reporting(E_ERROR);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('session.use_cookies', '0');
date_default_timezone_set('UTC');

// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

$RESTManager = SpiceCRM\includes\RESTManager::getInstance();

try {
    // make sure this only happens when we have no config
    if(SpiceConfig::getInstance()->configExists()){
        throw new \SpiceCRM\includes\ErrorHandlers\ForbiddenException('system is already installed');
    }

    $slimContainer = new Container();
    AppFactory::setContainer($slimContainer);
    $app = AppFactory::create(new SpiceResponseFactory());

    $app->addBodyParsingMiddleware();
    $app->mode = 'production';

    //determine base path
    $appBasePath = \SpiceCRM\includes\utils\SpiceUtils::determineAppBasePath();
    if ($appBasePath !== null) {
        $app->setBasePath($appBasePath);
    } else {
        throw new \Exception("Unable to determine App Base Path");
    }


    $RESTManager->app=$app;
    $app->addRoutingMiddleware();
    require "include/SpiceInstaller/REST/extensions/spiceinstaller.php";

    $errorHandler = function (
        \Psr\Http\Message\ServerRequestInterface $request,
        \Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails
    ) use ($app) {
        $response = $app->getResponseFactory()->createResponse();

        if ($exception instanceof \Slim\Exception\HttpNotFoundException) {
            $message = 'not found';
            $code = 404;
        } elseif ($exception instanceof \Slim\Exception\HttpMethodNotAllowedException) {
            $message = 'not allowed';
            $code = 403;
        } else {
            $message = $exception->getMessage();
            $code = $exception->getCode();
            if (!is_integer($code) || $code < StatusCodeInterface::STATUS_CONTINUE || $code > 599) {
                $code = 500;
            }
        }

        $response->withHeader('Content-Type', 'text/plain');
        $response->getBody()->write($message);
        return $response->withStatus($code);
    };

    $errorMiddleware = $app->addErrorMiddleware(true, true, true);
    $errorMiddleware->setDefaultErrorHandler($errorHandler);
    $RESTManager->initRoutes();
    $app->run();
    die();

} catch (Exception $e) {
    $RESTManager->outputError($e);
}
