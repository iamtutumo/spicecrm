/* * *******************************************************************************
* This file is part of SpiceCRM FulltextSearch. SpiceCRM FulltextSearch is an enhancement developed
* by aac services k.s.. All rights are (c) 2016 by aac services k.s.
*
* This Version of the SpiceCRM FulltextSearch is licensed software and may only be used in
* alignment with the License Agreement received with this Software.
* This Software is copyrighted and may not be further distributed without
* witten consent of aac services k.s.
*
* You can contact us at info@spicecrm.io
******************************************************************************* */

if(Ext.tip.QuickTipManager.disable(),Ext.tip.QuickTipManager.destroy(),void 0===cal_date_format)var cal_date_format="%d.%m.%Y";var languageGetText=function(a){return void 0!==SUGAR.App?SUGAR.App.lang.get(a,"KReports"):SUGAR.language.get("KReports",a)||a};Ext.define("SpiceCRM.KReporter.Common.model.whereOperator",{extend:"Ext.data.Model",fields:["value","text"]}),Ext.define("SpiceCRM.KReporter.Common.store.whereOperators",{extend:"Ext.data.Store",requires:["SpiceCRM.KReporter.Common.model.whereOperator"],model:"SpiceCRM.KReporter.Common.model.whereOperator",proxy:{type:"ajax",url:"KREST/KReporter/core/whereoperators",extraParams:{designer:!1,path:"",grouping:""},reader:{type:"json"}},autoLoad:!1,listeners:{load:function(){this.add({operator:"parent_assign",values:1,display:languageGetText("LBL_OP_PARENT_ASSIGN")})}}}),Ext.define("SpiceCRM.KReporter.Common.model.enumoption",{extend:"Ext.data.Model",fields:["value","text"]}),Ext.define("SpiceCRM.KReporter.Common.store.enumoptions",{extend:"Ext.data.Store",requires:["SpiceCRM.KReporter.Common.model.enumoption"],model:"SpiceCRM.KReporter.Common.model.enumoption",proxy:{type:"ajax",url:"KREST/KReporter/core/enumoptions",extraParams:{path:""},reader:{type:"json"}}}),Ext.define("SpiceCRM.KReporter.Common.model.parentField",{extend:"Ext.data.Model",fields:["field","description"]}),Ext.define("SpiceCRM.KReporter.Common.store.parentFields",{extend:"Ext.data.Store",model:"SpiceCRM.KReporter.Common.model.parentField",proxy:{type:"ajax",url:"KREST/KReporter/core/modulefields",extraParams:{module:""},reader:{type:"json"}},autoLoad:!1}),Ext.define("SpiceCRM.KReporter.Common.model.autcompleterecord",{extend:"Ext.data.Model",fields:["itemid","itemtext"]}),Ext.define("SpiceCRM.KReporter.Common.store.autcompleterecords",{extend:"Ext.data.Store",requires:["SpiceCRM.KReporter.Common.model.autcompleterecord"],model:"SpiceCRM.KReporter.Common.model.autcompleterecord",proxy:{type:"ajax",url:"KREST/KReporter/core/autocompletevalues",extraParams:{path:""},reader:{type:"json",rootProperty:"data",totalProperty:"total"}},autoLoad:!1,listeners:{beforeload:function(){if(""===this.getProxy().extraParams.path)return!1}}}),Ext.Ajax.on("beforerequest",function(a,b,c){void 0!==SUGAR.App&&(b.headers||(b.headers={}),0===b.url.indexOf("KREST/KReporter")&&void 0!==SUGAR.App.api&&(b.url=b.url.replace("KREST/KReporter","rest/v10/KReports"),b.headers["OAuth-Token"]=SUGAR.App.api.getOAuthToken()),0===b.url.indexOf("KREST")&&void 0!==SUGAR.App.api&&(b.url=b.url.replace("KREST","rest/v10/KREST"),b.headers["OAuth-Token"]=SUGAR.App.api.getOAuthToken()))}),SpiceCRM.KReporter.timeformat="h:iA",SpiceCRM.KReporter.dateformat="m/d/Y",SpiceCRM.KReporter.versionstring="PGI+S1JlcG9ydGVyIFY0LjQuMDwvYj4=",SpiceCRM.KReporter.iconstring="PGEgaHJlZj0iaHR0cDovL3d3dy5mYWNlYm9vay5jb20va3JlcG9ydGVyLm9yZyI+PGltZyBzcmM9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkFBQUFBUUNBWUFBQUFmOC85aEFBQUFCSE5DU1ZRSUNBZ0lmQWhraUFBQUFBbHdTRmx6QUFBTEVnQUFDeElCMHQxKy9BQUFBQlYwUlZoMFEzSmxZWFJwYjI0Z1ZHbHRaUUEyTHpJMEx6QTU5c0ZyNHdBQUFCeDBSVmgwVTI5bWRIZGhjbVVBUVdSdlltVWdSbWx5WlhkdmNtdHpJRU5UTkFheTA2QUFBQUZQU1VSQlZEaU5sWks5U2dOQkZJWFByQlBVR0lqRUJIOEtHd1ZyeSszOUtiU3hVNS9BSmtVc3hFZlFON0FVQzBFUWJOSUlXdHZGVjdBeGliZ0drN2hoZis2OVl4RVRza0YyTjdlYUEvYzduRE16NnFoeVV3Qm1xc1pZTmlZWXBlUUY4UFkxa2E0dUZMSjJxWmlEVWlvVmJJekJwL05qZjdXb3FzTlEyVXBQNGEzUm1TUUFjck1aaEtHeU5RbWo3ZnFKQUlVZVBQZTdEODh2b2UzNklHRm9KZ2F6Sk1LWGxXMnNyUllCQUlkbkR3QUFKb1ltRnJDWVdJT0xFUmpBY0o5WW9Ja0pKUEVKMXYvZ2c5UDdhREttK0FwdSt5T2lPNjBHQUdBdXY1aXV3dk4xK1YrOVY3NGJxNUJ3aWVNejJPOVhpRW13ZFhJTEFIaTZPbzdvd1RBTE5CTWxQdU1vRU5GRTBDU01sZVY4S29QeFBlZTlEaTBzNkxhNm1NNU9KeG9FWGpBOCt6MGZ3Z0pMVEZCcjFoMzR2ZVR2UEFvMzZ3N0VCRFcxc1hOZUVzbzhHbU50cG5ZQW9KUzhXanJjL1FYbjZjYWMwcmJaL3dBQUFBQkpSVTVFcmtKZ2dnPT0iIC8+PC9hPiZuYnNwOzxhIGhyZWY9Imh0dHA6Ly93d3cueW91dHViZS5jb20vdXNlci90aGVLUmVwb3J0ZXIiPjxpbWcgc3JjPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQVFDQVlBQUFBZjgvOWhBQUFBQkhOQ1NWUUlDQWdJZkFoa2lBQUFBQWx3U0ZsekFBQUxFZ0FBQ3hJQjB0MSsvQUFBQUJWMFJWaDBRM0psWVhScGIyNGdWR2x0WlFBMkx6STBMekE1OXNGcjR3QUFBQngwUlZoMFUyOW1kSGRoY21VQVFXUnZZbVVnUm1seVpYZHZjbXR6SUVOVE5BYXkwNkFBQUFGeVNVUkJWRGlObFpDOVNnTkJGSVcvR1lPZ2paQktVUHdob0tDeFVCQWlpMFc2Rkw2SmtrZHdueU85VlVxeFVHelNxSVdvSUNva0NHb25hS09JN3V6T25iR0lXVjJUWUR4d09Od3pNL2VlTytwK2ZUM3Z2ZDl6c01ZL29PRkVLYlhCYlJBY3Y5YnIvcjk0cmRmOWJSQWNjMWtxcFNhUTBiOXdXU3A1YmNSbW9qVWFqWUhYTUdMUlVmTGRJQXhEeXVVeVlSaWlsRW9KZENsQWxGZzRYQ3BtWXYxZW81OTY3LzNoVXRIclNLUnZ4Si9UZXRXUkNOcFk0YmxXUzgzMmtMWjIyS3QrcnRVd1ZsQTdoWUl2am80TS9IRS9jZlgrUWM0NElSWmg5Zm9tUFRoZFhNaGNYTDIrNmZJQWpCTjBiQzJ4dFJ6Tnp3RndORDlIeCtzUTZQSTYxSkU0WW1tbkFJaEZDSnF0akFJRXpSWVRtMXNFelZicVIrTFF4bG1NdEFuMDFmM1phV2FxVmZabnAxUGZPRXN1RnNkVGtqQ21kWm9Bb0hMMzBMT3UzRDJ3T3pYSmkzUEU0bERiK2Z6WnNGSXI0N21odE1sZmVIR09SeXZFM3AvbjhGSjVjeHcwSlZrZTZQVVhobEFYdzRyS0ozbVdmMkgwckN0ZUFBQUFBRWxGVGtTdVFtQ0MiIC8+PC9hPg==",SpiceCRM.KReporter.icon1string="PGEgaHJlZj0iaHR0cDovL3d3dy5mYWNlYm9vay5jb20va3JlcG9ydGVyLm9yZyI+PGltZyBzdHlsZT0id2lkdGg6MjBweDtoZWlnaHQ6MjBweDsiIHNyYz0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDTUFBQUFqQ0FZQUFBQWUyYk5aQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUEyWnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcEZNVUV6TnprMk5UWkVRVGxGTkRFeE9EbENRVVpDTVRFeE1qRTBNekJHT1NJZ2VHMXdUVTA2Ukc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwRU1UUXhSakl5UlVFNU56WXhNVVUwT1RsRk9EaEdNa00wTURBMlJVUXlNaUlnZUcxd1RVMDZTVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRHBFTVRReFJqSXlSRUU1TnpZeE1VVTBPVGxGT0RoR01rTTBNREEyUlVReU1pSWdlRzF3T2tOeVpXRjBiM0pVYjI5c1BTSkJaRzlpWlNCUWFHOTBiM05vYjNBZ1ExTTJJQ2hYYVc1a2IzZHpLU0krSUR4NGJYQk5UVHBFWlhKcGRtVmtSbkp2YlNCemRGSmxaanBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2tVeVFUTTNPVFkxTmtSQk9VVTBNVEU0T1VKQlJrSXhNVEV5TVRRek1FWTVJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPa1V4UVRNM09UWTFOa1JCT1VVME1URTRPVUpCUmtJeE1URXlNVFF6TUVZNUlpOCtJRHd2Y21SbU9rUmxjMk55YVhCMGFXOXVQaUE4TDNKa1pqcFNSRVkrSUR3dmVEcDRiWEJ0WlhSaFBpQThQM2h3WVdOclpYUWdaVzVrUFNKeUlqOCtEdURVOGdBQUF1aEpSRUZVZU5yTW1OMUxrM0VVeDgvYzBMTFkwa29GSTJjWHpvS3lzaEpMV2l1SkRMeW9tK2l1L29JU01qSXFLTUhlTHVvbUNMcW95N3JwcnJvbzdZM0NJS09YbXlhQnM4aDhpWFJidFQxdGs3N242Y3hrdWowdmV6M3dnZCtlUGI5enZwem45M1orbG0wSHI1TUJzd0kzMkFVMmdUcFFCaHpBRHliQklIZ04rc0FURU5QcjNLYnp2UXJRQVE2QnFpVHZPQVFuMkExT2dsRndDMXdCNDFwQmlqVCtMd2Fud0JBNGtVSklNcXVTZnR6L3RQZ3pKWVkvd1N2UURVb3BQZVArNThTZnk2Z1l0M1JjVDVrMTl0Y3YvbldKMlFudWd5V1VIV08vRHlST1NqR2N3cnNaK0N4YXRsRGl1SktKS1FHM1pVYmt3ampPSFlrN1I4eXhMSXdSTFdzQW5ZbnJUS1dzQzRiTmFpMmlkazg5dFd4MDB2S2xpeWdXbXlibFQ1UTZ6dCtqc0JMVjQ0TGozZ0JqY1RGSHpJd1RHNFJjUHQ1R205ZXVtUGMvQStQbktPZ3FrdXdjTnBPVnZXN1h2RUpNR01lM3NaRHRKbFpXMVZvYWEyYmF3VjhLbmIzV1M1OUgvT3J2MzZHSUVWYzhURHcyMmZSTTJlTFNtWWxBTDk4TVUvL2JMK2xrcDVVL1UyTW04cXhFWW1uUExNNU12WkVlZGJYTHFMckNycllYRlAvZjlKM1ZaZVJwV3FXMm85RnBlajdnTXlyR1paUHppRzVyOTZ5bWZhMXI1anhmNTZwU1lmTjluVFFqcHB3L2t6M1RLOW5JZU5CTU56dG5KbUJFME5qM0lIbUhKdFIyZGFVRGcvamZFU1h3VTZGdkV3RzEvV0Z3MUl5WWdBWEhUczVualpuZWx6cmJhT3VHbFdyNzRZdFA2dFJPdzN6OG1UNVNZWmlYeFF3VWlKaDNMS2EzUU1ROFlqSFBlRnptV1FqSGY4eGllSisvbVdjeEhEOGEzK2V2Z2xDZWhJUWsvc3hKajlQVVk5aExPS0x1MWt4SWlaZ1YweE1mSnBaWjVXMkpsQ2NOdVp4Qm9JbjMyY1F6TUQ4NElEVnpMc3d2OFpSa3BZb1g3QWZoTEFzSlN4eXZWaEhIdHdkN3dGU1doRXlKL3o2OTVlMVQwQXplWjJHTU5JdC9RNFUvNzFsYndKa01UUHVRK0dsS3RSZHExUk9LM0VMVWdndDY3bGdTak4rL0tQMjdady9XZEM2TGVCM29rcnVhSFZLMHgyK3V5dVU4eEllWkgrbmNYUDBWWUFBUjFyV25UaDFHS2dBQUFBQkpSVTVFcmtKZ2dnPT0iIC8+PC9hPg0K",SpiceCRM.KReporter.icon2string="PGEgaHJlZj0iaHR0cDovL3d3dy55b3V0dWJlLmNvbS91c2VyL3RoZUtSZXBvcnRlciI+PGltZyBzdHlsZT0id2lkdGg6MjBweDtoZWlnaHQ6MjBweDsiIHNyYz0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDTUFBQUFqQ0FZQUFBQWUyYk5aQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUEyWnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEb3hNMEl6TUVaRk56WkVRVGxGTkRFeE9EbENRVVpDTVRFeE1qRTBNekJHT1NJZ2VHMXdUVTA2Ukc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwRVEwUTBRek0xTjBFNU56WXhNVVUwT1RZNU1VUkNOREZGTnpJeVFqQXdNU0lnZUcxd1RVMDZTVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRHBFUTBRMFF6TTFOa0U1TnpZeE1VVTBPVFk1TVVSQ05ERkZOekl5UWpBd01TSWdlRzF3T2tOeVpXRjBiM0pVYjI5c1BTSkJaRzlpWlNCUWFHOTBiM05vYjNBZ1ExTTJJQ2hYYVc1a2IzZHpLU0krSUR4NGJYQk5UVHBFWlhKcGRtVmtSbkp2YlNCemRGSmxaanBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2pFMFFqTXdSa1UzTmtSQk9VVTBNVEU0T1VKQlJrSXhNVEV5TVRRek1FWTVJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPakV6UWpNd1JrVTNOa1JCT1VVME1URTRPVUpCUmtJeE1URXlNVFF6TUVZNUlpOCtJRHd2Y21SbU9rUmxjMk55YVhCMGFXOXVQaUE4TDNKa1pqcFNSRVkrSUR3dmVEcDRiWEJ0WlhSaFBpQThQM2h3WVdOclpYUWdaVzVrUFNKeUlqOCsyaVJiM2dBQUF5cEpSRUZVZU5yRW1GOUkwMUVVeDgvMm02Nk5iYTZ4dFI2RUNLRmZid1ZGb1E5WmJXS29ML2JTYXlMaWkxQ0JnUS9WUTZJVUtmWG8yM3FzbDE3VUVpbXBCNkdnSHF5WEhGYXdoV1hhMmtZeXQvM1dPbWVjaVgvMis5M2Y5blB6d0ljTmR1KzUzNTE3N2ozM1h0T25waVlvd3lTa0ZRa2dwNUZqeUVHa0FVa2dmNUF3OGg2WlExNGpPYjNPVFRyRkhFSnVJRmVSdzJXSS80azhSaDRpdjBTTnpZTGY2NUZieURka3FFd2h3TzJIdVA5dDlsZVJHSnFDZDhnd1lnZGpSdjN2c2orNVhER3QzUEVrN0syUnY3ZnNYNWVZaThoenhBM1ZNZkw3Z3NmUkZFTWhmTFlIMHlJeUc0OGpxNG14SWs5NG1kYkNhSnluUE80dU1ZTlZ5QkdSblVCdTd0eG4vTWpYR2t4UEtVc2hSNUdWWW1TdTdaT1FZdjVjTDBiR2dwOVJyUTNOSkVuZzZ1aUFBN0lNWnJzZFRQWDFJRG1kT01rbEZtTStEN2xrRXZLWkRPVGljY2hFbzVDWW1vSjhOcXNsYUFWcEpDSG5SRHRyNC9nNE5IUjFWZnpYWFlFQVJBWUd0SnBRbWx3d2M5RlROWXZQQncyZG5ZYm13ZFhlRG5WK3Y2aFprTVNjMG1waHBRUTNtWXhsQmZhM3lySndaWkdZNDZMSXFObmYrWG40TVRJQ3l1cXFVSS9GTGR6UVpUT2ZSOVFycWMybStoc2w2ZTlRQ01MQklLeU1qUlVTVmpVNFZxdElqSWZFdURRalhGY24vTmYvMXRkaGRXSUN2blIzUTNaNXVlTFVvdFdVRkFrU0hvb2NEdkQyOUlDM3Q3Znd2V1FVMDJtUm02U0ZqNHFxWW5LSmhHYm92WDE5NE92dkI4bHR1TWpIU014bjVJaGFDMlZ0VGJXM282V2xnQjZqalZCZ2k1UXpIN1JhcEplV0NydXFVZHNJaDBWTkZrak1LNjBXRkpuNDVLUWhJY25aV1QySi9iSlltNzd6bHF4YW01eHRiWVVOME9MeGJDNVRpWkpWa3JhdkxLcExGRWxGQVNVV2cwd2tBb25wYWQyMVNVRkNmSW92dlJKeU9Vak96RlN6Y3RQNFNySHNQdUp6eFg1WWlzZmZQT2xSbUViM1Njd29qNy90MlBtQU1yckdRaFo0M0YxbllOb2lyL0NkdVJhVzRQSFNhbGVWUmVReWJRdFZGckxCNHl5S0xuSDBlbkFKaVZkSlNKejl6K205M3I1Qm1wR1BWY2lSWnZaZjFzV2ZhdFlaNU00ZUxQc1Urem5MZml0NkVrbnpLd1RkYSs3cGVXUFpZZFQrUHZjZjNwcXNSaDZMdHI1Y25lZExlL0hseXNOSEVDckxNU012Vi84RkdBQ01IZFdvM284YXpRQUFBQUJKUlU1RXJrSmdnZz09IiAvPjwvYT4NCg==",Ext.define("SpiceCRM.KReporter.kcombo",{extend:"Ext.form.field.ComboBox",alias:"widget.kcombo",lazyRender:!1,listeners:{}});var _dateFormat="Y-m-d";void 0!==SUGAR.App&&SUGAR.App.user.attributes.preferences&&(_dateFormat=SUGAR.App.user.attributes.preferences.datepref),void 0!==cal_date_format&&(_dateFormat=cal_date_format.replace(/%/g,"")),Ext.define("SpiceCRM.KReporter.common.window.datetimepicker",{extend:"Ext.window.Window",padding:10,border:!1,event:null,title:languageGetText("LBL_PICK_DATETIME"),width:450,modal:!0,closeAction:"hide",items:[{xtype:"datefield",fieldLabel:"Date",format:_dateFormat},{xtype:"timefield",fieldLabel:"Time",format:"H:i"}],listeners:{show:function(){""!==this.event.record.get(this.event.column.itemId+"key")?(this.down("timefield").setValue(new Date(this.event.record.get(this.event.column.itemId+"key"))),this.down("datefield").setValue(new Date(this.event.record.get(this.event.column.itemId+"key")))):(this.down("timefield").setValue("00:00"),this.down("datefield").setValue(new Date))},close:function(){var a="Y-m-d";void 0!==SUGAR.App&&(a=SUGAR.App.user.attributes.preferences.datepref),void 0!==cal_date_format&&(a=cal_date_format.replace(/%/g,""));var b=this.down("datefield").getValue(),c=this.down("timefield").getValue();if(null!==b&&null!==c){var d=new Date(b),e=new Date(c);this.event.record.set(this.event.column.itemId+"key",Ext.Date.format(d,"Y-m-d")+" "+Ext.Date.format(e,"H:i:s")),this.event.record.set(this.event.column.itemId,Ext.Date.format(d,a)+" "+Ext.Date.format(e,"H:i"))}}}}),SpiceCRM.KReporter.Common={kreporter_version:"ce",kreporter_cockpit:!1,currencies:{"-99":{symbol:"€"}},S4:function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},kGuid:function(){return"k"+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()},redirect:function(a,b){var c="KReports";if(b&&b.module&&(c=b.module),void 0!==SUGAR.App)switch(a){case"list":location.assign("#"+c);break;case"detail":b.newtab?window.open("#"+c+"/"+b.id):location.assign("#"+c+"/"+b.id);break;case"edit":location.assign("#"+c+"/"+b.id+"/layout/edit")}else switch(a){case"list":location.assign("index.php?module="+c);break;case"detail":b.newtab?window.open("index.php?module="+c+"&action=DetailView&record="+b.id):location.assign("index.php?module="+c+"&action=DetailView&record="+b.id);break;case"edit":location.assign("index.php?module="+c+"&action=EditView&record="+b.id)}},download:function(a){a=a||{};var b=a.url,c=a.method||"POST",d=a.params||{};void 0!==SUGAR.App&&(0===b.indexOf("KREST/KReporter")&&(b=b.replace("KREST/KReporter","rest/v10/KReports"),b=b.replace("action","actionraw")),0===b.indexOf("KREST")&&(b=b.replace("KREST","rest/v10/KREST"),b=b.replace("action","actionraw")));var e=Ext.create("Ext.form.Panel",{standardSubmit:!0,url:b,method:c,jsonSubmit:!0});void 0!==SUGAR.App?(d["OAuth-Token"]=SUGAR.App.api.getOAuthToken(),e.submit({params:d,headers:{"OAuth-Token":SUGAR.App.api.getOAuthToken()}})):e.submit({params:d}),Ext.defer(function(){e.close()},100)},downloadParamsToInputs:function(a){var b=[];for(var c in a){var d=[].concat(a[c]);Ext.each(d,function(a){b.push(SpiceCRM.KReporter.Common.downloadCreateInput(c,a))})}return b},downloadCreateInput:function(a,b){return{name:Ext.htmlEncode(a),tag:"input",type:"hidden",value:Ext.htmlEncode(b)}},downloadRemoveNode:function(a){a.onload=null,a.parentNode.removeChild(a)},gridSetEditor:function(a,b,c){if("onoffswitch"==a.column.itemId&&("yo1"==a.record.data.usereditable||"yo2"==a.record.data.usereditable?a.column.setEditor(new Ext.form.field.ComboBox({typeAhead:!0,queryMode:"local",store:new Ext.data.ArrayStore({id:0,fields:["value","text"],data:[["yo1",languageGetText("LBL_ONOFF_YO1")],["yo2",languageGetText("LBL_ONOFF_YO2")]]}),displayField:"text",valueField:"value"})):a.column.setEditor(null)),"operator"==a.column.itemId)if("yes"==a.record.data.usereditable||SpiceCRM.KReporter.Designer.Application.designMode){b.whereOperatorStore.currentPath===a.record.get("path")&&b.whereOperatorStore.grouping===a.record.get("grouping")||(b.whereOperatorStore.removeAll(),b.whereOperatorStore.getProxy().extraParams.path=a.record.data.path,b.whereOperatorStore.getProxy().extraParams.designer=c.designMode,b.whereOperatorStore.getProxy().extraParams.grouping=a.record.data.grouping,b.whereOperatorStore.load()),b.whereOperatorStore.currentPath=a.record.get("path"),b.whereOperatorStore.grouping=a.record.get("grouping"),b.enumOptionsStore.enumpath=null;var d=new SpiceCRM.KReporter.kcombo({typeAhead:!0,triggerAction:"all",queryMode:"local",editable:!0,store:b.whereOperatorStore,displayField:"display",valueField:"operator"});a.column.setEditor(d),new Ext.LoadMask({target:d,msg:"Loading Operators",store:d.store,listeners:{hide:function(a,b){a.target.expand()}}})}else a.column.setEditor(null);if("value"===a.column.itemId||"valueto"===a.column.itemId){var e=b.getOperatorCount(a.record.get("operator"));if(SpiceCRM.KReporter.designMode||"yo1"!=a.record.get("usereditable")&&"yo2"!=a.record.get("usereditable")||(e=0),0===e||"valueto"==a.column.id&&2!=e)return a.cancel=!0,!1;switch(a.record.get("operator")){case"autocomplete":b.autocompleteStore.getProxy().extraParams.path=a.record.data.path,_autoCompleteEditor=new Ext.form.ComboBox({store:b.autocompleteStore,valueField:"itemid",displayField:"itemtext",typeAhead:!0,mode:"remote",pageSize:25,listConfig:{minWidth:250},minChars:3,triggerAction:"all",forceSelection:!1,selectOnFocus:!0}),a.column.setEditor(_autoCompleteEditor),a.column.renderer=function(c){return null===c||void 0===c?"":c.constructor===String?(_renderedValues=[],_rec=b.autocompleteStore.findRecord("itemid",c),_rec&&_renderedValues.push(_rec.data.itemtext),_rendered=_renderedValues.join(", "),a.column.renderedvalue=_rendered,a.record.data.valueinit=_rendered,_rendered):c};break;case"parent_assign":_paramsObj={};var f=!1,g=Ext.util.Format.htmlDecode(SpiceCRM.KReporter.Designer.Application.reportRecord.get("integration_params"));if(g&&""!==g&&(_paramsObj=Ext.decode(g),void 0===_paramsObj.activePlugins||void 0===_paramsObj.activePlugins.kpublishing||"1"!==_paramsObj.activePlugins.kpublishing&&1!==_paramsObj.activePlugins.kpublishing||(f=_paramsObj.kpublishing)),!1===f||void 0===f.subpanelModule||""===f.subpanelModule)return a.cancel=!0,!1;b.parentFieldsStore.removeAll(),b.parentFieldsStore.getProxy().extraParams.module=f.subpanelModule,b.parentFieldsStore.load(),a.column.setEditor(new Ext.form.ComboBox({store:b.parentFieldsStore,valueField:"field",displayField:"description",typeAhead:!0,queryMode:"local",triggerAction:"all",editable:!1,selectOnFocus:!0,listWidth:200}));break;case"function":a.column.setEditor(new Ext.form.ComboBox({store:b.whereFunctionsStore,valueField:"field",displayField:"description",queryMode:"local",triggerAction:"all",editable:!0,selectOnFocus:!0,listWidth:200,listeners:{focus:function(){}}}));break;case"reference":a.column.setEditor(new Ext.form.TextField);break;default:switch(a.record.data.type){case"datetimecombo":case"datetime":case"date":switch(a.record.data.operator){case"lastndays":case"lastnfdays":case"lastnweeks":case"notlastnweeks":case"lastnfweeks":case"lastnfmonth":case"lastnmonthDaily":case"lastnfquarter":case"lastnyear":case"lastnyearDaily":case"nextndays":case"nextnweeks":case"notnextnweeks":case"nextnmonth":case"nextnmonthDaily":case"nextnfquarter":case"nextnyear":case"nextnyearDaily":case"betwndays":a.column.setEditor(new Ext.form.NumberField);break;case"lastnddays":case"nextnddays":case"betwnddays":SpiceCRM.KReporter.Designer&&SpiceCRM.KReporter.Designer.Application.designMode?a.column.setEditor(new Ext.form.NumberField):a.column.setEditor(new Ext.form.DateField({editable:!1,value:a.value,format:cal_date_format.replace(/%/g,"")}));break;default:if("date"!==a.record.data.type)return Ext.create(SpiceCRM.KReporter.common.window.datetimepicker,{event:a}).show(),a.cancel=!0,!1;a.column.setEditor(new Ext.form.DateField({editable:!1,format:cal_date_format.replace(/%/g,"")}))}break;case"user_name":case"assigned_user_name":case"enum":case"parent_type":case"radioenum":case"multienum":if("starts"==a.record.data.operator||"notstarts"==a.record.data.operator||"contains"==a.record.data.operator||"notcontains"==a.record.data.operator)a.column.setEditor(new Ext.form.TextField);else{if(b.enumOptionsStore.enumpath!==a.record.get("path")||b.enumOptionsStore.enumgrouping!==a.record.get("grouping")){b.enumOptionsStore.removeAll(),b.enumOptionsStore.getProxy().extraParams.path=a.record.get("path");var h=[];b.view.getStore().each(function(a){h.push({fieldid:a.get("fieldid"),path:a.get("path"),operator:a.get("operator"),value:a.get("value"),valuekey:a.get("valuekey"),valueto:a.get("valueto"),valuetokey:a.get("valuetokey")})},this),b.enumOptionsStore.getProxy().extraParams.operators=Ext.encode(h),b.enumOptionsStore.getProxy().extraParams.grouping=a.record.get("grouping"),b.enumOptionsStore.load()}switch(b.enumOptionsStore.enumpath=a.record.get("path"),b.enumOptionsStore.enumgrouping=a.record.get("grouping"),a.record.data.operator){case"oneof":case"oneofnot":case"oneofnotornull":var i=new SpiceCRM.KReporter.kcombo({editable:!1,triggerAction:"all",lazyRender:!1,multiSelect:!0,queryMode:"local",store:b.enumOptionsStore,displayField:"text",valueField:"value",listConfig:{minWidth:200,resizable:!0},forceSelection:!1});a.column.setEditor(i),a.column.renderer=function(c){return null===c||void 0===c?"":c.constructor===Array?(_renderedValues=[],Ext.each(c,function(a){_rec=b.enumOptionsStore.findRecord("value",a),_rec&&_renderedValues.push(_rec.data.text)}),_rendered=_renderedValues.join(", "),a.column.renderedvalue=_rendered,a.record.data.valueinit=_rendered,_rendered):c},new Ext.LoadMask({target:i,msg:"Loading Options",store:i.store,listeners:{hide:function(a,b){a.target.expand()}}});break;default:var j=new SpiceCRM.KReporter.kcombo({editable:!0,typeAhead:!0,multiSelect:!1,triggerAction:"all",queryMode:"local",store:b.enumOptionsStore,displayField:"text",valueField:"value",listConfig:{minWidth:200,resizable:!0},forceSelection:!0});a.column.setEditor(j),new Ext.LoadMask({target:j,msg:"Loading Options",store:j.store,listeners:{hide:function(a,b){a.target.expand()}}}),a.column.renderer=function(c){return null===c||void 0===c?"":(_rec=b.enumOptionsStore.findRecord("value",c),_rec?(_rendered=_rec.data.text,a.column.renderedvalue=_rendered,a.record.data.valueinit=_rendered,_rendered):c)}}}break;case"bool":a.column.setEditor(new Ext.form.ComboBox({triggerAction:"all",lazyRender:!0,queryMode:"local",store:new Ext.data.ArrayStore({id:0,fields:["value","text"],data:[["1",languageGetText("LBL_BOOL_1")],["0",languageGetText("LBL_BOOL_0")]]}),displayField:"text",valueField:"value"}));break;default:switch(a.record.data.operator){case"oneof":case"oneofnot":case"oneofnotornull":b.enumOptionsStore.enumpath===a.record.get("path")&&b.enumOptionsStore.enumgrouping===a.record.get("grouping")||(b.enumOptionsStore.removeAll(),b.enumOptionsStore.getProxy().extraParams.path=a.record.get("path"),b.enumOptionsStore.getProxy().extraParams.grouping=a.record.get("grouping"),b.enumOptionsStore.load()),b.enumOptionsStore.enumpath=a.record.get("path"),b.enumOptionsStore.enumgrouping=a.record.get("grouping"),a.column.setEditor(new SpiceCRM.KReporter.kcombo({editable:!1,triggerAction:"all",lazyRender:!1,multiSelect:!0,queryMode:"local",selectOnFocus:!0,store:b.enumOptionsStore,displayField:"text",valueField:"value",listConfig:{minWidth:200,resizable:!0},renderer:function(){}}));break;case"eqgrouped":b.enumOptionsStore.enumpath===a.record.get("path")&&b.enumOptionsStore.enumgrouping===a.record.get("grouping")||(b.enumOptionsStore.removeAll(),b.enumOptionsStore.getProxy().extraParams.path=a.record.get("path"),b.enumOptionsStore.getProxy().extraParams.grouping=a.record.get("grouping"),b.enumOptionsStore.load()),b.enumOptionsStore.enumpath=a.record.get("path"),b.enumOptionsStore.enumgrouping=a.record.get("grouping"),a.column.setEditor(new SpiceCRM.KReporter.kcombo({forceSelection:!0,triggerAction:"all",multiSelect:!1,queryMode:"local",store:b.enumOptionsStore,displayField:"text",valueField:"value",listConfig:{minWidth:200,resizable:!0}}));break;default:a.column.setEditor(new Ext.form.TextField)}}}}},gridAfterEdit:function(a){switch(a.column.itemId){case"value":case"valueto":switch(a.record.data.operator){case"autocomplete":case"parent_assign":case"function":a.record.set(a.column.itemId+"key",a.value);break;case"reference":break;default:switch(a.record.data.type){case"datetime":case"datetimecombo":break;case"date":switch(a.record.data.operator){case"lastndays":case"lastnfdays":case"lastnweeks":case"notlastnweeks":case"lastnfweeks":case"lastnfmonth":case"lastnmonthDaily":case"lastnfquarter":case"lastnyear":case"lastnyearDaily":case"nextndays":case"nextnweeks":case"notnextnweeks":case"betwndays":case"nextnmonthDaily":case"nextnfquarter":case"nextnyear":case"nextnyearDaily":break;case"lastnddays":case"nextnddays":case"betwnddays":break;default:a.record.set(a.column.itemId+"key",Ext.Date.format(a.value,"Y-m-d")),a.record.set(a.column.itemId,Ext.Date.format(a.value,cal_date_format.replace(/%/g,"")))}break;case"user_name":case"assigned_user_name":case"enum":case"radioenum":case"parent_type":case"multienum":switch(a.record.data.operator){case"oneof":case"oneofnot":case"oneofnotornull":break;case"starts":case"notstarts":case"contains":case"notcontains":break;default:a.record.set(a.column.itemId+"key",a.value);var b=a.column.getEditor().getStore(),c=b.find("value",a.value);c>0&&a.record.set(a.column.itemId,b.getAt(c).get("text"))}break;case"bool":a.record.set(a.column.itemId+"key",a.value),a.record.set(a.column.itemId,languageGetText("LBL_BOOL_"+a.value))}}break;case"operator":a.record.set("value",""),a.record.set("valueto",""),a.record.set("valuekey",""),a.record.set("valuetokey",""),a.record.set("valueinit","")}},get_user_datetime_format:function(){Ext.Ajax.request({url:"KREST/KReporter/user/datetimeformat",method:"GET",success:function(a,b){200==Ext.decode(a.status)&&(_response=Ext.decode(a.responseText),SpiceCRM.KReporter.timeformat=_response.timef,SpiceCRM.KReporter.dateformat=_response.datef)},listeners:{beforerequest:function(a,b,c){void 0!==SUGAR.App&&(b.headers||(b.headers={}),0===b.url.indexOf("KREST/KReporter")&&void 0!==SUGAR.App.api&&(b.url=b.url.replace("KREST/KReporter","rest/v10/KReports"),b.headers["OAuth-Token"]=SUGAR.App.api.getOAuthToken()),0===b.url.indexOf("KREST")&&void 0!==SUGAR.App.api&&(b.url=b.url.replace("KREST","rest/v10/KREST"),b.headers["OAuth-Token"]=SUGAR.App.api.getOAuthToken()))}}})},get_user_prefs:function(){Ext.Ajax.request({url:"KREST/KReporter/user/userprefs",method:"GET",success:function(a,b){200==Ext.decode(a.status)&&(_response=Ext.decode(a.responseText),SpiceCRM.KReporter.timeformat=_response.timef,SpiceCRM.KReporter.dateformat=_response.datef,SpiceCRM.KReporter.precision=_response.precision)},listeners:{beforerequest:function(a,b,c){void 0!==SUGAR.App&&(b.headers||(b.headers={}),0===b.url.indexOf("KREST/KReporter")&&void 0!==SUGAR.App.api&&(b.url=b.url.replace("KREST/KReporter","rest/v10/KReports"),b.headers["OAuth-Token"]=SUGAR.App.api.getOAuthToken()),0===b.url.indexOf("KREST")&&void 0!==SUGAR.App.api&&(b.url=b.url.replace("KREST","rest/v10/KREST"),b.headers["OAuth-Token"]=SUGAR.App.api.getOAuthToken()))}}})},isSugar6:function(){return void 0===SUGAR.App},isKReporterPro:function(){return"pro"==SpiceCRM.KReporter.Common.kreporter_version},isKReporterCockpit:function(){return SpiceCRM.KReporter.Common.kreporter_cockpit},downgradeJQuerySyntax:function(){return _jv=$().jquery,_jv=parseInt(_jv.replace(/\./g,"")),_jv<=164},catchDynamicOptionsFromSession:function(a){return _dynamicoptions=null,SpiceCRM.KReporter.Common.isKReporterPro()&&Ext.Ajax.request({async:!1,url:"KREST/KReporter/plugins/action/kpdrilldown/getStoredDynamicoptions",params:{reportId:a},success:function(a){_dynamicoptions=Ext.JSON.decode(a.responseText)}}),_dynamicoptions},catchDynamicOptionsFromUrl:function(){return _dynamicoptions=null,SpiceCRM.KReporter.Common.isSugar6()?(_urlParams=Ext.urlDecode(window.location.search),void 0!==_urlParams.dynamicoptions&&(_dynamicoptions=_urlParams.dynamicoptions)):(_urlSearch=window.location.href.substr((window.location.protocol+"//"+window.location.hostname+window.location.pathname).length),_urlSearchParams=_urlSearch.split("/"),_iDynOpts=_urlSearchParams.indexOf("dynamicoptions"),_iDynOpts>-1&&(_iDynOpts++,_dynamicoptions=_urlSearchParams[_iDynOpts])),_dynamicoptions},buildDynamicOptionsUrl:function(a,b){return _url=null,_dynamicoptions=this.catchDynamicOptionsFromSession(a),null!==_dynamicoptions&&(_url="KREST/KReporter/"+a+"/"+b+"/dynamicoptions"),_url},sendParentBeanParams:function(a,b){return"undefined"!=typeof currentRecord&&"undefined"!=typeof currentModule&&currentRecord!=b&&(a.extraParams.parentbeanId=currentRecord,a.extraParams.parentbeanModule=currentModule),a},getConfig:function(){Ext.Ajax.request({url:"KREST/KReporter/core/config",async:!1,method:"GET",success:function(a,b){200==Ext.decode(a.status)&&(_response=Ext.decode(a.responseText),void 0===SpiceCRM.KReporter&&(SpiceCRM.KReporter={}),void 0===SpiceCRM.KReporter.config&&(SpiceCRM.KReporter.config={}),_response.KReports&&(SpiceCRM.KReporter.config=_response.KReports),SpiceCRM.KReporter.config.korgmanaged=!1,SpiceCRM.KReporter.config.authCheck&&"KAuthObjects"==SpiceCRM.KReporter.config.authCheck&&(SpiceCRM.KReporter.config.korgmanaged=!0),SpiceCRM.KReporter.config.securitygroups=!1,SpiceCRM.KReporter.config.authCheck&&"SecurityGroups"==SpiceCRM.KReporter.config.authCheck&&(SpiceCRM.KReporter.config.securitygroups=!0),void 0!==_response.default_currency_symbol&&(SpiceCRM.KReporter.Common.currencies[-99].symbol=_response.default_currency_symbol),Ext.Ajax.request({url:"KREST/KReporter/core/currencies",method:"GET",success:function(a,b){SpiceCRM.KReporter.Common.currencies=Ext.decode(a.responseText)},failure:function(a,b){},scope:this}),void 0!==_response.kreporter_version&&(SpiceCRM.KReporter.Common.kreporter_version=_response.kreporter_version),void 0!==_response.kreporter_cockpit&&(SpiceCRM.KReporter.Common.kreporter_cockpit=_response.kreporter_cockpit))}})},getLabels:function(){Ext.Ajax.request({url:"KREST/KReporter/core/labels",method:"GET",success:function(a,b){200==Ext.decode(a.status)&&(_response=Ext.decode(a.responseText),SpiceCRM.KReporter.Common.isSugar6()?SUGAR.language.setLanguage("KReports",_response):SUGAR.App.lang.setLanguage("KReports",_response))}})},getAccessLevel:function(){return _accesslevel=0,void 0!==SpiceCRM.KReporter.Viewer.Application&&(SpiceCRM.KReporter.Viewer.Application.reportRecord.data.acl.edit&&(_accesslevel=1),SpiceCRM.KReporter.Viewer.Application.reportRecord.data.acl.delete&&(_accesslevel=2)),_accesslevel},getSaveLayoutLevel:function(){return _saveLayoutLevel=1,void 0!==SpiceCRM.KReporter.config.saveLayoutLevel&&(_saveLayoutLevel=SpiceCRM.KReporter.config.saveLayoutLevel),_saveLayoutLevel}},Ext.util.Format.kreportLinkBuilder=function(a,b,c,d,e){if(void 0===a||void 0===b||void 0===c||void 0===d||void 0===e)return a;var f=void 0!==b.get("unionid")?b.get("unionid"):"root",g=e.panel.getColumns()[c].dataIndex;if(!e.store.linkedFields||void 0===e.store.linkedFields[g]||null!==e.store.linkedFields[g]&&void 0===b.get(e.store.linkedFields[g][f].idfield)){if(!e.store.buildLinkedFields)return a;e.store.buildLinkedFields()}return e.store.linkedFields&&null!==e.store.linkedFields[g]?"<a href=\"#\" onclick=\"SpiceCRM.KReporter.Common.redirect('detail', {module:'"+e.store.linkedFields[g][f].module+"', id:'"+b.get(e.store.linkedFields[g][f].idfield)+'\', newtab: true}); return false;" style="text-align:left">'+a+"</a>":a},Ext.util.Format.fieldRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:"function"==typeof f.buildLinkedFields?Ext.util.Format.kreportLinkBuilder(a,c,e,f,g):a},Ext.util.Format.ktextRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:(b.style="white-space: normal;",Ext.util.Format.kreportLinkBuilder(a,c,e,f,g))},Ext.util.Format.base64Renderer=function(a){return""===a||null===a?a:Ext.util.Format.htmlEncode(atob(a))},Ext.util.Format.kboolRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:Ext.util.Format.kreportLinkBuilder(languageGetText("LBL_BOOL_"+a),c,e,f,g)},Ext.util.Format.kcurrencyRenderer=function(a,b,c,d,e,f,g){
return""===a||null===a?a:("undefined"==typeof dec_sep?(Ext.util.Format.decimalSeparator=SUGAR.App.user.attributes.preferences.decimal_separator,Ext.util.Format.thousandSeparator=SUGAR.App.user.attributes.preferences.number_grouping_separator):(Ext.util.Format.decimalSeparator=dec_sep,Ext.util.Format.thousandSeparator=num_grp_sep),Ext.util.Format.currencySign=SpiceCRM.KReporter.Common.currencies[-99].symbol,"object"==typeof c&&void 0!==c.get(g.panel.getColumns()[e].dataIndex+"_curid")&&SpiceCRM.KReporter.Common.currencies[c.get(g.panel.getColumns()[e].dataIndex+"_curid")]&&(Ext.util.Format.currencySign=SpiceCRM.KReporter.Common.currencies[c.get(g.panel.getColumns()[e].dataIndex+"_curid")].symbol),Ext.util.Format.currencyPrecision=SpiceCRM.KReporter.precision,f&&"function"==typeof f.buildLinkedFields?Ext.util.Format.kreportLinkBuilder(Ext.util.Format.currency(a),c,e,f,g):Ext.util.Format.currency(a))},Ext.util.Format.kcurrencyintRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:("undefined"==typeof dec_sep?(Ext.util.Format.decimalSeparator=SUGAR.App.user.attributes.preferences.decimal_separator,Ext.util.Format.thousandSeparator=SUGAR.App.user.attributes.preferences.number_grouping_separator):(Ext.util.Format.decimalSeparator=dec_sep,Ext.util.Format.thousandSeparator=num_grp_sep),Ext.util.Format.currencySign=SpiceCRM.KReporter.Common.currencies[-99].symbol,"object"==typeof c&&void 0!==c.get(g.panel.getColumns()[e].dataIndex+"_curid")&&SpiceCRM.KReporter.Common.currencies[c.get(g.panel.getColumns()[e].dataIndex+"_curid")]&&(Ext.util.Format.currencySign=SpiceCRM.KReporter.Common.currencies[c.get(g.panel.getColumns()[e].dataIndex+"_curid")].symbol),Ext.util.Format.currencyPrecision=0,f&&"function"==typeof f.buildLinkedFields?Ext.util.Format.kreportLinkBuilder(Ext.util.Format.currency(a),c,e,f,g):Ext.util.Format.currency(a))},Ext.util.Format.kpercentageRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:Ext.util.Format.kreportLinkBuilder(Ext.util.Format.round(a,2)+"%",c,e,f,g)},Ext.util.Format.knumberRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:("undefined"==typeof dec_sep?(Ext.util.Format.decimalSeparator=SUGAR.App.user.attributes.preferences.decimal_separator,Ext.util.Format.thousandSeparator=SUGAR.App.user.attributes.preferences.number_grouping_separator):(Ext.util.Format.decimalSeparator=dec_sep,Ext.util.Format.thousandSeparator=num_grp_sep),Ext.util.Format.currencyPrecision=SpiceCRM.KReporter.precision,_formatNumber="0"+Ext.util.Format.thousandSeparator+"000"+Ext.util.Format.decimalSeparator+"00/i",f&&"function"==typeof f.buildLinkedFields?Ext.util.Format.kreportLinkBuilder(Ext.util.Format.number(a,_formatNumber),c,e,f,g):Ext.util.Format.number(a,_formatNumber))},Ext.util.Format.kintRenderer=function(a,b,c,d,e,f,g){return""===a||null===a?a:("undefined"==typeof dec_sep?(Ext.util.Format.decimalSeparator=SUGAR.App.user.attributes.preferences.decimal_separator,Ext.util.Format.thousandSeparator=SUGAR.App.user.attributes.preferences.number_grouping_separator):(Ext.util.Format.decimalSeparator=dec_sep,Ext.util.Format.thousandSeparator=num_grp_sep),_formatNumber="0"+Ext.util.Format.thousandSeparator+"000/i",Ext.util.Format.kreportLinkBuilder(Ext.util.Format.number(a,_formatNumber),c,e,f,g))},Ext.util.Format.kdatetimeRenderer=function(a,b,c,d,e,f,g){if(""===a||null===a)return a;void 0!==SUGAR.App&&SUGAR.App.user.attributes.preferences.datepref,void 0!==cal_date_format&&cal_date_format.replace(/%/g,"");var h="m.d.Y";return void 0!==SUGAR.App&&(h=SUGAR.App.user.attributes.preferences.tz_offset_sec),"undefined"!=typeof time_offset&&(h=time_offset),Ext.util.Format.kreportLinkBuilder(Ext.Date.format(Ext.Date.add(new Date(a.replace(/-/g,"/")),Ext.Date.SECOND,h),SpiceCRM.KReporter.dateformat+" "+SpiceCRM.KReporter.timeformat),c,e,f,g)},Ext.util.Format.kdatetutcRenderer=function(a,b,c,d,e,f,g){if(""===a||null===a)return a;return void 0!==SUGAR.App&&SUGAR.App.user.attributes.preferences.datepref,void 0!==cal_date_format&&cal_date_format.replace(/%/g,""),Ext.util.Format.kreportLinkBuilder(Ext.Date.format(new Date(a.replace(/-/g,"/")),SpiceCRM.KReporter.dateformat+" "+SpiceCRM.KReporter.timeformat),c,e,f,g)},Ext.util.Format.kdateRenderer=function(a,b,c,d,e,f,g){if(""===a||null===a)return a;"object"==typeof a&&(a=Ext.Date.format(a,"Y-m-d"));var h="m.d.Y";return void 0!==SUGAR.App&&(h=SUGAR.App.user.attributes.preferences.datepref),void 0!==cal_date_format&&(h=cal_date_format.replace(/%/g,"")),Ext.util.Format.kreportLinkBuilder(Ext.util.Format.date(a.replace(/-/g,"/"),h),c,e,f,g)};