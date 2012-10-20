var views = require('./views.js');

module.exports = function(app){
    app.get(/\/hello/ , views.hello);
}
