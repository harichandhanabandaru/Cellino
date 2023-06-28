import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export enum AnalysisStatus {
  Failure = "FAILURE",
  Inprogress = "INPROGRESS",
  Inqueue = "INQUEUE",
  Success = "SUCCESS",
}

export type Attributes = {
  __typename?: "Attributes";
  area?: Maybe<Scalars["Float"]>;
  circularity?: Maybe<Scalars["Float"]>;
};

export type AuthToken = {
  __typename?: "AuthToken";
  token?: Maybe<Scalars["String"]>;
};

export type BoundingBox = {
  __typename?: "BoundingBox";
  xmax?: Maybe<Scalars["Float"]>;
  xmin?: Maybe<Scalars["Float"]>;
  ymax?: Maybe<Scalars["Float"]>;
  ymin?: Maybe<Scalars["Float"]>;
};

export type BoundingBoxInput = {
  xmax?: InputMaybe<Scalars["Float"]>;
  xmin?: InputMaybe<Scalars["Float"]>;
  ymax?: InputMaybe<Scalars["Float"]>;
  ymin?: InputMaybe<Scalars["Float"]>;
};

export type Center = {
  __typename?: "Center";
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
};

export type CenterInput = {
  x?: InputMaybe<Scalars["Float"]>;
  y?: InputMaybe<Scalars["Float"]>;
};

export enum ChannelType {
  Brt = "BRT",
  Flour = "FLOUR",
  Virtual = "VIRTUAL",
}

export enum Clonality {
  Monoclonal = "MONOCLONAL",
  Polyclonal = "POLYCLONAL",
  Unknown = "UNKNOWN",
}

export enum CloneReviewStatus {
  Completed = "COMPLETED",
  Inreview = "INREVIEW",
}

export type Cluster = {
  __typename?: "Cluster";
  attributes?: Maybe<Attributes>;
  clonality?: Maybe<Clonality>;
  colony?: Maybe<Colony>;
  id: Scalars["ID"];
  imageAnalysisRequest?: Maybe<ImageAnalysisRequest>;
  imageEvent?: Maybe<ImageEvent>;
  name: Scalars["String"];
  nameId?: Maybe<Scalars["String"]>;
  outline?: Maybe<Scalars["JSON"]>;
  parents?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  phenoType?: Maybe<PhenoType>;
  quality?: Maybe<Quality>;
  type?: Maybe<ClusterType>;
  well?: Maybe<Well>;
};

export type ClusterMetrics = {
  __typename?: "ClusterMetrics";
  count: Scalars["Int"];
  imageAnalysisRequest: ImageAnalysisRequest;
};

export enum ClusterType {
  Edited = "EDITED",
  Manual = "MANUAL",
  Systemgenerated = "SYSTEMGENERATED",
}

