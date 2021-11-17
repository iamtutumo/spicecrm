"use strict";var __extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};return function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var innerSubscribe_1=require("../innerSubscribe");function mergeScan(e,r,n){return void 0===n&&(n=Number.POSITIVE_INFINITY),function(t){return t.lift(new MergeScanOperator(e,r,n))}}exports.mergeScan=mergeScan;var MergeScanOperator=function(){function t(t,e,r){this.accumulator=t,this.seed=e,this.concurrent=r}return t.prototype.call=function(t,e){return e.subscribe(new MergeScanSubscriber(t,this.accumulator,this.seed,this.concurrent))},t}();exports.MergeScanOperator=MergeScanOperator;var MergeScanSubscriber=function(i){function t(t,e,r,n){t=i.call(this,t)||this;return t.accumulator=e,t.acc=r,t.concurrent=n,t.hasValue=!1,t.hasCompleted=!1,t.buffer=[],t.active=0,t.index=0,t}return __extends(t,i),t.prototype._next=function(t){if(this.active<this.concurrent){var e=this.index++,r=this.destination,n=void 0;try{n=(0,this.accumulator)(this.acc,t,e)}catch(t){return r.error(t)}this.active++,this._innerSub(n)}else this.buffer.push(t)},t.prototype._innerSub=function(t){var e=new innerSubscribe_1.SimpleInnerSubscriber(this),r=this.destination;r.add(e);t=innerSubscribe_1.innerSubscribe(t,e);t!==e&&r.add(t)},t.prototype._complete=function(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&(!1===this.hasValue&&this.destination.next(this.acc),this.destination.complete()),this.unsubscribe()},t.prototype.notifyNext=function(t){var e=this.destination;this.acc=t,this.hasValue=!0,e.next(t)},t.prototype.notifyComplete=function(){var t=this.buffer;this.active--,0<t.length?this._next(t.shift()):0===this.active&&this.hasCompleted&&(!1===this.hasValue&&this.destination.next(this.acc),this.destination.complete())},t}(innerSubscribe_1.SimpleOuterSubscriber);exports.MergeScanSubscriber=MergeScanSubscriber;