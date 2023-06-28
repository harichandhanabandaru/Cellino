import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";

class passagesApi extends Datasource {
  constructor(options) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  async getPassages() {
    return await this.get(`v1/passages`);
  }
}

export { passagesApi };
