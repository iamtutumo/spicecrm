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


namespace SpiceCRM\modules\Mailboxes;

use SpiceCRM\includes\database\DBManagerFactory;
use SpiceCRM\includes\Logger\LoggerManager;
use SpiceCRM\modules\Emails\Email;
use Exception;
use SpiceCRM\data\BeanFactory;
use SpiceCRM\modules\Mailboxes\processors\MailboxProcessor;
use SpiceCRM\includes\SpiceAttachments\SpiceAttachments;

/**
 * Class MailboxesRESTHandler
 * Handles the REST requests for the mailbox module
 */
class MailboxesRESTHandler {
    private $db;

    function __construct() {
        $db = DBManagerFactory::getInstance();
        $this->db = $db;
    }

    /**
     * testConnection
     *
     * Tests connection to mail servers
     *
     * @param array $params
     * @return array
     */
    public function testConnection(array $params) {
        if ($params['mailbox_id'] == null) {
            return [
                'result' => false,
                'errors' => 'No mailbox selected',
            ];
        }
        if ($params['test_email'] == null) {
            return [
                'result' => false,
                'errors' => 'No test email selected',
            ];
        }
        if (!filter_var($params['test_email'], FILTER_VALIDATE_EMAIL)) {
            return [
                'result' => false,
                'errors' => $params['test_email'] . ' is not a valid email address.',
            ];
        }
        $result = false;

        $mailbox = BeanFactory::getBean('Mailboxes', $params['mailbox_id']);

        if ($mailbox->initTransportHandler()) {
            $result = $mailbox->transport_handler->testConnection($params['test_email']);
        }

        return $result;
    }

    /**
     * getMailboxFolders
     *
     * Returns the mailbox folders
     *
     * @param array $params
     * @return array
     */
    public function getMailboxFolders(array $params) {
        $mailbox = BeanFactory::getBean('Mailboxes', $params['mailbox_id']);
        $mailbox->initTransportHandler();

        $result = $mailbox->transport_handler->getMailboxes();

        return $result;
    }

    /**
     * getMailboxProcessors
     *
     * Returns a list of all Mailbox Processors
     *
     * @return array
     */
    public function getMailboxProcessors() {
        return [
            'result' => true,
            'processors' => MailboxProcessor::all(),
        ];
    }

    /**
     * fetchEmails
     *
     * Fetches emails from a particular mailbox
     *
     * @param array $params
     * @return array
     */
    public function fetchEmails($id) {
        $mailbox = BeanFactory::getBean('Mailboxes', $id);

        if ($mailbox->active == false) {
            return [
                'result' => 'true',
                'message' => 'Emails were not fetched. Mailbox inactive.',
            ];
        }

        $mailbox->initTransportHandler();

        $result = $mailbox->transport_handler->fetchEmails();

        return $result;
    }

    /**
     * getMailboxes
     *
     * Gets all mailboxes that are allowed for outbound communication
     *
     * @return array
     */
    public function getMailboxes($args) {
        $result = [];

        $where = '';
        switch ($args['scope']) {
            case 'inbound':
                $where = 'inbound_comm= 1';
                break;
            case 'outbound':
                $where = '(outbound_comm="single" OR outbound_comm="mass")';
                break;
            case 'outboundsingle':
                $where = 'outbound_comm="single"';
                break;
            case 'outboundmass':
                $where = 'outbound_comm="mass"';
                break;
        }

        $mailboxes = BeanFactory::getBean('Mailboxes')
            ->get_full_list(
                'mailboxes.name',
                $where
            );

        foreach ($mailboxes as $mailbox) {
            array_push($result,
                [
                    'value' => $mailbox->id,
                    'display' => $mailbox->name . ' <' . $mailbox->imap_pop3_username . '>',
                    'actionset' => $mailbox->actionset,
                ]
            );
        }

        return $result;
    }

    public function setDefaultMailbox($params) {
        try {
            $mailbox = BeanFactory::getBean('Mailboxes', $params['mailbox_id']);
            return $mailbox->setAsDefault();
        } catch (Exception $e) {
            return $e;
        }

    }

    /**
     * getMailboxesForDashlet
     *
     * Returns and array of Mailboxes with the number of read, unread and closed emails
     * to be used in the Mailboxes Dashlet in the UI.
     *
     * @return array
     */
    public function getMailboxesForDashlet() {
        $mailboxes = [];

        $sql = "SELECT ";
        $sql .= "mailboxes.id, ";
        $sql .= "mailboxes.name, ";
        $sql .= "sum(if(emails.status ='unread', 1, 0)) emailsunread, ";
        $sql .= "sum(if(emails.status ='read', 1, 0)) emailsread, ";
        $sql .= "sum(if(emails.status ='closed', 1, 0)) emailsclosed ";
        $sql .= "FROM mailboxes LEFT JOIN emails ON mailboxes.id=emails.mailbox_id ";
        $sql .= "WHERE mailboxes.deleted = 0 ";
        $sql .= "AND mailboxes.inbound_comm = 1 ";
        $sql .= "AND mailboxes.active = 1 ";
        $sql .= "GROUP BY mailboxes.id ";
        $sql .= "ORDER BY emailsunread DESC ";

        $res = $this->db->query($sql);

        while ($row = $this->db->fetchByAssoc($res)) {
            $mailboxes[] = $row;
        }

        return $mailboxes;
    }

    private function handleGmailAttachments(Email $email, $attachments) {
        $result = [];
        foreach ($attachments as $attachment) {
            $result[] = SpiceAttachments::saveEmailAttachmentFromGmail('Emails', $email->message_id, $attachment);
        }
        return $result;
    }

    private function emailBeanPairExists($email_id, $bean_id) {
        $db = DBManagerFactory::getInstance();

        $query = "SELECT 1 FROM emails_beans WHERE email_id = '" . $email_id . "' AND bean_id = '" . $bean_id . "'";
        $result = $db->limitQuery($query, 0, 1);
        return $result->num_rows !== 0;

    }
}
