import React, { useContext, useEffect, useState } from "react";
import "./CSS/Appointment.css";
import appointment_img from "../Components/Assets/appointment_img.png";

import axios from "axios";
import { Context } from "../main";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigateTo=useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    department: "",
    appointmentDate: "",
    address: "",
  });
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const[hasvisited,setHasVisited]=useState(false);
  const departmentArray = [
    "CARDIOLOGY",
    "OPHTHALMOLOGY",
    "PULMONARY",
    "DIAGNOSTICS",
    "FOR DISABLED",
    "LABORATORY",
  ];
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchdoctors = async () => {
      const { data } = await axios.get("http://localhost:4000/user/doctors", {
        withCredentials: true,
      });
      setDoctors(data.doctors);
    };
    fetchdoctors();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

     const handleAppointment=async(e)=>{
      e.preventDefault();
      const dataToSend = {
        ...formData,
        doctor_firstName:doctorFirstName,
        doctor_lastName:doctorLastName,
        hasvisited,
      };
  try {
   
  const {data}= await axios.post("http://localhost:4000/appointment/post",dataToSend,
    {withCredentials:true,headers:{
      "Content-Type":"application/json"}});
        toast.success(data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          dob: "",
          gender: "",
          department: "",
          appointmentDate: "",
          address: "",
        });
        setDoctorFirstName("");
        setDoctorLastName("");
        setHasVisited(false);
        
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(dataToSend);
  };
     };
    const goToRegister=()=>{
     navigateTo('/login')
     }
  return (
    <div className="appointment-page">
      <div className="appointment-page-top">
        <div className="appointment-page-top-left">
          <h2>Book <br /> Your <br /> Appointment</h2>
        </div>
        <div className="appointment-page-top-right">
          <img src={appointment_img} alt="" />
        </div>
      </div>
      <div className="appointment-page-bottom">
        <h2>Appointment</h2>
        <h4>Book your Appointment Now!</h4>
        <form onSubmit={handleAppointment}>
         <div className="form-input">
         <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="inp"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="inp"
            placeholder="Last Name"
          />
         </div>
<div className="form-input"><input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="inp"
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="inp"
            placeholder="Email"
          /></div>
         <div className="form-input">
         <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="inp"
            placeholder="D.O.B"
          />
        <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="inp"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
         </div>
          <div className="form-input">
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="inp"
            placeholder="Appointment Date"
          /><select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="inp"
          >
            <option value="">Select Department</option>
            {departmentArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>
                  {depart}
                </option>
              );
            })}
            ;
          </select></div>
          <div className="form-input">
          <select
            name="doctor"
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!formData.department}
            className="inp"
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter(
                (doctor) => doctor.doctordepartment === formData.department
              )
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="text-area"
          ></textarea></div>
          <div className="forminp"><p>Have you visted before?</p>
          <input
              type="checkbox"
              checked={hasvisited}
              onChange={(e) => setHasVisited(e.target.checked)}
            
            /></div>
          {isAuthenticated ? (
            <button className="inp">Book Appointment</button>
          ) : (
            <button className="inp" onClick={goToRegister}>Login To Book Appointment</button>
          )}

          {/* doctor_firstName:"",
    doctor_lastName:"",
    hasvisted:"",
    address:"" */}
        </form>
      </div>
    </div>
  );
};

export default Appointment;
