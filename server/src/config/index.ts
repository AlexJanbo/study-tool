const dotEnv = require('dotenv').config()

export const PORT = process.env.PORT || 4000;
export const APP_SECRET = process.env.APP_SECRET
export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;
export const PG_DATA = process.env.PG_DATA;
export const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI