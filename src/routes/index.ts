import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { projectRoutes } from "../modules/project/project.route";
import { skillRoutes } from "../modules/skill/skill.route";
import { blogRoutes } from "../modules/blog/blog.route";


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
    {
        path: "/skills",
        route: skillRoutes
    },
    {
        path: "/blogs",
        route: blogRoutes
    },
];

// LOOP ALL ROUTE
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
});