import type { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HTTP_STATUS } from "../../constants/httpStatus";

import Skill from "./skill.model";
import { ApiError } from "../../error/apiError";


// ADD SKILL CONTROLLER
export const addSkill = catchAsync(async (req: Request, res: Response) => {
    const skill = await Skill.create(req.body);
    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.CREATED,
        message: "Added new skill successfully",
        data: skill
    });
});


// GET ALL SKILL CONTROLLER
export const getAllSkill = catchAsync(async (req: Request, res: Response) => {
    const skills = await Skill.find();

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Retrived all skills successfully",
        data: {
            total: skills.length,
            skills
        }
    });
});


// UPDATE SKILL CONTROLLER
export const updateSkill = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bodyData = req.body;
    const isExist = await Skill.findById(id);

    if (!isExist) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Skill not exist !")
    };

    const skill = await Skill.findByIdAndUpdate(id, bodyData, { new: true, runValidators: true });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Skill Updated successfully",
        data: skill
    });
});


// DELETE SKILL CONTROLLER
export const deleteSkill = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const isExist = await Skill.findById(id);

    if (!isExist) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, "Skill not exist !")
    };

    const skill = await Skill.findByIdAndDelete(id, { new: true });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "Skill deleted successfully",
        data: skill
    });
});