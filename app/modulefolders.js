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
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_folders_modulefolders_ts"],{3061:(e,t,s)=>{s.r(t),s.d(t,{ModuleFolders:()=>J});var i=s(6895),d=s(433),l=s(5886),o=s(3283),r=s(8363),n=s(1652),c=s(4357),a=s(3418),u=s(1571),m=s(5698),h=s(4505),p=s(2644),g=s(5329),f=s(3278),b=s(4044),F=s(6163),T=s(3441),_=s(5710),x=s(2656),L=s(3463),D=s(1058),v=s(4021);function w(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"button",11),u.NdJ("click",(function(t){u.CHM(e);const s=u.oxw();return u.KtG(s.expand(s.item,t))})),u._UZ(1,"system-button-icon",12),u.qZA()}if(2&e){const e=u.oxw();u.xp6(1),u.Q6J("icon",e.item.systemTreeDefs.expanded?"chevrondown":"chevronright")}}const y=function(e){return{visibility:e}};let k=(()=>{class FolderViewTreeItems{constructor(e,t,s,i){this.language=e,this.backend=t,this.toast=s,this.modal=i,this.onFolderAdd=new u.vpe,this.doSort=new u.vpe,this.onFolderDelete=new u.vpe,this.toggleExpandedChange=new u.vpe}expand(e,t){this.toggleExpandedChange.emit(e.id),t&&t.stopPropagation&&t.stopPropagation()}deleteFolder(){this.backend.deleteRequest("module/Folders/"+this.item.id).pipe((0,m.q)(1)).subscribe((e=>{this.onFolderDelete.emit(),this.toast.sendToast(this.language.getLabel("MSG_SUCCESSFULLY_DELETED"),"success")}))}editFolderName(){this.modal.prompt("input",null,"Folder Name",null,this.item.name).pipe((0,m.q)(1)).subscribe((e=>{if(e=e.trim()){this.item.name=e;let t={name:this.item.name};this.backend.postRequest("module/Folders/"+this.item.id,{},t).pipe((0,m.q)(1)).subscribe((e=>{this.toast.sendToast(this.language.getLabel("MSG_FOLDERNAME_CHANGED"),"success"),this.doSort.emit()}),(e=>{this.toast.sendToast(this.language.getLabel("LBL_ERROR"),"error")}))}}))}}return FolderViewTreeItems.ɵfac=function(e){return new(e||FolderViewTreeItems)(u.Y36(g.d),u.Y36(h.y),u.Y36(f.A),u.Y36(b.o))},FolderViewTreeItems.ɵcmp=u.Xpm({type:FolderViewTreeItems,selectors:[["folder-view-tree-item"]],inputs:{item:"item"},outputs:{onFolderAdd:"onFolderAdd",doSort:"doSort",onFolderDelete:"onFolderDelete",toggleExpandedChange:"toggleExpandedChange"},decls:14,vars:8,consts:[[1,"slds-tree__item"],[1,"slds-grid","slds-grid_vertical-align-center","slds-grow","slds-truncate"],[2,"min-width","20px"],["class","slds-button slds-button_icon slds-m-right--xx-small slds-m-top--none","aria-expanded","true","aria-hidden","true","tabindex","-1",3,"click",4,"ngIf"],[1,"slds-truncate"],[1,"slds-tree__item-label","slds-truncate"],[1,"slds-col_bump-left",3,"ngStyle"],["title","Edit Name",1,"slds-button","slds-button--icon",3,"click"],[3,"icon"],["title","Add Folder",1,"slds-button","slds-button--icon",3,"click"],["title","Delete folder",1,"slds-button","slds-button--icon","slds-p-right--x-small",3,"click"],["aria-expanded","true","aria-hidden","true","tabindex","-1",1,"slds-button","slds-button_icon","slds-m-right--xx-small","slds-m-top--none",3,"click"],["size","xx-small",3,"icon"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"div",1)(2,"div",2),u.YNc(3,w,2,1,"button",3),u.qZA(),u.TgZ(4,"div",4)(5,"span",5),u._uU(6),u.qZA()(),u.TgZ(7,"div",6)(8,"button",7),u.NdJ("click",(function(){return t.editFolderName()})),u._UZ(9,"system-button-icon",8),u.qZA(),u.TgZ(10,"button",9),u.NdJ("click",(function(){return t.onFolderAdd.emit(t.item.id)})),u._UZ(11,"system-button-icon",8),u.qZA(),u.TgZ(12,"button",10),u.NdJ("click",(function(){return t.deleteFolder()})),u._UZ(13,"system-button-icon",8),u.qZA()()()()),2&e&&(u.xp6(3),u.Q6J("ngIf",t.item.systemTreeDefs.hasChildren),u.xp6(3),u.Oqu(t.item.name),u.xp6(1),u.Q6J("ngStyle",u.VKq(6,y,t.item.systemTreeDefs.isSelected?"visible":"hidden")),u.xp6(2),u.Q6J("icon","edit"),u.xp6(2),u.Q6J("icon","new"),u.xp6(2),u.Q6J("icon","delete"))},dependencies:[i.O5,i.PC,x.J],encapsulation:2}),FolderViewTreeItems})();function I(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"li",15),u.NdJ("cdkDropListDropped",(function(t){const s=u.CHM(e).$implicit,i=u.oxw(2);return u.KtG(i.drop(t,s))})),u.TgZ(1,"folder-view-tree-item",16),u.NdJ("click",(function(){const t=u.CHM(e).$implicit,s=u.oxw(2);return u.KtG(s.handleClick(t.id))}))("toggleExpandedChange",(function(t){u.CHM(e);const s=u.oxw(2);return u.KtG(s.handleExpand(t))}))("onFolderDelete",(function(){const t=u.CHM(e).$implicit,s=u.oxw(2);return u.KtG(s.removeFolderFromList(t.id))}))("onFolderAdd",(function(t){const s=u.CHM(e).index,i=u.oxw(2);return u.KtG(i.addFolder(t,s))}))("doSort",(function(){u.CHM(e);const t=u.oxw(2);return u.KtG(t.buildTree())})),u.qZA()()}if(2&e){const e=t.$implicit;u.uIk("aria-level",e.systemTreeDefs.level)("aria-selected",e.systemTreeDefs.isSelected),u.xp6(1),u.Q6J("item",e)("title",e.name)}}function A(e,t){if(1&e&&(u.ynx(0),u.YNc(1,I,2,4,"li",14),u.BQk()),2&e){const e=u.oxw();u.xp6(1),u.Q6J("ngForOf",e.tree)("ngForTrackBy",e.trackByFn)}}let C=(()=>{class FolderViewTree{set selectedItem(e){this.folderId.emit(e),e!==this._selectedItem&&(this._selectedItem=e,this.setAggregate(e),this.model.setField("folder_id",e))}get selectedItem(){return this._selectedItem}constructor(e,t,s,i,d,l,o,r){this.backend=e,this.modellist=t,this.language=s,this.toast=i,this.modal=d,this.modelutilies=l,this.helper=o,this.model=r,this.folderId=new u.vpe,this._selectedItem=null,this.tree=[],this.sourceList=[],this.itemRelations=[],this.isLoading=!0,this.showTree=!0}ngOnInit(){this.backend.getRequest("module/Folders/Documents").pipe((0,m.q)(1)).subscribe((e=>{this.sourceList=e.list,this.buildTree(),this.isLoading=!1;let t=this.getFolderIdFromList();null!==t&&this.handleClick(t)}))}buildItemRelations(){this.itemRelations=[];let e={};this.sourceList.forEach(((t,s)=>e[t.id]=s)),this.sourceList.forEach(((t,s)=>{this.itemRelations[s]={parent:t.parent_id?e[t.parent_id]:null,childs:[]}})),this.sourceList.forEach(((e,t)=>{e.parent_id&&this.itemRelations[this.itemRelations[t].parent].childs.push(t)}))}buildTree(){this.tree=[],this.sortSourceList(),this.addTreeItem(),this.setHasChildren(),this.buildItemRelations()}sortSourceList(){this.language.sortObjects(this.sourceList,"name")}addTreeItem(e="",t=1){for(let s of this.sourceList)(!s.parent_id&&""==e||s.parent_id==e)&&(s.systemTreeDefs||(s.systemTreeDefs={}),s.systemTreeDefs.expanded=!!s.systemTreeDefs.expanded,s.systemTreeDefs.level=t,s.systemTreeDefs.isSelected=this.selectedItem==s.id,this.tree.push(s),s.systemTreeDefs.expanded&&this.addTreeItem(s.id,t+1))}setHasChildren(){this.tree.forEach((e=>{e.systemTreeDefs.hasChildren=this.sourceList.some((t=>t.parent_id==e.id))}))}handleExpand(e){this.sourceList.some((t=>{if(t.id==e)return t.systemTreeDefs.expanded=!t.systemTreeDefs.expanded,!0})),this.buildTree()}handleClick(e){this.tree.some((t=>{if(t.id===e)return t.systemTreeDefs?.isSelected||(t.systemTreeDefs.isSelected=!0,this.selectedItem=e),!0})),this.tree.some((t=>{if(t.id!=e&&t.systemTreeDefs?.isSelected)return t.systemTreeDefs.isSelected=!1,!0}))}unselectActiveTreeItem(){this.tree.some((e=>{if(e.systemTreeDefs?.isSelected)return e.systemTreeDefs.isSelected=!1,!0}))}setAggregate(e){e||(e="#not#set#");let t=this.helper.encodeBase64('{"key":"'+e+'","displayName":"'+e+'"}');this.modellist.checkAggregate("folder_id",t)||(this.modellist.removeAggregatesOfField("folder_id"),this.modellist.setAggregate("folder_id",t),this.modellist.reLoadList())}getFolderIdFromList(){let e=null;return this.modellist.selectedAggregates.some((t=>{let s=t.split("::",2);if("folder_id"===s[0]){let t=JSON.parse(this.helper.decodeBase64(s[1]));e=t.key}})),"#not#set#"===e&&(e=""),e}removeAllAggregates(){this.modellist.removeAggregatesOfField("folder_id"),this.modellist.reLoadList()}trackByFn(e,t){return t.id}addFolder(e=null,t=null){this.modal.prompt("input",null,"Folder Name").pipe((0,m.q)(1)).subscribe((s=>{if(s&&(s=s.trim())){let i={name:s,parent_id:e||void 0,module:"Documents",id:this.modelutilies.generateGuid()};this.backend.postRequest("module/Folders/"+i.id,{},i).pipe((0,m.q)(1)).subscribe((()=>{this.toast.sendToast(this.language.getLabel("MSG_FOLDER_SUCCESSFULY_ADDED"),"success"),this.sourceList.push(i),null!==t&&this.tree[t]&&(this.tree[t].systemTreeDefs.expanded=!0),this.buildTree()}),(e=>{this.toast.sendToast(this.language.getLabel("LBL_ERROR"),"error")}))}}))}removeFolderFromList(e){let t=[];this.sourceList.find(((s,i)=>{if(s.id===e)return this.deleteItemsRecursive(i,t),!0})),t.sort().reverse().forEach(((e,s)=>{this.sourceList.splice(t[s],1),this.itemRelations.splice(t[s],1)})),this.buildTree()}deleteItemsRecursive(e,t){t.push(e),this.itemRelations[e].childs.forEach((e=>this.deleteItemsRecursive(e,t)))}selectOutsideFolders(){this.selectedItem="",this.unselectActiveTreeItem()}drop(e,t){this.backend.postRequest("module/Documents/"+e.item.data.id,{},{folder_id:t.id}).subscribe((e=>{window.setTimeout((()=>this.modellist.reLoadList(!0)),500)}))}toggleTree(){this.showTree=!this.showTree}}return FolderViewTree.ɵfac=function(e){return new(e||FolderViewTree)(u.Y36(h.y),u.Y36(p.t),u.Y36(g.d),u.Y36(f.A),u.Y36(b.o),u.Y36(F.A),u.Y36(T._),u.Y36(_.o))},FolderViewTree.ɵcmp=u.Xpm({type:FolderViewTree,selectors:[["folder-view-tree"]],outputs:{folderId:"folderId"},decls:14,vars:4,consts:[["system-to-bottom","",1,"slds-grid","slds-grid--vertical",3,"system-overlay-loading-spinner"],["role","tree",1,"slds-grow","slds-height_full","slds-scrollable--y"],["id","folderList","role","tree","aria-labelledby","treeheading",1,"slds-tree"],["cdkDropList","",1,"slds-border--bottom",3,"cdkDropListDropped"],[1,"slds-tree","slds-grow"],["role","treeitem",3,"click"],[1,"slds-tree__item","slds-p-vertical--x-small"],["size","xx-small",3,"icon","click"],[1,"slds-tree__item-label","slds-truncate","slds-p-left--x-small"],["label","LBL_CORE"],[4,"ngIf"],[1,"slds-text-align--right","slds-p-around--x-small","slds-border--top"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_ADD_FOLDER"],["role","treeitem","cdkDropList","",3,"cdkDropListDropped",4,"ngFor","ngForOf","ngForTrackBy"],["role","treeitem","cdkDropList","",3,"cdkDropListDropped"],[1,"slds-grid","slds-grid--vertical","slds-p-vertical--none","slds-tree__item",2,"width","100%",3,"item","title","click","toggleExpandedChange","onFolderDelete","onFolderAdd","doSort"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"div",1)(2,"ul",2)(3,"li",3),u.NdJ("cdkDropListDropped",(function(e){return t.drop(e,{id:""})})),u.TgZ(4,"div",4)(5,"div",5),u.NdJ("click",(function(){return t.selectOutsideFolders()})),u.TgZ(6,"div",6)(7,"system-button-icon",7),u.NdJ("click",(function(){return t.toggleTree()})),u.qZA(),u.TgZ(8,"span",8),u._UZ(9,"system-label",9),u.qZA()()()()(),u.YNc(10,A,2,2,"ng-container",10),u.qZA()(),u.TgZ(11,"div",11)(12,"button",12),u.NdJ("click",(function(){return t.addFolder()})),u._UZ(13,"system-label",13),u.qZA()()()),2&e&&(u.Q6J("system-overlay-loading-spinner",t.isLoading),u.xp6(5),u.uIk("aria-selected",""===t.selectedItem),u.xp6(2),u.Q6J("icon",t.showTree?"chevrondown":"chevronright"),u.xp6(3),u.Q6J("ngIf",t.showTree))},dependencies:[i.sg,i.O5,x.J,L._,D.H,v._,a.Wj,k],encapsulation:2}),FolderViewTree})();var Z=s(7228);function S(e,t){1&e&&u._UZ(0,"object-list",6),2&e&&u.Q6J("dragAndDrop",!0)}let E=(()=>{class FolderObjectListView{constructor(){this.folderId=null}setFolderId(e){this.folderId=e}}return FolderObjectListView.ɵfac=function(e){return new(e||FolderObjectListView)},FolderObjectListView.ɵcmp=u.Xpm({type:FolderObjectListView,selectors:[["folder-object-listview"]],decls:6,vars:1,consts:[["cdkDropListGroup","","system-to-bottom","",1,"slds-grid"],[1,"slds-size--1-of-3","slds-border_right","slds-height_full"],[3,"folderId"],[1,"slds-size--2-of-3","slds-height_full"],[1,"slds-m-top--xxx-small"],[3,"dragAndDrop",4,"ngIf"],[3,"dragAndDrop"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0)(1,"div",1)(2,"folder-view-tree",2),u.NdJ("folderId",(function(e){return t.setFolderId(e)})),u.qZA()(),u.TgZ(3,"div",3)(4,"div",4),u.YNc(5,S,1,1,"object-list",5),u.qZA()()()),2&e&&(u.xp6(5),u.Q6J("ngIf",null!==t.folderId))},dependencies:[i.O5,Z.s,D.H,a.Fd,C],encapsulation:2}),FolderObjectListView})(),J=(()=>{class ModuleFolders{}return ModuleFolders.ɵfac=function(e){return new(e||ModuleFolders)},ModuleFolders.ɵmod=u.oAB({type:ModuleFolders}),ModuleFolders.ɵinj=u.cJS({imports:[i.ez,d.u5,l.ObjectFields,o.GlobalComponents,r.ObjectComponents,n.SystemComponents,c.o,a._t]}),ModuleFolders})();("undefined"==typeof ngJitMode||ngJitMode)&&u.kYT(J,{declarations:[C,k,E],imports:[i.ez,d.u5,l.ObjectFields,o.GlobalComponents,r.ObjectComponents,n.SystemComponents,c.o,a._t],exports:[C]})}}]);