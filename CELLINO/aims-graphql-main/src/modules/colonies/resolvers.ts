import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    Colonies: async (_, { imageEventId, quality }, { dataSources }) =>
      dataSources.ColonyAPI.getColoniesById(imageEventId, quality),
    colonyMetrics: async (_, { imageEventId }, { dataSources }) =>
      dataSources.ColonyAPI.getColonyMetrics(imageEventId),
  },
  Mutation: {
    updateColony: async (_, args, { dataSources }) =>
      dataSources.ColonyAPI.updateColony(args),

    createColonyAndCluster: async (
      _,
      { colonyData, clusterData },
      { dataSources }
    ) => dataSources.ColonyAPI.createColonyAndCluster(colonyData, clusterData),
  },
  Colony: {
    well: (parent, _, { dataSources }) => {
      if (parent["wellId"]) {
        return dataSources.WellAPI.getWellById(parent["wellId"] as string);
      }
      return null;
    },
  },
};
