"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const index_1 = require("./index");
exports.pool = new pg_1.Pool({
    connectionString: index_1.DB_CONNECTION_URI,
    max: 20,
    idleTimeoutMillis: 30000,
});
