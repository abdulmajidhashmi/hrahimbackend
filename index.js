const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());
const cors=require('cors');
const mongoconnect = require('./config/db');
const productrouter = require('./routes/productroute')
const userrouter = require('./routes/userRoutes');
const orderrouter = require('./routes/orderRoute');
const adminauth = require('./middlewares/adminauth');
const notificationRouter = require('./routes/notificationRoute');

//email 

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
mongoconnect();

app.use('/productcreate',productrouter);
app.use('/user',userrouter);
app.use('/order',orderrouter);
app.use('/notify',notificationRouter);
app.get("/",(req,res)=>{

    res.status(200).json("hi my name is abdul majid");
})







const PORT =4000;
app.listen(PORT,()=>{

    console.log("running on https://localhost:4000");
})