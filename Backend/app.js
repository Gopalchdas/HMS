import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnection } from "./Database/dbconnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from './router/appointmentRouter.js'
const app = express();
config({ path: "./config/config.env" });


//connection to frontend with backend by using cors
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL,process.env.DASHBOARD_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
// express.json and expess.urlencoded are only used for post and put request beacause both of 
// them actually  send data to mongodb
// since we recieve data in mongo db in json format and to recongnise/parse the incoming Request Object as a JSON Object we need to use express.json 
app.use(express.json());
//to recongnise/parse the incoming Request Object as a string or array we need to use express.json 
app.use(express.urlencoded({extended:true}));
//to upload file
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",  
}));
app.use("/message",messageRouter);
app.use("/user",userRouter);
app.use("/appointment",appointmentRouter);
dbconnection();
app.use(errorMiddleware);

export default app;
