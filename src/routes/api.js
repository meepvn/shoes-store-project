const res = require('express/lib/response');
const customerRouter = require('./customer');

function initAPIRoute(app){
    app.use('/api',()=>{
        res.json({
            customer:{
                get:"/",
                post:"/create",
                put:"/:id/edit",
                delete:"/:id"
            }
        })
    })
    app.use('/api/customer',customerRouter);
}

module.exports = initAPIRoute;
