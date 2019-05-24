Modulr.define('myfox:components/router', [
    'require',
    'components/helper',
    'components/auth'
], function(require){
  var Helper = require('components/helper'),
  Auth = require('components/auth');
  var Router = function () {
    this.routeOverride = false;
    if( window.location.pathname === '/index.html' ) {
      Helper.redirectTo('');
    }

    if( window.location.pathname === '/xd-channel.html' ) {
      this.routeOverride = 'xd-channel';
    }
    this.pageVar = 'p';
    this.authRoutes = [
      'account'
    ];
    this.routes = [
      'login',
      'logout',
      'forgot-password',
      'password-reset',
      'account',
      'create-account',
      'create-success',
      'verify-account',
      'xd-channel'
    ];
    this.parseRoute();
  };

  Router.prototype = {
    constructor: Router,
    parseRoute : function () {
      this.vars = Helper.getQueryVars();
      this.page = this.vars.hasOwnProperty(this.pageVar) && $.inArray(this.vars[this.pageVar], this.routes) > -1 ? this.vars[this.pageVar] : 'login';
      this.initController();
    },
    initController : function() {
      if( $.inArray(this.page, this.authRoutes) > -1 && ! Auth.isLoggedIn() ) {
        Helper.redirectTo('');
      }
      else{
        var controller = this.routeOverride ? this.routeOverride : this.page;
        require(['controllers/' + controller]);
      }
    }
  };

  new Router();
});