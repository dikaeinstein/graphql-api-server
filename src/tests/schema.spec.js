import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { expect } from 'chai';
import { graphql } from 'graphql';
import typeDefs from '../schema';
import { GET_USER, DELETE_USER, SIGN_IN } from './queries';

const cases = [
  {
    title: 'GET_USER',
    query: GET_USER,
    context: { },
    variables: { id: 1 },
    expected: {
      data: {
        user: {
          id: '1',
          username: 'test',
          email: 'hello@test.com',
          role: 'ADMIN',
        },
      },
    },
  },
  {
    title: 'SIGN_IN',
    query: SIGN_IN,
    context: {},
    variables: { login: 'test', password: 'password' },
    expected: { data: { signIn: { token: 'mocktoken' } } },
  },
  {
    title: 'DELETE_USER',
    query: DELETE_USER,
    context: {},
    variables: { id: 1 },
    expected: { data: { deleteUser: true } },
  }
];

describe('Schema', () => {
  const mockSchema = makeExecutableSchema({ typeDefs });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      User: () => ({
        id: 1,
        username: 'test',
        email: 'hello@test.com',
        role: 'ADMIN',
      }),
      Token: () => ({ token: 'mocktoken' }),
      Boolean: () => true,
    },
  });

  cases.forEach(testCase => {
    const { title, query, expected, variables } = testCase;

    it(`query: ${title}`, async () => {
      const result = await graphql(mockSchema, query, null, {}, variables);
      expect(result.data).to.eql(expected.data)
    });
  });
});
