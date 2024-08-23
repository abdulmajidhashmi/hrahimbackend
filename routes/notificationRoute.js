const express = require('express');
const notificationRouter = express.Router();
const {notificationController} =require('../controller/notificationController');


notificationRouter.get('/',notificationController);


module.exports = notificationRouter;