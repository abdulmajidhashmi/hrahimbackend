const express = require("express");
const productrouter = express.Router();
const {createproduct,findproduct} =require('../controller/productcontroller.js');
const adminauth = require("../middlewares/adminauth.js");


productrouter.post('/',adminauth,createproduct);
productrouter.get('/',adminauth,findproduct)

module.exports = productrouter;