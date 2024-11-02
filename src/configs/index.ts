import * as dotenv from 'dotenv'
import { z } from 'zod'
// import path from 'node:path'

// Load the correct .env file based on the current NODE_ENV
// const envPath = path.resolve(
//     process.cwd(),
//     `.env.${process.env.NODE_ENV || 'development'}`
// )
dotenv.config({ path: '.env' })

// Define schema using zod for validation
const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: z.string().transform(Number).default('3000'),
    JWT_SEC: z.string(),
})

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
    console.log('❌ Invalid environment variables:', parsedEnv.error.format())
    process.exit(1) // Exit the application if environment validation fails
}

const env = parsedEnv.data

export default env
