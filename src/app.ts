import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { HTTP_STATUS } from "./constants/httpStatus";
import notFound from "./middlewar/notFound";
import { router } from "./routes";


const app = express();


// APPLICATION LEVEL MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// APPLICATION ROUTE MIDDLEWARE
app.use("/api/v1", router);


// APPLICATION ROOT ROUTE
app.use("/", (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: "Success",
        message: "Wellcome to my portfolio server 🚀"
    })
});


// NOT-FOUND ROUTE
app.use(notFound);

export default app;