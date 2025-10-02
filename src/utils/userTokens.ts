import type { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../config/env";
import { HTTP_STATUS } from "../constants/httpStatus";
import { generateToken, verifyToken } from "./jwt";
import type { IUser } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import { ApiError } from "../error/apiError";


// CREATE USER TOKEN
export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        id: user._id,
        email: user.email
    };

    const accessToken = generateToken(jwtPayload, SECRET.JWT_ACCESS_SECRET, SECRET.JWT_ACCESS_EXPIRES);

    const refreshToken = generateToken(jwtPayload, SECRET.JWT_REFRESH_SECRET, SECRET.JWT_REFRESH_EXPIRES);

    return {
        accessToken,
        refreshToken
    };
};


// CREATE NEW ACCESS TOKEN WITH REFRESH TOKEN
export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, SECRET.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

    if (!isUserExist) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "User does not exist !")
    };

    const jwtPayload = { email: isUserExist.email };

    const accessToken = generateToken(jwtPayload, SECRET.JWT_ACCESS_SECRET, SECRET.JWT_ACCESS_EXPIRES);

    return accessToken;
};