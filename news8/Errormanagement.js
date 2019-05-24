(function (exports) {
'use strict';

var ErrorManagement$1 = function (_akamai$amp$Plugin) {
  babelHelpers.inherits(ErrorManagement, _akamai$amp$Plugin);

  function ErrorManagement(player, config) {
    babelHelpers.classCallCheck(this, ErrorManagement);

    var _this = babelHelpers.possibleConstructorReturn(this, (ErrorManagement.__proto__ || Object.getPrototypeOf(ErrorManagement)).call(this, player, config));

    var _ref = void 0;

    _this.defaults = {
      MSG_MEDIA_ERR_ABORTED: "Sorry, something went wrong. Please refresh your browser <p>If problems persist please seek help <a target='_blank' href='http://help.foxnews.com'>here</a></p>",
      MSG_MEDIA_ERR_NETWORK: "Sorry, something went wrong. Please refresh your browser <p>If problems persist please seek help <a target='_blank' href='http://help.foxnews.com'>here</a></p>",
      MSG_MEDIA_ERR_DECODE: "Sorry, something went wrong. Please refresh your browser <p>If problems persist please seek help <a target='_blank' href='http://help.foxnews.com'>here</a></p>",
      MSG_MEDIA_ERR_SRC_NOT_SUPPORTED: "Sorry, something went wrong. Please refresh your browser <p>If problems persist please seek help <a target='_blank' href='http://help.foxnews.com'>here</a></p>",
      MSG_AMP_GENERIC_ERROR: "Sorry but the video you're trying to play can not be found <p>If problems persist please seek help <a target='_blank' href='http://help.foxnews.com'>here</a></p>",
      MSG_MEDIA_ERR_LIVE: "This live stream has ended <p>Thanks for watching Fox News</p>"
    };
    _this.element = player.container;
    _this.logger = (_ref = akamai.amp.Logger.instance) != null ? _ref : { warn: function warn(msg, evt) {
        console.log(msg, evt);
      } }; // check if AMP looger is defined, if not then we create a custom logger, in other case when in case AMP logger has been defined 
    _this.logo = config.data.logo ? player.evaluatePaths(config.data.logo) : null;
    _this.locales = akamai.amp.Utils.override(_this.defaults, _this.player.l10n);
    _this.site = config.data.site ? config.data.site : "default";
    _this.recovery = (_ref = config.recovery) != null ? _ref.enabled : false;
    return _this;
  }

  babelHelpers.createClass(ErrorManagement, [{
    key: "onready",
    value: function onready(event) {
      this.player.addEventListener("error", this.errorHandler.bind(this));
    }
  }, {
    key: "errorHandler",
    value: function errorHandler(error) {
      var overlay = this.element.getElementsByClassName('amp-error-msg')[0];

      if (!this.player.react) {
        overlay = this.element.getElementsByClassName('akamai-error akamai-layer')[0];
      }

      this.displayError(error.data, overlay, this.player);
      this.dispatchError(typeof error.data.type !== 'undefined' ? error.data.type : error.data.message);
    }
  }, {
    key: "displayError",
    value: function displayError(error, element, player) {
      var HTML_ERROR = "<div class=\"akamai-error-message custom-error\"><div class=\"akamai-error-logo\"><img src=\"{logo}\"></div>{txt}<p class=\"akamai-error-code\">Error:{code}</p></div>";
      var _msg = void 0,
          _code = void 0,
          errorElement = "";
      var _isLive = this.player.media != null ? this.player.media.isLive : this.player.media.temporalType == "live";
      var _guid = this.player.media != null ? this.player.media.guid : '0';
      var _slate = false;

      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          _msg = this.locales.MSG_MEDIA_ERR_ABORTED;_code = error.code;break;
        case MediaError.MEDIA_ERR_NETWORK:
          _msg = !_isLive ? this.locales.MSG_MEDIA_ERR_NETWORK : -1 < ['1241186546001', '1251429410001', '5270285051001', '5270285052001', '5640669329001', '5614615980001', '5614626175001'].indexOf(_guid) ? this.locales.MSG_MEDIA_ERR_NETWORK : this.locales.MSG_MEDIA_ERR_LIVE;
          _code = error.code;_slate = _msg === this.locales.MSG_MEDIA_ERR_LIVE;break;
        case MediaError.MEDIA_ERR_DECODE:
          _msg = this.locales.MSG_MEDIA_ERR_DECODE;_code = error.code;break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          _msg = this.locales.MSG_MEDIA_ERR_SRC_NOT_SUPPORTED;_code = error.code;break;
        default:
          _msg = this.locales.MSG_AMP_GENERIC_ERROR;_code = 5;
      }
      errorElement += HTML_ERROR.replace('{txt}', _msg);errorElement = errorElement.replace('{code}', _code);
      element.innerHTML = errorElement.replace('{logo}', this.logo);

      if (_slate) {
        element.classList.add("state-live");
        element.classList.add("slate-" + this.site);
        if (this.recovery) {
          this.initRecovery();
        }
      } else {
        element.classList.remove("state-live");
      }
    }
  }, {
    key: "dispatchError",
    value: function dispatchError() {
      var errorCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'media.playback.error';

      this.logger.warn("[AMP ERROR FOUND] ", errorCode);
      if (typeof akamaiHandleError === 'function') {
        akamaiHandleError(errorCode);
      }
    }
  }, {
    key: "initRecovery",
    value: function initRecovery() {
      var interval = this.recovery.interval || 10;
      var intervalId = window.setInterval(function () {
        this.checkStreamStatus().then(function (response) {
          clearInterval(intervalId);
          this.player.replay();
        }.bind(this)).catch(function (Error) {
          console.log(Error);
        });
      }.bind(this), interval * 1000);
    }
  }, {
    key: "checkStreamStatus",
    value: function checkStreamStatus() {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('GET', this.player.src);
        request.responseType = 'blob';
        request.onload = function () {
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(Error("[AMP ERROR] Stream is offline, preparing for recovery, stream status: " + request.statusText));
          }
        };
        request.onerror = function () {
          reject(Error('There was a network error.'));
        };

        request.send();
      }.bind(this));
    }
  }]);
  return ErrorManagement;
}(akamai.amp.Plugin);

akamai.amp.AMP.registerPlugin("errormanagement", typeof akamai.amp.Plugin.createFactory == 'function' ? akamai.amp.Plugin.createFactory(ErrorManagement$1) : ErrorManagement$1.factory);

exports.ErrorManagement = ErrorManagement$1;

}({}));
//# sourceMappingURL=Errormanagement.js.map
