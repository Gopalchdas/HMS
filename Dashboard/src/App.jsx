import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import axios from 'axios';
import { Context } from "./main";
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Dashboard 09-54-09-321/Dashboard.jsx';
import AddNewAdmin from './Components/AddNewAdmin/AddNewAdmin.jsx';
import AddNewDoctor from './Components/AddNewDoctor/AddNewDoctor.jsx';
import Doctors from './Components/Doctors/Doctors.jsx';
import Message from './Components/Messages/Messages.jsx';
import Login from './Components/Login/Login.jsx';

const App = () => {
  const { isAuthenticated, setIsAuthenticated,setAdmin } =
    useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

 
  return (
    <div className='app'>
     <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/addnewadmin'element={<AddNewAdmin/>}/>
          <Route path='/addnewdoctor' element={<AddNewDoctor/>} />
          <Route path='/doctors'element={<Doctors/>}/>
          <Route path='/messages'element={<Message/>}/>
          <Route path='/login'element={<Login/>}/>
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  )
}

export default App
