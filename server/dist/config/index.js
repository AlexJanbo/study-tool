"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONNECTION_URI = exports.APP_SECRET = exports.PORT = void 0;
const dotEnv = require('dotenv').config();
exports.PORT = process.env.PORT || 4000;
exports.APP_SECRET = process.env.APP_SECRET || "";
exports.DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
