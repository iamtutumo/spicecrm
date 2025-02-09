/**
 * @module services
 */
import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, of, BehaviorSubject, Subscription} from 'rxjs';
import {backend} from './backend.service';
import {userpreferences} from './userpreferences.service';
import {language} from './language.service';
import {metadata} from "./metadata.service";
import {broadcast} from "./broadcast.service";
import {session} from "./session.service";
import {configurationService} from "./configuration.service";
import {toast} from "./toast.service";
import {BucketsI, geoSearch, listDataI, ListTypeI, relateFilter} from "./interfaces.service";

/**
 * @ignore
 */
declare var moment: any;
declare var _: any;

@Injectable()
export class modellist implements OnDestroy {
    /**
     * reference id will be sent with each backend request to enable canceling the pending requests
     */
    public httpRequestsRefID: string = _.uniqueId('model_list_http_ref_');

    /**
     * the module the list is for
     */
    public module: string = '';

    /**
     * an optional modulefilter
     */
    public modulefilter: string;

    /**
     * a relatefilter
     */
    public relatefilter: relateFilter;

    /**
     * a behavioural subject to catch the list data loads
     */
    public listDataChanged$: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * an optional bean for modulefilter (parent-bean over the list)
     * is given to the custom filter methods
     */
    public filtercontextbeanid: string;

    /**
     * event emitter for the list type to catch changes in other components
     */
    public listType$: BehaviorSubject<ListTypeI>;

    /**
     * event emitter for the list type to catch changes in other components
     */
    public listTypeComponent$: EventEmitter<string> = new EventEmitter<string>();

    /**
     * the list data
     */
    public listData: listDataI = {
        list: [],
        totalcount: 0
    };
    /**
     * holds the data loading offset
     */
    public offset: number = 0;

    /**
     * the selected items
     */
    public listSelected: any = {
        type: '',
        items: []
    };

    /**
     * emits when the selection of the list has been changed via select all .. to trigger chanmge detection on the components
     */
    public selectionChanged$: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * holds an array of fields and direction for multidimensional sorting
     */
    public sortArray: any[] = [];

    /**
     * keeps the last loaded date
     */
    public lastLoad: any = new moment();

    /**
     * the limit for loading the list
     */
    public loadlimit: number = 50;

    /**
     * an indicator that the list is loading
     */
    public isLoading: boolean = false;

    /**
     * a helper to either enable/disable cancellation of pending requests
     * aim: more flexibility on first load
     */
    public cancelPendingRequests: boolean = true;

    /**
     * the search term
     */
    public searchTerm: string = '';

    /**
     * holds the aggregates for the module
     */
    public moduleAggregates: any[] = [];

    /**
     * holds the aggregates for the module
     */
    public moduleAggregatesByFieldname: any = {};

    /**
     * the set search aggregates as returned by the search
     */
    public searchAggregates: any;

    /**
     * the aggregate values the user selected
     */
    public selectedAggregates: string[] = [];

    /**
     * a timeout to handle aggregate changes
     *
     * @private
     */
    private reloadTimeOut: any = undefined;

    /**
     * holds changed aggergates to allow multiple changes at once
     */
    public changedAggregates: any = {
        added: [],
        deleted:[]
    }

    /**
     * search geo data
     */
    public searchGeo: geoSearch;

    /**
     * for the bucketed views
     */
    public buckets: BucketsI = {};

    /**
     * set to true if the data when retrieved should be cached in the session
     */
    public useCache: boolean = true;

    /**
     * the default lists any module has
     */
    public standardLists: ListTypeI[] = [];

    /**
     * the current seletced list
     */
    public currentList: ListTypeI;

    /**
     * any other service that is subscribed .. to ensure we unsubscribe on destroy
     */
    public serviceSubscriptions = new Subscription();

    /**
     * to help navigation set to display the aggregates
     */
    public displayAggregates: boolean = false;

    /**
     * to help navigation set to display the filters
     */
    public displayFilters: boolean = false;

    /**
     * holds the listfields .. supports the regular list service where fields can be selected
     */
    public _listfields: any[] = [];

    /**
     * an emitter when the listfields have been updated
     */
    public listfield$: EventEmitter<any> = new EventEmitter<any>();
    /**
     * holds the embedded by component name
     * @private
     */
    public embeddedByComponent: string;
    /**
     * holds the default value for disable autoload boolean from the spice config
     */
    public disableAutoloadListAll: boolean = false;

    constructor(
        public broadcast: broadcast,
        public backend: backend,
        public metadata: metadata,
        public language: language,
        public userpreferences: userpreferences,
        public session: session,
        public configuration: configurationService,
        public toast: toast
    ) {
        this.setDisableAutoloadListAll();
        this.subscribeToBroadcast();
        this.generateStandardLists();
        this.listType$ = new BehaviorSubject<ListTypeI>(this.standardLists[0]);
    }

