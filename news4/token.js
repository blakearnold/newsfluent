Modulr.define('myfox:components/token', [
    'require',
    'jwt-decode',
    'components/helper'
], function(require){
  var Helper = require('components/helper');

  var Token = function(){
  };

  Token.prototype = {
    parse: function(token){
      return jwt_decode(token);
    },
    verifySignature: function(){
      var token = Store.getToken();
      if( typeof token.uid === 'undefined' ){
        return false;
      }
      var publicKey = Auth.getPublicKey(function(success, response){
        if(success){
          var cert = response.publickey;
          // var date = KJUR.jws.IntDate;
          // KEYUTIL.getKey(cert);
          //verify RSA
          //be explicit about algorithm or it can be hacked
          //return payload
        }
        else{
          return false;
        }
      });
    }
  };

  return ( new Token() );
});