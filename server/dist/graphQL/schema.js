"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
    }
});
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: graphql_1.GraphQLString },
            },
            resolve: async (_, args, { database }) => {
                const queryResult = await database.query('SELECT * FROM users WHERE id = $1', [args.id]);
                return queryResult.rows[0];
            }
        }
    }
});
const RootMutationType = new graphql_1.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        registerUser: {
            type: UserType,
            args: {
                username: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: async (_, args, { database, bcrypt }) => {
                // Hash the password before storing it in the database
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(args.password, saltRounds);
                // Save the new user data to the database
                const newUser = await database.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [args.username, args.email, hashedPassword]);
                return newUser.rows[0];
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});
