import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../../main';
import './Messages.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const Messages = () => {
const {isAuthenticated}=useContext(Context);
const [message,setMessage]=useState([]);
useEffect(()=>{
  const fetchMessage=async()=>{
    try {
      const {data}=await axios.get("http://localhost:4000/message/allMessages",{withCredentials:true},);
      setMessage(data.messages);
    } catch (error) {
      console.log("Error occured while fetching messages",error);
    }
  }; fetchMessage();
},[]);
if (!isAuthenticated) {
  return <Navigate to={'/login'}/>
};
  return (
    <div className='messages'>
      <h1>Messages</h1>
    <span> {
message && message.length>0 ?(message.map(element=>{
  return (
    <div className="card" key={element._id}>
     <div className="card-details"> <p>First Name: <span>{element.firstName}</span></p>
      <p>Last Name: <span>{element.lastName}</span></p>
      <p>Email: <span>{element.email}</span></p>
      <p>Phone Number: <span>{element.phoneNumber}</span></p>
      <p>Message: <span>{element.message}</span></p></div>
    </div>
  )
})):(<h2>No Message</h2>)
}</span>
    </div>
  )
}

export default Messages;
