import { pool } from "../../config/dbConnection";
import { VerifyJWT } from "../../utils/utils";


export const taskResolvers = {
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
