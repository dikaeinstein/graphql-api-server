import { Op } from 'sequelize';
import models from '../models';
import { fromCursorHash } from '../utils/cursorHash';
import * as loaders from '../loaders';

const getMessages = async ({ limit, cursor }) => {
  const cursorOptions = cursor
    ? {
      where: {
        created_at: {
          [Op.lt]: new Date(fromCursorHash(cursor)),
        }
      }
    }
    : {};

  return await models.Message.findAndCountAll({
    order: [['created_at', 'DESC']],
    limit,
    ...cursorOptions,
  });
};

const getUserMessages = async (userId) =>
  loaders.message.messageLoader.load(userId)

const createMessage = async payload =>
  await models.Message.create(payload);

const getMessage = async (id, findOptions) =>
 await models.Message.findByPk(id, { ...findOptions });

const deleteMessage = async (id) =>
 await models.Message.destroy({ where: { id }});

export default {
  getMessages, getMessage,
  deleteMessage, createMessage,
  getUserMessages,
};
