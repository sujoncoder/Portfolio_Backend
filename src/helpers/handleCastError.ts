/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import type { TGenericErrorResponse } from "../interface/error.types";




// HANDLE CAST ERROR
export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectID. Please provide a valid ID"
    };
};