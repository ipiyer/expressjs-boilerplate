var express = require('express');
var http = require('http');
var path = require('path');

PROJDIR = __dirname;

var app = module.exports = express();

app.configure(function(){
    app.set('view engine', 'jade');
    app.set("views", path.join(PROJDIR,"templates"));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    var media = path.join(PROJDIR, 'media');
    app.use(express.static(media));
    app.get(/\/js/, express.static(path.join(media,'js')));
    app.get(/\/css/, express.static(path.join(media,'css')));
    app.get(/\/images/, express.static(path.join(media,'images')));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    // Example 500 page
    app.use(function(err, req, res, next){
        console.log(err);
        res.status(500);
        res.render('500.jade', {"error": err, "status":500});
    });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var INSTALLED_APPS = ['./hello']


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


http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
