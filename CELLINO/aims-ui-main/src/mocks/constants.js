export const InferenceLayer = [
  {
    id: "abcdf458-f23f-11ec-b383-0242ac120004",
    name: "inference",
    artifact_path:
      "https://storage.googleapis.com/cellino/11931-288-261-sendai_x1356_m2D5_z0_4_8_12_P0.1_N0.6-K8s",
    metadata: "",
  },
];
const ImageEventFilePath = {
  bucket: "",
  datatype: "zarr",
  blob_path: "https://storage.googleapis.com/cellino/11931-288-261/",
  time_slice_index: 0,
};
const ImageEventThumbnail = {
  bucket: "",
  datatype: "jpg",
  blob_path:
    "https://storage.googleapis.com/cellino/thumbnails/thumbnail_115547.jpg",
};
const ImageEventDerivedArtifacts = {
  thumbnail: ImageEventThumbnail,
};
export const ImageEventQuery = {
  id: "20da3e7c-ec01-11ec-b2c5-0242ac120004",
  metadata: "",
  startedAt: "",
  completedAt: "",
  protocolId: "",
  imageSettingId: "bce6269e-0292-11ed-a3a7-42010a78a002",
  filepath: ImageEventFilePath,
  derivedArtifacts: ImageEventDerivedArtifacts,
};

const MetaDataImageSettings = {
  width_px: "1px",
  data_type: "zarr",
  height_px: "1px",
  z_offset_um: "1um",
  pixel_size_um: "0.0",
  objective_name: "4X Plan Apo",
  exposure_time_us: "0",
  illumination_level: "0.0",
};

const ChannelType = {
  Brt: "BRT",
  Flour: "FLOUR",
  Virtual: "VIRTUAL",
};
const ImageSettings = {
  id: "bce6269e-0292-11ed-a3a7-42010a78a002",
  name: "image_setting_1",
  channelType: ChannelType.Brt,
  magnification: "4x",
  colorMap: "GREY",
  numberOfZStep: 3,
  zarray: [-1, 0, 4],
  zmin: 4,
  zmax: -1,
  metadata: MetaDataImageSettings,
};
export const ImageSettingsQuery = {
  imageSettings: ImageSettings,
};

const ImageMeasurement = [
  {
    createdTimestamp: "2022-06-14T16:43:33.193+00:00",
    imageEventId: "20da3e7c-ec01-11ec-b2c5-0242ac120004",
    thumbnailUrl:
      "https://storage.googleapis.com/cellino/thumbnails/thumbnail_116050.jpg",
    measurements: {
      confluence: 0,
      interiorConfluence: 0,
    },
  },
];

export const well = {
  id: "efdc9d24-ec00-11ec-b2c5-0242ac120004",
  position: "",
  zarrUrl: "http://storage.googleapis.com/cellino/11931-288-261/",
  reviewStatus: "INPROGRESS",
  plateId: "1",
  status: "KEEP",
  processStatus: "",
  analysisStatus: "",
  analysisStatusDetail: "",
  imageMeasurements: ImageMeasurement,
  reviewers: [{ id: "", firstName: "", lastName: "" }],
};

export const colony = {
  id: "edaf0cff-e894-46bb-b1a3-449c7d807276",
  name: "col",
  isSelected: true,
  type: "MANUAL",
  outline: { color: "#e6461c" },
};

const coordinates = [
  {
    x: 8635.92940412249,
    y: 2752.825720650808,
  },
  {
    x: 8187.229788643976,
    y: 2376.8893977573925,
  },
  {
    x: 8939.102434430804,
    y: 2667.936739240373,
  },
  {
    x: 9666.723702566966,
    y: 3128.762043544223,
  },
  {
    x: 7605.135105678013,
    y: 2595.175112043107,
  },
  {
    x: 8090.214285714288,
    y: 2570.920819963727,
  },
];

const Outline = {
  exterior: coordinates,
  interiors: [],
  color: "",
  center: coordinates[0],
  opacity: 0.4,
  boundingBox: {
    xmin: 7605.135105678013,
    xmax: 9666.723702566966,
    ymax: 2376.8893977573925,
    ymin: 3128.762043544223,
  },
};

const Attribute = {
  circularity: 0.0,
  area: 0.0,
};
export const Cluster = [
  {
    __typename: "cluster",
    id: "c0bd4982-33f1-492c-a290-7eaf73a4d6bc",
    name: "Cluster 34",
    nameId: "",
    parents: [],
    clonality: "UNKNOWN",
    quality: "GOOD",
    imageEvent: { id: "20da3e7c-ec01-11ec-b2c5-0242ac120004" },
    attributes: Attribute,
    outline: Outline,
    colony: { id: "99a8fd69-1068-499d-a095-218700ceacce" },
    type: "MANUAL",
    imageAnalysisRequest: { id: "20da3e7c-ec01-11ec-b2c5-0242ac120004" },
  },
];

export const WellDropStatus = {
  wellId: "efdc9d24-ec00-11ec-b2c5-0242ac120004",
  status: "keep",
  reason: "other",
};

const RunOwner = {
  id: "",
  firstName: "",
  lastName: "",
};
const Run = {
  id: "e6b4dc72-fd1a-11ec-b9b5-42010a78a002",
  name: "iPSC101 v1.0 Run1",
  runOwner: RunOwner,
};

const DownSelectionDay = {
  downSelectionDay: 0,
};
export const Plate = {
  barcode: "",
  reviewStatus: "CONFIRMED",
  id: "3d4cdf08-01d0-11ed-b8d2-42010a78a002",
  name: "x1412",
  processStatus: "IMAGINGQUEUE",
  assigneeId: "",
  analysisStatusDetail: "",
  analysisStatus: "INQUEUE",
  currentPhaseId: "9a50e510-fd1f-11ec-b9b5-42010a78a002",
  labwareId: "",
  eventIds: [""],
  plateStatus: "KEEP",
  processStatusDetail: "",
  run: Run,
  processMetaData: DownSelectionDay,
};
