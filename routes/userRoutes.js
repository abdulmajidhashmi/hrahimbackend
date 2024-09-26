const  {createuserentry,loginuser,currentuserlogin, loginregister, verifyotp, updatename } = require('../controller/userController.js')
const express = require('express');
const userrouter = express.Router();
const userauth = require('../middlewares/auth.js')

userrouter.post('/signup',createuserentry);
userrouter.post('/login',loginuser);
userrouter.get('/currentuserlogin',userauth,currentuserlogin);
userrouter.post('/otp',loginregister);
userrouter.post('/verifyotp',verifyotp);
userrouter.patch('/name',updatename);


module.exports = userrouter;