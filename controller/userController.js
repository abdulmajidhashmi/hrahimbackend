const userModel = require("../model/userModel");

const createuserentry = async (req, res) => {
    const body = req.body;
    let checkpassword = '';

    try {
        if (body.password === body.confirmpassword) {
            checkpassword = body.password
        } else {
            return res.status(402).json({ message: "password do not match" })
        }
        await userModel.create(
            {
                name: body.name,
                surname: body.surname,
                number: body.number,
                email: body.email,
                password: checkpassword
            }
        )

        return res.status(201).json({ message: "entry created" });
    }
    catch (err) {
        return res.status(403).json({ message: "not created", error: err });

    }
}


const loginuser = async (req,res) => {
try{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){

        return res.status(402).json({message:"user does not exist"});
    }
    if(user.password!==req.body.password){

        return res.status(402).json({message:"password not matched"});
    }

    return res.status(202).json(user);
}
catch(err){

    return res.status(404).json({message:err})
}

    

}

module.exports = {createuserentry,loginuser};