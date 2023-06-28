import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    passages: Passage
  }
  type Passage {
    passagenumber: [String]
  }
`;
