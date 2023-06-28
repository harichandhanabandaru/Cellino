import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { IncomingHttpHeaders } from "http";
import { WorkflowDetails } from "../__generated__/resolvers-types.js";

// TO DO - should we get the type codes from a DB lookup table instead of hardcoding like this?
function getWorkflowType(type: string) {
  switch (type) {
    case "R_AND_D":
      return "R&D";
    case "ENGINEERING":
      return "Engineering";
    case "R_AND_D_PRODUCTION":
      return "R&D Production";
    default:
      return "";
  }
}

class WorkflowDetailsApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getWorkflowDetailsById(id: string): Promise<WorkflowDetails> {
    const response = await this.get(`v1/workflows/${encodeURIComponent(id)}`);
    return {
      ...response,
      type: getWorkflowType(response?.type),
    };
  }
}

export { WorkflowDetailsApi };