export type Colony = {
  __typename?: "Colony";
  clonality?: Maybe<Clonality>;
  id?: Maybe<Scalars["ID"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
  isSelected?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  outline?: Maybe<Scalars["JSON"]>;
  quality?: Maybe<Quality>;
  type?: Maybe<Type>;
  well?: Maybe<Well>;
};

export type ColonyAndCluster = {
  __typename?: "ColonyAndCluster";
  cluster?: Maybe<Cluster>;
  colony?: Maybe<Colony>;
};

export type ColonyCountByQuality = {
  __typename?: "ColonyCountByQuality";
  count?: Maybe<Scalars["Int"]>;
  quality?: Maybe<Quality>;
};

export type ColonyMetrics = {
  __typename?: "ColonyMetrics";
  colonyCountByQuality?: Maybe<Array<Maybe<ColonyCountByQuality>>>;
  imageEventId: Scalars["ID"];
};

export type CreateClusterRequest = {
  colonyId?: InputMaybe<Scalars["ID"]>;
  color?: InputMaybe<Scalars["String"]>;
  exterior?: InputMaybe<Array<InputMaybe<PointInput>>>;
  imageAnalysisRequestId?: InputMaybe<Scalars["ID"]>;
  imageEventId: Scalars["ID"];
  interiors?: InputMaybe<Array<InputMaybe<Array<InputMaybe<PointInput>>>>>;
  name?: InputMaybe<Scalars["String"]>;
  quality?: InputMaybe<Quality>;
};

export type CreateColonyRequest = {
  isDeleted?: InputMaybe<Scalars["Boolean"]>;
  isSelected?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  outline?: InputMaybe<Scalars["JSON"]>;
  quality?: InputMaybe<Quality>;
  wellId: Scalars["ID"];
};

export type CreateProtocolRequest = {
  name?: InputMaybe<Scalars["String"]>;
};

export type CreateScanObjectRequest = {
  attributes?: InputMaybe<Scalars["JSON"]>;
  color?: InputMaybe<Scalars["String"]>;
  exterior: Array<InputMaybe<PointInput>>;
  imageAnalysisRequestId?: InputMaybe<Scalars["ID"]>;
  imageEventId: Scalars["ID"];
  imageSettingId: Scalars["ID"];
  interiors: Array<InputMaybe<Array<InputMaybe<PointInput>>>>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Dimension = {
  __typename?: "Dimension";
  height?: Maybe<Scalars["Int"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type Event = {
  __typename?: "Event";
  completedAt?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Scalars["String"]>;
  eventType?: Maybe<EventType>;
  id: Scalars["ID"];
  metadata?: Maybe<Scalars["String"]>;
  modifiedAt?: Maybe<Scalars["String"]>;
  modifiedBy?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  plateId?: Maybe<Scalars["ID"]>;
  startedAt?: Maybe<Scalars["String"]>;
};

export type EventMetadata = {
  __typename?: "EventMetadata";
  notes?: Maybe<Scalars["String"]>;
  settings?: Maybe<Scalars["String"]>;
};

export enum EventType {
  Analysis = "ANALYSIS",
  Assays = "ASSAYS",
  Delivery = "DELIVERY",
  Imaging = "IMAGING",
  Mediachange = "MEDIACHANGE",
  Scanning = "SCANNING",
  Seeding = "SEEDING",
  Transfer = "TRANSFER",
}

export type GroupImageEvent = {
  __typename?: "GroupImageEvent";
  eventId?: Maybe<Scalars["ID"]>;
  imageEvents?: Maybe<Array<Maybe<ImageEvent>>>;
};

export type ImageAnalysisRequest = {
  __typename?: "ImageAnalysisRequest";
  id: Scalars["ID"];
  imageEvent?: Maybe<ImageEvent>;
  inputParameters?: Maybe<Scalars["JSON"]>;
  isDeveloperMode?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  protocol?: Maybe<Protocol>;
  statusCode?: Maybe<Scalars["String"]>;
  statusDetails?: Maybe<Scalars["String"]>;
};

export type ImageEvent = {
  __typename?: "ImageEvent";
  artifactPath?: Maybe<Scalars["JSON"]>;
  completedAt?: Maybe<Scalars["String"]>;
  derivedArtifacts?: Maybe<ImageEventThumbnail>;
  event?: Maybe<Event>;
  id?: Maybe<Scalars["ID"]>;
  imageMeasurements?: Maybe<Scalars["JSON"]>;
  imageSetting?: Maybe<ImageSetting>;
  metadata?: Maybe<Scalars["JSON"]>;
  name?: Maybe<Scalars["String"]>;
  protocol?: Maybe<Protocol>;
  reviewStatus?: Maybe<WellReviewStatus>;
  startedAt?: Maybe<Scalars["String"]>;
  well?: Maybe<Well>;
};

export type ImageEventDerivedArtifactsArgs = {
  width?: InputMaybe<Scalars["Int"]>;
};

export enum ImageEventAnalysisStatus {
  Failure = "FAILURE",
  Inprogress = "INPROGRESS",
  Inqueue = "INQUEUE",
  Success = "SUCCESS",
}

export type ImageEventThumbnail = {
  __typename?: "ImageEventThumbnail";
  blob_path?: Maybe<Scalars["String"]>;
  bucket?: Maybe<Scalars["String"]>;
  datatype?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Int"]>;
  width?: Maybe<Scalars["Int"]>;
};

export type ImageMeasurements = {
  __typename?: "ImageMeasurements";
  createdAt?: Maybe<Scalars["String"]>;
  eventId?: Maybe<Scalars["ID"]>;
  imageEventId: Scalars["ID"];
  measurements?: Maybe<Measurements>;
  startedAt?: Maybe<Scalars["String"]>;
  thumbnailUrl?: Maybe<Scalars["String"]>;
};

export type ImageMeasurementsThumbnailUrlArgs = {
  width?: InputMaybe<Scalars["Int"]>;
};

export type ImageSetting = {
  __typename?: "ImageSetting";
  channelType?: Maybe<ChannelType>;
  colorMap?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  magnification?: Maybe<Scalars["String"]>;
  metadata: Scalars["JSON"];
  name: Scalars["String"];
  numberOfZStep?: Maybe<Scalars["Float"]>;
  zarray: Array<Scalars["Float"]>;
  zmax?: Maybe<Scalars["Float"]>;
  zmin?: Maybe<Scalars["Float"]>;
};

export type ImageSettingMetaData = {
  __typename?: "ImageSettingMetaData";
  data_type?: Maybe<Scalars["String"]>;
  exposure_time_us?: Maybe<Scalars["String"]>;
  height_px?: Maybe<Scalars["String"]>;
  illumination_level?: Maybe<Scalars["String"]>;
  objective_name?: Maybe<Scalars["String"]>;
  pixel_size_um?: Maybe<Scalars["String"]>;
  width_px?: Maybe<Scalars["String"]>;
  z_offset_um?: Maybe<Scalars["String"]>;
};

export type Inference = {
  __typename?: "Inference";
  artifactPath?: Maybe<Scalars["JSON"]>;
  id: Scalars["ID"];
  imageSetting?: Maybe<ImageSetting>;
  metadata?: Maybe<Scalars["JSON"]>;
  name?: Maybe<Scalars["String"]>;
  protocol?: Maybe<Protocol>;
};

export type Labware = {
  __typename?: "Labware";
  attributes?: Maybe<Scalars["JSON"]>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isActive?: Maybe<Scalars["Boolean"]>;
  labwareType?: Maybe<Scalars["String"]>;
  manufacturerId?: Maybe<Scalars["String"]>;
  modifiedAt?: Maybe<Scalars["String"]>;
  modifiedBy?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  vendorId?: Maybe<Scalars["String"]>;
};

export type Measurements = {
  __typename?: "Measurements";
  cells?: Maybe<Scalars["Int"]>;
  colonies?: Maybe<Scalars["Int"]>;
  confluence?: Maybe<Scalars["Float"]>;
  contaminationScore?: Maybe<Scalars["Float"]>;
  interiorConfluence?: Maybe<Scalars["Float"]>;
  nonLiveCellOccupancy?: Maybe<Scalars["Float"]>;
  occupancy?: Maybe<Scalars["Float"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  assignReviewerToPlates?: Maybe<StatusMessage>;
  createCluster?: Maybe<Cluster>;
  createColonyAndCluster?: Maybe<ColonyAndCluster>;
  createScanObject?: Maybe<ScanObject>;
  defaultMutation?: Maybe<Scalars["String"]>;
  deleteScanObject?: Maybe<StatusMessage>;
  generateToken: AuthToken;
  triggerImageAnalysis: ImageAnalysisRequest;
  unassignReviewerToPlate?: Maybe<StatusMessage>;
  updateCluster?: Maybe<Cluster>;
  updateClusterOutline?: Maybe<Cluster>;
  updateColony?: Maybe<Colony>;
  updateImageEvent?: Maybe<ImageEvent>;
  updatePlate?: Maybe<Plate>;
  updateScanObject?: Maybe<ScanObject>;
  updateWellStatus?: Maybe<Well>;
};

export type MutationAssignReviewerToPlatesArgs = {
  plateIds: Array<Scalars["ID"]>;
  userId: Scalars["ID"];
};

export type MutationCreateClusterArgs = {
  clusterData: CreateClusterRequest;
};

export type MutationCreateColonyAndClusterArgs = {
  clusterData: CreateClusterRequest;
  colonyData: CreateColonyRequest;
};

export type MutationCreateScanObjectArgs = {
  scanObjectData: CreateScanObjectRequest;
};

export type MutationDeleteScanObjectArgs = {
  id: Scalars["ID"];
};

export type MutationTriggerImageAnalysisArgs = {
  triggerAnalysisRequest: TriggerImageAnalysisRequest;
};

export type MutationUnassignReviewerToPlateArgs = {
  plateId: Scalars["ID"];
  userId: Scalars["ID"];
};

export type MutationUpdateClusterArgs = {
  id: Scalars["ID"];
  ops: Array<PatchOperation>;
};

export type MutationUpdateClusterOutlineArgs = {
  exterior: Array<InputMaybe<PointInput>>;
  id: Scalars["ID"];
  imageEventId: Scalars["ID"];
  interiors: Array<InputMaybe<Array<InputMaybe<PointInput>>>>;
};

export type MutationUpdateColonyArgs = {
  id: Scalars["ID"];
  ops: Array<PatchOperation>;
};

export type MutationUpdateImageEventArgs = {
  imageEventId: Scalars["ID"];
  ops: Array<PatchOperation>;
};

export type MutationUpdatePlateArgs = {
  id: Scalars["ID"];
  ops: Array<PatchOperation>;
};

export type MutationUpdateScanObjectArgs = {
  exterior: Array<InputMaybe<PointInput>>;
  id: Scalars["ID"];
  imageEventId: Scalars["ID"];
  interiors: Array<InputMaybe<Array<InputMaybe<PointInput>>>>;
};

export type MutationUpdateWellStatusArgs = {
  ops: Array<PatchOperation>;
  wellId: Scalars["ID"];
};

export type Outline = {
  __typename?: "Outline";
  boundingBox?: Maybe<BoundingBox>;
  center?: Maybe<Center>;
  color?: Maybe<Scalars["String"]>;
  exterior?: Maybe<Array<Maybe<Point>>>;
  interiors?: Maybe<Array<Maybe<Array<Maybe<Point>>>>>;
};

export type OutlineInput = {
  boundingBox?: InputMaybe<BoundingBoxInput>;
  center?: InputMaybe<CenterInput>;
  color?: InputMaybe<Scalars["String"]>;
  exterior?: InputMaybe<Array<InputMaybe<PointInput>>>;
  interiors?: InputMaybe<Array<InputMaybe<Array<InputMaybe<PointInput>>>>>;
};

export type PageInformation = {
  __typename?: "PageInformation";
  page?: Maybe<Scalars["Int"]>;
  size?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Int"]>;
};

export type PaginatedClusters = {
  __typename?: "PaginatedClusters";
  content?: Maybe<Array<Maybe<Cluster>>>;
  pageInfo?: Maybe<PageInformation>;
};

export type PaginatedPlateReviewer = {
  __typename?: "PaginatedPlateReviewer";
  content: Array<Maybe<PlateReviewer>>;
  pageInfo: PageInformation;
};

export type PaginatedPlates = {
  __typename?: "PaginatedPlates";
  content: Array<Maybe<Plate>>;
  pageInfo: PageInformation;
};

export type PaginatedProtocols = {
  __typename?: "PaginatedProtocols";
  content?: Maybe<Array<Maybe<Protocol>>>;
  pageInfo?: Maybe<PageInformation>;
};

export type PaginatedRun = {
  __typename?: "PaginatedRun";
  content: Array<Run>;
  pageInfo?: Maybe<RunPageInformation>;
};

export type PaginatedScanObject = {
  __typename?: "PaginatedScanObject";
  content?: Maybe<Array<Maybe<ScanObject>>>;
  pageInfo?: Maybe<PageInformation>;
};

export type Partner = {
  __typename?: "Partner";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Passage = {
  __typename?: "Passage";
  passagenumber?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type PatchOperation = {
  /** operaton to perform in patch */
  op: Scalars["String"];
  /** path of the field that is being patched */
  path: Scalars["String"];
  /** value of the field that is being patched */
  value?: InputMaybe<Scalars["JSON"]>;
};

export type Phase = {
  __typename?: "Phase";
  id?: Maybe<Scalars["ID"]>;
  order?: Maybe<Scalars["Int"]>;
  otherRules?: Maybe<Array<Maybe<PhaseRule>>>;
  phaseInitiationRules?: Maybe<Array<Maybe<PhaseRule>>>;
  phaseName?: Maybe<Scalars["String"]>;
  plateData?: Maybe<PaginatedPlates>;
};

export type PhasePlateDataArgs = {
  page?: InputMaybe<Scalars["Int"]>;
  passageList?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  plateNameList?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  reviewerIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  runIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  size?: InputMaybe<Scalars["Int"]>;
};

export type PhaseRule = {
  __typename?: "PhaseRule";
  key?: Maybe<Scalars["String"]>;
  operator?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export enum PhenoType {
  Fibroblast = "FIBROBLAST",
  Ipsc = "IPSC",
  Ipscdiff = "IPSCDIFF",
  Preipsc = "PREIPSC",
  Rpe = "RPE",
  Unknown = "UNKNOWN",
}

export type Plate = {
  __typename?: "Plate";
  analysisStatus?: Maybe<AnalysisStatus>;
  analysisStatusDetail?: Maybe<Scalars["String"]>;
  assignee?: Maybe<User>;
  assigneeId?: Maybe<Scalars["ID"]>;
  barcode?: Maybe<Scalars["String"]>;
  currentPhaseId?: Maybe<Scalars["ID"]>;
  eventIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  id: Scalars["ID"];
  labware?: Maybe<Labware>;
  name?: Maybe<Scalars["String"]>;
  plateStatus?: Maybe<PlateStatus>;
  plateStatusReason?: Maybe<Scalars["String"]>;
  processMetadata?: Maybe<ProcessMetaData>;
  processStatus?: Maybe<ProcessStatus>;
  processStatusDetail?: Maybe<Scalars["String"]>;
  reviewStatus?: Maybe<ReviewStatus>;
  reviewers?: Maybe<Array<Maybe<User>>>;
  run?: Maybe<Run>;
};

export type PlateBasicDetails = {
  __typename?: "PlateBasicDetails";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  runId?: Maybe<Scalars["ID"]>;
  runName?: Maybe<Scalars["String"]>;
};

export type PlateReviewer = {
  __typename?: "PlateReviewer";
  plate?: Maybe<Array<Maybe<PlateBasicDetails>>>;
  user?: Maybe<User>;
};

export enum PlateStatus {
  Drop = "DROP",
  Keep = "KEEP",
}

export type Point = {
  __typename?: "Point";
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
};

export type PointInput = {
  x?: InputMaybe<Scalars["Float"]>;
  y?: InputMaybe<Scalars["Float"]>;
};

export type ProcessMetaData = {
  __typename?: "ProcessMetaData";
  downSelectionDay?: Maybe<Scalars["Int"]>;
  passage_number?: Maybe<Scalars["Int"]>;
};

export enum ProcessStatus {
  Dropped = "DROPPED",
  Imaging = "IMAGING",
  Imagingqueue = "IMAGINGQUEUE",
  Inincubator = "ININCUBATOR",
  Retired = "RETIRED",
  Scanning = "SCANNING",
  Scanningqueue = "SCANNINGQUEUE",
}

export type Protocol = {
  __typename?: "Protocol";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  protocolDefinition?: Maybe<ProtocolDefinition>;
  settings?: Maybe<Scalars["JSON"]>;
};

export type ProtocolDefinition = {
  __typename?: "ProtocolDefinition";
  id?: Maybe<Scalars["ID"]>;
};

export enum Quality {
  Good = "GOOD",
  Medium = "MEDIUM",
  Poor = "POOR",
  Unknown = "UNKNOWN",
}

export type Query = {
  __typename?: "Query";
  Clusters?: Maybe<PaginatedClusters>;
  Colonies: Array<Maybe<Colony>>;
  clusterMetrics?: Maybe<Array<Maybe<ClusterMetrics>>>;
  colonyMetrics?: Maybe<ColonyMetrics>;
  defaultQuery?: Maybe<Scalars["String"]>;
  events?: Maybe<Array<Maybe<Event>>>;
  imageAnalysisRequest: Scalars["String"];
  imageEvent: ImageEvent;
  imageEvents?: Maybe<Array<Maybe<ImageEvent>>>;
  imageSettings: ImageSetting;
  imageTimeseries?: Maybe<Array<Maybe<ImageMeasurements>>>;
  inferences: Array<Maybe<Inference>>;
  partners?: Maybe<Array<Maybe<Partner>>>;
  passages?: Maybe<Passage>;
  phase: Phase;
  phases: Array<Maybe<Phase>>;
  plate: Plate;
  plateContext?: Maybe<Scalars["JSON"]>;
  plateReviewers: PaginatedPlateReviewer;
  plates: PaginatedPlates;
  protocols?: Maybe<PaginatedProtocols>;
  run: Run;
  runStatusCount: Array<Maybe<RunStatusCountRes>>;
  runs: PaginatedRun;
  scanObjectMetrics?: Maybe<Array<Maybe<ScanObjectMetrics>>>;
  scanObjects: PaginatedScanObject;
  userProfile?: Maybe<User>;
  users: Array<Maybe<User>>;
  well: Well;
  wells: Array<Maybe<Well>>;
  workflowDetails?: Maybe<WorkflowDetails>;
};

export type QueryClustersArgs = {
  colonyIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  freeClusters?: InputMaybe<Scalars["Boolean"]>;
  imageAnalysisRequestId?: InputMaybe<Scalars["ID"]>;
  imageEventId: Scalars["ID"];
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
};

export type QueryColoniesArgs = {
  imageEventId: Scalars["ID"];
  quality?: InputMaybe<Quality>;
};

export type QueryClusterMetricsArgs = {
  freeClusters?: InputMaybe<Scalars["Boolean"]>;
  imageEventId?: InputMaybe<Scalars["ID"]>;
};

export type QueryColonyMetricsArgs = {
  imageEventId: Scalars["ID"];
};

export type QueryEventsArgs = {
  eventType?: InputMaybe<Scalars["String"]>;
  plateId?: InputMaybe<Scalars["ID"]>;
};

export type QueryImageEventArgs = {
  id: Scalars["ID"];
};

export type QueryImageEventsArgs = {
  analysisStatus?: InputMaybe<ImageEventAnalysisStatus>;
  eventId?: InputMaybe<Scalars["ID"]>;
  isBaseImage?: InputMaybe<Scalars["Boolean"]>;
  wellId?: InputMaybe<Scalars["ID"]>;
};

export type QueryImageSettingsArgs = {
  id: Scalars["ID"];
};

export type QueryImageTimeseriesArgs = {
  wellId: Scalars["ID"];
};

export type QueryInferencesArgs = {
  imageEventId: Scalars["ID"];
};

export type QueryPartnersArgs = {
  id?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type QueryPhaseArgs = {
  id: Scalars["ID"];
};

export type QueryPlateArgs = {
  id: Scalars["ID"];
};

export type QueryPlateContextArgs = {
  id: Scalars["ID"];
};

export type QueryPlateReviewersArgs = {
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
};

export type QueryPlatesArgs = {
  currentPhaseId?: InputMaybe<Scalars["ID"]>;
  page?: InputMaybe<Scalars["Int"]>;
  passageList?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  plateNameList?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  reviewerIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  runIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  size?: InputMaybe<Scalars["Int"]>;
};

export type QueryProtocolsArgs = {
  category?: InputMaybe<Scalars["String"]>;
};

export type QueryRunArgs = {
  id: Scalars["ID"];
};

export type QueryRunsArgs = {
  ids?: InputMaybe<Scalars["ID"]>;
  nameLike?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
  status?: InputMaybe<RunStatus>;
};

export type QueryScanObjectMetricsArgs = {
  imageEventId?: InputMaybe<Scalars["ID"]>;
};

export type QueryScanObjectsArgs = {
  imageAnalysisRequestId: Scalars["ID"];
  imageEventId: Scalars["ID"];
};

export type QueryUsersArgs = {
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
};

export type QueryWellArgs = {
  wellId: Scalars["ID"];
};

export type QueryWellsArgs = {
  plateId: Scalars["ID"];
};

export type QueryWorkflowDetailsArgs = {
  id: Scalars["ID"];
};

export enum ReviewStatus {
  Confirmed = "CONFIRMED",
  Inprogress = "INPROGRESS",
  Notstarted = "NOTSTARTED",
}

export type Role = {
  __typename?: "Role";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  rule?: Maybe<Array<Maybe<Rule>>>;
};

export type Rule = {
  __typename?: "Rule";
  action?: Maybe<Array<Maybe<Scalars["String"]>>>;
  inverted?: Maybe<Scalars["Boolean"]>;
  subject?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Run = {
  __typename?: "Run";
  cloneReviewStatus?: Maybe<CloneReviewStatus>;
  creatorId?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  metadata?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  objective?: Maybe<Scalars["String"]>;
  partner?: Maybe<Partner>;
  partnerId?: Maybe<Scalars["ID"]>;
  phaseId?: Maybe<Scalars["ID"]>;
  processId?: Maybe<Scalars["ID"]>;
  runDay?: Maybe<Scalars["String"]>;
  runMetric?: Maybe<RunMetric>;
  runOwner?: Maybe<User>;
  runReviewer?: Maybe<Array<Maybe<User>>>;
  seedingDay?: Maybe<Scalars["String"]>;
  status?: Maybe<RunStatus>;
  summary?: Maybe<Scalars["String"]>;
  workflow?: Maybe<WorkflowDetails>;
  workflowId?: Maybe<Scalars["ID"]>;
};

export type RunMetric = {
  __typename?: "RunMetric";
  activePlatesCount?: Maybe<Scalars["Int"]>;
  activeWellsCount?: Maybe<Scalars["Int"]>;
  originalPlateCount?: Maybe<Scalars["Int"]>;
  originalWellCount?: Maybe<Scalars["Int"]>;
  platesCount?: Maybe<Scalars["Int"]>;
  runId?: Maybe<Scalars["ID"]>;
  wellsCount?: Maybe<Scalars["Int"]>;
};

export type RunPageInformation = {
  __typename?: "RunPageInformation";
  page?: Maybe<Scalars["Int"]>;
  size?: Maybe<Scalars["Int"]>;
  totalElements?: Maybe<Scalars["Int"]>;
};

export type RunPlate = {
  __typename?: "RunPlate";
  content: Array<Maybe<RunPlateContent>>;
  pageInfo: PageInformation;
};

export type RunPlateContent = {
  __typename?: "RunPlateContent";
  phaseId: Scalars["ID"];
  plateId: Scalars["ID"];
  runId: Scalars["ID"];
};

export enum RunStatus {
  Aborted = "ABORTED",
  Finished = "FINISHED",
  Inprogress = "INPROGRESS",
}

export type RunStatusCountRes = {
  __typename?: "RunStatusCountRes";
  count?: Maybe<Scalars["Int"]>;
  runStatus?: Maybe<Scalars["String"]>;
};

export type ScanObject = {
  __typename?: "ScanObject";
  attributes?: Maybe<Scalars["JSON"]>;
  id: Scalars["ID"];
  imageAnalysisRequest?: Maybe<ImageAnalysisRequest>;
  imageEvent?: Maybe<ImageEvent>;
  name: Scalars["String"];
  outline?: Maybe<Scalars["JSON"]>;
};

export type ScanObjectMetrics = {
  __typename?: "ScanObjectMetrics";
  count: Scalars["Int"];
  imageAnalysisRequest: ImageAnalysisRequest;
};

export type StatusMessage = {
  __typename?: "StatusMessage";
  message?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
};

export type Thumbnail = {
  __typename?: "Thumbnail";
  blob_path?: Maybe<Scalars["String"]>;
  bucket?: Maybe<Scalars["String"]>;
  datatype?: Maybe<Scalars["String"]>;
  dimension?: Maybe<Dimension>;
  project?: Maybe<Scalars["String"]>;
};

export type TriggerImageAnalysisRequest = {
  context?: InputMaybe<Scalars["JSON"]>;
  developerMode?: InputMaybe<Scalars["Boolean"]>;
  protocol?: InputMaybe<CreateProtocolRequest>;
  settings?: InputMaybe<Scalars["JSON"]>;
};

export enum Type {
  Edited = "EDITED",
  Manual = "MANUAL",
  Systemgenerated = "SYSTEMGENERATED",
}

export type User = {
  __typename?: "User";
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lastName?: Maybe<Scalars["String"]>;
  role?: Maybe<Role>;
};

export type Well = {
  __typename?: "Well";
  analysisStatus?: Maybe<WellAnalysisStatus>;
  analysisStatusDetail?: Maybe<Scalars["String"]>;
  artifactPath?: Maybe<Scalars["JSON"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  plateId: Scalars["ID"];
  position: Scalars["String"];
  processStatus?: Maybe<WellProcessStatus>;
  processStatusDetail?: Maybe<Scalars["String"]>;
  reviewStatus?: Maybe<WellReviewStatus>;
  reviewers?: Maybe<Array<Maybe<User>>>;
  status: Scalars["String"];
  statusReason?: Maybe<Scalars["String"]>;
  zarrUrl?: Maybe<Scalars["String"]>;
};

export enum WellAnalysisStatus {
  Failure = "FAILURE",
  Inprogress = "INPROGRESS",
  Inqueue = "INQUEUE",
  Success = "SUCCESS",
}

export enum WellProcessStatus {
  Dropped = "DROPPED",
  Imaging = "IMAGING",
  Imagingqueue = "IMAGINGQUEUE",
  Retired = "RETIRED",
  Scanning = "SCANNING",
  Scanningqueue = "SCANNINGQUEUE",
}

export enum WellReviewStatus {
  Completed = "COMPLETED",
  Inreview = "INREVIEW",
  Notstarted = "NOTSTARTED",
  Paused = "PAUSED",
}

export type WorkflowDetails = {
  __typename?: "WorkflowDetails";
  createdAt?: Maybe<Scalars["String"]>;
  createdBy?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  modifiedAt?: Maybe<Scalars["String"]>;
  modifiedBy?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  objective?: Maybe<Scalars["String"]>;
  phases?: Maybe<Array<Maybe<Phase>>>;
  type?: Maybe<Scalars["String"]>;
  version?: Maybe<Scalars["String"]>;
};

export type CreateClusterMutationVariables = Exact<{
  clusterData: CreateClusterRequest;
}>;

export type CreateClusterMutation = {
  __typename?: "Mutation";
  createCluster?: {
    __typename?: "Cluster";
    id: string;
    name: string;
    type?: ClusterType | null;
    quality?: Quality | null;
    outline?: any | null;
    clonality?: Clonality | null;
    colony?: { __typename?: "Colony"; id?: string | null } | null;
    imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
    imageAnalysisRequest?: {
      __typename?: "ImageAnalysisRequest";
      id: string;
      name?: string | null;
    } | null;
  } | null;
};

export type CreateColonyAndClusterMutationVariables = Exact<{
  colonyData: CreateColonyRequest;
  clusterData: CreateClusterRequest;
}>;

export type CreateColonyAndClusterMutation = {
  __typename?: "Mutation";
  createColonyAndCluster?: {
    __typename?: "ColonyAndCluster";
    colony?: {
      __typename?: "Colony";
      id?: string | null;
      isSelected?: boolean | null;
      name?: string | null;
      quality?: Quality | null;
      type?: Type | null;
      clonality?: Clonality | null;
      outline?: any | null;
    } | null;
    cluster?: {
      __typename?: "Cluster";
      id: string;
      name: string;
      type?: ClusterType | null;
      quality?: Quality | null;
      outline?: any | null;
      clonality?: Clonality | null;
      colony?: { __typename?: "Colony"; id?: string | null } | null;
      imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
      imageAnalysisRequest?: {
        __typename?: "ImageAnalysisRequest";
        id: string;
        name?: string | null;
      } | null;
    } | null;
  } | null;
};

export type CreateScanObjectMutationVariables = Exact<{
  scanObjectData: CreateScanObjectRequest;
}>;

export type CreateScanObjectMutation = {
  __typename?: "Mutation";
  createScanObject?: {
    __typename?: "ScanObject";
    id: string;
    name: string;
    outline?: any | null;
    attributes?: any | null;
    imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
    imageAnalysisRequest?: {
      __typename?: "ImageAnalysisRequest";
      id: string;
      name?: string | null;
    } | null;
  } | null;
};

export type DeleteScanObjectMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteScanObjectMutation = {
  __typename?: "Mutation";
  deleteScanObject?: {
    __typename?: "StatusMessage";
    status?: string | null;
    message?: string | null;
  } | null;
};

export type TriggerImageAnalysisMutationVariables = Exact<{
  triggerAnalysisRequest: TriggerImageAnalysisRequest;
}>;

export type TriggerImageAnalysisMutation = {
  __typename?: "Mutation";
  triggerImageAnalysis: {
    __typename?: "ImageAnalysisRequest";
    id: string;
    name?: string | null;
    statusCode?: string | null;
  };
};

export type UpdateClusterMutationVariables = Exact<{
  updateClusterId: Scalars["ID"];
  ops: Array<PatchOperation> | PatchOperation;
}>;

export type UpdateClusterMutation = {
  __typename?: "Mutation";
  updateCluster?: {
    __typename?: "Cluster";
    id: string;
    clonality?: Clonality | null;
    name: string;
    quality?: Quality | null;
    type?: ClusterType | null;
    outline?: any | null;
    colony?: { __typename?: "Colony"; id?: string | null } | null;
    imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
    imageAnalysisRequest?: {
      __typename?: "ImageAnalysisRequest";
      id: string;
      name?: string | null;
    } | null;
  } | null;
};

export type UpdateClusterOutlineMutationVariables = Exact<{
  id: Scalars["ID"];
  interiors:
    | Array<InputMaybe<Array<InputMaybe<PointInput>> | InputMaybe<PointInput>>>
    | InputMaybe<Array<InputMaybe<PointInput>> | InputMaybe<PointInput>>;
  exterior: Array<InputMaybe<PointInput>> | InputMaybe<PointInput>;
  imageEventId: Scalars["ID"];
}>;

export type UpdateClusterOutlineMutation = {
  __typename?: "Mutation";
  updateClusterOutline?: {
    __typename?: "Cluster";
    id: string;
    clonality?: Clonality | null;
    name: string;
    quality?: Quality | null;
    type?: ClusterType | null;
    outline?: any | null;
    colony?: { __typename?: "Colony"; id?: string | null } | null;
    imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
  } | null;
};

export type UpdateColonyMutationVariables = Exact<{
  updateColonyId: Scalars["ID"];
  ops: Array<PatchOperation> | PatchOperation;
}>;

export type UpdateColonyMutation = {
  __typename?: "Mutation";
  updateColony?: {
    __typename?: "Colony";
    id?: string | null;
    isSelected?: boolean | null;
    name?: string | null;
    quality?: Quality | null;
    type?: Type | null;
    clonality?: Clonality | null;
    outline?: any | null;
  } | null;
};

export type UpdateImageEventMutationVariables = Exact<{
  imageEventId: Scalars["ID"];
  ops: Array<PatchOperation> | PatchOperation;
}>;

export type UpdateImageEventMutation = {
  __typename?: "Mutation";
  updateImageEvent?: {
    __typename?: "ImageEvent";
    id?: string | null;
    reviewStatus?: WellReviewStatus | null;
  } | null;
};

export type UpdatePlateMutationVariables = Exact<{
  updatePlateId: Scalars["ID"];
  ops: Array<PatchOperation> | PatchOperation;
}>;

export type UpdatePlateMutation = {
  __typename?: "Mutation";
  updatePlate?: {
    __typename?: "Plate";
    id: string;
    plateStatus?: PlateStatus | null;
  } | null;
};

export type AssignReviewerToPlatesMutationVariables = Exact<{
  plateIds: Array<Scalars["ID"]> | Scalars["ID"];
  userId: Scalars["ID"];
}>;

export type AssignReviewerToPlatesMutation = {
  __typename?: "Mutation";
  assignReviewerToPlates?: {
    __typename?: "StatusMessage";
    status?: string | null;
    message?: string | null;
  } | null;
};

export type UnassignReviewerToPlatesMutationVariables = Exact<{
  plateId: Scalars["ID"];
  userId: Scalars["ID"];
}>;

export type UnassignReviewerToPlatesMutation = {
  __typename?: "Mutation";
  unassignReviewerToPlate?: {
    __typename?: "StatusMessage";
    status?: string | null;
    message?: string | null;
  } | null;
};

export type UpdateScanObjectMutationVariables = Exact<{
  id: Scalars["ID"];
  interiors:
    | Array<InputMaybe<Array<InputMaybe<PointInput>> | InputMaybe<PointInput>>>
    | InputMaybe<Array<InputMaybe<PointInput>> | InputMaybe<PointInput>>;
  exterior: Array<InputMaybe<PointInput>> | InputMaybe<PointInput>;
  imageEventId: Scalars["ID"];
}>;

export type UpdateScanObjectMutation = {
  __typename?: "Mutation";
  updateScanObject?: {
    __typename?: "ScanObject";
    id: string;
    outline?: any | null;
  } | null;
};

export type UpdateWellStatusMutationVariables = Exact<{
  wellId: Scalars["ID"];
  ops: Array<PatchOperation> | PatchOperation;
}>;

export type UpdateWellStatusMutation = {
  __typename?: "Mutation";
  updateWellStatus?: {
    __typename?: "Well";
    id?: string | null;
    name?: string | null;
    status: string;
  } | null;
};

export type GenerateTokenMutationVariables = Exact<{ [key: string]: never }>;

export type GenerateTokenMutation = {
  __typename?: "Mutation";
  generateToken: { __typename?: "AuthToken"; token?: string | null };
};

export type ClustersQueryVariables = Exact<{
  imageAnalysisRequestId?: InputMaybe<Scalars["ID"]>;
  imageEventId: Scalars["ID"];
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
  colonyIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
  freeClusters?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ClustersQuery = {
  __typename?: "Query";
  Clusters?: {
    __typename?: "PaginatedClusters";
    content?: Array<{
      __typename?: "Cluster";
      id: string;
      name: string;
      type?: ClusterType | null;
      quality?: Quality | null;
      clonality?: Clonality | null;
      outline?: any | null;
      colony?: { __typename?: "Colony"; id?: string | null } | null;
      imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
      imageAnalysisRequest?: {
        __typename?: "ImageAnalysisRequest";
        id: string;
        name?: string | null;
      } | null;
    } | null> | null;
    pageInfo?: {
      __typename?: "PageInformation";
      totalElements?: number | null;
      page?: number | null;
      size?: number | null;
    } | null;
  } | null;
};

export type TempColoniesQueryVariables = Exact<{
  imageEventId: Scalars["ID"];
  quality?: InputMaybe<Quality>;
}>;

export type TempColoniesQuery = {
  __typename?: "Query";
  Colonies: Array<{
    __typename?: "Colony";
    id?: string | null;
    isSelected?: boolean | null;
    name?: string | null;
    quality?: Quality | null;
    type?: Type | null;
    clonality?: Clonality | null;
    outline?: any | null;
  } | null>;
};

export type ColoniesQueryVariables = Exact<{
  imageEventId: Scalars["ID"];
  freeClusterMetrics?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ColoniesQuery = {
  __typename?: "Query";
  inferences: Array<{
    __typename?: "Inference";
    id: string;
    name?: string | null;
    artifactPath?: any | null;
  } | null>;
  colonyMetrics?: {
    __typename?: "ColonyMetrics";
    imageEventId: string;
    colonyCountByQuality?: Array<{
      __typename?: "ColonyCountByQuality";
      count?: number | null;
      quality?: Quality | null;
    } | null> | null;
  } | null;
  scanObjectMetrics?: Array<{
    __typename?: "ScanObjectMetrics";
    count: number;
    imageAnalysisRequest: {
      __typename?: "ImageAnalysisRequest";
      id: string;
      name?: string | null;
    };
  } | null> | null;
  clusterMetrics?: Array<{
    __typename?: "ClusterMetrics";
    count: number;
    imageAnalysisRequest: {
      __typename?: "ImageAnalysisRequest";
      id: string;
      name?: string | null;
    };
  } | null> | null;
  imageEvent: {
    __typename?: "ImageEvent";
    id?: string | null;
    metadata?: any | null;
    startedAt?: string | null;
    completedAt?: string | null;
    artifactPath?: any | null;
    protocol?: { __typename?: "Protocol"; id?: string | null } | null;
    imageSetting?: {
      __typename?: "ImageSetting";
      id: string;
      name: string;
      channelType?: ChannelType | null;
      magnification?: string | null;
      colorMap?: string | null;
      metadata: any;
      numberOfZStep?: number | null;
      zarray: Array<number>;
      zmin?: number | null;
      zmax?: number | null;
    } | null;
  };
};

export type EventsQueryVariables = Exact<{
  plateId?: InputMaybe<Scalars["ID"]>;
  eventType?: InputMaybe<Scalars["String"]>;
}>;

export type EventsQuery = {
  __typename?: "Query";
  events?: Array<{
    __typename?: "Event";
    id: string;
    name?: string | null;
    eventType?: EventType | null;
    plateId?: string | null;
    startedAt?: string | null;
    completedAt?: string | null;
    createdAt?: string | null;
    createdBy?: string | null;
    modifiedAt?: string | null;
    modifiedBy?: string | null;
    metadata?: string | null;
  } | null> | null;
};

export type ThumbnailsQueryVariables = Exact<{
  wellId: Scalars["ID"];
  width?: InputMaybe<Scalars["Int"]>;
  analysisStatus?: InputMaybe<ImageEventAnalysisStatus>;
  isBaseImage?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ThumbnailsQuery = {
  __typename?: "Query";
  imageEvents?: Array<{
    __typename?: "ImageEvent";
    id?: string | null;
    startedAt?: string | null;
    artifactPath?: any | null;
    derivedArtifacts?: {
      __typename?: "ImageEventThumbnail";
      bucket?: string | null;
      datatype?: string | null;
      blob_path?: string | null;
      height?: number | null;
      width?: number | null;
    } | null;
    event?: { __typename?: "Event"; id: string } | null;
  } | null> | null;
};

export type UserProfileQueryVariables = Exact<{ [key: string]: never }>;

export type UserProfileQuery = {
  __typename?: "Query";
  userProfile?: {
    __typename?: "User";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    role?: {
      __typename?: "Role";
      id: string;
      name?: string | null;
      rule?: Array<{
        __typename?: "Rule";
        subject?: Array<string | null> | null;
        action?: Array<string | null> | null;
        inverted?: boolean | null;
      } | null> | null;
    } | null;
  } | null;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    role?: { __typename?: "Role"; name?: string | null } | null;
  } | null>;
};

export type ImageEventsForEventIdQueryVariables = Exact<{
  eventId?: InputMaybe<Scalars["ID"]>;
  analysisStatus?: InputMaybe<ImageEventAnalysisStatus>;
  isBaseImage?: InputMaybe<Scalars["Boolean"]>;
}>;

export type ImageEventsForEventIdQuery = {
  __typename?: "Query";
  imageEvents?: Array<{
    __typename?: "ImageEvent";
    id?: string | null;
    name?: string | null;
    reviewStatus?: WellReviewStatus | null;
    imageMeasurements?: any | null;
    artifactPath?: any | null;
    well?: {
      __typename?: "Well";
      id?: string | null;
      position: string;
      status: string;
    } | null;
  } | null> | null;
};

export type ImageEventsQueryVariables = Exact<{
  eventId?: InputMaybe<Scalars["ID"]>;
  wellId?: InputMaybe<Scalars["ID"]>;
  analysisStatus?: InputMaybe<ImageEventAnalysisStatus>;
}>;

export type ImageEventsQuery = {
  __typename?: "Query";
  imageEvents?: Array<{
    __typename?: "ImageEvent";
    id?: string | null;
    metadata?: any | null;
    startedAt?: string | null;
    completedAt?: string | null;
    artifactPath?: any | null;
    protocol?: { __typename?: "Protocol"; id?: string | null } | null;
    imageSetting?: {
      __typename?: "ImageSetting";
      id: string;
      name: string;
      channelType?: ChannelType | null;
      magnification?: string | null;
      colorMap?: string | null;
      numberOfZStep?: number | null;
      zarray: Array<number>;
      zmin?: number | null;
      zmax?: number | null;
      metadata: any;
    } | null;
  } | null> | null;
};

export type ImageSettingsQueryVariables = Exact<{
  imageSettingsId: Scalars["ID"];
}>;

export type ImageSettingsQuery = {
  __typename?: "Query";
  imageSettings: {
    __typename?: "ImageSetting";
    id: string;
    name: string;
    channelType?: ChannelType | null;
    magnification?: string | null;
    colorMap?: string | null;
    numberOfZStep?: number | null;
    zarray: Array<number>;
    zmin?: number | null;
    zmax?: number | null;
    metadata: any;
  };
};

export type InferencesQueryVariables = Exact<{
  imageEventId: Scalars["ID"];
}>;

export type InferencesQuery = {
  __typename?: "Query";
  inferences: Array<{
    __typename?: "Inference";
    name?: string | null;
    metadata?: any | null;
    protocol?: {
      __typename?: "Protocol";
      name?: string | null;
      settings?: any | null;
    } | null;
  } | null>;
};

export type PassagesQueryVariables = Exact<{ [key: string]: never }>;

export type PassagesQuery = {
  __typename?: "Query";
  passages?: {
    __typename?: "Passage";
    passagenumber?: Array<string | null> | null;
  } | null;
};

export type PhasesAndPlatesQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
  runIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
  size?: InputMaybe<Scalars["Int"]>;
  reviewerIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
  plateNameList?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  passageList?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type PhasesAndPlatesQuery = {
  __typename?: "Query";
  phases: Array<{
    __typename?: "Phase";
    id?: string | null;
    phaseName?: string | null;
    plateData?: {
      __typename?: "PaginatedPlates";
      content: Array<{
        __typename?: "Plate";
        barcode?: string | null;
        reviewStatus?: ReviewStatus | null;
        id: string;
        name?: string | null;
        processStatus?: ProcessStatus | null;
        analysisStatus?: AnalysisStatus | null;
        currentPhaseId?: string | null;
        plateStatus?: PlateStatus | null;
        run?: {
          __typename?: "Run";
          id: string;
          name: string;
          partner?: {
            __typename?: "Partner";
            id: string;
            name?: string | null;
          } | null;
          runOwner?: {
            __typename?: "User";
            id?: string | null;
            firstName?: string | null;
            lastName?: string | null;
          } | null;
        } | null;
        processMetadata?: {
          __typename?: "ProcessMetaData";
          downSelectionDay?: number | null;
          passage_number?: number | null;
        } | null;
        reviewers?: Array<{
          __typename?: "User";
          id?: string | null;
          firstName?: string | null;
          lastName?: string | null;
        } | null> | null;
      } | null>;
      pageInfo: {
        __typename?: "PageInformation";
        page?: number | null;
        size?: number | null;
        totalElements?: number | null;
      };
    } | null;
  } | null>;
};

export type PhaseQueryVariables = Exact<{
  phaseId: Scalars["ID"];
}>;

export type PhaseQuery = {
  __typename?: "Query";
  phase: {
    __typename?: "Phase";
    id?: string | null;
    phaseName?: string | null;
  };
};

export type PlatesQueryVariables = Exact<{
  currentPhaseId?: InputMaybe<Scalars["ID"]>;
  page?: InputMaybe<Scalars["Int"]>;
  runIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
  size?: InputMaybe<Scalars["Int"]>;
  reviewerIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
  plateNameList?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  passageList?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type PlatesQuery = {
  __typename?: "Query";
  plates: {
    __typename?: "PaginatedPlates";
    content: Array<{
      __typename?: "Plate";
      barcode?: string | null;
      reviewStatus?: ReviewStatus | null;
      id: string;
      name?: string | null;
      processStatus?: ProcessStatus | null;
      assigneeId?: string | null;
      analysisStatusDetail?: string | null;
      analysisStatus?: AnalysisStatus | null;
      currentPhaseId?: string | null;
      eventIds?: Array<string | null> | null;
      plateStatus?: PlateStatus | null;
      processStatusDetail?: string | null;
      run?: {
        __typename?: "Run";
        id: string;
        name: string;
        seedingDay?: string | null;
        metadata?: string | null;
        partner?: {
          __typename?: "Partner";
          id: string;
          name?: string | null;
        } | null;
        runOwner?: {
          __typename?: "User";
          id?: string | null;
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
      labware?: {
        __typename?: "Labware";
        id: string;
        name?: string | null;
        attributes?: any | null;
      } | null;
      processMetadata?: {
        __typename?: "ProcessMetaData";
        downSelectionDay?: number | null;
        passage_number?: number | null;
      } | null;
      reviewers?: Array<{
        __typename?: "User";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      } | null> | null;
    } | null>;
    pageInfo: {
      __typename?: "PageInformation";
      page?: number | null;
      size?: number | null;
      totalElements?: number | null;
    };
  };
};

export type PlateByIdQueryVariables = Exact<{
  plateId: Scalars["ID"];
}>;

export type PlateByIdQuery = {
  __typename?: "Query";
  plate: {
    __typename?: "Plate";
    id: string;
    processStatus?: ProcessStatus | null;
    currentPhaseId?: string | null;
    analysisStatus?: AnalysisStatus | null;
    plateStatus?: PlateStatus | null;
    name?: string | null;
    run?: {
      __typename?: "Run";
      id: string;
      name: string;
      objective?: string | null;
      runDay?: string | null;
      seedingDay?: string | null;
      partner?: {
        __typename?: "Partner";
        id: string;
        name?: string | null;
      } | null;
      workflow?: {
        __typename?: "WorkflowDetails";
        id: string;
        type?: string | null;
      } | null;
    } | null;
    labware?: {
      __typename?: "Labware";
      id: string;
      name?: string | null;
      attributes?: any | null;
    } | null;
    processMetadata?: {
      __typename?: "ProcessMetaData";
      downSelectionDay?: number | null;
      passage_number?: number | null;
    } | null;
  };
};

export type PlateReviewersQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
}>;

export type PlateReviewersQuery = {
  __typename?: "Query";
  plateReviewers: {
    __typename?: "PaginatedPlateReviewer";
    content: Array<{
      __typename?: "PlateReviewer";
      user?: {
        __typename?: "User";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        role?: { __typename?: "Role"; id: string; name?: string | null } | null;
      } | null;
      plate?: Array<{
        __typename?: "PlateBasicDetails";
        id?: string | null;
        name?: string | null;
        runId?: string | null;
        runName?: string | null;
      } | null> | null;
    } | null>;
    pageInfo: {
      __typename?: "PageInformation";
      totalElements?: number | null;
      page?: number | null;
      size?: number | null;
    };
  };
};

export type UnassignedPlatesQueryVariables = Exact<{
  currentPhaseId?: InputMaybe<Scalars["ID"]>;
  page?: InputMaybe<Scalars["Int"]>;
  runIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
  size?: InputMaybe<Scalars["Int"]>;
  reviewerIds?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
}>;

export type UnassignedPlatesQuery = {
  __typename?: "Query";
  plates: {
    __typename?: "PaginatedPlates";
    content: Array<{
      __typename?: "Plate";
      id: string;
      name?: string | null;
      run?: { __typename?: "Run"; id: string; name: string } | null;
    } | null>;
    pageInfo: {
      __typename?: "PageInformation";
      page?: number | null;
      size?: number | null;
      totalElements?: number | null;
    };
  };
};

export type PlateContextQueryVariables = Exact<{
  plateContextId: Scalars["ID"];
}>;

export type PlateContextQuery = {
  __typename?: "Query";
  plateContext?: any | null;
};

export type ProtocolsQueryVariables = Exact<{
  category?: InputMaybe<Scalars["String"]>;
}>;

export type ProtocolsQuery = {
  __typename?: "Query";
  protocols?: {
    __typename?: "PaginatedProtocols";
    content?: Array<{
      __typename?: "Protocol";
      name?: string | null;
      id?: string | null;
    } | null> | null;
  } | null;
};

export type RunsQueryVariables = Exact<{
  ids?: InputMaybe<Scalars["ID"]>;
  nameLike?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["Int"]>;
  status?: InputMaybe<RunStatus>;
}>;

export type RunsQuery = {
  __typename?: "Query";
  runs: {
    __typename?: "PaginatedRun";
    content: Array<{
      __typename?: "Run";
      cloneReviewStatus?: CloneReviewStatus | null;
      creatorId?: string | null;
      name: string;
      objective?: string | null;
      summary?: string | null;
      runDay?: string | null;
      status?: RunStatus | null;
      id: string;
      seedingDay?: string | null;
      partner?: {
        __typename?: "Partner";
        id: string;
        name?: string | null;
      } | null;
      runMetric?: {
        __typename?: "RunMetric";
        activePlatesCount?: number | null;
        activeWellsCount?: number | null;
        originalPlateCount?: number | null;
        runId?: string | null;
        wellsCount?: number | null;
        platesCount?: number | null;
        originalWellCount?: number | null;
      } | null;
      runReviewer?: Array<{
        __typename?: "User";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      } | null> | null;
      workflow?: {
        __typename?: "WorkflowDetails";
        id: string;
        type?: string | null;
        name?: string | null;
      } | null;
      runOwner?: {
        __typename?: "User";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    }>;
    pageInfo?: {
      __typename?: "RunPageInformation";
      page?: number | null;
      size?: number | null;
      totalElements?: number | null;
    } | null;
  };
};

export type RunByIdQueryVariables = Exact<{
  runId: Scalars["ID"];
}>;

export type RunByIdQuery = {
  __typename?: "Query";
  run: {
    __typename?: "Run";
    id: string;
    name: string;
    objective?: string | null;
    metadata?: string | null;
    summary?: string | null;
    creatorId?: string | null;
    cloneReviewStatus?: CloneReviewStatus | null;
    runDay?: string | null;
    seedingDay?: string | null;
    status?: RunStatus | null;
    partnerId?: string | null;
    workflowId?: string | null;
    processId?: string | null;
    runMetric?: {
      __typename?: "RunMetric";
      activePlatesCount?: number | null;
      activeWellsCount?: number | null;
      originalPlateCount?: number | null;
      runId?: string | null;
      wellsCount?: number | null;
      platesCount?: number | null;
      originalWellCount?: number | null;
    } | null;
    runReviewer?: Array<{
      __typename?: "User";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null> | null;
    runOwner?: {
      __typename?: "User";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  };
};

export type ScanObjectsQueryVariables = Exact<{
  imageAnalysisRequestId: Scalars["ID"];
  imageEventId: Scalars["ID"];
}>;

export type ScanObjectsQuery = {
  __typename?: "Query";
  scanObjects: {
    __typename?: "PaginatedScanObject";
    content?: Array<{
      __typename?: "ScanObject";
      id: string;
      name: string;
      outline?: any | null;
      attributes?: any | null;
      imageEvent?: { __typename?: "ImageEvent"; id?: string | null } | null;
      imageAnalysisRequest?: {
        __typename?: "ImageAnalysisRequest";
        id: string;
      } | null;
    } | null> | null;
    pageInfo?: {
      __typename?: "PageInformation";
      page?: number | null;
      size?: number | null;
      totalElements?: number | null;
    } | null;
  };
};

export type WellByIdQueryVariables = Exact<{
  wellId: Scalars["ID"];
}>;

export type WellByIdQuery = {
  __typename?: "Query";
  well: {
    __typename?: "Well";
    id?: string | null;
    position: string;
    reviewStatus?: WellReviewStatus | null;
    status: string;
    plateId: string;
    statusReason?: string | null;
    analysisStatus?: WellAnalysisStatus | null;
    analysisStatusDetail?: string | null;
    processStatus?: WellProcessStatus | null;
  };
};

export type WellListAndPlateByIdQueryVariables = Exact<{
  plateId: Scalars["ID"];
}>;

export type WellListAndPlateByIdQuery = {
  __typename?: "Query";
  wells: Array<{
    __typename?: "Well";
    id?: string | null;
    position: string;
    reviewStatus?: WellReviewStatus | null;
  } | null>;
  plate: {
    __typename?: "Plate";
    id: string;
    reviewStatus?: ReviewStatus | null;
    processStatus?: ProcessStatus | null;
    currentPhaseId?: string | null;
    barcode?: string | null;
    analysisStatus?: AnalysisStatus | null;
    analysisStatusDetail?: string | null;
    plateStatus?: PlateStatus | null;
    plateStatusReason?: string | null;
    processStatusDetail?: string | null;
    name?: string | null;
    run?: {
      __typename?: "Run";
      name: string;
      id: string;
      objective?: string | null;
      summary?: string | null;
      cloneReviewStatus?: CloneReviewStatus | null;
      runDay?: string | null;
      seedingDay?: string | null;
      phaseId?: string | null;
      status?: RunStatus | null;
      workflowId?: string | null;
      runReviewer?: Array<{
        __typename?: "User";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      } | null> | null;
      partner?: {
        __typename?: "Partner";
        id: string;
        name?: string | null;
      } | null;
      workflow?: {
        __typename?: "WorkflowDetails";
        id: string;
        type?: string | null;
        name?: string | null;
      } | null;
      runOwner?: {
        __typename?: "User";
        id?: string | null;
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    } | null;
    reviewers?: Array<{
      __typename?: "User";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null> | null;
    labware?: {
      __typename?: "Labware";
      id: string;
      name?: string | null;
      attributes?: any | null;
    } | null;
  };
};

export type RunStatusCountQueryVariables = Exact<{ [key: string]: never }>;

export type RunStatusCountQuery = {
  __typename?: "Query";
  runStatusCount: Array<{
    __typename?: "RunStatusCountRes";
    runStatus?: string | null;
    count?: number | null;
  } | null>;
};

export type WorkflowDetailsByIdQueryVariables = Exact<{
  workflowDetailsId: Scalars["ID"];
}>;

export type WorkflowDetailsByIdQuery = {
  __typename?: "Query";
  workflowDetails?: {
    __typename?: "WorkflowDetails";
    id: string;
    type?: string | null;
    version?: string | null;
    name?: string | null;
    objective?: string | null;
    createdBy?: string | null;
    createdAt?: string | null;
    modifiedBy?: string | null;
    modifiedAt?: string | null;
    phases?: Array<{
      __typename?: "Phase";
      phaseName?: string | null;
    } | null> | null;
  } | null;
};

export const CreateClusterDocument = gql`
  mutation CreateCluster($clusterData: CreateClusterRequest!) {
    createCluster(clusterData: $clusterData) {
      id
      colony {
        id
      }
      name
      type
      quality
      imageEvent {
        id
      }
      imageAnalysisRequest {
        id
        name
      }
      outline
      clonality
    }
  }
`;
export type CreateClusterMutationFn = Apollo.MutationFunction<
  CreateClusterMutation,
  CreateClusterMutationVariables
>;

/**
 * __useCreateClusterMutation__
 *
 * To run a mutation, you first call `useCreateClusterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClusterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClusterMutation, { data, loading, error }] = useCreateClusterMutation({
 *   variables: {
 *      clusterData: // value for 'clusterData'
 *   },
 * });
 */
export function useCreateClusterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateClusterMutation,
    CreateClusterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateClusterMutation,
    CreateClusterMutationVariables
  >(CreateClusterDocument, options);
}
export type CreateClusterMutationHookResult = ReturnType<
  typeof useCreateClusterMutation
>;
export type CreateClusterMutationResult =
  Apollo.MutationResult<CreateClusterMutation>;
export type CreateClusterMutationOptions = Apollo.BaseMutationOptions<
  CreateClusterMutation,
  CreateClusterMutationVariables
>;
export const CreateColonyAndClusterDocument = gql`
  mutation createColonyAndCluster(
    $colonyData: CreateColonyRequest!
    $clusterData: CreateClusterRequest!
  ) {
    createColonyAndCluster(colonyData: $colonyData, clusterData: $clusterData) {
      colony {
        id
        isSelected
        name
        quality
        type
        clonality
        outline
      }
      cluster {
        id
        colony {
          id
        }
        name
        type
        quality
        imageEvent {
          id
        }
        imageAnalysisRequest {
          id
          name
        }
        outline
        clonality
      }
    }
  }
`;
export type CreateColonyAndClusterMutationFn = Apollo.MutationFunction<
  CreateColonyAndClusterMutation,
  CreateColonyAndClusterMutationVariables
>;

/**
 * __useCreateColonyAndClusterMutation__
 *
 * To run a mutation, you first call `useCreateColonyAndClusterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateColonyAndClusterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createColonyAndClusterMutation, { data, loading, error }] = useCreateColonyAndClusterMutation({
 *   variables: {
 *      colonyData: // value for 'colonyData'
 *      clusterData: // value for 'clusterData'
 *   },
 * });
 */
export function useCreateColonyAndClusterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateColonyAndClusterMutation,
    CreateColonyAndClusterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateColonyAndClusterMutation,
    CreateColonyAndClusterMutationVariables
  >(CreateColonyAndClusterDocument, options);
}
export type CreateColonyAndClusterMutationHookResult = ReturnType<
  typeof useCreateColonyAndClusterMutation
>;
export type CreateColonyAndClusterMutationResult =
  Apollo.MutationResult<CreateColonyAndClusterMutation>;
export type CreateColonyAndClusterMutationOptions = Apollo.BaseMutationOptions<
  CreateColonyAndClusterMutation,
  CreateColonyAndClusterMutationVariables
>;
export const CreateScanObjectDocument = gql`
  mutation CreateScanObject($scanObjectData: CreateScanObjectRequest!) {
    createScanObject(scanObjectData: $scanObjectData) {
      id
      name
      imageEvent {
        id
      }
      outline
      imageAnalysisRequest {
        id
        name
      }
      attributes
    }
  }
`;
export type CreateScanObjectMutationFn = Apollo.MutationFunction<
  CreateScanObjectMutation,
  CreateScanObjectMutationVariables
>;

/**
 * __useCreateScanObjectMutation__
 *
 * To run a mutation, you first call `useCreateScanObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScanObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScanObjectMutation, { data, loading, error }] = useCreateScanObjectMutation({
 *   variables: {
 *      scanObjectData: // value for 'scanObjectData'
 *   },
 * });
 */
export function useCreateScanObjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScanObjectMutation,
    CreateScanObjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateScanObjectMutation,
    CreateScanObjectMutationVariables
  >(CreateScanObjectDocument, options);
}
export type CreateScanObjectMutationHookResult = ReturnType<
  typeof useCreateScanObjectMutation
>;
export type CreateScanObjectMutationResult =
  Apollo.MutationResult<CreateScanObjectMutation>;
export type CreateScanObjectMutationOptions = Apollo.BaseMutationOptions<
  CreateScanObjectMutation,
  CreateScanObjectMutationVariables
>;
export const DeleteScanObjectDocument = gql`
  mutation deleteScanObject($id: ID!) {
    deleteScanObject(id: $id) {
      status
      message
    }
  }
`;
export type DeleteScanObjectMutationFn = Apollo.MutationFunction<
  DeleteScanObjectMutation,
  DeleteScanObjectMutationVariables
>;

/**
 * __useDeleteScanObjectMutation__
 *
 * To run a mutation, you first call `useDeleteScanObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteScanObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteScanObjectMutation, { data, loading, error }] = useDeleteScanObjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteScanObjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteScanObjectMutation,
    DeleteScanObjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteScanObjectMutation,
    DeleteScanObjectMutationVariables
  >(DeleteScanObjectDocument, options);
}
export type DeleteScanObjectMutationHookResult = ReturnType<
  typeof useDeleteScanObjectMutation
>;
export type DeleteScanObjectMutationResult =
  Apollo.MutationResult<DeleteScanObjectMutation>;
export type DeleteScanObjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteScanObjectMutation,
  DeleteScanObjectMutationVariables
>;
export const TriggerImageAnalysisDocument = gql`
  mutation TriggerImageAnalysis(
    $triggerAnalysisRequest: TriggerImageAnalysisRequest!
  ) {
    triggerImageAnalysis(triggerAnalysisRequest: $triggerAnalysisRequest) {
      id
      name
      statusCode
    }
  }
`;
export type TriggerImageAnalysisMutationFn = Apollo.MutationFunction<
  TriggerImageAnalysisMutation,
  TriggerImageAnalysisMutationVariables
>;

/**
 * __useTriggerImageAnalysisMutation__
 *
 * To run a mutation, you first call `useTriggerImageAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTriggerImageAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [triggerImageAnalysisMutation, { data, loading, error }] = useTriggerImageAnalysisMutation({
 *   variables: {
 *      triggerAnalysisRequest: // value for 'triggerAnalysisRequest'
 *   },
 * });
 */
export function useTriggerImageAnalysisMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TriggerImageAnalysisMutation,
    TriggerImageAnalysisMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    TriggerImageAnalysisMutation,
    TriggerImageAnalysisMutationVariables
  >(TriggerImageAnalysisDocument, options);
}
export type TriggerImageAnalysisMutationHookResult = ReturnType<
  typeof useTriggerImageAnalysisMutation
>;
export type TriggerImageAnalysisMutationResult =
  Apollo.MutationResult<TriggerImageAnalysisMutation>;
export type TriggerImageAnalysisMutationOptions = Apollo.BaseMutationOptions<
  TriggerImageAnalysisMutation,
  TriggerImageAnalysisMutationVariables
>;
export const UpdateClusterDocument = gql`
  mutation UpdateCluster($updateClusterId: ID!, $ops: [PatchOperation!]!) {
    updateCluster(id: $updateClusterId, ops: $ops) {
      id
      clonality
      colony {
        id
      }
      name
      quality
      type
      imageEvent {
        id
      }
      imageAnalysisRequest {
        id
        name
      }
      outline
    }
  }
`;
export type UpdateClusterMutationFn = Apollo.MutationFunction<
  UpdateClusterMutation,
  UpdateClusterMutationVariables
>;

/**
 * __useUpdateClusterMutation__
 *
 * To run a mutation, you first call `useUpdateClusterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClusterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClusterMutation, { data, loading, error }] = useUpdateClusterMutation({
 *   variables: {
 *      updateClusterId: // value for 'updateClusterId'
 *      ops: // value for 'ops'
 *   },
 * });
 */
export function useUpdateClusterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClusterMutation,
    UpdateClusterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateClusterMutation,
    UpdateClusterMutationVariables
  >(UpdateClusterDocument, options);
}
export type UpdateClusterMutationHookResult = ReturnType<
  typeof useUpdateClusterMutation
>;
export type UpdateClusterMutationResult =
  Apollo.MutationResult<UpdateClusterMutation>;
export type UpdateClusterMutationOptions = Apollo.BaseMutationOptions<
  UpdateClusterMutation,
  UpdateClusterMutationVariables
>;
export const UpdateClusterOutlineDocument = gql`
  mutation UpdateClusterOutline(
    $id: ID!
    $interiors: [[PointInput]]!
    $exterior: [PointInput]!
    $imageEventId: ID!
  ) {
    updateClusterOutline(
      id: $id
      interiors: $interiors
      exterior: $exterior
      imageEventId: $imageEventId
    ) {
      id
      clonality
      colony {
        id
      }
      name
      quality
      type
      imageEvent {
        id
      }
      outline
    }
  }
`;
export type UpdateClusterOutlineMutationFn = Apollo.MutationFunction<
  UpdateClusterOutlineMutation,
  UpdateClusterOutlineMutationVariables
>;

/**
 * __useUpdateClusterOutlineMutation__
 *
 * To run a mutation, you first call `useUpdateClusterOutlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClusterOutlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClusterOutlineMutation, { data, loading, error }] = useUpdateClusterOutlineMutation({
 *   variables: {
 *      id: // value for 'id'
 *      interiors: // value for 'interiors'
 *      exterior: // value for 'exterior'
 *      imageEventId: // value for 'imageEventId'
 *   },
 * });
 */
export function useUpdateClusterOutlineMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClusterOutlineMutation,
    UpdateClusterOutlineMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateClusterOutlineMutation,
    UpdateClusterOutlineMutationVariables
  >(UpdateClusterOutlineDocument, options);
}
export type UpdateClusterOutlineMutationHookResult = ReturnType<
  typeof useUpdateClusterOutlineMutation
>;
export type UpdateClusterOutlineMutationResult =
  Apollo.MutationResult<UpdateClusterOutlineMutation>;
export type UpdateClusterOutlineMutationOptions = Apollo.BaseMutationOptions<
  UpdateClusterOutlineMutation,
  UpdateClusterOutlineMutationVariables
>;
export const UpdateColonyDocument = gql`
  mutation UpdateColony($updateColonyId: ID!, $ops: [PatchOperation!]!) {
    updateColony(id: $updateColonyId, ops: $ops) {
      id
      isSelected
      name
      quality
      type
      clonality
      outline
    }
  }
`;
export type UpdateColonyMutationFn = Apollo.MutationFunction<
  UpdateColonyMutation,
  UpdateColonyMutationVariables
>;

/**
 * __useUpdateColonyMutation__
 *
 * To run a mutation, you first call `useUpdateColonyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColonyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColonyMutation, { data, loading, error }] = useUpdateColonyMutation({
 *   variables: {
 *      updateColonyId: // value for 'updateColonyId'
 *      ops: // value for 'ops'
 *   },
 * });
 */
export function useUpdateColonyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateColonyMutation,
    UpdateColonyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateColonyMutation,
    UpdateColonyMutationVariables
  >(UpdateColonyDocument, options);
}
export type UpdateColonyMutationHookResult = ReturnType<
  typeof useUpdateColonyMutation
>;
export type UpdateColonyMutationResult =
  Apollo.MutationResult<UpdateColonyMutation>;
export type UpdateColonyMutationOptions = Apollo.BaseMutationOptions<
  UpdateColonyMutation,
  UpdateColonyMutationVariables
>;
export const UpdateImageEventDocument = gql`
  mutation UpdateImageEvent($imageEventId: ID!, $ops: [PatchOperation!]!) {
    updateImageEvent(imageEventId: $imageEventId, ops: $ops) {
      id
      reviewStatus
    }
  }
`;
export type UpdateImageEventMutationFn = Apollo.MutationFunction<
  UpdateImageEventMutation,
  UpdateImageEventMutationVariables
>;

/**
 * __useUpdateImageEventMutation__
 *
 * To run a mutation, you first call `useUpdateImageEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImageEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImageEventMutation, { data, loading, error }] = useUpdateImageEventMutation({
 *   variables: {
 *      imageEventId: // value for 'imageEventId'
 *      ops: // value for 'ops'
 *   },
 * });
 */
export function useUpdateImageEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateImageEventMutation,
    UpdateImageEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateImageEventMutation,
    UpdateImageEventMutationVariables
  >(UpdateImageEventDocument, options);
}
export type UpdateImageEventMutationHookResult = ReturnType<
  typeof useUpdateImageEventMutation
>;
export type UpdateImageEventMutationResult =
  Apollo.MutationResult<UpdateImageEventMutation>;
export type UpdateImageEventMutationOptions = Apollo.BaseMutationOptions<
  UpdateImageEventMutation,
  UpdateImageEventMutationVariables
>;
export const UpdatePlateDocument = gql`
  mutation UpdatePlate($updatePlateId: ID!, $ops: [PatchOperation!]!) {
    updatePlate(id: $updatePlateId, ops: $ops) {
      id
      plateStatus
    }
  }
`;
export type UpdatePlateMutationFn = Apollo.MutationFunction<
  UpdatePlateMutation,
  UpdatePlateMutationVariables
>;

/**
 * __useUpdatePlateMutation__
 *
 * To run a mutation, you first call `useUpdatePlateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlateMutation, { data, loading, error }] = useUpdatePlateMutation({
 *   variables: {
 *      updatePlateId: // value for 'updatePlateId'
 *      ops: // value for 'ops'
 *   },
 * });
 */
export function useUpdatePlateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePlateMutation,
    UpdatePlateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePlateMutation, UpdatePlateMutationVariables>(
    UpdatePlateDocument,
    options
  );
}
export type UpdatePlateMutationHookResult = ReturnType<
  typeof useUpdatePlateMutation
>;
export type UpdatePlateMutationResult =
  Apollo.MutationResult<UpdatePlateMutation>;
export type UpdatePlateMutationOptions = Apollo.BaseMutationOptions<
  UpdatePlateMutation,
  UpdatePlateMutationVariables
>;
export const AssignReviewerToPlatesDocument = gql`
  mutation AssignReviewerToPlates($plateIds: [ID!]!, $userId: ID!) {
    assignReviewerToPlates(plateIds: $plateIds, userId: $userId) {
      status
      message
    }
  }
`;
export type AssignReviewerToPlatesMutationFn = Apollo.MutationFunction<
  AssignReviewerToPlatesMutation,
  AssignReviewerToPlatesMutationVariables
>;

/**
 * __useAssignReviewerToPlatesMutation__
 *
 * To run a mutation, you first call `useAssignReviewerToPlatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignReviewerToPlatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignReviewerToPlatesMutation, { data, loading, error }] = useAssignReviewerToPlatesMutation({
 *   variables: {
 *      plateIds: // value for 'plateIds'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAssignReviewerToPlatesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AssignReviewerToPlatesMutation,
    AssignReviewerToPlatesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AssignReviewerToPlatesMutation,
    AssignReviewerToPlatesMutationVariables
  >(AssignReviewerToPlatesDocument, options);
}
export type AssignReviewerToPlatesMutationHookResult = ReturnType<
  typeof useAssignReviewerToPlatesMutation
>;
export type AssignReviewerToPlatesMutationResult =
  Apollo.MutationResult<AssignReviewerToPlatesMutation>;
export type AssignReviewerToPlatesMutationOptions = Apollo.BaseMutationOptions<
  AssignReviewerToPlatesMutation,
  AssignReviewerToPlatesMutationVariables
>;
export const UnassignReviewerToPlatesDocument = gql`
  mutation UnassignReviewerToPlates($plateId: ID!, $userId: ID!) {
    unassignReviewerToPlate(plateId: $plateId, userId: $userId) {
      status
      message
    }
  }
`;
export type UnassignReviewerToPlatesMutationFn = Apollo.MutationFunction<
  UnassignReviewerToPlatesMutation,
  UnassignReviewerToPlatesMutationVariables
>;

/**
 * __useUnassignReviewerToPlatesMutation__
 *
 * To run a mutation, you first call `useUnassignReviewerToPlatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignReviewerToPlatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignReviewerToPlatesMutation, { data, loading, error }] = useUnassignReviewerToPlatesMutation({
 *   variables: {
 *      plateId: // value for 'plateId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnassignReviewerToPlatesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnassignReviewerToPlatesMutation,
    UnassignReviewerToPlatesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UnassignReviewerToPlatesMutation,
    UnassignReviewerToPlatesMutationVariables
  >(UnassignReviewerToPlatesDocument, options);
}
export type UnassignReviewerToPlatesMutationHookResult = ReturnType<
  typeof useUnassignReviewerToPlatesMutation
>;
export type UnassignReviewerToPlatesMutationResult =
  Apollo.MutationResult<UnassignReviewerToPlatesMutation>;
export type UnassignReviewerToPlatesMutationOptions =
  Apollo.BaseMutationOptions<
    UnassignReviewerToPlatesMutation,
    UnassignReviewerToPlatesMutationVariables
  >;
export const UpdateScanObjectDocument = gql`
  mutation UpdateScanObject(
    $id: ID!
    $interiors: [[PointInput]]!
    $exterior: [PointInput]!
    $imageEventId: ID!
  ) {
    updateScanObject(
      id: $id
      interiors: $interiors
      exterior: $exterior
      imageEventId: $imageEventId
    ) {
      id
      outline
    }
  }
`;
export type UpdateScanObjectMutationFn = Apollo.MutationFunction<
  UpdateScanObjectMutation,
  UpdateScanObjectMutationVariables
>;

/**
 * __useUpdateScanObjectMutation__
 *
 * To run a mutation, you first call `useUpdateScanObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScanObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScanObjectMutation, { data, loading, error }] = useUpdateScanObjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      interiors: // value for 'interiors'
 *      exterior: // value for 'exterior'
 *      imageEventId: // value for 'imageEventId'
 *   },
 * });
 */
export function useUpdateScanObjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateScanObjectMutation,
    UpdateScanObjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateScanObjectMutation,
    UpdateScanObjectMutationVariables
  >(UpdateScanObjectDocument, options);
}
export type UpdateScanObjectMutationHookResult = ReturnType<
  typeof useUpdateScanObjectMutation
>;
export type UpdateScanObjectMutationResult =
  Apollo.MutationResult<UpdateScanObjectMutation>;
export type UpdateScanObjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateScanObjectMutation,
  UpdateScanObjectMutationVariables
>;
export const UpdateWellStatusDocument = gql`
  mutation UpdateWellStatus($wellId: ID!, $ops: [PatchOperation!]!) {
    updateWellStatus(wellId: $wellId, ops: $ops) {
      id
      name
      status
    }
  }
`;
export type UpdateWellStatusMutationFn = Apollo.MutationFunction<
  UpdateWellStatusMutation,
  UpdateWellStatusMutationVariables
>;

/**
 * __useUpdateWellStatusMutation__
 *
 * To run a mutation, you first call `useUpdateWellStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWellStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWellStatusMutation, { data, loading, error }] = useUpdateWellStatusMutation({
 *   variables: {
 *      wellId: // value for 'wellId'
 *      ops: // value for 'ops'
 *   },
 * });
 */
export function useUpdateWellStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateWellStatusMutation,
    UpdateWellStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateWellStatusMutation,
    UpdateWellStatusMutationVariables
  >(UpdateWellStatusDocument, options);
}
export type UpdateWellStatusMutationHookResult = ReturnType<
  typeof useUpdateWellStatusMutation
>;
export type UpdateWellStatusMutationResult =
  Apollo.MutationResult<UpdateWellStatusMutation>;
export type UpdateWellStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateWellStatusMutation,
  UpdateWellStatusMutationVariables
>;
export const GenerateTokenDocument = gql`
  mutation GenerateToken {
    generateToken {
      token
    }
  }
`;
export type GenerateTokenMutationFn = Apollo.MutationFunction<
  GenerateTokenMutation,
  GenerateTokenMutationVariables
>;

/**
 * __useGenerateTokenMutation__
 *
 * To run a mutation, you first call `useGenerateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTokenMutation, { data, loading, error }] = useGenerateTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateTokenMutation,
    GenerateTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateTokenMutation,
    GenerateTokenMutationVariables
  >(GenerateTokenDocument, options);
}
export type GenerateTokenMutationHookResult = ReturnType<
  typeof useGenerateTokenMutation
>;
export type GenerateTokenMutationResult =
  Apollo.MutationResult<GenerateTokenMutation>;
export type GenerateTokenMutationOptions = Apollo.BaseMutationOptions<
  GenerateTokenMutation,
  GenerateTokenMutationVariables
>;
export const ClustersDocument = gql`
  query Clusters(
    $imageAnalysisRequestId: ID
    $imageEventId: ID!
    $page: Int
    $size: Int
    $colonyIds: [ID]
    $freeClusters: Boolean
  ) {
    Clusters(
      imageAnalysisRequestId: $imageAnalysisRequestId
      imageEventId: $imageEventId
      page: $page
      size: $size
      colonyIds: $colonyIds
      freeClusters: $freeClusters
    ) {
      content {
        id
        colony {
          id
        }
        name
        type
        quality
        clonality
        imageEvent {
          id
        }
        imageAnalysisRequest {
          id
          name
        }
        outline
      }
      pageInfo {
        totalElements
        page
        size
      }
    }
  }
`;

/**
 * __useClustersQuery__
 *
 * To run a query within a React component, call `useClustersQuery` and pass it any options that fit your needs.
 * When your component renders, `useClustersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClustersQuery({
 *   variables: {
 *      imageAnalysisRequestId: // value for 'imageAnalysisRequestId'
 *      imageEventId: // value for 'imageEventId'
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      colonyIds: // value for 'colonyIds'
 *      freeClusters: // value for 'freeClusters'
 *   },
 * });
 */
export function useClustersQuery(
  baseOptions: Apollo.QueryHookOptions<ClustersQuery, ClustersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ClustersQuery, ClustersQueryVariables>(
    ClustersDocument,
    options
  );
}
export function useClustersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ClustersQuery,
    ClustersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ClustersQuery, ClustersQueryVariables>(
    ClustersDocument,
    options
  );
}
export type ClustersQueryHookResult = ReturnType<typeof useClustersQuery>;
export type ClustersLazyQueryHookResult = ReturnType<
  typeof useClustersLazyQuery
>;
export type ClustersQueryResult = Apollo.QueryResult<
  ClustersQuery,
  ClustersQueryVariables
>;
export const TempColoniesDocument = gql`
  query TempColonies($imageEventId: ID!, $quality: Quality) {
    Colonies(imageEventId: $imageEventId, quality: $quality) {
      id
      isSelected
      name
      quality
      type
      clonality
      outline
    }
  }
`;

/**
 * __useTempColoniesQuery__
 *
 * To run a query within a React component, call `useTempColoniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTempColoniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTempColoniesQuery({
 *   variables: {
 *      imageEventId: // value for 'imageEventId'
 *      quality: // value for 'quality'
 *   },
 * });
 */
export function useTempColoniesQuery(
  baseOptions: Apollo.QueryHookOptions<
    TempColoniesQuery,
    TempColoniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TempColoniesQuery, TempColoniesQueryVariables>(
    TempColoniesDocument,
    options
  );
}
export function useTempColoniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TempColoniesQuery,
    TempColoniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TempColoniesQuery, TempColoniesQueryVariables>(
    TempColoniesDocument,
    options
  );
}
export type TempColoniesQueryHookResult = ReturnType<
  typeof useTempColoniesQuery
>;
export type TempColoniesLazyQueryHookResult = ReturnType<
  typeof useTempColoniesLazyQuery
>;
export type TempColoniesQueryResult = Apollo.QueryResult<
  TempColoniesQuery,
  TempColoniesQueryVariables
>;
export const ColoniesDocument = gql`
  query Colonies($imageEventId: ID!, $freeClusterMetrics: Boolean) {
    inferences(imageEventId: $imageEventId) {
      id
      name
      artifactPath
    }
    colonyMetrics(imageEventId: $imageEventId) {
      imageEventId
      colonyCountByQuality {
        count
        quality
      }
    }
    scanObjectMetrics(imageEventId: $imageEventId) {
      imageAnalysisRequest {
        id
        name
      }
      count
    }
    clusterMetrics(
      imageEventId: $imageEventId
      freeClusters: $freeClusterMetrics
    ) {
      imageAnalysisRequest {
        id
        name
      }
      count
    }
    imageEvent(id: $imageEventId) {
      id
      metadata
      startedAt
      completedAt
      protocol {
        id
      }
      imageSetting {
        id
        name
        channelType
        magnification
        colorMap
        metadata
        numberOfZStep
        zarray
        zmin
        zmax
      }
      artifactPath
    }
  }
`;

/**
 * __useColoniesQuery__
 *
 * To run a query within a React component, call `useColoniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useColoniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useColoniesQuery({
 *   variables: {
 *      imageEventId: // value for 'imageEventId'
 *      freeClusterMetrics: // value for 'freeClusterMetrics'
 *   },
 * });
 */
export function useColoniesQuery(
  baseOptions: Apollo.QueryHookOptions<ColoniesQuery, ColoniesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ColoniesQuery, ColoniesQueryVariables>(
    ColoniesDocument,
    options
  );
}
export function useColoniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ColoniesQuery,
    ColoniesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ColoniesQuery, ColoniesQueryVariables>(
    ColoniesDocument,
    options
  );
}
export type ColoniesQueryHookResult = ReturnType<typeof useColoniesQuery>;
export type ColoniesLazyQueryHookResult = ReturnType<
  typeof useColoniesLazyQuery
>;
export type ColoniesQueryResult = Apollo.QueryResult<
  ColoniesQuery,
  ColoniesQueryVariables
>;
export const EventsDocument = gql`
  query Events($plateId: ID, $eventType: String) {
    events(plateId: $plateId, eventType: $eventType) {
      id
      name
      eventType
      plateId
      startedAt
      completedAt
      createdAt
      createdBy
      modifiedAt
      modifiedBy
      metadata
    }
  }
`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      plateId: // value for 'plateId'
 *      eventType: // value for 'eventType'
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options
  );
}
export function useEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options
  );
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<
  EventsQuery,
  EventsQueryVariables
>;
export const ThumbnailsDocument = gql`
  query Thumbnails(
    $wellId: ID!
    $width: Int
    $analysisStatus: ImageEventAnalysisStatus
    $isBaseImage: Boolean
  ) {
    imageEvents(
      wellId: $wellId
      analysisStatus: $analysisStatus
      isBaseImage: $isBaseImage
    ) {
      derivedArtifacts(width: $width) {
        bucket
        datatype
        blob_path
        height
        width
      }
      id
      event {
        id
      }
      startedAt
      artifactPath
    }
  }
`;

/**
 * __useThumbnailsQuery__
 *
 * To run a query within a React component, call `useThumbnailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useThumbnailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThumbnailsQuery({
 *   variables: {
 *      wellId: // value for 'wellId'
 *      width: // value for 'width'
 *      analysisStatus: // value for 'analysisStatus'
 *      isBaseImage: // value for 'isBaseImage'
 *   },
 * });
 */
export function useThumbnailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ThumbnailsQuery,
    ThumbnailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ThumbnailsQuery, ThumbnailsQueryVariables>(
    ThumbnailsDocument,
    options
  );
}
export function useThumbnailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ThumbnailsQuery,
    ThumbnailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ThumbnailsQuery, ThumbnailsQueryVariables>(
    ThumbnailsDocument,
    options
  );
}
export type ThumbnailsQueryHookResult = ReturnType<typeof useThumbnailsQuery>;
export type ThumbnailsLazyQueryHookResult = ReturnType<
  typeof useThumbnailsLazyQuery
>;
export type ThumbnailsQueryResult = Apollo.QueryResult<
  ThumbnailsQuery,
  ThumbnailsQueryVariables
>;
export const UserProfileDocument = gql`
  query UserProfile {
    userProfile {
      id
      firstName
      lastName
      email
      role {
        id
        name
        rule {
          subject
          action
          inverted
        }
      }
    }
  }
`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options
  );
}
export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options
  );
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<
  typeof useUserProfileLazyQuery
