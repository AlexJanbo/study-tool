"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const utils_1 = require("../../utils/utils");
exports.taskResolvers = {
    Mutation: {
        async createTask(_, { input }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            const result = await dbConnection_1.pool.query('INSERT INTO tasks (title, description, priority, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [input.title, input.description, input.priority, input.status, userId]);
            return result.rows[0];
        },
    }
};
