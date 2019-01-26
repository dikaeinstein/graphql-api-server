import { GraphQLDateTime } from 'graphql-iso-date';
import messageResolvers from './message';
import userResolvers from './user';

const customDateResolver = {
  Date: GraphQLDateTime,
};

export default [messageResolvers, userResolvers, customDateResolver];
