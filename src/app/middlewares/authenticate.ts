import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import CustomRequest from '../constants/CustomRequest';
import { AppError } from '../error/appError';
import User from '../modules/user/user.model';

export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
           
            next(new AppError('Unauthorized: No token provided', 401));
        }

         // Decode the token and check for expiration
        const decoded = jwt.verify(token as string, config.JWT_SECRET as string) as jwt.JwtPayload;
        req.user = decoded;
          // check if the user is blocked
          const user =await User.findById(decoded.userId);
          if(!user){
            return next(new AppError('Unauthorized: User not found', 401));
          }else if(user && user.isBlocked){
            return next(new AppError('Unauthorized: User is blocked', 401));
          }
          
        //   if(user && user.isBlocked){
        //     return next(new AppError('Unauthorized: User is blocked', 401));
        //   }
          
        next();
     
    } catch (error: unknown) {
        // Type guard to check if the error is a JWT error
        if (error instanceof jwt.JsonWebTokenError) {
            if (error.name === 'TokenExpiredError') {
                return next(new AppError('Unauthorized: Token has expired', 401));
            } else if (error.name === 'JsonWebTokenError') {
                return next(new AppError('Unauthorized: Invalid token', 401));
            }
        }

        // Handle other unknown errors
        return next(new AppError('Unauthorized: Unable to authenticate', 401, error as Error));
    }
};
  export default authenticate;