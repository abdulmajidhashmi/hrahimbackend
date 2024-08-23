const notificationModel  = require('../model/notification');
const { notify } = require('../routes/productroute');


const notificationController=  async(req,res)=>{

    try{

        const notifyData = await notificationModel.findOne().sort({createdAt:-1});
        

        res.send({message:"Notification found",success:true,data:notifyData});

    }catch(err){


        res.send({message:"Internal Server Error",success:false});
    }
}

module.exports = {notificationController};