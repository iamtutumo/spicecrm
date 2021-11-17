"use strict";var __extends=this&&this.__extends||function(){var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Immediate_1=require("../util/Immediate"),AsyncAction_1=require("./AsyncAction"),AsapAction=function(o){function t(t,e){var n=o.call(this,t,e)||this;return n.scheduler=t,n.work=e,n}return __extends(t,o),t.prototype.requestAsyncId=function(t,e,n){return null!==(n=void 0===n?0:n)&&0<n?o.prototype.requestAsyncId.call(this,t,e,n):(t.actions.push(this),t.scheduled||(t.scheduled=Immediate_1.Immediate.setImmediate(t.flush.bind(t,null))))},t.prototype.recycleAsyncId=function(t,e,n){if(null!==(n=void 0===n?0:n)&&0<n||null===n&&0<this.delay)return o.prototype.recycleAsyncId.call(this,t,e,n);0===t.actions.length&&(Immediate_1.Immediate.clearImmediate(e),t.scheduled=void 0)},t}(AsyncAction_1.AsyncAction);exports.AsapAction=AsapAction;