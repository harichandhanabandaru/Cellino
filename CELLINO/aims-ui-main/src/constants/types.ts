import { Cluster, ScanObject } from "../generated/graphql";

export interface ClusterSelectedOnImageViewerValue {
  clusterId: string;
  expanded: string[];
}

export interface InferenceLayer {
  __typename?: "Inference";
  id: string;
  name?: string | null;
  artifactPath?: { blob_path: string; time_slice_index: number } | null;
  metadata?: any;
  protocolId?: string;
}

export interface Inference {
  __typename?: "Inference" | undefined;
  name?: string | null | undefined;
  metadata?: any | null;
  protocol?: {
    name?: any;
    settings?: any;
  };
}

export interface Measurements {
  confluence?: number;
  interiorConfluence?: number;
}

export interface ImageMeasurement {
  createdTimestamp: string;
  imageEventId: string;
  thumbnailUrl: string;
  measurements: Measurements;
}

export interface Well {
  id: string;
  position: string;
  zarrUrl: string;
  reviewStatus: string;
  plateId: string;
  status: string;
  processStatus: string;
  analysisStatus: string;
  analysisStatusDetail: string;
  imageMeasurements: ImageMeasurement[];
  reviewers?: Reviewer;
}

export interface runDetails {
  name: string;
  workflowType: string;
  status: string;
  startDate: string;
  NoofPlates: number | string;
  NoofWells: number | string;
  activePlates: number | string;
  activeWells: number | string;
  originalPlates: number | string;
  originalWells: number | string;
  runDay: number | string;
  reviewer: string;
}

export interface RunTabsProps {
  name: string;
  summary: string;
  owner: string;
  reviewer: string;
  startDay: number;
  runDay: number;
  objective: string;
  starterSampleId: string;
  creator: string;
  runStatus: string;
  cloneReviewStatus: string;
  workflowId: string;
}

export interface WorkflowTabProps {
  id: string;
  type: string;
  version: string;
  name: string;
  objective: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  phases?: { phaseName: string }[];
}

export interface DropPlateProps {
  plateId: string;
  status: string;
  reason: string;
}
export interface DropWellProps {
  wellId: string;
  status: string;
  reason: string | null;
  wellStatus?: string;
  plateStatus?: string;
  dropReason?: string;
}

export interface MenuState {
  show: boolean;
  clusterData: ClusterMenuData;
  coordinates: {
    xCoordinate: number;
    yCoordinate: number;
  };
  scanObjectData?: ScanObjectMenuData;
}

export interface ClusterMenuData {
  colonyId: string;
  clusterId: string;
  isSelected: boolean;
}
export interface ScanObjectMenuData {
  scanObjectId?: string;
  imageAnalysisRequestId?: string;
  imageEventId?: string;
}

export type TypographyVariant =
  | "subtitle3"
  | "subtitle4"
  | "subtitle5"
  | "body3"
  | "body4"
  | "body5"
  | "caption1"
  | "caption2"
  | "caption3"
  | "overline";

export interface UserProfileProps {
  id?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
  rule: [Rule];
}

export interface Rule {
  subject: [string];
  action: [string];
  inverted: boolean;
}

export interface WellList {
  id: string;
  position: string;
  reviewStatus: string;
}

export interface Plate {
  __typename?: "Plate" | undefined;
  barcode?: string | null;
  reviewStatus?: string | null;
  id: string;
  name?: string | null;
  processStatus?: string | null;
  assigneeId?: string | null;
  analysisStatusDetail?: string | null;
  analysisStatus?: string | null;
  currentPhaseId?: string | null;
  labwareId?: string | null;
  eventIds?: Array<string | null> | null;
  plateStatus?: string | null;
  processStatusDetail?: string | null;
  run?: Run | null;
  processMetaData?: {
    downSelectionDay?: number | null;
  } | null;
  phase?:
    | { id?: string | null | undefined; phaseName?: string | null | undefined }
    | null
    | undefined;
  reviewers?: Reviewer;
  plateStatusReason?: string | null;
}

