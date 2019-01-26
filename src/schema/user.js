import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    messages: [Message!]
  }

  type Token {
    token: String!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }
`;

export default userSchema;
