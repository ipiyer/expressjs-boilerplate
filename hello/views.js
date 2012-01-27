exports.hello = function(req, res, next){
    console.log("Hello world");
    res.render('hello/index.jade',
               {layout: false, locals: { title: 'Express' }})
}

