import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    defaultQuery: () => "Default Query",
  },
  Mutation: {
    defaultMutation: () => "Default Mutation",
  },
};
