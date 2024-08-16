class ErrorHandler extends Error{
   constructor (message,statuscode){
    super(message);
 
    this.statuscode=statuscode;
   };
}
export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "internal server error";
    err.statuscode=err.statuscode || 500;
    //when duplicate value entered in mongodb then it gives error of 11000 code 
    if (err.code===11000) {
        const message="Duplicate Value Entered!";
        err= new ErrorHandler (message,400);
        }
    //Json webtoken error
    if (err.name==="JsonWebTokenError") {
        const message="Json web token invalid, Try again!";
        err=new ErrorHandler (message,400);
    }
    if (err.name==="TokenExpiredError") {
        const message="Json web token is expired, Try again!";
        err=new ErrorHandler(message,400);
    }
    //cast error comes when we entered the value with incorrect type or validation error
    if (err.name==="CastError") {
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400);
        
    }
    const errormessage= err.errors? Object.values(err.errors).map(error=>error.message).join(" "):err.message;
    return res.status(err.statuscode).json({
        success:false,
        message:errormessage,
    }
    );
}
export default ErrorHandler;