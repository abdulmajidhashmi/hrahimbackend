const express = require('express');
const {placeorder} = require('../controller/ordercontroller')
const orderrouter = express.Router();

orderrouter.post('/create',placeorder)

module.exports = orderrouter;