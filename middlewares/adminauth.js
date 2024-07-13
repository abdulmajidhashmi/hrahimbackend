const jwt = require('jsonwebtoken');
const userModel = require("../model/userModel");
const adminauth =async (req, res, next) => {
    try {
        // Ensure the authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).send({ message: "Authorization header missing" });
        }

        // Split the authorization header to get the token
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Token missing" });
        }

        console.log('Token received:', token);

        // Verify the token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified:', verifiedToken.role);

      const userdata =await  userModel.findOne({_id:verifiedToken.userId})

       

        // Attach userId to the request body
        req.body.userId = verifiedToken.userId;

        // Check if the role is admin
        if (userdata.role === "admin") {
            console.log('Role is admin:', verifiedToken.role);
            next();
        } else {
            return res.status(403).send({ message: "Access denied: admin role required" });
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).send({ message: "Invalid token" });
    }
};

module.exports = adminauth;
