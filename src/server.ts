import { setupApp } from './app'
import env from './configs'
import connectToDatabase from './lib/connectDatabase';
import projectRoutes from './modules/projects/project.route'
import taskRoutes from './modules/tasks/task.route'
import authRouter from './modules/auth/auth.route'

init()

async function init() {
    try {
        const app = setupApp(
            authRouter,
            projectRoutes,
            taskRoutes,
        )

        connectToDatabase(() => {
            app.listen(env.PORT, () => {
                console.log(`Task App Listening on Port ${env.PORT}`)
            })
        });
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`)
        process.exit(1)
    }
}

