import type { Request, Response } from "express";

import { ApiError } from "../../error/apiError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";

import Project from "./project.model";



// CREATE PROJECT CONTROLLER
export const createProject = catchAsync(async (req: Request, res: Response) => {
    const result = await Project.create(req.body);
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.CREATED,
        message: "Project created successfully",
        data: result
    });
});


// GET ALL PROJECT CONTROLLER
export const getAllProject = catchAsync(async (req: Request, res: Response) => {
    const result = await Project.find();
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Retrived all project successfully",
        data: result
    });
});


// GET SINGLE PROJECT CONTROLLER
export const getProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Project not found");
    };
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Retrived project successfully",
        data: project
    });
});


// UPDATE PROJECT CONTROLLER
export const updateProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const existingProject = await Project.findById(id);
    if (!existingProject) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Project not found");
    };

    const result = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Project updated successfully",
        data: result
    });
});


// DELETE PROJECT CONTROLLER
export const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id)
    if (!project) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Project not found");
    };
    const deletedProject = await Project.findByIdAndDelete(id, { new: true });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Project deleted successfully",
        data: deletedProject
    });
});