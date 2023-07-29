"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const utils_1 = require("../../utils/utils");
exports.userResolvers = {
    Query: {
        async users() {
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT id, name, email FROM users');
                return rows;
            }
            catch (error) {
                throw new Error('Failed to fetch users from the database');
            }
        },
        async user(_, { id }) {
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
                return rows[0] || null;
            }
            catch (error) {
                throw new Error('Failed to fetch user from the database');
            }
        }
    },
    Mutation: {
        async addUser(_, { input }) {
            try {
                const hashedPassword = await (0, utils_1.saltAndHashPassword)(input.password);
                const { rows } = await dbConnection_1.pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [input.username, input.email, hashedPassword]);
                return rows[0];
            }
            catch (error) {
                throw new Error('Failed to add user to database');
            }
        }
    }
};
