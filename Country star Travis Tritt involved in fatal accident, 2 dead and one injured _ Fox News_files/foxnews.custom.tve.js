/**
 * Updated 1st JUN TODO need refactor due 74 changes
 * updated 20th april this has been moved to plugin architecture. 
 *@author Mav
 */

/*Monkey hack for VPAID ads which block the control bar*/
var player = typeof (amp) != 'undefined' ? amp : null; 
var setting; 

if (player) {
  player.once("ready", function () {
    if (typeof (player.ads) != 'undefined' && player.ads.hasOwnProperty('enabled') && player.ads.enabled) {
      player.ads.addEventListener("started", function (event) {
        var data = event.data;
        var ids = ["1fq51g", "1fq51h", "1fq51i", "1fq520", "1fq529", "1fq52a", "1fq52b", "1fq52e", "1fq52f", "1fq52g", "1fq52s", "1fq52t", "1fq52u", "1fq53g", "1fq54a", "1fq54d", "1fq54e", "1fq54f", "1fq54g", "1fq54h", "1fq54i", "1fq54j", "1fq54k", "1fq54l", "1fq54m", "1fq54n", "1fq54o", "1fq54p", "1fq54q", "1fq54r", "1fq54s", "1fq54t", "1fq54u","1fq53h","1fq549","1fq548","1fq53f","1gag47","1gag4a","1gag4d","1gag4g","1gag4j","1gag4m","1g7ccl", "1g7ccg", "1g7cck", "1g7ccc", "1g7rfo", "1g7rg1", "1g7rga", "1g7rfr", "1g7rfs", "1g7rft", "1g7rfu", "1g7rg2", "1g7rg3", "1g7rg4", "1g7rg5", "1g7rg7", "1g7rgb", "1g7rgc", "1g7rgf","867835", "1fk426", "867836", "1fk427", "867837", "1fk428", "867838", "1fk429", "867839", "1fk42a", "867840", "1fk42b", "907485", "1fk42c", "907486", "1fk42d", "907487", "1fk42e", "907488", "1fk42f", "907489", "1fk42g", "907490", "1fk42h", "907491", "1fk42i", "907492", "1fk42j", "907493", "1fk42k", "907494", "1fk42l", "907495", "1fk42m", "907496", "1fk42n", "907497", "1fk42o", "907498", "1fk42p", "907499", "1fk42q", "907500", "1fk42r", "907501", "1fk42s", "907502", "1fk42t", "907503", "1fk42u", "907504", "1fk430", "907505", "1fk431", "931860", "1fk432", "931863", "1fk433", "931866", "1fk434", "931869", "1fk1u3", "931872", "1fk1u4", "931875", "1fk1u5",'1lr1j2', '1lr1j3', '1lrf8m', '1lrf8n', '1lrf8o', '1lrf8p', '1lr1j4', '1lr1j5', '1lrf8q', '1lrf8r', '1lrf8s', '1lrf8t', '1lr1j6', '1lr1j7', '1lrf8u', '1lrf90', '1lrf91', '1lrf92', "1lr1j2", "1lr1j3", "1lrf8m", "1lrf8n", "1lrf8o", "1lrf8p", "1m1f2l", "1m1f2m", "1m1f2n", "1m1f2o", "1m1f2p", "1m1k60", "1lr1j4", "1lr1j5", "1lrf8q", "1lrf8r", "1lrf8s", "1lrf8t", "1m1f2q", "1m1f2r", "1m1f2s", "1m1f2t", "1m1f2u", "1m1k61", "1lr1j6", "1lr1j7", "1lrf8u", "1lrf90", "1lrf91", "1lrf92", "1m1f30", "1m1f31", "1m1f32", "1m1f33", "1m1f34", "1m1k62"];
        if (ids.indexOf(data.id) > -1) {
          player.react.mode = "none";
          player.react.adMode = "none";
        }
        else {
          player.react.mode = "auto";
          player.react.adMode = "auto";
        }
      });

      player.addEventListener("started", function (event) {
        player.react.mode = "auto";
        player.react.adMode = "auto";
      });
    }

    //Flash detection slate
    onmediachange();
    player.addEventListener("mediachange",onmediachange);

    //Preview state notification
    if(player.ais)
    {
      player.ais.addEventListener("preview",onpreview);
    }

    //CC handler improvements
    if(player.captioning)
    {
       if(-1 < akamai.amp.utils.Utils.getFFVersion())
       {
        player.sendNotification("addApplicationState","firefox");
       }
       player.addEventListener("fullscreenchange",onfullscreenchange);
    }

    
    player.addEventListener("autoplayblocked",function(event){
      var params = player.getParams();
      console.log(event);
      if(params.playerName === "LIVE_VIDEO" && event.data.threshold === "muted")
      {
        player.muted = true;
        setTimeout(function(){
          player.play();
        }, 100);
      }
      else if(event.data.threshold !== "allowed"){
        //player.autoplay = false; Need autoplay override on HP to not use player settings
      }
    });
    
    player.addTransform(akamai.amp.TransformType.AD_REQUEST, function (ad) {

      if(player.evaluateBindings("#{(/full_episode|live_stream/.test(window.createShowCategory(media.category)))}"))
      {
        return ad;
      }

      return new Promise(function (resolve, reject) {
        player.prebid.getAdTag()
        .then(function (master) {
          if (master) {
            player.amazonbidder.getAdTag()
            .then(function (data) {
              ad.request.adTagUrl = master + "&scp=" + data;
              resolve(ad)
            })
            .catch(function(error){
              ad.request.adTagUrl = master;
              console.log("[AMP Amazon Bidder Error]",error)
              resolve(ad)
            })
          }
          else {
            resolve(ad)
          }
        })
        .catch(function (error) {
          console.log("[AMP Prebid Error]",error)
          return resolve(ad)
        })
      });

    });

  });
}
else{
  throw new ExceptionHandler("No AMP instace defined",'PlayerException');
}

