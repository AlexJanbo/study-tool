import { GraphQLResolveInfo } from 'graphql'
import { pool } from '../../config/dbConnection'
import { saltAndHashPassword, validatePassword, generateSignedJWT } from '../../utils/utils'

type AuthPayload = {
    token: string,
}


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
        async addUser(_: any, { input }: { input: { username: string, email: string, password: string}}): Promise<any> {
            try {
                const hashedPassword = await saltAndHashPassword(input.password)
                const { rows } = await pool.query(
                    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
                    [input.username, input.email, hashedPassword]
                )
                return rows[0]
            } catch (error) {
                throw new Error('Failed to add user to database')
            }
        },
        async loginUser(_: any, { input }: { input: { email: string, password: string }}, context: any, info: GraphQLResolveInfo): Promise<AuthPayload> {

            const { email, password } = input;
            let foundUser

            const queryResult = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])

            if(queryResult.rows.length > 0) {
                foundUser = queryResult.rows[0]
            } 

            if(!foundUser) {
                throw new Error("Invalid username")
            }

            if(! await validatePassword(email, password)) {
                throw new Error("Invalid login credentials")
            }

            if(!foundUser.id) {
                throw new Error("User Id not found")
            }

            const token = generateSignedJWT(foundUser.id, foundUser.username, foundUser.email)



            return {
                token
            }
        }
    }
}