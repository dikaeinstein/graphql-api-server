import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';
import { authService, userService, messageService } from '../services';
import { userRepository, messageRepository } from '../repositories';
import { isAdmin, isAuthenticated } from './authorization';


const userResolvers = {
  Query: {
    me: (parent, args, { me }) => me,
    user: async (parent, { id }) => userRepository.getUser(id),
    users: async () => userRepository.getUsers(),
  },
  Mutation: {
    signUp: async (parent, args) => userService.signUp(args),
    signIn: async (parent, args) => userService.signIn(args),
    deleteUser: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, { id }) => userRepository.deleteUser(id),
    ),
  },
  User: {
    messages: async user => messageRepository.getUserMessages(user.id),
  },
};

export default userResolvers;
