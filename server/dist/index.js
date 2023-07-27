"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expressApp_1 = require("./expressApp");
const dbConnection_1 = require("./config/dbConnection");
const index_1 = require("./config/index");
const startServer = async () => {
    const app = (0, express_1.default)();
    await (0, expressApp_1.expressApp)(app);
    const client = await dbConnection_1.pool.connect();
    const queryResult = await client.query('SELECT NOW() as current_time');
    console.log(queryResult);
    client.release();
    app.listen(index_1.PORT, () => {
        console.log(`Server is listening on port: ${index_1.PORT}`);
    });
};
startServer();
