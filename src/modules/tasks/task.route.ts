import express, { Router } from "express";
import * as TaskController from './task.controller'

const taskRouter: Router = express.Router();

taskRouter.post("/", TaskController.createTaskHandler);

taskRouter.get("/", TaskController.getTasksHandler);

taskRouter.get("/:id", TaskController.getTaskHandler);

taskRouter.patch("/:id", TaskController.updateTaskHandler);

taskRouter.delete("/:id", TaskController.deleteTaskHandler);

export default taskRouter;