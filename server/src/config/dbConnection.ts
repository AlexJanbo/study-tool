import pg, { Pool } from 'pg'
import dotenv from 'dotenv'
import colors from 'colors'
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, PG_DATA, DB_CONNECTION_URI } from './index'


export const pool = new Pool({
    connectionString: DB_CONNECTION_URI,
    max: 20,
    idleTimeoutMillis: 30000,
})




export const databaseConnection = async() => {

    try {
        const client = new pg.Client(DB_CONNECTION_URI)
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
            }
            console.log("PostgreSQL database connected successfully".cyan)
            client.end
        })
        
    } catch (error) {
        console.log("ERROR ========== ON DB CONNECTION")
        console.log(error)
    }
}
