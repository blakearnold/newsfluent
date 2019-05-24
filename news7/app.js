Modulr.define('myfox:app', [
    'require',
    'components/helper'
], function(require){
    var Helper = require('components/helper');
    var MODULES_INIT = [
        'components/router'
    ];
    if (MODULES_INIT.length > 0) {
        require(MODULES_INIT, function(){
            var args = Array.prototype.slice.call(arguments);
            Helper.execModules(args);
        });
    }
});