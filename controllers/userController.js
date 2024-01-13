const User=require("../models/userModel");
const asyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const registerUser=asyncHandler(async (req,res) =>{
    const {name,email,password}=await req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("please fill all the fields")
    }

    //user already exist or not
    const userExists=await User.findOne({email:email});
    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }

    //hash password
    
    const secret=parseInt(process.env.Salt);
    const salt=await bcrypt.genSalt(secret);
    const hashedPassword=await bcrypt.hash(password, salt);
    const user=await User.create({
        name:name,
        email:email,
        password:hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            
        });
    }else{
        res.status(400);
        throw new Error("Invalid user")
    }
});

const loginUser=asyncHandler(async (req,res) =>{
    const{email,password}=req.body;
    const user=await User.findOne({email});
    console.log(user)
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("invalid username or password")
    }

})

const generateToken= (id) =>{
    const token=jwt.sign({id}, process.env.key ,{expiresIn:'30d'});
    console.log(token);
    return token;
}

module.exports={ registerUser, loginUser }
