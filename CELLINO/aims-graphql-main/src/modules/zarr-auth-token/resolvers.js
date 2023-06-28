export const resolvers = {
  Mutation: {
    generateToken: async (_, _args, { dataSources }) =>
      dataSources.ZarrAuthTokenAPI.tokenConsumer(),
  },
};
