export const resolvers = {
  Query: {
    imageTimeseries: async (_, { wellId }, { dataSources }) =>
      dataSources.ImageTimeseriesApi.getImageTimeseries(wellId),
  },
};