    /**
     * subscribe to broadcast service
     * @private
     */
    public subscribeToBroadcast() {
        this.serviceSubscriptions.add(
            this.broadcast.message$.subscribe(message => {
                this.handleMessage(message);
            })
        );
    }

    /**
     * set the default value for dsiabled autoload boolean from the spice config
     * @private
     */
    public setDisableAutoloadListAll() {
        this.disableAutoloadListAll = !!this.configuration.getCapabilityConfig('module').disableAutoloadListAll;
    }

    /**
     * trigger the key aspects that need to happen when the module is changed
     *
     * @param module the module
     * @param embeddedByComponent
     */
    public initialize(module: string, embeddedByComponent?: string) {

        this.module = module;

        this.generateStandardLists();

        this.embeddedByComponent = embeddedByComponent;

        // reset the list data
        this.resetListData();

        this.loadModuleAggregates();

        // set the current list type from user preferences or "all" by default
        let listId = 'all';

        let modulepreferences = this.userpreferences.getPreference(module);
        if (modulepreferences?.lastListTypeId && this.listTypeExists(modulepreferences.lastListTypeId)) {
            listId = modulepreferences.lastListTypeId;
        }
        this.setListType(listId, false);
    }

    /**
     * loads the module aggregates
     * @private
     */
    public loadModuleAggregates() {
        this.moduleAggregates = [];
        for (let moduleAggregate of this.metadata.getModuleAggregates(this.module)) {
            this.moduleAggregates.push({...moduleAggregate});
        }
        this.moduleAggregates.forEach( item => this.moduleAggregatesByFieldname[item.fieldname] = item );
        this.moduleAggregates.sort((a, b) => {
            if (!a.priority && !b.priority) return 0;
            return (!a.priority || a.priority > b.priority) ? 1 : -1;
        });
    }


    /**
     * handles model updates
     *
     * @param message
     */
    public handleMessage(message: any) {
        // only handle if the module is the list module
        if (message.messagedata.module !== this.module) {
            return;
        }

        switch (message.messagetype) {
            case 'model.delete':
                let deletedItemIndex = this.listData.list.findIndex(item => item.id == message.messagedata.id);
                if (deletedItemIndex >= 0) {
                    this.listData.list.splice(deletedItemIndex, 1);
                    this.listData.totalcount--;

                    // analyse if we need to update the buckets
                    if (this.bucketfield) {
                        let bucketamountfields = [];

                        if (this.bucketamountfield) {
                            for (let bucketamountfield of this.bucketamountfield) {
                                bucketamountfields.push({
                                    fieldname: bucketamountfield.name,
                                    value: message.messagedata.data[bucketamountfield.name],
                                });
                            }
                        }

                        this.removeItemFromBucket(message.messagedata.data[this.bucketfield], bucketamountfields);
                    }
                    this.listDataChanged$.next(true);
                }

                break;
            case 'model.save':
                let savedItemIndex = this.listData.list.findIndex(item => item.id == message.messagedata.id);
                if (savedItemIndex >= 0) {
                    // keep the selection status even id we are updating
                    let selected = this.listData.list[savedItemIndex].selected;

                    // update the data
                    this.listData.list[savedItemIndex] = message.messagedata.data;

                    // if the record was selected before select it again
                    if (selected) this.listData.list[savedItemIndex].selected = true;

                    // analyse if we need to update the buckets
                    if (this.bucketfield) {
                        if (message.messagedata.changed && message.messagedata.changed[this.bucketfield]) {
                            // update the bucket and if an amount is set snd in also the changed amount

                            let bucketamountfields = [];
                            for (let bucketamountfield of this.bucketamountfield) {
                                bucketamountfields.push({
                                    fieldname: bucketamountfield.name,
                                    valuefrom: message.messagedata.backupdata[bucketamountfield.name],
                                    valueto: message.messagedata.data[bucketamountfield.name],
                                });
                            }

                            this.updateBuckets(
                                message.messagedata.backupdata[this.bucketfield],
                                message.messagedata.data[this.bucketfield],
                                bucketamountfields
                            );
                        } else if (this.bucketamountfield) {
                            // just update the amount fields
                            let bucket = this.buckets.bucketitems.find(bucket => bucket.bucket == message.messagedata.data[this.bucketfield]);
                            for (let bucketamountfield of this.bucketamountfield) {
                                if (message.messagedata.changed && message.messagedata.changed[bucketamountfield.name]) {
                                    bucket.values['_bucket_agg_' + bucketamountfield.name] += message.messagedata.data[bucketamountfield.name] - message.messagedata.backupdata[bucketamountfield.name];
                                }
                            }

                        }
                        this.listDataChanged$.next(true);
                    }

                } else {
                    this.reLoadList();
                }
                break;
        }
    }