>;
export type UserProfileQueryResult = Apollo.QueryResult<
  UserProfileQuery,
  UserProfileQueryVariables
>;
export const AllUsersDocument = gql`
  query AllUsers {
    users {
      id
      firstName
      lastName
      email
      role {
        name
      }
    }
  }
`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    options
  );
}
export function useAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllUsersQuery,
    AllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    options
  );
}
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<
  typeof useAllUsersLazyQuery
>;
export type AllUsersQueryResult = Apollo.QueryResult<
  AllUsersQuery,
  AllUsersQueryVariables
>;
export const ImageEventsForEventIdDocument = gql`
  query ImageEventsForEventId(
    $eventId: ID
    $analysisStatus: ImageEventAnalysisStatus
    $isBaseImage: Boolean
  ) {
    imageEvents(
      eventId: $eventId
      analysisStatus: $analysisStatus
      isBaseImage: $isBaseImage
    ) {
      id
      name
      reviewStatus
      imageMeasurements
      artifactPath
      well {
        id
        position
        status
      }
    }
  }
`;

/**
 * __useImageEventsForEventIdQuery__
 *
 * To run a query within a React component, call `useImageEventsForEventIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageEventsForEventIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageEventsForEventIdQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      analysisStatus: // value for 'analysisStatus'
 *      isBaseImage: // value for 'isBaseImage'
 *   },
 * });
 */
