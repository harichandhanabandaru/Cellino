import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    imageAnalysisRequest: async () => "Work in progress",
  },
  ImageAnalysisRequest: {
    name: async (parent, args, { dataSources }) => {
      if (parent?.name) {
        return parent?.name;
      } else if (parent?.id) {
        const imageAnalysisRequest =
          await dataSources.imageAnalysisRequestApi.getById(parent.id);
        return imageAnalysisRequest.name;
      }
      return null;
    },
    protocol: (parent) => {
      if (parent["protocolId"]) {
        return {
          id: parent["protocolId"] as string,
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
  },
  Mutation: {
    triggerImageAnalysis: async (
      _,
      { triggerAnalysisRequest },
      { dataSources }
    ) =>
      dataSources.imageAnalysisRequestApi.triggerImageAnalysis(
        triggerAnalysisRequest
      ),
  },
};
