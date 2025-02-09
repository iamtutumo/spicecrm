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


namespace SpiceCRM\modules\SchedulerJobTasks\api\controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\includes\database\DBManagerFactory;
use SpiceCRM\includes\SpiceSlim\SpiceResponse as Response;
use SpiceCRM\modules\SchedulerJobTasks\SchedulerJobTask;

class SchedulerJobTaskController
{
    /**
     * return a list of the job task log
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function loadJobTaskLog(Request $req, Response $res, array $args): Response
    {
        $db = DBManagerFactory::getInstance();
        $params = $req->getQueryParams();
        $logArray = [];

        $failedOnlyCondition = $params['failedOnly'] ? " AND l.resolution = 'failed' " : '';
        $fromDateTimeCondition = $params['fromDateTime'] ? " AND l.executed_on >= '{$params['fromDateTime']}' " : '';

        $q = "SELECT j.name, j.id rel_id, 'SchedulerJobs' rel_module, l.* FROM schedulerjob_log l LEFT JOIN schedulerjobs j ON j.id = l.schedulerjob_id WHERE l.schedulerjobtask_id = '{$args['id']}' $failedOnlyCondition $fromDateTimeCondition ORDER BY l.executed_on {$params['sortDirection']}";
        $query = $db->limitQuery($q, $params['offset'], $params['limit']);

        $failedOnlyCondition = $params['failedOnly'] ? " AND resolution = 'failed' " : '';
        $fromDateTimeCondition = $params['fromDateTime'] ? " AND executed_on >= '{$params['fromDateTime']}' " : '';
        $countRes = $db->fetchOne("SELECT COUNT(id) c FROM schedulerjob_log where schedulerjobtask_id = '{$args['id']}' $failedOnlyCondition $fromDateTimeCondition");

        while ($log = $db->fetchByAssoc($query)) $logArray[] = $log;

        return $res->withJson(['list' => $logArray, 'count' => $countRes['c']]);
    }

    /**
     * run a specific job task immediately
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     * @throws \Exception
     */
    public function runJobTask(Request $req, Response $res, array $args): Response
    {
        $jobTask = BeanFactory::getBean('SchedulerJobTasks', $args['id']);

        $return = $jobTask->run();

        return $res->withJson($return['success']);
    }

    /**
     * Returns all class names of schedulerjobtasks classes.
     *
     * @param Request $req
     * @param Response $res
     * @param array $args
     * @return Response
     */
    public function getSchedulerJobTaskClasses(Request $req, Response $res, array $args): Response {
        $classList = [];
        $checkRootPaths = ['include', 'modules', 'extensions/include', 'extensions/modules', 'custom/modules', 'custom/extensions/modules', 'custom/include', 'custom/extensions/include', 'custom/Extension/modules'];

        foreach ($checkRootPaths as $checkRootPath) {
            $dirHandle = opendir("./$checkRootPath");
            if ($dirHandle) {
                while (($nextDir = readdir($dirHandle)) !== false) {
                    if ($nextDir != '.' && $nextDir != '..' && is_dir("./$checkRootPath/$nextDir")
                        && file_exists("./$checkRootPath/$nextDir/" . SchedulerJobTask::SCHEDULER_JOB_TASKS_DIRECTORY)
                    ) {
                        $subDirHandle = opendir("./$checkRootPath/$nextDir/" . SchedulerJobTask::SCHEDULER_JOB_TASKS_DIRECTORY);
                        if ($subDirHandle) {
                            while (false !== ($nextFile = readdir($subDirHandle))) {
                                if (preg_match('/.php$/', $nextFile)) {
                                    require_once("./$checkRootPath/$nextDir/" . SchedulerJobTask::SCHEDULER_JOB_TASKS_DIRECTORY . "/$nextFile");
                                }
                            }
                        }
                    }
                }
            }
        }

        foreach (get_declared_classes() as $className) {
            if (strpos($className, SchedulerJobTask::SCHEDULER_JOB_TASKS_DIRECTORY) !== false) {
                $classList[] = $className;
            }
        }

        return $res->withJson($classList);
    }
}