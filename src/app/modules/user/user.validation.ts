

import { z } from "zod";
//zod validation schema for crate new user 

const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        email: z.string({
            required_error: "Email is required"
        }),
        password: z.string({
            required_error: "Password is required"
        }),
        role: z.enum(["admin", "user"]).optional().default('user'),
        isBlocked: z.boolean().optional().default(false)
    })
})

//zod validation schema for update existing user
const updateUserSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        role: z.enum(["admin", "user"]).optional(),
        isBlocked: z.boolean().optional()
    })
})

// user login schema

const loginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }),
        password: z.string({
            required_error: "Password is required"
        })
    })
})

export const userValidations = {
    createUserSchema,
    updateUserSchema,
    loginSchema
}