const express = require("express");
const productrouter = express.Router();
const {createproduct,findproduct,editproduct, deleteproduct} =require('../controller/productcontroller.js');
const adminauth = require("../middlewares/adminauth.js");


productrouter.post('/',adminauth,);
productrouter.get('/',adminauth,findproduct);
productrouter.get('/prod',findproduct);
productrouter.put('/edit',adminauth,editproduct);
productrouter.delete('/delete',adminauth,deleteproduct);

module.exports = productrouter;