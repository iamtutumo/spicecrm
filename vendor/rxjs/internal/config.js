"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _enable_super_gross_mode_that_will_cause_bad_things=!1;exports.config={Promise:void 0,set useDeprecatedSynchronousErrorHandling(e){var r;e?(r=new Error,console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n"+r.stack)):_enable_super_gross_mode_that_will_cause_bad_things&&console.log("RxJS: Back to a better error behavior. Thank you. <3"),_enable_super_gross_mode_that_will_cause_bad_things=e},get useDeprecatedSynchronousErrorHandling(){return _enable_super_gross_mode_that_will_cause_bad_things}};