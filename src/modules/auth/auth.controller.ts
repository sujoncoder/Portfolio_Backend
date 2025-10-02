import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/httpStatus";
import { getNewAccessTokenService, loginService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookie";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ApiError } from "../../error/apiError";



// LOGIN CONTROLLER
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await loginService(req.body);

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User logged in successfully",
        data: loginInfo
    });
});


// GET NEW ACCESS TOKEN CONTROLLER
export const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "No refresh token received from cookies !")
    };

    const tokenInfo = await getNewAccessTokenService(refreshToken as string);

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "New access token retrieved successfully",
        data: tokenInfo
    });
});


// LOGOUT CONTROLLER
export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });


    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    sendResponse(res, {
        success: true,
        statusCode: HTTP_STATUS.OK,
        message: "User logout successfully",
        data: null
    });
});