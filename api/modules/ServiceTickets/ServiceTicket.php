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


namespace SpiceCRM\modules\ServiceTickets;

use DateTime;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\data\SpiceBean;
use SpiceCRM\includes\SpiceNumberRanges\SpiceNumberRanges;
use SpiceCRM\includes\TimeDate;
use SpiceCRM\includes\authentication\AuthenticationController;
use SpiceCRM\extensions\modules\QuestionAnswers\QuestionAnsweringHandler;
use SpiceCRM\includes\utils\SpiceUtils;

class ServiceTicket extends SpiceBean
{
    private $stageFields = [
        'assigned_user_id' => 'st_assigned_user_id',
        'serviceticket_status' =>'serviceticket_status',
        'serviceticket_class' =>'serviceticket_class',
        'servicequeue_id' => 'servicequeue_id',
        'sysservicecategory_id1' => 'sysservicecategory_id1',
        'sysservicecategory_id2' => 'sysservicecategory_id2',
        'sysservicecategory_id3' => 'sysservicecategory_id3',
        'sysservicecategory_id4' => 'sysservicecategory_id4',
        'resolve_date' => 'resolve_date',
    ];

    public $sysnumberranges = true; //entries in table sysnumberranges required!

    public function get_summary_text()
    {
        return $this->serviceticket_number . '/' . $this->name;
    }

    /**
     * chekcs changed fields and returns them or false if no changes are detectzed
     *
     * @return array|false
     */
    private function detectStageChange()
    {
        $changedFields = [];
        foreach ($this->stageFields as $ticketField => $stageField) {
            if ($this->$ticketField != $this->fetched_row[$ticketField]){
                $changedFields[] = $ticketField;
            }
        }

        return count($changedFields) > 0 ? $changedFields : false;
    }

    /**
     * overwrite the retrieve and also add the email1 to the ticket
     *
     * @param int $id
     * @param bool $encode
     * @param bool $deleted
     * @param bool $relationships
     * @return ServiceTicket|null
     */
    public function retrieve($id = -1, $encode = false, $deleted = true, $relationships = true)
    {
        $bean = parent::retrieve($id, $encode, $deleted, $relationships);

        // try to retrieve the parent and set the email if we have one
        if (!empty($this->parent_id)) {
            if($parent = BeanFactory::getBean($this->parent_type, $this->parent_id)){
                $this->email1 = $parent->email1;
            }
        }

        return $bean;
    }

