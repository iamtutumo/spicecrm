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
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_chat_modulechat_ts"],{9505:(t,s,e)=>{e.r(s),e.d(s,{ModuleChat:()=>C});var n=e(6895),o=e(433),i=e(5886),a=e(3283),d=e(8363),c=e(1652),l=e(1571),u=e(5329),r=e(5710),h=e(4505),m=e(3278),g=e(2656);function p(t,s){if(1&t&&(l.TgZ(0,"div"),l._uU(1),l.qZA()),2&t){const t=s.$implicit;l.xp6(1),l.Oqu(t)}}let _=(()=>{class ChatContainer{constructor(t,s,e,n){this.language=t,this.model=s,this.backend=e,this.toast=n,this.status="initial",this.message="",this.messages=[],this.socket=socketIo("http://localhost:3000?room="+this.model.id),this.socket.on("connect",(t=>{this.status="connected"})),this.socket.on("disconnect",(()=>{this.status="disconnect"})),this.socket.on("message",(t=>{console.log(t),this.addMessage(t.text)}))}ngOnDestroy(){"connected"==this.status&&this.socket.disconnect()}toggleconnect(){"connected"==this.status?this.socket.disconnect():this.socket.connect()}send(){this.socket.emit("message",{room:this.model.id,message:this.message},(t=>{console.log(t)}))}addMessage(t){let s=t.callId+" "+t.event+" "+t.relatedData;this.messages.push(s)}}return ChatContainer.ɵfac=function(t){return new(t||ChatContainer)(l.Y36(u.d),l.Y36(r.o),l.Y36(h.y),l.Y36(m.A))},ChatContainer.ɵcmp=l.Xpm({type:ChatContainer,selectors:[["ng-component"]],decls:30,vars:3,consts:[[3,"click"],[4,"ngFor","ngForOf"],[1,"slds-feed"],[1,"slds-feed__list"],[1,"slds-feed__item"],[1,"slds-media","slds-comment","slds-hint-parent"],[1,"slds-media__figure"],["href","javascript:void(0);",1,"slds-avatar","slds-avatar_circle","slds-avatar_medium"],["alt","Person name","src","vendor/sldassets/images/avatar2.jpg","title","User avatar"],[1,"slds-media__body"],[1,"slds-publisher","slds-publisher_comment","slds-is-active","slds-has-focus"],[1,"slds-assistive-text"],["placeholder","Write a comment…",1,"slds-publisher__input","slds-input_bare","slds-text-longform",3,"ngModel","ngModelChange"],[1,"slds-publisher__actions","slds-grid","slds-grid_align-spread"],[1,"slds-grid"],["title","Add User",1,"slds-button","slds-button_icon","slds-button_icon-container"],["icon","adduser"],["title","Attach a file",1,"slds-button","slds-button_icon","slds-button_icon-container"],["icon","attach"],[1,"slds-button","slds-button--brand",3,"click"]],template:function(t,s){1&t&&(l._uU(0,"I am the chat container: Socketstatus "),l.TgZ(1,"div",0),l.NdJ("click",(function(){return s.toggleconnect()})),l._uU(2),l.qZA(),l.YNc(3,p,2,1,"div",1),l.TgZ(4,"div",2)(5,"ul",3)(6,"li",4)(7,"div",5)(8,"div",6)(9,"a",7),l._UZ(10,"img",8),l.qZA()(),l.TgZ(11,"div",9)(12,"div",10)(13,"label",11),l._uU(14,"Write a comment"),l.qZA(),l.TgZ(15,"textarea",12),l.NdJ("ngModelChange",(function(t){return s.message=t})),l.qZA(),l.TgZ(16,"div",13)(17,"ul",14)(18,"li")(19,"button",15),l._UZ(20,"system-button-icon",16),l.TgZ(21,"span",11),l._uU(22,"Add User"),l.qZA()()(),l.TgZ(23,"li")(24,"button",17),l._UZ(25,"system-button-icon",18),l.TgZ(26,"span",11),l._uU(27,"Attach a file"),l.qZA()()()(),l.TgZ(28,"button",19),l.NdJ("click",(function(){return s.send()})),l._uU(29,"Comment"),l.qZA()()()()()()()()),2&t&&(l.xp6(2),l.Oqu(s.status),l.xp6(1),l.Q6J("ngForOf",s.messages),l.xp6(12),l.Q6J("ngModel",s.message))},dependencies:[n.sg,o.Fj,o.JJ,o.On,g.J],encapsulation:2}),ChatContainer})(),C=(()=>{class ModuleChat{}return ModuleChat.ɵfac=function(t){return new(t||ModuleChat)},ModuleChat.ɵmod=l.oAB({type:ModuleChat}),ModuleChat.ɵinj=l.cJS({imports:[n.ez,o.u5,i.ObjectFields,a.GlobalComponents,d.ObjectComponents,c.SystemComponents]}),ModuleChat})();("undefined"==typeof ngJitMode||ngJitMode)&&l.kYT(C,{declarations:[_],imports:[n.ez,o.u5,i.ObjectFields,a.GlobalComponents,d.ObjectComponents,c.SystemComponents]})}}]);