export const SIZES = {
  IMAGE_VIEWER_PAGE: {
    RIGHT_PANEL: 56,
  },
};

export const COLORMAP: any = {
  White: [255, 255, 255],
  Blue: [0, 0, 255],
  Green: [0, 255, 0],
  Red: [255, 0, 0],
};

export const COLONY_QUALITY_OPTIONS = [
  { label: "Good", value: "Good" },
  { label: "Medium", value: "Medium" },
  { label: "Poor", value: "Poor" },
  { label: "Unknown", value: "Unknown" },
];

export const CLONALITY_OPTIONS = [
  { label: "Monoclonal", value: "MONOCLONAL" },
  { label: "Polyclonal", value: "POLYCLONAL" },
  { label: "Unknown", value: "UNKNOWN" },
];

export const COLONY_SELECTION_OPTION = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

export const CLUSTER_CATEGORY_SELECTION_OPTION = [
  { label: "Cluster", value: "cluster" },
  { label: "Bubble", value: "bubble" },
  { label: "Debris", value: "debris" },
  { label: "Other", value: "other" },
];

export const Well_CONTAMINATION_OPTIONS = [
  { label: "Contamination", value: "contamination" },
  { label: "Not Contamination", value: "not contamination" },
];

export const Well_STATUS_OPTIONS = [
  { label: "Keep", value: "keep" },
  { label: "Drop", value: "drop" },
];

export const Well_REASON_OPTION = [
  { label: "no High Quality Colony", value: "no High Quality Colony" },
  { label: "no colonies", value: "no colonies" },
  { label: "no colony layer", value: "no colony layer" },
  { label: "data load too slow", value: "data load too slow" },
  { label: "contamination", value: "contamination" },
  { label: "damaged", value: "damaged" },
  { label: "other", value: "other" },
];

export const INTERCEPTED_ACTIONS = {
  UPDATE_EVENT_IMAGE_ID: "UPDATE_EVENT_IMAGE_ID",
  CLUSTER_SELECTED_ON_IMAGE_VIEWER: "CLUSTER_SELECTED_ON_IMAGE_VIEWER",
  CLUSTER_SELECTION_ON_LEFT_PANEL: "CLUSTER_SELECTION_ON_LEFT_PANEL",
  WELL_CHANGE: "WELL_CHANGE",
  BACK_TO_PLATES: "BACK_TO_PLATES",
  COMPLETE_BTN_CLICKED: "COMPLETE_BTN_CLICKED",
  WELL_STATUS_CHANGED: "WELL_STATUS_CHANGED",
  PLATE_OR_WELL_DROPPED: "PLATE_OR_WELL_DROPPED",
};

export const DEFAULT_LAYER_PROP = {
  opacity: 1,
  contrastLimits: [[0, 100]],
  contrastLimitsRange: [[0, 100]],
  selections: [[0, 0, 0]],
};

export const PLATE_STATUS = {
  KEEP: "KEEP",
  DROP: "DROP",
};

export const WELL_STATUS = {
  NOT_STARTED: "NOTSTARTED",
  IN_REVIEW: "INREVIEW",
  PAUSED: "PAUSED",
  COMPLETED: "COMPLETED",
};

export const ANALYSIS_STATUS = {
  IN_PROGRESS: "INPROGRESS",
  IN_QUEUE: "INQUEUE",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
};

export const RUN_STATUS = {
  IN_PROGRESS: "INPROGRESS",
  ABORTED: "ABORTED",
  FINISHED: "FINISHED",
};

export const PHASES = {
  SETUP: "Setup",
  REPROGRAMMING: "Reprogramming",
  COLONY_EMERGENCE: "Colony Emergence",
  CLONE_ISOLATION: "Clone Isolation",
  CLONE_GROWTH: "Clone Growth",
  VECTOR_CLEARANCE: "Vector Clearance",
  QC: "QC",
  SHIPPING: "Shipping",
};

export const WELL_ML_ATTRIBUTES = {
  CONFLUENCE: "Confluence",
  INTERIOR_CONFLUENCE: "Interior confluence",
  CELLS: "",
};

export const DEFAULT_OPACITY = 0.4;
export const DEFAULT_POLYGON_COLOR = "#20179d";
export const COMPLETE_REVIEW_MESSAGE =
  "Please note that marking the review complete for this time-point will freeze the master set of scan objects (if any) and the master energy map (if any)";
export const POLYGON_DEFAULT_ENERGY_LEVEL = 500;

export const CLONE_REVIEW_STATUS = {
  IN_REVIEW: "INREVIEW",
  COMPLETED: "COMPLETED",
};

export const PLATE_OR_WELL_PROCESS_STATUS = {
  IMAGING_QUEUE: "IMAGINGQUEUE",
  IMAGING: "IMAGING",
  SCANING_QUEUE: "SCANNINGQUEUE",
  SCANNING: "SCANNING",
  IN_INCUBATOR: "ININCUBATOR",
  DROPPED: "DROPPED",
  RETIRED: "RETIRED",
};

export const PLATE_REVIEW_STATUS = {
  CONFIRMED: "CONFIRMED",
  IN_PROGRESS: "INPROGRESS",
  NOT_STARTED: "NOTSTARTED",
};

export const PLATE_ATTRIBUTES = {
  CONFLUENCE: "Confluence",
  INTERIOR_CONFLUENCE: "Interior confluence",
  CELLS: "No. of cells",
  COLONIES: "No. of colonies",
  CONTAMINATION_SCORE: "Contamination Score",
};

export const WELL_DROP_REASONS = [
  { label: "No high quality colony", value: "No high quality colony" },
  { label: "No colonies", value: "No colonies" },
  { label: "No colony layer", value: "No colony layer" },
  { label: "Data load too slow", value: "Data load too slow" },
  { label: "Contamination", value: "Contamination" },
  { label: "Damaged", value: "Damaged" },
];
export const PLATE_DROP_REASONS = [
  { label: "Contamination", value: "Contamination" },
  { label: "Damaged", value: "Damaged" },
  { label: "No colonies", value: "No colonies" },
];

export const ROUTES = {
  HOME: "/",
  PLATE_VIEW: "/plate/:plateId",
  IMAGE_VIEWER: "/image-viewer",
  RUNS: "/runs",
  PLATES: "/plates",
  PLATE: "/plate",
  REVIEWERS: "/reviewers",
  RUN_DETAILS: "/run/:runId/*",
  RUN: "/run",
  RUN_DETAILS_TABS: "/run/:runId/:active_tab",
  REPORTS: "/reports",
  METRICS: "/metrics",
  CELL_LINES: "/cell-lines",
  USER_MANAGEMENT: "/user-management",
  HEALTH_CHECK: "/healthz",
};

export const HIDE = "Hide";
export const UN_HIDE = "Unhide";
