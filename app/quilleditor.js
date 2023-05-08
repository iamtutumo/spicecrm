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
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_include_quilleditor_quilleditor_ts"],{4974:(t,e,i)=>{i.r(e),i.d(e,{QuillEditorModule:()=>z});var n=i(6895),l=i(5886),o=i(1652),s=i(1571),r=i(2067);const d=["editorContainer"];let a=(()=>{class QuillViewContainer{constructor(t,e,i,n,l){this.platformId=t,this.renderer=e,this.elementRef=i,this.libLoader=n,this.zone=l,this.heightStyle="300px",this.fullHeight=!1,this.textarea=document.createElement("textarea")}ngOnChanges(t){t.content&&this.setEditorContent()}ngAfterViewInit(){(0,n.PM)(this.platformId)||this.renderQuillEditor()}renderQuillEditor(){this.libLoader.loadLib("QuillEditor").subscribe((()=>{this.zone.runOutsideAngular((()=>{this.quillEditor=new Quill(this.editorContainer.element.nativeElement,{modules:{toolbar:!1},readOnly:!0,strict:!0,theme:"snow"}),this.setEditorContent()}))}))}setEditorContent(){this.quillEditor&&this.quillEditor.setContents(this.quillEditor.clipboard.convert(this.getCleanHtml()))}getCleanHtml(){if(!this.content)return"";const t=/(?<=<pre class="ql-syntax" spellcheck="false">)[\s\S]*?(?=<\/pre>)/g.exec(this.decodeHTMLEntities(this.content));return t?this.content.replace(t.toString(),this.encodeHTMLEntities(t.toString())):this.content}decodeHTMLEntities(t){return this.textarea.innerHTML=t,this.textarea.innerText}encodeHTMLEntities(t){return this.textarea.innerText=t,this.textarea.innerHTML}}return QuillViewContainer.ɵfac=function(t){return new(t||QuillViewContainer)(s.Y36(s.Lbi),s.Y36(s.Qsj),s.Y36(s.SBq),s.Y36(r.$),s.Y36(s.R0b))},QuillViewContainer.ɵcmp=s.Xpm({type:QuillViewContainer,selectors:[["quill-view"]],viewQuery:function(t,e){if(1&t&&s.Gf(d,5,s.s_b),2&t){let t;s.iGM(t=s.CRH())&&(e.editorContainer=t.first)}},inputs:{content:"content",heightStyle:"heightStyle",fullHeight:"fullHeight"},features:[s.TTD],decls:3,vars:2,consts:[[1,"quill-rich-text-editor-view-container","slds-theme--default","slds-grid","slds-grid--vertical","spice-quill-editor-container"],["editorContainer",""]],template:function(t,e){1&t&&(s.TgZ(0,"div",0),s._UZ(1,"div",null,1),s.qZA()),2&t&&s.Udp("height",e.heightStyle)},encapsulation:2}),QuillViewContainer})();var u=i(433),c=i(1481),p=i(4044),h=i(2656),g=i(151);const f=["editorContainer"],m=["editorToolbar"];function b(t,e){if(1&t){const t=s.EpF();s.ynx(0),s.TgZ(1,"span",7)(2,"select",8),s._UZ(3,"option")(4,"option",9)(5,"option",10)(6,"option",11)(7,"option",12)(8,"option",13)(9,"option",14),s.qZA(),s._UZ(10,"button",15),s.qZA(),s.TgZ(11,"span",7),s._UZ(12,"button",16)(13,"button",17)(14,"button",18)(15,"button",19)(16,"button",20)(17,"button",21),s.TgZ(18,"select",22),s._UZ(19,"option")(20,"option",23)(21,"option",24)(22,"option",25)(23,"option",26)(24,"option",27)(25,"option",28)(26,"option",29)(27,"option",30)(28,"option",31)(29,"option",32)(30,"option",33)(31,"option",34)(32,"option",35)(33,"option",36)(34,"option",37)(35,"option",38)(36,"option",39)(37,"option",40)(38,"option",41)(39,"option",42)(40,"option",43)(41,"option",44)(42,"option",45)(43,"option",46)(44,"option",47)(45,"option",48)(46,"option",49)(47,"option",50)(48,"option",51)(49,"option",52)(50,"option",53)(51,"option",54)(52,"option",55)(53,"option",56),s.qZA(),s.TgZ(54,"select",57),s._UZ(55,"option")(56,"option",58)(57,"option",23)(58,"option",24)(59,"option",25)(60,"option",26)(61,"option",27)(62,"option",28)(63,"option",30)(64,"option",31)(65,"option",32)(66,"option",33)(67,"option",34)(68,"option",35)(69,"option",36)(70,"option",37)(71,"option",38)(72,"option",39)(73,"option",40)(74,"option",41)(75,"option",42)(76,"option",43)(77,"option",44)(78,"option",45)(79,"option",46)(80,"option",47)(81,"option",48)(82,"option",49)(83,"option",50)(84,"option",51)(85,"option",52)(86,"option",53)(87,"option",54)(88,"option",55)(89,"option",56),s.qZA()(),s.TgZ(90,"span",7),s._UZ(91,"button",59)(92,"button",60)(93,"button",61)(94,"button",62)(95,"button",63)(96,"button",64),s.qZA(),s.TgZ(97,"span",7)(98,"select",65),s._UZ(99,"option")(100,"option",66)(101,"option",67)(102,"option",68),s.qZA(),s._UZ(103,"button",69),s.qZA(),s.TgZ(104,"span",7),s._UZ(105,"button",70)(106,"button",71),s.TgZ(107,"button",72),s.NdJ("click",(function(){s.CHM(t);const e=s.oxw();return s.KtG(e.openMediaFilePicker())})),s._UZ(108,"system-button-icon",73),s.qZA(),s._UZ(109,"button",74),s.qZA(),s.TgZ(110,"span",7)(111,"button",75),s.NdJ("click",(function(){s.CHM(t);const e=s.oxw();return s.KtG(e.openSourceEditor())})),s._UZ(112,"system-button-icon",76),s.qZA(),s.TgZ(113,"button",77),s.NdJ("click",(function(){s.CHM(t);const e=s.oxw(),i=s.MAs(1);return s.KtG(e.toggleFullScreen(i))})),s._UZ(114,"system-button-icon",78),s.qZA()(),s.BQk()}if(2&t){const t=s.oxw();s.xp6(114),s.Q6J("icon",t.isFullScreenOn?"contract":"expand")}}function E(t,e){1&t&&(s.TgZ(0,"span",7),s._UZ(1,"button",16)(2,"button",17)(3,"button",18),s.qZA(),s.TgZ(4,"span",7),s._UZ(5,"button",59)(6,"button",60)(7,"button",61)(8,"button",62),s.qZA(),s.TgZ(9,"span",7)(10,"select",65),s._UZ(11,"option")(12,"option",66)(13,"option",67)(14,"option",68),s.qZA()(),s.TgZ(15,"span",7),s._UZ(16,"button",70)(17,"button",71),s.qZA())}let _=(()=>{class QuillEditorContainer{constructor(t,e,i,n,l,o,s,r){this.elementRef=t,this.domSanitizer=e,this.platformId=i,this.renderer=n,this.modal=l,this.libLoader=o,this.cdRef=s,this.zone=r,this.simpleMode=!1,this.disabled=!1,this.heightStyle="300px",this.isFullScreenOn=!1,this.textarea=document.createElement("textarea")}ngAfterViewInit(){(0,n.PM)(this.platformId)||this.zone.runOutsideAngular((()=>this.renderQuillEditor()))}ngOnDestroy(){this.quillEditor&&this.quillEditor.off("text-change",this.textChangeHandler)}ngOnChanges(t){this.quillEditor&&t.disabled&&this.setDisabledState()}registerOnChange(t){this.onChange=e=>{t(e)}}registerOnTouched(t){this.onTouched=t}writeValue(t){this.content=t,this.quillEditor&&(t?(this.content=this.getCleanHtml(),this.quillEditor.setContents(this.quillEditor.clipboard.convert(this.domSanitizer.sanitize(s.q3G.HTML,this.content)))):this.quillEditor.setText(""))}setDisabledState(){this.quillEditor&&(this.disabled?(this.quillEditor.disable(),this.renderer.setAttribute(this.elementRef.nativeElement,"disabled","disabled")):(this.quillEditor.enable(),this.renderer.removeAttribute(this.elementRef.nativeElement,"disabled")))}encodeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}getCleanHtml(){const t=/(?<=<pre class="ql-syntax" spellcheck="false">)[\s\S]*?(?=<\/pre>)/g.exec(this.decodeHTMLEntities(this.content));return t?this.content.replace(t.toString(),this.encodeHTMLEntities(t.toString())):this.content}decodeHTMLEntities(t){return this.textarea.innerHTML=t,this.textarea.innerText}encodeHTMLEntities(t){return this.textarea.innerText=t,this.textarea.innerHTML}registerTextChangeHandler(){this.textChangeHandler=()=>{this.typingTimeout&&window.clearTimeout(this.typingTimeout),this.typingTimeout=window.setTimeout((()=>{this.zone.run((()=>{const t=this.editorContainer.element.nativeElement.querySelector(".ql-editor").innerHTML,e="<p><br></p>"===t||"<div><br></div>"===t?null:t;this.content=e,this.onChange(e)}))}),1e3)}}renderQuillEditor(){const t={toolbar:this.editorToolbar.element.nativeElement,imageResize:{displaySize:!0}};this.libLoader.loadLib("QuillEditor").subscribe((()=>{if(this.quillEditor=new Quill(this.editorContainer.element.nativeElement,{bounds:this.editorContainer.element.nativeElement,modules:t,scrollingContainer:this.scrollingContainer,strict:!0,theme:"snow"}),this.content){this.content=this.domSanitizer.sanitize(s.q3G.HTML,this.content);const t=this.quillEditor.clipboard.convert(this.content);this.quillEditor.setContents(t,"silent"),this.quillEditor.history.clear()}this.setDisabledState(),this.registerTextChangeHandler(),this.quillEditor.on("text-change",this.textChangeHandler)}))}openMediaFilePicker(){this.modal.openModal("MediaFilePicker").subscribe((t=>{t.instance.answer.subscribe((t=>{if(!t)return;const e=this.quillEditor.getSelection(),i=e?e.index:0;t.upload?this.modal.openModal("MediaFileUploader").subscribe((t=>{t.instance.answer.subscribe((t=>{t&&this.quillEditor.insertEmbed(i,"image","https://cdn.spicecrm.io/"+t)}))})):t.id&&this.quillEditor.insertEmbed(i,"image","https://cdn.spicecrm.io/"+t.id)}))}))}openSourceEditor(){this.modal.openModal("QuillSourceEditorModal").subscribe((t=>{t.instance._html=this.content,t.instance.html.subscribe((t=>{this.writeValue(t)}))}))}toggleFullScreen(t){document.onfullscreenchange=()=>{this.isFullScreenOn=!!document.fullscreenElement,this.cdRef.detectChanges()},this.zone.runOutsideAngular((()=>{if(this.isFullScreenOn){const t=document;t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen()}else t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullscreen?t.mozRequestFullscreen():t.msRequestFullscreen&&t.msRequestFullscreen()}))}}return QuillEditorContainer.ɵfac=function(t){return new(t||QuillEditorContainer)(s.Y36(s.SBq),s.Y36(c.H7),s.Y36(s.Lbi),s.Y36(s.Qsj),s.Y36(p.o),s.Y36(r.$),s.Y36(s.sBO),s.Y36(s.R0b))},QuillEditorContainer.ɵcmp=s.Xpm({type:QuillEditorContainer,selectors:[["quill-editor"]],viewQuery:function(t,e){if(1&t&&(s.Gf(f,5,s.s_b),s.Gf(m,5,s.s_b)),2&t){let t;s.iGM(t=s.CRH())&&(e.editorContainer=t.first),s.iGM(t=s.CRH())&&(e.editorToolbar=t.first)}},inputs:{simpleMode:"simpleMode",disabled:"disabled",heightStyle:"heightStyle",scrollingContainer:"scrollingContainer"},features:[s._Bn([{multi:!0,provide:u.JU,useExisting:(0,s.Gpc)((()=>QuillEditorContainer))}]),s.TTD],decls:9,vars:4,consts:[[1,"slds-theme--default","slds-grid","slds-grid--vertical","spice-quill-editor-container"],["mainContainer",""],[1,"slds-theme--shade"],["editorToolbar",""],[4,"ngIf","ngIfElse"],["editorSimpleToolbar",""],["editorContainer",""],[1,"ql-formats"],[1,"ql-header"],["value","1"],["value","2"],["value","3"],["value","4"],["value","5"],["value","6"],["system-title","LBL_REMOVE_FORMATTING",1,"ql-clean"],["system-title","LBL_BOLD",1,"ql-bold"],["system-title","LBL_ITALIC",1,"ql-italic"],["system-title","LBL_UNDERLINE",1,"ql-underline"],["system-title","LBL_STRIKETHROUGH",1,"ql-strike"],["value","sub","system-title","LBL_SUB",1,"ql-script"],["value","super","system-title","LBL_SUPER",1,"ql-script"],["system-title","LBL_COLOR",1,"ql-color"],["value","#e60000"],["value","#ff9900"],["value","#ffff00"],["value","#008a00"],["value","#0066cc"],["value","#9933ff"],["value","#ffffff"],["value","#facccc"],["value","#ffebcc"],["value","#ffffcc"],["value","#cce8cc"],["value","#cce0f5"],["value","#ebd6ff"],["value","#bbbbbb"],["value","#f06666"],["value","#ffc266"],["value","#ffff66"],["value","#66b966"],["value","#66a3e0"],["value","#c285ff"],["value","#888888"],["value","#a10000"],["value","#b26b00"],["value","#b2b200"],["value","#006100"],["value","#0047b2"],["value","#6b24b2"],["value","#444444"],["value","#5c0000"],["value","#663d00"],["value","#666600"],["value","#003700"],["value","#002966"],["value","#3d1466"],["system-title","LBL_BACKGROUND_COLOR",1,"ql-background"],["value","#000000"],["value","-1","system-title","LBL_TEXT_INDENT",1,"ql-indent"],["value","+1","system-title","LBL_TEXT_OUTDENT",1,"ql-indent"],["value","ordered","system-title","LBL_NUMBERED_LIST",1,"ql-list"],["value","bullet","system-title","LBL_BULLETED_LIST",1,"ql-list"],["system-title","LBL_QUOTE",1,"ql-blockquote"],["system-title","LBL_ADD_CODE_SNIPPET",1,"ql-code-block"],[1,"ql-align"],["value","center","system-title","LBL_CENTER_ALIGN"],["value","right","system-title","LBL_RIGHT_ALIGN"],["value","justify","system-title","LBL_ALIGN_TEXT"],["value","rtl","system-title","LBL_RTL_DIRECTION",1,"ql-direction"],["system-title","LBL_LINK",1,"ql-link"],["system-title","LBL_NEW_IMAGE",1,"ql-image"],["system-title","LBL_MEDIAFILE_PICKER",3,"click"],["icon","ad_set","size","small"],["system-title","LBL_ADD_VIDEO",1,"ql-video"],["system-title","LBL_SOURCE_EDITOR",3,"click"],["icon","apex"],["system-title","LBL_FULL_SCREEN",1,"slds-button","slds-button--neutral","slds-button--icon-border","slds-m-left--xx-small","slds-m-right--xxx-small","slds-col--bump-left",3,"click"],[3,"icon"]],template:function(t,e){if(1&t&&(s.TgZ(0,"div",0,1)(2,"div",2,3),s.YNc(4,b,115,1,"ng-container",4),s.YNc(5,E,18,0,"ng-template",null,5,s.W1O),s.qZA(),s._UZ(7,"div",null,6),s.qZA()),2&t){const t=s.MAs(6);s.Udp("height",e.isFullScreenOn?"100%":e.heightStyle),s.xp6(4),s.Q6J("ngIf",!e.simpleMode)("ngIfElse",t)}},dependencies:[n.O5,h.J,u.YN,u.Kr,g.S],encapsulation:2,changeDetection:0}),QuillEditorContainer})();var x=i(3896),q=i(4817),v=i(3463),L=i(9621),T=i(3499),y=i(5767),Z=i(1916),C=i(8859);function M(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"div",18)(1,"button",19),s.NdJ("click",(function(){s.CHM(t);const e=s.oxw();return s.KtG(e.nextResult())})),s._UZ(2,"system-button-icon",20),s.qZA(),s.TgZ(3,"button",19),s.NdJ("click",(function(){s.CHM(t);const e=s.oxw();return s.KtG(e.previewResult())})),s._UZ(4,"system-button-icon",21),s.qZA()()}if(2&t){const t=s.oxw();s.xp6(1),s.Q6J("disabled",t.nextDisabled)("title",t.language.getLabel("LBL_NEXT")),s.xp6(2),s.Q6J("disabled",t.previewDisabled)("title",t.language.getLabel("LBL_PREVIEW"))}}let S=(()=>{class QuillSourceEditorModal extends x.u{}return QuillSourceEditorModal.ɵfac=function(){let t;return function(e){return(t||(t=s.n5z(QuillSourceEditorModal)))(e||QuillSourceEditorModal)}}(),QuillSourceEditorModal.ɵcmp=s.Xpm({type:QuillSourceEditorModal,selectors:[["quill-source-editor-modal"]],features:[s._Bn([q.L]),s.qOj],decls:20,vars:6,consts:[["size","large"],[3,"close"],["label","LBL_SOURCE_EDITOR"],[1,"slds-grid",2,"height","70vh"],[1,"slds-size--1-of-2","slds-p-right--xx-small"],["heightStyle","100%",3,"ngModel","ngModelChange"],[1,"slds-size--1-of-2","slds-p-left--x-small"],[1,"slds-p-bottom--xx-small","slds-grid"],["role","none",1,"slds-grow","slds-combobox__form-element","slds-input-has-icon","slds-input-has-icon_left-right","slds-global-search__form-element"],["icon","search","addclasses","slds-input__icon slds-input__icon--left"],["type","text",1,"slds-input",3,"placeholder","ngModel","keyup","ngModelChange"],["class","slds-grid slds-grid--align-spread slds-input__icon_right slds-is-absolute__top","style","height: 100%",4,"ngIf"],[1,"slds-m-left--xx-small","slds-button","slds-button--icon-border","slds-button--neutral",3,"disabled","click"],["icon","right_align_text"],[1,"slds-box","slds-theme--default","slds-scrollable_y",2,"height","calc(100% - 36px)",3,"input"],["sourceeditor",""],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_OK"],[1,"slds-grid","slds-grid--align-spread","slds-input__icon_right","slds-is-absolute__top",2,"height","100%"],[1,"slds-button","slds-button_icon","slds-input__icon",2,"position","relative",3,"disabled","title","click"],["icon","arrowdown"],["icon","arrowup"]],template:function(t,e){1&t&&(s.TgZ(0,"system-modal",0)(1,"system-modal-header",1),s.NdJ("close",(function(){return e.close()})),s._UZ(2,"system-label",2),s.qZA(),s.TgZ(3,"system-modal-content")(4,"div",3)(5,"div",4)(6,"quill-editor",5),s.NdJ("ngModelChange",(function(t){return e._html=t})),s.qZA()(),s.TgZ(7,"div",6)(8,"div",7)(9,"div",8),s._UZ(10,"system-utility-icon",9),s.TgZ(11,"input",10),s.NdJ("keyup",(function(t){return e.keyUp(t)}))("ngModelChange",(function(t){return e.searchText=t})),s.qZA(),s.YNc(12,M,5,4,"div",11),s.qZA(),s.TgZ(13,"button",12),s.NdJ("click",(function(){return e.beautify()})),s._UZ(14,"system-button-icon",13),s.qZA()(),s.TgZ(15,"pre",14,15),s.NdJ("input",(function(t){return e.onContentChange(t.target.innerText)})),s.qZA()()()(),s.TgZ(17,"system-modal-footer")(18,"button",16),s.NdJ("click",(function(){return e.close()})),s._UZ(19,"system-label",17),s.qZA()()()),2&t&&(s.xp6(6),s.Q6J("ngModel",e._html),s.xp6(5),s.Q6J("placeholder",e.language.getLabel("LBL_SEARCH"))("ngModel",e.searchText),s.xp6(1),s.Q6J("ngIf",e.foundIndices.length>1),s.xp6(1),s.Q6J("disabled",!e.beautifyenabled),s.xp6(2),s.uIk("contenteditable",!0))},dependencies:[n.O5,h.J,v._,L.j,T.x,y.p,Z.y,C.r,u.Fj,u.JJ,u.On,_],encapsulation:2}),QuillSourceEditorModal})();var Q=i(7040),w=i(5710),A=i(2294),I=i(5329),R=i(4154),O=i(1933),U=i(6367),H=i(3208),J=i(5638);function B(t,e){if(1&t&&s._UZ(0,"field-label",5),2&t){const t=s.oxw();s.Q6J("fieldname",t.fieldname)("fieldconfig",t.fieldconfig)}}function k(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"button",6),s.NdJ("click",(function(){s.CHM(t);const e=s.oxw();return s.KtG(e.setEditMode())})),s._UZ(1,"system-button-icon",7),s.qZA()}2&t&&(s.xp6(1),s.Q6J("icon","edit"))}function N(t,e){if(1&t&&(s.TgZ(0,"field-generic-display",8),s._UZ(1,"quill-view",9),s.qZA()),2&t){const t=s.oxw();s.Q6J("fielddisplayclass",t.fielddisplayclass)("editable",!1)("fieldconfig",t.fieldconfig),s.xp6(1),s.Q6J("content",t.value)("heightStyle",t.heightStyle)}}function F(t,e){if(1&t){const t=s.EpF();s.TgZ(0,"div",10)(1,"quill-editor",11),s.NdJ("ngModelChange",(function(e){s.CHM(t);const i=s.oxw();return s.KtG(i.value=e)})),s.qZA(),s._UZ(2,"field-messages",12),s.qZA()}if(2&t){const t=s.oxw();s.Q6J("ngClass",t.getFieldClass()),s.xp6(1),s.Q6J("ngModel",t.value)("simpleMode",t.fieldconfig.simpleMode)("heightStyle",t.heightStyle),s.xp6(1),s.Q6J("fieldname",t.fieldname)}}let Y=(()=>{class fieldQuillRichText extends Q.O{constructor(t,e,i,n,l,o){super(t,e,i,l,o),this.model=t,this.view=e,this.language=i,this.zone=n,this.metadata=l,this.router=o,this.heightStyle="300px"}ngOnInit(){this.setHeightStyle()}setHeightStyle(){this.heightStyle=isNaN(parseInt(this.fieldconfig.height,10))?"300px":parseInt(this.fieldconfig.height,10)+"px"}}return fieldQuillRichText.ɵfac=function(t){return new(t||fieldQuillRichText)(s.Y36(w.o),s.Y36(A.e),s.Y36(I.d),s.Y36(s.R0b),s.Y36(R.Pu),s.Y36(O.F0))},fieldQuillRichText.ɵcmp=s.Xpm({type:fieldQuillRichText,selectors:[["field-quill-rich-text"]],features:[s.qOj],decls:5,vars:4,consts:[[1,"slds-grid","slds-grid--vertical-align-center","slds-grid--align-spread"],[3,"fieldname","fieldconfig",4,"ngIf"],["class","slds-button slds-button--icon slds-m-left--xx-small spice-hover-button",3,"click",4,"ngIf"],[3,"fielddisplayclass","editable","fieldconfig",4,"ngIf"],["class","slds-form-element__control",3,"ngClass",4,"ngIf"],[3,"fieldname","fieldconfig"],[1,"slds-button","slds-button--icon","slds-m-left--xx-small","spice-hover-button",3,"click"],[3,"icon"],[3,"fielddisplayclass","editable","fieldconfig"],[3,"content","heightStyle"],[1,"slds-form-element__control",3,"ngClass"],[3,"ngModel","simpleMode","heightStyle","ngModelChange"],[3,"fieldname"]],template:function(t,e){1&t&&(s.TgZ(0,"div",0),s.YNc(1,B,1,2,"field-label",1),s.YNc(2,k,2,1,"button",2),s.qZA(),s.YNc(3,N,2,5,"field-generic-display",3),s.YNc(4,F,3,5,"div",4)),2&t&&(s.xp6(1),s.Q6J("ngIf",e.displayLabel),s.xp6(1),s.Q6J("ngIf",!e.isEditMode()&&e.isEditable()),s.xp6(1),s.Q6J("ngIf",!e.isEditMode()),s.xp6(1),s.Q6J("ngIf",e.isEditable()&&e.isEditMode()))},dependencies:[n.mk,n.O5,U.q,H.D,J.a,h.J,u.JJ,u.On,_,a],encapsulation:2}),fieldQuillRichText})();var D=i(4357);let z=(()=>{class QuillEditorModule{}return QuillEditorModule.ɵfac=function(t){return new(t||QuillEditorModule)},QuillEditorModule.ɵmod=s.oAB({type:QuillEditorModule}),QuillEditorModule.ɵinj=s.cJS({imports:[n.ez,l.ObjectFields,o.SystemComponents,u.u5,D.o]}),QuillEditorModule})();("undefined"==typeof ngJitMode||ngJitMode)&&s.kYT(z,{declarations:[_,a,Y,S],imports:[n.ez,l.ObjectFields,o.SystemComponents,u.u5,D.o],exports:[_,a]})}}]);