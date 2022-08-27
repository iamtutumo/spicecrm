/*!
 * 
 *                     aacService
 *
 *                     release: 2022.02.001
 *
 *                     date: 2022-08-27 19:36:04
 *
 *                     build: 2022.02.001.1661621764544
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_scrum_modulescrum_ts"],{8836:(e,t,s)=>{s.r(t),s.d(t,{ModuleScrum:()=>z});var i=s(6895),r=s(2563),c=s(3121),o=s(3283),n=s(4518),d=s(5478),l=s(4357),u=s(1571),m=s(4505);let a=(()=>{class scrum{constructor(e){this.backend=e,this.selectedObject$=new u.vpe,this._selectedObject={id:void 0,type:""}}get selectedObject(){return this._selectedObject}set selectedObject(e){this._selectedObject=e,this.selectedObject$.emit(this._selectedObject)}onDrop(e,t,s){(0,r.bA)(e.container.data,e.previousIndex,e.currentIndex);const i=e.container.data.map(((e,t)=>({id:e.id,sequence:t})));this.backend.postRequest("module/"+t,{},i).subscribe((e=>{e&&e.length&&(s.items=s.items.map(((e,t)=>(e.sequence=t,e))))}))}}return scrum.ɵfac=function(e){return new(e||scrum)(u.LFG(m.y))},scrum.ɵprov=u.Yz7({token:scrum,factory:scrum.ɵfac}),scrum})();var p=s(5710),h=s(2656);let g=(()=>{class ScrumTreeAddItem{constructor(e,t){this.parent=e,this.model=t,this.title="",this.module="",this.newitem=new u.vpe}addItem(){this.model.id=void 0,this.model.module=this.module,this.model.addModel("",this.parent).subscribe((e=>{this.newitem.emit(e)}))}}return ScrumTreeAddItem.ɵfac=function(e){return new(e||ScrumTreeAddItem)(u.Y36(p.o,4),u.Y36(p.o))},ScrumTreeAddItem.ɵcmp=u.Xpm({type:ScrumTreeAddItem,selectors:[["scrum-tree-additem"]],inputs:{title:"title",module:"module"},outputs:{newitem:"newitem"},features:[u._Bn([p.o])],decls:2,vars:1,consts:[[1,"slds-button","slds-button-icon","slds-m-right_x-small",3,"title","click"],["icon","add"]],template:function(e,t){1&e&&(u.TgZ(0,"button",0),u.NdJ("click",(function(){return t.addItem()})),u._UZ(1,"system-button-icon",1),u.qZA()),2&e&&u.Q6J("title",t.title)},dependencies:[h.J],encapsulation:2}),ScrumTreeAddItem})();var f=s(6040),y=s(5329),S=s(2644),b=s(4154),T=s(4664);const _=["scrum-tree-userstory",""],D=function(e){return{"slds-is-selected":e}};let k=(()=>{class ScrumTreeUserStory{constructor(e,t,s,i){this.metadata=e,this.model=t,this.modellist=s,this.scrum=i,this.userstory={}}ngOnInit(){this.model.module="ScrumUserStories",this.model.initialize(),this.model.id=this.userstory.id,this.model.setData(this.userstory)}selectUserStory(e){e.stopPropagation(),this.scrum.selectedObject={id:this.userstory.id,type:"ScrumUserStories"}}ngOnDestroy(){this.scrum.selectedObject.id==this.userstory.id&&"ScrumUserStories"==this.scrum.selectedObject.type&&(this.scrum.selectedObject={id:void 0,type:""})}}return ScrumTreeUserStory.ɵfac=function(e){return new(e||ScrumTreeUserStory)(u.Y36(b.Pu),u.Y36(p.o),u.Y36(S.t),u.Y36(a))},ScrumTreeUserStory.ɵcmp=u.Xpm({type:ScrumTreeUserStory,selectors:[["","scrum-tree-userstory",""]],hostBindings:function(e,t){1&e&&u.NdJ("click",(function(e){return t.selectUserStory(e)}))},inputs:{userstory:"userstory"},features:[u._Bn([p.o])],attrs:_,decls:4,vars:4,consts:[[1,"slds-tree__item",3,"ngClass"],[1,"slds-has-flexi-truncate","slds-p-left--medium"],[1,"slds-tree__item-label","slds-truncate"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"span",1)(2,"span",2),u._uU(3),u.qZA()()()),2&e&&(u.Q6J("ngClass",u.VKq(2,D,t.userstory.id==t.scrum.selectedObject.id)),u.xp6(3),u.Oqu(t.userstory.name))},dependencies:[i.mk],encapsulation:2}),ScrumTreeUserStory})();const x=["scrum-tree-epic",""];function O(e,t){1&e&&u._UZ(0,"system-spinner",8)}function v(e,t){if(1&e&&u._UZ(0,"li",11),2&e){const e=t.$implicit;u.Q6J("userstory",e)}}function J(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"ul",9),u.NdJ("cdkDropListDropped",(function(t){u.CHM(e);const s=u.oxw();return u.KtG(s.scrum.onDrop(t,"ScrumUserStories",s.userstories))})),u.YNc(1,v,1,1,"li",10),u.qZA()}if(2&e){const e=u.oxw();u.Q6J("cdkDropListData",e.userstories.items),u.xp6(1),u.Q6J("ngForOf",e.userstories.items)}}const L=function(e){return{"slds-is-selected":e}},Y=function(e){return{"slds-hidden":e}};let Z=(()=>{class ScrumTreeEpic{constructor(e,t,s,i,r,c){this.language=e,this.metadata=t,this.model=s,this.modellist=i,this.scrum=r,this.userstories=c,this.userstoriesloaded=!1,this.expanded=!1,this.disabled=!0,this.epic={}}ngOnInit(){this.model.module="ScrumEpics",this.model.initialize(),this.model.id=this.epic.id,this.model.setData(this.epic),this.userstories.module=this.model.module,this.userstories.id=this.model.id,this.userstories.relatedModule="ScrumUserStories",this.model.module&&this.metadata.checkModuleAcl(this.model.module,"create")&&(this.disabled=!1),this.has_stories=this.model.getField("has_stories")}loadRelatedUserStories(){this.userstories.sort.sortfield="sequence",this.userstories.loaditems=-99,this.userstories.getData().subscribe((e=>{this.userstoriesloaded=!0}))}ngOnDestroy(){this.scrum.selectedObject.id==this.epic.id&&"ScrumEpics"==this.scrum.selectedObject.type&&(this.scrum.selectedObject={id:void 0,type:""})}toggleExpand(){this.userstoriesloaded||this.loadRelatedUserStories(),this.expanded=!this.expanded}selectEpic(e){e.stopPropagation(),this.scrum.selectedObject={id:this.epic.id,type:"ScrumEpics"}}loadChanges(e){this.has_stories=!0,this.loadRelatedUserStories()}get title(){return this.language.getLabel("LBL_ADD_USERSTORY")}}return ScrumTreeEpic.ɵfac=function(e){return new(e||ScrumTreeEpic)(u.Y36(y.d),u.Y36(b.Pu),u.Y36(p.o),u.Y36(S.t),u.Y36(a),u.Y36(f.j))},ScrumTreeEpic.ɵcmp=u.Xpm({type:ScrumTreeEpic,selectors:[["","scrum-tree-epic",""]],hostVars:1,hostBindings:function(e,t){1&e&&u.NdJ("click",(function(e){return t.selectEpic(e)})),2&e&&u.uIk("aria-expanded",t.expanded)},inputs:{epic:"epic"},features:[u._Bn([p.o,f.j])],attrs:x,decls:9,vars:12,consts:[[1,"slds-tree__item",2,"align-items","center",3,"ngClass"],[1,"slds-button","slds-button-icon","slds-m-right_x-small",3,"disabled","ngClass","click"],[3,"icon"],[1,"slds-has-flexi-truncate"],[1,"slds-tree__item-label","slds-truncate"],["module","ScrumUserStories",3,"title","newitem"],["class","slds-p-around--xx-small",4,"ngIf"],["role","group","class","scrum-tree-epic-drop-list","cdkDropList","","cdkDropListLockAxis","y",3,"cdkDropListData","cdkDropListDropped",4,"ngIf"],[1,"slds-p-around--xx-small"],["role","group","cdkDropList","","cdkDropListLockAxis","y",1,"scrum-tree-epic-drop-list",3,"cdkDropListData","cdkDropListDropped"],["cdkDrag","","cdkDragBoundary",".scrum-tree-epic-drop-list","class","slds-drag--preview","style","list-style: none","scrum-tree-userstory","","aria-level","3","role","treeitem",3,"userstory",4,"ngFor","ngForOf"],["cdkDrag","","cdkDragBoundary",".scrum-tree-epic-drop-list","scrum-tree-userstory","","aria-level","3","role","treeitem",1,"slds-drag--preview",2,"list-style","none",3,"userstory"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"button",1),u.NdJ("click",(function(){return t.toggleExpand()})),u._UZ(2,"system-button-icon",2),u.qZA(),u.TgZ(3,"span",3)(4,"span",4),u._uU(5),u.qZA()(),u.TgZ(6,"scrum-tree-additem",5),u.NdJ("newitem",(function(e){return t.loadChanges(e)})),u.qZA()(),u.YNc(7,O,1,0,"system-spinner",6),u.YNc(8,J,2,2,"ul",7)),2&e&&(u.Q6J("ngClass",u.VKq(8,L,t.epic.id==t.scrum.selectedObject.id)),u.xp6(1),u.Q6J("disabled",!t.has_stories)("ngClass",u.VKq(10,Y,!t.has_stories)),u.xp6(1),u.Q6J("icon",t.userstories.isloading?"spinner":"chevronright"),u.xp6(3),u.Oqu(t.epic.name),u.xp6(1),u.Q6J("title",t.title),u.xp6(1),u.Q6J("ngIf",t.userstories.isloading&&t.has_stories),u.xp6(1),u.Q6J("ngIf",t.userstories.items.length>0))},dependencies:[i.mk,i.sg,i.O5,h.J,T.W,r.Wj,r.Zt,g,k],encapsulation:2}),ScrumTreeEpic})();const j=["scrum-tree-theme",""];function A(e,t){1&e&&u._UZ(0,"system-spinner",8)}function C(e,t){if(1&e&&u._UZ(0,"li",11),2&e){const e=t.$implicit;u.Q6J("epic",e)}}function w(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"ul",9),u.NdJ("cdkDropListDropped",(function(t){u.CHM(e);const s=u.oxw();return u.KtG(s.scrum.onDrop(t,"ScrumEpics",s.epics))})),u.YNc(1,C,1,1,"li",10),u.qZA()}if(2&e){const e=u.oxw();u.Q6J("cdkDropListData",e.epics.items),u.xp6(1),u.Q6J("ngForOf",e.epics.items)}}const U=function(e){return{"slds-is-selected":e}},E=function(e){return{"slds-hidden":e}};let I=(()=>{class ScrumTreeTheme{constructor(e,t,s,i,r,c,o){this.scrum=e,this.language=t,this.modellist=s,this.metadata=i,this.model=r,this.backend=c,this.epics=o,this.epicsloaded=!1,this.theme={},this.disabled=!0,this.expanded=!1}get title(){return this.language.getLabel("LBL_ADD_EPIC")}ngOnInit(){this.model.module="ScrumThemes",this.model.initialize(),this.model.id=this.theme.id,this.model.setData(this.theme),this.epics.module=this.model.module,this.epics.id=this.model.id,this.epics.relatedModule="ScrumEpics",this.model.module&&this.metadata.checkModuleAcl(this.model.module,"create")&&(this.disabled=!1),this.has_epics=this.model.getField("has_epics")}ngOnDestroy(){this.scrum.selectedObject.id==this.theme.id&&"ScrumThemes"==this.scrum.selectedObject.type&&(this.scrum.selectedObject={id:void 0,type:""})}selectTheme(){this.scrum.selectedObject={id:this.theme.id,type:"ScrumThemes"}}loadRelatedEpics(){this.epics.sort.sortfield="sequence",this.epics.loaditems=-99,this.epics.getData().subscribe((e=>{this.epicsloaded=!0}))}toggleExpand(){this.epicsloaded||this.loadRelatedEpics(),this.expanded=!this.expanded}loadChanges(e){this.has_epics=!0,this.loadRelatedEpics()}}return ScrumTreeTheme.ɵfac=function(e){return new(e||ScrumTreeTheme)(u.Y36(a),u.Y36(y.d),u.Y36(S.t),u.Y36(b.Pu),u.Y36(p.o),u.Y36(m.y),u.Y36(f.j))},ScrumTreeTheme.ɵcmp=u.Xpm({type:ScrumTreeTheme,selectors:[["","scrum-tree-theme",""]],hostVars:1,hostBindings:function(e,t){1&e&&u.NdJ("click",(function(){return t.selectTheme()})),2&e&&u.uIk("aria-expanded",t.expanded)},inputs:{theme:"theme"},features:[u._Bn([p.o,f.j])],attrs:j,decls:9,vars:12,consts:[[1,"slds-tree__item",2,"align-items","center",3,"ngClass"],[1,"slds-button","slds-button-icon","slds-m-right_x-small",3,"disabled","ngClass","click"],[3,"icon"],[1,"slds-has-flexi-truncate"],[1,"slds-tree__item-label","slds-truncate"],["module","ScrumEpics",3,"title","newitem"],["class","slds-p-around--xx-small",4,"ngIf"],["role","group","class","scrum-tree-theme-drop-list","cdkDropList","","cdkDropListLockAxis","y",3,"cdkDropListData","cdkDropListDropped",4,"ngIf"],[1,"slds-p-around--xx-small"],["role","group","cdkDropList","","cdkDropListLockAxis","y",1,"scrum-tree-theme-drop-list",3,"cdkDropListData","cdkDropListDropped"],["cdkDrag","","cdkDragBoundary",".scrum-tree-theme-drop-list","scrum-tree-epic","","aria-level","2","role","treeitem","class","slds-drag--preview","style","list-style: none",3,"epic",4,"ngFor","ngForOf"],["cdkDrag","","cdkDragBoundary",".scrum-tree-theme-drop-list","scrum-tree-epic","","aria-level","2","role","treeitem",1,"slds-drag--preview",2,"list-style","none",3,"epic"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"button",1),u.NdJ("click",(function(){return t.toggleExpand()})),u._UZ(2,"system-button-icon",2),u.qZA(),u.TgZ(3,"span",3)(4,"span",4),u._uU(5),u.qZA()(),u.TgZ(6,"scrum-tree-additem",5),u.NdJ("newitem",(function(e){return t.loadChanges(e)})),u.qZA()(),u.YNc(7,A,1,0,"system-spinner",6),u.YNc(8,w,2,2,"ul",7)),2&e&&(u.Q6J("ngClass",u.VKq(8,U,t.theme.id==t.scrum.selectedObject.id)),u.xp6(1),u.Q6J("disabled",!t.has_epics)("ngClass",u.VKq(10,E,!t.has_epics)),u.xp6(1),u.Q6J("icon",t.epics.isloading?"spinner":"chevronright"),u.xp6(3),u.Oqu(t.theme.name),u.xp6(1),u.Q6J("title",t.title),u.xp6(1),u.Q6J("ngIf",t.epics.isloading&&t.has_epics),u.xp6(1),u.Q6J("ngIf",t.epics.items.length>0))},dependencies:[i.mk,i.sg,i.O5,h.J,T.W,r.Wj,r.Zt,g,Z],encapsulation:2}),ScrumTreeTheme})();var q=s(2294),M=s(4044),Q=s(6951);let N=(()=>{class ScrumTreeDetail{constructor(e,t,s,i,r,c){this.scrum=e,this.metadata=t,this.model=s,this.view=i,this.modal=r,this.language=c,this.focusid="",this.focustype=""}ngOnChanges(){this.focusid&&this.focusid!=this.model.id?this.model.isDirty()?this.modal.confirm(this.language.getLabel("MSG_NAVIGATIONSTOP","","long"),this.language.getLabel("MSG_NAVIGATIONSTOP")).subscribe((e=>{e?(this.model.cancelEdit(),this.renderComponent(this.focusid)):this.scrum.selectedObject.id=this.model.id})):this.renderComponent(this.focusid):this.focusid||this.destroyContainer()}renderComponent(e){this.model.id=e,this.model.module=this.focustype,this.model.getData();let t=this.metadata.getComponentConfig("ScrumTreeDetail",this.model.module);this.componentset=t.componentset}destroyContainer(){this.componentset&&(this.componentset=null,this.model.reset())}get canEdit(){try{return this.model.checkAccess("edit")}catch(e){return!1}}}return ScrumTreeDetail.ɵfac=function(e){return new(e||ScrumTreeDetail)(u.Y36(a),u.Y36(b.Pu),u.Y36(p.o),u.Y36(q.e),u.Y36(M.o),u.Y36(y.d))},ScrumTreeDetail.ɵcmp=u.Xpm({type:ScrumTreeDetail,selectors:[["scrum-tree-detail"]],inputs:{focusid:"focusid",focustype:"focustype"},features:[u._Bn([p.o,q.e]),u.TTD],decls:1,vars:1,consts:[[3,"componentset"]],template:function(e,t){1&e&&u._UZ(0,"system-componentset",0),2&e&&u.Q6J("componentset",t.componentset)},dependencies:[Q.E],encapsulation:2}),ScrumTreeDetail})();var B=s(2646),F=s(1058),G=s(3194),P=s(4021);function R(e,t){if(1&e&&u._UZ(0,"li",3),2&e){const e=t.$implicit;u.Q6J("theme",e)}}let V=(()=>{class ScrumTree{constructor(e,t){this.scrum=e,this.modellist=t}trackbyfn(e,t){return t.id}}return ScrumTree.ɵfac=function(e){return new(e||ScrumTree)(u.Y36(a),u.Y36(S.t))},ScrumTree.ɵcmp=u.Xpm({type:ScrumTree,selectors:[["scrum-tree"]],decls:3,vars:2,consts:[[1,"slds-tree_container"],["role","tree",1,"slds-tree"],["role","treeitem","aria-level","1","scrum-tree-theme","",3,"theme",4,"ngFor","ngForOf","ngForTrackBy"],["role","treeitem","aria-level","1","scrum-tree-theme","",3,"theme"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"ul",1),u.YNc(2,R,1,1,"li",2),u.qZA()()),2&e&&(u.xp6(2),u.Q6J("ngForOf",t.modellist.listData.list)("ngForTrackBy",t.trackbyfn))},dependencies:[i.sg,I],encapsulation:2}),ScrumTree})();function K(e,t){if(1&e&&(u.TgZ(0,"div",6)(1,"system-illustration-no-data"),u._uU(2),u.qZA()()),2&e){const e=u.oxw();u.xp6(2),u.Oqu(e.text)}}let X=(()=>{class ScrumMain{constructor(e,t,s){this.scrum=e,this.modellist=t,this.language=s,this.loadList()}loadList(){this.modellist.getListData()}get text(){return this.language.getLabel("LBL_SELECT_THEME")}}return ScrumMain.ɵfac=function(e){return new(e||ScrumMain)(u.Y36(a),u.Y36(S.t),u.Y36(y.d))},ScrumMain.ɵcmp=u.Xpm({type:ScrumMain,selectors:[["scrum-main"]],features:[u._Bn([a])],decls:6,vars:4,consts:[["system-to-bottom-noscroll","",1,"slds-grid",3,"system-overlay-loading-spinner"],["system-to-bottom","",1,"slds-border--right","slds-theme_shade",2,"min-width","250px"],["role","tree"],["system-to-bottom","",1,"slds-grow"],["class","slds-align_absolute-center","system-to-bottom-noscroll","",4,"ngIf"],[3,"focusid","focustype"],["system-to-bottom-noscroll","",1,"slds-align_absolute-center"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"div",1),u._UZ(2,"scrum-tree",2),u.qZA(),u.TgZ(3,"div",3),u.YNc(4,K,3,1,"div",4),u._UZ(5,"scrum-tree-detail",5),u.qZA()()),2&e&&(u.Q6J("system-overlay-loading-spinner",t.modellist.isLoading),u.xp6(4),u.Q6J("ngIf",!t.scrum.selectedObject.id&&!t.modellist.isLoading),u.xp6(1),u.Q6J("focusid",t.scrum.selectedObject.id)("focustype",t.scrum.selectedObject.type))},dependencies:[i.O5,B.t,F.H,G.t,P._,V,N],encapsulation:2}),ScrumMain})(),z=(()=>{class ModuleScrum{}return ModuleScrum.ɵfac=function(e){return new(e||ModuleScrum)},ModuleScrum.ɵmod=u.oAB({type:ModuleScrum}),ModuleScrum.ɵinj=u.cJS({providers:[a],imports:[i.ez,c.ObjectFields,o.GlobalComponents,n.ObjectComponents,d.SystemComponents,l.o,r._t]}),ModuleScrum})();("undefined"==typeof ngJitMode||ngJitMode)&&u.kYT(z,{declarations:[X,V,g,I,Z,k,N],imports:[i.ez,c.ObjectFields,o.GlobalComponents,n.ObjectComponents,d.SystemComponents,l.o,r._t]})}}]);