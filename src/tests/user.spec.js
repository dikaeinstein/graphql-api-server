import http from 'http';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { sequelize } from '../models';
import index from '..';
import { GET_USER, DELETE_USER, SIGN_IN } from './queries';
import { createUserWithMessages } from '../seeders';

import 'dotenv/config';

const { app, server } = index;
const { expect } = chai;
chai.use(chaiHttp);

const PORT = process.env.SERVER_PORT || 4000;
const BASE_URL = `http://localhost:${PORT}`;

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

describe('users', () => {
  before(async () => {
    await sequelize.sync({ force: true }).then(async () => {
      await createUserWithMessages(new Date());
    });
    httpServer.listen(PORT, () =>
      console.log(`Apollo Server on ${BASE_URL}/graphql`),
    );
  });

  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const response = await chai.request(app).post('/graphql')
        .send({ query: GET_USER, variables: { id: 1 } });
      const expectedResult = {
        data: {
          user: {
            id: '1',
            username: 'dikaeinstein',
            email: 'hello@dikaeinstein.com',
            role: 'ADMIN',
          },
        },
      };

      expect(response.body).to.eql(expectedResult);
    });

    it('returns null when the user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };
      const response = await chai.request(BASE_URL).post('/graphql')
        .send({ query: GET_USER, variables: { id: 42 } });

      expect(response.body).to.eql(expectedResult);
    });
  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const response = await chai.request(BASE_URL).post('/graphql')
        .send({
          query: SIGN_IN,
          variables: {
            login: 'ddavids',
            password: 'password',
          },
        });
      const { token } = response.body.data.signIn;
      const { body: { errors } } = await chai.request(BASE_URL)
        .post('/graphql')
        .set('Authorization', `Bearer ${token}`)
        .send({ query: DELETE_USER, variables: { id: '1' } });
      expect(errors[0].message).to.eql('Not authorized as admin.');
    });
  });
});
