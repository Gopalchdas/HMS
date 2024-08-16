import express from "express";
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
const router=express.Router();
router.post('/post',isPatientAuthenticated,postAppointment);
router.get('/allappointment',isAdminAuthenticated,getAllAppointment);
router.put('/update/:id',isAdminAuthenticated,updateAppointmentStatus);
router.delete('/update/:id',isAdminAuthenticated,deleteAppointment);


export default router;