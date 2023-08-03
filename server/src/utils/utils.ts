import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../config/dbConnection' 
import { APP_SECRET } from '../config/index'

const saltRounds = 10

// Takes password input and returns salted and hashed password
export const saltAndHashPassword = async (password: string) => {

    // Salt and hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
}

// Compares input password with stored password returns true if match
export const validatePassword = async (email: string, providedPassword: string) => {

    // Retrieve the hashed password from the database
    const res = await pool.query('SELECT password FROM users WHERE email = $1', [email])

    if(res.rows.length) {
        const storedHashedPassword = res.rows[0].password

        // use bcrypt to compare stored hashed password with provided password
        const isMatch = await bcrypt.compare(providedPassword, storedHashedPassword)

        return isMatch
    } else {
        return false
    }
    
}

// Generate JWT for a user
export const generateSignedJWT = (userId: string, username: string, email: string): string => {
    try {
        const userPayload = {
            userId: userId,
            username: username,
            email: email,
        }
        if(!APP_SECRET) {
            throw new Error("APP_SECRET is not set or invalid")
        }
        return jwt.sign(userPayload, APP_SECRET, { expiresIn: "24h"})
    } catch (error) {
        throw new Error("Unable to generate signed JWT")
    }
}

// Validate a JSON Web Token
export const VerifyJWT = async(token: string) => {
    try {
        const decodedToken = await jwt.verify(token.split(" ")[1], APP_SECRET)
        return decodedToken
    } catch (error) {
        throw new Error("Unable to verify token")
    }    
}