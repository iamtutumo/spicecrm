"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var isArray_1=require("./util/isArray"),isObject_1=require("./util/isObject"),isFunction_1=require("./util/isFunction"),UnsubscriptionError_1=require("./util/UnsubscriptionError"),Subscription=function(){function b(r){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,r&&(this._ctorUnsubscribe=!0,this._unsubscribe=r)}var r;return b.prototype.unsubscribe=function(){var s;if(!this.closed){var r=this,i=r._parentOrParents,t=r._ctorUnsubscribe,n=r._unsubscribe,e=r._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,i instanceof b)i.remove(this);else if(null!==i)for(var o=0;o<i.length;++o)i[o].remove(this);if(isFunction_1.isFunction(n)){t&&(this._unsubscribe=void 0);try{n.call(this)}catch(r){s=r instanceof UnsubscriptionError_1.UnsubscriptionError?flattenUnsubscriptionErrors(r.errors):[r]}}if(isArray_1.isArray(e))for(var o=-1,u=e.length;++o<u;){var c=e[o];if(isObject_1.isObject(c))try{c.unsubscribe()}catch(r){s=s||[],r instanceof UnsubscriptionError_1.UnsubscriptionError?s=s.concat(flattenUnsubscriptionErrors(r.errors)):s.push(r)}}if(s)throw new UnsubscriptionError_1.UnsubscriptionError(s)}},b.prototype.add=function(r){var s,i=r;if(!r)return b.EMPTY;switch(typeof r){case"function":i=new b(r);case"object":if(i===this||i.closed||"function"!=typeof i.unsubscribe)return i;if(this.closed)return i.unsubscribe(),i;i instanceof b||(s=i,(i=new b)._subscriptions=[s]);break;default:throw new Error("unrecognized teardown "+r+" added to Subscription.")}var t=i._parentOrParents;if(null===t)i._parentOrParents=this;else if(t instanceof b){if(t===this)return i;i._parentOrParents=[t,this]}else{if(-1!==t.indexOf(this))return i;t.push(this)}t=this._subscriptions;return null===t?this._subscriptions=[i]:t.push(i),i},b.prototype.remove=function(r){var s=this._subscriptions;!s||-1!==(r=s.indexOf(r))&&s.splice(r,1)},b.EMPTY=((r=new b).closed=!0,r),b}();function flattenUnsubscriptionErrors(r){return r.reduce(function(r,s){return r.concat(s instanceof UnsubscriptionError_1.UnsubscriptionError?s.errors:s)},[])}exports.Subscription=Subscription;