import type { NextFunction, Request, Response, RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";

import { SECRET } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../error/apiError";



// CHECK AUTH MIDDLEWARE
export const checkAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies?.authorization || req.headers?.authorization;

        if (!accessToken) {
            throw new ApiError(403, "No token received!");
        };
        verifyToken(accessToken, SECRET.JWT_ACCESS_SECRET) as JwtPayload;
        next();
    } catch (error) {
        next(error);
    }
};