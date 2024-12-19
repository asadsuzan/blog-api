
import express from "express";
import { authControllers } from "./auth.controller";
import validateRequestBody from "../../utils/validateReqBody";
import { userValidations } from "../user/user.validation";
import asyncHandler from "../../utils/asyncHandler";

const router = express.Router();

// register new user
router.post("/register", validateRequestBody(userValidations.createUserSchema), asyncHandler(authControllers.registerUser));

// login user
router.post("/login", validateRequestBody(userValidations.loginSchema), asyncHandler(authControllers.loginUser));

const AuthRoutes = router;

export default AuthRoutes;