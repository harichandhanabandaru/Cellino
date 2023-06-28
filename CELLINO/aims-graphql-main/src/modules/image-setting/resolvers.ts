import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    imageSettings: async (_, { id }, { dataSources }) =>
      dataSources.ImageSettingAPI.getImageSettings(id),
  },
};
