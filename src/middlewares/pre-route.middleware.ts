import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'

export default function PreRouteMiddleware (app: Application) {
    app.use(cors());
    app.use(express.urlencoded({ extended: false })) // parses form submissions
    app.use(express.json()) // parses json
    app.use(helmet()) // additional security layer by auto setting some important headers
    app.disable('x-powered-by') // remove powered by express header for security purposes
}