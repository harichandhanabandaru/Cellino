import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import {
  convertPixelCoordsToMm,
  convertMmToPixelCoords,
} from "../utils/convert-outline-coords.js";
import { IncomingHttpHeaders } from "http";
import {
  Cluster,
  CreateClusterRequest,
  PaginatedClusters,
  PatchOperation,
  ClusterMetrics,
} from "../__generated__/resolvers-types.js";

class ClusterAPI extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.WellMetaData;
    if (process.env.ENVIRONMENT === "local") {
      this.headers["user-profile"] =
        '{"id":"e62ab093-d51b-427d-abaa-fa59e51d55da"}';
    }
  }

  /**
   * getClustersById
   * @param {string} imageEventId
   * @returns cluster objects
   *
   * TODO: update args to take either image_analysis_request_id or image_event_id. check scan-objects implementation
   */
  async getClustersById(
    imageEventId: string,
    imageAnalysisRequestId: string,
    colonyIds: string[],
    page: number,
    size: number,
    freeClusters: boolean
  ): Promise<PaginatedClusters> {
    console.log(
      new Date(),
      `ClusterAPI.getClustersById. args:\n${JSON.stringify(
        imageEventId,
        null,
        2
      )}`
    );

    const params = new URLSearchParams();
    if (imageEventId) params.set("imageEventId", imageEventId);

    if (imageAnalysisRequestId)
      params.set("imageAnalysisRequestId", imageAnalysisRequestId);

    if (colonyIds && colonyIds?.length > 0) {
      params.set("colonyIds", colonyIds.join(","));
    }

    if (page) params.set("page", page.toString());
    if (size) params.set("size", size.toString());
    if (freeClusters) params.set("freeClusters", freeClusters.toString());

    const { imageSettingId } = await this.get(
      `v1/image-events/${encodeURIComponent(imageEventId)}`
    );

    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(imageSettingId)}`
    );

    const clusterDataInMm = await this.get(`v1/clusters`, { params });

    const clusterDataInPixelCoords = clusterDataInMm?.content?.map(
      (clusterData: Cluster) => ({
        ...clusterData,
        outline: convertMmToPixelCoords(clusterData.outline, metadata),
      })
    );

    return {
      content: clusterDataInPixelCoords,
      pageInfo: clusterDataInMm.pageInfo,
    };
  }

  async getClusterMetrics(
    imageEventId: string,
    freeClusters: boolean
  ): Promise<ClusterMetrics[]> {
    const params = new URLSearchParams();
    if (imageEventId) params.set("imageEventId", imageEventId);
    if (freeClusters) params.set("freeClusters", freeClusters.toString());
    return await this.get(`/v1/clusters/image-analysis-request-id/count`, {
      params,
    });
  }

  /**
   * createCluster
   * @returns
   *
   * TODO: this function needs a lot of defensive code
   * @param clusterDataInPixelCoords
   */
  async createCluster(
    clusterDataInPixelCoords: CreateClusterRequest
  ): Promise<Cluster> {
    const { imageEventId, colonyId, name, quality, imageAnalysisRequestId } =
      clusterDataInPixelCoords;

    const { imageSettingId } = await this.get(
      `v1/image-events/${encodeURIComponent(imageEventId)}`
    );

    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(imageSettingId)}`
    );

    const outline = convertPixelCoordsToMm(clusterDataInPixelCoords, metadata);

    const body = {
      imageEventId,
      colonyId,
      name,
      outline,
      quality,
      imageAnalysisRequestId,
    };

    console.log(
      new Date(),
      `ClusterAPI.getClustersById. args:\n${JSON.stringify(body, null, 2)}`
    );

    const response = await this.post(`v1/clusters`, { body });

    return {
      ...response,
      outline: convertMmToPixelCoords(response.outline, metadata),
    };
  }

  /**
   * updateCluster
   * @param {object} args
   * @returns
   */
  async updateCluster(args: {
    id: string;
    ops: PatchOperation[];
  }): Promise<Cluster> {
    const { id, ops } = args;

    const response = await this.patch(`v1/clusters/${encodeURIComponent(id)}`, {
      body: ops,
    });
    const { imageSettingId } = await this.get(
      `v1/image-events/${encodeURIComponent(response.imageEventId)}`
    );

    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(imageSettingId)}`
    );
    return {
      ...response,
      outline: convertMmToPixelCoords(response.outline, metadata),
    };
  }

  async updateClusterOutline(args) {
    const { interiors, exterior, id, imageEventId } = args;

    const { imageSettingId } = await this.get(
      `v1/image-events/${encodeURIComponent(imageEventId)}`
    );

    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(imageSettingId)}`
    );

    const outline = convertPixelCoordsToMm({ interiors, exterior }, metadata);

    const body = [];
    for (const key in outline) {
      if (outline[key]) {
        body.push({
          op: "replace",
          path: `/outline/${key}`,
          value: outline[key],
        });
      }
    }
    const response = await this.patch(`v1/clusters/${encodeURIComponent(id)}`, {
      body,
    });
    return {
      ...response,
      outline: convertMmToPixelCoords(response.outline, metadata),
    };
  }
}

export { ClusterAPI };
