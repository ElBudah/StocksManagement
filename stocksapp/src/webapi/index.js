const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const yup = require('yup');
const routes = require('./routes/routes');
const loginRoutes = require('./routes/login_routes');
const stockroutes = require('./routes/stocks_router');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/logged', routes);
app.use('/signup', routes);
app.use('/erase', routes);
app.use('/newstock', stockroutes);

app.use('/signin', loginRoutes);



app.listen(5000, () => {
    console.log('The webserver is running');
})