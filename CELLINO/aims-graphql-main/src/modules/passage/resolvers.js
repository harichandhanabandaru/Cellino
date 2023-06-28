export const resolvers = {
  Query: {
    passages: async (_, __, { dataSources }) => dataSources.passagesApi.getPassages(),
  },

};