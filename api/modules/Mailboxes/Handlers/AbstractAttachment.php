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



namespace SpiceCRM\modules\Mailboxes\Handlers;

use Exception;

abstract class AbstractAttachment
{
    public $filename;
    public $filesize;
    public $filemd5;
    public $mime_type;
    public $content;

    const ATTACHMENT_DIR = "upload://";

    /**
     * saveFile
     *
     * Saves the attachment in the file system
     */
    public function saveFile() {
        if (!is_writable(self::ATTACHMENT_DIR)) {
            throw new Exception(self::ATTACHMENT_DIR . ' is not writable.');
        }

        file_put_contents(self::ATTACHMENT_DIR . $this->filename, $this->content);

        if(file_exists(self::ATTACHMENT_DIR . $this->filename)) {
            $this->initMD5();

            rename(self::ATTACHMENT_DIR . $this->filename,
                self::ATTACHMENT_DIR . $this->filemd5);

            $this->initFilesize();
        }
    }

    /**
     * initMd5
     *
     * Initializes the md5 attribute.
     */
    protected function initMd5() {
        $this->filemd5 = md5_file(self::ATTACHMENT_DIR . $this->filename);
    }

    /**
     * initFilesize
     *
     * Initializes the file size attribute.
     */
    protected function initFilesize() {
        $this->filesize = filesize(self::ATTACHMENT_DIR . $this->filemd5);
    }
}
