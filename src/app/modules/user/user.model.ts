// crate user schema for mongoose

import { model, Schema } from "mongoose";
import TUser from "./user.interface";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
  
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isBlocked:{
        type: Boolean,
        default: false,
    }


},
{
    timestamps: true,
}
)

// crete user model
const User = model<TUser>("User", userSchema);

export default User;