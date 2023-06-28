import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { IncomingHttpHeaders } from "http";
import {
  CreateScanObjectRequest,
  MutationDeleteScanObjectArgs,
  MutationUpdateScanObjectArgs,
  ScanObject,
  StatusMessage,
} from "../__generated__/resolvers-types.js";

import {
  convertPixelCoordsToMm,
  convertMmToPixelCoords,
} from "../utils/convert-outline-coords.js";

const DEFAULT_SCAN_OBJECTS_SIZE = "10000";

interface ScanObjectResponse extends ScanObject {
  imageAnalysisRequestId: string;
  imageEventId: string;
}

class ScanObjectApi extends Datasource {
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

  reduceScanObject(response: ScanObjectResponse): ScanObject {
    return {
      id: response.id,
      name: response.name,
      imageAnalysisRequest: {
        id: response.imageAnalysisRequestId,
      },
      imageEvent: {
        id: response.imageEventId,
      },
      outline: response.outline,
      attributes: response.attributes,
    } as ScanObject;
  }

  /**
   * createScanObject
   * @param scanObjectData CreateScanObjectRequest
   * @returns
   */
  async createScanObject(scanObjectData: CreateScanObjectRequest) {
    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(scanObjectData.imageSettingId)}`
    );

    const outline = convertPixelCoordsToMm(scanObjectData, metadata);

    const body = {
      imageEventId: scanObjectData.imageEventId,
      imageAnalysisRequestId: scanObjectData.imageAnalysisRequestId,
      name: scanObjectData.name,
      attributes: scanObjectData?.attributes,
      outline,
    };

    const response = await this.post(`v1/scan-objects`, { body });

    return this.reduceScanObject({
      ...response,
      outline: convertMmToPixelCoords(response.outline, metadata),
    });
  }

  /**
   * getScanObjects
   * @param imageAnalysisRequestId String
   * @param imageEventId String
   * @returns
   */
  async getScanObjects(imageAnalysisRequestId: string, imageEventId: string) {
    const params = new URLSearchParams();

    if (imageAnalysisRequestId)
      params.set("imageAnalysisRequestId", imageAnalysisRequestId);

    params.set("size", DEFAULT_SCAN_OBJECTS_SIZE);

    const { imageSettingId } = await this.get(
      `v1/image-events/${encodeURIComponent(imageEventId)}`
    );

    const { metadata } = await this.get(
      `v1/image-settings/${encodeURIComponent(imageSettingId)}`
    );

    const response = await this.get(`/v1/scan-objects`, { params });

    const updatedResponse = response?.content.map(
      (scanObject: ScanObjectResponse) =>
        this.reduceScanObject({
          ...scanObject,
          outline: convertMmToPixelCoords(scanObject.outline, metadata),
        })
    );

    return { content: updatedResponse, pageInfo: response.pageInfo };
  }

  /**
   * getScanObjectMetrics
   * @param imageEventId String
   * @returns
   */
  async getScanObjectMetrics(imageEventId: string) {
    const params = new URLSearchParams();
    if (imageEventId) params.set("imageEventId", imageEventId);
    return await this.get(`/v1/scan-objects/image-analysis-request-id/count`, {
      params,
    });
  }

  async updateScanObject(args: MutationUpdateScanObjectArgs) {
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

    const scanObject = await this.patch(
      `v1/scan-objects/${encodeURIComponent(id)}`,
      {
        body,
      }
    );
    return this.reduceScanObject({
      ...scanObject,
      outline: convertMmToPixelCoords(scanObject.outline, metadata),
    });
  }

  async deleteScanObject(
    args: MutationDeleteScanObjectArgs
  ): Promise<StatusMessage> {
    const { id } = args;
    return await this.delete(`v1/scan-objects/${encodeURIComponent(id)}`, {
      body: {},
    });
  } 
}

export { ScanObjectApi };
