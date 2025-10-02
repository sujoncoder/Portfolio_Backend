import { type Request, type Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";



// NOT-ROUTE MATCH MIDDLEWARE
const notFound = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: `🔍 Route ${req.originalUrl} not found on Portfolio server.`,
    });
};

export default notFound;