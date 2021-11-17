"use strict";var __extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)};return function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Subject_1=require("../Subject"),Subscription_1=require("../Subscription"),OuterSubscriber_1=require("../OuterSubscriber"),subscribeToResult_1=require("../util/subscribeToResult");function windowToggle(e,o){return function(t){return t.lift(new WindowToggleOperator(e,o))}}exports.windowToggle=windowToggle;var WindowToggleOperator=function(){function t(t,e){this.openings=t,this.closingSelector=e}return t.prototype.call=function(t,e){return e.subscribe(new WindowToggleSubscriber(t,this.openings,this.closingSelector))},t}(),WindowToggleSubscriber=function(i){function t(t,e,o){t=i.call(this,t)||this;return t.openings=e,t.closingSelector=o,t.contexts=[],t.add(t.openSubscription=subscribeToResult_1.subscribeToResult(t,e,e)),t}return __extends(t,i),t.prototype._next=function(t){var e=this.contexts;if(e)for(var o=e.length,n=0;n<o;n++)e[n].window.next(t)},t.prototype._error=function(t){var e=this.contexts;if(this.contexts=null,e)for(var o=e.length,n=-1;++n<o;){var r=e[n];r.window.error(t),r.subscription.unsubscribe()}i.prototype._error.call(this,t)},t.prototype._complete=function(){var t=this.contexts;if(this.contexts=null,t)for(var e=t.length,o=-1;++o<e;){var n=t[o];n.window.complete(),n.subscription.unsubscribe()}i.prototype._complete.call(this)},t.prototype._unsubscribe=function(){var t=this.contexts;if(this.contexts=null,t)for(var e=t.length,o=-1;++o<e;){var n=t[o];n.window.unsubscribe(),n.subscription.unsubscribe()}},t.prototype.notifyNext=function(t,e,o,n,r){if(t===this.openings){var i=void 0;try{i=(0,this.closingSelector)(e)}catch(t){return this.error(t)}var s=new Subject_1.Subject,c=new Subscription_1.Subscription,e={window:s,subscription:c};this.contexts.push(e);i=subscribeToResult_1.subscribeToResult(this,i,e);i.closed?this.closeWindow(this.contexts.length-1):(i.context=e,c.add(i)),this.destination.next(s)}else this.closeWindow(this.contexts.indexOf(t))},t.prototype.notifyError=function(t){this.error(t)},t.prototype.notifyComplete=function(t){t!==this.openSubscription&&this.closeWindow(this.contexts.indexOf(t.context))},t.prototype.closeWindow=function(t){var e,o,n;-1!==t&&(o=(n=(e=this.contexts)[t]).window,n=n.subscription,e.splice(t,1),o.complete(),n.unsubscribe())},t}(OuterSubscriber_1.OuterSubscriber);