export function useImageEventsForEventIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ImageEventsForEventIdQuery,
    ImageEventsForEventIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ImageEventsForEventIdQuery,
    ImageEventsForEventIdQueryVariables
  >(ImageEventsForEventIdDocument, options);
}
export function useImageEventsForEventIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ImageEventsForEventIdQuery,
    ImageEventsForEventIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ImageEventsForEventIdQuery,
    ImageEventsForEventIdQueryVariables
  >(ImageEventsForEventIdDocument, options);
}
export type ImageEventsForEventIdQueryHookResult = ReturnType<
  typeof useImageEventsForEventIdQuery
>;
export type ImageEventsForEventIdLazyQueryHookResult = ReturnType<
  typeof useImageEventsForEventIdLazyQuery
>;
export type ImageEventsForEventIdQueryResult = Apollo.QueryResult<
  ImageEventsForEventIdQuery,
  ImageEventsForEventIdQueryVariables
>;
export const ImageEventsDocument = gql`
  query ImageEvents(
    $eventId: ID
    $wellId: ID
    $analysisStatus: ImageEventAnalysisStatus
  ) {
    imageEvents(
      eventId: $eventId
      wellId: $wellId
      analysisStatus: $analysisStatus
    ) {
      id
      metadata
      startedAt
      completedAt
      protocol {
        id
      }
      imageSetting {
        id
        name
        channelType
        magnification
        colorMap
        numberOfZStep
        zarray
        zmin
        zmax
        metadata
      }
      artifactPath
    }
  }
`;

