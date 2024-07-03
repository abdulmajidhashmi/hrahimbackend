const productModel =require('../model/productmodel');
const createproduct = async (req,res)=>{
const body = req.body
  try{
    await productModel.create({

    name:body.name,
    price:body.price,
    mrp:body.mrp,
    weight:body.weight,
    image:body.image
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