    /**
     * overrides save generating a ticket number
     *
     * @param false $check_notify
     * @param bool $fts_index_bean
     * @return int|string
     */
    public function save($check_notify = false, $fts_index_bean = true)
    {
        $timedate = TimeDate::getInstance();
//        $current_user = AuthenticationController::getInstance()->getCurrentUser();

        //set serviceticket_number
        if (empty($this->serviceticket_number)) {
            $this->serviceticket_number = SpiceNumberRanges::getNextNumberForField('ServiceTickets', 'serviceticket_number');
        }
        //set date_closed
        if ($this->serviceticket_status == 'Closed' && empty($this->date_closed)) {
            $sdt = new TimeDate();
            $this->date_closed = gmdate($sdt->get_db_date_time_format());
        }

        // set a default ticekt status if no other is set
        if (empty($this->serviceticket_status)) $this->serviceticket_status = 'New';

//        if ($this->serviceticket_status != $this->fetched_row['serviceticket_status']) {
//            switch ($this->serviceticket_status) {
//                case 'Assigned':
//                    $this->assigned_user_id = $current_user->id;
//                    $this->assigned_user_name = $current_user->get_summary_text();
//                    break;
//                case 'Assigned':
//                    $this->assigned_user_id = $current_user->id;
//                    $this->assigned_user_name = $current_user->get_summary_text();
//                    break;
// CR1000860
//                case 'In Process':
//                case 'Pending Input':
//                case 'Closed':
//                    $this->assigned_user_id = '';
//                    $this->assigned_user_name = '';
//                    break;
//            }
//        }

        $changedFields = $this->detectStageChange();
        if (!$this->in_save && $changedFields !== false) {
            $ticketStage = BeanFactory::getBean('ServiceTicketStages');
            if ($ticketStage) {
                // if it is a new ticket, create an id
                if (empty($this->id)) {
                    $this->id = SpiceUtils::createGuid();
                    $this->new_with_id = true;
                }

                // set the value for each stage field from the list
                foreach ($this->stageFields as $ticketField => $stageField) {
                    $ticketStage->$stageField = $this->$ticketField;
                }

                $ticketStage->name = $this->serviceticket_number . ' ' . $timedate->nowDb();
                $ticketStage->created_by = AuthenticationController::getInstance()->getCurrentUser()->id;
                $ticketStage->serviceticket_id = $this->id;
                $ticketStage->save();
            }
        }

        // determine SLAs
        if (empty($this->serviceticketsla_id)) {
            $this->determineSLAs();
        }

        /**
         * if(!empty($this->serviceticket_type) && !empty($this->serviceticket_class) && empty($this->resolve_until)){
         * $sla = $this->db->fetchByAssoc($this->db->query("SELECT * FROM serviceticketslas WHERE serviceticket_type='$this->serviceticket_type' AND serviceticket_class='$this->serviceticket_class'"));
         * if($sla){
         * if($sla['time_to_response']){
         * $responsedate = $this->getSLAStartDate();
         * $responsedate->add(new DateInterval("PT{$sla['time_to_response']}H"));
         * $this->respond_until = $responsedate->format($timedate->get_db_date_time_format());
         * }
         *
         * if($sla['time_to_resolution']){
         * $resolvedate = $this->getSLAStartDate();
         * $resolvedate->add(new DateInterval("PT{$sla['time_to_resolution']}H"));
         * $this->resolve_until = $resolvedate->format($timedate->get_db_date_time_format());
         * }
         * }
         * }
         */

        // set the closed date
        if ($this->serviceticket_status == 'Closed' || $this->serviceticket_status == 'Rejected' || $this->serviceticket_status == 'Duplicate') {
            $closeDate = new DateTime();
            $this->resolve_date = $closeDate->format($timedate->get_db_date_time_format());
        } else {
            $this->resolve_date = '';
        }

        $saveResponse = parent::save($check_notify);

        if (!empty(json_decode($this->questionnaire_answers, true))) {
            QuestionAnsweringHandler::saveAnswers_byParent(json_decode($this->questionnaire_answers, true)['answers'], 'ServiceTickets', $this->id, true);
        }

        return $saveResponse;

    }

    /**
     * Try to find a match on SLA time definitions
     * If not match apply times from default SLA
     * @return void
     */
    public function determineSLAs(){
        $sla = BeanFactory::getBean('ServiceTicketSLAs');
        if($sla) {
            $slaTime = $sla->findSlaTimeMatch($this);
            if(!$slaTime){ // use default SLA
                $slaTime = $sla->getDefaultSlaTimes();
            }
            $sla->setSLADatesforTicket($this, $slaTime);
        }
    }

    /**
     * determine the SLA Date and Time
     *
     * @return DateTime|false
     */
    private function getSLAStartDate()
    {
        $timedate = TimeDate::getInstance();
        if (empty($this->date_entered)) {
            return new DateTime();
        } else {
            return date_create_from_format($timedate->get_db_date_time_format(), $this->date_entered);
        }
    }


    function getUserQueuesTickets()
    {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();

        // get the users queues
        $current_user->load_relationship('servicequeues');
        $queues = $current_user->get_linked_beans('servicequeues', 'ServiceQueue');
        $queuesArray = [];
        foreach ($queues as $queue) {
            $queuesArray[] = "'" . $queue->id . "'";
        }

        if (count($queuesArray) == 0)
            return [];

        // load the tickets
        $whereClauseArray = [];
        $whereClauseArray[] = "servicetickets.serviceticket_status = 'New'";
        $whereClauseArray[] = "servicetickets.servicequeue_id in (" . implode(',', $queuesArray) . ")";
        // function get_list($order_by = "", $where = "", $row_offset = 0, $limit = -1, $max = -1, $show_deleted = 0, $singleSelect = false, $select_fields = array())
        return $this->get_list("date_entered", implode(' AND ', $whereClauseArray));

    }


    function getUserOpenTickets()
    {
        $current_user = AuthenticationController::getInstance()->getCurrentUser();

        // load the tickets
        $whereClauseArray = [];
        $whereClauseArray[] = "servicetickets.serviceticket_status <> 'Closed'";
        $whereClauseArray[] = "servicetickets.assigned_user_id ='$current_user->id'";
        return $this->get_list("date_entered", implode(' AND ', $whereClauseArray));

    }

}
