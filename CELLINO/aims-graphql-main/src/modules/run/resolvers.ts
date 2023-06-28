import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    runs: async (_, { ids, nameLike, page, size, status }, { dataSources }) =>
      dataSources.runAPI.getRuns(ids, nameLike, page, size, status),
    run: async (_, { id }, { dataSources }) =>
      dataSources.runAPI.getRunById(id),
    runStatusCount: async (_, __, { dataSources }) =>
      dataSources.runAPI.getRunStatusCount(),
  },
  Run: {
    name: async (parent, __, { dataSources }) => {
      if (parent?.name) {
        return parent?.name;
      }
      const run = await dataSources.runAPI.getRunById(parent.id);
      return run?.name;
    },
    metadata: async (parent) => {
      if (parent?.metadata) {
        return JSON.stringify(parent.metadata);
      }
      return null;
    },
    seedingDay: async (parent, __, { dataSources }) => {
      if (parent?.seedingDay) {
        return parent?.seedingDay;
      }
      const run = await dataSources.runAPI.getRunById(parent.id);
      return run?.seedingDay;
    },
    partner: async (parent, _, { dataSources }) => {
      const run = await dataSources.runAPI.getRunById(parent.id);
      const partner = await dataSources.partnerAPI.getPartners([run.partnerId]);
      return partner[0];
    },
    workflow: async (parent, __, { dataSources }) => {
      const run = await dataSources.runAPI.getRunById(parent.id);
      const workflow =
        run.workflowId &&
        (await dataSources.WorkflowDetailsApi.getWorkflowDetailsById(
          run.workflowId
        ));
      return workflow;
    },
    runMetric: async (parent, __, { dataSources }) => {
      if (parent?.id) {
        return await dataSources.runAPI.loadRunMetricsByIdsDataLoader(
          parent.id
        );
      }
      return null;
    },
    runOwner: async (parent, _, { dataSources }) => {
      if (!parent?.["runOwnerId"]) {
        return null;
      }
      const user = await dataSources.userAPI.getUserProfileById(
        parent?.["runOwnerId"]
      );
      return user;
    },
    runReviewer: async (parent, _, { dataSources }) => {
      if (parent?.["reviewers"] && parent?.["reviewers"].length !== 0) {
        const listOfReviewers = [];
        await Promise.all(
          parent?.["reviewers"].map(async (reviewer: string) => {
            listOfReviewers.push(
              await dataSources.userAPI.getUserProfileById(reviewer)
            );
          })
        );
        return listOfReviewers;
      }

      return null;
    },
  },
};
