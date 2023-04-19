/*!
 * 
 *                     aacService
 *
 *                     release: 2023.01.001
 *
 *                     date: 2023-04-19 18:16:56
 *
 *                     build: 2023.01.001.1681921016060
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_include_spicefavorites_spicefavorites_ts"],{8009:(e,t,i)=>{i.r(t),i.d(t,{ModuleSpiceFavorites:()=>T});var s=i(6895),o=i(433),l=i(4357),n=i(5886),d=i(3283),a=i(8363),c=i(1652),r=i(1571),m=i(4376),u=i(5329),p=i(3463),f=i(9621),g=i(3499),v=i(5767),h=i(1916),_=i(5710),F=i(2294),b=i(4154),S=i(3634),Z=i(5931),y=i(2656),x=i(4561),M=i(3333);function J(e,t){if(1&e&&(r.TgZ(0,"span"),r._uU(1),r.qZA()),2&e){const e=r.oxw();r.xp6(1),r.Oqu(e.model.data.summary_text)}}function I(e,t){if(1&e&&(r.TgZ(0,"li",8),r._UZ(1,"field-container",14),r.qZA()),2&e){const e=r.oxw().$implicit;r.xp6(1),r.Q6J("field",e.field)("fieldconfig",e.fieldconfig)}}function k(e,t){if(1&e&&(r.ynx(0),r.YNc(1,I,2,2,"li",13),r.BQk()),2&e){const e=t.$implicit,i=r.oxw();r.xp6(1),r.Q6J("ngIf",i.model.getField(e.field))}}let C=(()=>{class SpiceFavoritesItem{constructor(e,t,i,s,o){this.model=e,this.language=t,this.metadata=i,this.view=s,this.favorite=o,this.item={},this.view.displayLabels=!1}ngOnInit(){this.initializeModel(),this.loadConfig()}initializeModel(){this.model.module=this.item.module_name,this.model.id=this.item.item_id,this.model.setData(this.item.data)}loadConfig(){let e=this.metadata.getComponentConfig("GlobalHeaderSearchResultsItem",this.model.module);this.mainfieldset=e.mainfieldset,e&&e.subfieldset&&(this.subfieldsetfields=this.metadata.getFieldSetItems(e.subfieldset))}deleteFavorite(){this.favorite.deleteFavorite(this.model.module,this.model.id)}}return SpiceFavoritesItem.ɵfac=function(e){return new(e||SpiceFavoritesItem)(r.Y36(_.o),r.Y36(u.d),r.Y36(b.Pu),r.Y36(F.e),r.Y36(m.G))},SpiceFavoritesItem.ɵcmp=r.Xpm({type:SpiceFavoritesItem,selectors:[["spice-favorites-item"]],inputs:{item:"item"},features:[r._Bn([_.o,F.e])],decls:13,vars:6,consts:[["role","option",1,"slds-lookup__item-action","slds-media","slds-media--center"],["size","small",3,"module"],[1,"slds-media__body"],[1,"slds-lookup__result-text"],[4,"ngIf"],[3,"fieldset"],[1,"slds-lookup__result-meta","slds-text-body--small"],[1,"slds-list_horizontal","slds-has-dividers_right","slds-truncate"],[1,"slds-item"],[3,"module","singular"],[4,"ngFor","ngForOf"],[1,"slds-button","slds-button--icon","slds-button--icon-border",3,"click"],["icon","delete"],["class","slds-item",4,"ngIf"],["fielddisplayclass","slds-truncate",3,"field","fieldconfig"]],template:function(e,t){1&e&&(r.TgZ(0,"div",0),r._UZ(1,"system-icon",1),r.TgZ(2,"div",2)(3,"div",3),r.YNc(4,J,2,1,"span",4),r._UZ(5,"object-record-fieldset-horizontal-list",5),r.qZA(),r.TgZ(6,"span",6)(7,"ul",7)(8,"li",8),r._UZ(9,"system-label-modulename",9),r.qZA(),r.YNc(10,k,2,1,"ng-container",10),r.qZA()()(),r.TgZ(11,"button",11),r.NdJ("click",(function(){return t.deleteFavorite()})),r._UZ(12,"system-button-icon",12),r.qZA()()),2&e&&(r.xp6(1),r.Q6J("module",t.model.module),r.xp6(3),r.Q6J("ngIf",!t.mainfieldset),r.xp6(1),r.Q6J("fieldset",t.mainfieldset),r.xp6(4),r.Q6J("module",t.model.module)("singular",!0),r.xp6(1),r.Q6J("ngForOf",t.subfieldsetfields))},dependencies:[s.sg,s.O5,S.j,Z.Z,y.J,x.f,M.M],encapsulation:2}),SpiceFavoritesItem})();function O(e,t){if(1&e&&r._UZ(0,"spice-favorites-item",6),2&e){const e=t.$implicit;r.Q6J("item",e)}}let w=(()=>{class SpiceFavoritesEditModal{constructor(e,t){this.favorite=e,this.language=t}close(){this.self.destroy()}}return SpiceFavoritesEditModal.ɵfac=function(e){return new(e||SpiceFavoritesEditModal)(r.Y36(m.G),r.Y36(u.d))},SpiceFavoritesEditModal.ɵcmp=r.Xpm({type:SpiceFavoritesEditModal,selectors:[["ng-component"]],decls:8,vars:2,consts:[[3,"close"],["label","LBL_EDIT_FAVORITES"],["margin","none",3,"grow"],["role","presentation","class","slds-listbox__item",3,"item",4,"ngFor","ngForOf"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_CLOSE"],["role","presentation",1,"slds-listbox__item",3,"item"]],template:function(e,t){1&e&&(r.TgZ(0,"system-modal")(1,"system-modal-header",0),r.NdJ("close",(function(){return t.close()})),r._UZ(2,"system-label",1),r.qZA(),r.TgZ(3,"system-modal-content",2),r.YNc(4,O,1,1,"spice-favorites-item",3),r.qZA(),r.TgZ(5,"system-modal-footer")(6,"button",4),r.NdJ("click",(function(){return t.close()})),r._UZ(7,"system-label",5),r.qZA()()()),2&e&&(r.xp6(3),r.Q6J("grow",!0),r.xp6(1),r.Q6J("ngForOf",t.favorite.favorites))},dependencies:[s.sg,p._,f.j,g.x,v.p,h.y,C],encapsulation:2}),SpiceFavoritesEditModal})(),T=(()=>{class ModuleSpiceFavorites{}return ModuleSpiceFavorites.ɵfac=function(e){return new(e||ModuleSpiceFavorites)},ModuleSpiceFavorites.ɵmod=r.oAB({type:ModuleSpiceFavorites}),ModuleSpiceFavorites.ɵinj=r.cJS({imports:[s.ez,o.u5,n.ObjectFields,d.GlobalComponents,a.ObjectComponents,c.SystemComponents,l.o]}),ModuleSpiceFavorites})();("undefined"==typeof ngJitMode||ngJitMode)&&r.kYT(T,{declarations:[w,C],imports:[s.ez,o.u5,n.ObjectFields,d.GlobalComponents,a.ObjectComponents,c.SystemComponents,l.o]})}}]);