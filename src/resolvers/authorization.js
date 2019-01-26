import { ForbiddenError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import { messageRepository } from '../repositories';

export const isAuthenticated = (parent, args, { me }) => me
  ? skip : new ForbiddenError('Not authenticated as user.');

export const isMessageOwner = async (parent, { id }, { me }) => {
  const message = await messageRepository
    .getMessage(id, { raw: true });

  if (message.user_id !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};

export const isAdmin = async (parent, args, { me: { role } }) => {
  return role === 'ADMIN' ?
    skip : new ForbiddenError('Not authorized as admin.');
};
