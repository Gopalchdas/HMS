import React, { useContext, useState } from "react";
import "./AddNewDoctor.css";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../Assets/logoHc.png";
import person from "../Assets/person.png";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    password: "",
    doctordepartment:"",
  });
 const[docavtar,setDoctorAvtar]=useState("");
 const[docAvtarPreview,setDoctorAvtarPreview]=useState(""); 
 const data={
  ...formData,
  docavtar,
  docAvtarPreview
 } ;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const departmentArray = [
    "CARDIOLOGY",
    "OPHTHALMOLOGY",
    "PULMONARY",
    "DIAGNOSTICS",
    "FOR DISABLED",
    "LABORATORY",
  ];
  const handleAvtar = async (e) => {
    const file = await e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
   setDoctorAvtar(file);
      setDoctorAvtarPreview( reader.result);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/doctors/addnew",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(data);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="addnewdoctor">
      <img src={logo} alt="logo" />
      <h1>ADD NEW DOCTOR</h1>
      <form onSubmit={handleSubmit}>
        <div className="avtar">
          <img
            src={
              docAvtarPreview ? `${docAvtarPreview}` : person
            }
            alt=""
          />
          <input type="file" onChange={handleAvtar}  />
        </div>
        <div className="form-container"><div className="form-container-input">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="firstName" className="inp"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="lastName" className="inp"
          />
        </div >
        <div className="form-container-input">
          
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="phone number" className="inp"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email" className="inp"
          />
        </div>
        <div className="form-container-input">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth" className="inp"
          />
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password" className="inp"
          />
        </div>
        <div className="form-container-input">
        
          <select name="gender" value={formData.gender} onChange={handleChange} className="inp">
            <option value="">select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <select name="doctordepartment" value={formData.doctordepartment} onChange={handleChange} className="inp">
            {
              departmentArray.map((depart,index)=>{
                return (
                  <option value={depart} key={index}>{depart}</option>
                )
              })
            }
          </select>
        </div>  <button className="button">Add New Doctor</button></div>
      </form>
    </div>
  );
};

export default AddNewDoctor;
