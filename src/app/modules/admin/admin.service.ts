import { AppError } from "../../error/appError";
import Blog from "../blog/blog.model";

import User from "../user/user.model";

// block a user in database
const blockUserInDb = async (userId: string) => {
    // find user in database
    const user = await User.findById(userId);
    // if user not found, throw error
    if (!user) {
        throw new AppError('User not found',404);

    }
    // check if the user is already blocked
    if (user.isBlocked) {
        throw new AppError('User is already blocked',400);
    }

    // update user status to blocked
    user.isBlocked = true;
    await user.save();
    return user;
}


// delete a blog post

const deleteBlogInDb = async(blogId:string)=>{
    // find the blog post by id
    const blog = await Blog.findByIdAndDelete(blogId);
    if(!blog){
        throw new AppError("Blog not found",404);
    }
    
    return blog;
}

export const adminServices={
    blockUserInDb,
    deleteBlogInDb
}