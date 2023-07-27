import express from 'express'
import { expressApp } from './expressApp';
import { pool } from './config/dbConnection'
import { PORT } from './config/index'


const startServer = async () => {
  
  const app = express()
  await expressApp(app)

  // Sample how to interact with database
  // const client = await pool.connect()
  // const queryResult = await client.query('SELECT NOW() as current_time')
  // console.log(queryResult)
  // client.release()

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
  })
}

startServer()