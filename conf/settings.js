
module.exports = function(app, express) {
    
    var envSettings = [];

    if (process.env.NODE_ENV === 'prod') {
        envSettings.push('prod');
        console.log("Loading prod env settings.");
    }else{
        envSettings.push('dev');
        console.log("Loading dev env settings.");
    }

    envSettings.forEach(function(i){
        app.configure(i, function(){
            require("./"+i+".js")(app, express);
        })
    });

    app.set('view engine', 'jade');
    app.set("views", PROJDIR + "/templates");
};
