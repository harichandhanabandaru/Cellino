import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    events: async (_, args, { dataSources }) =>
      dataSources.EventApi.getEvents(args),
  },
  Event: {
    metadata: async (parent) => {
      if (parent.metadata) return JSON.stringify(parent.metadata);
      else return null;
    },
  },
};
