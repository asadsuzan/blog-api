// import { model, Schema } from "mongoose";
// import TBlog from "./blog.interface";


// // crate blog schema for mongoose
// const blogSchema = new Schema<TBlog>({
//     title: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     }
// },{
//     timestamps: true,
//     versionKey: false
// }
// )

// // crete blog model
// const Blog = model<TBlog>("Blog", blogSchema);

// export default Blog;


import { model, Schema } from "mongoose";
import TBlog from "./blog.interface";

// Create blog schema for mongoose
const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Enable createdAt and updatedAt fields
    versionKey: false, // Disable __v field
    toJSON: {
      virtuals: false, // Include virtual fields, if any
      transform: function (doc, ret) {
        // Exclude fields here
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
    toObject: {
      virtuals: false, // Include virtual fields, if any
      transform: function (doc, ret) {
        // Exclude fields here
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

// Create blog model
const Blog = model<TBlog>("Blog", blogSchema);

export default Blog;
