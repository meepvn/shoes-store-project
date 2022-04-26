const customerRouter = require('./customer');

function initAPIRoute(app){
    app.use('/api/customer',customerRouter);
}

module.exports = initAPIRoute;
