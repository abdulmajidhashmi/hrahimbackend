const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors=require('cors');
const mongoconnect = require('./config/db');
const productrouter = require('./routes/productroute')

app.use(cors());
mongoconnect();

app.use('/productcreate',productrouter);
app.get("/",(req,res)=>{

    res.status(200).json("hi my name is abdul majid");
})

// app.post("/user",(req,res)=>{

//     const body =req.body;
//     console.log(body);
//     res.status(201).json("entry created");
// })
const PORT =4000;
app.listen(PORT,()=>{

    console.log("running on https://localhost:4000");
})