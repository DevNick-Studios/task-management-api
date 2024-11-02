import { Request as ExpressRequest } from "express";
import { IUser } from "../../../interfaces/schema";

// Extend the Request interface to include the user property when the middleware is used
// declare module "express-serve-static-core" {
//   interface User extends User {}
//   interface Request {
//     user?: User;
//   }
// }

// export {}

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}