/**
 * @module WorkbenchModule
 */
import {
    Component
} from '@angular/core';
import {Subject} from 'rxjs';

import {modelutilities} from '../../services/modelutilities.service';
import {backend} from '../../services/backend.service';
import {broadcast} from '../../services/broadcast.service';
import {toast} from '../../services/toast.service';
import {metadata} from '../../services/metadata.service';
import {language} from '../../services/language.service';
import {configurationService} from '../../services/configuration.service';
import {modal} from '../../services/modal.service';
import {view} from "../../services/view.service";

@Component({
    selector: 'actionset-manager',
    templateUrl: '../templates/actionsetmanager.html',
    providers: [view]
})
export class ActionsetManager {

    public edit_mode: string = "custom";
    public allowBarButtons: boolean = true;
    public crNoneActive: boolean = false;

    public change_request_required: boolean = false;

    public sysModules: any = [];
    public currentModule: string = '*';
    public currentActionSet: any = {
        id: '',
        module: '',
        name: '',
        package: '',
        type: '',
        actions: [],
        isnew: false
    };

    public actionSetBackup = "";

    // public currentActionSetItems: Array<any> = [];
    public selectedItem: any = null;

    public selectedItemID = "";

    public showActionSetDetails: boolean = false;

    constructor(public backend: backend,
                public metadata: metadata,
                public language: language,
                public modelutilities: modelutilities,
                public broadcast: broadcast,
                public toast: toast,
                public modalservice: modal,
                public configurationService: configurationService,
                public view: view,
                public modal: modal) {

        this.backend.getRequest('system/spiceui/admin/modules').subscribe(modules => {
            this.sysModules = modules;
        });
        this.checkMode();
    }

    /**
     *
     * @param type (global, custom) string
     *
     * get all actionsets for the current module and type(global, custom)
     */
    public getActionSets(type = null) {
        let retArray = [];
        if (!type) {
            retArray = this.metadata.getActionSets(this.currentModule);
        } else {
            let actionsets = this.metadata.getActionSets(this.currentModule);
            for (let actionset of actionsets) {
                if (actionset.type == type) {
                    retArray.push(actionset);
                }
            }
        }
        return retArray;
    }

    // check edit mode
    public checkMode() {
        this.edit_mode = this.configurationService.getCapabilityConfig('core').edit_mode;
        this.change_request_required = this.configurationService.getCapabilityConfig('systemdeployment').change_request_required ? true : false;

        if (!(this.edit_mode == 'none' || this.edit_mode == 'custom' || this.edit_mode == 'all')) {
            this.edit_mode = 'custom';
        }

        if (this.change_request_required) {
            this.backend.getRequest('module/SystemDeploymentCRs/active').subscribe(crresponse => {
                if (crresponse.id == "") {
                    this.setNoneMode();
                    this.crNoneActive = true;
                    this.toast.sendToast(this.language.getLabel('LBL_ACTIVATE_CR_WARNING'), 'warning', null, 3);
                } else {
                    this.crNoneActive = false;
                    if (this.edit_mode == "all") {
                        this.setAllMode();
                    } else if (this.edit_mode == "custom") {
                        this.setCustomMode();
                    } else {
                        this.setNoneMode();
                    }
                }
            });
        } else {
            this.crNoneActive = false;
            if (this.edit_mode == "all") {
                this.setAllMode();
            } else if (this.edit_mode == "custom") {
                this.setCustomMode();
            } else {
                this.setNoneMode();
            }
        }
    }

    public setNoneMode() {
        this.view.setViewMode();
        this.allowBarButtons = false;
    }

    public setCustomMode() {
        if (this.currentActionSet.type == "custom") {
            this.view.setEditMode();
        } else {
            this.view.setViewMode();
        }
    }

    public setAllMode() {
        this.view.setEditMode();
    }

    get checkForChanges() {
        return this.checkForChangesFunction();
    }

    public checkForChangesFunction() {
        if(this.currentActionSet.id != "") {
            this.checkMode();
            return JSON.stringify(this.currentActionSet) == this.actionSetBackup ? false: true;
        } else {
            return false;
        }
    }