/**
 * __useImageEventsQuery__
 *
 * To run a query within a React component, call `useImageEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageEventsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      wellId: // value for 'wellId'
 *      analysisStatus: // value for 'analysisStatus'
 *   },
 * });
 */
export function useImageEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ImageEventsQuery,
    ImageEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ImageEventsQuery, ImageEventsQueryVariables>(
    ImageEventsDocument,
    options
  );
}
export function useImageEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ImageEventsQuery,
    ImageEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ImageEventsQuery, ImageEventsQueryVariables>(
    ImageEventsDocument,
    options
  );
}
export type ImageEventsQueryHookResult = ReturnType<typeof useImageEventsQuery>;
export type ImageEventsLazyQueryHookResult = ReturnType<
  typeof useImageEventsLazyQuery
>;
export type ImageEventsQueryResult = Apollo.QueryResult<
  ImageEventsQuery,
  ImageEventsQueryVariables
>;
export const ImageSettingsDocument = gql`
  query ImageSettings($imageSettingsId: ID!) {
    imageSettings(id: $imageSettingsId) {
      id
      name
      channelType
      magnification
      colorMap
      numberOfZStep
      zarray
      zmin
      zmax
      metadata
    }
  }
`;

/**
 * __useImageSettingsQuery__
 *
 * To run a query within a React component, call `useImageSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageSettingsQuery({
 *   variables: {
 *      imageSettingsId: // value for 'imageSettingsId'
 *   },
 * });
 */
