/*!
 * 
 *                     aacService
 *
 *                     release: 2023.01.001
 *
 *                     date: 2023-04-19 17:23:57
 *
 *                     build: 2023.01.001.1681917837156
 *
 */(()=>{"use strict";var e,s,t,o,r={},l={};function u(e){var s=l[e];if(void 0!==s)return s.exports;var t=l[e]={exports:{}};return r[e].call(t.exports,t,t.exports,u),t.exports}u.m=r,e=[],u.O=(s,t,o,r)=>{if(!t){var l=1/0;for(i=0;i<e.length;i++){for(var[t,o,r]=e[i],c=!0,d=0;d<t.length;d++)(!1&r||l>=r)&&Object.keys(u.O).every((e=>u.O[e](t[d])))?t.splice(d--,1):(c=!1,r<l&&(l=r));if(c){e.splice(i--,1);var _=o();void 0!==_&&(s=_)}}return s}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[t,o,r]},u.n=e=>{var s=e&&e.__esModule?()=>e.default:()=>e;return u.d(s,{a:s}),s},u.d=(e,s)=>{for(var t in s)u.o(s,t)&&!u.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:s[t]})},u.f={},u.e=e=>Promise.all(Object.keys(u.f).reduce(((s,t)=>(u.f[t](e,s),s)),[])),u.u=e=>"src_admincomponents_admincomponents_module_ts"===e?"admincomponents.js":"src_include_groupware_groupware_ts"===e?"groupware.js":"src_include_quilleditor_quilleditor_ts"===e?"quilleditor.js":"src_include_sendinblue_sendinbluemodule_ts"===e?"sendinbluemodule.js":"src_include_spiceattachments_spiceattachments_ts"===e?"spiceattachments.js":"src_include_spicecharts_spicecharts_ts"===e?"spicecharts.js":"src_include_spicefavorites_spicefavorites_ts"===e?"spicefavorites.js":"src_include_spiceimporter_spiceimporter_ts"===e?"spiceimporter.js":"src_include_spicemap_spicemap_ts"===e?"spicemap.js":"src_include_spicemath_spicemath_ts"===e?"spicemath.js":"src_include_spicemerge_spicemerge_ts"===e?"spicemerge.js":"src_include_spicenotes_spicenotes_ts"===e?"spicenotes.js":"src_include_spicepagebuilder_modulespicepagebuilder_ts"===e?"modulespicepagebuilder.js":"src_include_spicepath_spicepath_ts"===e?"spicepath.js":"src_include_spicetexts_spicetexts_ts"===e?"spicetexts.js":"src_include_spicetimeline_spicetimeline_ts"===e?"spicetimeline.js":"src_include_spicetimestream_spicetimestream_ts"===e?"spicetimestream.js":"src_modules_accounts_moduleaccounts_ts"===e?"moduleaccounts.js":"src_modules_acl_moduleacl_ts"===e?"moduleacl.js":"default-src_modules_activities_moduleactivities_ts"===e?"default-src_modules_activities_moduleactivities.js":"src_modules_agreements_moduleagreements_ts"===e?"moduleagreements.js":"src_modules_bonusprograms_modulebonusprograms_ts"===e?"modulebonusprograms.js":"src_modules_calendar_modulecalendar_ts"===e?"modulecalendar.js":"src_modules_campaigns_modulecampaigns_ts"===e?"modulecampaigns.js":"src_modules_chat_modulechat_ts"===e?"modulechat.js":"src_modules_contacts_modulecontacts_ts"===e?"modulecontacts.js":"src_modules_currencies_modulecurrencies_ts"===e?"modulecurrencies.js":"src_modules_dashboard_moduledashboard_ts"===e?"moduledashboard.js":"default-src_modules_outputtemplates_components_objectactionoutputbeanmodal_ts"===e?"default-src_modules_outputtemplates_components_objectactionoutputbeanmodal.js":"src_modules_documents_moduledocuments_ts"===e?"moduledocuments.js":"src_modules_emails_moduleemails_ts"===e?"moduleemails.js":"src_modules_folders_modulefolders_ts"===e?"modulefolders.js":"src_modules_googleapi_modulegoogleapi_ts"===e?"modulegoogleapi.js":"src_modules_holidaycalendars_moduleholidaycalendars_ts"===e?"moduleholidaycalendars.js":"src_modules_home_modulehome_ts"===e?"modulehome.js":"src_modules_leads_moduleleads_ts"===e?"moduleleads.js":"src_modules_mailboxes_modulemailboxes_ts"===e?"modulemailboxes.js":"src_modules_mediafiles_modulemediafiles_ts"===e?"modulemediafiles.js":"src_modules_opportunities_moduleopportunities_ts"===e?"moduleopportunities.js":"src_modules_orgunits_moduleorgunits_ts"===e?"moduleorgunits.js":"src_modules_outputtemplates_moduleoutputtemplates_ts"===e?"moduleoutputtemplates.js":"src_modules_prospectlists_moduleprospectlists_ts"===e?"moduleprospectlists.js":"default-src_modules_reports_modulereports_ts"===e?"default-src_modules_reports_modulereports.js":"src_modules_reportsdesigner_modulereportsdesigner_ts"===e?"modulereportsdesigner.js":"src_modules_scrum_modulescrum_ts"===e?"modulescrum.js":"src_modules_spiceimports_modulespiceimports_ts"===e?"modulespiceimports.js":"src_modules_systemcalendars_modulesystemcalendars_ts"===e?"modulesystemcalendars.js":"src_modules_users_moduleusers_ts"===e?"moduleusers.js":"src_portalcomponents_portalcomponents_ts"===e?"portalcomponents.js":"src_workbench_workbench_module_ts"===e?"workbench.js":void 0,u.miniCssF=e=>{},u.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),s={},t="core:",u.l=(e,o,r,l)=>{if(s[e])s[e].push(o);else{var c,d;if(void 0!==r)for(var _=document.getElementsByTagName("script"),i=0;i<_.length;i++){var m=_[i];if(m.getAttribute("src")==e||m.getAttribute("data-webpack")==t+r){c=m;break}}c||(d=!0,(c=document.createElement("script")).type="module",c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.setAttribute("data-webpack",t+r),c.src=u.tu(e)),s[e]=[o];var a=(t,o)=>{c.onerror=c.onload=null,clearTimeout(n);var r=s[e];if(delete s[e],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach((e=>e(o))),t)return t(o)},n=setTimeout(a.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=a.bind(null,c.onerror),c.onload=a.bind(null,c.onload),d&&document.head.appendChild(c)}},u.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.tt=()=>(void 0===o&&(o={createScriptURL:e=>e},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(o=trustedTypes.createPolicy("angular#bundler",o))),o),u.tu=e=>u.tt().createScriptURL(e),u.p="app/",(()=>{var e={runtime:0};u.f.j=(s,t)=>{var o=u.o(e,s)?e[s]:void 0;if(0!==o)if(o)t.push(o[2]);else if("runtime"!=s){var r=new Promise(((t,r)=>o=e[s]=[t,r]));t.push(o[2]=r);var l=u.p+u.u(s),c=new Error;u.l(l,(t=>{if(u.o(e,s)&&(0!==(o=e[s])&&(e[s]=void 0),o)){var r=t&&("load"===t.type?"missing":t.type),l=t&&t.target&&t.target.src;c.message="Loading chunk "+s+" failed.\n("+r+": "+l+")",c.name="ChunkLoadError",c.type=r,c.request=l,o[1](c)}}),"chunk-"+s,s)}else e[s]=0},u.O.j=s=>0===e[s];var s=(s,t)=>{var o,r,[l,c,d]=t,_=0;if(l.some((s=>0!==e[s]))){for(o in c)u.o(c,o)&&(u.m[o]=c[o]);if(d)var i=d(u)}for(s&&s(t);_<l.length;_++)r=l[_],u.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return u.O(i)},t=self.webpackChunkcore=self.webpackChunkcore||[];t.forEach(s.bind(null,0)),t.push=s.bind(null,t.push.bind(t))})()})();