Modulr.define('myfox:components/store', [
    'require',
    'jwt-decode',
    'js-cookie',
    'components/token'
], function(require){
    var Token = require('components/token'),
    Cookies = require('js-cookie');
    var Store = function() {
      this.ID = '_foxid';
      this.token = '_foxid_token';
      this.user = '_foxid_user';
      this.isSafari =
        !!navigator.userAgent.match(/safari/i) &&
        !navigator.userAgent.match(/chrome/i) &&
        typeof document.body.style.webkitFilter !== "undefined";
    };
    Store.prototype = {
      localStorageAvailable : function() {
          var res = true,
              testId = '__coretest_localStorage';

          if (typeof window.localStorage === 'object') {
              try {
                  window.localStorage.setItem(testId, 1);
                  window.localStorage.removeItem(testId);
              } catch (err) {
                  res = false;
              }
          }
          return res;
      },
      set: function(user){
        this.store(this.token, user.accessToken, user.tokenExpiration);
        var picture = user.picture ? user.picture : 'https://global.fncstatic.com/static/orion/styles/img/fox-news/auth0/auth0-default-profile-pic.png';
        var userInfo = {
          'https://foxnews.com/picture': picture,
          'https://foxnews.com/user_id': user.profileId,
          'https://foxnews.com/display_name': user.displayName,
          'https://foxnews.com/metadata': {
            picture: picture,
            account_active: user.isVerified,
            is_active: user.isVerified
          }
        };
        this.store(this.user, JSON.stringify(userInfo), user.tokenExpiration);
        $(document).trigger('store:set');
      },
      flush: function(){
        this.deleteToken();
        this.deleteUser();
      },
      getToken: function(){
        return this.retrieve(this.token);
      },
      deleteToken: function(){
        return this.remove(this.token);
      },
      getUser: function(){
        return JSON.parse(this.retrieve(this.user));
      },
      deleteUser: function(){
        return this.remove(this.user);
      },
      getID: function(){
        var token = Token.parse(this.getToken());
        return typeof token.uid !== 'undefined' ? token.uid : false;
      },
      setReferrer: function(){
        return this.store('accountReferrer', document.referrer);
      },
      getReferrer: function(){
        return this.retrieve('accountReferrer');
      },
      deleteReferrer: function(){
        return this.remove('accountReferrer');
      },
      store: function(key, value, expiry) {
        //@TODO Fix EXPIRY FORMAT
        return this.isSafari ? Cookies.set(key, value, expiry) : localStorage.setItem(key, value);
      },
      retrieve: function(key){
        return this.isSafari ? Cookies.get(key) : window.localStorage.getItem(key);
      },
      remove: function(key) {
        return this.isSafari ? Cookies.remove(key) : localStorage.removeItem(key);
      }
    };
    return (new Store());
});