    /**
     * unsubscribe from subscriptions
     */
    public ngOnDestroy() {
        this.serviceSubscriptions.unsubscribe();
        this.backend.cancelPendingRequests([
            this.httpRequestsRefID,
            this.httpRequestsRefID + '_get_list_data'
        ]);
    }

    /**
     * sets a field as sort criteria
     *
     * @param field the field
     * @param sortDirection optional the sort direction
     * @param reload an indicator if the list shoudl reload automatically
     */
    public setSortField(field: string, sortDirection?: 'ASC' | 'DESC', reload = true) {
        // check that a field is set and that the list is not right now loading
        if (!field || this.isLoading) return;

        // find the field we are sorting an and if found handle the sort
        let sortItemIndex = this.sortArray.findIndex(item => item.sortfield == field);
        if (sortItemIndex >= 0) {
            let sortItem = this.sortArray[sortItemIndex];
            if (sortItem.sortdirection == 'ASC') {
                sortItem.sortdirection = 'DESC';
            } else {
                this.sortArray.splice(sortItemIndex, 1);
            }
        } else {
            this.sortArray.push({
                sortfield: field,
                sortdirection: sortDirection ? sortDirection : 'ASC'
            });
        }
    }

    /**
     * returns the sort par<mater for a specific field if it is a current sort criteria
     * @param field
     */
    public getSortField(field) {
        let sortItemIndex = this.sortArray.findIndex(item => item.sortfield == field);
        if (sortItemIndex >= 0) {
            let sortItem = this.sortArray[sortItemIndex];
            return {
                sortdirection: sortItem.sortdirection,
                sortindex: sortItemIndex,
                sortitems: this.sortArray.length
            };
        }

        return false;
    }

    /**
     * returns an array of sort fields to be displays
     */
    public getSortFields() {
        let sortfields = [];
        for (let sortitem of this.sortArray) {
            sortfields.push(this.language.getFieldDisplayName(this.module, sortitem.sortfield));
        }
        return sortfields.join(', ');
    }

    /**
     * simplegetter that returns if there are sort fields set
     */
    get isSorted() {
        return this.sortArray.length > 0;
    }

    public addCustomListType(listTypeData): void {
        this.metadata.addModuleListType(this.module, listTypeData);
    }

    /**
     * checks if the listtype exists
     *
     * @param listType
     */
    public listTypeExists(listType: string) {
        return !!this.getListTypes().find(lt => lt.id == listType);
    }

    /**
     * sets the listtype and also sets it to the preferences
     *
     * @param listTypeId
     * @param setPreference
     * @param sortArray
     */
    public setListType(listTypeId: string, setPreference = true, sortArray = []): void {

        if (listTypeId == this.currentList?.id) {
            return;
        }

        const previousListComponent = this.currentList?.listcomponent;

        // close filters and aggregates if they are being displayed
        this.displayAggregates = false;
        this.displayFilters = false;

        this.currentList = this.getListTypes().find(type => type.id === listTypeId);

        if (!this.currentList) {
            return;
        }

        this.determineListFields();

        // set the user preferences
        if (setPreference) {
            let modulepreferences = this.userpreferences.getPreference(this.module);
            if (!modulepreferences) {
                modulepreferences = {};
            }
            modulepreferences.lastListTypeId = listTypeId;
            this.userpreferences.setPreference(this.module, modulepreferences);
        }

        // set the aggregates
        if (this.currentList.aggregates) {
            this.selectedAggregates = JSON.parse(atob(this.currentList.aggregates));
        } else {
            this.selectedAggregates = [];
        }

        if (this.currentList.sortfields) {
            this.sortArray = JSON.parse(atob(this.currentList.sortfields));
        } else {
            this.sortArray = sortArray;
        }

        this.emitListTypeChange();

        if (this.currentList.listcomponent != previousListComponent) {
            this.emitListTypeComponentChange();
        }
    }


    /**
     * build the listfields based on the listtype
     */
    public determineListFields() {
        this._listfields = [];

        // check if we have fielddefs
        let fielddefs = this.getFieldDefs();

        // if the service is embedded in a specific component then load the list fields for that component
        const component = this.embeddedByComponent || this.currentList.listcomponent;

        // load all fields from the selected component configs
        let componentconfig = this.metadata.getComponentConfig(component, this.module);
        let allFields = this.metadata.getFieldSetFields(componentconfig.fieldset);
        for (let listField of allFields) {
            // check if we have the field in the defs
            let fielddef = fielddefs ? fielddefs.find(fd => fd.id == listField.id) : undefined;
            if (fielddefs && fielddef) {
                this._listfields.push({
                    id: listField.id,
                    field: listField.field,
                    fieldconfig: listField.fieldconfig,
                    sort: fielddef.sort,
                    width: fielddef.width
                });
            } else if (!fielddefs && !listField.fieldconfig.hidden) {
                this._listfields.push({
                    id: listField.id,
                    field: listField.field,
                    fieldconfig: listField.fieldconfig
                });
            }
        }

        // sort listfields by fielddefs if we have them
        if (fielddefs) {
            this._listfields.sort((a, b) => fielddefs.findIndex(ai => ai.id == a.id) > fielddefs.findIndex(bi => bi.id == b.id) ? 1 : -1);
        }
    }


