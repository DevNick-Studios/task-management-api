import express, { Router } from "express";
import * as ProjectController from './project.controller'
import { isAuthenticated, isProjectOwner } from "../../middlewares/authenticate.middleware";
import validateRequest from "../../middlewares/validate-request";
import { projectSchema } from "./project.schema";

const projectRouter: Router = express.Router();

// Every access must be authenticated
projectRouter.use(isAuthenticated)

projectRouter.post("/projects", validateRequest(projectSchema), ProjectController.createProjectHandler);

projectRouter.get("/projects", ProjectController.getProjectsHandler);

projectRouter.get("/projects/:id", isProjectOwner, ProjectController.getProjectHandler);

projectRouter.patch("/projects/:id", isProjectOwner, ProjectController.updateProjectHandler);

projectRouter.delete("/projects/:id", isProjectOwner, ProjectController.deleteProjectHandler);

export default projectRouter;