import { pool } from "../../config/dbConnection";
import { VerifyJWT } from "../../utils/utils";


export const commentResolvers = {

    Query: {

        async getCommentsByTask(
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
                const { rows } = await pool.query(
                    'SELECT * FROM comments WHERE $1 = task_id',
                    [id]
                )
                return rows
            } catch (error) {
                throw new Error('Failed to fetch comments from the database')
            }
        },
    },
    

    Mutation: {

        async createComment(
            _: any, 
            { input }: { input: {task_id: string, description: string, image: string }},
            context: { token: string }
        ): Promise<any> {

            const { task_id, description, image } = input

            // Access the token from the context
            const token = context.token;
            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            
            const result = await pool.query(
                'INSERT INTO comments (task_id, user_id, description, image) VALUES ($1, $2, $3, $4) RETURNING *',
                [task_id, userId, description, image]
                );
            return result.rows[0];
        },

        async deleteComment(
            _: any, 
            { id }: { id: string},
            context: { token: string }
        ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            const decodedToken = await VerifyJWT(token)

            if(typeof decodedToken === "string" || !decodedToken.userId) {
                throw new Error("Invalid or missing token")
            }
            const userId = decodedToken.userId


            await pool.query('DELETE FROM comments WHERE comment_id = $1', [id]);

            return { message: `Comment: ${id} deleted successfully`};
        },
    }
}