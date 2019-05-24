Modulr.define('myfox:components/auth', [
    'require',
    'components/request',
    'components/store'
], function(require, $){

    var Request = require('components/request'),
    Store = require('components/store');
    var API = function () {
      this.url = CONFIG.API_HOST;
      this.key = CONFIG.API_KEY;
      this.version = CONFIG.API_VERSION;
    };

    API.prototype = {

      constructor: API,

      login: function(input, callback) {
        Request.post(this.endpoint('login'), this.data(input), callback, this.headers('login'));
      },

      logout: function(callback) {
        Request.get(this.endpoint('logout'), callback, {}, this.headers('logout'));
      },

      getUser: function(callback) {
        Request.get(this.endpoint('update/' + Store.getID() ), callback, {}, this.headers('update:id'));
      },

      sendPasswordReset: function(input, callback) {
        Request.post(this.endpoint('reset'), this.data(input), callback, this.headers('reset'));
      },

      resetPassword: function(input, callback) {
        Request.post(this.endpoint('reset-password'), this.data(input), callback, this.headers('reset-password'));
      },

      register: function(input, callback) {
        Request.post(this.endpoint('register'), this.data(input), callback, this.headers('register'));
      },

      updateAccount: function(input, callback) {
        Request.put(this.endpoint('update/' + Store.getID()), this.data(input), callback, this.headers('update:id'));
      },

      deleteAccount: function(callback) {
        Request.delete(this.endpoint('update/' + Store.getID()), null, callback, this.headers('update:id'));
      },

      getPublicKey: function(callback) {
        Request.get(this.endpoint('publickey/' + Store.getID() ), callback, {}, this.headers('publickey'));
      },

      sendVerificationEmail: function(callback) {
        Request.post(this.endpoint('email/send'), this.data({}), callback, this.headers('email'));
      },

      confirmVerificationEmail: function(input, callback) {
        Request.post(this.endpoint('email/confirm'), this.data(input), callback, this.headers('email'));
      },

      endpoint: function(method){
        return this.url + '/' + this.version + '/' + method;
      },

      headers: function(endpoint, method) {
        var headers = {
          'x-api-key': this.key,
          'content-type': 'application/json'
        };

        var noCacheEndpoints = ['login', 'reset', 'logout', 'update:id', 'register', 'reset-password', 'email'];
        if(jQuery.inArray(endpoint, noCacheEndpoints) === -1){
          headers['cache-control'] = 'no-cache';
        }

        var nonAuthEndpoints = ['login', 'register', 'reset-password', 'publikey'];
        if(jQuery.inArray(endpoint, nonAuthEndpoints) === -1){
          headers['authorization'] = 'Bearer ' + Store.getToken();
        }

        return headers;
      },

      data: function(input){
        return JSON.stringify(input);
      },

      isLoggedIn: function() {
        return !! Store.getToken();
      },
      verifyToken: function() {

      }

    };
    return ( new API() );
});