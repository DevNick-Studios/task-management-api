import type { Request, Response, Express } from 'express'
import express from 'express'
import ErrorMiddleware from './middlewares/errors.middleware';
import PreRouteMiddleware from './middlewares/pre-route.middleware';
import projectRoutes from './modules/projects/project.route'
import taskRoutes from './modules/tasks/task.route'
import authRouter from './modules/auth/auth.route'

const app: Express = express();

PreRouteMiddleware(app)

// Ping route for health checks
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: 'pong' })
})

app.use([authRouter, projectRoutes, taskRoutes]);

// handle errors && 404
ErrorMiddleware(app)

export { app }