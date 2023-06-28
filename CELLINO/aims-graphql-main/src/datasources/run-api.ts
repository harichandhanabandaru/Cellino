import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { IncomingHttpHeaders } from "http";
import { URLSearchParams } from "url";
import {
  PaginatedRun,
  Run,
  RunStatusCountRes,
} from "../__generated__/resolvers-types.js";
import DataLoader from "dataloader";

// TODO: @sravani/@arpit: get these values from a look up table instead of hardcoding it in the code
//       also, move this into its own query and cache it from 1 hour
function getRunStatusLabel(code) {
  switch (code) {
    case "totalRuns":
      return "Total Runs";
    case "inProgressRuns":
      return "In progress";
    case "completedRuns":
      return "Completed";
    case "abortedRuns":
      return "Aborted";
    default:
      return code;
  }
}

class RunApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getRunMetricsByRunIds(ids: string[]) {
    const params = new URLSearchParams();
    if (ids && ids?.length > 0) {
      params.set("runIds", ids.join(","));
    }
    return await this.get("v1/run-metrics", { params });
  }

  private runMetricsByIdsLoader = new DataLoader(async (ids) => {
    const runMetricData = await this.getRunMetricsByRunIds(ids as string[]);
    const orderedData = ids.map((id) =>
      runMetricData?.find?.((runMetric) => runMetric.runId === id)
    );
    return orderedData;
  });

  async loadRunMetricsByIdsDataLoader(id: string) {
    return await this.runMetricsByIdsLoader.load(id);
  }

  async getRuns(
    ids: string,
    nameLike,
    page: number,
    size: number,
    status: string
  ): Promise<PaginatedRun> {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (page) params.set("page", page.toString());
    if (size) params.set("size", size.toString());
    return await this.get("v1/runs", { params });
  }

  async getRunById(id: string): Promise<Run> {
    return await this.get(`v1/runs/${encodeURIComponent(id)}`);
  }

  async getRunStatusCount(): Promise<RunStatusCountRes[]> {
    const response = await this.get(`v1/runs/run-status-count`);

    return Object.keys(response).map((item) => ({
      runStatus: getRunStatusLabel(item),
      count: response[item],
    }));
  }
}

export { RunApi };
