import { model } from "mongoose";
import { asyncerror } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userschema.js";
import { Appointment } from "../models/appointmentschema.js";
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
      user: 'gopalchandradas9069487@gmail.com',
      pass: 'uwnckwwvufeagzzt'
  }
});
export const postAppointment = asyncerror(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    appointmentDate,
    department,
    doctor_firstName,
    doctor_lastName,
    hasvisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !dob ||
    !gender ||
    !appointmentDate ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("please fill full form", 400));
  }
  //to check is there are more than 1 doctors with  same name
  const isconflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
  });
  if (isconflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }
  if (isconflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact through email or phone",
        404
      )
    );
  }
  const doctorId = isconflict[0]._id;
  const patientId = req.user._id;
  const user = await Appointment.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Appointment already scheduled", 400));
  }
    // Convert strings to Date objects
    const today = new Date();
    const dobDate = new Date(dob);
    const appointmentdate = new Date(appointmentDate);
  
    // Create a date object for exactly one year ago
const oneYearAgo = new Date(today);
oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Validate date of birth: Must be at least 1 year earlier than today
    if (dobDate >= oneYearAgo) {
      return next(new ErrorHandler("The date of birth must be at least one year before today to ensure valid age.",400));
    };
  
    // Validate appointment date: Must be greater than today
    if (appointmentdate <= today) {
      return next(new ErrorHandler("The appointment date must be a future date. Please choose a valid future date.",400));
    };
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    appointmentDate,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasvisited,
    address,
    doctorId,
    patientId,
  });

  // Define email options
  const mailOptions = {
    from: 'gopalchandradas9069487@gmail.com',
    to: email,
    subject: 'Appointment Confirmation - Care Connect',
            text: `Hello ${firstName} ${lastName},\n\nWe are pleased to confirm your appointment.\n\nDate: ${appointmentDate}\nDepartment: ${department}\nDoctor: Dr. ${doctor_firstName} ${doctor_lastName}\nLocation: ${address}\n\nPlease arrive 15 minutes early to complete any necessary paperwork. If you need to reschedule or have any questions, feel free to contact us at [Your Contact Information].\n\nWe look forward to seeing you!\n\nBest regards,\nThe [Your Clinic Name] Team`,
            html: `<html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { width: 80%; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
                            h1 { color: #007bff; }
                            p { margin: 10px 0; }
                            .details { margin: 20px 0; }
                            .details p { background: #e9ecef; padding: 10px; border-radius: 5px; }
                            .footer { margin-top: 20px; font-size: 0.9em; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Appointment Confirmation</h1>
                            <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
                            <p>We are pleased to confirm your appointment with <strong>Care Connect</strong>.</p>
                            <div class="details">
                                <p><strong>Date:</strong> ${appointmentDate}</p>
                                <p><strong>Department:</strong> ${department}</p>
                                <p><strong>Doctor:</strong> Dr. ${doctor_firstName} ${doctor_lastName}</p>
                                <p><strong>Location:</strong> ${address}</p>
                            </div>
                            <p>Please arrive 15 minutes early to complete any necessary paperwork. If you need to reschedule or have any questions, feel free to contact us at <strong>+91 7291078244</strong>.</p>
                            <p>We look forward to seeing you!</p>
                            <div class="footer">
                                <p>Best regards,</p>
                                <p>The <strong>Care Connect</strong> Team</p>
                            </div>
                        </div>
                    </body>
                </html>`
        

};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send confirmation email');
    } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Appointment created and confirmation email sent');
    }
});
 
  res.status(200).json({
    success: true,
    message: "Appointment sent successfully",
    appointment,
  });
});

//get all appointments
export const getAllAppointment = asyncerror(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

//update appointment
export const updateAppointmentStatus = asyncerror(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true, //ensure return the updated item
    runValidators: true, //ensures that validators defined in schema is runs when update Operation execuetes
    useFindAndModify: false, //ensures mongoose use FindOneupdate()method rather then findandmodify
  });
  res.status(200).json({
    success: true,
    message: "appointment status updated",
    appointment,
  });
});

//delete appointment
export const deleteAppointment = asyncerror(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "appointment Deleted",
  });
});
