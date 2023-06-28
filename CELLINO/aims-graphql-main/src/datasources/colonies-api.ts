import { IncomingHttpHeaders } from "http";
import {
  convertMmToPixelCoords,
  convertPixelCoordsToMm,
} from "../utils/convert-outline-coords.js";
import properties from "../utils/properties.js";
import {
  Colony,
  ColonyAndCluster,
  CreateClusterRequest,
  CreateColonyRequest,
  PatchOperation,
} from "../__generated__/resolvers-types.js";
import { Datasource } from "./datasource.js";

class ColonyAPI extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = `${properties.WellMetaData}`;
    if (process.env.ENVIRONMENT === "local") {
      this.headers["user-profile"] =
        '{"id":"e62ab093-d51b-427d-abaa-fa59e51d55da"}';
    }
  }

  async getColoniesById(
    imageEventId: string,
    quality: string
  ): Promise<Colony[]> {
    const params = new URLSearchParams();
    params.set("imageEventId", imageEventId);
    if (quality) {
      params.set("quality", quality);
    }
    return await this.get(`v1/colonies`, { params });
  }

  async getColonyMetrics(imageEventId: string) {
    const params = new URLSearchParams();
    params.set("imageEventId", imageEventId);
    return await this.get(`v1/colonies/quality/count`, { params });
  }

  async updateColony(args: {
    id: string;
    ops: PatchOperation[];
  }): Promise<Colony> {
    const { id, ops } = args;
    return this.patch(`v1/colonies/${encodeURIComponent(id)}`, { body: ops });
  }

  async createColonyAndCluster(
    colonyData: CreateColonyRequest,
    clusterData: CreateClusterRequest
  ): Promise<ColonyAndCluster> {
    const newColony = await this.post(`v1/colonies`, { body: colonyData });
    const { imageEventId, name, quality, imageAnalysisRequestId } = clusterData;
    const { imageSettingId } = await this.get(
      `v1/image-events/${encodeURIComponent(imageEventId)}`
    );

    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(imageSettingId)}`
    );
    const outline = convertPixelCoordsToMm(clusterData, metadata);

    const clusterBody = {
      imageEventId,
      colonyId: newColony.id,
      name: name,
      outline,
      quality,
      imageAnalysisRequestId,
    };
    const response = await this.post(`v1/clusters`, { body: clusterBody });
    const newCluster = {
      ...response,
      outline: convertMmToPixelCoords(response.outline, metadata),
    };
    return { colony: newColony, cluster: newCluster };
  }
}

export { ColonyAPI };
