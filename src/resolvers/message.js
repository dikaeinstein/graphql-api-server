import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import pubSub, { EVENTS } from '../subscription';
import { messageService } from '../services';
import { messageRepository, userRepository } from '../repositories';

const messageResolvers = {
  Query: {
    messages: async (parent, args) => {
      const { cursor, limit = 100 } = args;

      return messageService.getMessages({ cursor, limit });
    },
    message: async (parent, { id }) => messageRepository.getMessage(id),
  },
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me }) =>
        messageService.createMessage({ text, userId: me.id }),
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }) => messageRepository.deleteMessage(id),
    ),
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubSub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
  Message: {
    user: async message => userRepository.getUser(message.userId),
    createdAt: async message => message.created_at,
  },
};

export default messageResolvers;
