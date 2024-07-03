const express = require("express");
const productrouter = express.Router();
const {createproduct,findproduct} =require('../controller/productcontroller.js');


productrouter.post('/',createproduct);
productrouter.get('/',findproduct)

module.exports = productrouter;