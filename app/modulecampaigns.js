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
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_campaigns_modulecampaigns_ts"],{707:(t,e,s)=>{s.r(e),s.d(e,{ModuleCampaigns:()=>It});var i=s(6895),a=s(433),l=s(5886),n=s(3283),o=s(8363),d=s(1652),c=s(1571),r=s(5329),m=s(4154),u=s(5710),g=s(3278),p=s(4505),h=s(3463),b=s(4664);function f(t,e){1&t&&(c.TgZ(0,"div",3),c._UZ(1,"system-spinner",4),c.qZA()),2&t&&(c.xp6(1),c.Q6J("size",12))}let v=(()=>{class CampaignTaskActivateButton{constructor(t,e,s,i,a){this.language=t,this.metadata=e,this.model=s,this.toast=i,this.backend=a,this.activating=!1,this.disabled=!0,this.model.mode$.subscribe((t=>{this.handleDisabled()})),this.model.data$.subscribe((t=>{this.handleDisabled()}))}get hidden(){return"Email"==this.model.getField("campaigntask_type")}handleDisabled(){"Email"!=this.model.getFieldValue("campaigntask_type")?this.model.getFieldValue("activated")?this.disabled=!0:this.disabled=!(!this.model.isEditing&&!0!==this.model.getField("activated")):this.disabled=!0}execute(){this.activating||(this.activating=!0,this.backend.postRequest(`module/CampaignTasks/${this.model.id}/activate`).subscribe((t=>{this.activating=!1,t.success?this.toast.sendToast(this.language.getLabel("LBL_CAMPAIGNTASK_ACTIVATED")):this.toast.sendToast(this.language.getLabel("LBL_NO_TARGETS_SELECTED"),"error")})))}}return CampaignTaskActivateButton.ɵfac=function(t){return new(t||CampaignTaskActivateButton)(c.Y36(r.d),c.Y36(m.Pu),c.Y36(u.o),c.Y36(g.A),c.Y36(p.y))},CampaignTaskActivateButton.ɵcmp=c.Xpm({type:CampaignTaskActivateButton,selectors:[["campaign-activate-button"]],decls:4,vars:1,consts:[[1,"slds-grid","slds-grid--vertical-align-center"],["class","slds-p-right--x-small",4,"ngIf"],["label","LBL_ACTIVATE"],[1,"slds-p-right--x-small"],[3,"size"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.YNc(1,f,2,1,"div",1),c.TgZ(2,"span"),c._UZ(3,"system-label",2),c.qZA()()),2&t&&(c.xp6(1),c.Q6J("ngIf",e.activating))},dependencies:[i.O5,h._,b.W],encapsulation:2}),CampaignTaskActivateButton})();var _=s(4044),T=s(4561);function y(t,e){1&t&&c._UZ(0,"system-icon",5),2&t&&c.Q6J("sprite","utility")("icon","email")("size","xx-small")("addclasses","")}function x(t,e){1&t&&c._UZ(0,"system-spinner",6),2&t&&c.Q6J("size",10)("border",1)}let C=(()=>{class CampaignSendMailButton{constructor(t,e,s,i,a){this.language=t,this.model=e,this.backend=s,this.toast=i,this.modal=a,this.sending=!1,this.disabled=!0,this.model.mode$.subscribe((t=>{this.handleDisabled()})),this.model.data$.subscribe((t=>{this.handleDisabled()}))}execute(){let t=this.modal.await("LBL_SENDING");this.sending||(this.sending=!0,this.backend.postRequest(`module/CampaignTasks/${this.model.id}/queuemail`).subscribe({next:e=>{this.sending=!1,t.emit(!0),e.success?this.toast.sendToast(this.language.getLabel("LBL_MAILS_QUEUED")):this.toast.sendToast(this.language.getLabel("LBL_NO_TARGETS_SELECTED"),"error")},error:()=>{t.emit(!0),this.toast.sendToast(this.language.getLabel("LBL_ERROR"),"error")}}))}get hidden(){return"Email"!==this.model.getField("campaigntask_type")}handleDisabled(){this.model.getField("activated")?this.disabled=!0:this.model.checkAccess("edit")&&"Email"===this.model.getField("campaigntask_type")&&this.model.getField("mailbox_id")?this.disabled=!!this.model.isEditing:this.disabled=!0}}return CampaignSendMailButton.ɵfac=function(t){return new(t||CampaignSendMailButton)(c.Y36(r.d),c.Y36(u.o),c.Y36(p.y),c.Y36(g.A),c.Y36(_.o))},CampaignSendMailButton.ɵcmp=c.Xpm({type:CampaignSendMailButton,selectors:[["campaign-send-mail-button"]],decls:6,vars:2,consts:[[1,"slds-grid","slds-grid--vertical-align-center"],[2,"min-width","26px"],[3,"sprite","icon","size","addclasses",4,"ngIf"],[3,"size","border",4,"ngIf"],["label","LBL_QUEUE"],[3,"sprite","icon","size","addclasses"],[3,"size","border"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0)(1,"div",1),c.YNc(2,y,1,4,"system-icon",2),c.YNc(3,x,1,2,"system-spinner",3),c.qZA(),c.TgZ(4,"span"),c._UZ(5,"system-label",4),c.qZA()()),2&t&&(c.xp6(2),c.Q6J("ngIf",!e.sending),c.xp6(1),c.Q6J("ngIf",e.sending))},dependencies:[i.O5,T.f,h._,b.W],encapsulation:2}),CampaignSendMailButton})();function L(t,e){1&t&&c._UZ(0,"system-icon",5),2&t&&c.Q6J("sprite","utility")("icon","email")("size","xx-small")("addclasses","")}function M(t,e){1&t&&c._UZ(0,"system-spinner",6),2&t&&c.Q6J("size",10)("border",1)}let Z=(()=>{class CampaignSendTestMailButton{constructor(t,e,s,i,a){this.language=t,this.model=e,this.modal=s,this.backend=i,this.toast=a,this.sending=!1,this.disabled=!0,this.model.mode$.subscribe((t=>{this.handleDisabled()})),this.model.data$.subscribe((t=>{this.handleDisabled()}))}execute(){let t=this.modal.await("LBL_SENDING");this.sending||(this.sending=!0,this.backend.postRequest(`module/CampaignTasks/${this.model.id}/sendtestmail`).subscribe({next:e=>{this.sending=!1,t.emit(!0),"success"==e.status?this.toast.sendToast(this.language.getLabel("LBL_TEST_MAILS_SENT"),"success"):this.toast.sendToast(this.language.getLabel("LBL_NO_TEST_TARGETS"),"error")},error:e=>{t.emit(!0),this.sending=!1,this.toast.sendToast(this.language.getLabel("LBL_ERROR"),"error")}}))}get hidden(){return"Email"!==this.model.getField("campaigntask_type")}handleDisabled(){this.model.getField("activated")?this.disabled=!0:this.model.checkAccess("edit")&&"Email"===this.model.getField("campaigntask_type")&&this.model.getField("mailbox_id")?this.disabled=!!this.model.isEditing:this.disabled=!0}}return CampaignSendTestMailButton.ɵfac=function(t){return new(t||CampaignSendTestMailButton)(c.Y36(r.d),c.Y36(u.o),c.Y36(_.o),c.Y36(p.y),c.Y36(g.A))},CampaignSendTestMailButton.ɵcmp=c.Xpm({type:CampaignSendTestMailButton,selectors:[["campaign-send-test-mail-button"]],decls:6,vars:2,consts:[[1,"slds-grid","slds-grid--vertical-align-center"],[2,"min-width","26px"],[3,"sprite","icon","size","addclasses",4,"ngIf"],[3,"size","border",4,"ngIf"],["label","LBL_SEND_TEST_EMAIL"],[3,"sprite","icon","size","addclasses"],[3,"size","border"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0)(1,"div",1),c.YNc(2,L,1,4,"system-icon",2),c.YNc(3,M,1,2,"system-spinner",3),c.qZA(),c.TgZ(4,"span"),c._UZ(5,"system-label",4),c.qZA()()),2&t&&(c.xp6(2),c.Q6J("ngIf",!e.sending),c.xp6(1),c.Q6J("ngIf",e.sending))},dependencies:[i.O5,T.f,h._,b.W],encapsulation:2}),CampaignSendTestMailButton})(),E=(()=>{class CampaignExportButton{constructor(t,e,s,i){this.language=t,this.model=e,this.injector=s,this.modal=i}execute(){this.modal.openModal("CampaignExportModal",!0,this.injector)}}return CampaignExportButton.ɵfac=function(t){return new(t||CampaignExportButton)(c.Y36(r.d),c.Y36(u.o),c.Y36(c.zs3),c.Y36(_.o))},CampaignExportButton.ɵcmp=c.Xpm({type:CampaignExportButton,selectors:[["campaign-export-button"]],decls:2,vars:0,consts:[["label","LBL_EXPORT"]],template:function(t,e){1&t&&(c.TgZ(0,"span"),c._UZ(1,"system-label",0),c.qZA())},dependencies:[h._],encapsulation:2}),CampaignExportButton})();var k=s(2656),A=s(9621),B=s(3499),w=s(5767),Y=s(1916);function I(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"div",9)(1,"div",10),c._uU(2),c.qZA(),c.TgZ(3,"button",11),c.NdJ("click",(function(){const e=c.CHM(t).$implicit,s=c.oxw();return c.KtG(s.downloadXLS(e.id))})),c._UZ(4,"system-button-icon",12),c._uU(5,"xls "),c.qZA(),c.TgZ(6,"button",11),c.NdJ("click",(function(){const e=c.CHM(t).$implicit,s=c.oxw();return c.KtG(s.downloadCSV(e.id))})),c._UZ(7,"system-button-icon",12),c._uU(8,"csv "),c.qZA()()}if(2&t){const t=e.$implicit;c.xp6(2),c.Oqu(t.name),c.xp6(1),c.Q6J("disabled",!t.xls),c.xp6(3),c.Q6J("disabled",!t.csv)}}let S=(()=>{class CampaignExportModal{constructor(t,e,s,i,a){this.language=t,this.model=e,this.backend=s,this.modal=i,this.toast=a,this.exportReports=[],this.backend.getRequest("module/CampaignTasks/export/reports").subscribe({next:t=>{this.exportReports=t},error:t=>{this.toast.sendToast(this.language.getLabel("LBL_ERROR"),"error")}})}close(){this.self.destroy()}downloadCSV(t){let e=this.modal.await(this.language.getLabel("LBL_DOWNLOADING"));this.backend.getDownloadPostRequestFile("module/KReports/plugins/action/kcsvexport/export",{record:t,parentbeanId:this.model.id,parentbeanModule:this.model.module}).subscribe({next:t=>{this.downloadURL(t,"csv"),e.emit(!0),this.close()},error:t=>{e.emit(!0)}})}downloadXLS(t){let e=this.modal.await(this.language.getLabel("LBL_DOWNLOADING"));this.backend.getDownloadPostRequestFile("module/KReports/plugins/action/kexcelexport/export",{record:t,parentbeanId:this.model.id,parentbeanModule:this.model.module}).subscribe({next:t=>{this.downloadURL(t,"xlsx"),e.emit(!0),this.close()},error:t=>{e.emit(!0)}})}downloadURL(t,e){let s=document.createElement("a");s.href=t,s.setAttribute("download",this.model.getField("name").replace(" ","_")+"_"+moment().format("YYYY_MM_DD_HH_mm_ss")+"."+e),document.body.appendChild(s),s.click(),document.body.removeChild(s)}}return CampaignExportModal.ɵfac=function(t){return new(t||CampaignExportModal)(c.Y36(r.d),c.Y36(u.o),c.Y36(p.y),c.Y36(_.o),c.Y36(g.A))},CampaignExportModal.ɵcmp=c.Xpm({type:CampaignExportModal,selectors:[["campaign-export-modal"]],decls:10,vars:1,consts:[["size","small"],[3,"close"],["label","LBL_EXPORT"],["label","LBL_CAMPAIGNTASK"],["margin","none"],[1,"slds-p-horizontal--small"],["class","slds-grid slds-grid--vertical-align-center slds-p-around--xx-small",4,"ngFor","ngForOf"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_CANCEL"],[1,"slds-grid","slds-grid--vertical-align-center","slds-p-around--xx-small"],[1,"slds-grow"],[1,"slds-button","slds-button--neutral",3,"disabled","click"],["icon","download"]],template:function(t,e){1&t&&(c.TgZ(0,"system-modal",0)(1,"system-modal-header",1),c.NdJ("close",(function(){return e.close()})),c._UZ(2,"system-label",2)(3,"system-label",3),c.qZA(),c.TgZ(4,"system-modal-content",4)(5,"div",5),c.YNc(6,I,9,3,"div",6),c.qZA()(),c.TgZ(7,"system-modal-footer")(8,"button",7),c.NdJ("click",(function(){return e.close()})),c._UZ(9,"system-label",8),c.qZA()()()),2&t&&(c.xp6(6),c.Q6J("ngForOf",e.exportReports))},dependencies:[i.sg,k.J,h._,A.j,B.x,w.p,Y.y],encapsulation:2}),CampaignExportModal})();var R=s(727),J=s(2294),U=s(1481),N=s(3634);function q(t,e){if(1&t&&c._UZ(0,"iframe",19),2&t){const t=c.oxw(2);c.Q6J("srcdoc",t.sanitizedHTML,c.oJD)}}const z=function(){return{fieldtype:"mailboxes",scope:"outboundmass"}},D=function(){return{fieldtype:"html",asiframe:!0,simplemode:!1,height:"250px"}};function O(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"div",1)(1,"ul",2)(2,"li",3),c.NdJ("click",(function(){c.CHM(t);const e=c.oxw();return c.KtG(e.setActiveTab("details"))})),c.TgZ(3,"a",4),c._UZ(4,"system-label",5),c.qZA()(),c.TgZ(5,"li",3),c.NdJ("click",(function(){c.CHM(t);const e=c.oxw();return c.KtG(e.setActiveTab("preview"))})),c.TgZ(6,"a",4),c._UZ(7,"system-label",6),c.qZA()()(),c.TgZ(8,"div",7)(9,"div",8),c._UZ(10,"field-container",9),c.TgZ(11,"div",10),c._UZ(12,"field-container",11),c.TgZ(13,"div",12)(14,"button",13),c.NdJ("click",(function(){c.CHM(t);const e=c.oxw();return c.KtG(e.copyFromTemplate())})),c._UZ(15,"system-button-icon",14)(16,"system-label",15),c.qZA()()(),c._UZ(17,"field-container",16),c.qZA(),c.TgZ(18,"div",17),c.YNc(19,q,1,1,"iframe",18),c.qZA()()()}if(2&t){const t=c.oxw();c.xp6(2),c.ekj("slds-active","details"==t.activeTab),c.xp6(3),c.ekj("slds-active","preview"==t.activeTab),c.xp6(4),c.ekj("slds-hide","details"!=t.activeTab),c.xp6(1),c.Q6J("fieldconfig",c.DdM(12,z)),c.xp6(4),c.Q6J("disabled",!t.view.isEditMode()),c.xp6(3),c.Q6J("fieldconfig",c.DdM(13,D)),c.xp6(1),c.ekj("slds-hide","preview"!=t.activeTab),c.xp6(1),c.Q6J("ngIf",t.sanitizedHTML)}}let Q=(()=>{class CampaignTaskEmailPanel{constructor(t,e,s,i,a,l,n,o){this.language=t,this.model=e,this.injector=s,this.view=i,this.sanitizer=a,this.backend=l,this.metadata=n,this.modal=o,this.componentconfig={},this.activeTab="details",this.subscription=new R.w0}get hidden(){return this.componentconfig.requiredmodelstate&&!this.model.checkModelState(this.componentconfig.requiredmodelstate)}ngOnInit(){this.setInitialValues(),this.setSanitizedHTMLValue(),this.subscribeToModelChanges()}ngOnDestroy(){this.subscription.unsubscribe()}buildHtmlDom(t,e){return`<html lang="en">\n                    <head>\n                        <style>${e.stylesheet}</style>\n                    </head>\n                    <body>\n                        <div>${e.header}</div>\n                        <div>${t||""}</div> \n                        <div>${e.footer}</div>\n                    </body>\n                </html>`}setInitialValues(){this.emailBody=this.model.getField("email_body"),this.mailboxId=this.model.getField("mailbox_id")}subscribeToModelChanges(){this.subscription.add(this.model.data$.subscribe((t=>{t.mailbox_id!==this.mailboxId&&(this.mailboxId=t.mailbox_id,this.loadMailboxData()),t.email_body!==this.emailBody&&(this.emailBody=t.email_body,this.setSanitizedHTMLValue())})))}copyFromTemplate(){this.modal.openModal("ObjectModalModuleLookup",!0,this.injector).subscribe((t=>{t.instance.module="EmailTemplates",t.instance.multiselect=!1,t.instance.selectedItems.subscribe((t=>{t.length&&(this.model.setField("email_subject",t[0].subject),this.model.setField("email_body",t[0].body_html),this.setSanitizedHTMLValue())}))}))}setActiveTab(t){this.activeTab=t}setSanitizedHTMLValue(){if(this.mailboxId){if(this.mailboxData){const t=this.buildHtmlDom(this.emailBody,this.mailboxData);this.sanitizedHTML=this.sanitizer.bypassSecurityTrustHtml(t)}}else this.sanitizedHTML=this.sanitizer.bypassSecurityTrustHtml(this.emailBody||"")}loadMailboxData(){this.mailboxId&&(this.mailboxData=void 0,this.backend.get("Mailboxes",this.mailboxId,"details").subscribe((t=>{t&&(this.mailboxData={header:t.mailbox_header||"",footer:t.mailbox_footer||"",stylesheet:this.metadata.getHtmlStylesheetCode(t.stylesheet)||""},this.setSanitizedHTMLValue())})))}}return CampaignTaskEmailPanel.ɵfac=function(t){return new(t||CampaignTaskEmailPanel)(c.Y36(r.d),c.Y36(u.o),c.Y36(c.zs3),c.Y36(J.e),c.Y36(U.H7),c.Y36(p.y),c.Y36(m.Pu),c.Y36(_.o))},CampaignTaskEmailPanel.ɵcmp=c.Xpm({type:CampaignTaskEmailPanel,selectors:[["campaign-task-email-panel"]],decls:1,vars:1,consts:[["class","slds-tabs--default slds-grid slds-grid--vertical",4,"ngIf"],[1,"slds-tabs--default","slds-grid","slds-grid--vertical"],["role","tablist",1,"slds-tabs--default__nav"],["role","presentation",1,"slds-tabs--default__item","slds-text-title--caps",3,"click"],["href","javascript:void(0);","role","tab","aria-selected","false",1,"slds-tabs--default__link"],["label","LBL_DETAILS"],["label","LBL_PREVIEW"],[1,"slds-grow"],[1,"slds-p-around--x-small","slds-height_full"],["field","mailbox_id","fielddisplayclass","slds-has-divider--bottom slds-p-vertical--x-small spice-fieldminheight",3,"fieldconfig"],[1,"slds-grid"],["field","email_subject","fielddisplayclass","slds-has-divider--bottom slds-p-vertical--x-small spice-fieldminheight",1,"slds-grow"],[1,"slds-align-bottom","slds-col--bump-left","slds-m-left--small","slds-p-bottom--xx-small"],[1,"slds-button","slds-button--neutral",3,"disabled","click"],["icon","copy","position","left"],["label","LBL_COPY_TEMPLATE"],["field","email_body","fielddisplayclass","slds-has-divider--bottom slds-p-vertical--x-small spice-fieldminheight",3,"fieldconfig"],[1,"slds-height_full"],["class","slds-size--1-of-1","style","height: 400px; border: 0; resize: vertical;","sandbox","",3,"srcdoc",4,"ngIf"],["sandbox","",1,"slds-size--1-of-1",2,"height","400px","border","0","resize","vertical",3,"srcdoc"]],template:function(t,e){1&t&&c.YNc(0,O,20,14,"div",0),2&t&&c.Q6J("ngIf",!e.hidden)},dependencies:[i.O5,N.j,k.J,h._],encapsulation:2}),CampaignTaskEmailPanel})();const F=function(){return{fieldtype:"enumalternate"}};let j=(()=>{class CampaignTaskAddModal{constructor(t,e,s,i){this.parent=t,this.model=e,this.view=s,this.modal=i,this.model.module="CampaignTasks",this.model.initialize(t),this.view.isEditable=!0,this.view.setEditMode("name")}save(){this.model.validate()&&this.model.save().subscribe((()=>{this.self.destroy()}))}close(){this.self.destroy()}}return CampaignTaskAddModal.ɵfac=function(t){return new(t||CampaignTaskAddModal)(c.Y36(u.o,4),c.Y36(u.o),c.Y36(J.e),c.Y36(_.o))},CampaignTaskAddModal.ɵcmp=c.Xpm({type:CampaignTaskAddModal,selectors:[["campaigntask-add-modal"]],features:[c._Bn([u.o,J.e])],decls:11,vars:2,consts:[["size","small"],[3,"close"],["label","LBL_CAMPAIGNTASK"],["field","name"],["field","campaigntask_type",3,"fieldconfig"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_CANCEL"],[1,"slds-button","slds-button--brand",3,"click"],["label","LBL_SAVE"]],template:function(t,e){1&t&&(c.TgZ(0,"system-modal",0)(1,"system-modal-header",1),c.NdJ("close",(function(){return e.close()})),c._UZ(2,"system-label",2),c.qZA(),c.TgZ(3,"system-modal-content"),c._UZ(4,"field-container",3)(5,"field-container",4),c.qZA(),c.TgZ(6,"system-modal-footer")(7,"button",5),c.NdJ("click",(function(){return e.close()})),c._UZ(8,"system-label",6),c.qZA(),c.TgZ(9,"button",7),c.NdJ("click",(function(){return e.save()})),c._UZ(10,"system-label",8),c.qZA()()()),2&t&&(c.xp6(5),c.Q6J("fieldconfig",c.DdM(1,F)))},dependencies:[N.j,h._,A.j,B.x,w.p,Y.y],encapsulation:2}),CampaignTaskAddModal})(),G=(()=>{class CampaignTaskAddButton{constructor(t,e,s,i){this.language=t,this.model=e,this.injector=s,this.modal=i}execute(){this.modal.openModal("CampaignTaskAddModal",!0,this.injector)}}return CampaignTaskAddButton.ɵfac=function(t){return new(t||CampaignTaskAddButton)(c.Y36(r.d),c.Y36(u.o),c.Y36(c.zs3),c.Y36(_.o))},CampaignTaskAddButton.ɵcmp=c.Xpm({type:CampaignTaskAddButton,selectors:[["campaigntask-add-button"]],decls:1,vars:0,consts:[["label","LBL_ADD_TAGRGET_LIST"]],template:function(t,e){1&t&&c._UZ(0,"system-label",0)},dependencies:[h._],encapsulation:2}),CampaignTaskAddButton})();var H=s(1553);const P=function(){return{label:"LBL_SUBJECT"}},$=function(){return{label:"LBL_LETTER_CONTENT",fieldtype:"richtext",asiframe:!0,simplemode:!0,height:"250px"}};function X(t,e){1&t&&(c.TgZ(0,"system-collapsable-tab",1)(1,"div",2),c._UZ(2,"field-container",3)(3,"field-container",4)(4,"field-container",5),c.qZA()()),2&t&&(c.xp6(3),c.Q6J("fieldconfig",c.DdM(2,P)),c.xp6(1),c.Q6J("fieldconfig",c.DdM(3,$)))}let V=(()=>{class CampaignTaskMailMergePanel{constructor(t,e,s,i,a,l,n,o){this.language=t,this.model=e,this.injector=s,this.view=i,this.sanitizer=a,this.backend=l,this.metadata=n,this.modal=o,this.componentconfig={},this.activeTab="details",this.subscription=new R.w0}get hidden(){return"mailmerge"!=this.model.getField("campaigntask_type")}ngOnInit(){}ngOnDestroy(){this.subscription.unsubscribe()}setActiveTab(t){this.activeTab=t}}return CampaignTaskMailMergePanel.ɵfac=function(t){return new(t||CampaignTaskMailMergePanel)(c.Y36(r.d),c.Y36(u.o),c.Y36(c.zs3),c.Y36(J.e),c.Y36(U.H7),c.Y36(p.y),c.Y36(m.Pu),c.Y36(_.o))},CampaignTaskMailMergePanel.ɵcmp=c.Xpm({type:CampaignTaskMailMergePanel,selectors:[["campaign-task-email-panel"]],decls:1,vars:1,consts:[["title","LBL_MAILMERGE",4,"ngIf"],["title","LBL_MAILMERGE"],[1,"slds-p-horizontal--xx-small"],["field","output_template_name","fielddisplayclass","slds-has-divider--bottom slds-p-vertical--x-small spice-fieldminheight"],["field","email_subject","fielddisplayclass","slds-has-divider--bottom slds-p-vertical--x-small spice-fieldminheight",3,"fieldconfig"],["field","email_body","fielddisplayclass","slds-has-divider--bottom slds-p-vertical--x-small spice-fieldminheight",3,"fieldconfig"]],template:function(t,e){1&t&&c.YNc(0,X,5,4,"system-collapsable-tab",0),2&t&&c.Q6J("ngIf",!e.hidden)},dependencies:[i.O5,N.j,H.z],encapsulation:2}),CampaignTaskMailMergePanel})(),W=(()=>{class CampaignTaskMailergeButton{constructor(t,e,s){this.model=t,this.injector=e,this.modal=s}get hidden(){return"mailmerge"!=this.model.getField("campaigntask_type")}get disabled(){return!this.model.getField("output_template_id")||this.model.isEditing||this.model.getField("activated")}execute(){this.modal.openModal("CampaignTaskMailMergeModal",!0,this.injector)}}return CampaignTaskMailergeButton.ɵfac=function(t){return new(t||CampaignTaskMailergeButton)(c.Y36(u.o),c.Y36(c.zs3),c.Y36(_.o))},CampaignTaskMailergeButton.ɵcmp=c.Xpm({type:CampaignTaskMailergeButton,selectors:[["campaigntask-mailmerge-button"]],decls:1,vars:0,consts:[["label","LBL_MAILMERGE"]],template:function(t,e){1&t&&c._UZ(0,"system-label",0)},dependencies:[h._],encapsulation:2}),CampaignTaskMailergeButton})();var K=s(6625),tt=s(2646),et=s(5621),st=s(151);function it(t,e){if(1&t&&c._UZ(0,"object",30),2&t){const t=c.oxw();c.Q6J("data",t.blobUrl,c.uOi)}}function at(t,e){1&t&&(c.TgZ(0,"div",31),c._UZ(1,"system-spinner"),c.qZA())}function lt(t,e){1&t&&(c.TgZ(0,"div",31)(1,"system-illustration-no-data"),c._UZ(2,"system-label",32),c.qZA()())}let nt=(()=>{class CampaignTaskMailMergeModal{constructor(t,e,s,i,a,l,n){this.language=t,this.model=e,this.backend=s,this.modal=i,this.sanitizer=a,this.configuration=l,this.toast=n,this.totalCount=0,this.start=1,this.inactiveCount=0,this.loading=!1,this.getCount(),this.pdfLimitConf=this.configuration.getCapabilityConfig("campaigntasks").pdflimit}ngOnInit(){const t=this.configuration.getCapabilityConfig("campaigntasks").pdflimit;this.limit=t?parseInt(t,10):100}getCount(){this.backend.getRequest(`module/CampaignTasks/${this.model.id}/targetcount`).subscribe((t=>{this.totalCount=parseInt(t.count,10),this.totalCount<this.limit&&(this.limit=this.totalCount)}))}get canGenerate(){return this.totalCount>0&&this.start&&this.start>0&&this.start<=this.totalCount&&this.limit&&this.limit>0&&this.start+this.limit-1<=this.totalCount&&this.limit<=this.pdfLimitConf}checkLimit(){this.limit>this.configuration.getCapabilityConfig("campaigntasks").pdflimit&&this.toast.sendToast(this.language.getLabel("LBL_QUANTITY_HIGHER_THAN")+" "+this.pdfLimitConf,"error")}rendertemplate(){this.blobUrl=null,this.loading=!0,this.backend.getRequest(`module/CampaignTasks/${this.model.id}/mailmerge`,{start:this.start-1,limit:this.limit}).subscribe({next:t=>{this.pdf=t.content,this.inactiveCount=t.inactiveCount;let e=this.datatoBlob(atob(t.content));this.blobUrl=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(e)),this.loading=!1},error:()=>{this.loading=!1}})}datatoBlob(t,e="",s=512){let i=[];for(let e=0;e<t.length;e+=s){let a=t.slice(e,e+s),l=new Array(a.length);for(let t=0;t<a.length;t++)l[t]=a.charCodeAt(t);let n=new Uint8Array(l);i.push(n)}return new Blob(i,{type:e})}download(){let t=document.createElement("a");document.body.appendChild(t);let e=this.datatoBlob(atob(this.pdf)),s=URL.createObjectURL(e);t.href=s,t.type="application/pdf";let i=`${this.model.getField("name")}_pages_${this.start}_to_${this.start+this.limit-1}.pdf`;t.download=i,t.click(),t.remove()}close(){this.self.destroy()}}return CampaignTaskMailMergeModal.ɵfac=function(t){return new(t||CampaignTaskMailMergeModal)(c.Y36(r.d),c.Y36(u.o),c.Y36(p.y),c.Y36(_.o),c.Y36(U.H7),c.Y36(K.C),c.Y36(g.A))},CampaignTaskMailMergeModal.ɵcmp=c.Xpm({type:CampaignTaskMailMergeModal,selectors:[["campaigntask-mailerge-modal"]],decls:35,vars:16,consts:[["size","large"],[3,"close"],["label","LBL_MAILMERGE"],["margin","none"],[1,"slds-p-around--small"],[1,"slds-grid","slds-grid--vertical-align-center","slds-p-bottom--small"],["label","LBL_LIMIT",1,"slds-p-horizontal--x-small"],[1,"slds-text-body--regular","slds-truncate","slds-p-horizontal--x-small"],[1,"slds-grid","slds-grid--vertical-align-center"],["label","LBL_START",1,"slds-p-horizontal--x-small"],[1,"slds-p-horizontal--x-small",3,"asNumber","precision","ngModel","ngModelChange"],["label","LBL_COUNT",1,"slds-p-horizontal--x-small"],[1,"slds-p-horizontal--x-small",3,"asNumber","precision","ngModel","change","ngModelChange"],["label","LBL_TOTAL",1,"slds-p-horizontal--x-small"],[1,"slds-p-horizontal--x-small",3,"disabled","precision","ngModel"],["system-title","LBL_MAILMERGE",1,"slds-col--bump-left","slds-button","slds-button_neutral",3,"disabled","click"],["addclasses","slds-button__icon slds-button__icon_left","icon","print"],["label","LBL_GENERATE"],[1,"slds-grid",2,"height","70vh"],[1,"slds-p-horizontal--small","slds-p-bottom--small","slds-size--1-of-1"],[1,"slds-border--top","slds-border--right","slds-border--left","slds-border--bottom",2,"width","100%","height","100%"],["type","application/pdf","width","100%","height","100%",3,"data",4,"ngIf"],["class","slds-align--absolute-center","style","height: 100%;",4,"ngIf"],[1,"slds-grid","slds-grid_vertical-align-center"],["label","LBL_EXCLUDED_INACTIVE",1,"slds-p-horizontal--x-small"],[1,"slds-col","slds-col_bump-right"],[1,"slds-button","slds-button--neutral",3,"disabled","click"],["label","LBL_DOWNLOAD"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_CANCEL"],["type","application/pdf","width","100%","height","100%",3,"data"],[1,"slds-align--absolute-center",2,"height","100%"],["label","LBL_NO_PDF_GENERATED"]],template:function(t,e){1&t&&(c.TgZ(0,"system-modal",0)(1,"system-modal-header",1),c.NdJ("close",(function(){return e.close()})),c._UZ(2,"system-label",2),c.qZA(),c.TgZ(3,"system-modal-content",3)(4,"div",4)(5,"div",5),c._UZ(6,"system-label",6),c.TgZ(7,"p",7),c._uU(8),c.qZA()(),c.TgZ(9,"div",8),c._UZ(10,"system-label",9),c.TgZ(11,"system-input-number",10),c.NdJ("ngModelChange",(function(t){return e.start=t})),c.qZA(),c._UZ(12,"system-label",11),c.TgZ(13,"system-input-number",12),c.NdJ("change",(function(){return e.checkLimit()}))("ngModelChange",(function(t){return e.limit=t})),c.qZA(),c._UZ(14,"system-label",13)(15,"system-input-number",14),c.TgZ(16,"button",15),c.NdJ("click",(function(){return e.rendertemplate()})),c._UZ(17,"system-button-icon",16)(18,"system-label",17),c.qZA()()(),c.TgZ(19,"div",18)(20,"div",19)(21,"div",20),c.YNc(22,it,1,1,"object",21),c.YNc(23,at,2,0,"div",22),c.YNc(24,lt,3,0,"div",22),c.qZA()()()(),c.TgZ(25,"system-modal-footer")(26,"div",23),c._UZ(27,"system-label",24),c.TgZ(28,"p",7),c._uU(29),c.qZA(),c.TgZ(30,"div",25)(31,"button",26),c.NdJ("click",(function(){return e.download()})),c._UZ(32,"system-label",27),c.qZA(),c.TgZ(33,"button",28),c.NdJ("click",(function(){return e.close()})),c._UZ(34,"system-label",29),c.qZA()()()()()),2&t&&(c.xp6(8),c.Oqu(e.pdfLimitConf),c.xp6(3),c.Q6J("asNumber",!0)("precision",0)("ngModel",e.start),c.xp6(2),c.Q6J("asNumber",!0)("precision",0)("ngModel",e.limit),c.xp6(2),c.Q6J("disabled",!0)("precision",0)("ngModel",e.totalCount),c.xp6(1),c.Q6J("disabled",!e.canGenerate),c.xp6(6),c.Q6J("ngIf",e.blobUrl),c.xp6(1),c.Q6J("ngIf",e.loading),c.xp6(1),c.Q6J("ngIf",!e.blobUrl&&!e.loading),c.xp6(5),c.Oqu(e.inactiveCount),c.xp6(2),c.Q6J("disabled",!e.pdf||e.loading))},dependencies:[i.O5,a.JJ,a.On,k.J,tt.t,et.i,h._,A.j,B.x,w.p,Y.y,b.W,st.S],encapsulation:2}),CampaignTaskMailMergeModal})();var ot=s(4357);let dt=(()=>{class EventRegistrationButton{constructor(t,e,s,i){this.language=t,this.model=e,this.injector=s,this.modal=i,this.subscriptions=new R.w0}ngOnDestroy(){this.subscriptions.unsubscribe()}get module(){return this.model.getField("module_name")}get placeholder(){return this.module?this.language.getModuleCombinedLabel("LBL_SEARCH",this.module):this.language.getLabel("LBL_SEARCH")}execute(){this.modal.openModal("EventRegistrationModal",!0,this.injector)}}return EventRegistrationButton.ɵfac=function(t){return new(t||EventRegistrationButton)(c.Y36(r.d),c.Y36(u.o),c.Y36(c.zs3),c.Y36(_.o))},EventRegistrationButton.ɵcmp=c.Xpm({type:EventRegistrationButton,selectors:[["event-registration-button"]],decls:1,vars:0,consts:[["label","LBL_ADD_FROM_TARGETLISTS"]],template:function(t,e){1&t&&c._UZ(0,"system-label",0)},dependencies:[h._],encapsulation:2}),EventRegistrationButton})();var ct=s(6163),rt=s(6040),mt=s(1058),ut=s(4021),gt=s(2644),pt=s(6857),ht=s(6059),bt=s(2161);const ft=["tablecontent"];function vt(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"tr",6),c.NdJ("click",(function(e){const s=c.CHM(t).$implicit,i=c.oxw();return c.KtG(i.clickRow(e,s))})),c.qZA()}if(2&t){const t=e.$implicit,s=c.oxw();c.Q6J("listItem",t)("showActionMenu",!1)("rowselect",s.multiselect)("displaylinks",!1)}}function _t(t,e){if(1&t&&c._UZ(0,"tbody",7),2&t){const t=c.oxw();c.Q6J("columns",null==t.modellist.listfields?null:t.modellist.listfields.length)("select",t.multiselect)("tools",!1)("rows",10)}}const Tt=function(t,e){return{"slds-no-row-hover":t,singleselect:e}};let yt=(()=>{class EventRegistrationModalList{constructor(t,e,s,i){this.language=t,this.injector=e,this.modal=s,this.modellist=i,this.subscriptions=new R.w0,this.multiselect=!0,this.selectedItems=new c.vpe}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.modellist.useCache=!1,this.modellist.initialize("ProspectLists"),this.modellist.getListData()}selectItems(){this.selectedItems.emit(this.modellist.getSelectedItems())}clickRow(t,e){this.selectedItems.emit([e])}onScroll(t){let e=this.tablecontent.element.nativeElement;e.scrollTop+e.clientHeight+50>e.scrollHeight&&this.modellist.loadMoreList()}}return EventRegistrationModalList.ɵfac=function(t){return new(t||EventRegistrationModalList)(c.Y36(r.d),c.Y36(c.zs3),c.Y36(_.o),c.Y36(gt.t))},EventRegistrationModalList.ɵcmp=c.Xpm({type:EventRegistrationModalList,selectors:[["event-registration-modal-list"]],viewQuery:function(t,e){if(1&t&&c.Gf(ft,7,c.s_b),2&t){let t;c.iGM(t=c.CRH())&&(e.tablecontent=t.first)}},outputs:{selectedItems:"selectedItems"},features:[c._Bn([gt.t])],decls:8,vars:8,consts:[[1,"slds-scrollable--y","slds-height_full",3,"scroll"],["tablecontent",""],["role","listbox",1,"slds-table","slds-table--fixed-layout","slds-table--bordered","slds-max-medium-table--stacked-horizontal",3,"ngClass"],["object-list-header","",3,"showSelectColumn","showRowActionMenu"],["object-list-item","","class","slds-hint-parent slds-p-horizontal--x-small",3,"listItem","showActionMenu","rowselect","displaylinks","click",4,"ngFor","ngForOf"],["system-table-stencils","",3,"columns","select","tools","rows",4,"ngIf"],["object-list-item","",1,"slds-hint-parent","slds-p-horizontal--x-small",3,"listItem","showActionMenu","rowselect","displaylinks","click"],["system-table-stencils","",3,"columns","select","tools","rows"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0,1),c.NdJ("scroll",(function(t){return e.onScroll(t)})),c.TgZ(2,"table",2)(3,"thead"),c._UZ(4,"tr",3),c.qZA(),c.TgZ(5,"tbody"),c.YNc(6,vt,1,4,"tr",4),c.qZA(),c.YNc(7,_t,1,4,"tbody",5),c.qZA()()),2&t&&(c.xp6(2),c.Q6J("ngClass",c.WLB(5,Tt,e.multiselect,!e.multiselect)),c.xp6(2),c.Q6J("showSelectColumn",e.multiselect)("showRowActionMenu",!1),c.xp6(2),c.Q6J("ngForOf",e.modellist.listData.list),c.xp6(1),c.Q6J("ngIf",e.modellist.isLoading))},dependencies:[i.mk,i.sg,i.O5,pt.B,ht.p,bt.x],encapsulation:2}),EventRegistrationModalList})();var xt=s(9062);let Ct=(()=>{class EventRegistrationModalType{constructor(t,e,s){this.metadata=t,this.view=e,this.model=s,this.loadComponentConfig()}loadComponentConfig(){let t=this.metadata.getComponentConfig("EventRegistrationModalType","EventRegistrations");this.fieldset=t.fieldset,this.view.isEditable=!0,this.view.setEditMode()}}return EventRegistrationModalType.ɵfac=function(t){return new(t||EventRegistrationModalType)(c.Y36(m.Pu),c.Y36(J.e),c.Y36(u.o))},EventRegistrationModalType.ɵcmp=c.Xpm({type:EventRegistrationModalType,selectors:[["event-registration-modal-type"]],features:[c._Bn([J.e])],decls:1,vars:1,consts:[["direction","vertical",3,"fieldset"]],template:function(t,e){1&t&&c._UZ(0,"object-record-fieldset",0),2&t&&c.Q6J("fieldset",e.fieldset)},dependencies:[xt.d],encapsulation:2}),EventRegistrationModalType})();function Lt(t,e){1&t&&c._UZ(0,"system-button-icon",24),2&t&&c.Q6J("icon","success")}const Mt=function(t){return{"slds-button--icon slds-progress__marker--icon":t}};function Zt(t,e){if(1&t&&(c.TgZ(0,"li",20)(1,"button",21)(2,"span",22),c._uU(3),c.qZA(),c.YNc(4,Lt,1,1,"system-button-icon",23),c.qZA()()),2&t){const t=e.$implicit,s=c.oxw();c.Q6J("ngClass",s.getStepClass(t)),c.xp6(1),c.Q6J("ngClass",c.VKq(4,Mt,s.getStepComplete(t))),c.xp6(2),c.Oqu(t),c.xp6(1),c.Q6J("ngIf",s.getStepComplete(t))}}function Et(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"button",25),c.NdJ("click",(function(){c.CHM(t);const e=c.oxw();return c.KtG(e.nextStep())})),c._UZ(1,"system-label",26),c.qZA()}}function kt(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"button",27),c.NdJ("click",(function(){c.CHM(t);const e=c.oxw();return c.KtG(e.save())})),c._UZ(1,"system-label",28),c.qZA()}}function At(t,e){if(1&t){const t=c.EpF();c.ynx(0),c.TgZ(1,"event-registration-modal-list",29),c.NdJ("selectedItems",(function(e){c.CHM(t);const s=c.oxw();return c.KtG(s.fetchListData(e))})),c.qZA(),c._UZ(2,"event-registration-modal-type",30),c.BQk()}if(2&t){const t=c.oxw();c.xp6(1),c.Q6J("hidden",0!==t.currentStep),c.xp6(1),c.Q6J("hidden",1!==t.currentStep)}}let Bt=(()=>{class EventRegistrationModal{constructor(t,e,s,i,a,l){this.model=t,this.metadata=e,this.backend=s,this.eventModel=i,this.modelutilities=a,this.relatedmodels=l,this.currentStep=0,this.totalSteps=["ProspectLists","EventRegistrations"],this.holdListData=[],this.model.module="EventRegistrations",this.model.initialize(),this.model.startEdit()}getStepClass(t){let e=this.totalSteps.indexOf(t);return e==this.currentStep?"slds-is-active":e<this.currentStep?"slds-is-completed":void 0}fetchListData(t){this.holdListData.push(t[0].id)}getStepComplete(t){return this.totalSteps.indexOf(t)<this.currentStep}prevStep(){this.currentStep>0&&this.currentStep--}showNext(){return this.currentStep<this.totalSteps.length-1}showSave(){return this.currentStep==this.totalSteps.length-1}nextStep(){this.currentStep++}save(){let t={targetListIds:this.holdListData,registrationData:this.modelutilities.spiceModel2backend(this.model.module,this.model.data),eventId:this.eventModel.id};this.backend.postRequest(`module/Events/${this.eventModel.id}/registrations`,{},t).subscribe((t=>{this.relatedmodels.relatedModule="EventRegistrations",this.relatedmodels.getData(),this.closeModal()}))}closeModal(){this.self.destroy()}onModalEscX(){this.closeModal()}}return EventRegistrationModal.ɵfac=function(t){return new(t||EventRegistrationModal)(c.Y36(u.o),c.Y36(m.Pu),c.Y36(p.y),c.Y36(u.o,4),c.Y36(ct.A),c.Y36(rt.j))},EventRegistrationModal.ɵcmp=c.Xpm({type:EventRegistrationModal,selectors:[["event-registration-modal"]],features:[c._Bn([u.o])],decls:23,vars:9,consts:[[3,"close"],["label","LBL_ADD_FROM_TARGETLISTS"],[1,"slds-scrollable_none",3,"system-modal-content-grow"],[1,"slds-page-header"],[1,"slds-grid"],[1,"slds-col","slds-has-flexi-truncate"],[1,"slds-media","slds-no-space","slds-grow"],[3,"module"],[1,"slds-media__body"],[1,"slds-page-header__title","slds-m-right--small","slds-align-middle","slds-truncate"],[1,"slds-grid","slds-grid--align-spread","slds-p-around--small","slds-theme--shade","slds-border--bottom"],[1,"slds-button","slds-button--neutral",3,"disabled","click"],["label","LBL_PREVIOUS"],[1,"slds-progress","slds-progress--shade"],[1,"slds-progress__list"],["class","slds-progress__item",3,"ngClass",4,"ngFor","ngForOf"],["class","slds-button slds-button--neutral",3,"click",4,"ngIf"],["class","slds-button slds-button--brand",3,"click",4,"ngIf"],["system-to-bottom","",1,"slds-scrollable--y",3,"system-overlay-loading-spinner"],[4,"ngIf"],[1,"slds-progress__item",3,"ngClass"],[1,"slds-button","slds-progress__marker",3,"ngClass"],[1,"slds-assistive-text"],[3,"icon",4,"ngIf"],[3,"icon"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_NEXT"],[1,"slds-button","slds-button--brand",3,"click"],["label","LBL_SAVE"],[3,"hidden","selectedItems"],[3,"hidden"]],template:function(t,e){1&t&&(c.TgZ(0,"system-modal")(1,"system-modal-header",0),c.NdJ("close",(function(){return e.closeModal()})),c._UZ(2,"system-label",1),c.qZA(),c.TgZ(3,"system-modal-content",2)(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6),c._UZ(8,"system-icon",7),c.TgZ(9,"div",8)(10,"div")(11,"h1",9),c._uU(12),c.qZA()()()()()()(),c.TgZ(13,"div",10)(14,"button",11),c.NdJ("click",(function(){return e.prevStep()})),c._UZ(15,"system-label",12),c.qZA(),c.TgZ(16,"div",13)(17,"ol",14),c.YNc(18,Zt,5,6,"li",15),c.qZA()(),c.YNc(19,Et,2,0,"button",16),c.YNc(20,kt,2,0,"button",17),c.qZA(),c.TgZ(21,"div",18),c.YNc(22,At,3,2,"ng-container",19),c.qZA()()()),2&t&&(c.xp6(3),c.Q6J("system-modal-content-grow",!1),c.xp6(5),c.Q6J("module","Events"),c.xp6(4),c.Oqu(e.eventModel.data.summary_text),c.xp6(2),c.Q6J("disabled",e.model.isLoading||0==e.currentStep),c.xp6(4),c.Q6J("ngForOf",e.totalSteps),c.xp6(1),c.Q6J("ngIf",e.showNext()),c.xp6(1),c.Q6J("ngIf",e.showSave()),c.xp6(1),c.Q6J("system-overlay-loading-spinner",e.model.isLoading),c.xp6(1),c.Q6J("ngIf",!e.model.isLoading))},dependencies:[i.mk,i.sg,i.O5,k.J,T.f,h._,A.j,B.x,Y.y,mt.H,ut._,yt,Ct],encapsulation:2}),EventRegistrationModal})();function wt(t,e){1&t&&(c.TgZ(0,"div",3),c._UZ(1,"system-spinner",4),c.qZA()),2&t&&(c.xp6(1),c.Q6J("size",12))}let Yt=(()=>{class EventWithCampaignActivateButton{constructor(t,e,s,i,a){this.language=t,this.metadata=e,this.model=s,this.toast=i,this.backend=a,this.activating=!1,this.disabled=!0,this.model.mode$.subscribe((t=>{this.handleDisabled()})),this.model.data$.subscribe((t=>{this.handleDisabled()}))}handleDisabled(){"EventWithCampaign"===this.model.getField("campaigntask_type")?this.model.getFieldValue("activated")?this.disabled=!0:this.disabled=!!this.model.isEditing:this.disabled=!0}execute(){this.activating||(this.activating=!0,this.backend.postRequest(`module/CampaignTasks/${this.model.id}/activateEventTask`,{}).subscribe((t=>{this.activating=!1,t.success?(this.toast.sendToast("Created"),this.model.setField("activated",!0)):this.toast.sendToast("Error")})))}}return EventWithCampaignActivateButton.ɵfac=function(t){return new(t||EventWithCampaignActivateButton)(c.Y36(r.d),c.Y36(m.Pu),c.Y36(u.o),c.Y36(g.A),c.Y36(p.y))},EventWithCampaignActivateButton.ɵcmp=c.Xpm({type:EventWithCampaignActivateButton,selectors:[["event-with-campaign-activate-button"]],decls:4,vars:1,consts:[[1,"slds-grid","slds-grid--vertical-align-center"],["class","slds-p-right--x-small",4,"ngIf"],["label","LBL_ACTIVATE_REGISTRATIONS_CAMPAIGNLOG"],[1,"slds-p-right--x-small"],[3,"size"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.YNc(1,wt,2,1,"div",1),c.TgZ(2,"span"),c._UZ(3,"system-label",2),c.qZA()()),2&t&&(c.xp6(1),c.Q6J("ngIf",e.activating))},dependencies:[i.O5,h._,b.W],encapsulation:2}),EventWithCampaignActivateButton})(),It=(()=>{class ModuleCampaigns{}return ModuleCampaigns.ɵfac=function(t){return new(t||ModuleCampaigns)},ModuleCampaigns.ɵmod=c.oAB({type:ModuleCampaigns}),ModuleCampaigns.ɵinj=c.cJS({imports:[i.ez,a.u5,l.ObjectFields,n.GlobalComponents,o.ObjectComponents,d.SystemComponents,ot.o]}),ModuleCampaigns})();("undefined"==typeof ngJitMode||ngJitMode)&&c.kYT(It,{declarations:[v,C,Z,E,S,Q,G,j,V,W,nt,dt,Bt,yt,Ct,Yt],imports:[i.ez,a.u5,l.ObjectFields,n.GlobalComponents,o.ObjectComponents,d.SystemComponents,ot.o]})}}]);