export function useImageSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ImageSettingsQuery,
    ImageSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ImageSettingsQuery, ImageSettingsQueryVariables>(
    ImageSettingsDocument,
    options
  );
}
export function useImageSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ImageSettingsQuery,
    ImageSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ImageSettingsQuery, ImageSettingsQueryVariables>(
    ImageSettingsDocument,
    options
  );
}
export type ImageSettingsQueryHookResult = ReturnType<
  typeof useImageSettingsQuery
>;
export type ImageSettingsLazyQueryHookResult = ReturnType<
  typeof useImageSettingsLazyQuery
>;
export type ImageSettingsQueryResult = Apollo.QueryResult<
  ImageSettingsQuery,
  ImageSettingsQueryVariables
>;
export const InferencesDocument = gql`
  query Inferences($imageEventId: ID!) {
    inferences(imageEventId: $imageEventId) {
      name
      metadata
      protocol {
        name
        settings
      }
    }
  }
`;

/**
 * __useInferencesQuery__
 *
 * To run a query within a React component, call `useInferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInferencesQuery({
 *   variables: {
 *      imageEventId: // value for 'imageEventId'
 *   },
 * });
 */
export function useInferencesQuery(
  baseOptions: Apollo.QueryHookOptions<
    InferencesQuery,
    InferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<InferencesQuery, InferencesQueryVariables>(
    InferencesDocument,
    options
  );
}
export function useInferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    InferencesQuery,
    InferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<InferencesQuery, InferencesQueryVariables>(
    InferencesDocument,
    options
  );
}
export type InferencesQueryHookResult = ReturnType<typeof useInferencesQuery>;
export type InferencesLazyQueryHookResult = ReturnType<
  typeof useInferencesLazyQuery
