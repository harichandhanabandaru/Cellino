import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    partners: async (_, { id }, { dataSources }) =>
      dataSources.partnerAPI.getPartners(id),
  },
};
