import React, { useState } from 'react'
import './Message.css'
import axios from 'axios'
import {toast} from 'react-toastify'
const Message = () => {

  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    message:'',
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }));

  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/message/send",formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>{
        toast.success(res.data.message || 'Form submitted successfully!');
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting form!');
    }
  };





  return (
    <div className='form-container'>
      <h1>Send us a message</h1>
      <form onSubmit={handleSubmit}>
     
            <div className="form-group">
                <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <input type="email" id="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange}/>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <textarea id="message" name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <button type="submit">SEND</button>
            </div>
      </form>
    </div>
  )
}

export default Message