function isFlash(){
  var result = false;

  if (typeof (akamai) != 'undefined') {
    result = (akamai.amp.Utils.getPlaybackMode() === "flash" && -1 < akamai.amp.Utils.getIEVersion());
  }

  return result;
}

function isLiveContent(){
  var params = player.getParams();
  var path = typeof(document.location) != 'undefined' ? document.location.href : "";
  //var result = path.match(/sp=([^&]*)/);
  var result = path.match(/tve.html/);

  /*if(result && result.length > 0){
    return result[1] == "watch-live";
  }*/
  if(result){
    return result[0] == "tve.html";
  }
  else
  { 
    return false;
  }
}

function enableLiveAds(player) {
  var amp = player || null;
  if (amp == null) {
    throw new ExceptionHandler('Player instance not defined');
  }
  if (amp.csai) {
    amp.csai.init();
  }
};

function onmediachange()
{
  var _ref;
  
  if(isFlash() && isLiveContent())
  {
    var link = document.createElement('a');
    link.setAttribute('class', 'fox-support');
    link.setAttribute('target', '_top');
    link.setAttribute('href', 'https://help.foxnews.com/hc/en-us/articles/115001086494-Why-am-I-seeing-an-error-message-that-Flash-video-is-not-supported-');
    player.container.appendChild(link);
    player.sendNotification("addApplicationState","flash-not-allowed");
    player.setVolume(0);
  }
  else{
    amp.sendNotification("removeApplicationState","flash-not-allowed");
  }
  if((_ref = amp.media.restriction) != null ? _ref.length === 0 : false)
  {
  	amp.sendNotification("removeApplicationState","preview");
  }
}

function onpreview(event){
  var amp = player || null;
  var element = document.getElementsByClassName('akamai-ais-preview');
  var root = amp.react.container.element;

  if (amp == null) {
    throw new ExceptionHandler('Player instance not defined');
  }
  else{
    amp.sendNotification("addApplicationState",event.type);
  }
  
  //Move FP container into React container
  if(0 < element.length && root)
  {
    root.appendChild(element[0]);
  }

  /**TODO: Report this fix properly, When a content is on FP mode and a new src is set the FP timer still working in background */
  amp.once("mediachange",function(){
    var proxy = amp.ais.proxy; 
    
    if(proxy)proxy.timer.stop();
  })
  amp.addEventListener("playing",function(){
    var proxy = amp.ais.proxy; 
    
    if(proxy && !proxy.isRestricted(amp.media))proxy.timer.stop();
  })
}

function onfullscreenchange(event){
  var _setting;
  var amp = player || null;
  if (amp == null) {
    throw new ExceptionHandler('Player instance not defined');
  }
  else{
    if(!setting)
    {
      setting = amp.captioning.getSettings(); 
    }
    _setting = Object.assign({}, amp.captioning.settings);
    _setting.size = event.data ? "large" : setting.size;
    
    amp.captioning.changeSettings(_setting);
  }
}

function ExceptionHandler(data, type) {
  this.message = data;
  this.type = type || 'PlayerException';
}
