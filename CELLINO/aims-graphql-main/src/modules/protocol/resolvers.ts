import { Resolvers } from "../../__generated__/resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    protocols: async (_, { category }, { dataSources }) =>
      dataSources.ProtocolsApi.getProtocols(category),
  },
  Protocol: {
    name: async ({ name, id }, _, { dataSources }) => {
      if (name) {
        return name;
      } else if (id) {
        const protocol = await dataSources.ProtocolsApi.getProtocolById(id);
        return protocol.name;
      }
      return null;
    },

    settings: async ({ settings, id }, _, { dataSources }) => {
      if (settings) {
        return settings;
      } else if (id) {
        const protocol = await dataSources.ProtocolsApi.getProtocolById(id);
        return protocol.settings;
      }
      return null;
    },

    protocolDefinition: async (parent) => {
      if (parent["protocolDefintionId"]) {
        return {
          id: parent["protocolDefintionId"] as string,
        };
      }
    },
  },
};
