import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    Clusters: async (
      _,
      {
        imageAnalysisRequestId,
        imageEventId,
        page,
        size,
        colonyIds,
        freeClusters,
      },
      { dataSources }
    ) =>
      dataSources.ClusterAPI.getClustersById(
        imageEventId,
        imageAnalysisRequestId,
        colonyIds,
        page,
        size,
        freeClusters
      ),
    clusterMetrics: async (
      _,
      { imageEventId, freeClusters },
      { dataSources }
    ) => dataSources.ClusterAPI.getClusterMetrics(imageEventId, freeClusters),
  },
  Mutation: {
    createCluster: async (_, { clusterData }, { dataSources }) =>
      dataSources.ClusterAPI.createCluster(clusterData),

    updateCluster: async (_, args, { dataSources }) =>
      dataSources.ClusterAPI.updateCluster(args),
    updateClusterOutline: async (_, args, { dataSources }) =>
      dataSources.ClusterAPI.updateClusterOutline(args),
  },
  Cluster: {
    well: (parent, _, { dataSources }) => {
      if (parent["wellId"]) {
        return dataSources.WellAPI.getWellById(parent["wellId"] as string);
      }
      return null;
    },
    colony: (parent) => {
      if (parent["colonyId"]) {
        return {
          id: parent["colonyId"] as string,
        };
      }
    },
    imageEvent: (parent) => {
      if (parent["imageEventId"]) {
        return {
          id: parent["imageEventId"] as string,
        };
      }
    },
    imageAnalysisRequest: (parent) => {
      if (parent["imageAnalysisRequestId"]) {
        return {
          id: parent["imageAnalysisRequestId"] as string,
        };
      }
    },
  },
  ClusterMetrics: {
    imageAnalysisRequest: (parent) => {
      if (parent?.["imageAnalysisRequestId"]) {
        return {
          id: parent?.["imageAnalysisRequestId"],
          name: parent?.["imageAnalysisRequestName"],
        };
      }
    },
  },
};