    /**
     * @returns true if the list with the given id is a standard list and compare with current list id if the id was not defined
     */
    public isCustomList(id?) {
        if (!id) {
            id = this.currentList.id;
        }
        return !this.standardLists.some(stdList => stdList.id == id);
    }

    /**
     * sets the defined listfields
     *
     * @param listfields
     */
    set listfields(listfields) {
        // set the listfields internally
        this._listfields = listfields;

        // check if we have an field in the sortarray that is no longer in the fieldlist
        /*
        if (this.sortArray.length > 0) {
            let i = 0;
            for (let i = 0; i++; i < this.sortArray.length) {
                if (!this._listfields.find(listfield => listfield.id == this.sortArray[i].sortfield)) {
                    this.sortArray.splice(i, 1);
                }
            }
        }
        */

        for (let i in this.sortArray) {
            if (!this._listfields.find(listfield => listfield.field == this.sortArray[i].sortfield)) {
                this.sortArray.splice(parseInt(i, 10), 1);
            }
        }

        // emit the change so all components are aware and can react
        this.listfield$.emit(this._listfields);
    }


    /**
     * get the defined listfields
     */
    get listfields() {
        return this._listfields;
    }


    /**
     * check if the current lst can be deleted
     *
     * ToDo: check if still needed
     */
    public canDelete(): boolean {
        try {
            return this.currentList.id != 'all' && this.currentList.id != 'owner';
        } catch (e) {
            return false;
        }
    }

    /**
     * returns true if the filters can be set and saved
     */
    public filterEnabled() {
        try {
            return this.currentList.id != 'all' && this.currentList.id != 'owner';
        } catch (e) {
            return false;
        }
    }

    /**
     * returns true if aggregates have been returned for the list and thus can be set
     */
    public aggregatesEnabled() {
        try {
            return this.searchAggregates && !_.isEmpty(this.searchAggregates) ? true : false;
        } catch (e) {
            return false;
        }
    }

    /**
     * save the list data in the configuration service
     */
    public setToSession() {

        if (!this.useCache) return;

        this.configuration.setData('lastlist' + this.module, JSON.stringify({
            listdata: this.listData,
            sortarray: this.sortArray,
            searchterm: this.searchTerm,
            searchaggregates: this.searchAggregates,
            selectedaggregates: this.selectedAggregates,
            buckets: this.buckets
        }));
    }

    /**
     * set use cache to true to tell the set method it should cache to session on destroy
     * load the list data from the configuration service
     */
    public loadFromSession(): boolean {
        if (!this.useCache) return false;

        let sessionData = JSON.parse(this.configuration.getData('lastlist' + this.module));
        if (!!sessionData && sessionData.buckets?.bucketfield == this.buckets?.bucketfield) {
            this.listData = sessionData.listdata;
            this.searchTerm = sessionData.searchterm;
            this.searchAggregates = sessionData.searchaggregates;
            this.selectedAggregates = sessionData.selectedaggregates;
            this.sortArray = sessionData.sortarray;
            this.buckets = sessionData.buckets;

            return true;
        } else {
            return false;
        }
    }

    public getGlobal(): boolean {
        return this.currentList.global == '1';
    }

    public getFieldDefs(): any[] {
        try {
            return JSON.parse(atob(this.currentList.fielddefs));
        } catch (e) {
            return undefined;
        }
    }

    /**
     * returns the filterdefs for the list type .. if not an empty filterdefs object
     */
    public getFilterDefs(): any {
        try {
            return JSON.parse(this.currentList.filterdefs);
        } catch (e) {
            return {
                logicaloperator: 'and',
                groupscope: 'all',
                conditions: []
            };
        }
    }

    /**
     * adds a new list type
     *
     * @param listParams
     */
    public addListType(listParams): Observable<boolean> {
        let retSub = new Subject<boolean>();
        this.backend.postRequest(
            "configuration/spiceui/core/modules/" + this.module + "/listtypes",
            {},
            JSON.stringify(listParams), this.httpRequestsRefID).subscribe((listTypeData: ListTypeI) => {
            this.addCustomListType(listTypeData);

            this.setListType(listTypeData.id);
            retSub.next(true);
            retSub.complete();
        });
        return retSub.asObservable();
    }

    /**
     * update a standard list component
     * @param id
     * @param component
     */
    public updateStandardListsComponent(id: string, component: string) {

        if (this.standardLists[0].listcomponent == component) {
            return;
        }
        this.standardLists.forEach((list: ListTypeI) => {
            list.listcomponent = component;
        });
        this.determineListFields();
        this.userpreferences.setPreference('defaultlisttype', component, true, this.module);
        this.emitListTypeComponentChange();
    }

