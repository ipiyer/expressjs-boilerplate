var express = require('express');
var http = require('http');
var path = require('path');

PROJDIR = __dirname;

var app = module.exports = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.set('view engine', 'jade');
    app.set("views", path.join(PROJDIR, "templates"));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    var static = path.join(PROJDIR, 'static');
    app.use(express.static(static));
    app.get(/\/js/, express.static(path.join(static,'js')));
    app.get(/\/css/, express.static(path.join(static,'css')));
    app.get(/\/images/, express.static(path.join(static,'images')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
    app.use(function(err, req, res, next){
        console.log(err);
        res.status(500);
        res.render('500.jade', {"error": err, "status":500});
    });
});

var INSTALLED_APPS = ['./hello'];


// Import URL dispatcher
 
INSTALLED_APPS.forEach(function(i){
    require(i + "/urls.js")(app);
});

// Import settings

require(PROJDIR + '/conf/settings.js')(app, express);

// Example 404 page via simple Connect middleware
app.all('*', function(req, res){
    res.status(404);
    res.render('404.jade');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
