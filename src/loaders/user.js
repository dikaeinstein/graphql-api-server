import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import models from '../models';

const batchUsers = async (keys, models) => {
  const users = await models.User.findAll({
    where: { id: { [Op.in]: keys } },
  });

  return keys.map(key => users.find(user => user.id === Number(key)));
};

export const userLoader = new DataLoader(keys => batchUsers(keys, models));
