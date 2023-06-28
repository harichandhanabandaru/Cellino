import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { IncomingHttpHeaders } from "http";
import { URLSearchParams } from "url";
import {
  MutationUpdatePlateArgs,
  PaginatedPlateReviewer,
  PaginatedPlates,
  Plate,
  QueryPlatesArgs,
  RunPlate,
  RunPlateContent,
  StatusMessage,
} from "../__generated__/resolvers-types";
import DataLoader from "dataloader";

class PlatesAPI extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.RUNAPIServer;
  }

  private platesByIdsDataLoader = new DataLoader(async (ids) => {
    const plates = await this.getPlatesByPlateIds(ids as string[]);
    return ids.map((id) => plates?.find?.((plate) => plate.id === id));
  });

  async loadPlatesByIdsDataLoader(id) {
    return await this.platesByIdsDataLoader.load(id);
  }

  async getRunPlateByPlateId(id: string): Promise<Plate> {
    console.log(new Date(), `PlatesAPI.getRunPlateByPlateId. args:${id}`);
    const params = new URLSearchParams();
    params.set("plateIds", id);
    const runPlates: RunPlate = await this.get(`v1/run-plates`, { params });
    return {
      id: runPlates?.content?.[0].plateId,
      runId: runPlates?.content?.[0].runId,
      currentPhaseId: runPlates?.content?.[0]?.phaseId,
    } as Plate;
  }

  runPlateReducer(runPlates: RunPlateContent[]): Plate[] {
    return runPlates.map((x) => ({
      id: x.plateId,
      runId: x.runId,
      phaseId: x.phaseId,
    }));
  }

  async getRunPlates(args: QueryPlatesArgs) {
    const { currentPhaseId, page, runIds, size, plateNameList, passageList } =
      args;
    const params = new URLSearchParams();

    if (page) params.set("page", page.toString());
    if (size) params.set("size", size.toString());
    if (currentPhaseId) params.set("phaseIds", currentPhaseId);
    if (Array.isArray(plateNameList) && plateNameList.length > 0) {
      params.set("plateNames", plateNameList.join(","));
    }
    if (Array.isArray(runIds) && runIds.length > 0) {
      params.set("runIds", runIds.join(","));
    }
    if (Array.isArray(passageList) && passageList.length > 0) {
      params.set("passageNumbers", passageList.join(","));
    }
    const runPlates: RunPlate = await this.get(`v1/run-plates`, { params });
    return {
      content: this.runPlateReducer(runPlates.content),
      pageInfo: runPlates.pageInfo,
    } as PaginatedPlates;
  }

  async updatePlate(args: MutationUpdatePlateArgs): Promise<Plate> {
    const { id, ops } = args;
    console.log(
      new Date(),
      `PlatesAPI.updatePlate. args:\n${JSON.stringify(args, null, 2)}`
    );
    return this.patch(`v1/plates/${encodeURIComponent(id)}`, { body: ops });
  }

  async getReviewerOnlyPlates(
    page: number,
    size: number
  ): Promise<PaginatedPlateReviewer> {
    const url = "v1/plate-reviewers";
    const params = new URLSearchParams();

    if (page) params.set("page", page.toString());
    if (size) params.set("size", size.toString());

    return this.get(url, { params });
  }

  async assignReviewerToPlates(
    plateIds: string[],
    userId: string
  ): Promise<StatusMessage> {
    const reqBody = [
      {
        userId: userId,
        plateIds: plateIds,
      },
    ];
    return this.post(`v1/plate-reviewers`, { body: reqBody });
  }

  async unassignReviewerToPlate(
    plateId: string,
    userId: string
  ): Promise<StatusMessage> {
    const reqBody = [
      {
        userId: userId,
        plateIds: [plateId],
      },
    ];
    return this.delete(`v1/plate-reviewers`, { body: reqBody });
  }

  async getPlatesByPlateIds(ids: string[]) {
    const params = new URLSearchParams();
    if (ids && ids?.length > 0) {
      params.set("ids", ids.join(","));
    }
    return await this.get("v1/plates/collection", { params });
  }

  prepareWellForPlateContext(
    well: { id: string; position: string; status: string },
    energyMap?: { artifactPath?: { [p: string]: unknown } },
    imageEvent?: { id: string; reviewStatus: string }
  ) {
    // get scan status wells
    return {
      id: well.id,
      position: well.position,
      status: well.status,
      artifactPath: energyMap ? energyMap.artifactPath : null,
      imageEvent: {
        id: imageEvent.id,
        review_status: imageEvent.reviewStatus,
      },
    };
  }
}

export { PlatesAPI };
