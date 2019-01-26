import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

/**
 * @description - Creates jwt token
 *
 * @param {object} user - User payload to sign
 * @param {string} secret -  secretOrPrivateKey used to sign the payload
 * @param {string|number} duration - expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
 *
 * @returns {Promise} - Promise that resolves to token string
 */
const createToken = async (user, secret, duration) => {
  const { id, username, email, role } = user;
  return await jwt.sign(
    { id, username, email, role },
    secret,
    { expiresIn: duration }
  );
};

const getMe = async req => {
  const token = req.get('Authorization')
    ? req.get('Authorization').split(' ')[1] : req.body.token;

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Invalid token or Your session expired. Sign in again.'
      );
    }
  }
};

export default { createToken, getMe };
