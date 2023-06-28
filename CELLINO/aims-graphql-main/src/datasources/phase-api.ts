import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { IncomingHttpHeaders } from "http";
import { Phase } from "../__generated__/resolvers-types";

class PhaseApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getPhases(): Promise<Phase[]> {
    const response = await this.get(`v1/phases`);
    return response.sort(
      (
        a: { order: number; name: string },
        b: { order: number; name: string }
      ) =>
        a.order >= b.order
          ? a.order === b.order
            ? a.name.localeCompare(b.name)
            : 1
          : -1
    );
  }

  async getPhaseById(id: string): Promise<Phase> {
    return await this.get(`v1/phases/${encodeURIComponent(id)}`);
  }
}

export { PhaseApi };