    /**
     * update a list type component
     * @param component
     */
    public updateListTypeComponent(component: string) {

        if (this.currentList?.listcomponent == component) {
            return;
        }
        this.metadata.updateModuleListType(this.module, {
            id: this.currentList.id,
            listcomponent: component
        });
        this.currentList.listcomponent = component;
        this.determineListFields();
        this.emitListTypeComponentChange();
    }

    public emitListTypeComponentChange() {
        this.listTypeComponent$.next(this.currentList.listcomponent);
    }

    /**
     * update the list type on the backend
     *
     * @param listParams
     */
    public updateListType(listParams?): Observable<boolean> {
        let retSub = new Subject<boolean>();

        // initialize the list params if they are not set
        if (!listParams) {
            listParams = {};
        }

        const previousListComponent = this.currentList?.listcomponent;

        // set the aggregates
        listParams.aggregates = btoa(JSON.stringify(this.selectedAggregates));

        // set the sort data
        listParams.sortfields = btoa(JSON.stringify(this.sortArray));

        // set the list fields
        listParams.fielddefs = btoa(JSON.stringify(
            this.listfields.map(f => ({id: f.id, width: f.width}))
        ));

        // if the listcomponent was not updated
        if (!listParams.listcomponent) {
            listParams.listcomponent = this.currentList.listcomponent;
        }


        // post to the backend
        this.backend.postRequest(`configuration/spiceui/core/modules/${this.module}/listtypes/${this.currentList.id}`, {}, listParams, this.httpRequestsRefID).subscribe(listdata => {
            this.metadata.getModuleListTypes(this.module).some(item => {
                if (item.id == this.currentList.id) {

                    for (let key in listParams) {
                        if (listParams.hasOwnProperty(key)) {
                            item[key] = listParams[key];
                        }
                    }
                    this.currentList = item;
                    return true;
                }
            });
            listParams.id = this.currentList.id;
            this.metadata.updateModuleListType(this.module, listParams);
            this.emitListTypeChange();

            if (this.currentList.listcomponent != previousListComponent) {
                this.emitListTypeComponentChange();
            }
            // return message to Observable and complete it
            retSub.next(true);
            retSub.complete();
        });
        return retSub.asObservable();
    }

    /**
     * emit the current list type change
     * @private
     */
    public emitListTypeChange() {
        this.listType$.next(this.currentList);
    }


    /**
     * delete a listtype
     *
     * @param id
     */
    public deleteListType(id: string = '') {
        if (id === '') {
            id = this.currentList.id;
        }

        this.backend.deleteRequest("configuration/spiceui/core/modules/" + this.module + "/listtypes/" + id, null, this.httpRequestsRefID).subscribe({
            next: res => {

                // remove the deleted listtype from the current list
                this.metadata.deleteModuleListType(this.module, id);

                // set the new default listtype
                this.setListType('all');
            },
            error: error => {
                this.toast.sendToast(this.language.getLabel('LBL_ERROR'), 'error');
            }
        });
    }

    /**
     * returns the last load time in user format
     */
    public getLastLoadTime(): string {
        return this.lastLoad.format(this.userpreferences.getTimeFormat());
    }

    /**
     * schedules  reload if no further changes are set
     */
    public scheduleReloadList(){
        // cancel any ongoing search
        if (this.reloadTimeOut) {
            window.clearTimeout(this.reloadTimeOut);
            this.reloadTimeOut = undefined;
        }

        this.reloadTimeOut = window.setTimeout(() => {
            this.exceuteReload();
        }, 1000);
    }

    /**
     * checks if we have changes and if then execcutes the reload
     * @private
     */
    private exceuteReload(){
        if(this.changedAggregates.added.length > 0 || this.changedAggregates.deleted.length > 0){
            this.reLoadList();
        }
    }

    /**
     * reloads the last loaded list
     */
    public reLoadList(quiet: boolean = false) {
        if (this.isLoading) {
            const requestID = this.httpRequestsRefID + '_get_list_data';
            if(this.cancelPendingRequests) this.backend.cancelPendingRequests([requestID]);
            this.isLoading = false;
            return of(false);
        } else {
            // reset the changed data
            this.changedAggregates.added = [];
            this.changedAggregates.deleted = [];

            // execute the load
            return this.getListData(quiet);
        }
    }

    /**
     * resets the list data for a reload
     */
    public resetListData() {
        // reset buckets if there are any set
        if (this.buckets && this.buckets.bucketitems) {
            for (let bucketitem of this.buckets.bucketitems) {
                bucketitem.count = 0;
                // bucketitem.value = 0;
                bucketitem.items = 0;
            }
        }

        this.listData = {
            list: [],
            totalcount: 0
        };

        // emit that the data changed
        this.listDataChanged$.next(true);
    }

