"use strict";var __extends=this&&this.__extends||function(){var s=function(r,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var e in t)t.hasOwnProperty(e)&&(r[e]=t[e])})(r,t)};return function(r,t){function e(){this.constructor=r}s(r,t),r.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var isArray_1=require("../util/isArray"),fromArray_1=require("./fromArray"),OuterSubscriber_1=require("../OuterSubscriber"),subscribeToResult_1=require("../util/subscribeToResult");function race(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];if(1===r.length){if(!isArray_1.isArray(r[0]))return r[0];r=r[0]}return fromArray_1.fromArray(r,void 0).lift(new RaceOperator)}exports.race=race;var RaceOperator=function(){function r(){}return r.prototype.call=function(r,t){return t.subscribe(new RaceSubscriber(r))},r}();exports.RaceOperator=RaceOperator;var RaceSubscriber=function(t){function r(r){r=t.call(this,r)||this;return r.hasFirst=!1,r.observables=[],r.subscriptions=[],r}return __extends(r,t),r.prototype._next=function(r){this.observables.push(r)},r.prototype._complete=function(){var r=this.observables,t=r.length;if(0===t)this.destination.complete();else{for(var e=0;e<t&&!this.hasFirst;e++){var s=r[e],s=subscribeToResult_1.subscribeToResult(this,s,void 0,e);this.subscriptions&&this.subscriptions.push(s),this.add(s)}this.observables=null}},r.prototype.notifyNext=function(r,t,e){if(!this.hasFirst){this.hasFirst=!0;for(var s,i=0;i<this.subscriptions.length;i++)i!==e&&((s=this.subscriptions[i]).unsubscribe(),this.remove(s));this.subscriptions=null}this.destination.next(t)},r}(OuterSubscriber_1.OuterSubscriber);exports.RaceSubscriber=RaceSubscriber;