"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyJWT = exports.generateSignedJWT = exports.validatePassword = exports.saltAndHashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConnection_1 = require("../config/dbConnection");
const index_1 = require("../config/index");
const saltRounds = 10;
// Takes password input and returns salted and hashed password
const saltAndHashPassword = async (password) => {
    // Salt and hash password
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
};
exports.saltAndHashPassword = saltAndHashPassword;
// Compares input password with stored password returns true if match
const validatePassword = async (email, providedPassword) => {
    // Retrieve the hashed password from the database
    const res = await dbConnection_1.pool.query('SELECT password FROM users WHERE email = $1', [email]);
    if (res.rows.length) {
        const storedHashedPassword = res.rows[0].password;
        // use bcrypt to compare stored hashed password with provided password
        const isMatch = await bcrypt_1.default.compare(providedPassword, storedHashedPassword);
        return isMatch;
    }
    else {
        return false;
    }
};
exports.validatePassword = validatePassword;
// Generate JWT for a user
const generateSignedJWT = (userId, username, email) => {
    try {
        const userPayload = {
            userId: userId,
            username: username,
            email: email,
        };
        if (!index_1.APP_SECRET) {
            throw new Error("APP_SECRET is not set or invalid");
        }
        return jsonwebtoken_1.default.sign(userPayload, index_1.APP_SECRET, { expiresIn: "24h" });
    }
    catch (error) {
        throw new Error("Unable to generate signed JWT");
    }
};
exports.generateSignedJWT = generateSignedJWT;
// Validate a JSON Web Token
const VerifyJWT = async (token) => {
    try {
        const decodedToken = await jsonwebtoken_1.default.verify(token.split(" ")[1], index_1.APP_SECRET);
        return decodedToken;
    }
    catch (error) {
        throw new Error("Unable to verify token");
    }
};
exports.VerifyJWT = VerifyJWT;
