import { setupApp } from './app'
import env from './configs'
// import adminRoutes from './modules/admin/admin.routes'

init()

async function init() {
    try {
        const app = setupApp(
            // adminRoutes,
        )
        app.listen(env.PORT, () => {
            console.log(`Task App Listening on Port ${env.PORT}`)
        })
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`)
        process.exit(1)
    }
}

