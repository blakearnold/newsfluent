Modulr.define('myfox:components/helper', [
    'require'
], function(require){
    var Helper = function() {};
    Helper.prototype.execModules = function(modules) {
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i];
            if (typeof module === 'object' && typeof module.init === 'function') {
                module.init();
            } else if (typeof module === 'function') {
                module();
            }
        }
    };

    Helper.prototype.getQueryVars = function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
          vars[hash[0]] = this.sanitize(hash[1]);
        }
        return vars;
    };

    Helper.prototype.sanitize = function(val){
      return $('<div/>').text(val).html();
    };

    Helper.prototype.decodeHTML = function(val){
      return $('<textarea/>').html(val).val();
    };

    Helper.prototype.input = function(name) {
      return this.sanitize($("[name=" + name + "]").val());
    };

    Helper.prototype.checked = function(name) {
      return $("[name=" + name + "]").is(':checked');
    };

    Helper.prototype.isUnderage = function() {
      var birthday = this.formatBirthday(this.input('day'), this.input('month'), this.input('year'));
      var age = this.getAgeFromDate(birthday);
      return age < 13;
    };

    Helper.prototype.formatBirthday = function(day, month, year){
      return year + '-' + month + '-' + day;
    };

    Helper.prototype.parseBirthday = function(birthday){
      var parts = birthday.split('T')[0].split('-');
      return {year:parts[0], month:parts[1], day:parts[2]};
    };

    Helper.prototype.getAgeFromDate = function(date){
      var today = new Date();
      var birthDate = new Date(date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age = age - 1;
      }
      return age;
    };

    Helper.prototype.disableButton = function(button, text){
      button.attr('disabled', 'disabled').fadeTo('fast', 0.5).text(text);
    };

    Helper.prototype.enableButton = function(button, text){
      button.removeAttr('disabled').fadeTo('fast', 1).text(text);
    };

    Helper.prototype.redirectTo = function(route){
      window.location = route ? '/?p=' + route : '/';
    };

    Helper.prototype.validateForm = function(callback, rules, messages){
      return {
        wrapper: 'div',
        errorElement: 'span',
        errorPlacement: function(error, element){
          error.addClass('message message-error');
          element.parent().after(error);
        },
        debug: true, //keep this in place as we use redirect
        submitHandler: function(form) {
          callback(form);
          return false;
        }
      };
    };

    Helper.prototype.addCacheBuster = function(url){
      var cb = typeof CONFIG !== 'undefined' && typeof CONFIG.CACHE_KEY !== 'undefined' ? CONFIG.CACHE_KEY : false;
      var separator = url.indexOf('?') > -1 ? '&' : '?';
      return cb ? url + separator + 'cb=' + cb : url;
    };
    return (new Helper());
});
