import { pool } from '../../config/dbConnection'
import { saltAndHashPassword } from '../../utils/utils'

export const userResolvers = {

    Query: {
        async users(): Promise<any[]> {
            try { 
                const { rows } = await pool.query('SELECT id, name, email FROM users')
                return rows
            } catch (error) {
                throw new Error('Failed to fetch users from the database')
            }
        },
        async user(_: any, { id }: { id: number }): Promise<any | null> {
            try {
                const { rows } = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id])
                return rows[0] || null
            } catch (error) {
                throw new Error('Failed to fetch user from the database')
            }
        }
    },
    Mutation: {
        async addUser(_: any, { input }: { input: { name: string, email: string, password: string}}): Promise<any> {
            try {
                const hashedPassword = await saltAndHashPassword(input.password)
                const { rows } = await pool.query(
                    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
                    [input.name, input.email, hashedPassword]
                )
                return rows[0]
            } catch (error) {
                throw new Error('Failed to add user to database')
            }
        }
    }
}