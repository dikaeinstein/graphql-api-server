import { ApolloError } from 'apollo-server-express';

export class NotFoundError extends ApolloError {
  constructor(message) {
    super(message, 'NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

