import { Message } from "../models/messageschema.js";
import { asyncerror } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/errorMiddleware.js'
export const sendMessage = asyncerror(async (req, res, next) => {
  //get all data from body
  const { firstName, lastName, email, message, phoneNumber } = req.body;
  //all the data should exists
  if (
    !firstName ||
    !lastName ||
    !email ||
    !message ||
    !phoneNumber
  ) {
    return next(new ErrorHandler("please fill full form",400));
  }
  //else
  await Message.create({ firstName,lastName,email,message,phoneNumber });
  return res.status(200).json({
    success: true,
    message: "message send succesfully",
  });
});



//get AllMessages
export const getAllMessages=asyncerror(async(req,res,next)=>{
  const messages=await Message.find();
  res.status(200).json({
    success:true,
    messages,
  }); 
})
