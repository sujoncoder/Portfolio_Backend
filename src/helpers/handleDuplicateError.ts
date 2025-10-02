/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TGenericErrorResponse } from "../interface/error.types";


// HANDLE DUPLICATE ERROR
export const handlerDuplicateError = (err: any): TGenericErrorResponse => {
    const matchedArray = err.message.match(/"([^"]*)"/)
    return {
        statusCode: 400,
        message: `${matchedArray[1]} already exists !`
    };
};