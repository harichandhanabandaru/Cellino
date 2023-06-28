import properties from "../utils/properties.js";
import {
  PaginatedProtocols,
  Protocol,
  ProtocolDefinition,
} from "../__generated__/resolvers-types.js";
import { Datasource } from "./datasource.js";

class ProtocolsApi extends Datasource {
  constructor(options) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getProtocolById(id: string): Promise<Protocol> {
    return await this.get(`v1/protocols/${encodeURIComponent(id)}`);
  }

  async getProtocols(category: string): Promise<PaginatedProtocols> {
    const protocolDefinitionParams = new URLSearchParams();
    const protocolParams = new URLSearchParams();
    if (category) {
      protocolDefinitionParams.set("category", category);
    }
    const response = await this.get(`v1/protocol-definitions`, {
      params: protocolDefinitionParams,
    });
    const protocolDefinitionIds = response.content.map(
      (protocolDefinition: ProtocolDefinition) => protocolDefinition.id
    );
    if (protocolDefinitionIds?.length > 0) {
      protocolParams.set(
        "protocolDefinitionIds",
        protocolDefinitionIds.join(",")
      );
    }
    return await this.get(`v2/protocols`, { params: protocolParams });
  }
}

export { ProtocolsApi };
