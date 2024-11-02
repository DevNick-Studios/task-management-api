import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../configs';
import CustomError from '../utils/CustomError';
import { User } from '../modules/users/user.model';
import { Project } from '../modules/projects/project.model';

export const isAuthenticated = async  (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = extractTokenFromHeader(req)

        if (!token) throw new CustomError("You are Not Authenticated", 401)

        const decoded = jwt.verify(token, env.JWT_SEC) as jwt.JwtPayload

        const user = await User.findById(decoded.id).lean()

        if (!user) throw new CustomError('Unauthorized access: User does not exist', 401)

        req.user = user

        next()

    } catch (error) {
        next(error)
    }
}

export const isCurrentUser = async  (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user._id?.toString() === req.params.id) {
            next()
        } else {
            throw new CustomError('Unauthorized access: You are not allowed to perform this action', 403)
        }
    } catch (error) {
        next(error)
    }
}

export const isProjectOwner = async  (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await Project.findById(req.params.id).lean()

        if (!project) throw new CustomError('Project does not exist', 404)

        if (req.user._id?.toString() === project.owner.toString()) {
            next()
        } else {
            throw new CustomError('Unauthorized access: You are not allowed to access this project', 403)
        }
    } catch (error) {
        next(error)
    }
}

export const extractTokenFromHeader = (
  request: Request,
): string | undefined => {

  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
  