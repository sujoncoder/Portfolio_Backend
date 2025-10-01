import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { HTTP_STATUS } from "../../constants/httpStatus";
import type { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ApiError } from "../../error/apiError";
import { SECRET } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";


// LOGIN SERVICE
export const loginService = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    if (!email || !password) throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email and password are required.");

    const user = await User.findOne({ email });

    if (!user) throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User not exist !");

    const matchPassword = await bcrypt.compare(password as string, user.password);

    if (!matchPassword) throw new ApiError(HTTP_STATUS.BAD_REQUEST, " Incorrect password !");

    const userToken = createUserTokens(user);

    const { password: pass, ...rest } = user.toObject();

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    };
};


// GET NEW ACCESS TOKEN SERVICE
export const getNewAccessTokenService = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken: newAccessToken
    };
};