import express, { Router } from "express";
import * as AuthController from './auth.controller'
import validateRequest from "../../middlewares/validate-request";
import { loginUserSchema, registerUserSchema } from "./auth.schema";

const authRouter: Router = express.Router();

authRouter.post("/auth/register", validateRequest(registerUserSchema), AuthController.registerUserHandler);

authRouter.post("/auth/login", validateRequest(loginUserSchema), AuthController.loginHandler);


export default authRouter;