const express = require('express');
const app = express();
const initAPIRoute = require('./routes/api');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3100;


app.use(express.static('./src/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
initAPIRoute(app);



app.listen(port,() =>{
    console.log('Running on port ',port);
})