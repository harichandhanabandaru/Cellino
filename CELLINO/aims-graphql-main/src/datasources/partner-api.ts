import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { IncomingHttpHeaders } from "http";
import { Partner } from "../__generated__/resolvers-types.js";

class PartnerApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getPartners(ids: string[]): Promise<Partner[]> {
    const params = new URLSearchParams();

    if (Array.isArray(ids) && ids.length > 0) {
      params.set("ids", ids.join(","));
    }

    return await this.get(`v1/partners`, { params });
  }
}

export { PartnerApi };
