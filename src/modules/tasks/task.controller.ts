import { NextFunction, Request, Response } from "express";
import { ITask } from "./task.schema";
import { createTask, deleteTask, getTask, getTasks, updateTask, updateTaskStatuses } from "./task.service";

export async function createTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: ITask = req.body
    const response = await createTask({ ...body, project: req.params.projectId });

    res.status(201).json(response);
  } catch (e: any) {
    return next(e)
  }
}


export const getTasksHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const { status, due_date, page = '1', limit = '10', sortBy = 'due_date', sortOrder = 'asc' } = req.query;

    const filters: any = {};
    if (status) filters.status = status;
    if (due_date) filters.due_date = new Date(due_date as string);

    const result = await getTasks(
      projectId,
      filters,
      parseInt(page as string),
      parseInt(limit as string),
      sortBy as string,
      sortOrder as 'asc' | 'desc'
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function getTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await getTask(req.params.projectId, req.params.taskId);

    res.status(200).json(response);
  } catch (e: any) {
    return next(e)
  }
}

export async function updateTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: Partial<ITask> = req.body
    const response = await updateTask(req.params.projectId, req.params.taskId, body);
    res.status(200).json(response);

  } catch (e: any) {
    return next(e)
  }
}

export const updateTaskStatusesHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { taskIds, status } = req.body;

  try {
      const response = await updateTaskStatuses(taskIds, status);
      res.status(200).json(response);
  } catch (error) {
      next(error);
  }
};

export async function deleteTaskHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await deleteTask(req.params.projectId, req.params.taskId);

    res.status(200).json(response);
  } catch (e: any) {
    return next(e)
  }
}