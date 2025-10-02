/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TErrorSources, TGenericErrorResponse } from "../interface/error.types";



// HANDLE ZOD ERROR
export const handlerZodError = (err: any): TGenericErrorResponse => {
    const errorSources: TErrorSources[] = [];

    err.issues.forEach((issue: any) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });

    return {
        statusCode: 400,
        message: "Zod Error",
        errorSources
    };
};