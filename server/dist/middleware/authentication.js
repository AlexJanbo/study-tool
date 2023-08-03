"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const authentication = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, index_1.APP_SECRET);
                return decodedToken.userId;
            }
            catch (err) {
                res.status(401).send('Unauthorized, invalid token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]\'');
    }
    throw new Error('Authorization header must be provided');
};
exports.authentication = authentication;
