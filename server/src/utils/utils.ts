import bcrypt from 'bcrypt'
import { pool } from '../config/dbConnection' 

const saltRounds = 10

// Takes password input and returns salted and hashed password
export const saltAndHashPassword = async (password: string) => {

    // Salt and hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
}

// Compares input password with stored password returns true if match
export const checkPassword = async (username: string, providedPassword: string) => {

    // Retrieve the hashed password from the database
    const res = await pool.query('SELECT hashed_password FROM users WHERE username = $1', [username])

    if(res.rows.length) {
        const storedHashedPassword = res.rows[0].hashed_password

        // use bcrypt to compare stored hashed password with provided password
        const isMatch = await bcrypt.compare(providedPassword, storedHashedPassword)

        return isMatch
    } else {
        return false
    }
    
}