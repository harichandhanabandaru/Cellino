import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    phases: async (_, __, { dataSources }) => dataSources.phaseApi.getPhases(),
    phase: async (_, { id }, { dataSources }) =>
      dataSources.phaseApi.getPhaseById(id),
  },
  Phase: {
    phaseName: async (parent) => {
      if (parent?.["name"]) {
        return parent?.["name"];
      }
      return null;
    },
    plateData: async (parent, args, { dataSources }) => {
      const data = { ...args, currentPhaseId: parent?.id };
      if (parent?.id) {
        return await dataSources.platesAPI.getRunPlates(data);
      }
    },
  },
};
