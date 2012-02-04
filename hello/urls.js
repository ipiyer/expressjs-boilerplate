var views = require('./views.js')

module.exports = function(app){
    app.all(/\/hello/ , views.hello);
}
