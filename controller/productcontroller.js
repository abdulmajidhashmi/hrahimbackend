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
  try {
    const product = await productModel.find();
  
    
    res.send({message:"prouducts found",success:true,data:product});
  } catch (err) {
    res.send({message:"Internal server Error",success:false});
  }
};

const editproduct = async (req,res) => {
  const body = req.body;

  try {
   const updateproduct= await productModel.findByIdAndUpdate(body._id,body);
        res.send({message:"updated successfully",data:updateproduct,success:true});

  } catch (err) {
    res.send({message:"internal server error",success:false});
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
module.exports = { editproduct, createproduct, findproduct ,deleteproduct};
