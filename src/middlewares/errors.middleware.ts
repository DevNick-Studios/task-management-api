
import { Request, Response, NextFunction, Application } from 'express';
import CustomError from 'src/utils/CustomError';

export default function ErrorMiddleware (app: Application) {
    // custom 404 && this will replace default express Not Found response
    app.use((req, res) => {
        res.status(404).send('Sorry, Resource Not Found!')
    })

    // custom error handler && this will replace default express error respons
    app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500
        const message = err.message || err
        console.log('error', `status: ${status}, message: ${message}`)
        res.status(status).json({ message })
    })
}