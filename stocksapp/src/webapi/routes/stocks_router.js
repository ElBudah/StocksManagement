const { Router } = require('express');
const express = require('express');
const app = express();
const stockroutes = Router();
const stocks_controller = require('../controller/stocks_controller');


app.use(express.json());

stockroutes.post('/addstock', stocks_controller.post);
stockroutes.post('/sellstocks', stocks_controller.sellStocks);
stockroutes.post('/profits', stocks_controller.profits);
stockroutes.post('/profitneat', stocks_controller.profitneat);
stockroutes.get('/stocks', stocks_controller.get);

stockroutes.delete('/stocks', stocks_controller.erase);

module.exports = stockroutes;