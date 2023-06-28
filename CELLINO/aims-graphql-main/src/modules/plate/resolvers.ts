import {
  ImageEventAnalysisStatus,
  Resolvers,
} from "../../__generated__/resolvers-types.js";

export const resolvers: Resolvers = {
  Query: {
    plates: async (_, args, { dataSources }) => {
      return dataSources.platesAPI.getRunPlates(args);
    },
    plate: async (_, { id }, { dataSources }) => {
      return dataSources.platesAPI.getRunPlateByPlateId(id);
    },
    plateReviewers: async (_, { page, size }, { dataSources }) => {
      return dataSources.platesAPI.getReviewerOnlyPlates(page, size);
    },
    plateContext: async (parent, { id }, { dataSources }) => {
      const wells = await dataSources.WellAPI.getWellsV2(id, "SCAN");
      const energyMapProtocol = await dataSources.ProtocolsApi.getProtocols(
        "energy_map"
      );
      const protocolIds = energyMapProtocol?.content?.map((x) => x.id);
      const plateContextWells = [];
      for (const well of wells) {
        const imageEvents = await dataSources.ImageEventAPI.getImageEvents({
          wellId: well.id,
          analysisStatus: ImageEventAnalysisStatus.Success,
        });
        const imageEvent = imageEvents.pop();
        const imageAnalysisRequests =
          await dataSources.imageAnalysisRequestApi.getImageAnalysisRequests(
            imageEvent.id,
            protocolIds,
            false,
            "SUCCESS"
          );
        const imageAnalysisRequest = imageAnalysisRequests?.[0];
        const energyMap = imageAnalysisRequest
          ? (
              await dataSources.InferenceAPI.getInferenceArtifactsByImageAnalysisRequestId(
                imageAnalysisRequest.id
              )
            )[0]
          : null;
        const tempWell = dataSources.platesAPI.prepareWellForPlateContext(
          well,
          energyMap,
          imageEvent
        );
        plateContextWells.push(tempWell);
      }
      const plates = await dataSources.platesAPI.getPlatesByPlateIds([id]);
      const plate = plates?.[0];
      return {
        plate: {
          id,
          name: plate.name,
          barcode: plate.barcode,
        },
        wells: plateContextWells,
      };
    },
  },
  PlateReviewer: {
    user: async (parent, _, { dataSources }) => {
      return await dataSources.userAPI.getUserProfileById(parent?.["userId"]);
    },
  },
  Plate: {
    id: async (parent) => {
      if (parent) return parent.id;
      return null;
    },
    name: async (parent, _, { dataSources }) => {
      const data = await dataSources.platesAPI.loadPlatesByIdsDataLoader(
        parent?.["id"]
      );
      return data.name;
    },
    currentPhaseId: async (parent) => {
      if (parent?.["phaseId"]) return parent?.["phaseId"];
    },
    reviewStatus: async (parent, _, { dataSources }) => {
      const { reviewStatus } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return reviewStatus;
    },
    processStatus: async (parent, _, { dataSources }) => {
      const { processStatus } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return processStatus;
    },
    barcode: async (parent, _, { dataSources }) => {
      const { barcode } = await dataSources.platesAPI.loadPlatesByIdsDataLoader(
        parent?.["id"]
      );
      return barcode;
    },
    labware: async (parent, _, { dataSources }) => {
      const { labwareId } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return await dataSources.LabwareAPI.getLabwareById(labwareId);
    },
    analysisStatus: async (parent, _, { dataSources }) => {
      const { analysisStatus } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return analysisStatus;
    },
    plateStatusReason: async (parent, _, { dataSources }) => {
      const { plateStatusReason } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return plateStatusReason;
    },
    analysisStatusDetail: async (parent, _, { dataSources }) => {
      const { analysisStatusDetail } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return analysisStatusDetail;
    },
    plateStatus: async (parent, _, { dataSources }) => {
      const { plateStatus } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return plateStatus;
    },
    processMetadata: async (parent, _, { dataSources }) => {
      const { processMetadata } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return processMetadata;
    },
    processStatusDetail: async (parent, _, { dataSources }) => {
      const { processStatusDetail } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      return processStatusDetail;
    },
    run: async (parent, _, { dataSources }) => {
      if (!parent?.["runId"]) {
        return null;
      }
      let run = await dataSources.runAPI.getRunById(parent?.["runId"]);
      const runOwner = await dataSources.userAPI.getUserProfileById(
        run?.["runOwnerId"]
      );
      run = {
        ...run,
        runOwner: runOwner || null,
      };
      return run;
    },
    reviewers: async (parent, _, { dataSources }) => {
      const { reviewers } =
        await dataSources.platesAPI.loadPlatesByIdsDataLoader(parent?.["id"]);
      if (reviewers && reviewers?.length !== 0) {
        const listOfReviewers = [];
        await Promise.all(
          reviewers?.map(async (reviewer) => {
            listOfReviewers.push(
              await dataSources.userAPI.getUserProfileById(reviewer as string)
            );
          })
        );
        return listOfReviewers;
      }

      return null;
    },
  },
  Mutation: {
    updatePlate: async (_, args, { dataSources }) =>
      dataSources.platesAPI.updatePlate(args),
    assignReviewerToPlates: async (
      _,
      { plateIds, userId },
      { dataSources }
    ) => {
      return dataSources.platesAPI.assignReviewerToPlates(plateIds, userId);
    },
    unassignReviewerToPlate: async (
      _,
      { plateId, userId },
      { dataSources }
    ) => {
      return dataSources.platesAPI.unassignReviewerToPlate(plateId, userId);
    },
  },
};
