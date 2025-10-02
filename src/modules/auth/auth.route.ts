import { Router } from "express";
import { getNewAccessToken, login, logout } from "./auth.controller";


// AUTH ROUTES
export const authRoutes = Router()
    .post("/login", login)
    .post("/refresh-token", getNewAccessToken)
    .post("/logout", logout);