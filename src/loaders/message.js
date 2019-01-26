import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import models from '../models';

const batchMessages = async (keys, models, findOptions) => {
  const messages = await models.Message.findAll({
    where: { user_id: { [Op.in]: keys } },
    ...findOptions
  });
  
  return keys.map(key => messages.filter(message => message.user_id === Number(key)));
};

export const messageLoader = new DataLoader(keys => batchMessages(keys, models));
