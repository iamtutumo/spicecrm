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

use SpiceCRM\includes\SpiceDictionary\SpiceDictionaryHandler;

SpiceDictionaryHandler::getInstance()->dictionary['spicesubscriptions'] = [
    'table'  => 'spicesubscriptions',
    'fields' => [
        'user_id'     => [
            'name' => 'user_id',
            'type' => 'id',
            'len'  => '36',
            'required' => true
        ],
        'bean_id'     => [
            'name' => 'bean_id',
            'type' => 'id',
            'len'  => '36',
            'required' => true
        ],
        'bean_module' => [
            'name'    => 'bean_module',
            'type'    => 'varchar',
            'len'     => '255',
            'comment' => 'The name of the bean module',
            'required' => true
        ],
    ],
    'indices' => [
        [
            'name'   => 'spicesubscriptions_pk',
            'type'   => 'unique',
            'fields' => ['user_id', 'bean_id'],
        ]
    ],
];
