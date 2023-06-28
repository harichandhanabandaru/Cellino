import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";

class ImageSettingApi extends Datasource {
  constructor(options) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.WellMetaData;
  }

  async getImageSettings(id) {
    return await this.get(`v1/image-settings/${encodeURIComponent(id)}`);
  }
}

export { ImageSettingApi };
