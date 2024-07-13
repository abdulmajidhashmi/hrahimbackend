const express = require('express');
const {placeorder,userorder,alluserorder} = require('../controller/ordercontroller')
const orderrouter = express.Router();

orderrouter.post('/create',placeorder)
orderrouter.post('/userorder',userorder);
orderrouter.get('/alluserorder',alluserorder);

module.exports = orderrouter;