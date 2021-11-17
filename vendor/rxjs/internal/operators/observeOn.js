"use strict";var __extends=this&&this.__extends||function(){var i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};return function(e,t){function r(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Subscriber_1=require("../Subscriber"),Notification_1=require("../Notification");function observeOn(t,r){return void 0===r&&(r=0),function(e){return e.lift(new ObserveOnOperator(t,r))}}exports.observeOn=observeOn;var ObserveOnOperator=function(){function e(e,t){void 0===t&&(t=0),this.scheduler=e,this.delay=t}return e.prototype.call=function(e,t){return t.subscribe(new ObserveOnSubscriber(e,this.scheduler,this.delay))},e}();exports.ObserveOnOperator=ObserveOnOperator;var ObserveOnSubscriber=function(i){function t(e,t,r){void 0===r&&(r=0);e=i.call(this,e)||this;return e.scheduler=t,e.delay=r,e}return __extends(t,i),t.dispatch=function(e){var t=e.notification,e=e.destination;t.observe(e),this.unsubscribe()},t.prototype.scheduleMessage=function(e){this.destination.add(this.scheduler.schedule(t.dispatch,this.delay,new ObserveOnMessage(e,this.destination)))},t.prototype._next=function(e){this.scheduleMessage(Notification_1.Notification.createNext(e))},t.prototype._error=function(e){this.scheduleMessage(Notification_1.Notification.createError(e)),this.unsubscribe()},t.prototype._complete=function(){this.scheduleMessage(Notification_1.Notification.createComplete()),this.unsubscribe()},t}(Subscriber_1.Subscriber);exports.ObserveOnSubscriber=ObserveOnSubscriber;var ObserveOnMessage=function(e,t){this.notification=e,this.destination=t};exports.ObserveOnMessage=ObserveOnMessage;