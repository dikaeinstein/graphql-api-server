import models from '../models';
import * as loaders from '../loaders';


const getUser = async id => loaders.user.userLoader.load(id);

const getUsers = async () =>
  await models.User.findAll();

const createUser = async payload =>
  await models.User.create(payload);

const deleteUser = async id =>
  await models.User.destroy({ where: { id }});

export default { getUser, getUsers, createUser, deleteUser };
