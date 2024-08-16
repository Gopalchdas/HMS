import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { Context } from '../../main';
import home from '../Assets/home.png';
import alldoc from '../Assets/allDoc.png';
import addAdmin from '../Assets/addAdmin.png';
import addDoc from '../Assets/addDoc.png';
import message from '../Assets/message.png';
import logout from '../Assets/logout.png';


import { Link } from 'react-router-dom';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

import { toast } from 'react-toastify';
const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const[show,setShow]=useState(false);
  const handleShow=()=>{
    setShow(!show);
} ;
const handleLogout = async () => {
  await axios.get("http://localhost:4000/user/admin/logout", {
      withCredentials: true,
    })
    .then((res) => {
      toast.success(res.data.message);
      setIsAuthenticated(false);
       console.log(isAuthenticated)
    })
    .catch((err) => {
      toast.error(err.response.data.message);
     
    });
};
 return (
    <div className='sidebar' style={!isAuthenticated?{display:'none'}:{display:'flex'}} >
      
        <Link to={'/'} className='li' onClick={handleShow}><img src={home} /> Home</Link>
        <Link to={'/doctors'} className='li' onClick={handleShow}><img src={alldoc} />Doctors</Link>
        <Link to={'/addnewadmin'} className='li' onClick={handleShow}><img src={addAdmin} /> Add Admin</Link>
        <Link to={'/addnewdoctor'} className='li' onClick={handleShow}><img src={addDoc}/>Add Doctor</Link>
        <Link to={'/messages'} className='li' onClick={handleShow}><img src={message} />Messages</Link>
       <Link className='li' ><img src={logout} onClick={handleLogout}/>Logout</Link>
    </div>
  )
}

export default Sidebar
