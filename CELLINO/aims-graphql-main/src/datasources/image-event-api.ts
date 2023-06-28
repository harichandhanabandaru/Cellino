import properties from "../utils/properties.js";
import { IncomingHttpHeaders } from "http";
import {
  ImageEvent,
  MutationUpdateImageEventArgs,
  QueryImageEventsArgs,
} from "../__generated__/resolvers-types";
import { Datasource } from "./datasource.js";

class ImageEventApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = `${properties.WellMetaData}`;
  }

  async getImageEvent(id: string): Promise<ImageEvent> {
    return await this.get(`v1/image-events/${encodeURIComponent(id)}`);
  }

  async updateImageEvent(
    args: MutationUpdateImageEventArgs
  ): Promise<ImageEvent> {
    const { imageEventId, ops } = args;
    console.log(
      new Date(),
      `WellAPI.updateWellReviewStatus. args:\n${JSON.stringify(args, null, 2)}`
    );

    const response = await this.patch(
      `v1/image-events/${encodeURIComponent(imageEventId)}`,
      { body: ops }
    );
    const id = response && response.wellId ? response.wellId : null;

    return {
      ...response,
      id,
    };
  }

  async getImageEvents(args: QueryImageEventsArgs) {
    const { eventId, wellId, analysisStatus, isBaseImage } = args;
    let isBaseImageTemp;
    if (!(eventId || wellId)) {
      throw Error("At least one of eventId or wellId is needed!");
    }
    if (isBaseImage === true || isBaseImage === false) {
      isBaseImageTemp = Boolean(isBaseImage) ? "true" : "false";
    }
    return await this.get(`v1/image-events`, {
      params: {
        wellId,
        eventId,
        analysisStatus,
        isBaseImage: isBaseImageTemp,
      },
    });
  }
}

export { ImageEventApi };
