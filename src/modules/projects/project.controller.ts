import { NextFunction, Request, Response } from "express";
import { IProject } from "./project.schema";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "./project.service";
import { RequestWithUser } from "src/interfaces/helper";

export async function createProjectHandler(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: IProject = req.body
    const response = await createProject({ ...body, owner: req.user?._id! });

    res.json(response);
  } catch (e: any) {
    return next(e)
  }
}

export async function getProjectsHandler(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  try {
    const response = await getProjects(req.user?._id?.toString()!);

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