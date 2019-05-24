Modulr.define('myfox:components/request', [
    'require'
], function(require){

    var Request = function () {

    };

    Request.prototype = {

      constructor: Request,

      get: function(url, callback, data, headers) {
        this.request('get', url, {}, callback, headers);
      },

      post: function(url, data, callback, headers) {
        this.request('post', url, data, callback, headers);
      },

      put: function(url, data, callback, headers) {
        this.request('put', url, data, callback, headers);
      },

      delete: function(url, data, callback, headers) {
        this.request('delete', url, data, callback, headers);
      },

      request: function(method, url, data, callback, headers) {
        var config = {
          url: url,
          data: data,
          method: method,
          headers: headers
        };
        $.ajax(config)
        .done(function(response){
          if(typeof callback === 'function'){
            callback(true, {status: 200, message: response});
          }
        })
        .fail(function(jqXHR, textStatus){
          if(typeof callback === 'function'){
            callback(false, {status:jqXHR.status, message:jqXHR.responseJSON.message, response: jqXHR});
          }
        });
      }

    };

    return ( new Request() );
});