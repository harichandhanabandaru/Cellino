import { Injectable } from "@nestjs/common";
import { GetWellRequestDTO } from "src/dto/get-well-request.dto";
import { WellDTO } from "src/dto/well.dto";

@Injectable()
export class ExternalWellService {
  private baseUrl = `${process.env.WELL_MGMT_SVC}`;

  async fetchWell(request: GetWellRequestDTO) {
    const { plateId, wellPosition } = request;
    const url = new URL(`${this.baseUrl}/v2/wells`);
    if (plateId) {
      url.searchParams.set("plateId", plateId);
    }
    if (wellPosition) {
      url.searchParams.set("wellPosition", wellPosition);
    }
    const res = await fetch(url);
    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(`fetchWell: ${JSON.stringify(errorJson, null, 2)}`);
    }
    const wells: WellDTO[] = await res.json();
    return wells;
  }
}
