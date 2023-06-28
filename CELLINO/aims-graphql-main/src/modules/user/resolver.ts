import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    users: async (_, __, { dataSources }) =>
      dataSources.userAPI.getAllActiveUsers(),

    userProfile: async (_, __, context) => {
      const headers = context.dataSources.userAPI.headers;
      const xGoogleAuthenticatedUserEmail = headers[
        "x-goog-authenticated-user-email"
      ] as string;
      const userEmail = xGoogleAuthenticatedUserEmail.split(":")[1];
      return context.dataSources.userAPI.getUserProfile(userEmail);
    },
  },
};
