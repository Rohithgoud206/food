import FoodModel from "../model/FoodModel.js";
import fs from 'fs';

export const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new FoodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename
    })
    try{
        await food.save();
        console.log(food);
        return res.status(200).json({success : true,msg : "Food Added"});
    }catch(err){
        console.log(err);
        return res.status(500).json({success : false,msg:'Error'});
    }
}

// entire food list
export const listFood=async (req,res)=>{
    try{
        const foods=await FoodModel.find({});
        res.json({success : true,data:foods});
    }catch(err){
         console.log(err);
         res.json({success : false,msg:'Error'});
    }
}

// remove food item
export const removeFood=async (req,res)=>{
    try{
       const food=await FoodModel.findById(req.body.id);
       fs.unlink(`uploads/${food.image}`,()=>{});
       await FoodModel.findByIdAndDelete(req.body.id);
       res.json({success : true, msg : 'Food Removed'});
    }catch(err){
        console.log(err);
        res.josn({success : false, msg : 'Error'});
    }
}