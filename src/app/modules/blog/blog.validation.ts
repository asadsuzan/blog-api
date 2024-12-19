



import { z } from "zod";
// crate zod validation schema for create new blog post

const createBlogSchema = z.object({
    body:z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        content: z.string({
            required_error: "Content is required"
        }),
    })
})
// crate zod validation schema for update existing blog post

const updateBlogSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional()
    })
})

export const blogValidations = {
    createBlogSchema,
    updateBlogSchema
}
