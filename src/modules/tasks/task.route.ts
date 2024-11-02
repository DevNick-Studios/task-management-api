import express, { Router } from "express";
import * as TaskController from './task.controller'
import { isAuthenticated, isProjectOwner } from "../../middlewares/authenticate.middleware";
import validateRequest from "../../middlewares/validate-request";
import { taskSchema } from "./task.schema";

const taskRouter: Router = express.Router();

// Every access must be authenticated
taskRouter.use(isAuthenticated)

taskRouter.post("/projects/:projectId/tasks", validateRequest(taskSchema), isProjectOwner, TaskController.createTaskHandler);

taskRouter.get("/projects/:projectId/tasks/", isProjectOwner, TaskController.getTasksHandler);

taskRouter.get("/projects/:projectId/tasks/:taskId", isProjectOwner, TaskController.getTaskHandler);

taskRouter.patch("/projects/:projectId/tasks/:taskId", isProjectOwner, TaskController.updateTaskHandler);

taskRouter.delete("/projects/:projectId/tasks/:taskId", isProjectOwner, TaskController.deleteTaskHandler);

export default taskRouter;
