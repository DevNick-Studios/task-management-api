import { Request } from 'express';
import { IUser } from './schema';

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface RequestWithUser extends Request {
  user?: IUser;
}
