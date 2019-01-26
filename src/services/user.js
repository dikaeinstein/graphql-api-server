import { UserInputError, AuthenticationError } from 'apollo-server-express';
import models from '../models';
import { userRepository } from '../repositories';
import { authService } from '../services';

const secret = process.env.SECRET;

const signUp = async payload => {
  const { username, email, password } = payload;
  const user = await userRepository
    .createUser({ username, email, password });
  return { token: authService.createToken(user, secret, '1 day') };
};

const signIn = async payload => {
  const { login, password } = payload;
  const user = await models.User.findByLogin(login);
  if (!user) {
    throw new UserInputError('No user found with this login credential.');
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    throw new AuthenticationError('Invalid password.');
  }

  return { token: authService.createToken(user, secret, '1 day') };
};

export default { signUp, signIn };
