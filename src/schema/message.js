import { gql } from 'apollo-server-express';

const messageSchema = gql`
  type Message {
    id: ID!
    text: String!
    user: User!
    createdAt: Date!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type MessageCreated {
    message: Message!
  }

  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  extend type Subscription {
    messageCreated: MessageCreated!
  }
`;

export default messageSchema;
