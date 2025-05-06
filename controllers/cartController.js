import User from "../model/userModel.js";


export const addToCart=async(req,res)=>{
    try {
        
        let userData = await User.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, msg: "User not found" });
        }
    
        if (!userData.cartData) {
            userData.cartData = {};
        }
    
        let cartData = userData.cartData;
    
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1; 
        } else {
            cartData[req.body.itemId] += 1; 
        }
    
        await User.findByIdAndUpdate(req.body.userId, { cartData });
    
        res.json({ success: true, msg: "Added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    } 
}


export const removeFromCart=async(req,res)=>{
    try{
       let userData=await User.findById(req.body.userId);
       let cartData=await userData.cartData;
       if(cartData[req.body.itemId]>0){
         cartData[req.body.itemId]-=1;
       }
       await  User.findByIdAndUpdate(req.body.userId,{cartData});
       return res.json({success:true,msg:"Removed from cart"});
    }catch(err){
       console.log(err);
       return res.json({success:false,msg:"Error"});
    }
}

export const getCart=async(req,res)=>{
    try{
       let userData=await User.findById(req.body.userId);
       let cartData=await userData.cartData;
       res.json({success:true,cartData});
    }catch(err){
       console.log(err);
       return res.json({success:false,msg:"Error"});
    }
}