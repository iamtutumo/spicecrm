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


namespace SpiceCRM\modules\SystemTenants\api\controllers;

use Exception;
use SpiceCRM\modules\SystemTenants\SystemTenant;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\includes\authentication\AuthenticationController;
use SpiceCRM\includes\database\DBManagerFactory;
use SpiceCRM\includes\ErrorHandlers\BadRequestException;
use SpiceCRM\includes\ErrorHandlers\UnauthorizedException;
use SpiceCRM\includes\SpiceDemoData\SpiceDemoDataGenerator;
use Psr\Http\Message\ServerRequestInterface as Request;
use SpiceCRM\includes\SpiceSlim\SpiceResponse as Response;
use SpiceCRM\includes\SugarObjects\SpiceConfig;
use SpiceCRM\includes\TimeDate;
use SpiceCRM\includes\utils\SpiceUtils;

class SystemTenantsController
{
    /**
     * initializes the tenant
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function initialize(Request $req, Response $res, array $args): Response {
        $tenant = BeanFactory::getBean('SystemTenants', $args['id']);
        return $res->withJson($tenant->initializeTenant());
    }

    /**
     * loads demo data in a client
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws UnauthorizedException
     */
    public function loadDemoData(Request $req, Response $res, array $args): Response
    {
        $populatedTables = [];
        $current_user = AuthenticationController::getInstance()->getCurrentUser();

        if (!$current_user->is_admin) {
            throw new UnauthorizedException('only admin access');
        }

        /** @var SystemTenant $tenant */
        $tenant = BeanFactory::getBean('SystemTenants', $args['id']);
        if ($tenant) {

            $tenant->switchToTenant();

            $demoGenerator = new SpiceDemoDataGenerator();
            $demoGenerator->generateAccounts();
            $populatedTables[] = "accounts";
            $demoGenerator->generateContacts();
            $populatedTables[] = "contacts";
            if (DBManagerFactory::getInstance()->tableExists('consumers')) {
                $demoGenerator->generateConsumers();
                $populatedTables[] = "consumers";
            }
            if (DBManagerFactory::getInstance()->tableExists('leads')) {
                $demoGenerator->generateLeads();
                $populatedTables[] = "leads";
            }

            $tenant::switchToMaster();
        }

        return $res->withJson(["populatedTables" => $populatedTables]);

    }

    /**
     * loads demo data in a client
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws BadRequestException
     */
    public function acceptLegalNotice(Request $req, Response $res, array $args): Response
    {
        $authController = AuthenticationController::getInstance();

        if (empty($authController->systemtenantid)) {
            throw new BadRequestException('Only allowed when logged in to a tenant.');
        }

        SystemTenant::switchToMaster();

        /* @var SystemTenant */
        $tenant = BeanFactory::getBean('SystemTenants', $authController->systemtenantid);

        $tenant->accept_data = json_encode([
            'ip' => SpiceUtils::getClientIP(),
            'timestamp' => TimeDate::getInstance()->nowDb()
        ]);

        $tenant->save();

        return $res->withJson(['success' => true]);
    }

    /**
     * create an authentication user entry
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws Exception
     */
    public function createAuthUser(Request $req, Response $res, array $args): Response
    {
        $params = $req->getParsedBody();

        $db = DBManagerFactory::getInstance();

        $db->insertQuery('tenant_auth_users', [
            'id' => $params['id'],
            'tenant_id' => $params['tenantId'],
            'username' => $params['username'],
            'user_hash' => $params['password'],
        ]);

        return $res->withJson(['success' => true]);
    }
}
