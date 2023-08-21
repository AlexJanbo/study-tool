import { pool } from "../../config/dbConnection";
import { VerifyJWT } from "../../utils/utils";


export const topicResolvers = {

    // Query: {

    //     async getProjectsByUser(
    //         _: any,
    //         {}: {},
    //         context: { token: string}
    //     ): Promise<any | null> {

    //         // Access the token from the context
    //         const token = context.token;
    //         const decodedToken = await VerifyJWT(token)

    //         let userId
    //         if(typeof decodedToken !== "string" && decodedToken.userId) {
    //             userId = decodedToken.userId
    //         }

    //         try { 
    //             const { rows } = await pool.query(
    //                 'SELECT id, owner, title, description, members, created_at FROM projects WHERE $1 = ANY(members)',
    //                 [userId]
    //             )
    //             return rows
    //         } catch (error) {
    //             throw new Error('Failed to fetch projects from the database')
    //         }
    //     },

    //     async getProject(
    //         _: any, 
    //         { id }: { id: string },
    //         context: { token: string }
    //     ): Promise<any | null> {

    //         // Access the token from the context
    //         const token = context.token;
    //         const decodedToken = await VerifyJWT(token)

    //         let userId
    //         if(typeof decodedToken !== "string" && decodedToken.userId) {
    //             userId = decodedToken.userId
    //         }

    //         try {
    //             const { rows } = await pool.query('SELECT id, owner, title, description, members, created_at FROM projects WHERE id = $1', [id])
    //             return rows[0] || null
    //         } catch (error) {
    //             throw new Error('Failed to fetch project from the database')
    //         }
    //     }
    // },
    

    Mutation: {

        async createTopic(
            _: any, 
            { input }: { input: { title: string }},
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
                'INSERT INTO topics (user_id, title) VALUES ($1, $2) RETURNING *',
                [userId, input.title]
                );
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
            
        // async updateProject(
        //     _: any,
        //     { input }: { input: {id: string, title: string, description: string }},
        //     context: { token: string }
        //     ): Promise<any> {

        //     // Access the token from the context
        //     const token = context.token;
        //     // Destructure the input values for the update
        //     const { id, title, description } = input;
                    
        //     if(!token) {
        //         throw new Error("Invalid token")
        //     }

        //     const decodedToken = await VerifyJWT(token)

        //     let userId
        //     if(typeof decodedToken !== "string" && decodedToken.userId) {
        //         userId = decodedToken.userId
        //     }

        //     // Check if the project with the given ID belongs to the authenticated user
        //     const project = await pool.query(
        //         'SELECT * FROM projects WHERE id = $1 AND owner = $2',
        //         [id, userId]
        //     )

        //     if (project.rows.length === 0) {
        //         throw new Error('Project not found or unauthorized to update');
        //     }



        //      // Update the projects in the database
        //      const updatedProject = await pool.query(
        //         'UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *',
        //         [title, description, id]
        //     );

        //     return updatedProject.rows[0];
        // },

        // async deleteProject(
        //     _: any, 
        //     { id }: { id: string},
        //     context: { token: string }
        // ): Promise<any> {

        //     // Access the token from the context
        //     const token = context.token;
        //     const decodedToken = await VerifyJWT(token)

        //     if(typeof decodedToken === "string" || !decodedToken.userId) {
        //         throw new Error("Invalid or missing token")
        //     }
        //     const userId = decodedToken.userId

        //     // Check if the task with the given id belongs to the authenticated user
        //     const project = await pool.query(
        //         'SELECT id FROM projects WHERE id = $1 AND owner = $2',
        //         [id, userId]
        //     );

        //     if (project.rows.length === 0) {
        //         throw new Error("Task not found or unauthorized to delete");
        //     }

        //     await pool.query('DELETE FROM projects WHERE id = $1', [id]);

        //     return { message: `Project: ${id} deleted successfully`};
        // },
    }
}