    /**
     * returns the listtypes
     *
     * @param base set to ture to include the standrad listtypes 'all' & 'owner'
     */
    public getListTypes(base: boolean = true): ListTypeI[] {
        if (base) {
            return this.standardLists.concat(this.metadata.getModuleListTypes(this.module));
        } else {
            return this.metadata.getModuleListTypes(this.module);
        }
    }

    /**
     * generate the standard lists
     * @private
     */
    public generateStandardLists() {
        this.standardLists = [
            {
                id: 'all',
                global: '1',
                name: `${this.language.getModuleCombinedLabel('LBL_ALL', this.module)}`,
                listcomponent: 'ObjectList'
            }
        ];

        // my items only if the module has an assigned user id field
        if (this.metadata.getFieldDefs(this.module, 'assigned_user_id')) {
            this.standardLists.push({
                id: 'owner',
                global: '1',
                name: `${this.language.getModuleCombinedLabel('LBL_MY', this.module)}`,
                listcomponent: 'ObjectList'
            });
        }
    }

    /**
     * a getter to check if the current search result has aggregates
     */
    get hasAggregates() {
        return this.selectedAggregates.length > 0;
    }

    /**
     * a getter to check if the current search result has non-system aggregates
     */
    get hasNonSysAggregates() {
        return this.selectedAggregates.some( item => {
            let fieldname = item.split('::',1)[0];
            if ( !this.moduleAggregatesByFieldname[fieldname]?.system ) return true;
        });
    }

    /**
     * Is a specific aggregate selected?
     */
    public hasAggregate( aggregate: string, aggdata: string ) {
        let searchFor = aggregate + '::' + aggdata;
        return this.selectedAggregates.some( item => item === searchFor );
    }

    /**
     * sets a set of aggdata to the aggregates
     *
     * @param aggregate
     * @param aggdata
     */
    public setAggregate(aggregate, aggdata) {
        this.selectedAggregates.push(aggregate + '::' + aggdata);

        // handle also that we record the changes
        let delIndex = this.changedAggregates.deleted.indexOf(aggregate + '::' + aggdata);
        if(delIndex >= 0){
            this.changedAggregates.deleted.splice(delIndex, 1);
        } else {
            this.changedAggregates.added.push(aggregate + '::' + aggdata);
        }
    }

    /**
     * checks if the field has selected aggregates and returns the number
     *
     * @param aggregatefield
     */
    public getCheckedAggregateCount(aggregatefield): number {
        return this.selectedAggregates.filter(item => item.indexOf(aggregatefield + '::') > -1).length;
    }

    /**
     * checks if the aggregate is set
     *
     * @param aggregate
     * @param aggdata
     */
    public checkAggregate(aggregate, aggdata) {
        return this.selectedAggregates.indexOf(aggregate + '::' + aggdata.trim()) > -1;
    }

    /**
     * removes an aggregate from the set
     *
     * @param aggregate
     * @param aggdata
     */
    public removeAggregate(aggregate, aggdata) {
        let index = this.selectedAggregates.indexOf(aggregate + '::' + aggdata);
        if (index < 0) {
            return false;
        }
        this.selectedAggregates.splice(index, 1);

        // record the changes
        let addIndex = this.changedAggregates.added.indexOf(aggregate + '::' + aggdata);
        if(addIndex >= 0){
            this.changedAggregates.added.splice(addIndex, 1);
        } else {
            this.changedAggregates.deleted.push(aggregate + '::' + aggdata);
        }

        // return true
        return true;
    }

    /**
     * checks if an aggregate can be changed or changed reords for another aggregate are existing
     *
     * @param aggregate
     */
    public canChangeAggegate(aggregate){
        if(this.changedAggregates.added.length == 0 && this.changedAggregates.deleted.length == 0) return true;

        if(this.changedAggregates.added.filter(a => a.indexOf(aggregate + '::') != 0).length > 0) return false;
        if(this.changedAggregates.deleted.filter(a => a.indexOf(aggregate + '::') != 0).length > 0) return false;

        return true;
    }

    /**
     * clears all set aggregates
     */
    public removeAllAggregates( keepSystemAggregates = false ) {
        if ( !keepSystemAggregates ) this.selectedAggregates = [];
        else {
            this.selectedAggregates = this.selectedAggregates.filter( item => {
                let fieldname = item.split('::',1)[0];
                return !!this.moduleAggregatesByFieldname[fieldname]?.system;
            });
        }
    }

    /**
     * Clears all set aggregates for a specific field.
     */
    public removeAggregatesOfField( fieldname: string ) {
        // Keep only all for other fields selected aggregates:
        this.selectedAggregates = this.selectedAggregates.filter( item => item.split('::',1)[0] !== fieldname );
    }

