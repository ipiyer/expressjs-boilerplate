module.exports = function(app, express) {
    app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
};
