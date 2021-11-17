"use strict";var __extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Subject_1=require("../Subject"),innerSubscribe_1=require("../innerSubscribe");function window(n){return function(t){return t.lift(new WindowOperator(n))}}exports.window=window;var WindowOperator=function(){function t(t){this.windowBoundaries=t}return t.prototype.call=function(t,n){t=new WindowSubscriber(t),n=n.subscribe(t);return n.closed||t.add(innerSubscribe_1.innerSubscribe(this.windowBoundaries,new innerSubscribe_1.SimpleInnerSubscriber(t))),n},t}(),WindowSubscriber=function(e){function t(t){var n=e.call(this,t)||this;return n.window=new Subject_1.Subject,t.next(n.window),n}return __extends(t,e),t.prototype.notifyNext=function(){this.openWindow()},t.prototype.notifyError=function(t){this._error(t)},t.prototype.notifyComplete=function(){this._complete()},t.prototype._next=function(t){this.window.next(t)},t.prototype._error=function(t){this.window.error(t),this.destination.error(t)},t.prototype._complete=function(){this.window.complete(),this.destination.complete()},t.prototype._unsubscribe=function(){this.window=null},t.prototype.openWindow=function(){var t=this.window;t&&t.complete();var n=this.destination,t=this.window=new Subject_1.Subject;n.next(t)},t}(innerSubscribe_1.SimpleOuterSubscriber);