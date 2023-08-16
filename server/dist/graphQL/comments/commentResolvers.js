"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const utils_1 = require("../../utils/utils");
exports.commentResolvers = {
    Query: {
        async getCommentsByTask(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT * FROM comments WHERE $1 = task_id', [id]);
                return rows;
            }
            catch (error) {
                throw new Error('Failed to fetch comments from the database');
            }
        },
    },
    Mutation: {
        async createComment(_, { input }, context) {
            const { task_id, description, image } = input;
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            const result = await dbConnection_1.pool.query('INSERT INTO comments (task_id, user_id, description, image) VALUES ($1, $2, $3, $4) RETURNING *', [task_id, userId, description, image]);
            return result.rows[0];
        },
        async deleteComment(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            if (typeof decodedToken === "string" || !decodedToken.userId) {
                throw new Error("Invalid or missing token");
            }
            const userId = decodedToken.userId;
            await dbConnection_1.pool.query('DELETE FROM comments WHERE comment_id = $1', [id]);
            return { message: `Comment: ${id} deleted successfully` };
        },
    }
};
