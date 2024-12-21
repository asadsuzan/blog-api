import { NextFunction, Response } from "express";
import CustomRequest from "../constants/CustomRequest";
import { AppError } from "../error/appError";

// Middleware for admin authorization
const isAdmin = (req:CustomRequest, res:Response, next:NextFunction) => {
    if(req.user.role !== 'admin'){
        next(new AppError( 'Admin access required', 401));
        return
    }
    
    next();
  };

  export default isAdmin;