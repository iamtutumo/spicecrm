"use strict";var __extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};return function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var map_1=require("./map"),from_1=require("../observable/from"),innerSubscribe_1=require("../innerSubscribe");function exhaustMap(e,i){return i?function(t){return t.pipe(exhaustMap(function(r,n){return from_1.from(e(r,n)).pipe(map_1.map(function(t,e){return i(r,t,n,e)}))}))}:function(t){return t.lift(new ExhaustMapOperator(e))}}exports.exhaustMap=exhaustMap;var ExhaustMapOperator=function(){function t(t){this.project=t}return t.prototype.call=function(t,e){return e.subscribe(new ExhaustMapSubscriber(t,this.project))},t}(),ExhaustMapSubscriber=function(r){function t(t,e){t=r.call(this,t)||this;return t.project=e,t.hasSubscription=!1,t.hasCompleted=!1,t.index=0,t}return __extends(t,r),t.prototype._next=function(t){this.hasSubscription||this.tryNext(t)},t.prototype.tryNext=function(t){var e,r=this.index++;try{e=this.project(t,r)}catch(t){return void this.destination.error(t)}this.hasSubscription=!0,this._innerSub(e)},t.prototype._innerSub=function(t){var e=new innerSubscribe_1.SimpleInnerSubscriber(this),r=this.destination;r.add(e);t=innerSubscribe_1.innerSubscribe(t,e);t!==e&&r.add(t)},t.prototype._complete=function(){this.hasCompleted=!0,this.hasSubscription||this.destination.complete(),this.unsubscribe()},t.prototype.notifyNext=function(t){this.destination.next(t)},t.prototype.notifyError=function(t){this.destination.error(t)},t.prototype.notifyComplete=function(){this.hasSubscription=!1,this.hasCompleted&&this.destination.complete()},t}(innerSubscribe_1.SimpleOuterSubscriber);