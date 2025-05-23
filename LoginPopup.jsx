import React, { useContext, useState } from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
    const {url,token,setToken}=useContext(StoreContext);
    const [currState,setCurrState]=useState("Signup");
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler=(e)=>{
      //  const name=e.target.name;
      //  const value=e.target.value;
       setData(data=>({
        ...data,
        [e.target.name]:e.target.value
       }))
    }

    const onLogin=async(e)=>{
        e.preventDefault();
        let newUrl=url;
        if(currState==="Login"){
           newUrl+="/api/user/login";
        }else{
          newUrl+="/api/user/register"
        }
        const res=await axios.post(newUrl,data);
        if(res.data.success){
           setToken(res.data.token);
           localStorage.setItem("token",res.data.token);
           setShowLogin(false);
        }else{
           alert(res.data.msg);
        }
    }


  return (
    <div className='login-popup'>
       <form onSubmit={onLogin} className='login-popup-container'>
          <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
          </div>
          <div className='login-popup-inputs'>
            {currState==="Login" ? null : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name'  required/> }
             <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
             <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='Your password' required/>
          </div>
          <button type='submit'>{currState==="Signup" ? "Create Account" : "Login"}</button>
          <div className="login-popup-condition">
            <input type='checkbox' required />
            <p>By continuing , i agree to the terms of use & privacy policy.</p>
          </div>
          {currState==="Login" ? 
             <p>Create a new Account ? <span onClick={()=>setCurrState("Signup")}>Click here</span> </p>
             : <p>Already have an account ? <span  onClick={()=>setCurrState("Login")}>Login here</span> </p>
          } 
       </form>
    </div>
  )
}

export default LoginPopup
