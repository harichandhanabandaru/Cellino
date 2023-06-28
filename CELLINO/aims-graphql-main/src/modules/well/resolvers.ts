import properties from "../../utils/properties.js";
import { Resolvers } from "../../__generated__/resolvers-types.js";

export const resolvers: Resolvers = {
  Query: {
    wells: async (_, { plateId }, { dataSources }) =>
      dataSources.WellAPI.getWellListByPlateId(plateId),
    well: async (_, { wellId }, { dataSources }) =>
      dataSources.WellAPI.getWellById(wellId),
  },
  Mutation: {
    updateWellStatus: async (_, args, { dataSources }) =>
      dataSources.WellAPI.updateWellStatus(args),
  },
  Well: {
    zarrUrl: async (parent) => {
      if (parent?.artifactPath) {
        const { blob_path } = parent.artifactPath;
        return `${properties.cdnUrl}/${blob_path}`;
      }
      return null;
    },
    reviewers: async (parent, _, { dataSources }) => {
      if (parent.reviewers && parent.reviewers.length !== 0) {
        const listOfReviewers = [];
        await Promise.all(
          parent.reviewers.map(async (reviewer) => {
            listOfReviewers.push(
              await dataSources.userAPI.getUserProfileById(reviewer as string)
            );
          })
        );
        return listOfReviewers;
      }

      return null;
    },
  },
  ImageMeasurements: {
    thumbnailUrl: async (parent, { width }) => {
      if (
        Array.isArray(parent?.["derivedArtifacts"]) &&
        parent?.["derivedArtifacts"].length > 0
      ) {
        let artifact = parent?.["derivedArtifacts"].find(
          (x) => x.width === width
        );
        if (!artifact) {
          artifact = parent?.["derivedArtifacts"][0];
        }
        const { blob_path } = artifact;
        return `${properties.cdnUrl}/${blob_path}`;
      }
      return null;
    },
  },
  Measurements: {
    cells: async (parent) => {
      if (parent?.["cell_count"]) {
        return parent?.["cell_count"];
      }
      return null;
    },
  },
};
