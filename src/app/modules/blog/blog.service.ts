
// create a new blog post 

import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../error/appError";
import TBlog from "./blog.interface";
import Blog from "./blog.model";

const createBlog = async(payload:TBlog)=>{
 const blog = await Blog.create(payload);
 await blog.populate("author");
 return blog;

}

// update a blog post

const updateBlogInDb = async(id:string,userId:string, payload:TBlog)=>{
 
  // find the blog post by _id and author
    const blog = await Blog.findOne({_id:id,author:userId}).populate("author");
    if(!blog){
        throw new AppError("Blog not found",404);
    }
    // update the blog post
    blog.set(payload);
    await blog.save();  
    return blog;
}

// delete a blog post

const deleteBlogInDb = async(id:string)=>{
    // find the blog post by id
    const blog = await Blog.findByIdAndDelete(id);
    if(!blog){
        throw new AppError("Blog not found",404);
    }
    
    return blog;
}

// get all blog posts with options for searching, sorting, and filtering.

const getAllBlogsFromDb = async(query:Record<string,unknown>)=>{
    // use QueryBuilder to construct the query
    const queryBuilder = new QueryBuilder(Blog.find(),query);
    queryBuilder.addSearch(["title","content"])
    queryBuilder.addSorting();
    queryBuilder.addFilter();

    // execute the query
    const blogs = await queryBuilder.queryModel.populate("author");
    return blogs;
}
export const blogServices = {
    createBlog,
    updateBlogInDb,
    deleteBlogInDb,
    getAllBlogsFromDb
}