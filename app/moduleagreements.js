/*!
 * 
 *                     aacService
 *
 *                     release: 2023.01.001
 *
 *                     date: 2023-04-19 17:23:57
 *
 *                     build: 2023.01.001.1681917837156
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_agreements_moduleagreements_ts"],{2273:(e,t,s)=>{s.r(t),s.d(t,{ModuleAgreements:()=>L});var o=s(6895),n=s(433),i=s(5886),d=s(3283),l=s(8363),a=s(1652),m=s(4357),r=s(5710),c=s(2294),h=s(7579),u=s(1571),g=s(5329),b=s(3278),v=s(4154),p=s(4505),A=s(4044),_=s(323),M=s(1933),R=s(6951),f=s(3463),N=s(9621),C=s(3499),y=s(5767),Z=s(1916);let E=(()=>{class AgreementsAddRevisionModal{constructor(e,t,s,o,n,i,d,l,a,m){this.language=e,this.model=t,this.parentModel=s,this.view=o,this.toast=n,this.metadata=i,this.backend=d,this.modal=l,this.modelattachments=a,this.router=m,this.componentset="",this.spiceattachment={},this.files={},this.revComponent={},this.revNumber=1,this.responseSubject=new h.x,this.model.module="AgreementRevisions",this.model.initialize()}ngOnInit(){this.metadata.getComponentConfig("AgreementsAddRevisionModal",this.model.module);this.componentset=this.revComponent.revComponent,this.view.isEditable=!0,this.view.setEditMode(),this.model.initialize(this.parentModel),this.model.startEdit(),this.modelattachments.module=this.model.module,this.modelattachments.id=this.model.id,this.generateRevNumb(),this.generateRevName()}generateRevNumb(){let e=this.parentModel.getRelatedRecords("agreementrevisions").sort(((e,t)=>e.version_number-t.version_number)).reverse();return e.length>0&&(this.revNumber=e[0].version_number+1),this.model.setField("version_number",this.revNumber),this.revNumber}generateRevName(){return this.revName=this.revNumber+"_"+this.spiceattachment.filename,this.model.setField("name",this.revName),this.revName}get canAdd(){return this.model.validate()}addRevision(e=!1){let t=this.model.data;this.model.validate()&&(this.modelattachments.files=[],this.modelattachments.uploadAttachmentsBase64(this.files).subscribe({next:s=>{this.model.data=t,this.model.save(),this.model.setField("id",this.model.id),this.parentModel.addRelatedRecords("agreementrevisions",[this.model.data],!1),this.responseSubject.next(!0),e&&this.router.navigate(["/module/AgreementRevisions/"+this.model.id])},error:()=>{this.toast.sendToast(this.language.getLabel("LBL_CREATING_REVISION_ATTACHMENT"),"error")}}),this.closeModal())}closeModal(){this.model.cancelEdit(),this.self.destroy()}}return AgreementsAddRevisionModal.ɵfac=function(e){return new(e||AgreementsAddRevisionModal)(u.Y36(g.d),u.Y36(r.o),u.Y36(r.o,4),u.Y36(c.e),u.Y36(b.A),u.Y36(v.Pu),u.Y36(p.y),u.Y36(A.o),u.Y36(_.H),u.Y36(M.F0))},AgreementsAddRevisionModal.ɵcmp=u.Xpm({type:AgreementsAddRevisionModal,selectors:[["agreements-add-revision-modal"]],features:[u._Bn([c.e,r.o])],decls:13,vars:3,consts:[["size","medium"],[3,"close"],["label","LBL_ADD_REVISION"],[3,"componentset"],[1,"slds-grid","slds-grid--vertical-align-center"],[1,"slds-col--bump-left","slds-button","slds-button--neutral",3,"click"],["label","LBL_CANCEL"],[1,"slds-col--bump-left","slds-button","slds-button--brand",3,"disabled","click"],["label","LBL_SAVE"],["label","LBL_SAVE_AND_GO_TO_RECORD"]],template:function(e,t){1&e&&(u.TgZ(0,"system-modal",0)(1,"system-modal-header",1),u.NdJ("close",(function(){return t.closeModal()})),u._UZ(2,"system-label",2),u.qZA(),u.TgZ(3,"system-modal-content"),u._UZ(4,"system-componentset",3),u.qZA(),u.TgZ(5,"system-modal-footer")(6,"div",4)(7,"button",5),u.NdJ("click",(function(){return t.closeModal()})),u._UZ(8,"system-label",6),u.qZA(),u.TgZ(9,"button",7),u.NdJ("click",(function(){return t.addRevision()})),u._UZ(10,"system-label",8),u.qZA(),u.TgZ(11,"button",7),u.NdJ("click",(function(){return t.addRevision(!0)})),u._UZ(12,"system-label",9),u.qZA()()()()),2&e&&(u.xp6(4),u.Q6J("componentset",t.componentset),u.xp6(5),u.Q6J("disabled",!t.canAdd),u.xp6(2),u.Q6J("disabled",!t.canAdd))},dependencies:[R.E,f._,N.j,C.x,y.p,Z.y],encapsulation:2}),AgreementsAddRevisionModal})(),L=(()=>{class ModuleAgreements{}return ModuleAgreements.ɵfac=function(e){return new(e||ModuleAgreements)},ModuleAgreements.ɵmod=u.oAB({type:ModuleAgreements}),ModuleAgreements.ɵinj=u.cJS({imports:[o.ez,n.u5,i.ObjectFields,d.GlobalComponents,l.ObjectComponents,a.SystemComponents,m.o]}),ModuleAgreements})();("undefined"==typeof ngJitMode||ngJitMode)&&u.kYT(L,{declarations:[E],imports:[o.ez,n.u5,i.ObjectFields,d.GlobalComponents,l.ObjectComponents,a.SystemComponents,m.o]})}}]);