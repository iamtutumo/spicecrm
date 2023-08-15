/*!
 * 
 *                     aacService
 *
 *                     release: 2023.02.001
 *
 *                     date: 2023-08-15 08:39:15
 *
 *                     build: 2023.02.001.1692081555935
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_include_spicemerge_spicemerge_ts"],{8494:(e,t,s)=>{s.r(t),s.d(t,{ModuleSpiceMerge:()=>z});var l=s(1180),d=s(4755),i=s(5030),o=s(4357),r=s(3190),a=s(4826),n=s(6490),c=s(3735),m=s(5710),g=s(2644),u=s(2242),h=s(4154);let p=(()=>{var e;class objectmerge{constructor(e){(0,l.Z)(this,"metadata",void 0),(0,l.Z)(this,"masterId",""),(0,l.Z)(this,"allowSwitchMaster",!0),(0,l.Z)(this,"masterModule",""),(0,l.Z)(this,"mergeFields",[]),(0,l.Z)(this,"mergeSource",{}),this.metadata=e}setModule(e){this.masterModule=e,this.getMergeFields()}getMergeFields(){this.mergeFields=[];let e=this.metadata.getModuleFields(this.masterModule);for(let t in e){("1"==e[t].duplicate_merge||!0===e[t].duplicate_merge||void 0===e[t].duplicate_merge||"enabled"==e[t].duplicate_merge)&&"id"!=e[t].type&&("non-db"!=e[t].source||"linked"==e[t].type||"linkedparent"==e[t].type||e[t].name.endsWith("_address"))&&this.mergeFields.push(e[t])}}setAllfieldSources(e){this.mergeSource={};for(let t of this.mergeFields)this.mergeSource[t.name]=e}}return e=objectmerge,(0,l.Z)(objectmerge,"ɵfac",(function(t){return new(t||e)(u.LFG(h.Pu))})),(0,l.Z)(objectmerge,"ɵprov",u.Yz7({token:e,factory:e.ɵfac})),objectmerge})();var b=s(3369),f=s(3348),M=s(4505),Z=s(4044),j=s(3463),S=s(9621),F=s(3499),v=s(5767),x=s(1916),y=s(5718),w=s(6857),O=s(6059);const A=function(e){return{"slds-theme--success":e}};function C(e,t){if(1&e&&u._UZ(0,"tr",3),2&e){const e=t.$implicit,s=u.oxw();u.Q6J("ngClass",u.VKq(6,A,s.isCurrentModel(e.id)))("displaylinks",!1)("rowselect",!0)("rowselectdisabled",s.disableSelect(e))("listItem",e)("showActionMenu",!1)}}let k=(()=>{var e;class ObjectMergeModalRecords{constructor(e,t,s){(0,l.Z)(this,"metadata",void 0),(0,l.Z)(this,"model",void 0),(0,l.Z)(this,"modellist",void 0),(0,l.Z)(this,"listFields",[]),this.metadata=e,this.model=t,this.modellist=s;let d=this.metadata.getComponentConfig("ObjectMergeModalRecords",this.model.module),i=this.metadata.getFieldSetFields(d.fieldset);for(let e of i)e.fieldconfig.hidden||this.listFields.push(e)}isCurrentModel(e){return this.model.id&&this.model.id==e}disableSelect(e){return e.id==this.model.id||!e.acl?.delete}}return e=ObjectMergeModalRecords,(0,l.Z)(ObjectMergeModalRecords,"ɵfac",(function(t){return new(t||e)(u.Y36(h.Pu),u.Y36(m.o),u.Y36(g.t))})),(0,l.Z)(ObjectMergeModalRecords,"ɵcmp",u.Xpm({type:e,selectors:[["object-merge-modal-records"]],decls:5,vars:2,consts:[[1,"slds-table","slds-table--bordered","slds-table--cell-buffer"],["object-list-header","",1,"slds-text-title--caps",3,"showRowActionMenu"],["object-list-item","","class","slds-hint-parent",3,"ngClass","displaylinks","rowselect","rowselectdisabled","listItem","showActionMenu",4,"ngFor","ngForOf"],["object-list-item","",1,"slds-hint-parent",3,"ngClass","displaylinks","rowselect","rowselectdisabled","listItem","showActionMenu"]],template:function(e,t){1&e&&(u.TgZ(0,"table",0)(1,"thead"),u._UZ(2,"tr",1),u.qZA(),u.TgZ(3,"tbody"),u.YNc(4,C,1,8,"tr",2),u.qZA()()),2&e&&(u.xp6(2),u.Q6J("showRowActionMenu",!1),u.xp6(2),u.Q6J("ngForOf",t.modellist.listData.list))},dependencies:[d.mk,d.sg,w.B,O.p],encapsulation:2})),ObjectMergeModalRecords})();var J=s(2294),T=s(9901),Y=s(7674),I=s(3634);let q=(()=>{var e;class ObjectMergeModalDataField{constructor(e,t){(0,l.Z)(this,"model",void 0),(0,l.Z)(this,"modellist",void 0),(0,l.Z)(this,"fieldname",""),(0,l.Z)(this,"fieldConfig",void 0),(0,l.Z)(this,"fielddata",{}),this.model=e,this.modellist=t,this.model.module=this.modellist.module}ngOnInit(){this.model.setData(this.fielddata,!1)}}return e=ObjectMergeModalDataField,(0,l.Z)(ObjectMergeModalDataField,"ɵfac",(function(t){return new(t||e)(u.Y36(m.o),u.Y36(g.t))})),(0,l.Z)(ObjectMergeModalDataField,"ɵcmp",u.Xpm({type:e,selectors:[["object-merge-modal-data-field"]],inputs:{fieldname:"fieldname",fieldConfig:"fieldConfig",fielddata:"fielddata"},features:[u._Bn([m.o])],decls:1,vars:3,consts:[[3,"field","fieldconfig","fielddisplayclass"]],template:function(e,t){1&e&&u._UZ(0,"field-container",0),2&e&&u.Q6J("field",t.fieldname)("fieldconfig",t.fieldConfig)("fielddisplayclass","slds-truncate")},dependencies:[I.j],encapsulation:2})),ObjectMergeModalDataField})();function E(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"td",7)(1,"a",8),u.NdJ("click",(function(){const t=u.CHM(e).$implicit,s=u.oxw();return u.KtG(s.selectAllFields(t.id))})),u._UZ(2,"system-label",9),u.qZA()()}}function B(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"td",7)(1,"div",10)(2,"div",11)(3,"system-input-radio",12),u.NdJ("ngModelChange",(function(t){u.CHM(e);const s=u.oxw();return u.KtG(s.objectmerge.masterId=t)})),u._UZ(4,"system-label",13),u.qZA()()()()}if(2&e){const e=t.$implicit,s=u.oxw();u.xp6(3),u.Q6J("value",e.id)("disabled",!s.canSwitchMaster)("ngModel",s.objectmerge.masterId)}}const D=function(e){return{"slds-text-color_success":e}};function Q(e,t){if(1&e&&(u.TgZ(0,"th",4)(1,"div",14),u._uU(2),u.qZA()()),2&e){const e=t.$implicit,s=u.oxw();u.xp6(1),u.Q6J("ngClass",u.VKq(2,D,s.isCurrentModel(e.id))),u.xp6(1),u.Oqu(e.summary_text)}}const U=function(){return{}},L=function(e){return{fieldtype:"address",key:e}};function R(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"td",17)(1,"div",20)(2,"system-input-radio",21),u.NdJ("ngModelChange",(function(t){u.CHM(e);const s=u.oxw(2).$implicit,l=u.oxw();return u.KtG(l.setMergeSource(s,t))})),u.qZA(),u._UZ(3,"object-merge-modal-data-field",22),u.qZA()()}if(2&e){const e=t.$implicit,s=u.oxw(2).$implicit,l=u.oxw();u.xp6(2),u.Q6J("name",s.name)("value",e.id)("ngModel",l.objectmerge.mergeSource[s.name]),u.xp6(1),u.Q6J("fieldname",s.name)("fieldConfig",l.isAddressGroupField(s)?u.VKq(7,L,s.name.split("_")[0]):u.DdM(6,U))("fielddata",e)}}function N(e,t){if(1&e&&(u.TgZ(0,"tr",16)(1,"td",17),u._UZ(2,"system-label-fieldname",18),u.qZA(),u.YNc(3,R,4,9,"td",19),u.qZA()),2&e){const e=u.oxw().$implicit,t=u.oxw();u.xp6(2),u.Q6J("module",t.modellist.module)("field",e.name),u.xp6(1),u.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn)}}function G(e,t){if(1&e&&(u.ynx(0),u.YNc(1,N,4,4,"tr",15),u.BQk()),2&e){const e=t.$implicit,s=u.oxw();u.xp6(1),u.Q6J("ngIf",s.showField(e))}}let $=(()=>{var e;class ObjectMergeModalData{constructor(e,t,s,d,i){(0,l.Z)(this,"view",void 0),(0,l.Z)(this,"metadata",void 0),(0,l.Z)(this,"modellist",void 0),(0,l.Z)(this,"objectmerge",void 0),(0,l.Z)(this,"model",void 0),this.view=e,this.metadata=t,this.modellist=s,this.objectmerge=d,this.model=i,this.view.displayLabels=!1}get canSwitchMaster(){return this.objectmerge.allowSwitchMaster}getSelected(){return this.modellist.listData.list.filter((e=>e.selected))}isCurrentModel(e){return this.model.id&&this.model.id==e}selectAllFields(e){this.objectmerge.setAllfieldSources(e)}showField(e){for(let t of this.getSelected()){if(!!t[e.name]&&!_.isObject(t[e.name])||_.isObject(t[e.name])&&!_.isEmpty(t[e.name]))return!("assigned_user_id"==e.name||"parent_id"==e.name||this.isAddressField(e.name));if(this.isAddressGroupField(e)){if(Object.keys(t).some((s=>s.startsWith(`${e.name}_`)&&!!t[s])))return!0}}return!1}isAddressField(e){return e.includes("_address_")}setMergeSource(e,t){this.isAddressGroupField(e)?this.objectmerge.mergeFields.forEach((s=>{s.name.startsWith(`${e.name}_`)&&(this.objectmerge.mergeSource[s.name]=t)})):this.objectmerge.mergeSource[e.name]=t}isAddressGroupField(e){return e.name.endsWith("_address")&&"non-db"==e.source}trackByFn(e){return e}}return e=ObjectMergeModalData,(0,l.Z)(ObjectMergeModalData,"ɵfac",(function(t){return new(t||e)(u.Y36(J.e),u.Y36(h.Pu),u.Y36(g.t),u.Y36(p),u.Y36(m.o))})),(0,l.Z)(ObjectMergeModalData,"ɵcmp",u.Xpm({type:e,selectors:[["object-merge-modal-data"]],features:[u._Bn([J.e])],decls:15,vars:7,consts:[[1,"slds-table","slds-table--col-bordered","slds-no-row-hover","slds-table--fixed-layout"],["class","slds-text-align--center",4,"ngFor","ngForOf","ngForTrackBy"],[1,"slds-table","slds-table--col-bordered","slds-no-row-hover","slds-table--fixed-layout","slds-table--striped","slds-border--bottom"],[1,"slds-text-title_bold","slds-border--bottom","slds-border--top"],["scope","col"],["scope","col",4,"ngFor","ngForOf","ngForTrackBy"],[4,"ngFor","ngForOf"],[1,"slds-text-align--center"],["href","javascript:void(0)",3,"click"],["label","LBL_SELECT_ALL_FIELDS"],[1,"slds-form-element"],[1,"slds-form-element__control"],["name","master",3,"value","disabled","ngModel","ngModelChange"],["label","LBL_USE_AS_MASTER",1,"slds-p-left--xx-small"],[1,"slds-truncate","slds-text-align--center",3,"ngClass"],["class","slds-align-top",4,"ngIf"],[1,"slds-align-top"],[1,"slds-truncate"],[3,"module","field"],["class","slds-truncate",4,"ngFor","ngForOf","ngForTrackBy"],[1,"slds-grid"],["name","master",3,"name","value","ngModel","ngModelChange"],[3,"fieldname","fieldConfig","fielddata"]],template:function(e,t){1&e&&(u.TgZ(0,"table",0)(1,"tbody")(2,"tr"),u._UZ(3,"td"),u.YNc(4,E,3,0,"td",1),u.qZA(),u.TgZ(5,"tr"),u._UZ(6,"td"),u.YNc(7,B,5,3,"td",1),u.qZA()()(),u.TgZ(8,"table",2)(9,"thead")(10,"tr",3),u._UZ(11,"th",4),u.YNc(12,Q,3,4,"th",5),u.qZA()(),u.TgZ(13,"tbody"),u.YNc(14,G,2,1,"ng-container",6),u.qZA()()),2&e&&(u.xp6(4),u.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn),u.xp6(3),u.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn),u.xp6(5),u.Q6J("ngForOf",t.getSelected())("ngForTrackBy",t.trackByFn),u.xp6(2),u.Q6J("ngForOf",t.objectmerge.mergeFields))},dependencies:[d.mk,d.sg,d.O5,i.JJ,i.On,T.A,j._,Y.h,q],encapsulation:2})),ObjectMergeModalData})(),K=(()=>{var e;class ObjectMergeModalExecute{}return e=ObjectMergeModalExecute,(0,l.Z)(ObjectMergeModalExecute,"ɵfac",(function(t){return new(t||e)})),(0,l.Z)(ObjectMergeModalExecute,"ɵcmp",u.Xpm({type:e,selectors:[["object-merge-modal-execute"]],decls:5,vars:0,consts:[[1,"slds-p-around--medium"],[1,"slds-grid","slds-grid--align-center","slds-text-heading--medium","slds-p-vertical--medium"],["label","MSG_CONFIRM_MERGE"],[1,"slds-grid","slds-grid--align-center","slds-p-vertical--medium"],["label","MSG_CONFIRM_MERGE","length","long"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"div",1),u._UZ(2,"system-label",2),u.qZA(),u.TgZ(3,"div",3),u._UZ(4,"system-label",4),u.qZA()())},dependencies:[j._],encapsulation:2})),ObjectMergeModalExecute})();function X(e,t){if(1&e&&(u.TgZ(0,"span"),u._uU(1),u.qZA()),2&e){const e=u.oxw();u.xp6(1),u.hij(" - ",e.model.data.summary_text,"")}}let P=(()=>{var e;class ObjectMergeModal{constructor(e,t,s,d,i,o,r,a,n){(0,l.Z)(this,"broadcast",void 0),(0,l.Z)(this,"router",void 0),(0,l.Z)(this,"metadata",void 0),(0,l.Z)(this,"objectmerge",void 0),(0,l.Z)(this,"parentmodel",void 0),(0,l.Z)(this,"model",void 0),(0,l.Z)(this,"modellist",void 0),(0,l.Z)(this,"backend",void 0),(0,l.Z)(this,"modal",void 0),(0,l.Z)(this,"mergemodels",[]),(0,l.Z)(this,"currentMergeStep",0),(0,l.Z)(this,"mergeSteps",["records","fields","execute"]),(0,l.Z)(this,"self",void 0),this.broadcast=e,this.router=t,this.metadata=s,this.objectmerge=d,this.parentmodel=i,this.model=o,this.modellist=r,this.backend=a,this.modal=n}ngOnInit(){this.model.module=this.parentmodel.module,this.modellist.module=this.model.module,this.modellist.setListType("all",!1),this.objectmerge.setModule(this.model.module),this.parentmodel.id?(this.model.id=this.parentmodel.id,this.model.setData(this.parentmodel.data,!1),this.objectmerge.masterId=this.model.id,this.objectmerge.setAllfieldSources(this.model.id),this.objectmerge.allowSwitchMaster=this.parentmodel.checkAccess("delete"),this.model.setField("selected",!0),this.modellist.listData.list.push(this.model.data)):(this.mergeSteps=["fields","execute"],this.mergemodels.length==this.mergemodels.filter((e=>e.acl?.delete)).length?this.objectmerge.masterId=this.mergemodels[0].id:(this.objectmerge.masterId=this.mergemodels.find((e=>!e.acl?.delete)).id,this.objectmerge.allowSwitchMaster=!1),this.objectmerge.setAllfieldSources(this.objectmerge.masterId));for(let e of this.mergemodels)this.modellist.listData.list.push(e)}closeModal(){this.self.destroy()}getCurrentStep(){return this.mergeSteps[this.currentMergeStep]}nextStep(){if(this.currentMergeStep<this.mergeSteps.length-1)this.currentMergeStep,this.currentMergeStep++;else{let e={};for(let t of this.objectmerge.mergeFields)this.objectmerge.mergeSource[t.name]!=this.objectmerge.masterId&&(e[t.name]=this.objectmerge.mergeSource[t.name]);let t=[];for(let e of this.modellist.listData.list)e.id!=this.objectmerge.masterId&&e.selected&&t.push(e.id);this.modal.openModal("SystemLoadingModal").subscribe((s=>{s.instance.messagelabel="LBL_MERGING",this.backend.postRequest(`module/${this.model.module}/${this.objectmerge.masterId}/mergebeans`,{},{fields:e,duplicates:t}).subscribe((e=>{s.instance.self.destroy(),this.broadcast.broadcastMessage("model.save",{id:this.objectmerge.masterId,module:this.model.module,data:e.data}),this.broadcast.broadcastMessage("model.merge",{id:this.objectmerge.masterId,module:this.model.module});for(let e of t)this.broadcast.broadcastMessage("model.delete",{id:e,module:this.model.module});this.model.id&&this.model.id!=this.objectmerge.masterId&&this.router.navigate([`/module/${this.model.module}/${this.objectmerge.masterId}`]),this.closeModal()}))}))}}get prevDisabled(){return 0===this.currentMergeStep}get nextDisabled(){return 0===this.currentMergeStep&&this.modellist.getSelectedCount()<=1}prevStep(){this.currentMergeStep>0&&this.currentMergeStep--}}return e=ObjectMergeModal,(0,l.Z)(ObjectMergeModal,"ɵfac",(function(t){return new(t||e)(u.Y36(b.f),u.Y36(f.F0),u.Y36(h.Pu),u.Y36(p),u.Y36(m.o,4),u.Y36(m.o),u.Y36(g.t),u.Y36(M.y),u.Y36(Z.o))})),(0,l.Z)(ObjectMergeModal,"ɵcmp",u.Xpm({type:e,selectors:[["object-merge-modal"]],inputs:{mergemodels:"mergemodels"},features:[u._Bn([m.o,g.t,p])],decls:15,vars:9,consts:[["size","large"],[3,"close"],["label","LBL_MERGE_RECORD"],[4,"ngIf"],["margin","none",3,"grow"],[3,"hidden"],[1,"slds-grid","slds-grid--align-spread","slds-grid--vertical-align-center"],[1,"slds-button","slds-button--neutral","slds-order--1",3,"disabled","click"],["label","LBL_PREVIOUS"],["system-progress-list-shade","",1,"slds-grow","slds-order--2",3,"steps","step"],[1,"slds-button","slds-button--brand","slds-order--3",3,"disabled","click"],["label","LBL_NEXT"]],template:function(e,t){1&e&&(u.TgZ(0,"system-modal",0)(1,"system-modal-header",1),u.NdJ("close",(function(){return t.closeModal()})),u._UZ(2,"system-label",2),u.YNc(3,X,2,1,"span",3),u.qZA(),u.TgZ(4,"system-modal-content",4),u._UZ(5,"object-merge-modal-records",5)(6,"object-merge-modal-data",5)(7,"object-merge-modal-execute",5),u.qZA(),u.TgZ(8,"system-modal-footer")(9,"div",6)(10,"button",7),u.NdJ("click",(function(){return t.prevStep()})),u._UZ(11,"system-label",8),u.qZA(),u._UZ(12,"system-progress-list",9),u.TgZ(13,"button",10),u.NdJ("click",(function(){return t.nextStep()})),u._UZ(14,"system-label",11),u.qZA()()()()),2&e&&(u.xp6(3),u.Q6J("ngIf",t.model.id),u.xp6(1),u.Q6J("grow",!0),u.xp6(1),u.Q6J("hidden","records"!=t.getCurrentStep()),u.xp6(1),u.Q6J("hidden","fields"!=t.getCurrentStep()),u.xp6(1),u.Q6J("hidden","execute"!=t.getCurrentStep()),u.xp6(3),u.Q6J("disabled",t.prevDisabled),u.xp6(2),u.Q6J("steps",t.mergeSteps)("step",t.currentMergeStep),u.xp6(1),u.Q6J("disabled",t.nextDisabled))},dependencies:[d.O5,j._,S.j,F.x,v.p,x.y,y.s,k,$,K],encapsulation:2})),ObjectMergeModal})(),z=(()=>{var e;class ModuleSpiceMerge{}return e=ModuleSpiceMerge,(0,l.Z)(ModuleSpiceMerge,"ɵfac",(function(t){return new(t||e)})),(0,l.Z)(ModuleSpiceMerge,"ɵmod",u.oAB({type:e})),(0,l.Z)(ModuleSpiceMerge,"ɵinj",u.cJS({imports:[d.ez,i.u5,r.ObjectFields,a.GlobalComponents,n.ObjectComponents,c.SystemComponents,o.o]})),ModuleSpiceMerge})();("undefined"==typeof ngJitMode||ngJitMode)&&u.kYT(z,{declarations:[P,k,$,q,K],imports:[d.ez,i.u5,r.ObjectFields,a.GlobalComponents,n.ObjectComponents,c.SystemComponents,o.o]})}}]);