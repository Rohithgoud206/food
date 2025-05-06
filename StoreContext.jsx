import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext=createContext(null);


const GlobalContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);

    const addToCart=async (itemId)=>{
         if(!cartItems[itemId]){
            setCartItems({...cartItems,[itemId]:1});
         }else{
            setCartItems({...cartItems,[itemId]:cartItems[itemId]+1});
         }
         if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
         }
    }
    const removeFromCart=async (itemId)=>{
        setCartItems({...cartItems,[itemId]:cartItems[itemId]-1});
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            const foodItem = food_list.find(item => item._id === itemId);
            
            if (quantity > 0 && foodItem) {
                total += quantity * foodItem.price;
            } else {
                if (!foodItem) {
                    console.error(`Item with ID ${itemId} not found in food_list`);
                }
            }
        }
        return total;
    };
    
    

    const fetchFoodList=async()=>{
        const res=await axios.get(url+"/api/food/list");
        setFoodList(res.data.data);
    }

    const loadCartData=async(token)=>{
         const res=await axios.post(url+"/api/cart/get",{},{headers:{token}});
         setCartItems(res.data.cartData);
    }

    useEffect(()=>{
       async function loadData(){
         await fetchFoodList();
         if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
          }
       }
       loadData();
    },[])
    
    const contextValue={
        food_list,
        cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,
        token,setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default GlobalContextProvider;