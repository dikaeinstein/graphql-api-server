import { gql } from 'apollo-server-express';

export const GET_USER = `
  query ($id: ID!) {
    user(id: $id) {
      id
      username
      email
      role
    }
  }
`;

export const SIGN_IN = `
  mutation ($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  } 
`;

export const DELETE_USER = `
  mutation ($id: ID!) {
    deleteUser(id: $id)
  }
`;
