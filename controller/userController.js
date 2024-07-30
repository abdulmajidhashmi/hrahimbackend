const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken');

const createuserentry = async (req, res) => {
    const body = req.body;
    let checkpassword = '';

    try {

        const checkuser = await userModel.findOne({email:body.email})

        if(checkuser){
            return res.send({success:false,message:"user already exists"});
        }

        if (body.password === body.confirmpassword) {
            checkpassword = body.password
        } else {
            return res.send({success:false, message: "password do not match" })
        }
        await userModel.create(
            {
                name: body.name,
                surname: body.surname,
                number: body.number,
                email: body.email,
                password: checkpassword,
                role:"user"
            }
        )

        return res.send({ success:true,message: "entry created" });
    }
    catch (err) {
        return res.send({ success:false,message: "not created", data: err });

    }
}


const loginuser = async (req,res) => {
try{
    const user = await userModel.findOne({email:req.body.email});
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    console.log(token)
    if(!user){

        return res.status(402).json({message:"user does not exist",success:false});
    }
    if(user.password!==req.body.password){

        return res.status(402).json({message:"password not matched",success:false});
    }
    
   const newuser =   await userModel.findOne({email:req.body.email}).select('-password');
    return res.status(202).json({message:"user logged in",success:true,data:token});
}
catch(err){

    return res.status(402).json({message:"error is there",success:false})
}

    

}


const currentuserlogin = async(req,res)=>{
try{
   const body=req.body;
   const user = await userModel.findById(body.userId).select('-password');
   console.log(user);
    res.status(201).json({message:user});
}

catch(err){
    

    res.status(400).json({message:"something server error"});
}
}

module.exports = {createuserentry,loginuser,currentuserlogin};