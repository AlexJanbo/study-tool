import { pool } from "../../config/dbConnection";
import { VerifyJWT } from "../../utils/utils";


export const taskResolvers = {

    Query: {

        async getTasksByUser(
            _: any,
            {}: {},
            context: { token: string}
        ): Promise<any | null> {

            // Access the token from the context
            const token = context.token;
            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            try { 
                const { rows } = await pool.query('SELECT id, title, description, priority, status, deadline FROM tasks WHERE user_id = $1', [userId])
                return rows
            } catch (error) {
                throw new Error('Failed to fetch tasks from the database')
            }
        },

        async getTask(
            _: any, 
            { id }: { id: string },
            context: { token: string }
        ): Promise<any | null> {

            // Access the token from the context
            const token = context.token;
            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            try {
                const { rows } = await pool.query('SELECT id, title, description, priority, status, deadline FROM tasks WHERE id = $1', [id])
                return rows[0] || null
            } catch (error) {
                throw new Error('Failed to fetch user from the database')
            }
        }
    },
    

    Mutation: {
        async createTask(
            _: any, 
            { input }: { input: { title: string, description: string, status: string, priority: string, userId: string}},
            context: { token: string }
        ): Promise<any> {
            // Access the token from the context
            const token = context.token;
            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            const result = await pool.query(
                'INSERT INTO tasks (title, description, priority, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [input.title, input.description, input.priority, input.status, userId]
            );
            return result.rows[0];
        },
    }
}
