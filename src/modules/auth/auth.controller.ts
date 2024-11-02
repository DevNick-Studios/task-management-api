import { NextFunction, Request, Response } from "express";
import { login, register } from "./auth.services";
import { ILogin, IRegister } from "./auth.schema";

export async function registerUserHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: IRegister = req.body
    const user = await register(body);
    
    res.json(user);
  } catch (e: any) {
    return next(e)
  }
}

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body: ILogin = req.body
    const user = await login(body);
    
    res.json(user);
  } catch (e: any) {
    console.error(e);
    return next(e)
  }
}
