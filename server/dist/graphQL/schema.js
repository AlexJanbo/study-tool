"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const userTypeDefs_1 = require("./users/userTypeDefs");
const userResolvers_1 = require("./users/userResolvers");
exports.typeDefs = [userTypeDefs_1.userTypeDefs];
exports.resolvers = [userResolvers_1.userResolvers];