>;
export type InferencesQueryResult = Apollo.QueryResult<
  InferencesQuery,
  InferencesQueryVariables
>;
export const PassagesDocument = gql`
  query Passages {
    passages {
      passagenumber
    }
  }
`;

/**
 * __usePassagesQuery__
 *
 * To run a query within a React component, call `usePassagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePassagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePassagesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePassagesQuery(
  baseOptions?: Apollo.QueryHookOptions<PassagesQuery, PassagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PassagesQuery, PassagesQueryVariables>(
    PassagesDocument,
    options
  );
}
export function usePassagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PassagesQuery,
    PassagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PassagesQuery, PassagesQueryVariables>(
    PassagesDocument,
    options
  );
}
export type PassagesQueryHookResult = ReturnType<typeof usePassagesQuery>;
export type PassagesLazyQueryHookResult = ReturnType<
  typeof usePassagesLazyQuery
>;
export type PassagesQueryResult = Apollo.QueryResult<
  PassagesQuery,
  PassagesQueryVariables
>;
export const PhasesAndPlatesDocument = gql`
  query PhasesAndPlates(
    $page: Int
    $runIds: [ID]
    $size: Int
    $reviewerIds: [ID]
    $plateNameList: [String]
    $passageList: [String]
  ) {
    phases {
      id
      phaseName
      plateData(
        page: $page
        runIds: $runIds
        size: $size
        reviewerIds: $reviewerIds
        plateNameList: $plateNameList
        passageList: $passageList
      ) {
        content {
          barcode
          run {
            id
            name
            partner {
              id
              name
            }
            runOwner {
              id
              firstName
              lastName
            }
          }
          reviewStatus
          id
          name
          processStatus
          analysisStatus
          currentPhaseId
          plateStatus
          processMetadata {
            downSelectionDay
            passage_number
          }
          reviewers {
            id
            firstName
            lastName
          }
        }
        pageInfo {
          page
          size
          totalElements
        }
      }
    }
  }
`;

/**
 * __usePhasesAndPlatesQuery__
 *
 * To run a query within a React component, call `usePhasesAndPlatesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhasesAndPlatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhasesAndPlatesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      runIds: // value for 'runIds'
 *      size: // value for 'size'
 *      reviewerIds: // value for 'reviewerIds'
 *      plateNameList: // value for 'plateNameList'
 *      passageList: // value for 'passageList'
 *   },
 * });
 */
export function usePhasesAndPlatesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PhasesAndPlatesQuery,
    PhasesAndPlatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PhasesAndPlatesQuery, PhasesAndPlatesQueryVariables>(
    PhasesAndPlatesDocument,
    options
  );
}
export function usePhasesAndPlatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PhasesAndPlatesQuery,
    PhasesAndPlatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PhasesAndPlatesQuery,
    PhasesAndPlatesQueryVariables
  >(PhasesAndPlatesDocument, options);
}
export type PhasesAndPlatesQueryHookResult = ReturnType<
  typeof usePhasesAndPlatesQuery
>;
export type PhasesAndPlatesLazyQueryHookResult = ReturnType<
  typeof usePhasesAndPlatesLazyQuery
>;
export type PhasesAndPlatesQueryResult = Apollo.QueryResult<
  PhasesAndPlatesQuery,
  PhasesAndPlatesQueryVariables
>;
export const PhaseDocument = gql`
  query Phase($phaseId: ID!) {
    phase(id: $phaseId) {
      id
      phaseName
    }
  }
`;

/**
 * __usePhaseQuery__
 *
 * To run a query within a React component, call `usePhaseQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhaseQuery({
 *   variables: {
 *      phaseId: // value for 'phaseId'
 *   },
 * });
 */
export function usePhaseQuery(
  baseOptions: Apollo.QueryHookOptions<PhaseQuery, PhaseQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PhaseQuery, PhaseQueryVariables>(
    PhaseDocument,
    options
  );
}
export function usePhaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PhaseQuery, PhaseQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PhaseQuery, PhaseQueryVariables>(
    PhaseDocument,
    options
  );
}
export type PhaseQueryHookResult = ReturnType<typeof usePhaseQuery>;
export type PhaseLazyQueryHookResult = ReturnType<typeof usePhaseLazyQuery>;
export type PhaseQueryResult = Apollo.QueryResult<
  PhaseQuery,
  PhaseQueryVariables
>;
export const PlatesDocument = gql`
  query Plates(
    $currentPhaseId: ID
    $page: Int
    $runIds: [ID]
    $size: Int
    $reviewerIds: [ID]
    $plateNameList: [String]
    $passageList: [String]
  ) {
    plates(
      currentPhaseId: $currentPhaseId
      page: $page
      runIds: $runIds
      size: $size
      reviewerIds: $reviewerIds
      plateNameList: $plateNameList
      passageList: $passageList
    ) {
      content {
        barcode
        run {
          id
          name
          seedingDay
          metadata
          partner {
            id
            name
          }
          runOwner {
            id
            firstName
            lastName
          }
        }
        reviewStatus
        id
        name
        processStatus
        assigneeId
        analysisStatusDetail
        analysisStatus
        currentPhaseId
        labware {
          id
          name
          attributes
        }
        eventIds
        processStatus
        plateStatus
        processStatusDetail
        processMetadata {
          downSelectionDay
          passage_number
        }
        reviewers {
          id
          firstName
          lastName
        }
      }
      pageInfo {
        page
        size
        totalElements
      }
    }
  }
`;

/**
 * __usePlatesQuery__
 *
 * To run a query within a React component, call `usePlatesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlatesQuery({
 *   variables: {
 *      currentPhaseId: // value for 'currentPhaseId'
 *      page: // value for 'page'
 *      runIds: // value for 'runIds'
 *      size: // value for 'size'
 *      reviewerIds: // value for 'reviewerIds'
 *      plateNameList: // value for 'plateNameList'
 *      passageList: // value for 'passageList'
 *   },
 * });
 */
export function usePlatesQuery(
  baseOptions?: Apollo.QueryHookOptions<PlatesQuery, PlatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlatesQuery, PlatesQueryVariables>(
    PlatesDocument,
    options
  );
}
export function usePlatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PlatesQuery, PlatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlatesQuery, PlatesQueryVariables>(
    PlatesDocument,
    options
  );
}
export type PlatesQueryHookResult = ReturnType<typeof usePlatesQuery>;
export type PlatesLazyQueryHookResult = ReturnType<typeof usePlatesLazyQuery>;
export type PlatesQueryResult = Apollo.QueryResult<
  PlatesQuery,
  PlatesQueryVariables
>;
export const PlateByIdDocument = gql`
  query PlateById($plateId: ID!) {
    plate(id: $plateId) {
      id
      processStatus
      currentPhaseId
      run {
        id
        name
        objective
        runDay
        partner {
          id
          name
        }
        workflow {
          id
          type
        }
        seedingDay
      }
      labware {
        id
        name
        attributes
      }
      analysisStatus
      plateStatus
      name
      processMetadata {
        downSelectionDay
        passage_number
      }
    }
  }
`;

/**
 * __usePlateByIdQuery__
 *
 * To run a query within a React component, call `usePlateByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlateByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlateByIdQuery({
 *   variables: {
 *      plateId: // value for 'plateId'
 *   },
 * });
 */
export function usePlateByIdQuery(
  baseOptions: Apollo.QueryHookOptions<PlateByIdQuery, PlateByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlateByIdQuery, PlateByIdQueryVariables>(
    PlateByIdDocument,
    options
  );
}
export function usePlateByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlateByIdQuery,
    PlateByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlateByIdQuery, PlateByIdQueryVariables>(
    PlateByIdDocument,
    options
  );
}
export type PlateByIdQueryHookResult = ReturnType<typeof usePlateByIdQuery>;
export type PlateByIdLazyQueryHookResult = ReturnType<
  typeof usePlateByIdLazyQuery
>;
export type PlateByIdQueryResult = Apollo.QueryResult<
  PlateByIdQuery,
  PlateByIdQueryVariables
>;
export const PlateReviewersDocument = gql`
  query PlateReviewers($page: Int, $size: Int) {
    plateReviewers(page: $page, size: $size) {
      content {
        user {
          id
          firstName
          lastName
          email
          role {
            id
            name
          }
        }
        plate {
          id
          name
          runId
          runName
        }
      }
      pageInfo {
        totalElements
        page
        size
      }
    }
  }
`;

