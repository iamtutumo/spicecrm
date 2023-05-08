/*!
 * 
 *                     aacService
 *
 *                     release: 2023.01.001
 *
 *                     date: 2023-05-08 11:10:56
 *
 *                     build: 2023.01.001.1683537056299
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_include_spicemerge_spicemerge_ts"],{8494:(e,t,s)=>{s.r(t),s.d(t,{ModuleSpiceMerge:()=>P});var l=s(6895),d=s(433),i=s(4357),o=s(5886),r=s(3283),a=s(8363),n=s(1652),c=s(5710),m=s(2644),g=s(1571),u=s(4154);let h=(()=>{class objectmerge{constructor(e){this.metadata=e,this.masterId="",this.allowSwitchMaster=!0,this.masterModule="",this.mergeFields=[],this.mergeSource={}}setModule(e){this.masterModule=e,this.getMergeFields()}getMergeFields(){this.mergeFields=[];let e=this.metadata.getModuleFields(this.masterModule);for(let t in e){("1"==e[t].duplicate_merge||!0===e[t].duplicate_merge||void 0===e[t].duplicate_merge||"enabled"==e[t].duplicate_merge)&&"id"!=e[t].type&&("non-db"!=e[t].source||"linked"==e[t].type||"linkedparent"==e[t].type||e[t].name.endsWith("_address"))&&this.mergeFields.push(e[t])}}setAllfieldSources(e){this.mergeSource={};for(let t of this.mergeFields)this.mergeSource[t.name]=e}}return objectmerge.ɵfac=function(e){return new(e||objectmerge)(g.LFG(u.Pu))},objectmerge.ɵprov=g.Yz7({token:objectmerge,factory:objectmerge.ɵfac}),objectmerge})();var p=s(3369),b=s(1933),f=s(4505),M=s(4044),j=s(3463),S=s(9621),F=s(3499),x=s(5767),y=s(1916),O=s(5718),Z=s(6857),w=s(6059);const A=function(e){return{"slds-theme--success":e}};function C(e,t){if(1&e&&g._UZ(0,"tr",3),2&e){const e=t.$implicit,s=g.oxw();g.Q6J("ngClass",g.VKq(6,A,s.isCurrentModel(e.id)))("displaylinks",!1)("rowselect",!0)("rowselectdisabled",s.disableSelect(e))("listItem",e)("showActionMenu",!1)}}let k=(()=>{class ObjectMergeModalRecords{constructor(e,t,s){this.metadata=e,this.model=t,this.modellist=s,this.listFields=[];let l=this.metadata.getComponentConfig("ObjectMergeModalRecords",this.model.module),d=this.metadata.getFieldSetFields(l.fieldset);for(let e of d)e.fieldconfig.hidden||this.listFields.push(e)}isCurrentModel(e){return this.model.id&&this.model.id==e}disableSelect(e){return e.id==this.model.id||!e.acl?.delete}}return ObjectMergeModalRecords.ɵfac=function(e){return new(e||ObjectMergeModalRecords)(g.Y36(u.Pu),g.Y36(c.o),g.Y36(m.t))},ObjectMergeModalRecords.ɵcmp=g.Xpm({type:ObjectMergeModalRecords,selectors:[["object-merge-modal-records"]],decls:5,vars:2,consts:[[1,"slds-table","slds-table--bordered","slds-table--cell-buffer"],["object-list-header","",1,"slds-text-title--caps",3,"showRowActionMenu"],["object-list-item","","class","slds-hint-parent",3,"ngClass","displaylinks","rowselect","rowselectdisabled","listItem","showActionMenu",4,"ngFor","ngForOf"],["object-list-item","",1,"slds-hint-parent",3,"ngClass","displaylinks","rowselect","rowselectdisabled","listItem","showActionMenu"]],template:function(e,t){1&e&&(g.TgZ(0,"table",0)(1,"thead"),g._UZ(2,"tr",1),g.qZA(),g.TgZ(3,"tbody"),g.YNc(4,C,1,8,"tr",2),g.qZA()()),2&e&&(g.xp6(2),g.Q6J("showRowActionMenu",!1),g.xp6(2),g.Q6J("ngForOf",t.modellist.listData.list))},dependencies:[l.mk,l.sg,Z.B,w.p],encapsulation:2}),ObjectMergeModalRecords})();var v=s(2294),J=s(9901),T=s(7674),Y=s(3634);let I=(()=>{class ObjectMergeModalDataField{constructor(e,t){this.model=e,this.modellist=t,this.fieldname="",this.fielddata={},this.model.module=this.modellist.module}ngOnInit(){this.model.setData(this.fielddata,!1)}}return ObjectMergeModalDataField.ɵfac=function(e){return new(e||ObjectMergeModalDataField)(g.Y36(c.o),g.Y36(m.t))},ObjectMergeModalDataField.ɵcmp=g.Xpm({type:ObjectMergeModalDataField,selectors:[["object-merge-modal-data-field"]],inputs:{fieldname:"fieldname",fieldConfig:"fieldConfig",fielddata:"fielddata"},features:[g._Bn([c.o])],decls:1,vars:3,consts:[[3,"field","fieldconfig","fielddisplayclass"]],template:function(e,t){1&e&&g._UZ(0,"field-container",0),2&e&&g.Q6J("field",t.fieldname)("fieldconfig",t.fieldConfig)("fielddisplayclass","slds-truncate")},dependencies:[Y.j],encapsulation:2}),ObjectMergeModalDataField})();function D(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"td",7)(1,"a",8),g.NdJ("click",(function(){const t=g.CHM(e).$implicit,s=g.oxw();return g.KtG(s.selectAllFields(t.id))})),g._UZ(2,"system-label",9),g.qZA()()}}function E(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"td",7)(1,"div",10)(2,"div",11)(3,"system-input-radio",12),g.NdJ("ngModelChange",(function(t){g.CHM(e);const s=g.oxw();return g.KtG(s.objectmerge.masterId=t)})),g._UZ(4,"system-label",13),g.qZA()()()()}if(2&e){const e=t.$implicit,s=g.oxw();g.xp6(3),g.Q6J("value",e.id)("disabled",!s.canSwitchMaster)("ngModel",s.objectmerge.masterId)}}const q=function(e){return{"slds-text-color_success":e}};function B(e,t){if(1&e&&(g.TgZ(0,"th",4)(1,"div",14),g._uU(2),g.qZA()()),2&e){const e=t.$implicit,s=g.oxw();g.xp6(1),g.Q6J("ngClass",g.VKq(2,q,s.isCurrentModel(e.id))),g.xp6(1),g.Oqu(e.summary_text)}}const Q=function(){return{}},U=function(e){return{fieldtype:"address",key:e}};function L(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"td",17)(1,"div",20)(2,"system-input-radio",21),g.NdJ("ngModelChange",(function(t){g.CHM(e);const s=g.oxw(2).$implicit,l=g.oxw();return g.KtG(l.setMergeSource(s,t))})),g.qZA(),g._UZ(3,"object-merge-modal-data-field",22),g.qZA()()}if(2&e){const e=t.$implicit,s=g.oxw(2).$implicit,l=g.oxw();g.xp6(2),g.Q6J("name",s.name)("value",e.id)("ngModel",l.objectmerge.mergeSource[s.name]),g.xp6(1),g.Q6J("fieldname",s.name)("fieldConfig",l.isAddressGroupField(s)?g.VKq(7,U,s.name.split("_")[0]):g.DdM(6,Q))("fielddata",e)}}function R(e,t){if(1&e&&(g.TgZ(0,"tr",16)(1,"td",17),g._UZ(2,"system-label-fieldname",18),g.qZA(),g.YNc(3,L,4,9,"td",19),g.qZA()),2&e){const e=g.oxw().$implicit,t=g.oxw();g.xp6(2),g.Q6J("module",t.modellist.module)("field",e.name),g.xp6(1),g.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn)}}function N(e,t){if(1&e&&(g.ynx(0),g.YNc(1,R,4,4,"tr",15),g.BQk()),2&e){const e=t.$implicit,s=g.oxw();g.xp6(1),g.Q6J("ngIf",s.showField(e))}}let G=(()=>{class ObjectMergeModalData{constructor(e,t,s,l,d){this.view=e,this.metadata=t,this.modellist=s,this.objectmerge=l,this.model=d,this.view.displayLabels=!1}get canSwitchMaster(){return this.objectmerge.allowSwitchMaster}getSelected(){return this.modellist.listData.list.filter((e=>e.selected))}isCurrentModel(e){return this.model.id&&this.model.id==e}selectAllFields(e){this.objectmerge.setAllfieldSources(e)}showField(e){for(let t of this.getSelected()){if(!!t[e.name]&&!_.isObject(t[e.name])||_.isObject(t[e.name])&&!_.isEmpty(t[e.name]))return!("assigned_user_id"==e.name||"parent_id"==e.name||this.isAddressField(e.name));if(this.isAddressGroupField(e)){if(Object.keys(t).some((s=>s.startsWith(`${e.name}_`)&&!!t[s])))return!0}}return!1}isAddressField(e){return e.includes("_address_")}setMergeSource(e,t){this.isAddressGroupField(e)?this.objectmerge.mergeFields.forEach((s=>{s.name.startsWith(`${e.name}_`)&&(this.objectmerge.mergeSource[s.name]=t)})):this.objectmerge.mergeSource[e.name]=t}isAddressGroupField(e){return e.name.endsWith("_address")&&"non-db"==e.source}trackByFn(e){return e}}return ObjectMergeModalData.ɵfac=function(e){return new(e||ObjectMergeModalData)(g.Y36(v.e),g.Y36(u.Pu),g.Y36(m.t),g.Y36(h),g.Y36(c.o))},ObjectMergeModalData.ɵcmp=g.Xpm({type:ObjectMergeModalData,selectors:[["object-merge-modal-data"]],features:[g._Bn([v.e])],decls:15,vars:7,consts:[[1,"slds-table","slds-table--col-bordered","slds-no-row-hover","slds-table--fixed-layout"],["class","slds-text-align--center",4,"ngFor","ngForOf","ngForTrackBy"],[1,"slds-table","slds-table--col-bordered","slds-no-row-hover","slds-table--fixed-layout","slds-table--striped","slds-border--bottom"],[1,"slds-text-title_bold","slds-border--bottom","slds-border--top"],["scope","col"],["scope","col",4,"ngFor","ngForOf","ngForTrackBy"],[4,"ngFor","ngForOf"],[1,"slds-text-align--center"],["href","javascript:void(0)",3,"click"],["label","LBL_SELECT_ALL_FIELDS"],[1,"slds-form-element"],[1,"slds-form-element__control"],["name","master",3,"value","disabled","ngModel","ngModelChange"],["label","LBL_USE_AS_MASTER",1,"slds-p-left--xx-small"],[1,"slds-truncate","slds-text-align--center",3,"ngClass"],["class","slds-align-top",4,"ngIf"],[1,"slds-align-top"],[1,"slds-truncate"],[3,"module","field"],["class","slds-truncate",4,"ngFor","ngForOf","ngForTrackBy"],[1,"slds-grid"],["name","master",3,"name","value","ngModel","ngModelChange"],[3,"fieldname","fieldConfig","fielddata"]],template:function(e,t){1&e&&(g.TgZ(0,"table",0)(1,"tbody")(2,"tr"),g._UZ(3,"td"),g.YNc(4,D,3,0,"td",1),g.qZA(),g.TgZ(5,"tr"),g._UZ(6,"td"),g.YNc(7,E,5,3,"td",1),g.qZA()()(),g.TgZ(8,"table",2)(9,"thead")(10,"tr",3),g._UZ(11,"th",4),g.YNc(12,B,3,4,"th",5),g.qZA()(),g.TgZ(13,"tbody"),g.YNc(14,N,2,1,"ng-container",6),g.qZA()()),2&e&&(g.xp6(4),g.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn),g.xp6(3),g.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn),g.xp6(5),g.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn),g.xp6(2),g.Q6J("ngForOf",t.objectmerge.mergeFields))},dependencies:[l.mk,l.sg,l.O5,d.JJ,d.On,J.A,j._,T.h,I],encapsulation:2}),ObjectMergeModalData})(),$=(()=>{class ObjectMergeModalExecute{}return ObjectMergeModalExecute.ɵfac=function(e){return new(e||ObjectMergeModalExecute)},ObjectMergeModalExecute.ɵcmp=g.Xpm({type:ObjectMergeModalExecute,selectors:[["object-merge-modal-execute"]],decls:5,vars:0,consts:[[1,"slds-p-around--medium"],[1,"slds-grid","slds-grid--align-center","slds-text-heading--medium","slds-p-vertical--medium"],["label","MSG_CONFIRM_MERGE"],[1,"slds-grid","slds-grid--align-center","slds-p-vertical--medium"],["label","MSG_CONFIRM_MERGE","length","long"]],template:function(e,t){1&e&&(g.TgZ(0,"div",0)(1,"div",1),g._UZ(2,"system-label",2),g.qZA(),g.TgZ(3,"div",3),g._UZ(4,"system-label",4),g.qZA()())},dependencies:[j._],encapsulation:2}),ObjectMergeModalExecute})();function K(e,t){if(1&e&&(g.TgZ(0,"span"),g._uU(1),g.qZA()),2&e){const e=g.oxw();g.xp6(1),g.hij(" - ",e.model.data.summary_text,"")}}let X=(()=>{class ObjectMergeModal{constructor(e,t,s,l,d,i,o,r,a){this.broadcast=e,this.router=t,this.metadata=s,this.objectmerge=l,this.parentmodel=d,this.model=i,this.modellist=o,this.backend=r,this.modal=a,this.mergemodels=[],this.currentMergeStep=0,this.mergeSteps=["records","fields","execute"]}ngOnInit(){this.model.module=this.parentmodel.module,this.modellist.module=this.model.module,this.modellist.setListType("all",!1),this.objectmerge.setModule(this.model.module),this.parentmodel.id?(this.model.id=this.parentmodel.id,this.model.setData(this.parentmodel.data,!1),this.objectmerge.masterId=this.model.id,this.objectmerge.setAllfieldSources(this.model.id),this.objectmerge.allowSwitchMaster=this.parentmodel.checkAccess("delete"),this.model.setField("selected",!0),this.modellist.listData.list.push(this.model.data)):(this.mergeSteps=["fields","execute"],this.mergemodels.length==this.mergemodels.filter((e=>e.acl?.delete)).length?this.objectmerge.masterId=this.mergemodels[0].id:(this.objectmerge.masterId=this.mergemodels.find((e=>!e.acl?.delete)).id,this.objectmerge.allowSwitchMaster=!1),this.objectmerge.setAllfieldSources(this.objectmerge.masterId));for(let e of this.mergemodels)this.modellist.listData.list.push(e)}closeModal(){this.self.destroy()}getCurrentStep(){return this.mergeSteps[this.currentMergeStep]}nextStep(){if(this.currentMergeStep<this.mergeSteps.length-1)this.currentMergeStep,this.currentMergeStep++;else{let e={};for(let t of this.objectmerge.mergeFields)this.objectmerge.mergeSource[t.name]!=this.objectmerge.masterId&&(e[t.name]=this.objectmerge.mergeSource[t.name]);let t=[];for(let e of this.modellist.listData.list)e.id!=this.objectmerge.masterId&&e.selected&&t.push(e.id);this.modal.openModal("SystemLoadingModal").subscribe((s=>{s.instance.messagelabel="LBL_MERGING",this.backend.postRequest(`module/${this.model.module}/${this.objectmerge.masterId}/mergebeans`,{},{fields:e,duplicates:t}).subscribe((e=>{s.instance.self.destroy(),this.broadcast.broadcastMessage("model.save",{id:this.objectmerge.masterId,module:this.model.module,data:e.data}),this.broadcast.broadcastMessage("model.merge",{id:this.objectmerge.masterId,module:this.model.module});for(let e of t)this.broadcast.broadcastMessage("model.delete",{id:e,module:this.model.module});this.model.id&&this.model.id!=this.objectmerge.masterId&&this.router.navigate([`/module/${this.model.module}/${this.objectmerge.masterId}`]),this.closeModal()}))}))}}get prevDisabled(){return 0===this.currentMergeStep}get nextDisabled(){return 0===this.currentMergeStep&&this.modellist.getSelectedCount()<=1}prevStep(){this.currentMergeStep>0&&this.currentMergeStep--}}return ObjectMergeModal.ɵfac=function(e){return new(e||ObjectMergeModal)(g.Y36(p.f),g.Y36(b.F0),g.Y36(u.Pu),g.Y36(h),g.Y36(c.o,4),g.Y36(c.o),g.Y36(m.t),g.Y36(f.y),g.Y36(M.o))},ObjectMergeModal.ɵcmp=g.Xpm({type:ObjectMergeModal,selectors:[["object-merge-modal"]],inputs:{mergemodels:"mergemodels"},features:[g._Bn([c.o,m.t,h])],decls:15,vars:9,consts:[["size","large"],[3,"close"],["label","LBL_MERGE_RECORD"],[4,"ngIf"],["margin","none",3,"grow"],[3,"hidden"],[1,"slds-grid","slds-grid--align-spread","slds-grid--vertical-align-center"],[1,"slds-button","slds-button--neutral","slds-order--1",3,"disabled","click"],["label","LBL_PREVIOUS"],["system-progress-list-shade","",1,"slds-grow","slds-order--2",3,"steps","step"],[1,"slds-button","slds-button--brand","slds-order--3",3,"disabled","click"],["label","LBL_NEXT"]],template:function(e,t){1&e&&(g.TgZ(0,"system-modal",0)(1,"system-modal-header",1),g.NdJ("close",(function(){return t.closeModal()})),g._UZ(2,"system-label",2),g.YNc(3,K,2,1,"span",3),g.qZA(),g.TgZ(4,"system-modal-content",4),g._UZ(5,"object-merge-modal-records",5)(6,"object-merge-modal-data",5)(7,"object-merge-modal-execute",5),g.qZA(),g.TgZ(8,"system-modal-footer")(9,"div",6)(10,"button",7),g.NdJ("click",(function(){return t.prevStep()})),g._UZ(11,"system-label",8),g.qZA(),g._UZ(12,"system-progress-list",9),g.TgZ(13,"button",10),g.NdJ("click",(function(){return t.nextStep()})),g._UZ(14,"system-label",11),g.qZA()()()()),2&e&&(g.xp6(3),g.Q6J("ngIf",t.model.id),g.xp6(1),g.Q6J("grow",!0),g.xp6(1),g.Q6J("hidden","records"!=t.getCurrentStep()),g.xp6(1),g.Q6J("hidden","fields"!=t.getCurrentStep()),g.xp6(1),g.Q6J("hidden","execute"!=t.getCurrentStep()),g.xp6(3),g.Q6J("disabled",t.prevDisabled),g.xp6(2),g.Q6J("steps",t.mergeSteps)("step",t.currentMergeStep),g.xp6(1),g.Q6J("disabled",t.nextDisabled))},dependencies:[l.O5,j._,S.j,F.x,x.p,y.y,O.s,k,G,$],encapsulation:2}),ObjectMergeModal})(),P=(()=>{class ModuleSpiceMerge{}return ModuleSpiceMerge.ɵfac=function(e){return new(e||ModuleSpiceMerge)},ModuleSpiceMerge.ɵmod=g.oAB({type:ModuleSpiceMerge}),ModuleSpiceMerge.ɵinj=g.cJS({imports:[l.ez,d.u5,o.ObjectFields,r.GlobalComponents,a.ObjectComponents,n.SystemComponents,i.o]}),ModuleSpiceMerge})();("undefined"==typeof ngJitMode||ngJitMode)&&g.kYT(P,{declarations:[X,k,G,I,$],imports:[l.ez,d.u5,o.ObjectFields,r.GlobalComponents,a.ObjectComponents,n.SystemComponents,i.o]})}}]);