"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
exports.taskResolvers = {
    Mutation: {
        async createTask(_, { input }) {
            const result = await dbConnection_1.pool.query('INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *', [input.title, input.description, input.userId]);
            return result.rows[0];
        },
    }
};
