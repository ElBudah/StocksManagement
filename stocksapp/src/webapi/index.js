const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const yup = require('yup');
const route = require('./routes/user_routes');

const stockroutes = require('./routes/stocks_router');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Routes for Users
app.use('/users', route);
app.use('/users', route);

//Routes for the Stocks
app.use('/newstock', stockroutes);
app.use('/sell', stockroutes);
app.use('/calculate', stockroutes );
app.use('/updating', stockroutes);
app.use('/show', stockroutes);
app.use('/erase', stockroutes);



app.listen(5000, () => {
    console.log('The webserver is running');
})