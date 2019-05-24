Modulr.define('myfox:controllers/xd-channel', [
    'require',
    'components/template',
    'components/auth',
    'components/store',
    'components/helper'
], function(require){

    if(self === top){
      console.log('xd-channel: direct file access forbidden');
      return false;
    }

    var allowedOrigins = (function(){

        return function(val) {
          if (!val) { return false; }

          var res = false;
          var allowed = [
            /(.+)\.(foxnews|foxbusiness)\.com/i.test(val),
            /localhost/.test(val)
          ];

          for (var i = 0; i < allowed.length; i++) {
            if (allowed[i]) {
              res = true;
              break;
            }
          }

          return res;

        };

    })();

    var origin = $('<a>').attr('href', document.referrer).prop('hostname');
    if( (origin && !allowedOrigins(origin))){
      log('referrer ' + origin + ' not allowed');
      return false;
    }

    var Template = require('components/template'),
      Auth = require('components/auth'),
      Helper = require('components/helper'),
      Store = require('components/store');

    function bindEvent(el, name, cb){
      if (el.addEventListener) {
          el.addEventListener(name, cb, false);
      } else if (el.attachEvent) {
          el.attachEvent('on' + name, cb);
      }
    }
    function receiveData(event){

      if( typeof event.data === 'undefined' ){
        return false;
      }

      if(typeof event.data.type !== 'undefined' && event.data.type !== 'fnnBrokerRequest'){
        return false;
      }

      var eventOrigin = $('<a>').attr('href', event.origin).prop('hostname');
      if( allowedOrigins(eventOrigin)) {
        //log('receiveData', event.data);
        var qv = Helper.getQueryVars();
        if(event.data.name === 'silentLogin') {
          var authenticated = false;
          if(Auth.isLoggedIn()){
            log('loggedIn');
            authenticated = true;
          }
          var data = {
            authenticated: authenticated
          };
          if(authenticated){
            data['token']= Store.getToken();
            data['userInfo']= Store.getUser();
          }
          sendData(event.data.name, data);
        }
        else if( event.data.name === 'startLogin'){
          sendData(event.data.name, window.location.protocol + '//' + window.location.host);
        }
        else if(event.data.name === 'startLogout'){
          Auth.logout(function(success, response){
            Store.flush();
            sendData(even.data.name);
          });
        }
      }
    }

    function sendData(name, message){
      var originHost = $('<a>').attr('href', document.referrer).prop('hostname');
      var originProtocol = $('<a>').attr('href', document.referrer).prop('protocol');
      var data = {
        name: name,
        data: message,
        type: 'fnnBrokerResponse',
        origin: originProtocol + '//' + originHost //normalized for cross-check on broker
      };
      log('data.send', message, data, document.referrer);
      window.parent.postMessage(data, document.referrer); //referrer is validated above
    }

    function log() {
      var args = [].slice.call(arguments);
      var message = args.shift();
      var dump = args.length === 1 ? args.shift() : args.length === 0 ? '' : args;
      console.log('foxid-xd-channel: ' + message, dump);
    }

    bindEvent(window, 'message', receiveData);
    sendData('ready', {});
});
