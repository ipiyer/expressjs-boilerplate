var express = require('express')

PROJDIR = __dirname;

var INSTALLED_APPS = ['./hello']

app = module.exports = express.createServer();

// Import URL dispatcher
 
// INSTALLED_APPS.forEach(function(i){
//     require(i + "/urls.js")(app);
// });

// Import settings

require(PROJDIR + '/conf/settings.js')(app, express);

// Example 500 page
app.error(function(err, req, res){
    res.render('500.jade', {"layout": false,
                            "status": 500,
                            "locals" : {"error": err}});
});

// Example 404 page via simple Connect middleware
app.all('*', function(req, res){
    res.render('404.jade', {"layout" : false, "status": 404});
});

app.listen(3000);
console.log("Express server %s listening on port %d", express.version, app.address().port)
