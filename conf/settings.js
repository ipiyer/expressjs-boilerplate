module.exports = function(app, express) {

    app.configure("development", function(){
        app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
    });
    
    app.configure("production", function(){
        app.use(express.errorHandler());
    });

    app.set('view engine', 'jade');
    app.set("views", PROJDIR + "/templates");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(PROJDIR + '/media'));
    app.get(/\/js/, express.static(PROJDIR+'/media/js'));
    app.get(/\/js/, express.static(PROJDIR + 'media/js/'));
    app.get(/\/css/, express.static(PROJDIR + 'media/css'));
    app.get(/\/images/, express.static(PROJDIR + 'media/images'));
};
