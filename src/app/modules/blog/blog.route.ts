import express from 'express';
import validateRequestBody from '../../utils/validateReqBody';
import { blogValidations } from './blog.validation';
import asyncHandler from '../../utils/asyncHandler';
import { blogControllers } from './blog.controller';
import authenticate from '../../middlewares/authenticate';

const router  = express.Router();

// create a new blog post
router.post('/',authenticate,validateRequestBody(blogValidations.createBlogSchema),asyncHandler(blogControllers.createBlog));

// update a blog post
router.patch('/:id',authenticate,validateRequestBody(blogValidations.updateBlogSchema),asyncHandler(blogControllers.updateBlog));
const BlogRoutes = router;

// delete a blog post
router.delete('/:id',authenticate,asyncHandler(blogControllers.deleteBlog));

// get all blog posts // public route
router.get('/',asyncHandler(blogControllers.getAllBlogs));
export default BlogRoutes;