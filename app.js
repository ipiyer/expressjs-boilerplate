/**
 * Module dependencies.
 */

var express = require('express')

var app;
PROJDIR = __dirname;

var INSTALLED_APPS = ['./hello']

exports.init = function(){
    app = module.exports = express.createServer();

    /*
     * Import settings
     */
    require(PROJDIR + '/conf/settings.js')(app, express);
    
    /*
     * Import URL dispatcher
     */

    INSTALLED_APPS.forEach(function(i){
        require(i + "/urls.js")(app);
    });

    
    // Example 500 page
    app.error(function(err, req, res){
        res.render('500.jade', {"layout": false, "status": 500,
                                "locals" : {"error": err}});
    });
    
    // Example 404 page via simple Connect middleware
    app.use(function(req, res){
        res.render('404.jade', {"layout" : false, "status": 404});
    });
    
    return app;
}

if (!module.parent) {
    exports.init().listen(3000);
    console.log("Express server %s listening on port %d", express.version, app.address().port)
}
