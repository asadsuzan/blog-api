// crate user schema for mongoose

import { model, Schema } from "mongoose";
import TUser from "./user.interface";

// const userSchema = new Schema<TUser>({

//     name: {
//         type: String,
//         trim: true,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
  
//     role: {
//         type: String,
//         enum: ["admin", "user"],
//         default: "user",
//     },
//     isBlocked:{
//         type: Boolean,
//         default: false,
//     }


// },
// {
//     timestamps: true,
//     versionKey: false,
// }
// )

// crete user model

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  }, {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        // Remove sensitive fields
        delete ret.password;
        delete ret.role;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.isBlocked
        return ret;
      }
    },
    toObject: {
      transform: function (doc, ret) {
        // Remove sensitive fields
        delete ret.password;
        delete ret.role;
        delete ret.isBlocked
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      }
    }
  });
  


const User = model<TUser>("User", userSchema);

export default User;