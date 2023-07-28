"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const dbConnection_1 = require("./config/dbConnection");
const schema_1 = __importDefault(require("./graphQL/schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const expressApp = async (app) => {
    app.use(express_1.default.json({ limit: '5mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '5mb' }));
    app.use((0, cors_1.default)());
    app.use(express_1.default.static(__dirname + '/public'));
    app.use('/graphql', (0, express_graphql_1.graphqlHTTP)(async (req) => {
        const database = await dbConnection_1.pool.connect();
        return {
            schema: schema_1.default,
            context: {
                database,
                bcrypt: bcrypt_1.default,
            },
            graphiql: true,
        };
    }));
};
exports.expressApp = expressApp;
