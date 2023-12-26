const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");


const authmiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if(!token){
            return res.status(401).json({message : "Authorization failed! No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message : "Invalid Token"});
        }

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        req.user = user._id;
        next();
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}


module.exports = authmiddleware;