(function (exports) {
'use strict';

var _all;

var defaults = {
  events: {
    mediasequencestarted: { name: "Video Playback Started", category: "playback", state: "start" },
    mediasequenceended: { name: "Video Playback Completed", category: "playback", state: "end" },
    started: { name: "Video Content Started", category: "content" },
    ended: { name: "Video Content Completed", category: "content" },
    onbufferstarted: { name: "Video Playback Buffer Started", category: "playback", state: "buffer" },
    onbuffercompleted: { name: "Video Playback Buffer Completed", category: "playback" },
    seeking: { name: "Video Playback Seek Started", category: "playback", state: "seek" },
    seeked: { name: "Video Playback Seek Completed", category: "playback" },
    paused: { name: "Video Playback Paused", category: "playback", state: "pause" },
    resume: { name: "Video Playback Resumed", category: "playback", state: "play" },
    playing: { name: "Video Content Playing", category: "content", state: "play" },
    adstarted: { name: "Video Ad Started", category: "ad" },
    adended: { name: "Video Ad Completed", category: "ad" },
    adtimeupdate: { name: "Video Ad Playing", category: "ad" },
    adbreakend: { name: "Video Ad Break Completed", category: "ad" },
    adbreakstart: { name: "Video Ad Break Started", category: "ad" },
    adpause: { name: "Video Ad Paused", category: "ad", state: "pause" },
    adresume: { name: "Video Ad Resumed", category: "ad", state: "play" },
    offline: { name: "Video Playback Interrupted", category: "playback" },
    unload: { name: "Video Playback Interrupted", category: "playback" }
  },
  properties: {
    all: (_all = {
      session_id: "#{segment_session}",
      position: 0,
      total_length: "#{media.isLive ? 86400 : parseInt(media.duration) }",
      video_content_type: "#{media.isLive ? 'live' : 'vod'}",
      video_ad_supported: "#{segment_has_ads}",
      video_is_livestream: "#{media.isLive}",
      video_asset_title: "#{media.title}",
      video_asset_id: "#{media.guid}",
      video_content_length: "#{media.isLive ? 86400 : parseInt(media.duration) }"
    }, babelHelpers.defineProperty(_all, "video_content_type", "#{media.isLive ? 'live' : 'vod'}"), babelHelpers.defineProperty(_all, "video_is_autoplay", "#{segment_autoplay}"), babelHelpers.defineProperty(_all, "video_is_fullscreen", "#{segment_fullscreen}"), babelHelpers.defineProperty(_all, "video_is_livestream", "#{media.isLive}"), babelHelpers.defineProperty(_all, "video_volume", "#{segment_volume}"), _all),
    playback: {
      ad_enabled: "#{segment_has_ads}",
      video_player: "#{akamai.amp.AMP.VERSION}",
      livestream: "#{media.isLive}",
      sound: "#{segment_volume}",
      full_screen: false

    },
    content: {
      asset_id: "#{media.guid}",
      pod_id: "#{segment_ad_pod}",
      livestream: "#{media.isLive}"
    },
    ad: {
      asset_id: "#{ad.id}",
      video_ad_length: "#{ad.duration}",
      title: "#{ad.title}",
      pod_id: "#{ad.id}",
      pod_position: "#{ad.position}",
      pod_length: "#{ad.duration}",
      video_ad_pod_type: "#{segment_ad_type}",
      video_ad_pod_id: "#{ad.id}",
      video_ad_pod_name: "#{ad.metadata.getTitle()}",
      video_ad_pod_position: "#{ad.position}",
      ad_type: "#{segment_ad_type}",
      type: "#{segment_ad_type}",
      video_ad_id: "#{ad.id}",
      video_ad_break_type: "#{segment_ad_type}",
      video_ad_break_name: "#{ad.metadata.getTitle()}",
      video_ad_break_position: "#{ad.position}"
    },
    custom: {
      content_asset_ids: null,
      content_pod_ids: null
    }
  },
  traits: {
    appsflyer_id: "no appsflyer id",
    mvpd: "no mvpd",
    network_entitlement_list: "no entitlements",
    lastAnonymousProfileId: "#{segment_anonymous_id}"
  }
};

var Segment = function (_akamai$amp$Plugin) {
  babelHelpers.inherits(Segment, _akamai$amp$Plugin);

  function Segment(player, config) {
    babelHelpers.classCallCheck(this, Segment);

    var _this = babelHelpers.possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this, player, config));

    _this.player = player;
    _this.currentTime = 0;
    _this.isAdPlaying = false;
    _this.plugin = analytics || window.analytics;
    _this.Events = defaults.events;
    _this.pod = 1;

    _this.plugin.debug(config.debug || false);
    return _this;
  }

  babelHelpers.createClass(Segment, [{
    key: "onready",
    value: function onready() {
      var player = this.player;

      if (!this.plugin) {
        this.logger.log("[AMP Segment Error] Analytics object could not be found, please make sure to add analytics.js");
        return;
      }

      player.addEventListener("autoplayblocked", this.onautoplayblocked.bind(this));
      player.addEventListener("adstarted", this.onadstarted.bind(this));
      player.addEventListener("adended", this.onadended.bind(this));
      player.addEventListener("adtimeupdate", this.onadtimeupdate.bind(this));
      player.addEventListener("adbreakend", this.onadbreakend.bind(this));
      player.addEventListener("adbreakstart", this.onadbreakstart.bind(this));
      player.addEventListener("adpause", this.onadpause.bind(this));
      player.addEventListener("adresume", this.onadresume.bind(this));
      player.addEventListener("adfirstquartile", this.onadquartile.bind(this));
      player.addEventListener("admidpoint", this.onadquartile.bind(this));
      player.addEventListener("adthirdquartile", this.onadquartile.bind(this));

      if (player.ais) {
        amp.addEventListener(akamai.amp.AuthEvents.AUTHENTICATED, this.onauthenticated.bind(this));
      }
      if (this.plugin.user) {
        this.setSessionId(this.plugin.user().anonymousId());
      }

      window.addEventListener("offline", this.onplaybackinterrupted.bind(this));
      window.addEventListener("unload", this.onplaybackinterrupted.bind(this));
    }
  }, {
    key: "onmediachange",
    value: function onmediachange() {
      var player = this.player;

      this.setPlayerParams({
        segment_session: this.getSessionId(),
        segment_has_ads: player.ads.enabled,
        segment_adquartile: 1,
        segment_autoplay: player.autoplay,
        segment_fullscreen: "normal" !== player.displayState,
        segment_volume: parseInt(player.volume * 100),
        segment_ad_type: "no ad type",
        segment_ad_pod: this.pod,
        segment_anonymous_id: this.anonymousId()
      });
    }

    /**
     * @param {*} event 
     * @description Fired once on video player load, at first frame of playback of either content or ads
     */

  }, {
    key: "onmediasequencestarted",
    value: function onmediasequencestarted(event) {
      var contentPodIds = this.data.custom ? this.data.custom.content_pod_ids : defaults.properties.custom.content_pod_ids;
      var contentAssetIds = this.data.custom ? this.data.custom.content_asset_ids : defaults.properties.custom.content_asset_ids;
      var props = {};

      if (contentPodIds || contentAssetIds) {
        props = {
          content_asset_ids: contentAssetIds,
          content_pod_ids: contentPodIds
        };
      }

      this.track(event.type, props);
    }

    /**
     * @description Fired when a video completes
     * @param {*} event 
     */

  }, {
    key: "onmediasequenceended",
    value: function onmediasequenceended(event) {
      this.track(event.type);
      if (this.intervalID) clearInterval(this.intervalID);
    }

    /**
     * @description Fired once at first frame of content playback, 0:00 mark of content timeline
     * @param {*} event 
     */

  }, {
    key: "onstarted",
    value: function onstarted(event) {
      this.track(event.type);
    }

    /**
     * @description Identify when Ad Break boundary starts. This includes TrueX ads in which the ad break starts when the engagement choice card appears.
     * When the video content starts playing.Note: This should trigger for each content segment. For instance, if a show contains a midroll, this event should trigger for the content segment starting before midroll and content segment starting after midroll.
     * @param {*} event 
     */

  }, {
    key: "onadbreakend",
    value: function onadbreakend(event) {
      var data = event.data;

      this.track(event.type);

      if ("midroll" == data.type) {
        this.track("started");
      }
    }

    /**
     * @description Identify when the Ad Break boundary ends.
     * This should be triggered for each content segment. For instance, if a show contains a midroll, this event should trigger for the content segment starting before midroll and content segment starting after midroll.
     * @param {*} event 
     */

  }, {
    key: "onadbreakstart",
    value: function onadbreakstart(event) {
      var data = event.data;
      var player = this.player;
      var type = event.type;

      player.ads.once("loaded", function (event) {
        this.setPlayerParams({
          segment_ad_type: Segment.AD_TYPE[event.data.type],
          segment_ad_pod: player.media.isLive ? this.pod++ : this.pod
        });
        this.track(type);
      }.bind(this));

      player.ads.once("error", function (event) {
        this.track(type);
      }.bind(this));

      if ("midroll" == data.type) {
        this.track("ended");
      }
    }

    /**
     * @description Fired once upon reaching the 100% mark of the video timeline
     * @param {*} event 
     */

  }, {
    key: "onended",
    value: function onended(event) {
      var props = { video_seconds_viewed: (this.player.currentTime % 10).toFixed() };

      this.track(event.type, props);
    }

    /**
     * @description Fired when a video starts/finishes buffering
     * @param {*} event 
     */

  }, {
    key: "onbufferingchange",
    value: function onbufferingchange(event) {
      var data = event.data;

      this.track(data ? "onbufferstarted" : "onbuffercompleted");
    }

    /**
     * @description Fired once when content playback is paused by user
     * @param {*} event 
     */

  }, {
    key: "onpaused",
    value: function onpaused(event) {
      this.track(event.type);
    }

    /**
     * @description Fired once when content playback begins at a mark other than 0:00
     * @param {*} event 
     */

  }, {
    key: "onresume",
    value: function onresume(event) {
      this.track(event.type);
    }

    /**
     * @description Fired once every 10 seconds during content playback.  Keeps accurate timestamps to within 10 seconds to derive granular seconds watched count
     * @param {*} event 
     */

  }, {
    key: "onplaying",
    value: function onplaying(event) {
      var _this2 = this;

      var target = this.player.ads;
      var player = this.player;
      var props = { video_seconds_viewed: 10 };
      var cues = player.getCues();

      if (this.intervalID) clearInterval(this.intervalID);
      this.intervalID = setInterval(function () {
        var isPaused = player.paused;
        var isBuffering = player.buffering;
        var busy = player.busy;
        var currentTime = player.currentTime || 0;

        if (cues.length > 0) {
          for (var key in cues) {
            if (cues.hasOwnProperty(key)) {
              var cue = cues[key];
              if (cue.startTime >= 0 && currentTime >= cue.startTime) {
                _this2.pod = parseInt(key) + 1;
                _this2.setPlayerParams({ segment_ad_pod: _this2.pod });
              }
            }
          }
        }

        if (!(target != undefined && target.getInProgress() || isPaused || isBuffering || busy)) {
          _this2.track(event.type, props);
        }
      }, 10000);
    }

    /**
     * @description When a user manually seeks a certain position of the content (main) or ad in the playback.
     * @param {*} event 
     */

  }, {
    key: "onseeking",
    value: function onseeking(event) {
      var eventName = event.type;
      var currentTime = this.player.currentTime || 0;

      this.player.once("canplaythrough", function () {
        var props = { position: parseInt(currentTime), seek_position: parseInt(this.player.currentTime) };
        this.track(eventName, props);
      }.bind(this));
    }

    /**
     * @description When a user manually (and successfully) seeks a certain position of the content (main) or ad in the playback.				
     * @param {*} event 
     */

  }, {
    key: "onseeked",
    value: function onseeked(event) {
      var props = { position: parseInt(this.player.currentTime) };
      this.track(event.type, props);
    }

    /**
     * @description Fired once at first frame of each video ad impression
     * @param {*} event 
     */

  }, {
    key: "onadstarted",
    value: function onadstarted(event) {
      this.isAdPlaying = true;
      this.currentTime = 0;
      this.track(event.type);
    }

    /**
     * @description Fired once at last frame of each video ad impression
     * @param {*} event 
     */

  }, {
    key: "onadended",
    value: function onadended(event) {
      this.isAdPlaying = false;
      this.track(event.type);
    }

    /**
     * @description Fired once every 1 seconds during ad playback.  Keeps accurate timestamps to within 1 second to derive granular seconds watched count
     * Note: When this event triggers on 1 second intervals, pass the value '1' for this property aka video_seconds_viewed.
     * @param {*} event 
     */

  }, {
    key: "onadtimeupdate",
    value: function onadtimeupdate(event) {
      var currentTime = Math.floor(event.detail);
      var props = { quartile: "#{segment_adquartile}", video_seconds_viewed: 1 };

      if (this.currentTime !== currentTime && this.isAdPlaying) {
        this.currentTime = currentTime;
        this.track(event.type, props);
      }
    }
    /**
     * @description When user pauses during ad playback. This should also be called if app is backgrounded during ad playback. On mobile devices, this should be called whenever ad playback is interrupted because user hits the home button, or user accepts a phone call, or any other instance that interrupts ad playback and the app is hidden to the background.  
     * @param {*} event 
     */

  }, {
    key: "onadpause",
    value: function onadpause(event) {
      this.track(event.type);
    }

    /**
     * @description When user resumes ad playback from an ad paused state.				
     * @param {*} event 
     */

  }, {
    key: "onadresume",
    value: function onadresume(event) {
      if (!this.isAdPlaying) return;

      this.track(event.type);
    }
  }, {
    key: "onplaybackinterrupted",
    value: function onplaybackinterrupted(event) {
      var props = { method: event.type };

      this.track(event.type, props);
    }
  }, {
    key: "onadquartile",
    value: function onadquartile(event) {
      var QUARTILE = { adfirstquartile: 1, admidpoint: 2, adthirdquartile: 3 };
      var value = QUARTILE[event.type];

      this.setPlayerParams({ segment_adquartile: value });
    }
  }, {
    key: "onfullscreenchange",
    value: function onfullscreenchange(event) {
      this.setPlayerParams({ segment_fullscreen: event.data });
    }
  }, {
    key: "onvolumechange",
    value: function onvolumechange(event) {
      this.setPlayerParams({ segment_volume: parseInt(event.data * 100) });
    }
  }, {
    key: "onautoplayblocked",
    value: function onautoplayblocked(event) {
      var policy = event.data.policy;

      if (akamai.amp.AutoplayPolicy.MUTED === policy || akamai.amp.AutoplayPolicy.MUTED_INLINE === policy) {
        return;
      }

      this.setPlayerParams({
        segment_autoplay: false
      });
    }

    /*Listener for AIS MVPD data*/

  }, {
    key: "onauthenticated",
    value: function onauthenticated(event) {
      var idps = event.detail;
      this.mvpd = idps;
    }

    /**
     * Private
     */

  }, {
    key: "track",
    value: function track(event, overrides) {
      if (!this.plugin) return;

      var properties = this.generateProperties(event, overrides);
      var traits = this.generateTraits();

      this.logger.log("[AMP Segment Track]", this.Events[event].name, properties);
      this.plugin.track(this.Events[event].name, properties, { context: { traits: traits } });
    }
  }, {
    key: "setSessionId",
    value: function setSessionId(id) {
      this.sessionId = id;

      if (!this.anonymousId()) {
        this.anonymousId(id);
      }
    }
  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return this.sessionId;
    }
  }, {
    key: "generateProperties",
    value: function generateProperties(event, overrides) {
      var player = this.player;
      var segmentEvent = this.Events[event];
      var main = Object.assign({}, defaults.properties.all, this.data.properties.all);
      var properties = akamai.amp.Utils.override(defaults.properties[segmentEvent.category], this.data.properties[segmentEvent.category]);
      var absoluteTime = player.getAbsoluteCurrentTime();

      main['position'] = this.player.ads.inProgress ? this.currentTime : player.isLive && absoluteTime ? (absoluteTime + -30).toFixed() : player.currentTime ? parseInt(player.currentTime) : 0;

      if (segmentEvent.hasOwnProperty('state')) {
        main['video_player_state'] = segmentEvent.state;
      }

      var data = Object.assign({}, main, properties, overrides);

      return this.player.evaluateBindings(data);
    }
  }, {
    key: "generateTraits",
    value: function generateTraits() {
      var traits = this.data.traits || {};

      for (var key in defaults.traits) {
        if (!traits.hasOwnProperty(key)) {
          traits[key] = defaults.traits[key];
        }
      }

      if (this.mvpd) {
        traits.mvpd = this.mvpd.display_name;
      }

      return this.player.evaluateBindings(traits);
    }
  }, {
    key: "anonymousId",
    value: function anonymousId(value) {
      try {
        if (value) {
          localStorage.setItem("anonymousId", value);
        }

        return localStorage.getItem("anonymousId");
      } catch (error) {
        this.logger.log("[AMP Segment Error] Cannot use local storage", error);
      }
    }
  }, {
    key: "setPlayerParams",
    value: function setPlayerParams(data) {
      var params = this.player.getParams();
      var override = Object.assign({}, params, data);

      if (override) {
        this.player.setParams(override);
      }
    }
  }], [{
    key: "AD_TYPE",
    get: function get() {
      return {
        preroll: "pre-roll",
        midroll: "mid-roll",
        postroll: "post-roll"
      };
    }
  }]);
  return Segment;
}(akamai.amp.Plugin);

akamai.amp.AMP.registerPlugin("segment", typeof akamai.amp.Plugin.createFactory == 'function' ? akamai.amp.Plugin.createFactory(Segment) : Segment.factory);

exports.Segment = Segment;

}((this.akamai.amp.segment = this.akamai.amp.segment || {})));
//# sourceMappingURL=Segment.js.map
