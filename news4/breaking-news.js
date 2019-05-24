/*! updated; 05-06-2019 11:55 AM **/


Modulr.define("core.base:modules/breaking-news",["require","jquery","core.templates:controls/api","utils/environment","utils/localStorage","utils/sessionStorage"],function(require,$){var Template=Modulr.require("core.templates:controls/api"),Environment=require("utils/environment"),LocalStorage=require("utils/localStorage"),SessionStorage=require("utils/sessionStorage"),isLocalOK=LocalStorage.isAvailable();return new function(){var forceDev,isProd,CONFIG={auto_poll:!0,poll_interval_in_min:2},Proto=this,template=!1,showing=!1,prefix=(forceDev=-1<window.location.search.indexOf("_breaking_feed=dev"),isProd=!(!Environment.isProd()&&!Environment.isStaging()),forceDev||!isProd?"dev.api.":"www."),container=$(".post-content");Proto.renderAlert=function(data){var target,info,compiled=_.template(template);0<container.length&&(container.html(compiled(data)),target=container,info=data,window.leapmetrics=window.leapmetrics||[],window.leapmetrics.push(function(Leap){if("function"==typeof Leap.pageEvent)return Leap.pageEvent("breakingNewsAlert",{info:info,target:target});var onBanner,onClose,sId="_breaking_news_alert",currVal=info.title,stored=SessionStorage.get(sId);function impression(){SessionStorage.set(sId,currVal),Leap.track("banner:impression",getDataInfo())}function track(type){var dataInfo=getDataInfo();dataInfo.page_action_type=type||"clicked",Leap.track("banner:action",dataInfo)}function getDataInfo(){return{page_message_title:info.displayname||info.eyebrow,page_message_text:info.title,page_message_type:info.type||"n/a",page_message_id:info.id||info.tracking||info.type}}stored?currVal!==stored&&impression():impression(),onClose=onBanner=!1,target.find("a").hover(function(){$(this).hasClass("close")?onClose=!0:onBanner=!0},function(){onClose=onBanner=!1}),$(document).on("click",function(){onClose?track("close"):onBanner&&track()})}),$(container).find(".close").click(function(evt){evt.preventDefault(),$(this).closest(".alert-banner").removeClass("slide-in").addClass("slide-out"),showing=!1,isLocalOK&&localStorage.setItem("FNBNABURL",data.link)}),$(container).find(".alert-title > a").click(function(evt){isLocalOK&&localStorage.setItem("FNBNABURL",data.link),$(this).closest(".alert-banner").removeClass("slide-in").addClass("slide-out"),showing=!1}),$(".alert-banner.slide-in").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).removeClass("slide-in"),showing=!0}))},Proto.poll=function(){!1===showing&&$.ajax({url:"https://"+prefix+"foxnews.com/js/breakingNews.js?cb="+function(freq){freq=freq||!1;var date=new Date,str=date.getFullYear().toString()+(date.getMonth()+1).toString()+date.getDate().toString(),hr=date.getHours()+1,min=date.getMinutes();return str+=hr.toString()+(freq&&!isNaN(freq)?Math.floor(min/parseFloat(freq)).toString():"")}(2),dataType:"script",cache:!0,async:!0})},Proto.init=function(configuration){Template.get("/static/orion/scripts/core/base/app/templates/breaking.news.html",function(response){if(response&&(template=response,configuration&&(CONFIG=_.merge(CONFIG,configuration)),window.fox_header_breakingnews=function(data){if(data&&(val=data,"[object Array]"===Object.prototype.toString.call(val))&&0<data.length&&data[0].type){var previousURL=!1,item=data[0];if(isLocalOK&&(previousURL=localStorage.getItem("FNBNABURL")),!previousURL||previousURL!==item.link){if("BreakingNews"===item.type)item.classname="is-breaking",item.displayname="Breaking News",item.tracking="hp1bbkn";else switch(item.classname="is-programming",item.type){case"ProgrammingAlert":item.displayname="Programming Alert",item.tracking="hp1bprog";break;case"LiveCoverage":item.displayname="Live Coverage",item.tracking="hp1blc";break;case"DevelopingStory":item.displayname="Developing Story",item.tracking="hp1bds";break;case"WatchLive":item.displayname="Watch Live",item.tracking="hp1bwn";break;case"ShepardSmith":item.displayname="Shepard Smith Reporting",item.tracking="hp1bssr",item.classname="is-show";break;case"ListenNow":item.displayname="Listen Now",item.tracking="hp1bls";break;case"FoxNationAlert":item.displayname="Fox Nation Alert",item.tracking="hp1bnat",item.classname="is-nation";break;default:item.displayname="",item.tracking="hp1bblank",item.classname="is-programming"}item.eyebrow&&(item.displayname=item.eyebrow),Proto.renderAlert(item)}}var val},0===container.find(".alert-container").length&&container.append('<div class="alert-container"></div>'),container=container.find(".alert-container"),Proto.poll(),CONFIG.auto_poll)){var updateInterval=6e4*CONFIG.poll_interval_in_min;setInterval(function(){Proto.poll()},updateInterval)}})}}});