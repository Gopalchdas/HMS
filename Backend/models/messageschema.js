import mongoose from "mongoose";
import validator from "validator";
const messageschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must contain 3 characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must contain 3 characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide valid email !"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"message must contain atleast 10 characters !"],
        maxLength:[200,"message can contain upto 200 characters !"]
    },
    phoneNumber:{
        type:String,
        required:true,
        minLength:[10,"phone number must contain exact 10 digits !"],
        maxLength:[10,"phone number must contain exact 10 digits !"]
        
    }
    
});
export const Message=mongoose.model("Message",messageschema);
