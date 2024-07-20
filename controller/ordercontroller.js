const orderModel = require('../model/ordermodel')


const placeorder = async(req,res)=>{
console.log("hi");

    const {order,orderuserdetails}=req.body;

   
    

    try{

        const neworder= new orderModel({
            order,orderuserdetails
        });

            const savedorder = await neworder.save();
            console.log(savedorder);

            res.send({message:"order placed",data:savedorder});
    }
    catch(err){

        res.send({message:"some error"});
        console.log(err);
    }
   

}

const userorder = async (req,res)=>{
const body=req.body.email;
try{
    const userorderdata = await orderModel.find({'orderuserdetails.email':body}).sort({_id:-1});
    
    res.send(userorderdata);

}
catch(err){

    res.send("there is error in server side",err);
}


}


const alluserorder =async(req,res)=>{

try{
    const allorderdata = await orderModel.find().sort({_id:-1});

    res.send(allorderdata);
}
catch(err){
res.send("error from server",err)

}

}

module.exports ={placeorder,userorder,alluserorder};