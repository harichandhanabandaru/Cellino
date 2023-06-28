import { IncomingHttpHeaders } from "http";
import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { Inference } from "../__generated__/resolvers-types";

class InferenceAPI extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = `${properties.WellMetaData}`;
  }

  async getInferenceArtifactsByEventImageId(
    imageEventId: string
  ): Promise<Inference[]> {
    console.log(
      new Date(),
      `InferenceAPI.getInferenceArtifactsByEventImageId. args:\n${JSON.stringify(
        imageEventId,
        null,
        2
      )}`
    );
    return await this.get(`v1/inferences`, { params: { imageEventId } });
  }

  async getInferenceArtifactsByImageAnalysisRequestId(
    imageAnalysisRequestId: string
  ): Promise<Inference[]> {
    console.log(
      new Date(),
      `InferenceAPI.getInferenceArtifactsByImageAnalysisRequestId. args:\n${JSON.stringify(
        imageAnalysisRequestId,
        null,
        2
      )}`
    );
    return await this.get(`v1/inferences`, {
      params: { imageAnalysisRequestId },
    });
  }
}

export { InferenceAPI };
