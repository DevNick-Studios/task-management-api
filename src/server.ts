import { app } from './app'
import env from './configs'
import connectToDatabase from './lib/connectDatabase';

init()

async function init() {
    try {
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

