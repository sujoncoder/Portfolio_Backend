import { Router } from "express";

import { checkAuth } from "../../middlewar/checkAuth";
import { validateRequest } from "../../middlewar/validateRequest";

import { projectValidationSchema, updateProjectValidationSchema } from "./project.validation";
import { createProject, deleteProject, getAllProject, getProject, updateProject } from "./project.controller";


export const projectRoutes = Router()
    .post("/create-project", checkAuth, validateRequest(projectValidationSchema), createProject)
    .get("/", getAllProject)
    .get("/:id", getProject)
    .patch("/:id", checkAuth, validateRequest(updateProjectValidationSchema), updateProject)
    .delete("/:id", checkAuth, deleteProject);