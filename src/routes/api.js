const customerRouter = require('./customer');
const productRouter = require('./product');
function initAPIRoute(app){
    app.get('/api',(req,res)=>{
        res.json({
            customer:{
                get:["/","/find/:name"],
                post:'/create',
                put:"/:id/edit",
                delete:"/:id",
            }
        })
    })
    app.use('/api/product',productRouter);
    app.use('/api/customer',customerRouter);
}

module.exports = initAPIRoute;
