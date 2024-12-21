/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import TUser from "../user/user.interface";
import bcrypt from 'bcrypt';
import User from "../user/user.model";
import { AppError } from "../../error/appError";
import generateAuthToken from './../../utils/generateAuthToken';


// crate new user in database
const createUserInDb = async (user: TUser) => {
 
    const {password,name,email} = user; 

    // check if user with email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("User with this email already exists", 400);
    }

    // hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // crate user in database
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    // save user in database
    await newUser.save();

   // Exclude specified fields from the returned user object  
   const { password: Password, isBlocked, role, ...userResponse } = newUser.toObject();  
    return userResponse;


}

// login user
const loginUser = async (email: string, password: string) => {
    // find user with email
    const user = await User.findOne({ email });
    // check if user exists and is not blocked
    
    // if (!user || user.isBlocked) {
    //     throw new AppError("Invalid credentials", 401);
    // }
    if(!user){
        throw new AppError("User Not Found", 401);
    }
    if(user.isBlocked){
        throw new AppError("User is blocked", 401);
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
    }
    // generate jwt token
  
    const token = generateAuthToken((user._id as unknown) as string, (user.role as unknown) as string);
    return token;
}
export const authServices= {
    createUserInDb,
    loginUser
}