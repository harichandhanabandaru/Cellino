import { IncomingHttpHeaders } from "http";
import properties from "../utils/properties.js";
import { Labware } from "../__generated__/resolvers-types.js";
import { Datasource } from "./datasource.js";

class LabwareAPI extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getLabwareById(id: string): Promise<Labware> {
    console.log(new Date(), `LabwareAPI.getLabwareById. args:${id}`);
    return await this.get(`v1/labwares/${encodeURIComponent(id)}`);
  }
}

export { LabwareAPI };