    public selectCurrentActionset() {
        if(this.currentActionSet.id) {
            let newID = this.currentActionSet.id;
            if(this.actionSetBackup != "") {
                // set it back to the old id .. for the dirty-field check
                this.currentActionSet.id = JSON.parse(this.actionSetBackup).id;
                JSON.stringify(this.actionSetBackup);
                if(this.checkForChangesFunction()) {
                    this.modal.confirm(  'LBL_ALL_CHANGES_WOULD_BE_DELETED.', 'LBL_ARE_YOU_SURE' ).subscribe( ( answer ) => {
                        if(answer) {
                            this.deleteChanges();
                            this.loadCurrentActionset(newID);
                        }
                    });
                } else {
                    this.loadCurrentActionset(newID);
                }
            } else {
                this.loadCurrentActionset(newID);
            }
        }
    }

    /**
     * @param newID string
     *
     * selected an actionset
     */
    public loadCurrentActionset(newID) {
        this.selectedItem = null;
        this.checkMode();
        this.currentActionSet = this.metadata.getActionSet(newID);
        this.actionSetBackup = JSON.stringify({...this.currentActionSet});
        // this.addActionSetItems(this.currentActionSet.id, this.currentActionSet.type);
        if(this.currentActionSet) {
            if (this.currentActionSet.actions) {
                if (this.currentActionSet.actions.length > 0) {
                    this.selectItem(this.currentActionSet.actions[0]);
                }
            }
        }
    }


    /**
     *
     * Add a new actionsetitem
     */
    public addActionsetItem() {
        let currentActionSetItem = {
            // actionset: this.currentActionSet,
            action: "NEW",
            component: null,
            id: this.modelutilities.generateGuid(),
            sequence: this.currentActionSet.actions.length,
            singlebutton: false,
            package: this.currentActionSet.package,
            version: this.currentActionSet.version,
            actionconfig: {},
            parentScope: this.currentActionSet.type
        };
        this.currentActionSet.actions.push(currentActionSetItem);

        this.metadata.setActionSetItems(this.currentActionSet.id, this.currentActionSet.actions);
        this.selectItem(currentActionSetItem);
    }
    public deleteItem(item) {
        this.modal.confirm( 'LBL_ARE_YOU_SURE', 'LBL_REMOVE_ITEM' ).subscribe( ( answer ) => {
            if(answer) {
                this.currentActionSet.actions.splice(
                    this.currentActionSet.actions.map(e => {
                        return e.id;
                    }).indexOf(item.id), 1);
            }
        });
    }

    /**
     *
     * Add a new actionset
     */
    public addActionset() {
        this.modalservice.openModal('ActionsetManagerAddDialog').subscribe(modal => {

            modal.instance.sysModules = this.sysModules;
            modal.instance.actionsetModule = this.currentModule;
            modal.instance.mode = 'add';
            modal.instance.edit_mode = this.edit_mode;
            modal.instance.actionsetName="";

            modal.instance.closedialog.subscribe(added => {
                if (added) {
                    let newId =  this.modelutilities.generateGuid();
                    this.currentActionSet.actions = [];
                    this.metadata.setActionSet(newId, {
                        module: added.module,
                        name: added.name,
                        type: added.type,
                        actions: this.currentActionSet.actions
                    });

                    this.reset();
                    this.currentModule = added.module;

                    this.currentActionSet.id = newId;
                    this.currentActionSet.module = added.module;
                    this.currentActionSet.name = added.name;
                    this.currentActionSet.type = added.type;
                    this.currentActionSet.actions = [];
                    this.currentActionSet.package = '';
                    this.currentActionSet.isnew = true;
                }
            });
        });
    }

    /**
     *
     * Selected a module
     * Check if any changes are active
     */
    public selectModule() {
        let newModule = this.currentActionSet.module;
        if(this.actionSetBackup != "") {
            // set it back to the old id .. for the dirty-field check
            this.currentActionSet.module = JSON.parse(this.actionSetBackup).module;
            JSON.stringify(this.actionSetBackup);
            if(this.checkForChangesFunction()) {
                this.modal.confirm(  'LBL_ALL_CHANGES_WOULD_BE_DELETED.', 'LBL_ARE_YOU_SURE' ).subscribe( ( answer ) => {
                    if(answer) {
                        this.deleteChanges();
                        this.currentActionSet.module = newModule;
                    }
                });
            } else {
                this.currentActionSet.module = newModule;
            }
        } else {
            this.currentActionSet.module = newModule;
        }
    }

