import auth from './auth';
import message from './message';
import user from './user';

export const authService = auth;
export const messageService = message;
export const userService = user;

export default { authService, messageService, userService };
