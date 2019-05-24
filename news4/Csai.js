(function (exports) {
'use strict';

var Csai = function (_akamai$amp$Plugin) {
  babelHelpers.inherits(Csai, _akamai$amp$Plugin);

  function Csai(player, config) {
    babelHelpers.classCallCheck(this, Csai);

    var _this = babelHelpers.possibleConstructorReturn(this, (Csai.__proto__ || Object.getPrototypeOf(Csai)).call(this, player, config));

    _this.player = player;
    _this.podIndex = 0;
    _this.dvrIds = ['1241186546001', '1251429410001', '5270285051001', '5270285052001', '5640669329001', '5614615980001', '5614626175001'];
    return _this;
  }

  babelHelpers.createClass(Csai, [{
    key: 'onready',
    value: function onready() {
      var player = this.player;

      // this.mediaTransform(); //test execute custom code for temporal type
    }
  }, {
    key: 'init',
    value: function init() {
      var player = this.player || null;
      var cueRegex = /EXT-X-CUE-OUT|EXT-X-CUE-IN/i;
      var prevSegment = { isAdLoaded: false, key: '' };

      player.hls.addEventListener(Hls.Events.FRAG_CHANGED, function (event, data) {
        var fragPlaying = event.data.frag;
        if (fragPlaying.tagList) {
          var cue,
              tagList = fragPlaying.tagList[0];

          for (var i = 0, j = tagList.length; i < j; i++) {
            var result = tagList[i].match(cueRegex);
            if (result) {
              cue = result[0];
            }
          }

          switch (cue) {
            case 'EXT-X-CUE-OUT':
              console.log("EXT-X-CUE-OUT", { tagList: fragPlaying.tagList });
              if (!prevSegment.isAdLoaded) {
                this.onAdIn(this, { tagList: fragPlaying.tagList });
                prevSegment.isAdLoaded = true;
              }
              break;

            case 'EXT-X-CUE-IN':
              console.log("EXT-X-CUE-IN", { tagList: fragPlaying.tagList });
              if (prevSegment.isAdLoaded) {
                prevSegment.isAdLoaded = false;
              }
              break;
          }
        }
      }.bind(this));
    }
  }, {
    key: 'onAdIn',
    value: function onAdIn(event, data) {
      var duration, breakId, tag, result;
      var data = data || event.data;
      for (var i = 0, j = data.tagList.length; i < j; i++) {
        result = data.tagList[0][i].match(/([^,]+)/g);
        for (var k = 0, l = result.length; k < l; k++) {
          tag = result[k].match(/([^=]+)/g);
          if (typeof tag !== 'undefined' && 'DURATION' == tag[0]) {
            duration = parseInt(tag[1]) * 1000;
          } else if (typeof tag !== 'undefined' && 'BREAKID' == tag[0]) {
            breakId = tag[1].match(/^(2)/g) ? 0 : tag[1].indexOf('0x1') > -1 ? 0 : 1;
          }
        }
      }
      this.requestAd(duration, breakId);
    }
  }, {
    key: 'requestAd',
    value: function requestAd(duration, breakId) {
      var player = this.player || null;

      console.log('Ad triggered', duration, breakId, "0", "xml_vast2");
      this.podIndex++;
      player.setParams({ adDuration: duration, adBreakId: breakId, adRule: "0", adOutput: "xml_vast2", adPod: this.podIndex });
      player.ads.requestAd();
      player.getContainer().classList.add("ad-request");
      player.ads.once("loaded", this.adsLoadedHandler.bind(this));
    }
  }, {
    key: 'adsLoadedHandler',
    value: function adsLoadedHandler() {
      var player = this.player || null;

      player.getContainer().classList.remove("ad-request");
    }
  }, {
    key: 'ExceptionHandler',
    value: function ExceptionHandler(data, type) {
      this.message = data;
      this.type = type || 'PlayerException';
    }
  }, {
    key: 'mediaTransform',
    value: function mediaTransform() {
      var player = this.player;

      if (typeof player.mediaTransforms === 'function') {
        player.mediaTransforms.push(function (media) {
          if (-1 < this.indexOf(media.guid)) {
            media.temporalType = "dvr";
          }
          return media;
        }.bind(this.dvrIds));
      } else if (typeof player.addTransform === 'function') {
        player.addTransform(akamai.amp.TransformType.MEDIA, function (media) {
          if (-1 < this.indexOf(media.guid)) {
            media.temporalType = "dvr";
          }
          return media;
        }.bind(this.dvrIds));
      }
    }
  }]);
  return Csai;
}(akamai.amp.Plugin);

akamai.amp.AMP.registerPlugin("csai", typeof akamai.amp.Plugin.createFactory == 'function' ? akamai.amp.Plugin.createFactory(Csai) : Csai.factory);

exports.Csai = Csai;

}({}));
//# sourceMappingURL=Csai.js.map
