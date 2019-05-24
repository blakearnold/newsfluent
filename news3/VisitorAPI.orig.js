/** lint:ignore **/


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============

 Adobe Visitor API for JavaScript version: 1.9.0
 Copyright 1996-2015 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function Visitor(q,v){if(!q)throw"Visitor requires Adobe Marketing Cloud Org ID";var a=this;a.version="1.9.0";var m=window,l=m.Visitor;l.version=a.version;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);a._c="Visitor";a._il=m.s_c_il;a._in=m.s_c_in;a._il[a._in]=a;m.s_c_in++;a.ha={Da:[]};var t=m.document,i=l.Bb;i||(i=null);var D=l.Cb;D||(D=void 0);var j=l.La;j||(j=!0);var k=l.Ja;k||(k=!1);a.da=function(a){var c=0,b,e;if(a)for(b=0;b<a.length;b++)e=a.charCodeAt(b),c=(c<<5)-c+e,c&=c;return c};a.r=function(a,c){var b=
"0123456789",e="",f="",g,h,i=8,k=10,l=10;c===n&&(w.isClientSideMarketingCloudVisitorID=j);if(1==a){b+="ABCDEF";for(g=0;16>g;g++)h=Math.floor(Math.random()*i),e+=b.substring(h,h+1),h=Math.floor(Math.random()*i),f+=b.substring(h,h+1),i=16;return e+"-"+f}for(g=0;19>g;g++)h=Math.floor(Math.random()*k),e+=b.substring(h,h+1),0==g&&9==h?k=3:(1==g||2==g)&&10!=k&&2>h?k=10:2<g&&(k=10),h=Math.floor(Math.random()*l),f+=b.substring(h,h+1),0==g&&9==h?l=3:(1==g||2==g)&&10!=l&&2>h?l=10:2<g&&(l=10);return e+f};a.Pa=
function(){var a;!a&&m.location&&(a=m.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a="";else{var c=a.split("."),b=c.length-1,e=b-1;1<b&&2>=c[b].length&&(2==c[b-1].length||0>",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,".indexOf(","+
c[b]+","))&&e--;if(0<e)for(a="";b>=e;)a=c[b]+(a?".":"")+a,b--}return a};a.cookieRead=function(a){var a=encodeURIComponent(a),c=(";"+t.cookie).split(" ").join(";"),b=c.indexOf(";"+a+"="),e=0>b?b:c.indexOf(";",b+1);return 0>b?"":decodeURIComponent(c.substring(b+2+a.length,0>e?c.length:e))};a.cookieWrite=function(d,c,b){var e=a.cookieLifetime,f,c=""+c,e=e?(""+e).toUpperCase():"";b&&"SESSION"!=e&&"NONE"!=e?(f=""!=c?parseInt(e?e:0,10):-60)?(b=new Date,b.setTime(b.getTime()+1E3*f)):1==b&&(b=new Date,f=
b.getYear(),b.setYear(f+2+(1900>f?1900:0))):b=0;return d&&"NONE"!=e?(t.cookie=encodeURIComponent(d)+"="+encodeURIComponent(c)+"; path=/;"+(b?" expires="+b.toGMTString()+";":"")+(a.cookieDomain?" domain="+a.cookieDomain+";":""),a.cookieRead(d)==c):0};a.h=i;a.J=function(a,c){try{"function"==typeof a?a.apply(m,c):a[1].apply(a[0],c)}catch(b){}};a.Va=function(d,c){c&&(a.h==i&&(a.h={}),a.h[d]==D&&(a.h[d]=[]),a.h[d].push(c))};a.q=function(d,c){if(a.h!=i){var b=a.h[d];if(b)for(;0<b.length;)a.J(b.shift(),
c)}};a.v=function(a,c,b,e){b=encodeURIComponent(c)+"="+encodeURIComponent(b);c=x.ub(a);a=x.lb(a);if(-1===a.indexOf("?"))return a+"?"+b+c;var f=a.split("?"),a=f[0]+"?",e=x.Ya(f[1],b,e);return a+e+c};a.Oa=function(a,c){var b=RegExp("[\\?&#]"+c+"=([^&#]*)").exec(a);if(b&&b.length)return decodeURIComponent(b[1])};a.Ua=function(){var d=i,c=m.location.href;try{var b=a.Oa(c,r.Y);if(b)for(var d={},e=b.split("|"),c=0,f=e.length;c<f;c++){var g=e[c].split("=");d[g[0]]=decodeURIComponent(g[1])}return d}catch(h){}};
a.Ma=function(){var d=a.Ua();if(d){var c=d[n],b=a.setMarketingCloudVisitorID;c&&c.match(r.u)&&b(c);a.j(s,-1);d=d[p];c=a.setAnalyticsVisitorID;d&&d.match(r.u)&&c(d)}};a.Ta=function(d){function c(d){x.ob(d)&&a.setCustomerIDs(d)}function b(d){d=d||{};a._supplementalDataIDCurrent=d.supplementalDataIDCurrent||"";a._supplementalDataIDCurrentConsumed=d.supplementalDataIDCurrentConsumed||{};a._supplementalDataIDLast=d.supplementalDataIDLast||"";a._supplementalDataIDLastConsumed=d.supplementalDataIDLastConsumed||
{}}d&&d[a.marketingCloudOrgID]&&(d=d[a.marketingCloudOrgID],c(d.customerIDs),b(d.sdid))};a.l=i;a.Ra=function(d,c,b,e){c=a.v(c,"d_fieldgroup",d,1);e.url=a.v(e.url,"d_fieldgroup",d,1);e.m=a.v(e.m,"d_fieldgroup",d,1);w.d[d]=j;e===Object(e)&&e.m&&"XMLHttpRequest"===a.ja.C.D?a.ja.hb(e,b,d):a.useCORSOnly||a.ga(d,c,b)};a.ga=function(d,c,b){var e=0,f=0,g;if(c&&t){for(g=0;!e&&2>g;){try{e=(e=t.getElementsByTagName(0<g?"HEAD":"head"))&&0<e.length?e[0]:0}catch(h){e=0}g++}if(!e)try{t.body&&(e=t.body)}catch(k){e=
0}if(e)for(g=0;!f&&2>g;){try{f=t.createElement(0<g?"SCRIPT":"script")}catch(l){f=0}g++}}!c||!e||!f?b&&b():(f.type="text/javascript",f.src=c,e.firstChild?e.insertBefore(f,e.firstChild):e.appendChild(f),e=a.loadTimeout,o.d[d]={requestStart:o.o(),url:c,sa:e,qa:o.wa(),ra:0},b&&(a.l==i&&(a.l={}),a.l[d]=setTimeout(function(){b(j)},e)),a.ha.Da.push(c))};a.Na=function(d){a.l!=i&&a.l[d]&&(clearTimeout(a.l[d]),a.l[d]=0)};a.ea=k;a.fa=k;a.isAllowed=function(){if(!a.ea&&(a.ea=j,a.cookieRead(a.cookieName)||a.cookieWrite(a.cookieName,
"T",1)))a.fa=j;return a.fa};a.b=i;a.c=i;var E=l.Tb;E||(E="MC");var n=l.Zb;n||(n="MCMID");var G=l.Ub;G||(G="MCCIDH");var J=l.Xb;J||(J="MCSYNCS");var H=l.Yb;H||(H="MCSYNCSOP");var I=l.Vb;I||(I="MCIDTS");var A=l.Wb;A||(A="MCOPTOUT");var C=l.Rb;C||(C="A");var p=l.Ob;p||(p="MCAID");var B=l.Sb;B||(B="AAM");var y=l.Qb;y||(y="MCAAMLH");var s=l.Pb;s||(s="MCAAMB");var u=l.$b;u||(u="NONE");a.L=0;a.ca=function(){if(!a.L){var d=a.version;a.audienceManagerServer&&(d+="|"+a.audienceManagerServer);a.audienceManagerServerSecure&&
(d+="|"+a.audienceManagerServerSecure);a.L=a.da(d)}return a.L};a.ia=k;a.f=function(){if(!a.ia){a.ia=j;var d=a.ca(),c=k,b=a.cookieRead(a.cookieName),e,f,g,h,l=new Date;a.b==i&&(a.b={});if(b&&"T"!=b){b=b.split("|");b[0].match(/^[\-0-9]+$/)&&(parseInt(b[0],10)!=d&&(c=j),b.shift());1==b.length%2&&b.pop();for(d=0;d<b.length;d+=2)if(e=b[d].split("-"),f=e[0],g=b[d+1],1<e.length?(h=parseInt(e[1],10),e=0<e[1].indexOf("s")):(h=0,e=k),c&&(f==G&&(g=""),0<h&&(h=l.getTime()/1E3-60)),f&&g&&(a.e(f,g,1),0<h&&(a.b["expire"+
f]=h+(e?"s":""),l.getTime()>=1E3*h||e&&!a.cookieRead(a.sessionCookieName))))a.c||(a.c={}),a.c[f]=j}c=a.loadSSL?!!a.trackingServerSecure:!!a.trackingServer;if(!a.a(p)&&c&&(b=a.cookieRead("s_vi")))b=b.split("|"),1<b.length&&0<=b[0].indexOf("v1")&&(g=b[1],d=g.indexOf("["),0<=d&&(g=g.substring(0,d)),g&&g.match(r.u)&&a.e(p,g))}};a.Xa=function(){var d=a.ca(),c,b;for(c in a.b)!Object.prototype[c]&&a.b[c]&&"expire"!=c.substring(0,6)&&(b=a.b[c],d+=(d?"|":"")+c+(a.b["expire"+c]?"-"+a.b["expire"+c]:"")+"|"+
b);a.cookieWrite(a.cookieName,d,1)};a.a=function(d,c){return a.b!=i&&(c||!a.c||!a.c[d])?a.b[d]:i};a.e=function(d,c,b){a.b==i&&(a.b={});a.b[d]=c;b||a.Xa()};a.Qa=function(d,c){var b=a.a(d,c);return b?b.split("*"):i};a.Wa=function(d,c,b){a.e(d,c?c.join("*"):"",b)};a.Ib=function(d,c){var b=a.Qa(d,c);if(b){var e={},f;for(f=0;f<b.length;f+=2)e[b[f]]=b[f+1];return e}return i};a.Kb=function(d,c,b){var e=i,f;if(c)for(f in e=[],c)Object.prototype[f]||(e.push(f),e.push(c[f]));a.Wa(d,e,b)};a.j=function(d,c,b){var e=
new Date;e.setTime(e.getTime()+1E3*c);a.b==i&&(a.b={});a.b["expire"+d]=Math.floor(e.getTime()/1E3)+(b?"s":"");0>c?(a.c||(a.c={}),a.c[d]=j):a.c&&(a.c[d]=k);b&&(a.cookieRead(a.sessionCookieName)||a.cookieWrite(a.sessionCookieName,"1"))};a.ba=function(a){if(a&&("object"==typeof a&&(a=a.d_mid?a.d_mid:a.visitorID?a.visitorID:a.id?a.id:a.uuid?a.uuid:""+a),a&&(a=a.toUpperCase(),"NOTARGET"==a&&(a=u)),!a||a!=u&&!a.match(r.u)))a="";return a};a.k=function(d,c){a.Na(d);a.i!=i&&(a.i[d]=k);o.d[d]&&(o.d[d].zb=o.o(),
o.I(d));w.d[d]&&w.Fa(d,k);if(d==E){w.isClientSideMarketingCloudVisitorID!==j&&(w.isClientSideMarketingCloudVisitorID=k);var b=a.a(n);if(!b){b="object"==typeof c&&c.mid?c.mid:a.ba(c);if(!b){if(a.B){a.getAnalyticsVisitorID(i,k,j);return}b=a.r(0,n)}a.e(n,b)}if(!b||b==u)b="";"object"==typeof c&&((c.d_region||c.dcs_region||c.d_blob||c.blob)&&a.k(B,c),a.B&&c.mid&&a.k(C,{id:c.id}));a.q(n,[b])}if(d==B&&"object"==typeof c){b=604800;c.id_sync_ttl!=D&&c.id_sync_ttl&&(b=parseInt(c.id_sync_ttl,10));var e=a.a(y);
e||((e=c.d_region)||(e=c.dcs_region),e&&(a.j(y,b),a.e(y,e)));e||(e="");a.q(y,[e]);e=a.a(s);if(c.d_blob||c.blob)(e=c.d_blob)||(e=c.blob),a.j(s,b),a.e(s,e);e||(e="");a.q(s,[e]);!c.error_msg&&a.A&&a.e(G,a.A)}if(d==C){b=a.a(p);b||((b=a.ba(c))?b!==u&&a.j(s,-1):b=u,a.e(p,b));if(!b||b==u)b="";a.q(p,[b])}a.idSyncDisableSyncs?z.xa=j:(z.xa=k,b={},b.ibs=c.ibs,b.subdomain=c.subdomain,z.vb(b));if(c===Object(c)){var f;a.isAllowed()&&(f=a.a(A));f||(f=u,c.d_optout&&c.d_optout instanceof Array&&(f=c.d_optout.join(",")),
b=parseInt(c.d_ottl,10),isNaN(b)&&(b=7200),a.j(A,b,j),a.e(A,f));a.q(A,[f])}};a.i=i;a.s=function(d,c,b,e,f){var g="",h,k=x.nb(d);if(a.isAllowed()&&(a.f(),g=a.a(d,K[d]===j),a.disableThirdPartyCalls&&!g&&(d===n?(g=a.r(0,n),a.setMarketingCloudVisitorID(g)):d===p&&!k&&(g="",a.setAnalyticsVisitorID(g))),(!g||a.c&&a.c[d])&&(!a.disableThirdPartyCalls||k)))if(d==n||d==A?h=E:d==y||d==s?h=B:d==p&&(h=C),h){if(c&&(a.i==i||!a.i[h]))a.i==i&&(a.i={}),a.i[h]=j,a.Ra(h,c,function(b,c){if(!a.a(d))if(o.d[h]&&(o.d[h].timeout=
o.o(),o.d[h].mb=!!b,o.I(h)),c===Object(c)&&!a.useCORSOnly)a.ga(h,c.url,c.G);else{b&&w.Fa(h,j);var e="";d==n?e=a.r(0,n):h==B&&(e={error_msg:"timeout"});a.k(h,e)}},f);if(g)return g;a.Va(d,b);c||a.k(h,{id:u});return""}if((d==n||d==p)&&g==u)g="",e=j;b&&e&&a.J(b,[g]);return g};a._setMarketingCloudFields=function(d){a.f();a.k(E,d)};a.setMarketingCloudVisitorID=function(d){a._setMarketingCloudFields(d)};a.B=k;a.getMarketingCloudVisitorID=function(d,c){if(a.isAllowed()){a.marketingCloudServer&&0>a.marketingCloudServer.indexOf(".demdex.net")&&
(a.B=j);var b=a.z("_setMarketingCloudFields");return a.s(n,b.url,d,c,b)}return""};a.Sa=function(){a.getAudienceManagerBlob()};l.AuthState={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2};a.w={};a.aa=k;a.A="";a.setCustomerIDs=function(d){if(a.isAllowed()&&d){a.f();var c,b;for(c in d)if(!Object.prototype[c]&&(b=d[c]))if("object"==typeof b){var e={};b.id&&(e.id=b.id);b.authState!=D&&(e.authState=b.authState);a.w[c]=e}else a.w[c]={id:b};var d=a.getCustomerIDs(),e=a.a(G),f="";e||(e=0);for(c in d)Object.prototype[c]||
(b=d[c],f+=(f?"|":"")+c+"|"+(b.id?b.id:"")+(b.authState?b.authState:""));a.A=a.da(f);a.A!=e&&(a.aa=j,a.Sa())}};a.getCustomerIDs=function(){a.f();var d={},c,b;for(c in a.w)Object.prototype[c]||(b=a.w[c],d[c]||(d[c]={}),b.id&&(d[c].id=b.id),d[c].authState=b.authState!=D?b.authState:l.AuthState.UNKNOWN);return d};a._setAnalyticsFields=function(d){a.f();a.k(C,d)};a.setAnalyticsVisitorID=function(d){a._setAnalyticsFields(d)};a.getAnalyticsVisitorID=function(d,c,b){if(a.isAllowed()){var e="";b||(e=a.getMarketingCloudVisitorID(function(){a.getAnalyticsVisitorID(d,
j)}));if(e||b){var f=b?a.marketingCloudServer:a.trackingServer,g="";a.loadSSL&&(b?a.marketingCloudServerSecure&&(f=a.marketingCloudServerSecure):a.trackingServerSecure&&(f=a.trackingServerSecure));var h={};if(f){var f="http"+(a.loadSSL?"s":"")+"://"+f+"/id",e="d_visid_ver="+a.version+"&mcorgid="+encodeURIComponent(a.marketingCloudOrgID)+(e?"&mid="+encodeURIComponent(e):"")+(a.idSyncDisable3rdPartySyncing?"&d_coppa=true":""),i=["s_c_il",a._in,"_set"+(b?"MarketingCloud":"Analytics")+"Fields"],g=f+"?"+
e+"&callback=s_c_il%5B"+a._in+"%5D._set"+(b?"MarketingCloud":"Analytics")+"Fields";h.m=f+"?"+e;h.na=i}h.url=g;return a.s(b?n:p,g,d,c,h)}}return""};a._setAudienceManagerFields=function(d){a.f();a.k(B,d)};a.z=function(d){var c=a.audienceManagerServer,b="",e=a.a(n),f=a.a(s,j),g=a.a(p),g=g&&g!=u?"&d_cid_ic=AVID%01"+encodeURIComponent(g):"";a.loadSSL&&a.audienceManagerServerSecure&&(c=a.audienceManagerServerSecure);if(c){var b=a.getCustomerIDs(),h,i;if(b)for(h in b)Object.prototype[h]||(i=b[h],g+="&d_cid_ic="+
encodeURIComponent(h)+"%01"+encodeURIComponent(i.id?i.id:"")+(i.authState?"%01"+i.authState:""));d||(d="_setAudienceManagerFields");c="http"+(a.loadSSL?"s":"")+"://"+c+"/id";e="d_visid_ver="+a.version+"&d_rtbd=json&d_ver=2"+(!e&&a.B?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(a.marketingCloudOrgID)+"&d_nsid="+(a.idSyncContainerID||0)+(e?"&d_mid="+encodeURIComponent(e):"")+(a.idSyncDisable3rdPartySyncing?"&d_coppa=true":"")+(f?"&d_blob="+encodeURIComponent(f):"")+g;f=["s_c_il",a._in,d];b=c+"?"+
e+"&d_cb=s_c_il%5B"+a._in+"%5D."+d;return{url:b,m:c+"?"+e,na:f}}return{url:b}};a.getAudienceManagerLocationHint=function(d,c){if(a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerLocationHint(d,j)})){var b=a.a(p);b||(b=a.getAnalyticsVisitorID(function(){a.getAudienceManagerLocationHint(d,j)}));if(b)return b=a.z(),a.s(y,b.url,d,c,b)}return""};a.getAudienceManagerBlob=function(d,c){if(a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerBlob(d,j)})){var b=
a.a(p);b||(b=a.getAnalyticsVisitorID(function(){a.getAudienceManagerBlob(d,j)}));if(b){var b=a.z(),e=b.url;a.aa&&a.j(s,-1);return a.s(s,e,d,c,b)}}return""};a._supplementalDataIDCurrent="";a._supplementalDataIDCurrentConsumed={};a._supplementalDataIDLast="";a._supplementalDataIDLastConsumed={};a.getSupplementalDataID=function(d,c){!a._supplementalDataIDCurrent&&!c&&(a._supplementalDataIDCurrent=a.r(1));var b=a._supplementalDataIDCurrent;a._supplementalDataIDLast&&!a._supplementalDataIDLastConsumed[d]?
(b=a._supplementalDataIDLast,a._supplementalDataIDLastConsumed[d]=j):b&&(a._supplementalDataIDCurrentConsumed[d]&&(a._supplementalDataIDLast=a._supplementalDataIDCurrent,a._supplementalDataIDLastConsumed=a._supplementalDataIDCurrentConsumed,a._supplementalDataIDCurrent=b=!c?a.r(1):"",a._supplementalDataIDCurrentConsumed={}),b&&(a._supplementalDataIDCurrentConsumed[d]=j));return b};l.OptOut={GLOBAL:"global"};a.getOptOut=function(d,c){if(a.isAllowed()){var b=a.z("_setMarketingCloudFields");return a.s(A,
b.url,d,c,b)}return""};a.isOptedOut=function(d,c,b){return a.isAllowed()?(c||(c=l.OptOut.GLOBAL),(b=a.getOptOut(function(b){a.J(d,[b==l.OptOut.GLOBAL||0<=b.indexOf(c)])},b))?b==l.OptOut.GLOBAL||0<=b.indexOf(c):i):k};a.appendVisitorIDsTo=function(d){for(var c=r.Y,b=[[n,a.a(n)],[p,a.a(p)]],e="",f=0,g=b.length;f<g;f++){var h=b[f],j=h[0],h=h[1];h!=i&&h!==u&&(e=e?e+="|":e,e+=j+"="+encodeURIComponent(h))}try{return a.v(d,c,e)}catch(k){return d}};var r={p:!!m.postMessage,Ia:1,$:864E5,Y:"adobe_mc",u:/^[0-9a-fA-F\-]+$/};
a.Db=r;a.la={postMessage:function(a,c,b){var e=1;c&&(r.p?b.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):c&&(b.location=c.replace(/#.*$/,"")+"#"+ +new Date+e++ +"&"+a))},T:function(a,c){var b;try{if(r.p)if(a&&(b=function(b){if("string"===typeof c&&b.origin!==c||"[object Function]"===Object.prototype.toString.call(c)&&!1===c(b.origin))return!1;a(b)}),window.addEventListener)window[a?"addEventListener":"removeEventListener"]("message",b,!1);else window[a?"attachEvent":"detachEvent"]("onmessage",
b)}catch(e){}}};var x={M:function(){if(t.addEventListener)return function(a,c,b){a.addEventListener(c,function(a){"function"===typeof b&&b(a)},k)};if(t.attachEvent)return function(a,c,b){a.attachEvent("on"+c,function(a){"function"===typeof b&&b(a)})}}(),map:function(a,c){if(Array.prototype.map)return a.map(c);if(void 0===a||a===i)throw new TypeError;var b=Object(a),e=b.length>>>0;if("function"!==typeof c)throw new TypeError;for(var f=Array(e),g=0;g<e;g++)g in b&&(f[g]=c.call(c,b[g],g,b));return f},
gb:function(a,c){return this.map(a,function(a){return encodeURIComponent(a)}).join(c)},ub:function(a){var c=a.indexOf("#");return 0<c?a.substr(c):""},lb:function(a){var c=a.indexOf("#");return 0<c?a.substr(0,c):a},Ya:function(a,c,b){a=a.split("&");b=b!=i?b:a.length;a.splice(b,0,c);return a.join("&")},nb:function(d,c,b){if(d!==p)return k;c||(c=a.trackingServer);b||(b=a.trackingServerSecure);d=a.loadSSL?b:c;return"string"===typeof d&&d.length?0>d.indexOf("2o7.net")&&0>d.indexOf("omtrdc.net"):k},ob:function(a){return Boolean(a&&
a===Object(a))}};a.Jb=x;var L={C:function(){var a="none",c=j;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?a="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?a="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(c=k),0<Object.prototype.toString.call(window.Ab).indexOf("Constructor")&&(c=k));return{D:a,Mb:c}}(),ib:function(){return"none"===this.C.D?
i:new window[this.C.D]},hb:function(d,c,b){var e=this;c&&(d.G=c);try{var f=this.ib();f.open("get",d.m+"&ts="+(new Date).getTime(),j);"XMLHttpRequest"===this.C.D&&(f.withCredentials=j,f.timeout=a.loadTimeout,f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),f.onreadystatechange=function(){if(4===this.readyState&&200===this.status)a:{var a;try{if(a=JSON.parse(this.responseText),a!==Object(a)){e.n(d,i,"Response is not JSON");break a}}catch(b){e.n(d,b,"Error parsing response as JSON");
break a}try{for(var c=d.na,f=window,g=0;g<c.length;g++)f=f[c[g]];f(a)}catch(j){e.n(d,j,"Error forming callback function")}}});f.onerror=function(a){e.n(d,a,"onerror")};f.ontimeout=function(a){e.n(d,a,"ontimeout")};f.send();o.d[b]={requestStart:o.o(),url:d.m,sa:f.timeout,qa:o.wa(),ra:1};a.ha.Da.push(d.m)}catch(g){this.n(d,g,"try-catch")}},n:function(d,c,b){a.CORSErrors.push({Nb:d,error:c,description:b});d.G&&("ontimeout"===b?d.G(j):d.G(k,d))}};a.ja=L;var z={Ka:3E4,Z:649,Ha:k,id:i,S:[],P:i,va:function(a){if("string"===
typeof a)return a=a.split("/"),a[0]+"//"+a[2]},g:i,url:i,jb:function(){var d="http://fast.",c="?d_nsid="+a.idSyncContainerID+"#"+encodeURIComponent(t.location.href);this.g||(this.g="nosubdomainreturned");a.loadSSL&&(d=a.idSyncSSLUseAkamai?"https://fast.":"https://");d=d+this.g+".demdex.net/dest5.html"+c;this.P=this.va(d);this.id="destination_publishing_iframe_"+this.g+"_"+a.idSyncContainerID;return d},ab:function(){var d="?d_nsid="+a.idSyncContainerID+"#"+encodeURIComponent(t.location.href);"string"===
typeof a.K&&a.K.length&&(this.id="destination_publishing_iframe_"+(new Date).getTime()+"_"+a.idSyncContainerID,this.P=this.va(a.K),this.url=a.K+d)},xa:i,ta:k,V:k,F:i,ac:i,tb:i,bc:i,U:k,H:[],rb:[],sb:[],za:r.p?15:100,Q:[],pb:[],oa:j,Ca:k,Ba:function(){return!a.idSyncDisable3rdPartySyncing&&(this.ta||a.Fb)&&this.g&&"nosubdomainreturned"!==this.g&&this.url&&!this.V},N:function(){function a(){e=document.createElement("iframe");e.sandbox="allow-scripts allow-same-origin";e.title="Adobe ID Syncing iFrame";
e.id=b.id;e.style.cssText="display: none; width: 0; height: 0;";e.src=b.url;b.tb=j;c();document.body.appendChild(e)}function c(){x.M(e,"load",function(){e.className="aamIframeLoaded";b.F=j;b.t()})}this.V=j;var b=this,e=document.getElementById(this.id);e?"IFRAME"!==e.nodeName?(this.id+="_2",a()):"aamIframeLoaded"!==e.className?c():(this.F=j,this.ya=e,this.t()):a();this.ya=e},t:function(d){var c=this;d===Object(d)&&(this.Q.push(d),this.wb(d));if((this.Ca||!r.p||this.F)&&this.Q.length)this.I(this.Q.shift()),
this.t();!a.idSyncDisableSyncs&&this.F&&this.H.length&&!this.U&&(this.Ha||(this.Ha=j,setTimeout(function(){c.za=r.p?15:150},this.Ka)),this.U=j,this.Ea())},wb:function(a){var c,b,e;if((c=a.ibs)&&c instanceof Array&&(b=c.length))for(a=0;a<b;a++)e=c[a],e.syncOnPage&&this.pa(e,"","syncOnPage")},I:function(a){var c=encodeURIComponent,b,e,f,g,h;if((b=a.ibs)&&b instanceof Array&&(e=b.length))for(f=0;f<e;f++)g=b[f],h=[c("ibs"),c(g.id||""),c(g.tag||""),x.gb(g.url||[],","),c(g.ttl||""),"","",g.fireURLSync?
"true":"false"],g.syncOnPage||(this.oa?this.ma(h.join("|")):g.fireURLSync&&this.pa(g,h.join("|")));this.pb.push(a)},pa:function(d,c,b){var e=(b="syncOnPage"===b?j:k)?H:J;a.f();var f=a.a(e),g=k,h=k,i=Math.ceil((new Date).getTime()/r.$);f?(f=f.split("*"),h=this.xb(f,d.id,i),g=h.eb,h=h.fb,(!g||!h)&&this.ua(b,d,c,f,e,i)):(f=[],this.ua(b,d,c,f,e,i))},xb:function(a,c,b){var e=k,f=k,g,h,i;for(h=0;h<a.length;h++)g=a[h],i=parseInt(g.split("-")[1],10),g.match("^"+c+"-")?(e=j,b<i?f=j:(a.splice(h,1),h--)):b>=
i&&(a.splice(h,1),h--);return{eb:e,fb:f}},qb:function(a){if(a.join("*").length>this.Z)for(a.sort(function(a,b){return parseInt(a.split("-")[1],10)-parseInt(b.split("-")[1],10)});a.join("*").length>this.Z;)a.shift()},ua:function(d,c,b,e,f,g){var h=this;if(d){if("img"===c.tag){var d=c.url,b=a.loadSSL?"https:":"http:",j,k,l;for(e=0,j=d.length;e<j;e++){k=d[e];l=/^\/\//.test(k);var m=new Image;x.M(m,"load",function(b,c,d,e){return function(){h.S[b]=i;a.f();var g=a.a(f),j=[];if(g){var g=g.split("*"),k,
l,m;for(k=0,l=g.length;k<l;k++)m=g[k],m.match("^"+c.id+"-")||j.push(m)}h.Ga(j,c,d,e)}}(this.S.length,c,f,g));m.src=(l?b:"")+k;this.S.push(m)}}}else this.ma(b),this.Ga(e,c,f,g)},ma:function(d){var c=encodeURIComponent;this.H.push((a.Gb?c("---destpub-debug---"):c("---destpub---"))+d)},Ga:function(d,c,b,e){d.push(c.id+"-"+(e+Math.ceil(c.ttl/60/24)));this.qb(d);a.e(b,d.join("*"))},Ea:function(){var d=this,c;this.H.length?(c=this.H.shift(),a.la.postMessage(c,this.url,this.ya.contentWindow),this.rb.push(c),
setTimeout(function(){d.Ea()},this.za)):this.U=k},T:function(a){var c=/^---destpub-to-parent---/;"string"===typeof a&&c.test(a)&&(c=a.replace(c,"").split("|"),"canSetThirdPartyCookies"===c[0]&&(this.oa="true"===c[1]?j:k,this.Ca=j,this.t()),this.sb.push(a))},vb:function(d){if(this.url===i||d.subdomain&&"nosubdomainreturned"===this.g)this.g="string"===typeof a.ka&&a.ka.length?a.ka:d.subdomain||"",this.url=this.jb();d.ibs instanceof Array&&d.ibs.length&&(this.ta=j);this.Ba()&&(a.idSyncAttachIframeOnWindowLoad?
(l.X||"complete"===t.readyState||"loaded"===t.readyState)&&this.N():this.Za());"function"===typeof a.idSyncIDCallResult?a.idSyncIDCallResult(d):this.t(d);"function"===typeof a.idSyncAfterIDCallResult&&a.idSyncAfterIDCallResult(d)},$a:function(d,c){return a.Hb||!d||c-d>r.Ia},Za:function(){function a(){c.V||(document.body?c.N():setTimeout(a,30))}var c=this;a()}};a.Eb=z;a.timeoutMetricsLog=[];var o={cb:window.performance&&window.performance.timing?1:0,Aa:window.performance&&window.performance.timing?
window.performance.timing:i,W:i,O:i,d:{},R:[],send:function(d){if(a.takeTimeoutMetrics&&d===Object(d)){var c=[],b=encodeURIComponent,e;for(e in d)d.hasOwnProperty(e)&&c.push(b(e)+"="+b(d[e]));d="http"+(a.loadSSL?"s":"")+"://dpm.demdex.net/event?d_visid_ver="+a.version+"&d_visid_stg_timeout="+a.loadTimeout+"&"+c.join("&")+"&d_orgid="+b(a.marketingCloudOrgID)+"&d_timingapi="+this.cb+"&d_winload="+this.kb()+"&d_ld="+this.o();(new Image).src=d;a.timeoutMetricsLog.push(d)}},kb:function(){this.O===i&&(this.O=
this.Aa?this.W-this.Aa.navigationStart:this.W-l.bb);return this.O},o:function(){return(new Date).getTime()},I:function(a){var c=this.d[a],b={};b.d_visid_stg_timeout_captured=c.sa;b.d_visid_cors=c.ra;b.d_fieldgroup=a;b.d_settimeout_overriden=c.qa;c.timeout?c.mb?(b.d_visid_timedout=1,b.d_visid_timeout=c.timeout-c.requestStart,b.d_visid_response=-1):(b.d_visid_timedout="n/a",b.d_visid_timeout="n/a",b.d_visid_response="n/a"):(b.d_visid_timedout=0,b.d_visid_timeout=-1,b.d_visid_response=c.zb-c.requestStart);
b.d_visid_url=c.url;l.X?this.send(b):this.R.push(b);delete this.d[a]},yb:function(){for(var a=0,c=this.R.length;a<c;a++)this.send(this.R[a])},wa:function(){return"function"===typeof setTimeout.toString?-1<setTimeout.toString().indexOf("[native code]")?0:1:-1}};a.Lb=o;var w={isClientSideMarketingCloudVisitorID:i,MCIDCallTimedOut:i,AnalyticsIDCallTimedOut:i,AAMIDCallTimedOut:i,d:{},Fa:function(a,c){switch(a){case E:c===k?this.MCIDCallTimedOut!==j&&(this.MCIDCallTimedOut=k):this.MCIDCallTimedOut=c;break;
case C:c===k?this.AnalyticsIDCallTimedOut!==j&&(this.AnalyticsIDCallTimedOut=k):this.AnalyticsIDCallTimedOut=c;break;case B:c===k?this.AAMIDCallTimedOut!==j&&(this.AAMIDCallTimedOut=k):this.AAMIDCallTimedOut=c}}};a.isClientSideMarketingCloudVisitorID=function(){return w.isClientSideMarketingCloudVisitorID};a.MCIDCallTimedOut=function(){return w.MCIDCallTimedOut};a.AnalyticsIDCallTimedOut=function(){return w.AnalyticsIDCallTimedOut};a.AAMIDCallTimedOut=function(){return w.AAMIDCallTimedOut};a.idSyncGetOnPageSyncInfo=
function(){a.f();return a.a(H)};0>q.indexOf("@")&&(q+="@AdobeOrg");a.marketingCloudOrgID=q;a.cookieName="AMCV_"+q;a.sessionCookieName="AMCVS_"+q;a.cookieDomain=a.Pa();a.cookieDomain==m.location.hostname&&(a.cookieDomain="");a.loadSSL=0<=m.location.protocol.toLowerCase().indexOf("https");a.loadTimeout=3E4;a.CORSErrors=[];a.marketingCloudServer=a.audienceManagerServer="dpm.demdex.net";var K={};K[y]=j;K[s]=j;a.Ma();if(v&&"object"==typeof v){for(var F in v)!Object.prototype[F]&&(a[F]=v[F]);a.idSyncContainerID=
a.idSyncContainerID||0;a.f();L=a.a(I);F=Math.ceil((new Date).getTime()/r.$);!a.idSyncDisableSyncs&&z.$a(L,F)&&(a.j(s,-1),a.e(I,F));a.getMarketingCloudVisitorID();a.getAudienceManagerLocationHint();a.getAudienceManagerBlob();a.Ta(a.serverState)}if(!a.idSyncDisableSyncs){z.ab();x.M(window,"load",function(){l.X=j;o.W=o.o();o.yb();var a=z;a.Ba()&&a.N()});try{a.la.T(function(a){z.T(a.data)},z.P)}catch(M){}}}
Visitor.getInstance=function(q,v){var a,m=window.s_c_il,l;0>q.indexOf("@")&&(q+="@AdobeOrg");if(m)for(l=0;l<m.length;l++)if((a=m[l])&&"Visitor"==a._c&&a.marketingCloudOrgID==q)return a;return new Visitor(q,v)};(function(){function q(){v.X=a}var v=window.Visitor,a=v.La,m=v.Ja;a||(a=!0);m||(m=!1);window.addEventListener?window.addEventListener("load",q):window.attachEvent&&window.attachEvent("onload",q);v.bb=(new Date).getTime()})();
