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
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{
        type:String,
        required:true
    },
    image4:{
        type:String,
        required:true
    },
    description:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    }
})


const ProductModel = mongoose.model("products",productschema);

module.exports = ProductModel;