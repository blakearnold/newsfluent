/*! updated; 05-16-2019 10:55 AM **/


!function(GeoApp){GeoApp.ENABLED=!/esi\:assign/.test('ESI'),window.FNC=window.FNC||{},window.FNC.GEO=GeoApp}(function(){var CONST_Akamai_GEO=window.CONST_Akamai_GEO||{continent:"NA",countryCode:"US",regionCode:"MI",dmaCode:"540",zipRange:"49660"},CONST_Akamai_TIME=window.CONST_Akamai_TIME||{yr:"2019",mm:"05",dd:"18",dy:"6",hr:"14",min:"57",sec:"53"};return{time:new function(){var d,date,Proto=this,LOC_START_TIME=new Date,AKAMAI_DATETIME=(date=[[(d=CONST_Akamai_TIME).mm,d.dd,d.yr].join("/"),[d.hr,d.min,d.sec].join(":")].join(" "),new Date(date)),CUSTOM_ANNOUNCED=!1;function USDST(d){var yr=(d=d||Proto.getCurrent()).getFullYear(),currYrStart=function(){for(var dt=new Date("3/01/"+yr+" 00:00:00"),found=0;found<2;)0===dt.getDay()&&found++,found<2&&dt.setDate(dt.getDate()+1),2<=dt.getMonth&&(found=2,dt.setHours(2));return dt}(),currYrEnd=function(){for(var dt=new Date("11/01/"+yr+" 00:00:00"),found=!1;!found;)0===dt.getDay()?found=!0:dt.setDate(dt.getDate()+1),10<dt.getMonth()&&(found=!0),found&&dt.setHours(2);return dt}();return{val:isDSTObserved(d),currYrStart:currYrStart,currYrEnd:currYrEnd,currYr:yr}}function isDSTObserved(d){return(d=d||Proto.getCurrent()).getTimezoneOffset()<(jan=new Date(d.getFullYear(),0,1),jul=new Date(d.getFullYear(),6,1),Math.max(jan.getTimezoneOffset(),jul.getTimezoneOffset()));var jan,jul}Proto.getCurrent=function(trueTime){var diff=(new Date).getTime()-LOC_START_TIME.getTime(),customDate=function(){var x,s=window.location.search.substr(1),ret=null;for(s=s.split("&"),x=0;x<s.length;x++)if("string"==typeof s[x]&&0<s[x].length){var p=s[x].split("=");if("cdt"===p[0]){var val=p[1]||"";-1<val.indexOf("%")&&(val=decodeURIComponent(val));var date=val.match(/^([0-9]+){1,2}(\/|\-)([0-9]+){1,2}(\/|\-)([0-9]+){1,4}/g),time=val.match(/\|([0-9]+){1,2}\:([0-9]+){1,2}\:([0-9]+){1,2}$/g);if(!time&&/^([0-9]+){1,2}(\/|\-)([0-9]+){1,2}(\/|\-)([0-9]+){1,4}$/.test(val)&&(time=["|00:00:00"]),date&&time){date=date[0].split("-").join("/"),time=time[0].slice(1);var dateStr=[date,time].join(" "),dt=new Date(dateStr);window.console&&console.log&&!CUSTOM_ANNOUNCED&&(CUSTOM_ANNOUNCED=!0,console.log("DATE TEST OVERRIDE: "+dateStr)),ret=dt}break}}return ret}(),currAkamai=new Date((trueTime?AKAMAI_DATETIME:customDate||AKAMAI_DATETIME).getTime()+diff);return USDST(currAkamai).val||customDate||currAkamai.setHours(currAkamai.getHours()-1),currAkamai},Proto.isDST=function(custom){return USDST(custom)},Proto.isDSTObserved=function(custom){return isDSTObserved(custom)}},geo:new function(){this.get=function(){return CONST_Akamai_GEO}}}}());