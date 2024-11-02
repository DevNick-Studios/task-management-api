import express, { Router } from "express";
import * as ProjectController from './project.controller'

const projectRouter: Router = express.Router();

projectRouter.post("/", ProjectController.createProjectHandler);

projectRouter.get("/", ProjectController.getProjectsHandler);

projectRouter.get("/:id", ProjectController.getProjectHandler);

projectRouter.patch("/:id", ProjectController.updateProjectHandler);

projectRouter.delete("/:id", ProjectController.deleteProjectHandler);

export default projectRouter;