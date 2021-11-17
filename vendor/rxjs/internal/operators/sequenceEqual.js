"use strict";var __extends=this&&this.__extends||function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Subscriber_1=require("../Subscriber");function sequenceEqual(t,r){return function(e){return e.lift(new SequenceEqualOperator(t,r))}}exports.sequenceEqual=sequenceEqual;var SequenceEqualOperator=function(){function e(e,t){this.compareTo=e,this.comparator=t}return e.prototype.call=function(e,t){return t.subscribe(new SequenceEqualSubscriber(e,this.compareTo,this.comparator))},e}();exports.SequenceEqualOperator=SequenceEqualOperator;var SequenceEqualSubscriber=function(o){function e(e,t,r){var n=o.call(this,e)||this;return n.compareTo=t,n.comparator=r,n._a=[],n._b=[],n._oneComplete=!1,n.destination.add(t.subscribe(new SequenceEqualCompareToSubscriber(e,n))),n}return __extends(e,o),e.prototype._next=function(e){this._oneComplete&&0===this._b.length?this.emit(!1):(this._a.push(e),this.checkValues())},e.prototype._complete=function(){this._oneComplete?this.emit(0===this._a.length&&0===this._b.length):this._oneComplete=!0,this.unsubscribe()},e.prototype.checkValues=function(){for(var e=this,t=e._a,r=e._b,n=e.comparator;0<t.length&&0<r.length;){var o=t.shift(),i=r.shift(),s=!1;try{s=n?n(o,i):o===i}catch(e){this.destination.error(e)}s||this.emit(!1)}},e.prototype.emit=function(e){var t=this.destination;t.next(e),t.complete()},e.prototype.nextB=function(e){this._oneComplete&&0===this._a.length?this.emit(!1):(this._b.push(e),this.checkValues())},e.prototype.completeB=function(){this._oneComplete?this.emit(0===this._a.length&&0===this._b.length):this._oneComplete=!0},e}(Subscriber_1.Subscriber);exports.SequenceEqualSubscriber=SequenceEqualSubscriber;var SequenceEqualCompareToSubscriber=function(r){function e(e,t){e=r.call(this,e)||this;return e.parent=t,e}return __extends(e,r),e.prototype._next=function(e){this.parent.nextB(e)},e.prototype._error=function(e){this.parent.error(e),this.unsubscribe()},e.prototype._complete=function(){this.parent.completeB(),this.unsubscribe()},e}(Subscriber_1.Subscriber);