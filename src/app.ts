import type { Request, Response, Express } from 'express'
import express, { Router } from 'express'
import ErrorMiddleware from './middlewares/errors.middleware';
import PreRouteMiddleware from './middlewares/pre-route.middleware';
import projectRouter from './modules/projects/project.route';


export const setupApp = (...routes: Router[]) => {
    const app: Express = express();

    PreRouteMiddleware(app)

    // Ping route for health checks
    app.get('/ping', (req: Request, res: Response) => {
        res.status(200).json({ message: 'pong' })
    })

    app.use(projectRouter);

    

    // handle errors && 404
    ErrorMiddleware(app)

    return app
}