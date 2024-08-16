import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {Link, Navigate, useNavigate } from 'react-router-dom';
import './CSS/Login.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {isAuthenticated,setIsAuthenticated} =useContext(Context);
  const navigate=useNavigate();
   const [formData,setFormData]=useState({
    email:'',
    password:'',
    confirmPassword:'',
    role:'Patient',
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
const response= await axios.post("http://localhost:4000/user/login",formData,
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
      <h1>Login</h1>
      <p>Please login to continue!</p>
      <form onSubmit={handleSubmit}>
      <input type="text" name='email' value={formData.email} onChange={handleChange} className='inp' placeholder='Email'/>
      <input type="text" name='password' value={formData.password} onChange={handleChange} className='inp' placeholder='Password'/>
      <input type="text" name='confirmPassword' value={formData.confirmPassword } onChange={handleChange} className='inp' placeholder='Confirm Password'/>
      <button className='button'>Login</button>
      <p>Not registered? <Link to={"/register"} >Register</Link></p>
      </form>
    </div>
  )
}

export default Login
