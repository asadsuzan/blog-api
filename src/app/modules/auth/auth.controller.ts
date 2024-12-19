


import { Request, Response } from "express";

import sendSuccessResponse from "../../utils/successResponse";
import { authServices } from "./auth.service";

// register new user 
const registerUser =  async (req: Request, res: Response) => {
    const payload = req.body 
    // create new user in database
    const newUser = await authServices.createUserInDb(payload);

    sendSuccessResponse(res, 201,"User registered successfully", newUser)


}

// login user
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // login user
    const token = await authServices.loginUser(email, password);

    sendSuccessResponse(res, 200, "User logged in successfully", {token });
}
export const authControllers = {
    registerUser,
    loginUser
}