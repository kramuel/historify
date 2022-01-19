import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: '/home/kramuel/Projects/historify/.env' })
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
})
export = pool