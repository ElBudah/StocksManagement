const { Router } = require('express');
const express = require('express');
const app = express();
const stockroutes = Router();
const stocks_controller = require('../controller/stocks_controller');


app.use(express.json());

stockroutes.post('/addstock', stocks_controller.post);

module.exports = stockroutes;