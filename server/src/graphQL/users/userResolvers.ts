import { pool } from '../../config/dbConnection'
import { saltAndHashPassword } from '../../utils/utils'

export const userResolvers = {

    Mutation: {
        addUser: async (_: any, args: { name: string, email: string, password: string}) => {

            const { name, email, password } = args

            // salt and hash the password
            const hashedPassword = await saltAndHashPassword(password)
            
            // Save user information to postgreSQL database
            const response = await pool.query(
                'INSERT INTO users(name, email, hashed_password) VALUES($1, $2, $3) RETURNING *',
                [name, email, hashedPassword]
            )
            return response.rows[0]
        }
    }
}