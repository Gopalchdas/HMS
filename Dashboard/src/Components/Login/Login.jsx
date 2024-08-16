import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';
import logo from '../Assets/logoHc.png'
const Login = () => {
  const {isAuthenticated,setIsAuthenticated} =useContext(Context);
  const navigate=useNavigate();
   const [formdata,setFormData]=useState({
    email:'',
    password:'',
    confirmPassword:'',
    role:"Admin"
  });
  
  const handleChange=(e)=>{
   const {name,value}=e.target;
   setFormData((prevData)=>({
    ...prevData,
    [name]:value,
   }));};

   const handleSubmit=async(e)=>{
    e.preventDefault();
try {
 
const response= await axios.post("http://localhost:4000/user/login",formdata,
  {withCredentials:true,headers:{
    "Content-Type":"application/json"}});
      toast.success(response.data.message);
     setIsAuthenticated(true);
      navigate('/');
} catch (error) {
  toast.error(error.response.data.message);
};
   };
   if (isAuthenticated) {
    return <Navigate to={"/"}/>
   };
  return (
    <div className='login-page'>
      <img src={logo} alt="logo" />
      <h1>Welcome!
      </h1>
      <p>Only Admins are Allowed to access this!</p>
      <form onSubmit={handleSubmit}>
      <input type="text" name='email' value={formdata.email} onChange={handleChange} className='inp' placeholder='email'/>
      <input type="text" name='password' value={formdata.password} onChange={handleChange} className='inp' placeholder='password'/>
      <input type="text" name='confirmPassword' value={formdata.confirmPassword } onChange={handleChange} className='inp' placeholder='confirm Password'/>
      <button className='button'>Login</button>
      </form>
    </div>
  )
}

export default Login