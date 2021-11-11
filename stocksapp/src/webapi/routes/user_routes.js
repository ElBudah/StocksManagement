const express = require('express');
const app = express();
const route = express.Router();
const user_controller = require('../controller/user_controller');

app.use(express.json());

route.post('/', user_controller.post);
route.get('/stocks', user_controller.get);
route.delete('/stocks', user_controller.delete);


route.post('/')

module.exports = route;