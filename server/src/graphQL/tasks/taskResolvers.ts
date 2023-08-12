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
                const { rows } = await pool.query('SELECT id, title, description, priority, status, deadline, created_at FROM tasks WHERE user_id = $1', [userId])
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
                const { rows } = await pool.query('SELECT id, title, description, priority, status, deadline, created_at FROM tasks WHERE id = $1', [id])
                return rows[0] || null
            } catch (error) {
                throw new Error('Failed to fetch user from the database')
            }
        },

        async getTaskEvents(
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
                const { rows } = await pool.query('SELECT * FROM TaskEvents WHERE task_id = $1', [id])
                return rows || null
            } catch (error) {
                throw new Error('Failed to fetch task events from the database')
            }
        }
    },
    

    Mutation: {

        async createTask(
            _: any, 
            { input }: { input: { title: string, description: string, status: string, priority: string }},
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
            
        async updateTask(
            _: any,
            { input }: { input: {id: string, title: string, description: string, status: string, priority: string, deadline: string }},
            context: { token: string }
            ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, title, description, priority, status, deadline } = input;
                    
            if(!token) {
                throw new Error("Invalid token")
            }

            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            // Check if the task with the given ID belongs to the authenticated user
            const task = await pool.query(
                'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            )

            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }



            // Update the task in the database
            const updatedTask = await pool.query(
                'UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4, deadline = $5 WHERE id = $6 RETURNING *',
                [title, description, priority, status, deadline, id]
            );

            return updatedTask.rows[0];
        },

        async updateTaskTitle(
            _: any,
            { input }: { input: {id: string, title: string}},
            context: { token: string }
            ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, title } = input;
                    
            if(!token) {
                throw new Error("Invalid token")
            }

            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            // Check if the task with the given ID belongs to the authenticated user
            const task = await pool.query(
                'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            )

            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }

            // Store the old title before the update
            const oldTitle = task.rows[0].title;

            // After the update, log the change in the TaskEvent table
            const currentTime = new Date().toISOString();  // Assuming the database expects an ISO string
            await pool.query(
                'INSERT INTO TaskEvents (task_id, field_changed, old_value, new_value, updated_at) VALUES ($1, $2, $3, $4, $5)',
                [id, 'title', oldTitle, title, currentTime]
            );


            // Update the task in the database
            const updatedTask = await pool.query(
                'UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *',
                [title, id]
            );

            return updatedTask.rows[0];
        },

        async updateTaskDescription(
            _: any,
            { input }: { input: {id: string, description: string}},
            context: { token: string }
            ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, description } = input;
                    
            if(!token) {
                throw new Error("Invalid token")
            }

            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            // Check if the task with the given ID belongs to the authenticated user
            const task = await pool.query(
                'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            )

            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }

            // Store the old description before the update
            const oldDescription = task.rows[0].description;
            
            // Update the task in the database
            const updatedTask = await pool.query(
                'UPDATE tasks SET description = $1 WHERE id = $2 RETURNING *',
                [description, id]
                );

            // After the update, log the change in the TaskEvent table
            const currentTime = new Date().toISOString();  // Assuming the database expects an ISO string
            await pool.query(
                'INSERT INTO TaskEvents (task_id, field_changed, old_value, new_value, updated_at) VALUES ($1, $2, $3, $4, $5)',
                [id, 'description', oldDescription, description, currentTime]
            );

            return updatedTask.rows[0];
        },

        async updateTaskPriority(
            _: any,
            { input }: { input: {id: string, priority: string}},
            context: { token: string }
            ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, priority } = input;
                    
            if(!token) {
                throw new Error("Invalid token")
            }

            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            // Check if the task with the given ID belongs to the authenticated user
            const task = await pool.query(
                'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            )

            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }

            // Store the old priority before the update
            const oldPriority = task.rows[0].priority;

            // After the update, log the change in the TaskEvent table
            const currentTime = new Date().toISOString();  // Assuming the database expects an ISO string
            await pool.query(
                'INSERT INTO TaskEvents (task_id, field_changed, old_value, new_value, updated_at) VALUES ($1, $2, $3, $4, $5)',
                [id, 'priority', oldPriority, priority, currentTime]
            );

            // Update the task in the database
            const updatedTask = await pool.query(
                'UPDATE tasks SET priority = $1 WHERE id = $2 RETURNING *',
                [priority, id]
            );

            return updatedTask.rows[0];
        },

        async updateTaskStatus(
            _: any,
            { input }: { input: {id: string, status: string}},
            context: { token: string }
            ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, status } = input;
                    
            if(!token) {
                throw new Error("Invalid token")
            }

            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            // Check if the task with the given ID belongs to the authenticated user
            const task = await pool.query(
                'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            )

            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }

            // Store the old status before the update
            const oldStatus = task.rows[0].status;

            // After the update, log the change in the TaskEvent table
            const currentTime = new Date().toISOString();  // Assuming the database expects an ISO string
            await pool.query(
                'INSERT INTO TaskEvents (task_id, field_changed, old_value, new_value, updated_at) VALUES ($1, $2, $3, $4, $5)',
                [id, 'status', oldStatus, status, currentTime]
            );

            // Update the task in the database
            const updatedTask = await pool.query(
                'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
                [status, id]
            );

            return updatedTask.rows[0];
        },

        async updateTaskDeadline(
            _: any,
            { input }: { input: {id: string, deadline: string}},
            context: { token: string }
            ): Promise<any> {

            // Access the token from the context
            const token = context.token;
            // Destructure the input values for the update
            const { id, deadline } = input;
                    
            if(!token) {
                throw new Error("Invalid token")
            }

            const decodedToken = await VerifyJWT(token)

            let userId
            if(typeof decodedToken !== "string" && decodedToken.userId) {
                userId = decodedToken.userId
            }

            // Check if the task with the given ID belongs to the authenticated user
            const task = await pool.query(
                'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            )

            if (task.rows.length === 0) {
                throw new Error('Task not found or unauthorized to update');
            }

            // Store the old deadline before the update
            const oldDeadline = task.rows[0].deadline;

            // After the update, log the change in the TaskEvent table
            const currentTime = new Date().toISOString();  // Assuming the database expects an ISO string
            await pool.query(
                'INSERT INTO TaskEvents (task_id, field_changed, old_value, new_value, updated_at) VALUES ($1, $2, $3, $4, $5)',
                [id, 'deadline', oldDeadline, deadline, currentTime]
            );

            // Update the task in the database
            const updatedTask = await pool.query(
                'UPDATE tasks SET deadline = $1 WHERE id = $2 RETURNING *',
                [deadline, id]
            );

            return updatedTask.rows[0];
        },

        async deleteTask(
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

            // Check if the task with the given id belongs to the authenticated user
            const task = await pool.query(
                'SELECT id FROM tasks WHERE id = $1 AND user_id = $2',
                [id, userId]
            );

            if (task.rows.length === 0) {
                throw new Error("Task not found or unauthorized to delete");
            }

            // Delete the TaskEvents related to the task
            await pool.query('DELETE FROM TaskEvents WHERE task_id = $1', [id]);

            await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

            return { message: `Task: ${id} deleted successfully`};
        },
    }
}
