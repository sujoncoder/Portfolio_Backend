import { Router } from "express";
import { checkAuth } from "../../middlewar/checkAuth";
import { validateRequest } from "../../middlewar/validateRequest";
import { addSkill, deleteSkill, getAllSkill, updateSkill } from "./skill.controller";
import { skillValidationSchema, updateSkillValidationSchema } from "./skill.validation";


export const skillRoutes = Router()
    .post("/add-skill", checkAuth, validateRequest(skillValidationSchema), addSkill)
    .get("/", getAllSkill)
    .patch("/:id", checkAuth, validateRequest(updateSkillValidationSchema), updateSkill)
    .delete("/:id", checkAuth, deleteSkill);