    /**
     * reset the current data
     */
    public reset() {
        this.currentActionSet = {
            id: '',
            module: '',
            name: '',
            package: '',
            type: '',
            actions: []
        };
        this.selectedItem = null;
        this.selectedItemID = "";
    }

    /**#
     * @param item object
     *
     * get the label of the item
     */
    public getDisplayName(item) {
        let name = item.action ? item.action: item.component;
        return item.actionconfig.label ? name + " (" + this.language.getLabel(item.actionconfig.label) + ")":  name;
    }

    /**#
     * check if id is selected
     * return bool
     */
    public isSelected(id) {
        return id == this.selectedItem.id;
    }

    public selectItem(currentActionSetItem) {
        this.selectedItemID = currentActionSetItem.id;
        for (let item of this.currentActionSet.actions) {
            if(item.id == currentActionSetItem.id) {
                this.selectedItem = item;
            }
        }
    }

    /**
     * handles the drop event and rearranges the array
     * @param event
     */
    public drop(event) {
        this.currentActionSet.actions.splice(event.currentIndex, 0, this.currentActionSet.actions.splice(event.previousIndex, 1)[0]);

        // rebuild the sequence
        let i = 0;
        for(let actionitem of this.currentActionSet.actions){
            actionitem.sequence = i;
            i++;
        }
    }

    public deleteChanges() {
        if(this.currentActionSet.isnew) {
            this.metadata.removeActionset(this.currentActionSet.id);
            this.reset();
            this.actionSetBackup = "";
        } else {
            this.currentActionSet = {...JSON.parse(this.actionSetBackup)};
            this.metadata.setActionSet(this.currentActionSet.id, this.currentActionSet);
            // this.currentActionSet = this.metadata.getActionSet(this.currentActionSet.id);
            if(this.currentActionSet.actions.length > 0) {
                this.selectItem(this.currentActionSet.actions[0]);
            }
        }
    }

    public saveChanges() {

        this.modal.openModal('SystemLoadingModal').subscribe(loadingModalRef => {

            let addedActionsets: any = {};
            let changedActionsets: any = {};
            let deletedActionsets: any = {};

            if(this.currentActionSet.isnew) {
                addedActionsets[this.currentActionSet.id] = this.currentActionSet;
            }
            if(!this.currentActionSet.isnew) {
                changedActionsets[this.currentActionSet.id] = this.currentActionSet;
            }

            let postData = {
                add: addedActionsets,
                update: changedActionsets,
                delete: deletedActionsets
            };

            this.backend.postRequest('configuration/spiceui/core/actionsets', {}, postData).subscribe((res: any) => {
                if(res) {
                    this.broadcast.broadcastMessage('metadata.updateactionsets', postData);
                    loadingModalRef.instance.self.destroy();
                    this.toast.sendToast('changes saved');
                    this.loadCurrentActionset(this.currentActionSet.id);
                } else {
                    loadingModalRef.instance.self.destroy();
                    this.toast.sendToast(this.language.getLabel('ERR_FAILED_TO_EXECUTE'), 'error');
                }
            });

        });
    }

    public copy() {
        this.modalservice.openModal('ActionsetManagerAddDialog').subscribe(modal => {

            modal.instance.sysModules = this.sysModules;
            modal.instance.actionsetModule = this.currentModule;
            modal.instance.mode = "copy";
            modal.instance.edit_mode = this.edit_mode;
            modal.instance.actionsetName = this.currentActionSet.name + ' (custom)';

            modal.instance.closedialog.subscribe(added => {
                if (added) {
                    let newId =  this.modelutilities.generateGuid();
                    // this.metadata.addActionset(newId, added.module, added.name, added.type, []);

                    let actions = JSON.parse(JSON.stringify(this.currentActionSet.actions));
                    this.metadata.setActionSet(newId, {
                        module: added.module,
                        name: added.name,
                        type: added.type,
                        actions: actions
                    });

                    // generate new ids for every action
                    for (let action of actions) {
                        action.id = this.modelutilities.generateGuid();
                    }

                    this.reset();
                    this.currentModule = added.module;

                    this.currentActionSet.id = newId;
                    this.currentActionSet.module = added.module;
                    this.currentActionSet.name = added.name;
                    this.currentActionSet.type = added.type;
                    this.currentActionSet.actions = actions;
                    // this.currentActionSet.package = this.currentActionSet.package;
                    this.currentActionSet.isnew = true;
                    this.view.setEditMode();
                }
            });
        });
    }
}
