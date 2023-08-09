"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const utils_1 = require("../../utils/utils");
exports.projectResolvers = {
    Query: {
        async getProjectsByUser(_, {}, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT id, owner, title, description, members, created_at FROM projects WHERE $1 = ANY(members)', [userId]);
                return rows;
            }
            catch (error) {
                throw new Error('Failed to fetch projects from the database');
            }
        },
        async getProject(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT id, owner, title, description, members, created_at FROM projects WHERE id = $1', [id]);
                return rows[0] || null;
            }
            catch (error) {
                throw new Error('Failed to fetch project from the database');
            }
        }
    },
    Mutation: {
        async createProject(_, { input }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            let members = [userId];
            const result = await dbConnection_1.pool.query('INSERT INTO projects (owner, title, description, members) VALUES ($1, $2, $3, $4) RETURNING *', [userId, input.title, input.description, members]);
            return result.rows[0];
        },
        async updateProject(_, { input }, context) {
            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, title, description } = input;
            if (!token) {
                throw new Error("Invalid token");
            }
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            // Check if the project with the given ID belongs to the authenticated user
            const project = await dbConnection_1.pool.query('SELECT * FROM projects WHERE id = $1 AND owner = $2', [id, userId]);
            if (project.rows.length === 0) {
                throw new Error('Project not found or unauthorized to update');
            }
            // Update the projects in the database
            const updatedProject = await dbConnection_1.pool.query('UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
            return updatedProject.rows[0];
        },
        async deleteProject(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            if (typeof decodedToken === "string" || !decodedToken.userId) {
                throw new Error("Invalid or missing token");
            }
            const userId = decodedToken.userId;
            // Check if the task with the given id belongs to the authenticated user
            const project = await dbConnection_1.pool.query('SELECT id FROM projects WHERE id = $1 AND owner = $2', [id, userId]);
            if (project.rows.length === 0) {
                throw new Error("Task not found or unauthorized to delete");
            }
            await dbConnection_1.pool.query('DELETE FROM projects WHERE id = $1', [id]);
            return { message: `Project: ${id} deleted successfully` };
        },
    }
};
