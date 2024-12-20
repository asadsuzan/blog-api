

// create a new blog post

import { Response} from "express";
import { blogServices } from "./blog.service";
import sendSuccessResponse from "../../utils/successResponse";
import CustomRequest from "../../constants/CustomRequest";


const createBlog = async(req:CustomRequest,res:Response)=>{
    req.body.author = req.user.userId;
    // create new blog post in database
    const blog = await blogServices.createBlog(req.body);
   
    sendSuccessResponse(res,201,"Blog created successfully",blog)
}
// update a blog post

const updateBlog = async(req:CustomRequest,res:Response)=>{
    
    // update blog post in database
    const updatedBlog = await blogServices.updateBlogInDb(req.params.id,req.user.userId,req.body);
    sendSuccessResponse(res,200,"Blog updated successfully",updatedBlog)
}

// delete a blog post

const deleteBlog = async(req:CustomRequest,res:Response)=>{
    // delete blog post from database
    await blogServices.deleteBlogInDb(req.params.id,req.user.userId);
    sendSuccessResponse(res,200,"Blog deleted successfully")
}

// get all blog posts

const getAllBlogs = async(req:CustomRequest,res:Response)=>{
    const blogs = await blogServices.getAllBlogsFromDb(req.query);
    sendSuccessResponse(res,200,"Blogs fetched successfully",blogs)
}
export const blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}