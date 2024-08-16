import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {Navigate, useNavigate } from 'react-router-dom';
import './CSS/Register.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {

  const {isAuthenticated,setIsAuthenticated} =useContext(Context);
  const navigate=useNavigate();
   const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    dob:"",
    gender:"",
    password:"",
    role:"Patient",
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
const response= await axios.post("http://localhost:4000/user/patient/signUp",formData,
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
    <div className='Register-page'>
      <h1>Register</h1>
      <p>Please Register to continue!</p>
      <form onSubmit={handleSubmit}>
      <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className='inp' placeholder='First Name'/>
      <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className='inp' placeholder='Last Name'/>
      <input type="text" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} className='inp' placeholder='Phone number'/>
      <input type="text" name='email' value={formData.email} onChange={handleChange} className='inp' placeholder='Email'/>
      <input type="date" name='dob' value={formData.dob} onChange={handleChange} className='inp' placeholder='Date of Birth'/>
      <input type="text" name='password' value={formData.password} onChange={handleChange} className='inp' placeholder='Password'/>
    <select name="gender" value={formData.gender} onChange={handleChange} className='inp'>
      <option value="">select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="others">Others</option>
    </select>
      <button className='button'>Register</button>
      </form>
    </div>
  )
}

export default Register
