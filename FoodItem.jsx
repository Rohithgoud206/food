import React, { useContext, useState } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
   
  const {cartItems,setCartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  
  return (
    <div className='food-item'>
       <div className="food-item-image-container">
          <img className='food-item-image' src={url+"/images/"+image} alt="food-image" />
          { !cartItems[id]
                ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} />
                : <div className="food-item-counter">
                     <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} />
                     <p>{cartItems[id]}</p>
                     <img onClick={()=>addToCart(id)} src={assets.add_icon_green} />
                </div>
          }
       </div>
       <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} />
            </div>
            <p className="food-item-description">
                {description}
            </p>
            <p className="food-item-price">${price}</p>
       </div>
    </div>
  )
}

export default FoodItem
