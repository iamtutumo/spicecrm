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


namespace SpiceCRM\includes\authentication\api\controllers;

use Exception;
use Psr\Http\Message\ServerRequestInterface as Request;
use SpiceCRM\includes\authentication\OAuth2Authenticate\OAuth2Authenticate;
use SpiceCRM\includes\ErrorHandlers\BadRequestException;
use SpiceCRM\includes\SpiceSlim\SpiceResponse as Response;
use function DI\string;

class OAuth2Controller
{
    /**
     * get access token
     * @throws Exception
     */
    public function getAccessToken(Request $req, Response $res, array $args): Response
    {
        $params = $req->getParsedBody();

        $authHandler = new OAuth2Authenticate($params['issuer']);
        $tokenResponse = $authHandler->fetchAccessToken($params['code']);

        if (empty($tokenResponse)) {
            throw new BadRequestException('Invalid authorization code', 'invalid_auth_code');
        }

        $userProfile = $authHandler->fetchUserProfile($tokenResponse->access_token);
        $tokenObject = ['access_token' => $tokenResponse->access_token, 'refresh_token' => $tokenResponse->refresh_token, 'valid_until' => (string) $tokenResponse->valid_until];
        return $res->withJson(['tokenObject' => $tokenObject, 'profile' => $userProfile]);
    }

    /**
     * get user profile
     * @throws Exception
     */
    public function getUserProfile(Request $req, Response $res, array $args): Response
    {
        $params = $req->getParsedBody();

        $authHandler = new OAuth2Authenticate($params['issuer']);
        $userProfile = $authHandler->fetchUserProfile($params['accessToken']);

        return $res->withJson($userProfile);
    }
}