/**
 * __usePlateReviewersQuery__
 *
 * To run a query within a React component, call `usePlateReviewersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlateReviewersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlateReviewersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function usePlateReviewersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PlateReviewersQuery,
    PlateReviewersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlateReviewersQuery, PlateReviewersQueryVariables>(
    PlateReviewersDocument,
    options
  );
}
export function usePlateReviewersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlateReviewersQuery,
    PlateReviewersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlateReviewersQuery, PlateReviewersQueryVariables>(
    PlateReviewersDocument,
    options
  );
}
export type PlateReviewersQueryHookResult = ReturnType<
  typeof usePlateReviewersQuery
>;
export type PlateReviewersLazyQueryHookResult = ReturnType<
  typeof usePlateReviewersLazyQuery
>;
export type PlateReviewersQueryResult = Apollo.QueryResult<
  PlateReviewersQuery,
  PlateReviewersQueryVariables
>;
export const UnassignedPlatesDocument = gql`
  query UnassignedPlates(
    $currentPhaseId: ID
    $page: Int
    $runIds: [ID]
    $size: Int
    $reviewerIds: [ID]
  ) {
    plates(
      currentPhaseId: $currentPhaseId
      page: $page
      runIds: $runIds
      size: $size
      reviewerIds: $reviewerIds
    ) {
      content {
        run {
          id
          name
        }
        id
        name
      }
      pageInfo {
        page
        size
        totalElements
      }
    }
  }
`;

/**
 * __useUnassignedPlatesQuery__
 *
 * To run a query within a React component, call `useUnassignedPlatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnassignedPlatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnassignedPlatesQuery({
 *   variables: {
 *      currentPhaseId: // value for 'currentPhaseId'
 *      page: // value for 'page'
 *      runIds: // value for 'runIds'
 *      size: // value for 'size'
 *      reviewerIds: // value for 'reviewerIds'
 *   },
 * });
 */
export function useUnassignedPlatesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UnassignedPlatesQuery,
    UnassignedPlatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UnassignedPlatesQuery, UnassignedPlatesQueryVariables>(
    UnassignedPlatesDocument,
    options
  );
}
export function useUnassignedPlatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UnassignedPlatesQuery,
    UnassignedPlatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UnassignedPlatesQuery,
    UnassignedPlatesQueryVariables
  >(UnassignedPlatesDocument, options);
}
export type UnassignedPlatesQueryHookResult = ReturnType<
  typeof useUnassignedPlatesQuery
>;
export type UnassignedPlatesLazyQueryHookResult = ReturnType<
  typeof useUnassignedPlatesLazyQuery
>;
export type UnassignedPlatesQueryResult = Apollo.QueryResult<
  UnassignedPlatesQuery,
  UnassignedPlatesQueryVariables
>;
export const PlateContextDocument = gql`
  query PlateContext($plateContextId: ID!) {
    plateContext(id: $plateContextId)
  }
`;

/**
 * __usePlateContextQuery__
 *
 * To run a query within a React component, call `usePlateContextQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlateContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlateContextQuery({
 *   variables: {
 *      plateContextId: // value for 'plateContextId'
 *   },
 * });
 */
export function usePlateContextQuery(
  baseOptions: Apollo.QueryHookOptions<
    PlateContextQuery,
    PlateContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PlateContextQuery, PlateContextQueryVariables>(
    PlateContextDocument,
    options
  );
}
export function usePlateContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlateContextQuery,
    PlateContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PlateContextQuery, PlateContextQueryVariables>(
    PlateContextDocument,
    options
  );
}
export type PlateContextQueryHookResult = ReturnType<
  typeof usePlateContextQuery
>;
export type PlateContextLazyQueryHookResult = ReturnType<
  typeof usePlateContextLazyQuery
>;
export type PlateContextQueryResult = Apollo.QueryResult<
  PlateContextQuery,
  PlateContextQueryVariables
>;
export const ProtocolsDocument = gql`
  query Protocols($category: String) {
    protocols(category: $category) {
      content {
        name
        id
      }
    }
  }
`;

/**
 * __useProtocolsQuery__
 *
 * To run a query within a React component, call `useProtocolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProtocolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProtocolsQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useProtocolsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProtocolsQuery, ProtocolsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProtocolsQuery, ProtocolsQueryVariables>(
    ProtocolsDocument,
    options
  );
}
export function useProtocolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProtocolsQuery,
    ProtocolsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProtocolsQuery, ProtocolsQueryVariables>(
    ProtocolsDocument,
    options
  );
}
export type ProtocolsQueryHookResult = ReturnType<typeof useProtocolsQuery>;
export type ProtocolsLazyQueryHookResult = ReturnType<
  typeof useProtocolsLazyQuery
>;
export type ProtocolsQueryResult = Apollo.QueryResult<
  ProtocolsQuery,
  ProtocolsQueryVariables
>;
export const RunsDocument = gql`
  query Runs(
    $ids: ID
    $nameLike: String
    $page: Int
    $size: Int
    $status: RunStatus
  ) {
    runs(
      ids: $ids
      nameLike: $nameLike
      page: $page
      size: $size
      status: $status
    ) {
      content {
        cloneReviewStatus
        creatorId
        partner {
          id
          name
        }
        name
        objective
        summary
        runDay
        status
        id
        seedingDay
        runMetric {
          activePlatesCount
          activeWellsCount
          originalPlateCount
          runId
          wellsCount
          platesCount
          originalWellCount
        }
        runReviewer {
          id
          firstName
          lastName
        }
        workflow {
          id
          type
          name
        }
        runOwner {
          id
          firstName
          lastName
        }
      }
      pageInfo {
        page
        size
        totalElements
      }
    }
  }
`;

/**
 * __useRunsQuery__
 *
 * To run a query within a React component, call `useRunsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRunsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRunsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      nameLike: // value for 'nameLike'
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useRunsQuery(
  baseOptions?: Apollo.QueryHookOptions<RunsQuery, RunsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RunsQuery, RunsQueryVariables>(RunsDocument, options);
}
export function useRunsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RunsQuery, RunsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RunsQuery, RunsQueryVariables>(
    RunsDocument,
    options
  );
}
export type RunsQueryHookResult = ReturnType<typeof useRunsQuery>;
export type RunsLazyQueryHookResult = ReturnType<typeof useRunsLazyQuery>;
export type RunsQueryResult = Apollo.QueryResult<RunsQuery, RunsQueryVariables>;
export const RunByIdDocument = gql`
  query RunById($runId: ID!) {
    run(id: $runId) {
      id
      name
      objective
      metadata
      summary
      creatorId
      cloneReviewStatus
      runDay
      seedingDay
      status
      partnerId
      workflowId
      processId
      runMetric {
        activePlatesCount
        activeWellsCount
        originalPlateCount
        runId
        wellsCount
        platesCount
        originalWellCount
      }
      runReviewer {
        id
        firstName
        lastName
      }
      runOwner {
        id
        firstName
        lastName
      }
    }
  }
`;

/**
 * __useRunByIdQuery__
 *
 * To run a query within a React component, call `useRunByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRunByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRunByIdQuery({
 *   variables: {
 *      runId: // value for 'runId'
 *   },
 * });
 */
export function useRunByIdQuery(
  baseOptions: Apollo.QueryHookOptions<RunByIdQuery, RunByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RunByIdQuery, RunByIdQueryVariables>(
    RunByIdDocument,
    options
  );
}
export function useRunByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RunByIdQuery, RunByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RunByIdQuery, RunByIdQueryVariables>(
    RunByIdDocument,
    options
  );
}
export type RunByIdQueryHookResult = ReturnType<typeof useRunByIdQuery>;
export type RunByIdLazyQueryHookResult = ReturnType<typeof useRunByIdLazyQuery>;
export type RunByIdQueryResult = Apollo.QueryResult<
  RunByIdQuery,
  RunByIdQueryVariables
>;
export const ScanObjectsDocument = gql`
  query ScanObjects($imageAnalysisRequestId: ID!, $imageEventId: ID!) {
    scanObjects(
      imageAnalysisRequestId: $imageAnalysisRequestId
      imageEventId: $imageEventId
    ) {
      content {
        id
        name
        outline
        attributes
        imageEvent {
          id
        }
        imageAnalysisRequest {
          id
        }
      }
      pageInfo {
        page
        size
        totalElements
      }
    }
  }
`;

/**
 * __useScanObjectsQuery__
 *
 * To run a query within a React component, call `useScanObjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScanObjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScanObjectsQuery({
 *   variables: {
 *      imageAnalysisRequestId: // value for 'imageAnalysisRequestId'
 *      imageEventId: // value for 'imageEventId'
 *   },
 * });
 */
export function useScanObjectsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ScanObjectsQuery,
    ScanObjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ScanObjectsQuery, ScanObjectsQueryVariables>(
    ScanObjectsDocument,
    options
  );
}
export function useScanObjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ScanObjectsQuery,
    ScanObjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ScanObjectsQuery, ScanObjectsQueryVariables>(
    ScanObjectsDocument,
    options
  );
}
export type ScanObjectsQueryHookResult = ReturnType<typeof useScanObjectsQuery>;
export type ScanObjectsLazyQueryHookResult = ReturnType<
  typeof useScanObjectsLazyQuery
>;
export type ScanObjectsQueryResult = Apollo.QueryResult<
  ScanObjectsQuery,
  ScanObjectsQueryVariables
>;
export const WellByIdDocument = gql`
  query WellById($wellId: ID!) {
    well(wellId: $wellId) {
      id
      position
      reviewStatus
      status
      plateId
      statusReason
      analysisStatus
      analysisStatusDetail
      processStatus
    }
  }
`;

/**
 * __useWellByIdQuery__
 *
 * To run a query within a React component, call `useWellByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWellByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellByIdQuery({
 *   variables: {
 *      wellId: // value for 'wellId'
 *   },
 * });
 */
export function useWellByIdQuery(
  baseOptions: Apollo.QueryHookOptions<WellByIdQuery, WellByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WellByIdQuery, WellByIdQueryVariables>(
    WellByIdDocument,
    options
  );
}
export function useWellByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WellByIdQuery,
    WellByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WellByIdQuery, WellByIdQueryVariables>(
    WellByIdDocument,
    options
  );
}
export type WellByIdQueryHookResult = ReturnType<typeof useWellByIdQuery>;
export type WellByIdLazyQueryHookResult = ReturnType<
  typeof useWellByIdLazyQuery
>;
export type WellByIdQueryResult = Apollo.QueryResult<
  WellByIdQuery,
  WellByIdQueryVariables
>;
export const WellListAndPlateByIdDocument = gql`
  query WellListAndPlateById($plateId: ID!) {
    wells(plateId: $plateId) {
      id
      position
      reviewStatus
    }
    plate(id: $plateId) {
      id
      reviewStatus
      processStatus
      currentPhaseId
      run {
        name
        id
        objective
        summary
        cloneReviewStatus
        runDay
        seedingDay
        phaseId
        runReviewer {
          id
          firstName
          lastName
        }
        partner {
          id
          name
        }
        workflow {
          id
          type
          name
        }
        status
        workflowId
        runOwner {
          id
          firstName
          lastName
        }
      }
      reviewers {
        id
        firstName
        lastName
      }
      barcode
      labware {
        id
        name
        attributes
      }
      analysisStatus
      analysisStatusDetail
      plateStatus
      plateStatusReason
      processStatusDetail
      name
    }
  }
`;

/**
 * __useWellListAndPlateByIdQuery__
 *
 * To run a query within a React component, call `useWellListAndPlateByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWellListAndPlateByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWellListAndPlateByIdQuery({
 *   variables: {
 *      plateId: // value for 'plateId'
 *   },
 * });
 */
export function useWellListAndPlateByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    WellListAndPlateByIdQuery,
    WellListAndPlateByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    WellListAndPlateByIdQuery,
    WellListAndPlateByIdQueryVariables
  >(WellListAndPlateByIdDocument, options);
}
export function useWellListAndPlateByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WellListAndPlateByIdQuery,
    WellListAndPlateByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    WellListAndPlateByIdQuery,
    WellListAndPlateByIdQueryVariables
  >(WellListAndPlateByIdDocument, options);
}
export type WellListAndPlateByIdQueryHookResult = ReturnType<
  typeof useWellListAndPlateByIdQuery
>;
export type WellListAndPlateByIdLazyQueryHookResult = ReturnType<
  typeof useWellListAndPlateByIdLazyQuery
>;
export type WellListAndPlateByIdQueryResult = Apollo.QueryResult<
  WellListAndPlateByIdQuery,
  WellListAndPlateByIdQueryVariables
>;
export const RunStatusCountDocument = gql`
  query RunStatusCount {
    runStatusCount {
      runStatus
      count
    }
  }
`;

/**
 * __useRunStatusCountQuery__
 *
 * To run a query within a React component, call `useRunStatusCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useRunStatusCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRunStatusCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useRunStatusCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RunStatusCountQuery,
    RunStatusCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RunStatusCountQuery, RunStatusCountQueryVariables>(
    RunStatusCountDocument,
    options
  );
}
export function useRunStatusCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RunStatusCountQuery,
    RunStatusCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RunStatusCountQuery, RunStatusCountQueryVariables>(
    RunStatusCountDocument,
    options
  );
}
export type RunStatusCountQueryHookResult = ReturnType<
  typeof useRunStatusCountQuery
>;
export type RunStatusCountLazyQueryHookResult = ReturnType<
  typeof useRunStatusCountLazyQuery
>;
export type RunStatusCountQueryResult = Apollo.QueryResult<
  RunStatusCountQuery,
  RunStatusCountQueryVariables
>;
export const WorkflowDetailsByIdDocument = gql`
  query WorkflowDetailsById($workflowDetailsId: ID!) {
    workflowDetails(id: $workflowDetailsId) {
      id
      type
      version
      name
      objective
      phases {
        phaseName
      }
      createdBy
      createdAt
      modifiedBy
      modifiedAt
    }
  }
`;

/**
 * __useWorkflowDetailsByIdQuery__
 *
 * To run a query within a React component, call `useWorkflowDetailsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkflowDetailsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkflowDetailsByIdQuery({
 *   variables: {
 *      workflowDetailsId: // value for 'workflowDetailsId'
 *   },
 * });
 */
export function useWorkflowDetailsByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    WorkflowDetailsByIdQuery,
    WorkflowDetailsByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    WorkflowDetailsByIdQuery,
    WorkflowDetailsByIdQueryVariables
  >(WorkflowDetailsByIdDocument, options);
}
export function useWorkflowDetailsByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WorkflowDetailsByIdQuery,
    WorkflowDetailsByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    WorkflowDetailsByIdQuery,
    WorkflowDetailsByIdQueryVariables
  >(WorkflowDetailsByIdDocument, options);
}
export type WorkflowDetailsByIdQueryHookResult = ReturnType<
  typeof useWorkflowDetailsByIdQuery
>;
export type WorkflowDetailsByIdLazyQueryHookResult = ReturnType<
  typeof useWorkflowDetailsByIdLazyQuery
>;
export type WorkflowDetailsByIdQueryResult = Apollo.QueryResult<
  WorkflowDetailsByIdQuery,
  WorkflowDetailsByIdQueryVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
