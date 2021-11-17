/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

/**
 * @module ModuleEmails
 */
import {Component, EventEmitter, OnInit} from '@angular/core';
import {model} from '../../../services/model.service';
import {modal} from '../../../services/modal.service';
import {toast} from '../../../services/toast.service';
import {backend} from "../../../services/backend.service";


/**
 * a modal window to allow picking email addresses found for the parent bean of an email and add to the email address fields
 */
@Component({
    selector: 'email-parent-addresses-modal',
    templateUrl: './src/modules/emails/templates/emailparentaddressesmodal.html'
})
export class EmailParentAddressesModal implements OnInit {

    /**
     * reference to the modal self
     *
     * @private
     */
    private self: any;

    /**
     * the loadedaddresses
     *
     * @private
     */
    private addresses: any[] = [];

    /**
     * an eent emitter for the selected addresses
     *
     * @private
     */
    private addAddresses: EventEmitter<any[]> = new EventEmitter<any[]>();

    constructor(
        public model: model,
        public modal: modal,
        public toast: toast,
        private backend: backend
    ) {

    }

    /**
     * load the parent email addresses
     */
    public ngOnInit() {
        let await = this.modal.await('LBL_LOADING');
        this.backend.getRequest(`module/EmailAddresses/${this.model.getField('parent_type')}/${this.model.getField('parent_id')}`).subscribe(
            addresses => {
                this.addresses = addresses;
                if (this.addresses.length == 0) {
                    this.toast.sendToast('LBL_NO_EMAILADDRESSES_FOUND', 'info');
                    this.close();
                }
                await.emit(true);
            },
            () => {
                this.toast.sendToast('LBL_SYSTEM_ERROR', 'error');
                await.emit(true);
                this.close();
            }
        );
    }

    /**
     * a getter that cheks that at least ine email address is selected
     */
    get canAdd() {
        return this.addresses.filter(a => a.selected).length > 0;
    }

    /**
     * adds the selected email addresses
     *
     * @private
     */
    private add() {
        this.addAddresses.emit(this.addresses.filter(a => a.selected));
        this.close();
    }

    /**
     * closes the modal
     *
     * @private
     */
    private close() {
        this.self.destroy();
    }

}
