import { asyncerror } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userschema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"
export const patientRegistration = asyncerror(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("please fill full form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler("already registered! Try with different account", 400)
    );
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user, "succesfully Registered", 200, res);
});


//login user
export const patientLogin = asyncerror(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("please fill full form", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password is not matched", 400)
    );
  }
  const ispasswordmatched = await user.comparePassword(password);
  if (!ispasswordmatched) {
    return next(new ErrorHandler("Invalid password or email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  generateToken(user, "logged in succesfully", 200, res);
});

//Add New Admin
export const addAdmin = asyncerror(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("please Fill Full form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this account is already registered`
      )
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "Admin Registered Succesfully",
  });
});

//get all doctors
export const getAllDoctors = asyncerror(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

//getuserdetails
export const getUserDetails = asyncerror(async (req, res, next) => {
  const user = await req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

/*when httpOnly attribute set to true for cookie then
it increase the security of cookie by preventing client side scripting for accessing it  */

//logout Admin
export const logoutAdmin = asyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("AdminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure:true,
        sameSite:"None"
    })
    .json({
      success: true,
      message: "logged out succesfully",
    });
});

//logout patient
export const logoutPatient = asyncerror(async (req, res, next) => {
  res
    .status(200)
    .cookie("PatientToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure:true,
        sameSite:"None"
    })
    .json({
      success: true,
      message: "logged out succesfully",
    });
});

//add doctors
export const addNewDoctor = asyncerror(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar required!", 400));
  }
  const { docavtar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docavtar.mimetype)) {
    return next(new ErrorHandler("File Format not supported !", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    doctordepartment,
    password,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !dob ||
    !gender ||
    !doctordepartment ||
    !password
  ) {
    return next(new ErrorHandler("Please Provide full details!", 400));
  };
  const isRegistered=await User.findOne({email});
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} with this account already exists`, 400));
  };

  const cloudinaryResponse=await cloudinary.uploader.upload(docavtar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("cloudinary error",cloudinaryResponse.error||"unknown cloudinary error");
  };
  const doctor=await User.create({firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    doctordepartment,
    password,role:"Doctor", docavtar:{
      public_id:cloudinaryResponse.public,
      url:cloudinaryResponse.secure_url,
    }
  }
);

res.status(200).json({
  success:true,
  message:"Doctor registered succesfully",
  doctor
})

});
