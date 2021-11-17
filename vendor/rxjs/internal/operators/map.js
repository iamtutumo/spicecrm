"use strict";var __extends=this&&this.__extends||function(){var n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(t,r)};return function(t,r){function e(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Subscriber_1=require("../Subscriber");function map(r,e){return function(t){if("function"!=typeof r)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return t.lift(new MapOperator(r,e))}}exports.map=map;var MapOperator=function(){function t(t,r){this.project=t,this.thisArg=r}return t.prototype.call=function(t,r){return r.subscribe(new MapSubscriber(t,this.project,this.thisArg))},t}();exports.MapOperator=MapOperator;var MapSubscriber=function(n){function t(t,r,e){t=n.call(this,t)||this;return t.project=r,t.count=0,t.thisArg=e||t,t}return __extends(t,n),t.prototype._next=function(t){var r;try{r=this.project.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}this.destination.next(r)},t}(Subscriber_1.Subscriber);