import express from "express";
import asyncHandler from "../../utils/asyncHandler";
import { adminControllers } from "./admin.controller";
import authenticate from "../../middlewares/authenticate";
import isAdmin from "../../middlewares/isAdmin";

const router = express.Router();

// block a user
router.patch('/users/:userId/block',authenticate,isAdmin, asyncHandler(adminControllers.blockSingleUser));

// delete a blog post
router.delete('/blogs/:id',authenticate,isAdmin, asyncHandler(adminControllers.deleteBlog));


const AdminRoutes = router;

export default AdminRoutes;