const mongoose = require('mongoose');

const productschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})


const ProductModel = mongoose.model("products",productschema);

module.exports = ProductModel;