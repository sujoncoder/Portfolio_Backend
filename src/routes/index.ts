import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { projectRoutes } from "../modules/project/project.route";


// DEFAULT ROUTE
export const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/projects",
        route: projectRoutes
    },
];

// LOOP ALL ROUTE
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
});