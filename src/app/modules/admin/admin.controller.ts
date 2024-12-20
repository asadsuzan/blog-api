// block a user 

import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import sendSuccessResponse from "../../utils/successResponse";

const blockSingleUser = async (req: Request, res: Response) => {
    const {userId} = req.params
 // block user in database

 const blockedUser = await adminServices.blockUserInDb(userId);
 sendSuccessResponse(res,200,"User blocked successfully",blockedUser)
}

// delete a blog post
const deleteBlog = async (req: Request, res: Response) => {
    const {id} = req.params
    // delete blog post
    await adminServices.deleteBlogInDb(id);
    sendSuccessResponse(res,200,"Blog post deleted successfully")
}

export const adminControllers= {
    blockSingleUser,
    deleteBlog
}