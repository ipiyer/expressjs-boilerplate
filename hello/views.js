exports.hello = function(req, res, next){
    conole.log('Hello World');
    res.render('hello/index.jade',
               { title: 'Express' })
}

