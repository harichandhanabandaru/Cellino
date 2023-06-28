import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";

class ImageTimeseriesApi extends Datasource {
  constructor(options) {
    super();
    this.headers = options.headers;
    this.baseURL = `${properties.WellMetaData}`;
  }

  async getImageTimeseries(wellId) {
    return await this.get(`v1/image-timeseries`, { params: { wellId } });
  }

  async getImageTimeseriesVersionTwo(imageEventId) {
    const isDeveloperMode = false;
    return await this.get(`v2/image-timeseries`, {
      params: { imageEventId, isDeveloperMode },
    });
  }
}

export { ImageTimeseriesApi };
