const express = require('express');
const app = express();
const route = express.Router();
const login_controller = require('../controller/login_controller');
app.use(express.json());

route.post('/', login_controller.post);

module.exports = route;