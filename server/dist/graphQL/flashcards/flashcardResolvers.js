"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardResolvers = void 0;
const dbConnection_1 = require("../../config/dbConnection");
const utils_1 = require("../../utils/utils");
exports.flashcardResolvers = {
    Query: {
        async getFlashcardsByUser(_, {}, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT * FROM flashcards WHERE $1 = user_id', [userId]);
                return rows;
            }
            catch (error) {
                throw new Error('Failed to fetch flashcards from the database');
            }
        },
        async getFlashcardsByTopic(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            try {
                const { rows } = await dbConnection_1.pool.query('SELECT * FROM flashcards WHERE $1 = topic_id', [id]);
                return rows;
            }
            catch (error) {
                throw new Error('Failed to fetch flashcards from the database');
            }
        },
        // async getProject(
        //     _: any, 
        //     { id }: { id: string },
        //     context: { token: string }
        // ): Promise<any | null> {
        //     // Access the token from the context
        //     const token = context.token;
        //     const decodedToken = await VerifyJWT(token)
        //     let userId
        //     if(typeof decodedToken !== "string" && decodedToken.userId) {
        //         userId = decodedToken.userId
        //     }
        //     try {
        //         const { rows } = await pool.query('SELECT id, owner, title, description, members, created_at FROM projects WHERE id = $1', [id])
        //         return rows[0] || null
        //     } catch (error) {
        //         throw new Error('Failed to fetch project from the database')
        //     }
        // }
    },
    Mutation: {
        async createFlashcard(_, { input }, context) {
            const { card_type, content, answer, topic_id } = input;
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            const result = await dbConnection_1.pool.query('INSERT INTO flashcards (user_id, card_type, content, answer, topic_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [userId, card_type, content, answer, topic_id]);
            return result.rows[0];
        },
        // async createGroupProject(
        //     _: any, 
        //     { input }: { input: {title: string, description: string, members: [string] }},
        //     context: { token: string }
        // ): Promise<any> {
        //     // Access the token from the context
        //     const token = context.token;
        //     const decodedToken = await VerifyJWT(token)
        //     const { title, description, members } = input
        //     let userId
        //     if(typeof decodedToken !== "string" && decodedToken.userId) {
        //         userId = decodedToken.userId
        //     }
        //     const membersIdFromUsernames = await pool.query(
        //         // Query to get member IDs based on usernames
        //         'SELECT id FROM users WHERE username = ANY($1)',
        //         [members]
        //     );
        //     let memberIds = membersIdFromUsernames.rows.map(row => row.id)
        //     memberIds.push(userId)
        //     const result = await pool.query(
        //         'INSERT INTO projects (owner, title, description, members) VALUES ($1, $2, $3, $4) RETURNING *',
        //         [userId, title, description, memberIds]
        //         );
        //     return result.rows[0];
        // },
        async updateFlashcard(_, { input }, context) {
            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { card_type, content, answer, flashcard_id } = input;
            if (!token) {
                throw new Error("Invalid token");
            }
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            let userId;
            if (typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId;
            }
            // Check if the project with the given ID belongs to the authenticated user
            const flashcard = await dbConnection_1.pool.query('SELECT * FROM flashcards WHERE flashcard_id = $1 AND user_id = $2', [flashcard_id, userId]);
            if (flashcard.rows.length === 0) {
                throw new Error('Flashcard not found or unauthorized to update');
            }
            // Update the projects in the database
            const updatedProject = await dbConnection_1.pool.query('UPDATE flashcards SET card_type = $1, content = $2, answer = $3 WHERE flashcard_id = $4 RETURNING *', [card_type, content, answer, flashcard_id]);
            return updatedProject.rows[0];
        },
        async deleteFlashcard(_, { id }, context) {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await (0, utils_1.VerifyJWT)(token);
            if (typeof decodedToken === "string" || !decodedToken.userId) {
                throw new Error("Invalid or missing token");
            }
            const userId = decodedToken.userId;
            // Check if the task with the given id belongs to the authenticated user
            const flashcard = await dbConnection_1.pool.query('SELECT flashcard_id FROM flashcards WHERE flashcard_id = $1 AND user_id = $2', [id, userId]);
            if (flashcard.rows.length === 0) {
                throw new Error("Flashcard not found or unauthorized to delete");
            }
            await dbConnection_1.pool.query('DELETE FROM flashcards WHERE flashcard_id = $1', [id]);
            return { message: `Flashcard: ${id} deleted successfully` };
        },
    }
};
