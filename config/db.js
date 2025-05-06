import mongoose from "mongoose";

export const ConnectDB=async ()=>{
    try{
        const db=await mongoose.connect('mongodb://127.0.0.1:27017/food-del');
        console.log("Connected to Database Successfully");
    }
    catch(err){
        console.log('Error connecting to DB',err);
    }
}