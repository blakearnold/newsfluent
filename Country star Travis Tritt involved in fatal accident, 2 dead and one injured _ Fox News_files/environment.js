/*! updated; 04-11-2019 10:01 PM **/


Modulr.define("core.base:utils/environment",["require","jquery","modernizr"],function(require,$,Modernizr){return new function(){var Proto=this;Proto.isProd=function(){return"prod"===window.FOX_ENV_STATIC},Proto.isStaging=function(){return"staging"===window.FOX_ENV_STATIC},Proto.getStaticDomain=function(){return window.location.protocol+"//"+(Proto.isProd()?"":"qa.")+"global.fncstatic.com"},Proto.getSiteId=function(){var channel=Proto.getMeta("prism.channel"),section=Proto.getMeta("prism.section"),id="foxnews";switch(channel){case"fnc":id="foxnews";break;case"fbn":id="foxbusiness";break;case"fsb":id="smallbusiness";break;case"fnl":id="foxnewslatino"}return"fnc"===channel&&"nation"===section?id="foxnation":"fnc"===channel&&"insider"===section&&(id="foxnewsinsider"),id},Proto.getSectionPath=function(){for(var iter=1,sect=Proto.getMeta("prism.subsection"+iter),arr=[Proto.getMeta("prism.section")];sect;)arr.push(sect),iter++,sect=Proto.getMeta("prism.subsection"+iter);return arr.join("/")},Proto.getSection=function(){return Proto.getMeta("prism.section")},Proto.getMeta=function(val,type){return $("meta["+(type=type||"name")+"='"+val+"']").attr("content")||""},Proto.isMobile=function(){return Modernizr.touch||Modernizr.touchevents},Proto.getDomainHost=function(useProtocol,prod){var loc=window.location,host=loc.hostname,protocol=loc.protocol,arr=host.split("."),val=[];return useProtocol&&(val.push(protocol+"//"),!prod)?protocol+"//"+host:(-1<host.indexOf("latino")?val.push("latino."):-1<host.indexOf("smallbusiness.")?val.push("smallbusiness."):prod&&val.push("www."),val.join("")+arr[arr.length-2]+"."+arr[arr.length-1])},Proto.getCacheParam=function(){return Modulr.getGlobalCacheParam()},Proto.isTiger=function(){var meta=$('meta[name="content.creator"]:first');return 1===(meta=0===meta.length?$('meta[name="content-creator"]:first'):meta).length&&"tiger"===meta.attr("content")}}});