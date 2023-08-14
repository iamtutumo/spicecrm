/*!
 * 
 *                     aacService
 *
 *                     release: 2023.01.001
 *
 *                     date: 2023-08-14 15:14:26
 *
 *                     build: 2023.01.001.1692018866666
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_googleapi_modulegoogleapi_ts"],{8725:(e,s,o)=>{o.r(s),o.d(s,{ModuleGoogleAPI:()=>y});var l=o(6895),t=o(433),a=o(4357),n=o(3190),i=o(4826),c=o(6490),g=o(3735),d=o(1571),r=o(5329),u=o(4154),p=o(4505),m=o(3278),h=o(4044),_=o(7514),b=o(3463),f=o(3194),v=o(4021);let L=(()=>{class GoogleAPISettings{constructor(e,s,o,l,t){this.language=e,this.metadata=s,this.backend=o,this.toast=l,this.modal=t,this.configvalues={},this.loading=!1,this.serviceuserscope={calendar:!1,gmail_radonly:!1,gmail_compose:!1,gmail_modify:!1,contacts:!1}}ngOnInit(){this.loading=!0,this.backend.getRequest("configuration/configurator/editor/googleapi").subscribe((e=>{this.configvalues=e,this.loadScope(),this.loading=!1}))}save(){this.backend.postRequest("configuration/configurator/editor/googleapi",[],{config:this.configvalues}).subscribe({next:()=>this.toast.sendToast(this.language.getLabel("LBL_DATA_SAVED"),"success"),error:()=>this.toast.sendToast(this.language.getLabel("ERR_FAILED_TO_EXECUTE"),"error")})}loadScope(){let e=[];this.configvalues.hasOwnProperty("serviceuserscope")&&(e=this.configvalues.serviceuserscope.split(" "));for(let s of e)switch(s){case"https://www.googleapis.com/auth/calendar":this.serviceuserscope.calendar=!0;break;case"https://www.googleapis.com/auth/contacts":this.serviceuserscope.contacts=!0;break;case"https://www.googleapis.com/auth/gmail.readonly":this.serviceuserscope.gmail_radonly=!0;break;case"https://www.googleapis.com/auth/gmail.compose":this.serviceuserscope.gmail_compose=!0;break;case"https://www.googleapis.com/auth/gmail.modify":this.serviceuserscope.gmail_modify=!0}}setScope(){let e=[];this.serviceuserscope.calendar&&e.push("https://www.googleapis.com/auth/calendar"),this.serviceuserscope.contacts&&e.push("https://www.googleapis.com/auth/contacts"),this.serviceuserscope.gmail_radonly&&e.push("https://www.googleapis.com/auth/gmail.readonly"),this.serviceuserscope.gmail_compose&&e.push("https://www.googleapis.com/auth/gmail.compose"),this.serviceuserscope.gmail_modify&&e.push("https://www.googleapis.com/auth/gmail.modify"),this.configvalues.serviceuserscope=e.join(" ")}}return GoogleAPISettings.ɵfac=function(e){return new(e||GoogleAPISettings)(d.Y36(r.d),d.Y36(u.Pu),d.Y36(p.y),d.Y36(m.A),d.Y36(h.o))},GoogleAPISettings.ɵcmp=d.Xpm({type:GoogleAPISettings,selectors:[["ng-component"]],decls:37,vars:23,consts:[[1,"slds-grid","slds-grid_vertical-align-center","slds-grid--align-spread","slds-p-around--small","slds-border--bottom"],[1,"slds-text-heading_medium"],["label","LBL_GOOGLEAPI_SETTINGS"],[1,"slds-button","slds-button--brand",3,"click"],["label","LBL_SAVE"],["system-to-bottom-noscroll","",1,"slds-p-horizontal--small","slds-theme--default",3,"system-overlay-loading-spinner"],[1,"slds-grid","slds-grid--vertical-align-center","slds-p-vertical--xx-small"],["label","LBL_GOOGLE_MAPS_KEY",1,"slds-size--1-of-4"],["type","text",1,"slds-input","slds-grow",3,"disabled","ngModel","ngModelChange"],["label","LBL_GOOGLE_TRANSLATE_KEY",1,"slds-size--1-of-4"],["label","LBL_GOOGLE_CLIENTID",1,"slds-size--1-of-4"],[1,"slds-grid","slds-p-vertical--xx-small"],["label","LBL_GOOGLE_CLIENTJSON",1,"slds-size--1-of-4","slds-p-vertical--xx-small"],["rows","7",1,"slds-input","slds-grow",3,"disabled","ngModel","ngModelChange"],["label","LBL_GOOGLE_SERVICEUSERKEY",1,"slds-size--1-of-4","slds-p-vertical--xx-small"],["label","LBL_GOOGLE_SERVICEUSERSCOPE",1,"slds-size--1-of-4","slds-p-vertical--xx-small"],[1,"slds-grow","slds-form-element__control"],[3,"ngModel","disabled","ngModelChange","change"],["label","LBL_GOOGLE_CALENDAR"],["label","LBL_GOOGLE_GMAIL_READONLY"],["label","LBL_GOOGLE_GMAIL_COMPOSE"],["label","LBL_GOOGLE_GMAIL_MODIFY"],["label","LBL_GOOGLE_CONTACTS"],["label","LBL_GOOGLE_NOTIFICATIONHOST",1,"slds-size--1-of-4"]],template:function(e,s){1&e&&(d.TgZ(0,"div",0)(1,"h2",1),d._UZ(2,"system-label",2),d.qZA(),d.TgZ(3,"button",3),d.NdJ("click",(function(){return s.save()})),d._UZ(4,"system-label",4),d.qZA()(),d.TgZ(5,"div",5)(6,"div",6),d._UZ(7,"system-label",7),d.TgZ(8,"input",8),d.NdJ("ngModelChange",(function(e){return s.configvalues.mapskey=e})),d.qZA()(),d.TgZ(9,"div",6),d._UZ(10,"system-label",9),d.TgZ(11,"input",8),d.NdJ("ngModelChange",(function(e){return s.configvalues.languagekey=e})),d.qZA()(),d.TgZ(12,"div",6),d._UZ(13,"system-label",10),d.TgZ(14,"input",8),d.NdJ("ngModelChange",(function(e){return s.configvalues.clientid=e})),d.qZA()(),d.TgZ(15,"div",11),d._UZ(16,"system-label",12),d.TgZ(17,"textarea",13),d.NdJ("ngModelChange",(function(e){return s.configvalues.calendarconfig=e})),d.qZA()(),d.TgZ(18,"div",11),d._UZ(19,"system-label",14),d.TgZ(20,"textarea",13),d.NdJ("ngModelChange",(function(e){return s.configvalues.serviceuserkey=e})),d.qZA()(),d.TgZ(21,"div",11),d._UZ(22,"system-label",15),d.TgZ(23,"div",16)(24,"system-checkbox",17),d.NdJ("ngModelChange",(function(e){return s.serviceuserscope.calendar=e}))("change",(function(){return s.setScope()})),d._UZ(25,"system-label",18),d.qZA(),d.TgZ(26,"system-checkbox",17),d.NdJ("ngModelChange",(function(e){return s.serviceuserscope.gmail_radonly=e}))("change",(function(){return s.setScope()})),d._UZ(27,"system-label",19),d.qZA(),d.TgZ(28,"system-checkbox",17),d.NdJ("ngModelChange",(function(e){return s.serviceuserscope.gmail_compose=e}))("change",(function(){return s.setScope()})),d._UZ(29,"system-label",20),d.qZA(),d.TgZ(30,"system-checkbox",17),d.NdJ("ngModelChange",(function(e){return s.serviceuserscope.gmail_modify=e}))("change",(function(){return s.setScope()})),d._UZ(31,"system-label",21),d.qZA(),d.TgZ(32,"system-checkbox",17),d.NdJ("ngModelChange",(function(e){return s.serviceuserscope.contacts=e}))("change",(function(){return s.setScope()})),d._UZ(33,"system-label",22),d.qZA()()(),d.TgZ(34,"div",6),d._UZ(35,"system-label",23),d.TgZ(36,"input",8),d.NdJ("ngModelChange",(function(e){return s.configvalues.notificationhost=e})),d.qZA()()()),2&e&&(d.xp6(5),d.Q6J("system-overlay-loading-spinner",s.loading),d.xp6(3),d.Q6J("disabled",s.loading)("ngModel",s.configvalues.mapskey),d.xp6(3),d.Q6J("disabled",s.loading)("ngModel",s.configvalues.languagekey),d.xp6(3),d.Q6J("disabled",s.loading)("ngModel",s.configvalues.clientid),d.xp6(3),d.Q6J("disabled",s.loading)("ngModel",s.configvalues.calendarconfig),d.xp6(3),d.Q6J("disabled",s.loading)("ngModel",s.configvalues.serviceuserkey),d.xp6(4),d.Q6J("ngModel",s.serviceuserscope.calendar)("disabled",s.loading),d.xp6(2),d.Q6J("ngModel",s.serviceuserscope.gmail_radonly)("disabled",s.loading),d.xp6(2),d.Q6J("ngModel",s.serviceuserscope.gmail_compose)("disabled",s.loading),d.xp6(2),d.Q6J("ngModel",s.serviceuserscope.gmail_modify)("disabled",s.loading),d.xp6(2),d.Q6J("ngModel",s.serviceuserscope.contacts)("disabled",s.loading),d.xp6(4),d.Q6J("disabled",s.loading)("ngModel",s.configvalues.notificationhost))},dependencies:[t.Fj,t.JJ,t.On,_.U,b._,f.t,v._],encapsulation:2}),GoogleAPISettings})(),y=(()=>{class ModuleGoogleAPI{}return ModuleGoogleAPI.ɵfac=function(e){return new(e||ModuleGoogleAPI)},ModuleGoogleAPI.ɵmod=d.oAB({type:ModuleGoogleAPI}),ModuleGoogleAPI.ɵinj=d.cJS({imports:[l.ez,t.u5,n.ObjectFields,i.GlobalComponents,c.ObjectComponents,g.SystemComponents,a.o]}),ModuleGoogleAPI})();("undefined"==typeof ngJitMode||ngJitMode)&&d.kYT(y,{declarations:[L],imports:[l.ez,t.u5,n.ObjectFields,i.GlobalComponents,c.ObjectComponents,g.SystemComponents,a.o]})}}]);