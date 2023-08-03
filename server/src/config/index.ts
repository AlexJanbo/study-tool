const dotEnv = require('dotenv').config()

export const PORT = process.env.PORT || 4000;
export const APP_SECRET = process.env.APP_SECRET || ""
export const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI