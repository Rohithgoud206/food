import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";
import User from "../model/userModel.js";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

export const loginUser=async(req,res)=>{
   const {email,password}=req.body;
   try{
     const user=await User.findOne({email:email});
     if(!user){

        return res.json({success:false,msg:'User doesnt exists'});
     }
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
        return res.json({success:false,msg:"Invalid email/password"});
     }
     const token=createToken(user._id);
     return res.json({success:true,token});
   }catch(err){
     console.log(err);
     return res.json({success:false,msg:'Error'});
   }
}



export const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const exist=await User.findOne({email:email});
        if(exist){
            return res.json({success : false,msg : "User already exists"});
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,msg:'Please enter valid email'});
        }
        if(password.length<8){
            return res.json({success : false,msg : 'Please enter strong password'});
        }
        const salt=await bcrypt.genSalt(7);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            name : name,
            email:email,
            password:hashedPassword
        })
        const user=await newUser.save();
        const token=createToken(user._id);
        return res.json({success:true,token})
    }catch(err){
        console.log(err);
        return res.json({success : false,msg : "error"});
    }
}

