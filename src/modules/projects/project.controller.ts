import { NextFunction, Request, Response } from "express";
import { IProject } from "./project.schema";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "./project.service";

export async function createProjectHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: IProject = req.body
    const response = await createProject(body);

    res.json(response);
  } catch (e: any) {
    return next(e)
  }
}

export async function getProjectsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await getProjects(req.params.id);

    res.json(response);
  } catch (e: any) {
    return next(e)
  }
}

export async function getProjectHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await getProject(req.params.id);

    res.json(response);
  } catch (e: any) {
    return next(e)
  }
}

export async function updateProjectHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: Partial<IProject> = req.body
    const response = await updateProject(req.params.id, body);
    res.json(response);

  } catch (e: any) {
    return next(e)
  }
}

export async function deleteProjectHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await deleteProject(req.params.id);

    res.json(response);
  } catch (e: any) {
    return next(e)
  }
}