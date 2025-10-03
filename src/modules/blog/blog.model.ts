import { Schema, model } from "mongoose";
import { BLOG_CATEGORIES, BLOG_STATUS, type IBlog } from "./blog.interface";


// BLOG SCHEMA
const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    featuredImage: { type: String, required: true },
    category: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: Object.values(BLOG_CATEGORIES),
            message: "{VALUE} is not a valid category"
        }
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: Object.values(BLOG_STATUS),
            message: "{VALUE} is not a valid status"
        },
        default: BLOG_STATUS.DRAFT
    },
    publishedDate: { type: Date },
    readTime: { type: Number, required: true },
    views: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;