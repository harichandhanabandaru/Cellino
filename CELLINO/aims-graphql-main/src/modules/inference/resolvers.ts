import properties from "../../utils/properties.js";
import { Resolvers } from "../../__generated__/resolvers-types.js";

export const resolvers: Resolvers = {
  Query: {
    inferences: async (_, { imageEventId }, { dataSources }) =>
      dataSources.InferenceAPI.getInferenceArtifactsByEventImageId(
        imageEventId
      ),
  },
  Inference: {
    artifactPath: async (parent) => {
      if (parent?.artifactPath) {
        const { blob_path } = parent.artifactPath;
        return {
          ...parent.artifactPath,
          blob_path: `${properties.cdnUrl}/${blob_path}`,
        };
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

    imageSetting: (parent, _, { dataSources }) => {
      if (parent["imageSettingId"]) {
        return dataSources.ImageSettingAPI.getImageSettings(
          parent["imageSettingId"] as string
        );
      }
      return null;
    },
  },
};
