const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");


const Signup = async (req, res) => {
    try {
        const {name, email, password, phone_number, department} = req.body;


        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone_number,
            department,
        });

        await newUser.save();

        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};


const Login = async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invaild Credentials"});
        }

        const isPasswordValid = await bycrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};

module.exports = {Signup, Login};