    /*
     * select functions
     */
    public setAllSelected() {
        this.listSelected.type = 'all';
        for (let listItem of this.listData.list) {
            listItem.selected = true;
        }

        // emit so items can trigger change detection
        this.selectionChanged$.emit(true);
    }

    /**
     * unselects all selected records
     */
    public setAllUnselected() {
        this.listSelected.type = 'none';
        for (let listItem of this.listData.list.filter(r => r.selected == true)) {
            listItem.selected = false;
        }

        // emit so items can trigger change detection
        this.selectionChanged$.emit(true);
    }

    /*
     * select functions
     */
    public setRangeSelected(from: number, to: number) {

        for (let i = from; i <= to; i++) {
            this.listData.list[i - 1].selected = true;
        }

        // emit so items can trigger change detection
        this.selectionChanged$.emit(true);
    }

    /**
     * returny the number of selected IDs
     */
    public getSelectedCount() {
        return this.listData.list.filter(i => i.selected == true).length;
    }

    /**
     * returns an array with the selected IDs
     */
    public getSelectedIDs(): string[] {
        let ids: string[] = [];
        for (let listItem of this.listData.list) {
            if (listItem.selected) {
                ids.push(listItem.id);
            }
        }
        return ids;
    }

    public getSelectedItems() {
        return this.listData.list.filter(i => i.selected);
    }

    /**
     * checks the access by action for the current list
     * @param {string} action
     * @returns {boolean}
     */
    public checkAccess(action: 'edit' | 'delete') {
        // no
        if ((action == 'edit' || action == 'delete') && (this.currentList.id == 'all' || this.currentList.id == 'owner')) {
            return false;
        }

        if (this.getGlobal()) {
            switch (action) {
                case 'delete':
                    return this.canDelete() && (this.session.authData.admin || this.metadata.checkModuleAcl(this.module, 'moduleadmin'));
                case 'edit':
                    return this.session.authData.admin || this.metadata.checkModuleAcl(this.module, 'moduleadmin');
                default:
                    return false;
            }
        } else {
            switch (action) {
                default:
                    return true;
            }
        }

    }

    /**
     * loads a list with the current settings
     *
     * @param quiet
     */
    public getListData(quiet: boolean = false): Observable<boolean> {
        let retSub = new Subject<boolean>();
        if (!quiet) {
            // set the service to loading state
            this.isLoading = true;

            // reset the list data
            this.resetListData();
        } else {
            // just reset the bucket items if we have any
            if (this.buckets && this.buckets.bucketitems) {
                for (let bucketitem of this.buckets.bucketitems) {
                    bucketitem.items = 0;
                }
            }
        }

        // set the aggregates
        let aggregates = {};
        aggregates[this.module] = this.selectedAggregates;

        const params = {
            modulefilter: this.modulefilter,
            filtercontextbeanid: this.filtercontextbeanid,
            start: 0,
            limit: this.loadlimit,
            listid: this.currentList.id,
            searchterm: this.searchTerm,
            searchgeo: this.searchGeo,
            aggregates: aggregates,
            buckets: this.buckets,
            relatefilter: this.relatefilter?.active ? this.relatefilter : null
        };

        const requestID = this.httpRequestsRefID + '_get_list_data';

        // cancel pending requests only if allowed
        if(this.cancelPendingRequests) this.backend.cancelPendingRequests([requestID]);

        this.backend.getList(this.module, this.sortArray, params, requestID).subscribe({
            next: (res: any) => {
                // set the listdata
                this.listData = res;

                // update the timestamp for the last load
                this.lastLoad = new moment();

                // indicate that we are no longer loading
                this.isLoading = false;

                // set the aggregates
                this.searchAggregates = res.aggregations;

                // set the buckets
                this.buckets = res.buckets;

                this.setToSession();

                // return & close the subject
                retSub.next(true);
                retSub.complete();
                this.listDataChanged$.next(true);
            },
            error: error => {
                this.toast.sendToast('error loading list');

                // indicate that we are no longer loading
                this.isLoading = false;

                retSub.error(error);
                retSub.complete();
            }

        });

        return retSub.asObservable();
    }

    /**
     * returns if the list can load more
     */
    public canLoadMore() {
        return !this.isLoading && this.listData.list.length < this.listData.totalcount;
    }

    /**
     * loads on top of the existing results
     */
    public loadMoreList() {
        if (this.isLoading || this.listData.list.length >= this.listData.totalcount) {
            return false;
        }
        this.isLoading = true;
        let aggregates = {};
        aggregates[this.module] = this.selectedAggregates;
        this.backend.getList(this.module, this.sortArray, {
            modulefilter: this.modulefilter,
            filtercontextbeanid: this.filtercontextbeanid,
            start: this.listData.list.length,
            limit: this.loadlimit,
            listid: this.currentList.id,
            searchterm: this.searchTerm,
            searchgeo: this.searchGeo,
            aggregates: aggregates,
            buckets: this.buckets,
            relatefilter: this.relatefilter?.active ? this.relatefilter : null},
            this.httpRequestsRefID)
            .subscribe((res: any) => {
                this.listData.list = this.listData.list.concat(res.list);
                this.lastLoad = new moment();
                this.isLoading = false;
                this.listDataChanged$.next(true);
            });
        // }
    }


