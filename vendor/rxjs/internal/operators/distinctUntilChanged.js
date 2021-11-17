"use strict";var __extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};return function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var Subscriber_1=require("../Subscriber");function distinctUntilChanged(e,r){return function(t){return t.lift(new DistinctUntilChangedOperator(e,r))}}exports.distinctUntilChanged=distinctUntilChanged;var DistinctUntilChangedOperator=function(){function t(t,e){this.compare=t,this.keySelector=e}return t.prototype.call=function(t,e){return e.subscribe(new DistinctUntilChangedSubscriber(t,this.compare,this.keySelector))},t}(),DistinctUntilChangedSubscriber=function(n){function t(t,e,r){t=n.call(this,t)||this;return t.keySelector=r,t.hasKey=!1,"function"==typeof e&&(t.compare=e),t}return __extends(t,n),t.prototype.compare=function(t,e){return t===e},t.prototype._next=function(t){try{var e=this.keySelector,r=e?e(t):t}catch(t){return this.destination.error(t)}e=!1;if(this.hasKey)try{e=(0,this.compare)(this.key,r)}catch(t){return this.destination.error(t)}else this.hasKey=!0;e||(this.key=r,this.destination.next(t))},t}(Subscriber_1.Subscriber);