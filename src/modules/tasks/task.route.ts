import express, { Router } from "express";
import * as TaskController from './task.controller'
import { isAuthenticated, isProjectOwner } from "../../middlewares/authenticate.middleware";
import validateRequest from "../../middlewares/validate-request";
import { taskSchema } from "./task.schema";

const taskRouter: Router = express.Router();

// Every access must be authenticated
taskRouter.use(isAuthenticated)

taskRouter.post("/tasks", validateRequest(taskSchema), TaskController.createTaskHandler);

taskRouter.get("/tasks", TaskController.getTasksHandler);

taskRouter.get("/tasks/:id", isProjectOwner, TaskController.getTaskHandler);

taskRouter.patch("/tasks/:id", isProjectOwner, TaskController.updateTaskHandler);

taskRouter.delete("/tasks/:id", isProjectOwner, TaskController.deleteTaskHandler);

export default taskRouter;
