import { Router } from "express";
import { createBlog, deleteBlog, getAllBlog, getBlogBySlug, updateBlog } from "./blog.controller";
import { checkAuth } from "../../middlewar/checkAuth";
import { validateRequest } from "../../middlewar/validateRequest";


export const blogRoutes = Router()
    .get("/", getAllBlog)
    .post("/create-blog", checkAuth, createBlog)
    .get("/:slug", getBlogBySlug)
    .patch("/:id", checkAuth, updateBlog)
    .delete("/:id", checkAuth, deleteBlog);