const jwt = require('jsonwebtoken');
const userauth=(req,res,next)=>{
try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verifiedtoken = jwt.verify(token,process.env.JWT_SECRET);

            req.body.userId=verifiedtoken.userId;

            next();
        }
            catch(err){

                res.send({message:null});
            }
}

module.exports = userauth;