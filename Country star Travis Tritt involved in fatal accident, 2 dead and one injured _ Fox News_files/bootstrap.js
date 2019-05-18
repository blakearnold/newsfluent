var CONFIG;
var cacheBuster = '201811126725';
(function(){
    $.get('/js/app/config/config.json?cb='+cacheBuster, function(response) {
      if( response ) {
        CONFIG = response;
        console.log('config:loaded');
        $(document).trigger('config:loaded');
      }
      else{
        window.location = '/error.html?e=404.config';
      }
    });

    $(document).on('config:loaded', function(){
      var path = window.location.pathname.split('/').reverse().slice(1).reverse().join('/'),
          domain = window.location.origin;

      var myfox = Modulr.config({
          instance: 'myfox',
          path: path,
          baseDomain: domain,
          baseUrl: path + '/js/app',
          cacheParam: 'cb',
          shim: {
              'jquery.validation': {
                  src: '//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js',
                  exports: 'jQuery.validator',
                  noCacheString: true
              },
              'mustache': {
                  src: '//cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js',
                  exports: 'Mustache',
                  noCacheString: true
              },
              'jwt-decode': {
                  src: '/js/app/vendor/jwt-decode.min.js',
                  exports: 'jwt_decode',
                  noCacheString: true
              },
              'js-cookie': {
                  src: 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js',
                  exports: 'Cookies',
                  noCacheString: 'true'
              }
              // 'jrsasign': {
              //     src: 'https://kjur.github.io/jsrsasign/jsrsasign-latest-all-min.js',
              //     exports: 'jwt_decode',
              //     noCacheString: true
              // }

          }
      });
      Modulr.setGlobalCacheParam(CONFIG.CACHE_KEY);
      myfox.require(['app']);
      return (myfox);
    });
}());
