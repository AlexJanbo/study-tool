"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const utils_1 = require("../../utils/utils");
exports.taskResolvers = {
    Query: {
        async getTasksByUser(_, {}, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT id, title, description, priority, status, deadline FROM tasks WHERE user_id = $1', [userId]);
                return rows;
            }
            catch (error) {
                throw new Error('Failed to fetch tasks from the database');
            }
        },
        async getTask(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT id, title, description, priority, status, deadline FROM tasks WHERE id = $1', [id]);
                return rows[0] || null;
            }
            catch (error) {
                throw new Error('Failed to fetch user from the database');
            }
        }
    },
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
        async updateTask(_, { input }, context) {
            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, title, description, priority, status, deadline } = input;
            if (!token) {
                throw new Error("Invalid token");
            }
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            // Check if the task with the given ID belongs to the authenticated user
            const task = await dbConnection_1.pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }
            // Update the task in the database
            const updatedTask = await dbConnection_1.pool.query('UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, deadline = $5 WHERE id = $6 RETURNING *', [title, description, priority, status, deadline, id]);
            return updatedTask.rows[0];
        },
        async deleteTask(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            if (typeof decodedToken === "string" || !decodedToken.userId) {
                throw new Error("Invalid or missing token");
            }
            const userId = decodedToken.userId;
            // Check if the task with the given id belongs to the authenticated user
            const task = await dbConnection_1.pool.query('SELECT id FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
            if (task.rows.length === 0) {
                throw new Error("Task not found or unauthorized to delete");
            }
            await dbConnection_1.pool.query('DELETE FROM tasks WHERE id = $1', [id]);
            return { message: `Task: ${id} deleted successfully` };
        },
    }
};
