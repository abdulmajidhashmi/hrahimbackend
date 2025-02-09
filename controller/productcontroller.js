const notificationModel = require("../model/notification");
const ProductModel = require("../model/productmodel");
const productModel = require("../model/productmodel");
const createproduct = async (req, res) => {
  const body = req.body;
  try {
    await productModel.create({
      name: body.name,
      price: body.price,
      mrp: body.mrp,
      weight: body.weight,
      image1: body.image1,
      image2: body.image2,
      image3: body.image3,
      image4: body.image4,
      description: body.description,
      category:body.category,
    });
   
    res.send({message:"Product Created successfully",success:true});
  } catch (err) {
    res.send({message:"Internal server Error",success:false});
  }
};

const findproduct = async (req, res) => {

  const {page,limit} = req.query;
  try {
    const product = await productModel.find().limit(parseInt(limit)).skip((parseInt(page)-1) *parseInt(limit));
  
    const total = await ProductModel.countDocuments();
    res.send({message:"prouducts found",success:true,data:product,total:total});
  } catch (err) {
    res.send({message:"Internal server Error",success:false});
  }
};

const editproduct = async (req,res) => {
  const body = req.body;

  try {

    const productdata = await productModel.findById(body._id);
   const updateproduct= await productModel.findByIdAndUpdate(body._id,body,{new:true});
        


        //notification 
        
        

        if(updateproduct.price<productdata.price){

        const notificationmessage = `The Price of ${updateproduct.name} has dropped from ${productdata.price} to ${updateproduct.price}`;

      const updateddata =   await notificationModel.create({
        productId:updateproduct._id,
notification:notificationmessage
          
        });

        console.log("this data is updated",updateddata);
      }

      

      

      res.send({message:"updated successfully",data:updateproduct,success:true});
      

  } catch (err) {
    res.send({message:"internal server error",success:false});
    console.log(err);
  }
};


const deleteproduct =async(req,res)=>{
  const body=req.body;
  console.log(body);

  try{
  const deletedproduct = await productModel.findByIdAndDelete(body._id);
  res.send({message:"product deleted",success:true,data:deletedproduct});
}catch(err){

  res.send({message:"Internal server error",success:false})
}
}

const findoneproduct =async(req,res)=>{

    body=req.params.id;
try{
    const data = await productModel.findById(body);
    res.send({message:"prouduct found",success:true,data:data});
    
}catch(err){

  res.send({message:"Internal server error",success:false});
}

}


const fetchproduct =async(req,res)=>{

  const {value}=req.body;

  try{
console.log(value);

const data = await productModel.find({ name: { $regex: value, $options: "i" } });
res.send({message:"Data fetched",success:true,data:data});


  }catch(err){

    res.send({message:"server error",success:false,data:"no data"});
  }
}
module.exports = { editproduct, createproduct, findproduct ,deleteproduct,findoneproduct,fetchproduct};
