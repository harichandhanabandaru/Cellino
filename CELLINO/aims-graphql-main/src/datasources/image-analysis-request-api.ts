import { IncomingHttpHeaders } from "http";
import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import {
  ImageAnalysisRequest,
  TriggerImageAnalysisRequest,
} from "../__generated__/resolvers-types";

export class ImageAnalysisRequestApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();

    this.headers = {
      ...options.headers,
    };

    if (process.env.ENVIRONMENT === "local") {
      this.headers["user-profile"] =
        '{"id":"e62ab093-d51b-427d-abaa-fa59e51d55da"}';
    }

    this.baseURL = `${properties.WellMetaData}`;
  }

  async getById(id: string): Promise<ImageAnalysisRequest> {
    return this.get(`v1/image-analysis-requests/${encodeURIComponent(id)}`);
  }

  async triggerImageAnalysis(
    triggerAnalysisRequestBody: TriggerImageAnalysisRequest
  ): Promise<ImageAnalysisRequest> {
    return this.post(`v1/image-analysis-requests/trigger-analysis`, {
      body: triggerAnalysisRequestBody,
    });
  }

  async getImageAnalysisRequests(
    imageEventId: string,
    protocolIds: string[],
    developerMode: boolean,
    status: string
  ) {
    const searchParams = new URLSearchParams();
    searchParams.set("imageEventId", imageEventId);
    searchParams.set("developerMode", developerMode ? "true" : "false");
    if (protocolIds?.length > 0) {
      searchParams.set("protocolIds", protocolIds.join(","));
    }
    if (status) {
      searchParams.set("status", status);
    }
    return await this.get("v1/image-analysis-requests", {
      params: searchParams,
    });
  }
}
