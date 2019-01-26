import { expect } from 'chai';
import userResolver from '../resolvers/user';


const admin = {
  id: 1,
  username: 'test',
  email: 'hello@test.com',
  role: 'ADMIN',
};

const cases = [
  {
    title: 'user',
    parent: {},
    args: {},
    field: 'me',
    context: { me: admin },
    expected: { ...admin },
  },
];

describe('Resolvers', () => {
  cases.forEach(testCase => {
    const { title, context, parent, field, args, expected } = testCase;

    it(`${title} resolvers`, async () => {
      const result = userResolver.Query[field](parent, args, context);
      expect(result).to.eql(expected);
    });
  });
});
