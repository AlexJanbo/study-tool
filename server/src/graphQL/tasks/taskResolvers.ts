import { pool } from "../../config/dbConnection";


export const taskResolvers = {


    Mutation: {
        async createTask(_: any, { input }: { input: { title: string, description: string, status: string, priority: string, userId: string}}): Promise<any> {
            const result = await pool.query(
                'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
                [input.title, input.description, input.userId]
            );
            return result.rows[0];
        },
    }
}
