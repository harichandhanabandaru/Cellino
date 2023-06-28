import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";

import { RunApi } from "./datasources/run-api.js";
import { PartnerApi } from "./datasources/partner-api.js";
import { UserApi } from "./datasources/user-api.js";
import { WellApi } from "./datasources/well-api.js";
import { PlatesAPI } from "./datasources/plate-api.js";
import { ColonyAPI } from "./datasources/colonies-api.js";
import { ClusterAPI } from "./datasources/clusters-api.js";
import { PhaseApi } from "./datasources/phase-api.js";
import { InferenceAPI } from "./datasources/inference-api.js";
import { ZarrAuthTokenAPI } from "./datasources/zarr-auth-token-api.js";
import { WorkflowDetailsApi } from "./datasources/workflow-api.js";
import { passagesApi } from "./datasources/passage-api.js";
import { LabwareAPI } from "./datasources/labware-api.js";
import { ProtocolsApi } from "./datasources/protocol-api.js";

import Root from "./modules/root/index.js";
import Runs from "./modules/run/index.js";
import Plates from "./modules/plate/index.js";
import Partner from "./modules/partner/index.js";
import User from "./modules/user/index.js";
import Colonies from "./modules/colonies/index.js";
import Clusters from "./modules/clusters/index.js";
import Phases from "./modules/phase/index.js";
import ImageEvent from "./modules/image-event/index.js";
import ImageSetting from "./modules/image-setting/index.js";
import ImageTimeSeries from "./modules/image-timeseries/index.js";
import Events from "./modules/event/index.js";
import Protocols from "./modules/protocol/index.js";
import ScanObjects from "./modules/scan-object/index.js";
import ImageAnalysisRequest from "./modules/image-analysis-request/index.js";

import properties from "./utils/properties.js";
import Wells from "./modules/well/index.js";
import Inference from "./modules/inference/index.js";
import ZarrAuthToken from "./modules/zarr-auth-token/index.js";
import WorkflowDetails from "./modules/workflow/index.js";
import { ImageEventApi } from "./datasources/image-event-api.js";
import { ImageSettingApi } from "./datasources/image-setting-api.js";
import { EventApi } from "./datasources/event-api.js";
import { ImageTimeseriesApi } from "./datasources/image-timeseries-api.js";
import { ScanObjectApi } from "./datasources/scan-object-api.js";
import passages from "./modules/passage/index.js";
import { ImageAnalysisRequestApi } from "./datasources/image-analysis-request-api.js";

const modules = [
  Root,
  Runs,
  Plates,
  Partner,
  User,
  Colonies,
  Clusters,
  Wells,
  Phases,
  Inference,
  ImageEvent,
  ImageSetting,
  ZarrAuthToken,
  WorkflowDetails,
  Events,
  passages,
  ImageTimeSeries,
  Protocols,
  ScanObjects,
  ImageAnalysisRequest,
];

export interface MyContext {
  dataSources: {
    runAPI: RunApi;
    partnerAPI: PartnerApi;
    platesAPI: PlatesAPI;
    phaseApi: PhaseApi;
    userAPI: UserApi;
    ColonyAPI: ColonyAPI;
    ClusterAPI: ClusterAPI;
    WellAPI: WellApi;
    InferenceAPI: InferenceAPI;
    ImageEventAPI: ImageEventApi;
    ImageSettingAPI: ImageSettingApi;
    ZarrAuthTokenAPI: ZarrAuthTokenAPI;
    WorkflowDetailsApi: WorkflowDetailsApi;
    EventApi: EventApi;
    passagesApi: passagesApi;
    LabwareAPI: LabwareAPI;
    ImageTimeseriesApi: ImageTimeseriesApi;
    ProtocolsApi: ProtocolsApi;
    scanObjectsApi: ScanObjectApi;
    imageAnalysisRequestApi: ImageAnalysisRequestApi;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs: modules.map((module) => module.typeDefs),
  resolvers: modules.map((module) => module.resolvers),
  plugins: [
    process.env.ENABLE_GRAPHQL_PLAYGROUND === "true"
      ? ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })
      : ApolloServerPluginLandingPageDisabled(),
  ],
  introspection: process.env.ENABLE_GRAPHQL_PLAYGROUND === "true",
  allowBatchedHttpRequests: true,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const options = { headers: req.headers };

    return {
      dataSources: {
        runAPI: new RunApi(options),
        partnerAPI: new PartnerApi(options),
        platesAPI: new PlatesAPI(options),
        phaseApi: new PhaseApi(options),
        userAPI: new UserApi(options),
        ColonyAPI: new ColonyAPI(options),
        ClusterAPI: new ClusterAPI(options),
        WellAPI: new WellApi(options),
        InferenceAPI: new InferenceAPI(options),
        ImageEventAPI: new ImageEventApi(options),
        ImageSettingAPI: new ImageSettingApi(options),
        ZarrAuthTokenAPI: new ZarrAuthTokenAPI(),
        WorkflowDetailsApi: new WorkflowDetailsApi(options),
        EventApi: new EventApi(options),
        passagesApi: new passagesApi(options),
        LabwareAPI: new LabwareAPI(options),
        ImageTimeseriesApi: new ImageTimeseriesApi(options),
        ProtocolsApi: new ProtocolsApi(options),
        scanObjectsApi: new ScanObjectApi(options),
        imageAnalysisRequestApi: new ImageAnalysisRequestApi(options),
      },
    };
  },
  listen: { port: properties.port },
});

console.log(`🚀  Server ready at ${url}`);
