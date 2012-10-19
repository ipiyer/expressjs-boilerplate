exports.hello = function(req, res, next){
    console.log('Hello World');
    res.render('hello/index.jade',
               { title: 'Express' });
}

