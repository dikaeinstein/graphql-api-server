import models from '../models';

const createUserWithMessages = async (date) => {
  await models.User.create({
    username: 'dikaeinstein',
    email: 'hello@dikaeinstein.com',
    password: 'password',
    role: 'ADMIN',
    messages: [
      {
        text: 'undefined dev by day but gopher by night.',
        createdAt: date.setSeconds(date.getSeconds() + 1),
      },
    ],
  }, {
    include: [models.Message],
  });

  await models.User.create({
    username: 'rwieruch',
    email: 'hello@robin.com',
    password: 'rwieruch',
    messages: [
      {
        text: 'Published the Road to learn React',
        createdAt: date.setSeconds(date.getSeconds() + 1),
      },
    ],
  }, {
    include: [models.Message],
  });

  await models.User.create({
    username: 'ddavids',
    email: 'hello@ddavids.com',
    password: 'password',
    messages: [
      {
        text: 'Happy to release ...',
        createdAt: date.setSeconds(date.getSeconds() + 1),
      },
      {
        text: 'Published a complete ...',
        createdAt: date.setSeconds(date.getSeconds() + 1),
      },
    ],
  },
  {
    include: [models.Message],
  });
};

export default createUserWithMessages;
