const express = require("express");
const productrouter = express.Router();
const {createproduct,findproduct,editproduct, deleteproduct,findoneproduct} =require('../controller/productcontroller.js');
const adminauth = require("../middlewares/adminauth.js");


productrouter.post('/',adminauth,createproduct);
productrouter.get('/',adminauth,findproduct);
productrouter.get('/prod',findproduct);
productrouter.put('/edit',adminauth,editproduct);
productrouter.delete('/delete',adminauth,deleteproduct);
productrouter.get('/prod/:id',findoneproduct);

module.exports = productrouter;