export type PlateReviewer = {
  __typename?: "PlateReviewer";
  user?: {
    __typename?: "User";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    role?: {
      __typename?: "Role";
      id: string;
      name?: string | null;
    } | null;
  } | null;
  plate?:
    | ({
        __typename?: "PlateBasicDetails";
        id?: string | null;
        name?: string | null;
        runId?: string | null;
        runName?: string | null;
      } | null)[]
    | null;
} | null;

export type Reviewer =
  | ({
      __typename?: "User" | undefined;
      id?: string | null | undefined;
      firstName?: string | null | undefined;
      lastName?: string | null | undefined;
    } | null)[]
  | undefined
  | null;
export interface ImageEventQuery {
  __typename?: "ImageEvent";
  id?: string | null | undefined;
  metadata?: any | null;
  startedAt?: string | null;
  completedAt?: string | null;
  protocolId?: string | null;
  imageSettingId?: string | null;
  artifactPath?: any;
  derivedArtifacts?: {
    __typename?: "ImageEventDerivedArtifacts";
    thumbnail?: {
      __typename?: "ImageEventTumbnail";
      bucket?: string | null;
      datatype?: string | null;
      blob_path?: string | null;
    } | null;
  } | null;
}

export type Run = {
  __typename?: "Run";
  cloneReviewStatus?: CloneReviewStatus | null;
  creatorId?: string | null;
  id: string;
  name: string;
  objective?: string | null;
  partnerId?: string | null;
  phaseId?: string | null;
  processId?: string | null;
  runDay?: string | null;
  seedingDay?: string | null;
  status?: RunStatus | null;
  summary?: string | null;
  metadata?: string | null;
  workflowId?: string | null;
  owner?: string | null;
  reviewer?: string | null;
  creator?: string | null;
  starterSampleID?: string | null;
  runOwner?:
    | {
        __typename?: "User" | undefined;
        id?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
      }
    | null
    | undefined;
  partner?:
    | {
        id: string;
        name?: string | null | undefined;
      }
    | undefined
    | null;

  runReviewer?: Reviewer;
};

enum CloneReviewStatus {
  Completed = "COMPLETED",
  Inreview = "INREVIEW",
}
enum RunStatus {
  Aborted = "ABORTED",
  Finished = "FINISHED",
  Inprogress = "INPROGRESS",
}
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
export type ImageSettingsQuery = {
  __typename?: "Query";
  imageSettings: {
    __typename?: "ImageSetting";
    id: string;
    name: string;
    channelType?: string | null;
    magnification?: string | null;
    colorMap?: string | null;
    numberOfZStep?: number | null;
    zarray: Array<number>;
    zmin?: number | null;
    zmax?: number | null;
    metadata: {
      __typename?: "ImageSettingMetaData";
      width_px?: string | null;
      data_type?: string | null;
      height_px?: string | null;
      z_offset_um?: string | null;
      pixel_size_um?: string | null;
      objective_name?: string | null;
      exposure_time_us?: string | null;
      illumination_level?: string | null;
    };
  };
};

export enum ChannelType {
  Brt = "BRT",
  Flour = "FLOUR",
  Virtual = "VIRTUAL",
}

export interface colony {
  id: string;
  name: string;
  isSelected: boolean;
  type: string;
  outline: { color: string };
  quality?: string;
}

export interface clusterColonyType {
  id: string | null;
  name: string;
  isSelected: boolean;
  type: string;
  outline: { color: string };
}

export interface ContextJSON {
  context: {
    plate: {
      id: string;
      name: string;
      barcode: string;
    };
    well: {
      id: string;
      position: string;
    };
    imageEvent: {
      id: string;
    };
    artifactPath: object;
  };
}

export interface coordinates {
  x: number;
  y: number;
}

export interface ScanObjectsByAnalysisId {
  [p: string]: ScanObject[];
}

export interface ClustersByAnalysisId {
  [p: string]: Cluster[];
}
