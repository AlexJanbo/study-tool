import { gql } from 'apollo-server-express';
import { userTypeDefs } from './users/userTypeDefs';
import { userResolvers } from './users/userResolvers';

export const typeDefs = [userTypeDefs];
export const resolvers = [userResolvers];