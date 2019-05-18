/*! updated; 04-11-2019 10:01 PM **/


Modulr.define("core.components:auth",["require","cdn"],function(require,CDN){var App=function(){this.AUTH_TYPE="auth0"};return App.prototype.init=function(callback){require(["core.auth:api"],function(Auth){Auth.init()})},App.prototype.initNew=function(callback){this.init(callback)},App.prototype.middleware=function(callback){"function"==typeof callback&&require(["core.auth:models/middleware"],function(Middleware){callback(Middleware)})},new App});
Modulr.define("core.components:embed-video",["require","embed-video/index"],function(require,EmbedVideo){var App=function(){};return App.prototype.set=function(){return new EmbedVideo},App.prototype.init=function(){return this.set()},new App});
Modulr.define("core.components:embed-video/index",["require","core.video:api","jquery"],function(require,Video,$){return function(){var embed=$(".video-container .video-player");0!==embed.length&&(embed.attr("data-video-id"),embed.attr("data-video-domain"),Video.embed(embed,{app:{rules:["autoplay","autoAdvance","inpage"]}}).on("player.ready",function(data){var iframe=embed.find("> iframe:first");0<iframe.length&&iframe.css({width:"100%",height:"100%"})}))}});
Modulr.define("core.components:gallery",["require","gallery/index"],function(require,Gallery){var App=function(){};return App.prototype.set=function(props){return Gallery(props)},App.prototype.defaults=function(){var self=this,mainGalleries=$('.main-content .collection-gallery[data-gallery-ignore!="1"]'),sidebarGalleries=$('.sidebar .collection-gallery[data-gallery-ignore!="1"]'),Galleries={main:[],sidebar:[]};return mainGalleries.each(function(){var el=$(this),instance=self.set({target:el,type:"auto",nextLength:5,itemsPerPage:9,modal:"image",xscroll:!0});Galleries.main.push(instance)}),sidebarGalleries.each(function(){var el=$(this),instance=self.set({target:el,type:"page",itemsPerPage:9,modal:"image"});Galleries.sidebar.push(instance)}),Galleries},new App});
Modulr.define("core.components:gallery/hscroll",["require","jquery","lodash","core.base:utils/detector","core.plugins:OnWindowResize","core.plugins:ImageResizer","modal/modules/photo"],function(require,$,_){var Detector=require("core.base:utils/detector"),Resize=require("core.plugins:OnWindowResize"),ImageResizer=require("core.plugins:ImageResizer"),PhotoModal=require("modal/modules/photo"),INSTANCE_ITER=0;return function(props){var SCROLL_READY=!0,SCROLL_POINTS=[0],CURRENT_INDEX=(props=props||{}).startIndex||0,NEXT_LENGTH="number"==typeof props.nextLength?props.nextLength:5,IS_MODAL=props.modal||!1,X_SCROLL_ENABLED=props.xscroll||!1;INSTANCE_ITER++;var set,Proto=this,target=props.target,arrows=target.find(".page-arrows"),prev=arrows.find(".prev"),next=arrows.find(".next"),wrap=target.find(".scroll-wrap"),inner=target.find(".scroll-inner"),outer=target.find(".scroll-outer"),items=inner.children(),lastIndex=items.length-1,uid="hscroll-gallery-"+INSTANCE_ITER;target.attr("data-uid",uid),Proto.uid=function(){return uid},Proto.goto=function(index){0<=index&&index<=lastIndex&&(CURRENT_INDEX=index,scroll(getScrollLeft()))},function(set){if("image"===IS_MODAL){var arr=[];items.each(function(i){var el=$(this),a=el.find("a"),img=el.find("img"),src=function(src){var w="mobile"===Detector.current()?650:868;return ImageResizer(src||"",w,"16:9")}(img.attr("src")),id=INSTANCE_ITER+"_"+(i+1);a.attr("href","#slide="+id),a.on("click",function(evt){var index,data;evt.preventDefault(),index=i,(data=_.cloneDeep(arr))[index].active="show",modal.set(data)}),arr.push({active:"",imgAlt:img.attr("alt")||"",src:src})});var modal=new PhotoModal}}(),allItemsDim().width>outer.width()&&(prev.find("a").on("click",function(evt){if(evt.preventDefault(),SCROLL_READY)return SCROLL_READY=!1,NEXT_LENGTH?CURRENT_INDEX-=NEXT_LENGTH:--CURRENT_INDEX,scroll(getScrollLeft()),!1}),next.find("a").on("click",function(evt){if(evt.preventDefault(),SCROLL_READY)return SCROLL_READY=!1,NEXT_LENGTH?CURRENT_INDEX+=NEXT_LENGTH:++CURRENT_INDEX,scroll(getScrollLeft()),!1}),hideShowArrows(),show(items),function(){X_SCROLL_ENABLED&&"scroll"!==outer.css("overflow-x")&&outer.css("overflow-x","scroll");var timeout=null,snap=null,startPt=outer.scrollLeft();outer.on("mousewheel touchend",function(){clearTimeout(snap),clearTimeout(timeout),timeout=setTimeout(function(){hideShowArrows();var index=function(startPt){var curr=outer.scrollLeft(),amount=items.length,index=0,dir=curr<startPt?"left":"right";if(curr+outer.width()>=outer.get(0).scrollWidth)index=SCROLL_POINTS.length-1;else for(var i=0;i<SCROLL_POINTS.length;i++){var val=SCROLL_POINTS[i];if(curr<val){index=i-1;break}}return function(){var val,id,nextItem=((id=index+("right"===dir?1:-1))<0?id=0:amount-1<id&&(id=amount-1),val=SCROLL_POINTS[id],{id:id,val:val});return SCROLL_POINTS[index],"right"===dir?.76<=curr/nextItem.val:curr/SCROLL_POINTS[index]<=1.75}()&&"right"===dir&&index++,index}(startPt);CURRENT_INDEX=index,snap=setTimeout(function(){Proto.goto(index)},1500)},50)})}(),Resize(set=function(){if("mobile"===Detector.current())return inner.removeAttr("style");var width=0,padding=function(){var width=0;return width+=parseInt((inner.css("padding-left")||"0").replace(/([^0-9])/g,""),10),width+=parseInt((inner.css("padding-right")||"0").replace(/([^0-9])/g,""),10)}(),itemsDim=allItemsDim(!0);width+=padding,width+=itemsDim.width,inner.css("width",width),wrap.css("height",itemsDim.height)}),set());function scroll(val){outer.animate({scrollLeft:val},200,"linear",function(){SCROLL_READY=!0,hideShowArrows()})}function getScrollLeft(){var sel=items.slice(0,CURRENT_INDEX),val=0;return sel.each(function(){val+=$(this).outerWidth(!0)}),val}function allItemsDim(points){var width=0,height=null,scrollval=0;return items.each(function(i){var el=$(this),w=el.outerWidth(!0),h=el.outerHeight(!0),margin=0===i?parseInt((el.css("margin-left")||"0").replace(/([^0-9])/g,""),10):0;width+=w+margin,null===height?height=h:height<h&&(height=h),points&&(scrollval+=w,SCROLL_POINTS.push(scrollval))}),{width:width,height:height}}function hideShowArrows(){var val=outer.scrollLeft(),max=allItemsDim().width-outer.outerWidth();1===CURRENT_INDEX?hide(prev):show(prev),val<=0?hide(prev):show(prev),CURRENT_INDEX===lastIndex?hide(next):show(next),max<=val?hide(next):show(next)}function show(el){el.removeClass("hide").addClass("show")}function hide(el){el.removeClass("show").addClass("hide")}}});
Modulr.define("core.components:gallery/index",["require","gallery/hscroll","gallery/page","core.base:utils/detector"],function(require){var HScroll=require("gallery/hscroll"),Page=require("gallery/page"),Detector=require("core.base:utils/detector");return function(props){var res,type;switch((props=props||{}).type="auto"===(type=props.type?props.type:"auto")?"mobile"===Detector.current()?"page":"hscroll":type,props.modal=props.modal||null,props.type){case"hscroll":res=new HScroll(props);break;case"page":res=new Page(props);break;default:res=new HScroll(props)}return res}});
Modulr.define("core.components:gallery/page",["require","jquery","lodash","core.base:utils/detector","core.plugins:OnWindowResize","core.plugins:ImageResizer","modal/modules/photo"],function(require,$,_){var Detector=require("core.base:utils/detector"),Resize=require("core.plugins:OnWindowResize"),ImageResizer=require("core.plugins:ImageResizer"),PhotoModal=require("modal/modules/photo"),INSTANCE_ITER=0;return function(props){var SCROLL_READY=!0,CURRENT_PAGE=(props=props||{}).startPage||0,IS_MODAL=props.modal||!1,ITEMS_PER_PAGE="number"==typeof props.itemsPerPage?props.itemsPerPage:9;INSTANCE_ITER++;var target=props.target,arrows=target.find(".page-arrows"),prev=arrows.find(".prev"),next=arrows.find(".next"),inner=target.find(".scroll-inner"),outer=target.find(".scroll-outer"),items=inner.children(),pageLength=(items.length,Math.floor(items.length/ITEMS_PER_PAGE)+(items.length%ITEMS_PER_PAGE==0?0:1)),uid="page-gallery-"+INSTANCE_ITER;function setPage(val){if(val){if(val===CURRENT_PAGE)return;CURRENT_PAGE=val}CURRENT_PAGE=CURRENT_PAGE<1?1:pageLength<CURRENT_PAGE?pageLength:CURRENT_PAGE;var startIndex=getStartIndex();hide(items);for(var i=0;i<ITEMS_PER_PAGE;i++){var index=startIndex+i,item=items.eq(index);if(0===item.length)break;show(item)}SCROLL_READY=!0,hideShowArrows(),function(){var el=arrows.find(".count"),max=items.length,startItem=getStartIndex()+1,endItem=startItem+(ITEMS_PER_PAGE-1);max<endItem&&(endItem=max);var txt=["Showing",startItem+"-"+endItem,"of"+max].join(" ");el.text(txt)}()}function hideShowArrows(){1===CURRENT_PAGE?hide(prev):show(prev),CURRENT_PAGE===pageLength?hide(next):show(next)}function getStartIndex(){return(CURRENT_PAGE-1)*ITEMS_PER_PAGE}function setAbsHeight(){outer.removeAttr("style"),outer.css("height",outer.height())}function show(el){el.removeClass("hide").addClass("show")}function hide(el){el.removeClass("show").addClass("hide")}target.attr("data-uid",uid),this.uid=function(){return uid},this.goto=function(page){pageLength<=1||0<page&&1<pageLength&&page<=pageLength&&(CURRENT_PAGE=page,scroll(getScrollLeft()))},function(set){if("image"===IS_MODAL){var arr=[];items.each(function(i){var src,w,el=$(this),a=el.find("a"),img=el.find("img"),id=INSTANCE_ITER+"_"+(i+1);a.attr("href","#slide="+id),a.on("click",function(evt){var index,data;evt.preventDefault(),index=i,(data=_.cloneDeep(arr))[index].active="show",modal.set(data)}),arr.push({active:"",imgAlt:img.attr("alt")||"",src:(src=img.attr("src"),w="mobile"===Detector.current()?650:868,ImageResizer(src||"",w,"16:9"))})});var modal=new PhotoModal}}(),pageLength<=1||(prev.find("a").on("click",function(evt){if(evt.preventDefault(),SCROLL_READY)return SCROLL_READY=!1,CURRENT_PAGE--,setPage(),!1}),next.find("a").on("click",function(evt){if(evt.preventDefault(),SCROLL_READY)return SCROLL_READY=!1,CURRENT_PAGE++,setPage(),!1}),setPage(1),setAbsHeight(),Resize(function(){outer.removeAttr("style"),setPage(1),setAbsHeight()}),hideShowArrows())}});
Modulr.define("core.components:modal",["require","modal/modules/video","modal/modules/newsletter","modal/modules/photo.gallery"],function(require){var App=function(){};return App.prototype.video=function(props){return new(require("modal/modules/video"))(props)},App.prototype.newsletter=function(props){return new(require("modal/modules/newsletter"))(props)},App.prototype.photoGallery=function(props){return console.log("deprecated: modal.photoGallery, use core.components:gallery instead"),null},new App});
Modulr.define("core.components:modal/modules/newsletter",["require","jquery","lodash","modernizr","core.templates:controls/api","core.plugins:Base64","newsletter"],function(require,$,_,Modernizr){var Template=require("core.templates:controls/api"),Base64=require("core.plugins:Base64"),Newsletter=require("newsletter"),TEMPLATE_MARKUP=!1,TEMPLATE_INIT=!1,HOVER_OVER=!1;return function(props){var id,arr,SLID=(props=props||{})&&props.SLID?props.SLID:null,MODAL_ID=(id="number"!=typeof props.variantId?0:props.variantId,(arr=[0,0,1,3,5,6])[id]?"email-"+arr[id]:""),target=null;function render(){if(!target){var names={uid:encode("modal"),email:encode("email"),submit:encode("submit"),rnd1:encode("rnd1"),rnd2:encode("rnd2")},html=TEMPLATE_MARKUP({uid:names.uid,slid:SLID,name_email:names.email,name_signup:names.submit,name_rnd1:names.rnd1,name_rnd2:names.rnd2m,val_1:encode("val1"),modal_id:MODAL_ID});if($("#wrapper").prepend(html),0!==(target=$('#wrapper > .popup-modal > .modal-email[data-uid="'+names.uid+'"]:first')).length){var content=target.find(".content"),parent=target.parent();if("1"!==target.attr("data-init"))if(target.attr("data-init","1"),target.find("a.close").on("click",function(evt){return evt.preventDefault(),parent.remove(),!1}),Modernizr.touchevents){content.on("touchstart",function(){HOVER_OVER=!0}),content.on("touchend",function(){setTimeout(function(){HOVER_OVER=!1},100)});var listener=null;$("html, body").on("touchend",function(){clearTimeout(listener),listener=setTimeout(function(){0<parent.length&&parent.hasClass("show")&&!HOVER_OVER&&parent.remove()},50)})}else content.hover(function(){HOVER_OVER=!0},function(){HOVER_OVER=!1}),$("html, body").on("click",function(){0<parent.length&&parent.hasClass("show")&&!HOVER_OVER&&parent.remove()});var form=target.find("form");Newsletter.set({elm:form,SLID:SLID,INPUT:form.find('input[name="'+names.email+'"]'),INPUT_STR:" ",onError:function(){target.find(".invalid").addClass("show")},onSuccess:function(){target.find(".email.signup").removeClass("show"),target.find(".email.thanks").addClass("show")}})}}}function encode(str){return Base64.encode(str+(new Date).getTime())}this.set=function(){if(TEMPLATE_MARKUP)render();else{if(TEMPLATE_INIT)return;TEMPLATE_INIT=!0,Template.get("/static/orion/scripts/core/components/app/modal/templates/newsletter.html",function(html){TEMPLATE_MARKUP=_.template(html),render()})}}}});
Modulr.define("core.components:modal/modules/photo.gallery",["require","jquery","lodash","core.templates:api","core.base:utils/environment","core.base:utils/detector","core.plugins:ImageResizer","core.plugins:OnWindowResize"],function(require,$,_){require("core.base:utils/environment");var Detector=require("core.base:utils/detector"),ImageResizer=require("core.plugins:ImageResizer");require("core.plugins:OnWindowResize");return function(props){props=props||{};$(".main-content .collection-gallery");var railGallery=$(".sidebar .collection-gallery"),Template=require("core.templates:api"),view=Detector.current(),Proto=this,target=null,TEMPLATE_MARKUP=!1,HOVER_OVER=!1,EVENT_CALLBACK={};function setPopup(type,items,elem,index){Template.get("/static/orion/scripts/core/components/app/modal/templates/photo.html",function(html){TEMPLATE_MARKUP=_.template(html),render(type,items,elem,index)})}function render(type,itemList,active,index){var arr;if(items=(arr=[],itemList.each(function(i){var img=$(this).find("img"),src=ImageResizer(img.attr("src")||"",868,0);arr.push({active:i===index?"show":"",imgAlt:img.attr("alt")||"",src:src})}),arr),target&&target.attr("data-type")===type)index=index||0,target.addClass("show"),target.find("li#slide-"+index).addClass("show");else{var html=TEMPLATE_MARKUP({items:items});$("#wrapper").prepend(html),(target=$("#wrapper > .popup-modal:first")).attr("data-type",type)}$("body").addClass("scroll-lock");var content=target.find(".content"),modal_arrows_next=target.find(".page-arrows .next"),modal_arrows_prev=target.find(".page-arrows .prev");"1"!==target.attr("data-init")&&(target.attr("data-init","1"),modal_arrows_next.on("click",function(evt){evt.preventDefault();var current=content.find("li.show");0<current.next().length?current.next().addClass("show"):content.find("li:first").addClass("show"),current.removeClass("show")}),modal_arrows_prev.on("click",function(evt){evt.preventDefault();var current=content.find("li.show");0<current.prev().length?current.prev().addClass("show"):content.find("li:last").addClass("show"),current.removeClass("show")}),target.find("a.close").on("click",function(evt){return evt.preventDefault(),Proto.close(active),!1}),content.hover(function(){HOVER_OVER=!0},function(){HOVER_OVER=!1}),$("html, body, .popup-modal.show").on("click",function(){target&&target.hasClass("show")&&!HOVER_OVER&&Proto.close(active)}),$(document).keyup(function(evt){27===evt.keyCode&&Proto.close(active)}))}Proto.set=function(type){"rail"===type&&0<railGallery.length&&function(){var scroll,holder=railGallery.find(".scroll-outer"),count=railGallery.find(".count"),images=[],current=0,first=0,last=0,add=0;if((images=holder.find("article")).each(function(){$(this).removeClass("hide").addClass("show")}),setCount(!0),!(images.length<=9)){var row_ht=Math.floor(images.first().outerHeight(!0)),total_viewable_ht=3*row_ht,total_rows=Math.ceil(images.length/3),total_items_ht=row_ht*total_rows;scroll=total_viewable_ht<=total_items_ht-total_viewable_ht?total_viewable_ht:total_items_ht-total_viewable_ht,holder.height(total_viewable_ht);var btns=holder.siblings(".page-arrows"),prev_btn=btns.find(".prev"),next_btn=btns.find(".next");9<images.length&&next_btn.addClass("show"),next_btn.on("click",function(evt){evt.preventDefault(),current=holder.scrollTop(),holder.scrollTop(current+scroll),(total_items_ht<=(current+=scroll)+scroll||last<first||images.length<=last+9||last===images.length||first>images.length)&&next_btn.removeClass("show"),prev_btn.addClass("show"),setCount(!1,"next")}),prev_btn.on("click",function(evt){evt.preventDefault(),holder.scrollTop(current-scroll),0==(current-=scroll)&&prev_btn.removeClass("show"),next_btn.addClass("show"),setCount(!1,"prev")}),images.on("click",function(evt){if("mobile"!==view){evt.preventDefault();var elem=$(this),active=elem.addClass("active"),index=images.index($(this));setPopup("rail",images,active,index)}})}function setCount(init,dir){init?(first=1,last=images.length<9?images.length:9):"next"===dir?last+9<images.length?(first+=9,last+=9-add):(add=images.length-last,first=last,last+=add):"prev"===dir&&(0!==add?((first-=9)<=0&&(first=1),last-=add,add=0):(first===last?first-=9:first<0?(first=1,last=9):(first-=9,last-=9),0===first&&(first=1))),count.html("Showing <span>"+first+"-"+last+"<span> of <span>"+images.length+"</span>")}}()},Proto.close=function(active){target&&(target.removeClass("show"),target.find("li.show").removeClass("show"),active&&active.removeClass("active"),$("body").removeClass("scroll-lock"),function(event,data){if(EVENT_CALLBACK[event])for(var i=0,evt=EVENT_CALLBACK[event];i<evt.length;i++)evt[i](data)}("close"))}}});
Modulr.define("core.components:modal/modules/photo",["require","jquery","lodash","ISA","core.templates:api","cdn"],function(require,$,_,ISA){var Template=require("core.templates:api"),domain=require("cdn").domain.replace(/^\/{2}/,"").replace(/\/$/,""),TEMPLATE_MARKUP=!1,TEMPLATE_INIT=!1,HOVER_OVER=!1,PLACEHOLDER_IMG="//a57.foxnews.com/"+domain+"/static/orion/img/868/488/clear.gif";(new Image).src=PLACEHOLDER_IMG;return function(props){props=props||{};var Proto=this,target=null,EVENT_CALLBACK={},LOADED_IMAGE=[];function render(data){var html=TEMPLATE_MARKUP({placeholderImg:PLACEHOLDER_IMG,items:data});0===(target=$('#wrapper > .popup-modal[data-type="photo"]')).length?($("#wrapper").prepend(html),target=$('#wrapper > .popup-modal[data-type="photo"]')):target.find(".slide-container").html($(html).find(".slide-container").html()),$("body").addClass("scroll-lock");var modalClose,items=target.find(".slide-container").children(),maxIndex=items.length-1;function getIndexEl(){return items.index(items.filter(function(){return!!$(this).hasClass("show")}))}function setFocus(type,currIndex){var next=currIndex+("next"===type?1:-1);next=next<0?maxIndex:maxIndex<next?0:next,items.removeClass("show"),items.eq(next).addClass("show")}function preloadImages(currIndex){var prevIndex=currIndex-1,nextIndex=currIndex+1;prevIndex<0&&(prevIndex=maxIndex),maxIndex<nextIndex&&(nextIndex=0);var next=items.eq(nextIndex),prev=items.eq(prevIndex);function preload(item){var el=item.find(".m img"),src=el.attr("data-src")||null;if(src){if(-1===LOADED_IMAGE.indexOf(src)){LOADED_IMAGE.push(src);var img=new Image;img.onload=function(){el.attr("src")!==src&&el.attr("src",src)},img.src=src,setTimeout(function(){el.attr("src")!==src&&el.attr("src",src)},3e3)}else el.attr("src",src);el.removeAttr("data-src")}}preload(items.eq(currIndex)),preload(next),preload(prev)}preloadImages(getIndexEl()),setTimeout(function(){target.addClass("show")},100),1!==target.attr("data-init")&&(target.attr("data-init","1"),target.find(".page-arrows .prev").on("click",function(evt){evt.preventDefault();var curr=getIndexEl();preloadImages(curr),setFocus("prev",curr)}),target.find(".page-arrows .next").on("click",function(evt){evt.preventDefault();var curr=getIndexEl();preloadImages(curr),setFocus("next",curr)}),target.find("a.close").on("click",function(evt){return evt.preventDefault(),Proto.close(),!1}),target.find(".content").hover(function(){HOVER_OVER=!0},function(){HOVER_OVER=!1}),modalClose=null,$("html, body").on("click",function(){var modal=$('#wrapper > .popup-modal[data-type="photo"]');clearTimeout(modalClose),modalClose=setTimeout(function(){modal&&modal.hasClass("show")&&!HOVER_OVER&&Proto.close()},50)}),$(document).keyup(function(evt){27===evt.keyCode&&Proto.close()})),triggerCallback("ready")}function triggerCallback(event,data){if(EVENT_CALLBACK[event])for(var i=0,evt=EVENT_CALLBACK[event];i<evt.length;i++)evt[i](data)}Proto.set=function(data){if(TEMPLATE_MARKUP)render(data);else{if(TEMPLATE_INIT)return;TEMPLATE_INIT=!0,Template.get("/static/orion/scripts/core/components/app/modal/templates/photo.html",function(html){TEMPLATE_MARKUP=_.template(html),render(data)})}},Proto.on=function(event,callback){void 0===EVENT_CALLBACK[event]&&(EVENT_CALLBACK[event]=[]),EVENT_CALLBACK[event].push(callback)},Proto.close=function(){target&&($("body").removeClass("scroll-lock"),target.removeClass("show"),triggerCallback("close"))}}});
Modulr.define("core.components:modal/modules/video",["require","jquery","lodash","ISA","core.templates:api","core.base:utils/localStorage","core.video:api","core.base:utils/page.reload"],function(require,$,_,ISA){var Template=require("core.templates:api"),Video=require("core.video:api"),PageReload=(require("core.base:utils/localStorage"),require("core.base:utils/page.reload")),TEMPLATE_MARKUP=!1,TEMPLATE_INIT=!1,HOVER_OVER=!1;return function(props){var Proto=this,current=null,target=null,instance=null,EVENT_CALLBACK={};function render(){var videoId=current.videoId,intcmp=(current.config&&current.config.details&&current.config.details,current.config&&current.config.intcmp?current.config.intcmp:null),callback=current.callback||null;if(target)target.addClass("show"),target.find(".content").css("visibility","hidden");else{var html=TEMPLATE_MARKUP();$("#wrapper").prepend(html),target=$("#wrapper > .popup-modal:first")}$("body").addClass("scroll-lock");var content=target.find(".content"),holder=target.find(".m.video-player .main-player");if(intcmp&&ISA.track("video-modal",{videoId:videoId,intcmp:intcmp}),holder.attr("data-video-id")!==videoId){var properties={app:{rules:["autoplay","noTitleBar","autoAdvance"]}};current.config&&current.config.domain&&(properties.app.domain=/foxbusiness/i.test(current.config.domain)?"foxbusiness":"foxnews"),current.config&&current.config.playername&&properties.app.rules.push("playername:"+current.config.playername),target.attr("data-video-init")?instance.change(videoId,properties):(target.attr("data-video-init","1"),holder.attr("data-video-id",videoId),instance=Video.embed(holder,properties)),PageReload.clear()}else showContent(),PageReload.clear(),instance.trigger("play");"1"!==target.attr("data-init")&&(target.attr("data-init","1"),target.find("a.close").on("click",function(evt){return evt.preventDefault(),Proto.close(),!1}),content.hover(function(){HOVER_OVER=!0},function(){HOVER_OVER=!1}),$("html, body").on("click",function(){target&&target.hasClass("show")&&!HOVER_OVER&&Proto.close()}),$(document).keyup(function(evt){27===evt.keyCode&&Proto.close()})),instance.on("amp.mediachange",function(data){if(showContent(),data){var title=data.amp&&data.amp.title?data.amp.title:"&nbsp;",desc=data.amp&&data.amp.description?data.amp.description:"&nbsp;",link=data.amp&&data.amp.link?data.amp.link:"#";target.find(".info .title a").text(title).attr("href",link),target.find(".info .dek").text(desc)}}),"function"==typeof callback&&callback(instance)}function showContent(){target&&target.find(".content").css("visibility","visible")}Proto.set=function(videoId,config,callback){if(current={videoId:videoId,config:config,callback:callback},TEMPLATE_MARKUP)render();else{if(TEMPLATE_INIT)return;TEMPLATE_INIT=!0,Template.get("/static/orion/scripts/core/components/app/modal/templates/video.html",function(html){TEMPLATE_MARKUP=_.template(html),render()})}},Proto.on=function(event,callback){void 0===EVENT_CALLBACK[event]&&(EVENT_CALLBACK[event]=[]),EVENT_CALLBACK[event].push(callback)},Proto.close=function(){target&&($("#wrapper > .popup-modal:first").remove(),target||target.remove(),target=null,$("body").removeClass("scroll-lock"),PageReload.reset(),function(event,data){if(EVENT_CALLBACK[event])for(var i=0,evt=EVENT_CALLBACK[event];i<evt.length;i++)evt[i](data)}("close"))}}});
Modulr.define("core.components:newsletter",["require","newsletter/index"],function(require,Newsletter){var App=function(){};return App.prototype.set=function(props){return new Newsletter(props)},new App});
Modulr.define("core.components:newsletter/comm",["require","jquery","cdn","core.plugins:EventMessageHandler"],function(require,$,CDN,EventMessageHandler){var LoadHandler=new EventMessageHandler,IFRAME_LOADED=!1,READY_STACK=[];LoadHandler.addHandler("parent.newsletter.iframe.loaded",function(){if(IFRAME_LOADED=!0,0<READY_STACK.length)for(;0<READY_STACK.length;){var props=READY_STACK.shift();LoadHandler.sendMessage($("#newsletter-ifr-comm").get(0),"newsletter.messenger.submit",props)}});var sub="qa"===CDN.env?"dev":"www";iframeSrc="//"+sub+".foxnews.com/portal/newsalertsubscribe-xdcomm",$("body").append('<iframe id="newsletter-ifr-comm" src="'+iframeSrc+'" style="width:0;height:0;display:none;"></iframe>');var iframe=$("#newsletter-ifr-comm");return function(uid){var Handler=new EventMessageHandler,CALLBACK_STACK=[];Handler.addHandler("parent.newsletter.receiver",function(data){data.uid===uid&&function(data){for(var i=0;i<CALLBACK_STACK.length;i++)CALLBACK_STACK[i](data)}(data)}),this.receiver=function(callback){"function"==typeof callback&&CALLBACK_STACK.push(callback)},this.submit=function(props){IFRAME_LOADED?Handler.sendMessage(iframe.get(0),"newsletter.messenger.submit",props):READY_STACK.push(props)}}});
Modulr.define("core.components:newsletter/config",["require"],function(require,Newsletter){var config={slid:{FB_Breaking_Alerts:"5C84B893BD6D939E84FAE1A8E6E9525A",FB_CEO_Newsbrief:"3DC725E303A24F8D870B96401050B31F",FB_Morning_Headlines:"3DC725E303A24F8D518A0FB222399489",FB_Most_Popular_Content:"3DC725E303A24F8D39740C7B45D15F45",FB_Small_Business_Weekly_Report:"3DC725E303A24F8D3540B4B6FB335FC8",FB_The_Willis_Report_Promotional:"3DC725E303A24F8D5E4CD875B68955A6",FB_Weekly_Personal_Finance:"3DC725E303A24F8D7E5F3A553E2E6154",FB_Claman_On_Call:"3DC725E303A24F8D12785ABB73469705",FN_Autos:"3DC725E303A24F8D197DA3C8590F80E2",FN_Breaking_Alerts:"C2F278094FACCEA62391025B7A52D8EB",FN_Food_And_Drink:"3DC725E303A24F8D1C12D1E24CDEA25E",FN_FOX_411_Newsletter:"3DC725E303A24F8D9C92271F5026F381",FN_FOX_411_Partner_Pitch_Email:"3DC725E303A24F8DD2821C1AF73D49D4",FN_Health_Newsletter:"3DC725E303A24F8DA5DBC7FFD49BC2B8",FN_Leisure_Headlines:"3DC725E303A24F8D02B1F9D9AAF16982",FN_Monthly_Politics_Update:"3DC725E303A24F8D836CEAE9B885C87D",FN_Morning_Headlines:"3DC725E303A24F8DCF015F07C61BABFD",FN_Most_Popular:"3DC725E303A24F8DB05092D232355E43",FN_Opinion_Headlines:"3DC725E303A24F8D95ACD1C9C0564C20",FN_Politics:"3DC725E303A24F8DA102192D9D5143D9",FN_Promotional_Emails:"3DC725E303A24F8D41CEA8699C0FE71E",FN_Science_And_Technology:"3DC725E303A24F8DAB69E1C048904762",FN_Weekly_Travel:"3DC725E303A24F8DE5173CCC4F027046",Fox_Nation_Fired_Up:"3DC725E303A24F8D64B4C05965F09E1A",uReport_Launch_Email:"3DC725E303A24F8D41CEA8699C0FE71E",uReport_Monthly:"3DC725E303A24F8D41CEA8699C0FE71E",FN_Latino_Morning_Headlines:"3DC725E303A24F8D555BC7C7F3FD748B"}};return config});
Modulr.define("core.components:newsletter/index",["require","jquery","ISA","newsletter/config","newsletter/comm"],function(require,$){var ISA=require("ISA"),Comm=(require("newsletter/config"),require("newsletter/comm")),UID_ITER=0,isValidEmail=function(email){return!!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/i.test(email)},sendSubscription=function(Handler,uid,email,slid,target){target.attr("data-list");Handler.submit({uid:uid,slid:slid,email:email},function(){})};return function(props){var Proto=this,target=props.elm,SUBMITTING=!1,UID="uid_"+ ++UID_ITER,SLID=props.SLID?props.SLID:target.find("input[type='hidden'][name='slid']").val(),INPUT=props.INPUT?props.INPUT:target.find("input[type='text'][name='signup']"),INPUT_STR=props.INPUT_STR?props.INPUT_STR:"Enter Email Address",onSuccess="function"==typeof props.onSuccess?props.onSuccess:function(){},onError="function"==typeof props.onError?props.onError:function(){},onFocus="function"==typeof props.onFocus?props.onFocus:function(){},onBlur="function"==typeof props.onBlur?props.onBlur:function(){};function track(type,info){"complete"===type&&ISA.track({"email-sign-up-success":{listName:info.list}});var id=null;"complete"===type?id="newsletter:sign-up-complete":"start"===type&&(id="newsletter:sign-up-start"),id&&ISA.provider("leapmetrics",function(Provider){Provider.get(function(Leap){Leap.track(id,{page_newsletter_list:SLID})})})}"3DC725E303A24F8D9C92271F5026F381"===SLID&&(INPUT_STR="Enter your email address"),Handler=new Comm(UID),INPUT.val(INPUT_STR),INPUT.on("focus",function(){var val=$(this).val();$.trim(val.toLowerCase())===INPUT_STR.toLowerCase()&&$(this).val(""),onFocus()}),INPUT.on("blur",function(){var val=$(this).val();""===$.trim(val.toLowerCase())&&$(this).val(INPUT_STR),onBlur()}),target.on("submit",function(){return track("start",{list:target.attr("data-list")||"email-sign-up-success"}),Proto.submit(),!1}),Handler.receiver(function(data){track("complete",{list:target.attr("data-list")||"email-sign-up-success"})}),Proto.setSLID=function(slidInput){SLID=slidInput},Proto.submit=function(){if(SUBMITTING)return!1;SUBMITTING=!0;var email=INPUT.val().trim(),valid=isValidEmail(email);return valid&&SLID?(onSuccess(),sendSubscription(Handler,UID,email,SLID,target)):onError(valid?"slid":"email"),setTimeout(function(){SUBMITTING=!1},500),!1}}});
!function(Modulr,FNC){if(Modulr.getInstance("core.components"))return;var config={instance:"core.components",baseDomain:FNC.CDN.domain,baseUrl:"/static/orion/scripts/core/components/app",masterFile:"/static/orion/scripts/core/utils/modulr/master.js",paths:{},packages:["core.plugins","core.templates","core.auth"],shim:{jquery:{src:"/static/orion/scripts/core/utils/jquery/core.js",exports:"jQuery"},lodash:{src:"/static/orion/scripts/core/utils/lodash.js",exports:"_"},modernizr:{src:"/static/orion/scripts/core/utils/modernizr.js",exports:"Modernizr"}}},Instance=Modulr.config(config);Instance.define("cdn",function(){return FNC.CDN}),Instance.define("ISA",function(){return FNC.ISA})}(window.Modulr,window.FNC);