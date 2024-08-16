import React, { useContext, useState} from "react";
import {useGSAP} from "@gsap/react"
import "./Navbar.css";
import logoHc from "../Assets/logoHC.png";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main.jsx";
import menu from '../Assets/menu.png';
import close from '../Assets/close.png';
import gsap from "gsap";

const Navbar = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [val,setVal]=useState(-470);
  useGSAP(()=>{
  
  gsap.to(".sidebar",{
    right:val, 
   });
  },[val]);

  const handleMenu=async()=>{
    setVal(0);
  };
  const handleClose=async()=>{
    setVal(-470)
  };




  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };
  const goToHome = () => {
    navigateTo("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logoHc} alt="logo" onClick={goToHome}/>
      </div>
      <div className="navbar-menu">
        <Link className="li" to={"/"}>
          Home
        </Link>
        <Link className="li" to={"/appointment"}>
          Appointment
        </Link>
        <Link className="li" to={"/aboutUs"}>
          About Us
        </Link>
      </div>
      <div className="sidebar">
      <div className="img" onClick={handleClose}>  <img src={close} alt="" /></div>
      <Link className="li" to={"/"}>
          Home
        </Link>
        <Link className="li" to={"/appointment"}>
          Appointment
        </Link>
        <Link className="li" to={"/aboutUs"}>
          About Us
        </Link>
      </div>
      <div className="navbar-login">
      {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
           <img src={menu} alt=""  onClick={handleMenu}/>
      </div>
      
    </div>
  );
};

export default Navbar;
