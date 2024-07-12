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


module.exports ={placeorder};