import { IncomingHttpHeaders } from "http";
import properties from "../utils/properties.js";
import { PatchOperation, Well } from "../__generated__/resolvers-types.js";
import { Datasource } from "./datasource.js";

class WellApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = `${properties.WellMetaData}`;
  }

  async getWellListByPlateId(plateId: string): Promise<Well[]> {
    console.log(
      new Date(),
      `WellApi.getWellListByPlateId. args:\n${JSON.stringify(plateId, null, 2)}`
    );
    return await this.get(`v1/wells`, { params: { plateId } });
  }

  async getWellById(wellId: string): Promise<Well> {
    console.log(
      new Date(),
      `WellApi.getWellById. args:\n${JSON.stringify(wellId, null, 2)}`
    );
    return await this.get(`v1/wells/${encodeURIComponent(wellId)}`);
  }

  async updateWellStatus(args: {
    wellId: string;
    ops: PatchOperation[];
  }): Promise<Well> {
    const { wellId, ops } = args;
    return await this.patch(`v1/wells/${encodeURIComponent(wellId)}`, {
      body: ops,
    });
  }

  async getWellsV2(plateId: string, status: string) {
    return await this.get(`v2/wells`, { params: { plateId, status } });
  }
}

export { WellApi };
