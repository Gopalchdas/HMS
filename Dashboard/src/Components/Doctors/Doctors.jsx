import React, { useContext, useEffect, useState } from "react";
import './Doctors.css'
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import person from "../Assets/person.png";
const Doctors = () => {
  const { isAuthenticated } = useContext(Context);
  const [doctors, setDoctors] = useState("");
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/user/doctors", {
          withCredentials: true,
        });
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return <div className="doctors">
    <h1>Doctors</h1>
      <div className="banner" >

      { doctors && doctors.length>0? (doctors.map(element=> {
        return (
          <div className="card" key={element._id}>
        <div className="head">    <img src={element.docavtar && element.docavtar.url} alt={person} />
          <h2> {`${element.firstName} ${element.lastName}`}</h2></div>
          <div className="card-details">
            <p className="em">Email:<span> {element.email}</span></p>
            <p>Phone Number: {element.phoneNumber}</p>
            <p>Department: {element.doctordepartment}</p>
            <p>D.O.B: {element.dob.substring(0,10)}</p>
            <p>Gender: {element.gender}</p>
          </div>
          </div>
        )
      })):<h1>No registered doctors</h1>}
      </div>
  </div>;
};

export default Doctors;
