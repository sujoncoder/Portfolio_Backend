import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import Blog from "./blog.model";
import { ApiError } from "../../error/apiError";
import { BLOG_STATUS } from "./blog.interface";


// CREATE BLOG CONTROLLER
export const createBlog = catchAsync(async (req: Request, res: Response) => {
    const blogData = {
        ...req.body,
        author: req.user.id,
        publishedDate: req.body.status === BLOG_STATUS.PUBLISHED ? new Date() : undefined
    };
    const newBlog = await Blog.create(blogData);
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.CREATED,
        message: "Blog created successfully",
        data: newBlog
    });
});


// GET ALL BLOG CONTROLLER
export const getAllBlog = catchAsync(async (req: Request, res: Response) => {
    const blogs = await Blog.find();
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Retrived all blogs successfully",
        data: {
            total: blogs.length,
            blogs
        }
    });
});


// GET SINGLE BLOG BU SLUG CONTROLLER
export const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const blog = await Blog.findOneAndUpdate(
        { slug, status: BLOG_STATUS.PUBLISHED },
        { $inc: { views: 1 } },
        { new: true }
    ).populate("author", "name email");

    if (!blog) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Blog not found");
    };
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Blog retrived successfully",
        data: blog
    });
});


// UPDATE SINGLE BLOG CONTROLLER
export const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = { ...req.body };

    const blog = await Blog.findById(id);

    if (!blog) { throw new ApiError(HTTP_STATUS.NOT_FOUND, "Blog not found!") };

    if (updates.status === BLOG_STATUS.PUBLISHED && !blog.publishedDate) {
        updates.publishedDate = new Date();
    };
    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Blog updated successfully",
        data: updatedBlog
    });
});


// DELETE SINGLE BLOG CONTROLLER
export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id, { new: true });

    if (!deletedBlog) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Blog not-found !")
    };
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Deleted blog successfully",
        data: deletedBlog
    });
});