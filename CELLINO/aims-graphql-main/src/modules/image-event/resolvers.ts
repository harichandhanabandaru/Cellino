import { Resolvers } from "../../__generated__/resolvers-types";
import properties from "../../utils/properties.js";
import { merge } from "lodash-es";

export const resolvers: Resolvers = {
  Query: {
    imageEvent: async (_, { id }, { dataSources }) =>
      dataSources.ImageEventAPI.getImageEvent(id),
    imageEvents: (_, args, { dataSources }) => {
      return dataSources.ImageEventAPI.getImageEvents(args);
    },
  },
  Mutation: {
    updateImageEvent: async (_, args, { dataSources }) =>
      dataSources.ImageEventAPI.updateImageEvent(args),
  },
  ImageEvent: {
    derivedArtifacts: (parent, { width }) => {
      if (
        Array.isArray(parent?.["derivedArtifacts"]) &&
        parent["derivedArtifacts"].length > 0
      ) {
        let artifact = parent.derivedArtifacts.find((x) => x.width === width);
        if (!artifact) {
          artifact = parent.derivedArtifacts[0];
        }
        const { blob_path } = artifact;
        return { ...artifact, blob_path: `${properties.cdnUrl}/${blob_path}` };
      }
      return null;
    },
    artifactPath: (parent) => {
      if (parent?.artifactPath) {
        return {
          ...parent.artifactPath,
          blob_path: `${properties.cdnUrl}/${parent.artifactPath.blob_path}`,
        };
      }
      return null;
    },
    imageSetting: (parent, _, { dataSources }) => {
      if (parent["imageSettingId"]) {
        return dataSources.ImageSettingAPI.getImageSettings(
          parent["imageSettingId"] as string
        );
      }
      return null;
    },
    imageMeasurements: async (parent, _, { dataSources }) => {
      if (parent["id"]) {
        const imageMeasurementsData =
          await dataSources.ImageTimeseriesApi.getImageTimeseriesVersionTwo(
            parent["id"] as string
          );
        let measurements = null;

        imageMeasurementsData?.content.forEach((m) => {
          measurements = merge(measurements, m.measurements);
        });

        return measurements;
      }
      return null;
    },

    protocol: (parent, _, { dataSources }) => {
      if (parent["protocolId"]) {
        return dataSources.ProtocolsApi.getProtocolById(
          parent["protocolId"] as string
        );
      }
      return null;
    },
    well: (parent, _, { dataSources }) => {
      if (parent["wellId"]) {
        return dataSources.WellAPI.getWellById(parent["wellId"] as string);
      }
      return null;
    },
    event: (parent, _, { dataSources }) => {
      if (parent["eventId"]) {
        return dataSources.EventApi.getEventById(parent["eventId"] as string);
      }
      return null;
    },
  },
};
