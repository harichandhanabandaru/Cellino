import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    scanObjects: async (
      _,
      { imageAnalysisRequestId, imageEventId },
      { dataSources }
    ) =>
      await dataSources.scanObjectsApi.getScanObjects(
        imageAnalysisRequestId,
        imageEventId
      ),

    // TODO: document resolver
    scanObjectMetrics: async (_, { imageEventId }, { dataSources }) => {
      const metricsRaw = await dataSources.scanObjectsApi.getScanObjectMetrics(
        imageEventId
      );

      // transform object
      return metricsRaw.map((metric) => ({
        imageAnalysisRequest: {
          id: metric.imageAnalysisRequestId,
          name: metric.imageAnalysisRequestName,
        },
        count: metric.count,
      }));
    },
  },

  Mutation: {
    createScanObject: async (_, { scanObjectData }, { dataSources }) =>
      await dataSources.scanObjectsApi.createScanObject(scanObjectData),
    updateScanObject: (parent, args, { dataSources }) =>
      dataSources.scanObjectsApi.updateScanObject(args),
    deleteScanObject: (_, args, { dataSources }) =>
      dataSources.scanObjectsApi.deleteScanObject(args),
  },
};
