// import { NextFunction, Response } from "express";


// import jwt from 'jsonwebtoken';
// import config from "../config";
// import CustomRequest from "../constants/CustomRequest";

// // Middleware for authentication
// const authenticate = async (req:CustomRequest, res:Response, next:NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//          res.status(401).json({
//             status: "error",
//             message: "Unauthorized"
//         })
//         return;
//     }
  
//     try {
//       const decoded = jwt.verify(token, config.JWT_SECRET as string);
//       req.user = decoded as { _id: string };
//       next();
//     } catch (err) {
//     next(err)
//     }
//   };

//   export default authenticate;
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import CustomRequest from '../constants/CustomRequest';
import { AppError } from '../error/appError';

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
           
            next(new AppError('Unauthorized: No token provided', 401));
        }

        const decoded = jwt.verify(token as string, config.JWT_SECRET as string);
        req.user = decoded;
    
          
        next();
     
    } catch (error) {
        next(new AppError('Unauthorized: Invalid token', 401,error));
    }
};
  export default authenticate;