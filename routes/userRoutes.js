const  {createuserentry,loginuser,currentuserlogin } = require('../controller/userController.js')
const express = require('express');
const userrouter = express.Router();
const userauth = require('../middlewares/auth.js')

userrouter.post('/signup',createuserentry);
userrouter.post('/login',loginuser);
userrouter.get('/currentuserlogin',userauth,currentuserlogin);


module.exports = userrouter;