const userModel = require("../model/userModel");
const userotpModel = require("../model/otpuserModel");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createuserentry = async (req, res) => {
  const body = req.body;
  let checkpassword = "";

  try {
    const checkuser = await userModel.findOne({ email: body.email });

    if (checkuser) {
      return res.send({ success: false, message: "user already exists" });
    }

    if (body.password === body.confirmpassword) {
      checkpassword = body.password;
    } else {
      return res.send({ success: false, message: "password do not match" });
    }
    await userModel.create({
      name: body.name,
      surname: body.surname,
      number: body.number,
      email: body.email,
      password: checkpassword,
      role: "user",
    });

    return res.send({ success: true, message: "entry created" });
  } catch (err) {
    return res.send({ success: false, message: "not created", data: err });
  }
};

const loginuser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);
    if (!user) {
      return res
        .status(402)
        .json({ message: "user does not exist", success: false });
    }
    if (user.password !== req.body.password) {
      return res
        .status(402)
        .json({ message: "password not matched", success: false });
    }

    const newuser = await userModel
      .findOne({ email: req.body.email })
      .select("-password");
    return res
      .status(202)
      .json({ message: "user logged in", success: true, data: token });
  } catch (err) {
    return res.status(402).json({ message: "error is there", success: false });
  }
};

const currentuserlogin = async (req, res) => {
  try {
    const body = req.body;
    const user = await userModel.findById(body.userId).select("-password");
    console.log(user);
    res.status(201).json({ message: user });
  } catch (err) {
    res.status(400).json({ message: "something server error" });
  }
};

const otpGenerator = () => {
  return Math.floor(Math.random() * 900000) + 100000; // Corrected OTP generation
};
const loginregister = async (req, res) => {
  const email = req.body.email;
  const body = req.body;
  const name = req.body.name || "user";
  const otp = otpGenerator();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  try {

    if(email===undefined){

        res.send({data:"empty",message:"email is undefined",success:false});
    }
    const userexists = await userotpModel.findOne({ email });
    console.log(userexists);

    if (userexists) {
      //send otp and verify

      if (userexists.otpExpiry > new Date()) {
        const msg = {
          to: email,
          from: "hashmiabdulmajid@gmail.com",
          subject: "Your OTP Verification Code",
          text: `Your OTP code is ${userexists.otp}. Please use this code to verify your account.`,
          html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2 style="color: #4CAF50;">OTP Verification</h2>
                            <p>Your OTP code is: <strong style="font-size: 24px;">${userexists.otp}</strong></p>
                            <p>Please use this code to verify your account. The code is valid for 10 minutes.</p>
                            <p>If you didn't request this, please ignore this email.</p>
                        </div>
                    `,
        };

        const emaildata = await sgMail.send(msg);

        console.log(emaildata);
      }
      if (userexists.otpExpiry < new Date()) {
        const saveddata = await userotpModel.updateOne(
          { email },
          { otp, otpExpiry }
        );

        console.log(saveddata);

        const msg1 = {
          to: email,
          from: "hashmiabdulmajid@gmail.com",
          subject: "Your OTP Verification Code",
          text: `Your OTP code is ${otp}. Please use this code to verify your account.`,
          html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2 style="color: #4CAF50;">OTP Verification</h2>
                            <p>Your OTP code is: <strong style="font-size: 24px;">${otp}</strong></p>
                            <p>Please use this code to verify your account. The code is valid for 10 minutes.</p>
                            <p>If you didn't request this, please ignore this email.</p>
                        </div>
                    `,
        };

        const check = await sgMail.send(msg1);

        console.log(check);
      }

      // const msg = {
      //     to: email,
      //     from: 'hashmiabdulmajid@gmail.com',
      //     subject: 'Your OTP Verification Code',
      //     text: `Your OTP code is ${otp}. Please use this code to verify your account.`,
      //     html: `
      //         <div style="font-family: Arial, sans-serif; padding: 20px;">
      //             <h2 style="color: #4CAF50;">OTP Verification</h2>
      //             <p>Your OTP code is: <strong style="font-size: 24px;">${otp}</strong></p>
      //             <p>Please use this code to verify your account. The code is valid for 10 minutes.</p>
      //             <p>If you didn't request this, please ignore this email.</p>
      //         </div>
      //     `,
      // };

      // const emaildata = await sgMail.send(msg);

      // console.log(emaildata);
    }

    if (userexists === null) {
      const createnewuser = new userotpModel({ name, email, otp, otpExpiry });
      const saved = await createnewuser.save();
      console.log(saved);


 const msg2 = {
          to: email,
          from: 'hashmiabdulmajid@gmail.com',
          subject: 'Your OTP Verification Code',
          text: `Your OTP code is ${otp}. Please use this code to verify your account.`,
          html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h2 style="color: #4CAF50;">OTP Verification</h2>
                  <p>Your OTP code is: <strong style="font-size: 24px;">${otp}</strong></p>
                  <p>Please use this code to verify your account. The code is valid for 10 minutes.</p>
                  <p>If you didn't request this, please ignore this email.</p>
              </div>
          `,
      };

      const emaildata = await sgMail.send(msg2);

      console.log(emaildata);



    }


    res.send({ data: "okays", success: true, message: "otp send" });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "credentials wrong", data: err });
  }
};

const verifyotp = async(req,res)=>{

        const email=req.body.email;
        const otp = req.body.otp;
    try{

        if(otp===undefined){

            res.send({data:null,message:"otp is undefined",success:false});
        }
        if(otp===null){

            res.send({data:null,message:"otp is null",success:false});
        }
        if(email===undefined){

            res.send({data:null,message:"email is undefined",success:false});
        }
        if(email===null){

            res.send({data:null,message:"email is null",success:false});
        }

           const getuser =  await userotpModel.findOne({email:email});
           if(getuser===null){

            res.send({data:null,message:"invalid user",success:false});
           }

           if(getuser.otp===otp && getuser.otpExpiry>new Date()){

            const token = jwt.sign({ userId: getuser._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              });

              const obj ={data:token,name:getuser.name,email:getuser.email}
              res.send({data:obj,message:"access granted",success:true});
           }

           if(getuser.otp===otp && getuser.otpExpiry<new Date()){

            res.send({data:null,message:"otp expired",success:false});
           }


    }catch(err){

        console.log(err);
        res.send({data:err,message:"internal server error",success:false});
    }
}

const updatename = async(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;

try{
    const updateddata = await userotpModel.findOneAndUpdate({email:email},{name:name},{new:true});

    res.send({data:updateddata,message:"data updated",success:true});


}catch(err){

    console.log(err);
    res.send({data:err,message:"internal server error",success:false});

}
}

module.exports = {
  createuserentry,
  loginuser,
  currentuserlogin,
  loginregister,
  verifyotp,
  updatename,
};
