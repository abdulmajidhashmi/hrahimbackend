const  {createuserentry,loginuser } = require('../controller/userController.js')
const express = require('express');
const userrouter = express.Router();

userrouter.post('/signup',createuserentry);
userrouter.post('/login',loginuser);


module.exports = userrouter;