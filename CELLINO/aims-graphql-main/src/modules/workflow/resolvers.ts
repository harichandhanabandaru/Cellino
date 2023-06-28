import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    workflowDetails: async (_, { id }, { dataSources }) =>
      dataSources.WorkflowDetailsApi.getWorkflowDetailsById(id),
  },
  WorkflowDetails: {
    phases: async (parent, __, { dataSources }) => {
      const listOfPhases = [];
      await Promise.all(
        parent?.phases.map(async (phase) => {
          const phaseResponse = await dataSources.phaseApi.getPhaseById(
            phase as string
          );
          listOfPhases.push(phaseResponse);
        })
      );
      return listOfPhases.sort((a, b) => (a.order > b.order ? 1 : -1));
    },
  },
};
