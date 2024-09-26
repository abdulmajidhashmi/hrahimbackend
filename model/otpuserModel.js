const mongoose=require('mongoose');

const userotpSchema = new mongoose.Schema({

    name:{
        type:String,
        default:"user",
        required:true,
    },
    // number:{
    //     type:Number,
    //     required:true,
        
    // },
    email:{
        type:String,
        required:true,
        unique:true  
    },
    // password:{
    //     type:String,
    //     required:true,
    //     MinLength:8
      
    // },
    role:{
        type:String,
        enum:["user","admin","partner"],
        default:"user",
        required:true
    },
    otp:{
        type:String,
    },
    otpExpiry:{

        type:Date,
    }
})

const userotpModel = mongoose.model("user",userotpSchema);

module.exports = userotpModel;