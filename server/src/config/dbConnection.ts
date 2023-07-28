import pg, { Pool } from 'pg'
import dotenv from 'dotenv'
import colors from 'colors'
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, PG_DATA, DB_CONNECTION_URI } from './index'

export const pool = new Pool({
    connectionString: DB_CONNECTION_URI,
    max: 20,
    idleTimeoutMillis: 30000,
})



