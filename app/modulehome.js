/*!
 * 
 *                     aacService
 *
 *                     release: 2023.02.001
 *
 *                     date: 2023-11-19 12:43:46
 *
 *                     build: 2023.02.001.1700397826672
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_home_modulehome_ts"],{6132:(s,t,e)=>{e.r(t),e.d(t,{ModuleHome:()=>bs});var i=e(4755),a=e(5030),n=e(3190),o=e(4826),d=e(6490),l=e(3735),r=e(4357),c=e(8800),h=e(2242),m=e(3369),g=e(2032),u=e(4154),b=e(2422),p=e(9159),f=e(2235),v=e(2637),Z=e(5504),C=e(7017),x=e(5329),y=e(2656),A=e(9016),D=e(3463),T=e(1058),H=e(151),I=e(9087),M=e(243),F=e(7514),Y=e(9901),w=e(3333),J=e(8859);function q(s,t){if(1&s){const s=h.EpF();h.TgZ(0,"div",7)(1,"system-checkbox",20),h.NdJ("ngModelChange",(function(t){const e=h.CHM(s).$implicit,i=h.oxw();return h.KtG(i.setFilter(e,t))})),h._UZ(2,"system-label-modulename",21),h.qZA()()}if(2&s){const s=t.$implicit,e=h.oxw();h.xp6(1),h.Q6J("ngModel",e.getChecked(s)),h.xp6(1),h.Q6J("module",s)}}const L=function(s){return{"slds-is-open":s}};let k=(()=>{class HomeAssistantFilter{renderer;elementRef;language;metadata;assistant;isOpen=!1;clickListener;constructor(s,t,e,i,a){this.renderer=s,this.elementRef=t,this.language=e,this.metadata=i,this.assistant=a}get activityTypes(){return this.assistant.activityTypes}toggleOpen(s){s.stopPropagation(),this.isOpen=!this.isOpen,this.isOpen?this.clickListener=this.renderer.listen("document","click",(s=>this.onClick(s))):this.clickListener&&this.clickListener()}onClick(s){this.elementRef.nativeElement.contains(s.target)||(this.isOpen=!1,this.clickListener())}get filterColorClass(){return this.assistant.assistantFilters.objectfilters.length>0||"all"!=this.assistant.assistantFilters.timefilter?"slds-icon-text-error":"slds-icon-text-default"}setFilter(s,t){if("all"==s)this.assistant.assistantFilters.objectfilters=[];else if(t)this.assistant.assistantFilters.objectfilters.push(s);else{let t=this.assistant.assistantFilters.objectfilters.indexOf(s);this.assistant.assistantFilters.objectfilters.splice(t,1)}}getChecked(s){return"all"==s?0==this.assistant.assistantFilters.objectfilters.length:this.assistant.assistantFilters.objectfilters.indexOf(s)>=0}closeDialog(){this.clickListener&&this.clickListener(),this.isOpen=!1}static ɵfac=function(s){return new(s||HomeAssistantFilter)(h.Y36(h.Qsj),h.Y36(h.SBq),h.Y36(x.d),h.Y36(u.Pu),h.Y36(Z.R))};static ɵcmp=h.Xpm({type:HomeAssistantFilter,selectors:[["home-assistant-filter"]],decls:22,vars:11,consts:[[1,"slds-dropdown-trigger","slds-dropdown-trigger_click","slds-p-horizontal--xxx-small",3,"ngClass"],["icon","filterList","size","xx-small",3,"colorclass","title","click"],[1,"slds-is-absolute","slds-dropdown","slds-dropdown_right","slds-nubbin_top-right",2,"right","-15px","top","25px"],[1,"slds-grid"],[1,"slds-p-horizontal--small","slds-border--right",2,"min-width","120px"],[1,"slds-p-vertical--x-small"],["label","LBL_TYPE"],[1,"slds-form-element","slds-p-vertical--xx-small"],[3,"disabled","ngModel","ngModelChange"],["label","LBL_ALL"],["class","slds-form-element slds-p-vertical--xx-small",4,"ngFor","ngForOf"],[1,"slds-p-horizontal--small",2,"min-width","120px"],["label","LBL_FILTER"],[1,"slds-form-element"],[1,"slds-form-element__control"],["name","filters","value","all",3,"ngModel","ngModelChange"],["name","filters","value","overdue",3,"ngModel","ngModelChange"],["label","LBL_OVERDUE"],["name","filters","value","today",3,"ngModel","ngModelChange"],["label","LBL_TODAY"],[3,"ngModel","ngModelChange"],[3,"module"]],template:function(s,t){1&s&&(h.TgZ(0,"div",0)(1,"system-utility-icon",1),h.NdJ("click",(function(s){return t.toggleOpen(s)})),h.qZA(),h.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),h._UZ(6,"system-label",6),h.qZA(),h.TgZ(7,"div",7)(8,"system-checkbox",8),h.NdJ("ngModelChange",(function(s){return t.setFilter("all",s)})),h._UZ(9,"system-label",9),h.qZA()(),h.YNc(10,q,3,2,"div",10),h.qZA(),h.TgZ(11,"div",11)(12,"div",5),h._UZ(13,"system-label",12),h.qZA(),h.TgZ(14,"fieldset",13)(15,"div",14)(16,"system-input-radio",15),h.NdJ("ngModelChange",(function(s){return t.assistant.assistantFilters.timefilter=s})),h._UZ(17,"system-label",9),h.qZA(),h.TgZ(18,"system-input-radio",16),h.NdJ("ngModelChange",(function(s){return t.assistant.assistantFilters.timefilter=s})),h._UZ(19,"system-label",17),h.qZA(),h.TgZ(20,"system-input-radio",18),h.NdJ("ngModelChange",(function(s){return t.assistant.assistantFilters.timefilter=s})),h._UZ(21,"system-label",19),h.qZA()()()()()()()),2&s&&(h.Q6J("ngClass",h.VKq(9,L,t.isOpen)),h.xp6(1),h.Q6J("colorclass",t.filterColorClass)("title",t.language.getLabel("LBL_FILTER")),h.xp6(7),h.Q6J("disabled",t.getChecked("all"))("ngModel",t.getChecked("all")),h.xp6(2),h.Q6J("ngForOf",t.activityTypes),h.xp6(6),h.Q6J("ngModel",t.assistant.assistantFilters.timefilter),h.xp6(2),h.Q6J("ngModel",t.assistant.assistantFilters.timefilter),h.xp6(2),h.Q6J("ngModel",t.assistant.assistantFilters.timefilter))},dependencies:[i.mk,i.sg,a.JJ,a.On,F.U,Y.A,D._,w.M,J.r],encapsulation:2})}return HomeAssistantFilter})();function S(s,t){1&s&&(h.TgZ(0,"div",13),h._UZ(1,"system-illustration-no-task",14),h.qZA())}function U(s,t){if(1&s&&(h.TgZ(0,"li",15),h._UZ(1,"activitytimeline-item-container",16),h.qZA()),2&s){const s=t.$implicit;h.xp6(1),h.Q6J("activity",s)}}function O(s,t){1&s&&(h.TgZ(0,"ul",10)(1,"li",15),h._UZ(2,"activitytimeline-stencil"),h.qZA(),h.TgZ(3,"li",17),h._UZ(4,"activitytimeline-stencil"),h.qZA(),h.TgZ(5,"li",18),h._UZ(6,"activitytimeline-stencil"),h.qZA(),h.TgZ(7,"li",19),h._UZ(8,"activitytimeline-stencil"),h.qZA(),h.TgZ(9,"li",20),h._UZ(10,"activitytimeline-stencil"),h.qZA()())}let Q=(()=>{class HomeAssistant{assistant;navigationtab;language;constructor(s,t,e){this.assistant=s,this.navigationtab=t,this.language=e,this.navigationtab.setTabInfo({displayname:this.language.getLabel("LBL_ASSISTANT"),displaymodule:"Home"})}reload(s){s.stopPropagation(),this.assistant.loadItems(!1)}get loading(){return this.assistant.loading}get noActivities(){return!this.assistant.loading&&0==this.assistant.assitantItems.length}trackByFn(s,t){return t.id}static ɵfac=function(s){return new(s||HomeAssistant)(h.Y36(Z.R),h.Y36(C.d),h.Y36(x.d))};static ɵcmp=h.Xpm({type:HomeAssistant,selectors:[["home-assistant"]],decls:14,vars:4,consts:[[1,"slds-grid","slds-theme--default","slds-grid--vertical","slds-nowrap","slds-border--left","slds-border--right"],[1,"slds-p-around--small"],[1,"slds-grid","slds-grid--align-spread","slds-has-flexi-truncate","slds-grid--vertical-align-center"],[1,"slds-page-header__title","slds-m-right--small","slds-align-middle","slds-truncate"],["label","LBL_ASSISTANT"],[1,"slds-shrink-none"],["system-title","LBL_REFRESH",1,"slds-button","slds-button--icon",3,"disabled","click"],["icon","refresh"],["system-to-bottom",""],["class","slds-align--absolute-center slds-height_full",4,"ngIf"],[1,"slds-timeline"],["class","slds-p-around--xx-small",4,"ngFor","ngForOf"],["class","slds-timeline",4,"ngIf"],[1,"slds-align--absolute-center","slds-height_full"],[1,"slds-p-around--medium"],[1,"slds-p-around--xx-small"],["module","Activities",3,"activity"],[1,"slds-p-around--xx-small",2,"opacity","0.8"],[1,"slds-p-around--xx-small",2,"opacity","0.6"],[1,"slds-p-around--xx-small",2,"opacity","0.4"],[1,"slds-p-around--xx-small",2,"opacity","0.2"]],template:function(s,t){1&s&&(h.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),h._UZ(4,"system-label",4),h.qZA(),h.TgZ(5,"div",5),h._UZ(6,"home-assistant-filter"),h.TgZ(7,"button",6),h.NdJ("click",(function(s){return t.reload(s)})),h._UZ(8,"system-button-icon",7),h.qZA()()()(),h.TgZ(9,"div",8),h.YNc(10,S,2,0,"div",9),h.TgZ(11,"ul",10),h.YNc(12,U,2,1,"li",11),h.qZA(),h.YNc(13,O,11,0,"ul",12),h.qZA()()),2&s&&(h.xp6(7),h.Q6J("disabled",t.assistant.loading),h.xp6(3),h.Q6J("ngIf",t.noActivities),h.xp6(2),h.Q6J("ngForOf",t.assistant.filteredItems),h.xp6(1),h.Q6J("ngIf",t.loading))},dependencies:[i.sg,i.O5,y.J,A.H,D._,T.H,H.S,I.d,M.g,k],encapsulation:2})}return HomeAssistant})();const R=["dashboardcontainer"];let B=(()=>{class HomeDashboard{broadcast;metadata;language;userpreferences;dashboardcontainer;componentSubscriptions=[];dashboardid="";dashboardcontainercomponent=void 0;constructor(s,t,e,i){this.broadcast=s,this.metadata=t,this.language=e,this.userpreferences=i,this.componentSubscriptions.push(this.broadcast.message$.subscribe((s=>{this.handleMessage(s)}))),this.loadDashboardConfig()}handleMessage(s){switch(s.messagetype){case"applauncher.setrole":this.loadDashboardConfig();break;case"wizard.complete":this.reloadContainer()}}loadDashboardConfig(){let s=this.userpreferences.toUse.home_dashboard||void 0,t=this.metadata.getActiveRole();this.dashboardid=s||t.default_dashboard||"",this.dashboardcontainercomponent&&(this.dashboardcontainercomponent.instance.dashboardid=this.dashboardid)}ngAfterViewInit(){this.reloadContainer()}reloadContainer(){this.dashboardcontainercomponent&&(this.dashboardcontainercomponent.destroy(),this.dashboardcontainercomponent=void 0),this.metadata.addComponent("DashboardContainer",this.dashboardcontainer).subscribe((s=>{s.instance.dashboardid=this.dashboardid,s.instance.context="Home",this.dashboardcontainercomponent=s}))}ngOnDestroy(){for(let s of this.componentSubscriptions)s.unsubscribe()}static ɵfac=function(s){return new(s||HomeDashboard)(h.Y36(m.f),h.Y36(u.Pu),h.Y36(x.d),h.Y36(b.z))};static ɵcmp=h.Xpm({type:HomeDashboard,selectors:[["home-dashboard"]],viewQuery:function(s,t){if(1&s&&h.Gf(R,7,h.s_b),2&s){let s;h.iGM(s=h.CRH())&&(t.dashboardcontainer=s.first)}},decls:3,vars:0,consts:[[1,"slds-theme--shade"],["dashboardcontainer",""]],template:function(s,t){1&s&&(h.TgZ(0,"div",0),h._UZ(1,"div",null,1),h.qZA())},encapsulation:2})}return HomeDashboard})();var N=e(727),z=e(4505),E=e(6271),j=e(2803);const G=["moreTab"],P=["activeDashboardContainer"],V=["maintabs"],$=["moreTabItems"];function X(s,t){if(1&s){const s=h.EpF();h.TgZ(0,"div")(1,"system-input-radio-button-group",4),h.NdJ("ngModelChange",(function(t){h.CHM(s);const e=h.oxw();return h.KtG(e.activeDashboardId=t)})),h.qZA()()}if(2&s){const s=h.oxw();h.xp6(1),h.Q6J("inputOptions",s.dashboardsList)("ngModel",s.activeDashboardId)}}function K(s,t){1&s&&(h.TgZ(0,"div",5)(1,"div",6),h._UZ(2,"system-stencil",7),h.qZA(),h.TgZ(3,"div",6),h._UZ(4,"system-stencil",7),h.qZA(),h.TgZ(5,"div",6),h._UZ(6,"system-stencil",7),h.qZA(),h.TgZ(7,"div"),h._UZ(8,"system-stencil",7),h.qZA()())}let W=(()=>{class HomeDashboardSetContainer{broadcast;metadata;language;renderer;backend;elementRef;cdr;userpreferences;subscriptions=new N.w0;dashboardContainerComponentRef;dashboardsList=[];isLoading=!1;maintabs;moreTabItems;moreTab;activeDashboardContainer;constructor(s,t,e,i,a,n,o,d){this.broadcast=s,this.metadata=t,this.language=e,this.renderer=i,this.backend=a,this.elementRef=n,this.cdr=o,this.userpreferences=d,this.subscribeToBroadcast(),this.loadDashboardConfig()}_activeDashboardId="";_activeDashboardSetId="";get activeDashboardId(){return this._activeDashboardId}set activeDashboardId(s){this._activeDashboardId=s,this.renderView()}get activeDashboardSetId(){return this._activeDashboardSetId}set activeDashboardSetId(s){this._activeDashboardSetId=s}ngOnDestroy(){this.subscriptions.unsubscribe(),this.resetView()}ngAfterViewInit(){this.loadDashboards()}subscribeToBroadcast(){this.subscriptions.add(this.broadcast.message$.subscribe((s=>{this.handleBroadcastSubscription(s)})))}loadDashboards(){this.isLoading=!0,this.cdr.detectChanges(),this.loadDashboardSetDashboards().subscribe((s=>{this.isLoading=!1,s&&(this.dashboardsList=_.toArray(s).map((s=>({label:s.name,value:s.id}))),this.dashboardsList.length>0&&(this.activeDashboardId=this.dashboardsList[0].value),this.cdr.detectChanges())}))}handleBroadcastSubscription(s){if("applauncher.setrole"===s.messagetype)this.loadDashboardConfig()}loadDashboardConfig(){let s=this.userpreferences.toUse.home_dashboard||void 0,t=this.metadata.getActiveRole();this.activeDashboardId=s||t.default_dashboard||"";let e=this.userpreferences.toUse.home_dashboardset||void 0;this.activeDashboardSetId=e||t.default_dashboardset||"",this.dashboardContainerComponentRef&&(this.dashboardContainerComponentRef.instance.dashboardid=this.activeDashboardId)}renderView(){this.resetView(),this.activeDashboardContainer&&this.metadata.addComponent("DashboardContainer",this.activeDashboardContainer).subscribe((s=>{s.instance.dashboardid=this.activeDashboardId,s.instance.context="Home",this.dashboardContainerComponentRef=s}))}resetView(){this.dashboardContainerComponentRef&&(this.dashboardContainerComponentRef.destroy(),this.dashboardContainerComponentRef=void 0)}loadDashboardSetDashboards(){let s=this.userpreferences.toUse.home_dashboardset||this.activeDashboardSetId,t={limit:-99,modulefilter:this.metadata.getComponentConfig("HomeDashboardSetContainer","Home").moduleFilter,sort:{sortfield:"dashboardsets_dashboard_sequence",sortdirection:"ASC"}};return this.backend.getRequest(`module/DashboardSets/${s}/related/dashboards`,t)}static ɵfac=function(s){return new(s||HomeDashboardSetContainer)(h.Y36(m.f),h.Y36(u.Pu),h.Y36(x.d),h.Y36(h.Qsj),h.Y36(z.y),h.Y36(h.SBq),h.Y36(h.sBO),h.Y36(b.z))};static ɵcmp=h.Xpm({type:HomeDashboardSetContainer,selectors:[["home-dashboardset-container"]],viewQuery:function(s,t){if(1&s&&(h.Gf(G,5,h.s_b),h.Gf(P,5,h.s_b),h.Gf(V,5,h.s_b),h.Gf($,5,h.s_b)),2&s){let s;h.iGM(s=h.CRH())&&(t.moreTab=s.first),h.iGM(s=h.CRH())&&(t.activeDashboardContainer=s.first),h.iGM(s=h.CRH())&&(t.maintabs=s),h.iGM(s=h.CRH())&&(t.moreTabItems=s)}},decls:7,vars:2,consts:[[1,"slds-p-around--xx-small","slds-scrollable--x","slds-border--bottom"],[4,"ngIf","ngIfElse"],["isLoadingContainer",""],["activeDashboardContainer",""],[3,"inputOptions","ngModel","ngModelChange"],[1,"slds-grid"],[1,"slds-p-right--xx-small"],[2,"line-height","1.6rem"]],template:function(s,t){if(1&s&&(h.TgZ(0,"div")(1,"div",0),h.YNc(2,X,2,2,"div",1),h.YNc(3,K,9,0,"ng-template",null,2,h.W1O),h.qZA(),h._UZ(5,"div",null,3),h.qZA()),2&s){const s=h.MAs(4);h.xp6(2),h.Q6J("ngIf",!t.isLoading)("ngIfElse",s)}},dependencies:[i.O5,a.JJ,a.On,E.p,j.B],encapsulation:2})}return HomeDashboardSetContainer})();function ss(s,t){1&s&&(h.ynx(0),h._UZ(1,"home-dashboardset-container"),h.BQk())}function ts(s,t){if(1&s){const s=h.EpF();h.TgZ(0,"div",2)(1,"system-split-container",3),h.NdJ("onExpand",(function(){h.CHM(s);const t=h.oxw();return h.KtG(t.cdRef.detectChanges())})),h.TgZ(2,"system-split-container-left",4),h.YNc(3,ss,2,0,"ng-container",5),h.qZA(),h.TgZ(4,"system-split-container-right",6),h._UZ(5,"home-assistant"),h.qZA()()()}if(2&s){const s=h.oxw(),t=h.MAs(3);h.xp6(3),h.Q6J("ngIf",s.hasDashboardSet)("ngIfElse",t)}}function es(s,t){1&s&&(h.ynx(0),h._UZ(1,"home-dashboardset-container"),h.BQk())}function is(s,t){if(1&s&&(h.TgZ(0,"div",2)(1,"div",7),h.YNc(2,es,2,0,"ng-container",5),h.qZA()()),2&s){const s=h.oxw(),t=h.MAs(3);h.xp6(2),h.Q6J("ngIf",s.hasDashboardSet)("ngIfElse",t)}}function as(s,t){1&s&&h._UZ(0,"home-dashboard")}let ns=(()=>{class Home{broadcast;navigation;metadata;userpreferences;cdRef;hasDashboardSet=!1;constructor(s,t,e,i,a){if(this.broadcast=s,this.navigation=t,this.metadata=e,this.userpreferences=i,this.cdRef=a,this.userpreferences.loadPreferences().subscribe((s=>this.hasDashboardSet=s.home_dashboardset&&s.home_dashboardset.length>0)),!this.hasDashboardSet){let s=this.metadata.getActiveRole();s&&s.default_dashboardset&&s.default_dashboardset&&(this.hasDashboardSet=!0)}this.navigation.setActiveModule("Home")}get displayHomeAssistant(){let s=!this.userpreferences.toUse.home_assistant||"hidden"==this.userpreferences.toUse.home_assistant;return window.innerWidth>1024&&!s}static ɵfac=function(s){return new(s||Home)(h.Y36(m.f),h.Y36(g.G),h.Y36(u.Pu),h.Y36(b.z),h.Y36(h.sBO))};static ɵcmp=h.Xpm({type:Home,selectors:[["home"]],decls:4,vars:2,consts:[["class","slds-grid",4,"ngIf"],["homeDashboardContainer",""],[1,"slds-grid"],[3,"onExpand"],[1,"slds-col","slds-large-size--3-of-4","slds-medium-size--1-of-2"],[4,"ngIf","ngIfElse"],[1,"slds-col","slds-large-size--1-of-4","slds-medium-size--1-of-2"],[1,"slds-col","slds-size--1-of-1"]],template:function(s,t){1&s&&(h.YNc(0,ts,6,2,"div",0),h.YNc(1,is,3,2,"div",0),h.YNc(2,as,1,0,"ng-template",null,1,h.W1O)),2&s&&(h.Q6J("ngIf",t.displayHomeAssistant),h.xp6(1),h.Q6J("ngIf",!t.displayHomeAssistant))},dependencies:[i.O5,p.n,f.j,v.I,Q,B,W],encapsulation:2})}return Home})();var os=e(5710),ds=e(2294),ls=e(3634),rs=e(699),cs=e(4561),hs=e(7674),ms=e(1790);function gs(s,t){if(1&s&&(h.ynx(0),h.TgZ(1,"dt",11),h._UZ(2,"system-label-fieldname",12),h.qZA(),h.TgZ(3,"dd",13),h._UZ(4,"field-container",14),h.qZA(),h.BQk()),2&s){const s=t.$implicit,e=h.oxw();h.xp6(2),h.Q6J("module",e.model.module)("field",s.field),h.xp6(2),h.Q6J("field",s.field)("fieldconfig",s.fieldconfig)("fielddisplayclass","slds-truncate")}}let us=(()=>{class HomeAssistantTile{language;model;view;metadata;item={};tileFields=[];actionset="";constructor(s,t,e,i){this.language=s,this.model=t,this.view=e,this.metadata=i,e.isEditable=!1}ngOnInit(){let s=this.metadata.getComponentConfig("HomeAssistantTile",this.item.module);s&&s.fieldset&&(this.tileFields=this.metadata.getFieldSetFields(s.fieldset)),s&&s.actionset&&(this.actionset=s.actionset),this.model.module=this.item.module,this.model.id=this.item.id,this.model.setData(this.item.data)}goDetail(){this.model.goDetail()}static ɵfac=function(s){return new(s||HomeAssistantTile)(h.Y36(x.d),h.Y36(os.o),h.Y36(ds.e),h.Y36(u.Pu))};static ɵcmp=h.Xpm({type:HomeAssistantTile,selectors:[["home-assistant-tile"]],inputs:{item:"item"},features:[h._Bn([os.o,ds.e])],decls:12,vars:6,consts:[[1,"slds-tile","slds-media","slds-p-around--x-small","slds-border--bottom"],[3,"module","size"],[1,"slds-media__body"],[1,"slds-grid","slds-grid_align-spread","slds-has-flexi-truncate","slds-p-bottom--xx-small"],["system-model-popover","",1,"slds-tile__title","slds-truncate"],["href","javascript:void(0);",3,"click"],[1,"slds-shrink-none"],[3,"buttonsize","actionset"],[1,"slds-tile__detail"],[1,"slds-list_horizontal","slds-wrap"],[4,"ngFor","ngForOf"],[1,"slds-item--label","slds-text-color--weak","slds-truncate"],[3,"module","field"],[1,"slds-item--detail","slds-truncate"],[3,"field","fieldconfig","fielddisplayclass"]],template:function(s,t){1&s&&(h.TgZ(0,"article",0),h._UZ(1,"system-icon",1),h.TgZ(2,"div",2)(3,"div",3)(4,"h3",4)(5,"a",5),h.NdJ("click",(function(){return t.goDetail()})),h._uU(6),h.qZA()(),h.TgZ(7,"div",6),h._UZ(8,"object-actionset-menu",7),h.qZA()(),h.TgZ(9,"div",8)(10,"dl",9),h.YNc(11,gs,5,5,"ng-container",10),h.qZA()()()()),2&s&&(h.xp6(1),h.Q6J("module",t.item.module)("size","small"),h.xp6(5),h.Oqu(t.item.data.summary_text),h.xp6(2),h.Q6J("buttonsize","x-small")("actionset",t.actionset),h.xp6(3),h.Q6J("ngForOf",t.tileFields))},dependencies:[i.sg,ls.j,rs.H,cs.f,hs.h,ms.g],encapsulation:2})}return HomeAssistantTile})(),bs=(()=>{class ModuleHome{static ɵfac=function(s){return new(s||ModuleHome)};static ɵmod=h.oAB({type:ModuleHome});static ɵinj=h.cJS({imports:[i.ez,a.u5,n.ObjectFields,o.GlobalComponents,d.ObjectComponents,l.SystemComponents,r.o,c.ModuleActivities]})}return ModuleHome})();("undefined"==typeof ngJitMode||ngJitMode)&&h.kYT(bs,{declarations:[ns,Q,us,k,B,W],imports:[i.ez,a.u5,n.ObjectFields,o.GlobalComponents,d.ObjectComponents,l.SystemComponents,r.o,c.ModuleActivities]})}}]);