    /**
     * loads on top of the existing results for a single bucket
     * @param bucketName: string
     */
    public loadMoreBucketList(bucketName) {
        const bucket = this.buckets.bucketitems.find(b => b.bucket == bucketName);

        if (!bucket || this.isLoading || bucket.items >= bucket.items.total) {
            return false;
        }
        this.isLoading = true;
        let aggregates = {};
        aggregates[this.module] = this.selectedAggregates;
        this.backend.getList(this.module, this.sortArray, {
            modulefilter: this.modulefilter,
            filtercontextbeanid: this.filtercontextbeanid,
            start: this.listData.list.length,
            limit: this.loadlimit,
            listid: this.currentList.id,
            searchterm: this.searchTerm,
            searchgeo: this.searchGeo,
            aggregates: aggregates,
            buckets: {
                bucketfield: this.buckets.bucketfield,
                bucketitems: [bucket]
            },
            relatefilter: this.relatefilter?.active ? this.relatefilter : null},
            this.httpRequestsRefID
        )
            .subscribe((res: any) => {
                bucket.items = res.buckets.bucketitems[0].items;
                this.listData.list = this.listData.list.concat(res.list);
                this.lastLoad = new moment();
                this.listDataChanged$.next(true);
                this.isLoading = false;
            });
        // }
    }


    /**
     * doanloads a list
     *
     * @param fields
     */
    public exportList(fields?: any[]): Observable<boolean> {

        let retSub = new Subject<boolean>();

        let selectedIds = this.getSelectedIDs();
        if (selectedIds.length > 0) {
            this.backend.getLinkToDownload(`module/${this.module}/export`, 'POST', {}, {
                ids: selectedIds,
                fields: fields
            }, {}, this.httpRequestsRefID).subscribe(
                (downloadurl) => {
                    retSub.next(downloadurl);
                    retSub.complete();
                }
            );
        } else {
            let aggregates = {};
            aggregates[this.module] = this.selectedAggregates;
            this.backend.getLinkToDownload(
                `module/${this.module}/export`,
                'POST',
                {},
                {
                    listid: this.currentList.id,
                    modulefilter: this.modulefilter,
                    sortfields: this.sortArray,
                    fields: fields,
                    searchterm: this.searchTerm,
                    searchgeo: this.searchGeo,
                    aggregates: aggregates,
                },
                null,
                this.httpRequestsRefID
            ).subscribe(
                (res) => {
                    retSub.next(res);
                    retSub.complete();
                }
            );
        }
        return retSub.asObservable();
    }

    /**
     * a simple getter for the bucketfield
     */
    get bucketfield() {
        return this.buckets ? this.buckets.bucketfield : '';
    }

    /**
     * a simple getter for the bucketfield
     */
    get bucketamountfield() {
        return this.buckets ? this.buckets.buckettotal : '';
    }

    /**
     * update the buckets
     *
     * @param from the from status
     * @param to the to status
     * @param bucketamountfields from optionala from value, added in the safe subscribe method to get the old value from the backup data so the update is done properly
     */
    // public updateBuckets(from, to, valuefrom?, valueto?) {
    public updateBuckets(from, to, bucketamountfields = []) {
        // reduce from buckets
        let frombucket = this.buckets.bucketitems.find(bucket => bucket.bucket == from);
        frombucket.items--;
        frombucket.total--;

        // add to the bucket
        let tobucket = this.buckets.bucketitems.find(bucket => bucket.bucket == to);
        tobucket.items++;
        tobucket.total++;

        for (let bucket of this.buckets.buckettotal) {
            for (let bucketamountfield of bucketamountfields) {
                if (bucket.function == "sum" && bucket.name == bucketamountfield.fieldname) {
                    frombucket.values['_bucket_agg_' + bucketamountfield.fieldname] -= bucketamountfield.valuefrom;
                    tobucket.values['_bucket_agg_' + bucketamountfield.fieldname] += bucketamountfield.valueto;
                }
            }

        }

    }

    /**
     * removes one item from a bucket and recues the total by the value
     *
     * @param from
     * @param bucketamountfields
     */
    public removeItemFromBucket(from, bucketamountfields = []) {
        // reduce from buckets
        let frombucket = this.buckets.bucketitems.find(bucket => bucket.bucket == from);
        frombucket.items--;
        frombucket.total--;

        // if we have a total field update that one as well
        for (let bucketamountfield of bucketamountfields) {
            frombucket.values['_bucket_agg_' + bucketamountfield.fieldname] -= bucketamountfield.value;
        }
    }
}
