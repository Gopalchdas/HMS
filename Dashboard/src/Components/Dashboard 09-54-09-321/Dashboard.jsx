import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  const [appointment, setAppointment] = useState("");
  const [doctors, setDoctors] = useState("");
  if (!isAuthenticated) {
    return <Navigate to={'/login'}/>
  };
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointment((prevAppointments) =>
        prevAppointments.map((appointments) =>
          appointments._id === appointmentId
            ? { ...appointments, status }
            : appointments
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteStatus=async(appointmentId)=>{
    try {
      const {data}=await axios.delete(`http://localhost:4000/appointment/update/${appointmentId}`,{withCredentials:true});
      setAppointment((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      toast.success(data.message);
  
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


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

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/appointment/allappointment",
          { withCredentials: true }
        );
        setAppointment(data.appointments);
      } catch (error) {
        setAppointment([]);
        console.log("some error occured while getting appointments");
      }
    };
    fetchAppointment();
  }, []);

  return (
    <div
      className="dashboard"
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
    >
      <div className="dashboard-top">
        <div className="top-item">
          <h1>Hello !</h1>
          <h2>{`${admin.firstName} ${admin.lastName}`}</h2>
        </div>
        <div className="top-item-right">
          <h1>Total Appointments</h1>
          <h2> {`${appointment.length}`}</h2>
        </div>
        <div className="top-item-right">
          <h1>Total Doctors</h1>
          <h2>{`${doctors.length}`}</h2>
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="dashboard-info">
          <h2>Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointment && appointment.length > 0 ? (
                appointment.map((appnt) => {
                  return (
                    <tr key={appnt._id}>
                      <td>{`${appnt.firstName} ${appnt.lastName}`}</td>
                      <td>{appnt.appointmentDate}</td>
                      <td>{`${appnt.doctor.firstName} ${appnt.doctor.lastName}`}</td>
                      <td>{appnt.department}</td>
                      <td>
                        <select
                          name="status"
                          value={appnt.status}
                          onChange={(e) =>
                            handleUpdateStatus(appnt._id, e.target.value)
                          }
                          className="stat"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        {appnt.hasvisited === true ? (
                          <p>
                            Yes <button onClick={(e)=>handleDeleteStatus(appnt._id)}>X</button>
                          </p>
                        ) : (
                          <p>
                            No<button onClick={(e)=>handleDeleteStatus(appnt._id)}>X</button>
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No appointment</td>
                  <td>No appointment</td>
                  <td>No appointment</td>
                  <td>No appointment</td>
                  <td>No appointment</td>
                  <td>No appointment</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
