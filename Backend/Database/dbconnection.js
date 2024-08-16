import mongoose from "mongoose";
export const dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"Hospital_Management_System"
    }).then(()=>{
        console.log("database is connected");
    }).catch((err)=>{
        console.log(err);
    })
}