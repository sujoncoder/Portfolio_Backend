import { Server } from "http";
import app from "./app"
import { SECRET } from "./config/env";
import connectDB from "./config/database";
import gracefulShutdown, { setServer } from "./config/shutdown";
import seedAdmin from "./utils/seedAdmin";


let server: Server;

// START SERVER FUNCTION
const startServer = async () => {
    await connectDB();
    server = app.listen(SECRET.PORT, () => {
        console.log(`➡️  Server is running on http://localhost:${SECRET.PORT}`)
    });

    setServer(server);
};


// CALL SYNCHRONIZING ===> FIRST START SERVER THEN SEEDING SUPER ADMIN
(async () => {
    await startServer();
    await seedAdmin()
})();


// UNHANDLE REJECTION ERROR
process.on("uncaughtException", (error) => gracefulShutdown("Uncaught Exception", error));

// UNCAUGHT REJECTION ERROR
process.on("unhandledRejection", (error) => gracefulShutdown("Unhandled Rejection", error));

// SIGNAL TERMINATION SIGTERM
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));