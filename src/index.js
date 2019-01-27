import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import models from './models';
import schema from './schema';
import resolvers from './resolvers';
import { authService } from './services';
import 'dotenv/config';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  context: async ({ req, connection }) => {
    if (connection) {
      return { models };
    }

    if (req) {
      const me = await authService.getMe(req);
      return { me, models };
    }
  },
  formatError: error => {
    process.env.NODE_ENV === 'production'
      && delete error.extensions.exception;
    return error;
  },
});

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

export default { app, server };
