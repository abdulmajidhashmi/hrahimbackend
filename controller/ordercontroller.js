const orderModel = require('../model/ordermodel');


const placeorder = async(req,res)=>{


    const {order,orderuserdetails}=req.body;
    if(!order || !orderuserdetails){

        res.send({message:"please select the product and make payement"})
    }
    console.log(req.body);

    try{

        const neworder=  new orderModel({
            order,orderuserdetails
        })

            const savedorder = await neworder.save();

            res.send({message:"order placed",data:savedorder});
    }
    catch(err){

        res.send({message:"some error"});
    }
   

}

const userorder = async (req,res)=>{
const body=req.body.email;
try{
    const userorderdata = await orderModel.find({'orderuserdetails.email':body});
    console.log(userorderdata);
    res.send(userorderdata);

}
catch(err){

    res.send("there is error in server side",err);
}


}


const alluserorder =async(req,res)=>{

try{
    const allorderdata = await orderModel.find();

    res.send(allorderdata);
    console.log(allorderdata);
}
catch(err){
res.send("error from server",err)

}

}

module.exports ={placeorder,userorder,alluserorder};