const productModel =require('../model/productmodel');
const createproduct = async (req,res)=>{
const body = req.body
  try{
    await productModel.create({

    name:body.name,
    price:body.price,
    mrp:body.mrp,
    weight:body.weight,
    image1:body.image1,
    image2:body.image2,
    image3:body.image3,
    image4:body.image4,
    description:body.description
})
return res.status(201).json("entry created");
}
catch(err){
return res.status(402).json(err);
}

}


const findproduct =async (req,res)=>{
try{
    const product=await productModel.find()
    console.log(product);
res.status(201).json(product);
}
catch(err){

    res.status(404).json(err);
}


}
module.exports = {createproduct,findproduct};