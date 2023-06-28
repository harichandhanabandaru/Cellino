import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Mutation {
    generateToken: AuthToken!
  }

  type AuthToken {
    token: String
  }
`;
