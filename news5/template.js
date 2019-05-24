Modulr.define('myfox:components/template', [
    'require',
    'components/request',
    'mustache',
    'components/helper'
], function(require){
    var Request = require('components/request'),
      Mustache = require('mustache'),
      Helper = require('components/helper');
    var Template = function() {
      this.partials = [
        'create-success',
        'complete-account',
        'create',
        'login',
        'logout',
        'forgot-password',
        'password-reset',
        'account',
        'loading',
        'delete',
        'verify-account'
      ];
    };
    Template.prototype = {
      get: function(partial, callback) {
        this.partial = partial;
        if( $.inArray( partial, this.partials ) > -1 ){
          var _this = this;
          Request.get(this.getPartialPath(partial), function(success, response) {
            _this.template = response.message;
            callback(success, _this);
          });
        }
      },
      render: function (args, callback) {
        this.html = Mustache.render(this.template, args);
        callback(this);
      },
      inject: function ( callback ) {
        var content = $('.main-content');
        $('.main-content').html(this.html);
        $(document).trigger('template:injected');
        $(document).trigger('template:injected:' + this.partial);
      },
      getPartialPath : function (partial) {
        return Helper.addCacheBuster('/partials/' + partial + '.html');
      },
      getRenderInject: function (partial, args, callback) {
        this.get(partial, function(success, _this){
          if(success){
            _this.render(args, function(_this){
              _this.inject();
            });
          }
          else{
            console.log('Could not retrieve template: ' + partial);
          }
        });
      }
    };
    return (new Template());
});
