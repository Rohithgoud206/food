import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})

const User=mongoose.models.user ||  mongoose.model("user",userSchema);
export default User;


// Having minimize: false ensures that even if the cartData
//  is empty, it will still be included in the document.
//   This can be important for maintaining 
// consistency across different documents and collections.