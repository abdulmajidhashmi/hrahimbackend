const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true  
    },
    password:{
        type:String,
        required:true,
        MinLength:8
      
    },
    role:{
        type:String,
        enum:["user","admin","partner"],
        default:"user",
        required:true
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;