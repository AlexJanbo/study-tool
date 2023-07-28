"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.saltAndHashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbConnection_1 = require("../config/dbConnection");
const saltRounds = 10;
// Takes password input and returns salted and hashed password
const saltAndHashPassword = async (password) => {
    // Salt and hash password
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
};
exports.saltAndHashPassword = saltAndHashPassword;
// Compares input password with stored password returns true if match
const checkPassword = async (username, providedPassword) => {
    // Retrieve the hashed password from the database
    const res = await dbConnection_1.pool.query('SELECT hashed_password FROM users WHERE username = $1', [username]);
    if (res.rows.length) {
        const storedHashedPassword = res.rows[0].hashed_password;
        // use bcrypt to compare stored hashed password with provided password
        const isMatch = await bcrypt_1.default.compare(providedPassword, storedHashedPassword);
        return isMatch;
    }
    else {
        return false;
    }
};
exports.checkPassword = checkPassword;
