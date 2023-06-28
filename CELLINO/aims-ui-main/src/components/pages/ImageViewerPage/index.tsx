import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import {
  ClusterMetrics,
  ColonyMetrics,
  ImageEvent,
  useImageEventsLazyQuery,
  ImageEventAnalysisStatus,
  ScanObject,
  ScanObjectMetrics,
  useColoniesLazyQuery,
  useCreateClusterMutation,
  useCreateColonyAndClusterMutation,
  useCreateScanObjectMutation,
  useDeleteScanObjectMutation,
  useUpdateClusterMutation,
  useUpdateImageEventMutation,
  useUpdatePlateMutation,
  useUpdateWellStatusMutation,
  useWellByIdLazyQuery,
  useWellListAndPlateByIdLazyQuery,
  Cluster,
  Colony,
} from "../../../generated/graphql";
import ClonalityTimeframe from "../../organisms/ClonalityTimeframe";
import LeftPaneImageViewer from "../../organisms/LeftPanelImageViewer";
import {
  ClusterSelectedOnImageViewerValue,
  DropPlateProps,
  DropWellProps,
  InferenceLayer,
  MenuState,
  Well,
  WellList,
} from "../../../constants/types";
import RightPaneImageViewer from "../../organisms/RightPaneImageViewer";
import TopBarImageView from "../../organisms/TopBarImageViewer";
import RightClickMenu from "../../molecules/RightClickMenu";
import Page from "../Page";
import {
  COMPLETE_REVIEW_MESSAGE,
  DEFAULT_OPACITY,
  DEFAULT_POLYGON_COLOR,
  INTERCEPTED_ACTIONS,
  ROUTES,
  SIZES,
  WELL_STATUS,
  POLYGON_DEFAULT_ENERGY_LEVEL,
} from "../../../constants";
import { useApolloClient, useReactiveVar } from "@apollo/client";
import {
  canDrawInternalPolygonVar,
  cookieAuthenticatedVar,
  imageEventDataVar,
  imageEventIndexVar,
  inferenceDataVar,
  loaderCountVar,
  scanObjectsByAnalysisIdVar,
  selectedScanObjectIndexVar,
  selectedClusterIdVar,
  showInferenceLayerVar,
  showScanObjectVar,
  wellReviewCompletedVar,
  clustersByAnalysisRequestOrColonyQualityVar,
  coloniesByQualityVar,
  zAxisValueVar,
  zAxisIndexVar,
} from "../../../apollo/cache";
import CustomDiscardModal from "../../molecules/CustomDiscardModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import imageViewerMessages from "../../../messages/imageViewerMessages";
import loadZarrFile from "../../organisms/ZarrImageViewer/utils/loadZarrFile";
import { addAlphaToHexCode } from "../../../utils/getColorWithOpacity";
import updateCacheForScanObject from "../../../utils/updateCacheForScanObject";
import updateMetricCacheForScanObjects from "../../../utils/updateMetricCacheForScanObjects";
import updateColonyMetrics from "../../../utils/updateColonyMetrics";
import updateClusterMetricsCache from "../../../utils/updateClusterMetricsCache";

const fetchZarrImageViewer = () => import("../../organisms/ZarrImageViewer");
const ZarrImageViewer = lazy(fetchZarrImageViewer);

const emptyImageEvents: Array<ImageEvent> = [];
const emptyInferenceLayers: Array<InferenceLayer> = [];
const emptyWells: WellList[] = [];
const emptyScanObjectMetrics: ScanObjectMetrics[] = [];
const emptyClusterMetrics: ClusterMetrics[] = [];
const emptyColonyMetrics: ColonyMetrics = {
  imageEventId: "",
};

const menuStateIntialValues: MenuState = {
  clusterData: {
    isSelected: false,
    clusterId: "0",
    colonyId: "0",
  },
  show: false,
  coordinates: {
    xCoordinate: 0,
    yCoordinate: 0,
  },
};

const dropWellIntialValues = {
  status: "",
  reason: "",
  dropReason: "",
  wellStatus: "",
  plateStatus: "",
};

function ImageViewerPage() {
  let navigate = useNavigate();
  const cookieAuthenticated = useReactiveVar(cookieAuthenticatedVar);
  const selectedClusterId = useReactiveVar(selectedClusterIdVar);
  const imageEventIndex = useReactiveVar(imageEventIndexVar);
  const imageEventVar = useReactiveVar(imageEventDataVar);
  const zAxisIndex = useReactiveVar(zAxisIndexVar);
  const zAxisValue = useReactiveVar(zAxisValueVar);

  const [baseLayerData, setBaseLayerData] = React.useState<any>(null);
  const [selectedImageEventId, setSelectedImageEventId] = React.useState<
    string | null
  >(null);
  const [expanded, setExpanded] = React.useState<string[] | undefined>([]);
  const [creationMode, setCreationMode] = React.useState<boolean>(false);
  const [rightPanelOpen, setRightPanelOpen] = React.useState<boolean>(false);

  const [newPolygonData, setNewPolygonData] = React.useState<any>(null);
  const newPolygonPoints = useRef<{
    exterior: { x: number; y: number }[];
    interiors: { x: number; y: number }[][];
  }>({ exterior: [], interiors: [] });
  const canDrawInternalPolygon = useReactiveVar(canDrawInternalPolygonVar);
  const [isWellAttributesChanged, setIsWellAttributesChanged] =
    useState<boolean>(false);

  const [menuState, setMenuState] = useState<MenuState>(menuStateIntialValues);
  const [dropWellDiscardModalOpen, setDropWellDiscardModalOpen] =
    useState(false);
  const [createClusterDiscardModalOpen, setCreateClusterDiscardModalOpen] =
    useState(false);

  const [isCompleteReviewModalOpen, setIsCompleteReviewModalOpen] =
    useState(false);
  const [deleteClusterReviewModalOpen, setDeleteClusterReviewModalOpen] =
    useState(false);
  const [deleteScanObjectReviewModalOpen, setDeleteScanObjectReviewModalOpen] =
    useState(false);
  const [isWellContaminationSelected, setIsWellContaminationSelected] =
    useState(false);
  const [thumbnails, setThumbnails] =
    React.useState<ImageEvent[]>(emptyImageEvents);

  const interceptedAction = useRef<
    | {
        action: string;
        value: string | ClusterSelectedOnImageViewerValue;
      }
    | undefined
  >(undefined);

  const [
    getColoniesAndClusterData,
    {
      data: coloniesAndClustersData,
      loading: colonyClusterDataLoading,
      refetch,
    },
  ] = useColoniesLazyQuery({ fetchPolicy: "cache-and-network" });

  const [updateCluster, { loading: updateClusterLoading }] =
    useUpdateClusterMutation();

  const [deleteScanObject, { loading: deleteScanObjectInProgress }] =
    useDeleteScanObjectMutation();

  const [updateImageEvent, { loading: updateImageEventLoading }] =
    useUpdateImageEventMutation();

  const [updateWellStatus] = useUpdateWellStatusMutation();
  const [createCluster, { loading: createClusterLoading }] =
    useCreateClusterMutation();

  const [createColonyAndCluster, { loading: createColonyAndClusterLoading }] =
    useCreateColonyAndClusterMutation();

  const [createScanObject] = useCreateScanObjectMutation();

  const [updatePlate, { loading: updatePlateLoading }] =
    useUpdatePlateMutation();

  const { cache } = useApolloClient();

  let [searchParams, setSearchParams] = useSearchParams();

  const [getWellById, { data: wellData, loading: wellDataLoading }] =
    useWellByIdLazyQuery();
  const [
    getImageEvents,
    { data: imageEventsByEventIdData, loading: imageEventsLoading },
  ] = useImageEventsLazyQuery({ fetchPolicy: "cache-and-network" });
  const [
    getWellsListAndPlateData,
    { data, loading, refetch: refetchWellData },
  ] = useWellListAndPlateByIdLazyQuery({ fetchPolicy: "cache-and-network" });

  const plateId = searchParams.get("plateId");
  const wellId = searchParams.get("wellId") ?? "";
  const eventId = searchParams.get("eventId") ?? "";
  const wells = plateId ? data?.wells ?? emptyWells : emptyWells;
  const well = wellData?.well;
  // FIXME: Temporary fix to show the Plate Reviewers in the Well Accordion instead of Well Reviewers
  const tempWell = { ...wellData?.well, reviewers: data?.plate.reviewers };

  const imageEventData = imageEventsByEventIdData?.imageEvents?.find(
    (ie) => selectedImageEventId === ie?.id
  );
  const imageSettingData = imageEventData?.imageSetting;

  const scanObjectMetrics =
    coloniesAndClustersData?.scanObjectMetrics ?? emptyScanObjectMetrics;

  const clusterMetrics =
    coloniesAndClustersData?.clusterMetrics ?? emptyClusterMetrics;

  const colonyMetrics =
    coloniesAndClustersData?.colonyMetrics ?? emptyColonyMetrics;

  const inferenceLayers =
    coloniesAndClustersData?.inferences ?? emptyInferenceLayers;

  const inferenceLayerLoaded = useRef(false);

  //TODO : Maintain the state in it's own component
  const [dropWell, setDropWell] = useState<DropWellProps>({
    ...dropWellIntialValues,
    wellId: `${wellId}`,
  });

  useEffect(() => {
    setDropWell({
      wellId: `${wellId}`,
      status: well?.status as string,
      reason: "",
      dropReason:
        well?.status === "DROP"
          ? (well?.statusReason as string)
          : data?.plate.plateStatus === "DROP"
          ? "Plate dropped"
          : "",
      wellStatus: well?.status as string,
      plateStatus: data?.plate.plateStatus as string,
    });
    clustersByAnalysisRequestOrColonyQualityVar({});
    setExpanded([]);
    coloniesByQualityVar({});
  }, [data, well, wellId]);

  const [dropPlate, setDropPlate] = useState<DropPlateProps>({
    plateId: `${plateId}`,
    status: "",
    reason: "",
  });

  useEffect(() => {
    setDropPlate({
      plateId: `${plateId}`,
      status: data?.plate.plateStatus as string,
      reason: "",
    });
  }, [data, plateId]);

  const [dropPlateModalOpen, setDropPlateModalOpen] = useState(false);

  useEffect(() => {
    if (plateId) {
      getWellsListAndPlateData({
        variables: {
          plateId,
        },
      });
    }
  }, [plateId, getWellsListAndPlateData]);

  useEffect(() => {
    if (wellId) {
      getWellById({
        variables: {
          wellId: wellId,
        },
      });
    }
  }, [wellId, getWellById]);

  useEffect(() => {
    fetchZarrImageViewer();
    return () => {
      showInferenceLayerVar(false);
      inferenceDataVar([]);
      imageEventDataVar([]);
      imageEventIndexVar(-1);
      loaderCountVar({ count: 0 });
    };
  }, []);

  useEffect(() => {
    if (!wellId && plateId && wells?.length > 0) {
      const tempId = wells[0]?.id as string;
      setSearchParams({ plateId, wellId: tempId });
      inferenceLayerLoaded.current = false;
    }
  }, [wellId, wells, setSearchParams, plateId]);

  useEffect(() => {
    if (selectedImageEventId) {
      getColoniesAndClusterData({
        variables: {
          imageEventId: selectedImageEventId ?? "",
          freeClusterMetrics: true,
        },
      });
      selectedClusterIdVar("");
      setCreationMode(false);
    }
  }, [getColoniesAndClusterData, selectedImageEventId]);

  useEffect(() => {
    if (eventId && wellId) {
      getImageEvents({
        variables: {
          eventId: eventId,
          wellId: wellId,
          analysisStatus: ImageEventAnalysisStatus.Success,
        },
      });
    }
  }, [eventId, getImageEvents, wellId]);

  useEffect(() => {
    inferenceDataVar([]);
    scanObjectsByAnalysisIdVar({});
    selectedScanObjectIndexVar(-1);
    selectedClusterIdVar("");
    imageEventDataVar([]);
    imageEventIndexVar(-1);
    setExpanded([]);
    clustersByAnalysisRequestOrColonyQualityVar({});
    coloniesByQualityVar({});
  }, [selectedImageEventId, eventId]);

  useEffect(() => {
    if (
      interceptedAction.current?.action === INTERCEPTED_ACTIONS.WELL_CHANGE &&
      !createClusterDiscardModalOpen
    ) {
      const newWellId = interceptedAction.current?.value as string;
      const newPlateId = plateId as string;
      interceptedAction.current = undefined;
      setSearchParams({ plateId: newPlateId, wellId: newWellId, eventId });
      inferenceLayerLoaded.current = false;
    }
  }, [createClusterDiscardModalOpen, setSearchParams, plateId, eventId]);

  useEffect(() => {
    async function getImageEventData(layers: ImageEvent[]) {
      const imageEventsDataPromises = layers.map((x) => {
        if (x.id === selectedImageEventId) {
          return null;
        } else {
          return loadZarrFile(
            x?.artifactPath?.blob_path as string,
            false,
            1,
            x?.artifactPath?.time_slice_index
          );
        }
      });
      const imageEventsData = await Promise.all(imageEventsDataPromises);
      imageEventDataVar(imageEventsData);
    }

    if (
      !imageEventsLoading &&
      imageEventsByEventIdData &&
      cookieAuthenticated &&
      imageEventVar.length === 0 &&
      selectedImageEventId &&
      imageEventsByEventIdData.imageEvents?.some(
        (ie) => ie?.id === selectedImageEventId
      )
    ) {
      getImageEventData(imageEventsByEventIdData?.imageEvents as ImageEvent[]);
    }
  }, [
    imageEventsByEventIdData,
    cookieAuthenticated,
    imageEventsLoading,
    selectedImageEventId,
    baseLayerData,
    imageEventVar.length,
  ]);

  useEffect(() => {
    async function getInferenceData(layers: InferenceLayer[]) {
      const inferenceDataPromises = layers.map((x) => {
        return loadZarrFile(
          x?.artifactPath?.blob_path as string,
          false,
          0.5,
          x?.artifactPath?.time_slice_index
        );
      });
      const inferenceData = await Promise.all(inferenceDataPromises);
      inferenceDataVar(inferenceData);
    }
    if (
      inferenceLayers?.length >= 0 &&
      !inferenceLayerLoaded.current &&
      cookieAuthenticated
    ) {
      getInferenceData(inferenceLayers as InferenceLayer[]);
    }
  }, [inferenceLayers, cookieAuthenticated]);

  useEffect(() => {
    if (
      newPolygonData ||
      dropWell.status === "Drop" ||
      dropPlate.status === "Drop"
    ) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [dropWell.status, dropPlate.status, newPolygonData]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!colonyClusterDataLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (colonyClusterDataLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [colonyClusterDataLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!wellDataLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (wellDataLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [wellDataLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!imageEventsLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (imageEventsLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [imageEventsLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!updateImageEventLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (updateImageEventLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [updateImageEventLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!createClusterLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (createClusterLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [createClusterLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!createColonyAndClusterLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (createColonyAndClusterLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [createColonyAndClusterLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!updateClusterLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (updateClusterLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [updateClusterLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!updatePlateLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (updatePlateLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [updatePlateLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if ((!loading || !deleteScanObjectInProgress) && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (loading || deleteScanObjectInProgress) {
      loaderCountVar({ count: count + 1 });
    }
  }, [loading, deleteScanObjectInProgress]);

  const handleImageEventId = useCallback(
    (id: string) => {
      if (newPolygonData) {
        interceptedAction.current = {
          action: INTERCEPTED_ACTIONS.UPDATE_EVENT_IMAGE_ID,
          value: id,
        };
        setCreateClusterDiscardModalOpen(true);
      } else {
        setSelectedImageEventId(id);
      }
    },
    [setSelectedImageEventId, newPolygonData]
  );

  useEffect(() => {
    if (!imageEventIndex || imageEventIndex === -1) {
      const index = imageEventsByEventIdData?.imageEvents?.findIndex(
        (ie) => ie?.id === imageEventData?.id
      );
      imageEventIndexVar(index);
    }
  }, [
    imageEventData?.id,
    imageEventIndex,
    imageEventsByEventIdData?.imageEvents,
  ]);

  useEffect(() => {
    if (selectedClusterId !== undefined) {
      setRightPanelOpen(true);
    } else {
      setRightPanelOpen(false);
    }
  }, [selectedClusterId]);

  const handleZaxisChange = (newCurrentZAxis: any) => {
    let newSelections = baseLayerData?.layerProps?.selections[0];
    newSelections[2] = newCurrentZAxis;
    zAxisValueVar(imageSettingData?.zarray[newCurrentZAxis]);
    setBaseLayerData({
      ...baseLayerData,
      layerProps: {
        ...baseLayerData.layerProps,
        selections: [newSelections],
      },
    });
  };
  const closeMenu = React.useCallback(() => {
    setMenuState(menuStateIntialValues);
  }, []);

  const handleRightClick = React.useCallback(
    (info: any, e: React.MouseEvent) => {
      if (info?.object?.objectType === "scan-object") {
        setMenuState({
          clusterData: {
            isSelected: false,
            clusterId: "0",
            colonyId: "0",
          },
          show: true,
          coordinates: {
            // @ts-ignore
            xCoordinate: e.center.x,
            // @ts-ignore
            yCoordinate: e.center.y,
          },
          scanObjectData: {
            scanObjectId: info?.object?.id,
            imageAnalysisRequestId: info?.object?.imageAnalysisRequestId,
            imageEventId: info?.object?.imageEventId,
          },
        });
      } else {
        if (info?.object?.objectType === "cluster" && !creationMode) {
          if (selectedClusterId && info.object.id !== selectedClusterId) {
            selectedClusterIdVar("");
          }
        }
      }
    },
    [creationMode, selectedClusterId]
  );

  const handleLeftClick = React.useCallback(
    (info: any, _e: React.MouseEvent) => {
      if (creationMode) {
        return;
      }
      if (info?.object?.objectType === "scan-object") {
        const scanObject = info.object;
        selectedScanObjectIndexVar(info?.index ?? -1);
        const event = new CustomEvent("scan-object-clicked-on-image-viewer", {
          detail: {
            id: scanObject.id,
            imageAnalysisRequestId: scanObject.imageAnalysisRequestId,
          },
        });
        document.dispatchEvent(event);
        return;
      }
      if (info?.object?.objectType === "cluster") {
        const cluster = info.object;
        selectedClusterIdVar(cluster?.id ?? "");
        const event = new CustomEvent("cluster-clicked-on-image-viewer", {
          detail: {
            id: cluster.id,
            imageAnalysisRequestId: cluster?.imageAnalysisRequestId,
            colonyId: cluster?.colonyId,
          },
        });
        document.dispatchEvent(event);
        const clusterId: string = cluster?.id;
        const colonyId: string = cluster?.colonyId;
        let tempExpanded: string[];
        if (colonyId) {
          tempExpanded = [
            "colony",
            `${cluster?.quality}_COLONY`, // is colony quality same as cluster quality
            `colony-associated-${colonyId}`,
          ];
        } else {
          tempExpanded = [
            "cluster",
            `cluster-image-analysis-${cluster?.imageAnalysisRequestId}`,
            `${cluster?.quality}-CLUSTER-${cluster?.imageAnalysisRequestId}`,
          ];
        }
        if (newPolygonData) {
          interceptedAction.current = {
            action: INTERCEPTED_ACTIONS.CLUSTER_SELECTED_ON_IMAGE_VIEWER,
            value: {
              clusterId,
              expanded: tempExpanded,
            },
          };
          setCreateClusterDiscardModalOpen(true);
        } else {
          selectedClusterIdVar(clusterId);
          setExpanded(tempExpanded);
        }
      }
    },
    [creationMode, newPolygonData]
  );

  const handleBrightFieldClick = useCallback(
    (_info: any, _e: React.MouseEvent) => {
      selectedClusterIdVar("");
      setExpanded([]);
    },
    []
  );

  const handleAttributesPanel = useCallback((value: boolean) => {
    setRightPanelOpen(value);
    if (value) {
      setNewPolygonData({
        category: "New object",
        comment: "",
        associatedWith: null,
        name: null,
        quality: "UNKNOWN",
        color: DEFAULT_POLYGON_COLOR,
        opacity: DEFAULT_OPACITY,
        energyLevel: POLYGON_DEFAULT_ENERGY_LEVEL,
        imageAnalysisRequest: "",
      });
    } else {
      setNewPolygonData(null);
    }
  }, []);

  const updateNewPolygonPoints = useCallback(
    (
      exterior: { x: number; y: number }[],
      interiors: { x: number; y: number }[][]
    ) => {
      newPolygonPoints.current = { exterior, interiors };
    },
    []
  );

  const handleClusterCreation = useCallback(async () => {
    const { data } = await createCluster({
      variables: {
        clusterData: {
          imageEventId: selectedImageEventId as string,
          colonyId: newPolygonData?.associatedWith?.id,
          name: newPolygonData.name,
          exterior: newPolygonPoints.current.exterior,
          interiors: newPolygonPoints.current.interiors,
          quality: newPolygonData.quality,
          imageAnalysisRequestId: newPolygonData.imageAnalysisRequest,
          color: addAlphaToHexCode(
            newPolygonData.color,
            newPolygonData.opacity
          ),
        },
      },
    });
    const cluster = data?.createCluster;
    if (!cluster?.colony?.id) {
      const clustersByAnalysisRequest =
        clustersByAnalysisRequestOrColonyQualityVar();
      const imageAnalysisRequestId = cluster?.imageAnalysisRequest?.id;
      const temp = clustersByAnalysisRequest[imageAnalysisRequestId!];
      if (temp && temp.clusters && Array.isArray(temp.clusters)) {
        const clusters = [...temp.clusters];
        clusters.push(cluster as Cluster);
        clustersByAnalysisRequestOrColonyQualityVar({
          ...clustersByAnalysisRequest,
          [imageAnalysisRequestId!]: { ...temp, clusters },
        });
      }
      updateClusterMetricsCache(
        cache,
        imageAnalysisRequestId,
        selectedImageEventId
      );
    } else {
      const quality: string = newPolygonData.associatedWith.quality;
      const clustersByColonyQuality =
        clustersByAnalysisRequestOrColonyQualityVar();
      if (
        clustersByColonyQuality.hasOwnProperty(quality) &&
        clustersByColonyQuality[quality]?.clusters &&
        Array.isArray(clustersByColonyQuality[quality].clusters)
      ) {
        const clusters = [...clustersByColonyQuality[quality].clusters!];
        clusters.push(cluster as Cluster);
        clustersByAnalysisRequestOrColonyQualityVar({
          ...clustersByColonyQuality,
          [quality]: { ...clustersByColonyQuality[quality], clusters },
        });
      }
    }
    setCreationMode(false);
    selectedClusterIdVar(cluster?.id);
  }, [createCluster, selectedImageEventId, newPolygonData, cache]);

  const handleScanObjectCreation = useCallback(async () => {
    try {
      const { data } = await createScanObject({
        variables: {
          scanObjectData: {
            name: newPolygonData.name,
            imageEventId: selectedImageEventId as string,
            imageSettingId: imageEventData?.imageSetting?.id!,
            exterior: newPolygonPoints.current.exterior,
            interiors: newPolygonPoints.current.interiors,
            color: addAlphaToHexCode(
              newPolygonData.color,
              newPolygonData.opacity
            ),
            attributes: {
              energy_level: newPolygonData?.energyLevel,
            },
          },
        },
      });
      updateCacheForScanObject(
        cache,
        data?.createScanObject,
        selectedImageEventId
      );
      setCreationMode(false);
      setExpanded([
        "scan-object",
        data?.createScanObject?.imageAnalysisRequest?.id!,
      ]);
      showScanObjectVar(true);
    } catch (e) {
      console.error(e);
    }
  }, [
    cache,
    createScanObject,
    imageEventData,
    newPolygonData,
    selectedImageEventId,
  ]);

  const handleColonyAndClusterCreation = useCallback(async () => {
    const { data } = await createColonyAndCluster({
      variables: {
        colonyData: {
          name: newPolygonData.associatedWith.name,
          isSelected: false,
          wellId: wellId,
          outline: {
            color: addAlphaToHexCode(
              newPolygonData.color,
              newPolygonData.opacity
            ),
          },
        },
        clusterData: {
          imageEventId: selectedImageEventId as string,
          colonyId: newPolygonData?.associatedWith?.id,
          name: newPolygonData.name,
          exterior: newPolygonPoints.current.exterior,
          interiors: newPolygonPoints.current.interiors,
          quality: newPolygonData.quality,
          imageAnalysisRequestId: newPolygonData.imageAnalysisRequest,
          color: addAlphaToHexCode(
            newPolygonData.color,
            newPolygonData.opacity
          ),
        },
      },
    });
    const cluster = data?.createColonyAndCluster?.cluster;
    const colony = data?.createColonyAndCluster?.colony;
    const quality = colony?.quality as string;
    const coloniesByQuality = coloniesByQualityVar();
    if (coloniesByQuality.hasOwnProperty(quality)) {
      const colonies = [...coloniesByQuality[quality]];
      colonies.push(colony as Colony);
      coloniesByQualityVar({ ...coloniesByQuality, [quality]: colonies });
    }
    const clustersByColonyQuality =
      clustersByAnalysisRequestOrColonyQualityVar();
    if (
      clustersByColonyQuality.hasOwnProperty(quality) &&
      clustersByColonyQuality[quality]?.clusters &&
      Array.isArray(clustersByColonyQuality[quality].clusters)
    ) {
      const clusters = [...clustersByColonyQuality[quality].clusters!];
      clusters.push(cluster as Cluster);
      clustersByAnalysisRequestOrColonyQualityVar({
        ...clustersByColonyQuality,
        [quality]: { ...clustersByColonyQuality[quality], clusters },
      });
    }
    updateColonyMetrics(cache, selectedImageEventId, quality);
    selectedClusterIdVar(cluster?.id);
    setCreationMode(false);
  }, [
    cache,
    createColonyAndCluster,
    newPolygonData,
    selectedImageEventId,
    wellId,
  ]);

  const handleDropPlate = () => {
    setDropPlateModalOpen(true);
  };

  const handleDropPlateModalCancel = () => {
    setDropPlateModalOpen(false);

    if (isWellContaminationSelected) {
      setIsWellContaminationSelected(false);

      if (newPolygonData) {
        setCreateClusterDiscardModalOpen(true);
      } else {
        navigate(`${ROUTES.PLATE}/${plateId}`);
      }
    }
  };

  const handleDropPlateModalContinue = useCallback(async () => {
    await updatePlate({
      variables: {
        updatePlateId: `${plateId}`,
        ops: [
          {
            value: 1,
            op: "replace",
            path: "/plateStatus",
          },
          {
            value: dropPlate.reason,
            op: "replace",
            path: "/plateStatusReason",
          },
        ],
      },
    });
    interceptedAction.current = {
      action: INTERCEPTED_ACTIONS.PLATE_OR_WELL_DROPPED,
      value: "",
    };
    setIsWellContaminationSelected(false);
    setDropPlateModalOpen(false);
    setIsWellAttributesChanged(true);
    setDropPlate({ plateId: "", status: "KEEP", reason: "" });

    if (newPolygonData) {
      setCreateClusterDiscardModalOpen(true);
    } else {
      navigate(`${ROUTES.PLATE}/${plateId}`);
    }
  }, [dropPlate.reason, navigate, newPolygonData, plateId, updatePlate]);

  const internalPolygonDisabled = !Boolean(newPolygonData);

  const handleInternalPolygon = useCallback(() => {
    const temp = canDrawInternalPolygonVar();
    canDrawInternalPolygonVar(!temp);
  }, []);

  const handleCreateClusterDiscardModalCancel = useCallback(() => {
    interceptedAction.current = undefined;
    setCreateClusterDiscardModalOpen(false);
  }, []);

  const updateWellReviewStatus = useCallback(
    async (wellStatus: string) => {
      await updateImageEvent({
        variables: {
          imageEventId: selectedImageEventId ?? "", // update review status of selected image event
          ops: {
            op: "replace",
            path: "/reviewStatus",
            value:
              wellStatus === WELL_STATUS.IN_REVIEW
                ? WELL_STATUS.IN_REVIEW
                : WELL_STATUS.COMPLETED,
          },
        },
      });
      setIsWellAttributesChanged(false);
      wellStatus === WELL_STATUS.IN_REVIEW && refetchWellData();
      wellStatus !== WELL_STATUS.IN_REVIEW &&
        wellReviewCompletedVar({
          reviewCompleted: true,
          wellName: well?.position ?? "",
        });
      wellStatus !== WELL_STATUS.IN_REVIEW &&
        navigate(`${ROUTES.PLATE}/${plateId}`);
    },
    [
      updateImageEvent,
      selectedImageEventId,
      refetchWellData,
      well?.position,
      navigate,
      plateId,
    ]
  );

  useEffect(() => {
    if (isWellAttributesChanged) {
      updateWellReviewStatus(WELL_STATUS.IN_REVIEW);
    }
  }, [updateWellReviewStatus, isWellAttributesChanged]);

  const handleCreateClusterDiscardModalContinue = useCallback(() => {
    if (
      interceptedAction.current?.action ===
      INTERCEPTED_ACTIONS.UPDATE_EVENT_IMAGE_ID
    ) {
      setSelectedImageEventId(interceptedAction.current?.value as string);
    } else if (
      interceptedAction.current?.action ===
      INTERCEPTED_ACTIONS.CLUSTER_SELECTED_ON_IMAGE_VIEWER
    ) {
      const value = interceptedAction.current
        ?.value as ClusterSelectedOnImageViewerValue;
      selectedClusterIdVar(value?.clusterId);
      setExpanded(value?.expanded);
    } else if (
      interceptedAction.current?.action ===
      INTERCEPTED_ACTIONS.CLUSTER_SELECTION_ON_LEFT_PANEL
    ) {
      const id = interceptedAction.current?.value as string;
      selectedClusterIdVar(id);
    } else if (
      interceptedAction.current?.action === INTERCEPTED_ACTIONS.WELL_CHANGE
    ) {
      setDropWell({ wellId: `${wellId}`, status: "", reason: "" });
      inferenceDataVar([]);
      imageEventDataVar([]);
      imageEventIndexVar(-1);
      showInferenceLayerVar(false);
    } else if (
      interceptedAction.current?.action === INTERCEPTED_ACTIONS.BACK_TO_PLATES
    ) {
      interceptedAction.current = undefined;
      navigate(`${ROUTES.PLATE}/${plateId}`);
    } else if (
      interceptedAction.current?.action ===
      INTERCEPTED_ACTIONS.WELL_STATUS_CHANGED
    ) {
      interceptedAction.current = undefined;
      navigate(`${ROUTES.PLATE}/${plateId}`);
    } else if (
      interceptedAction.current?.action ===
      INTERCEPTED_ACTIONS.COMPLETE_BTN_CLICKED
    ) {
      interceptedAction.current = undefined;
    } else if (
      interceptedAction.current?.action ===
      INTERCEPTED_ACTIONS.PLATE_OR_WELL_DROPPED
    ) {
      interceptedAction.current = undefined;
      navigate(`${ROUTES.PLATE}/${plateId}`);
    }
    setCreationMode(false);
    setCreateClusterDiscardModalOpen(false);
  }, [navigate, plateId, wellId]);

  const handleWellChange = useCallback(
    (wellId: string) => {
      if (newPolygonData || dropWell.status === "Drop") {
        interceptedAction.current = {
          action: INTERCEPTED_ACTIONS.WELL_CHANGE,
          value: wellId,
        };
        setCreateClusterDiscardModalOpen(true);
        return;
      }
      if (plateId) {
        setSearchParams({ plateId, wellId });
        inferenceLayerLoaded.current = false;
        setCreationMode(false);
      }
    },
    [dropWell.status, newPolygonData, plateId, setSearchParams]
  );

  const handleReviewComplete = async () => {
    if (newPolygonData) {
      interceptedAction.current = {
        action: INTERCEPTED_ACTIONS.COMPLETE_BTN_CLICKED,
        value: "",
      };
      setCreateClusterDiscardModalOpen(true);
      return;
    }
  };

  const handleCompleteReviewModalCancel = useCallback(() => {
    setIsCompleteReviewModalOpen(false);
  }, []);

  const handleCompleteReviewModalContinue = async () => {
    updateWellReviewStatus(WELL_STATUS.COMPLETED);
    setIsCompleteReviewModalOpen(false);
  };

  useEffect(() => {
    if (selectedClusterId) setRightPanelOpen(true);
    else setRightPanelOpen(false);
  }, [selectedClusterId]);

  const updateScanObjectsInZarr = (
    imageAnalysisRequestId: string | undefined,
    deletedScanObjectId: string | undefined
  ) => {
    const scanObjectsByAnalysisId = scanObjectsByAnalysisIdVar();
    let tempScanObjects =
      scanObjectsByAnalysisId[imageAnalysisRequestId as string];
    const filteredScanObjects = tempScanObjects.filter(
      (record) => record.id !== deletedScanObjectId
    );
    const temp = { ...scanObjectsByAnalysisId };
    temp[imageAnalysisRequestId as string] =
      filteredScanObjects as ScanObject[];
    scanObjectsByAnalysisIdVar(temp);
  };

  const deleteScanObjectOnConfirmation = useCallback(async () => {
    await deleteScanObject({
      variables: {
        id: menuState?.scanObjectData?.scanObjectId || "-1",
      },
    });
    updateMetricCacheForScanObjects(
      cache,
      menuState?.scanObjectData?.imageAnalysisRequestId,
      menuState?.scanObjectData?.imageEventId
    );
    updateScanObjectsInZarr(
      menuState?.scanObjectData?.imageAnalysisRequestId,
      menuState?.scanObjectData?.scanObjectId
    );
    setDeleteScanObjectReviewModalOpen(false);
    closeMenu();
  }, [
    deleteScanObject,
    menuState?.scanObjectData?.scanObjectId,
    menuState?.scanObjectData?.imageAnalysisRequestId,
    menuState?.scanObjectData?.imageEventId,
    cache,
    closeMenu,
  ]);

  const handleDeleteClusterDiscardModalContinue = useCallback(async () => {
    await updateCluster({
      variables: {
        ops: {
          value: false,
          op: "replace",
          path: "/isActive",
        },
        updateClusterId: menuState.clusterData.clusterId,
      },
    });
    refetch();
    selectedClusterIdVar("");
    setDeleteClusterReviewModalOpen(false);
    setIsWellAttributesChanged(true);
    closeMenu();
  }, [closeMenu, menuState.clusterData.clusterId, refetch, updateCluster]);

  const handleDeleteClusterDiscardModalCancel = useCallback(() => {
    // setSelectedClusterId(menuState.clusterData.clusterId);
    // setDeleteClusterReviewModalOpen(false);
    // setDeleteScanObjectReviewModalOpen(false);
  }, []);

  const handleRightClickDelete = useCallback(() => {
    setDeleteClusterReviewModalOpen(true);
  }, []);

  const handleScanObjectDeleteConfirmationPopup = useCallback(() => {
    setDeleteScanObjectReviewModalOpen(true);
  }, []);

  const handleBackToPlate = useCallback(() => {
    if (newPolygonData) {
      interceptedAction.current = {
        action: INTERCEPTED_ACTIONS.BACK_TO_PLATES,
        value: "",
      };
      setCreateClusterDiscardModalOpen(true);
      return;
    } else if (data?.plate.plateStatus === "DROP") {
      navigate(`${ROUTES.PLATE}/${plateId}`);
    } else if (well?.status === "DROP" && dropPlate.status !== "DROP") {
      navigate(`${ROUTES.PLATE}/${plateId}`);
    } else if (dropWell.status === "DROP" || dropPlate.status === "DROP") {
      interceptedAction.current = {
        action: INTERCEPTED_ACTIONS.BACK_TO_PLATES,
        value: "",
      };
      setCreateClusterDiscardModalOpen(true);
      return;
    } else {
      navigate(`${ROUTES.PLATE}/${plateId}`);
    }
  }, [
    data?.plate.plateStatus,
    dropPlate.status,
    dropWell.status,
    navigate,
    newPolygonData,
    plateId,
    well?.status,
  ]);

  const handleDropWell = () => {
    setDropWellDiscardModalOpen(true);
  };

  const handleDropWellDiscardModalCancel = useCallback(() => {
    setDropWellDiscardModalOpen(false);
  }, []);

  useEffect(() => {
    const index = imageSettingData?.zarray.findIndex(
      (ele) => ele === zAxisValue
    );
    if (imageSettingData) {
      if (index && index !== -1) {
        zAxisIndexVar(index);
        zAxisValueVar(imageSettingData?.zarray[index]);
      } else {
        zAxisIndexVar(0);
        if (imageSettingData?.zarray.length > 0) {
          zAxisValueVar(imageSettingData?.zarray[0]);
        }
      }
    }
  }, [zAxisValue, imageSettingData]);

  const handleDropWellDiscardModalContinue = async () => {
    await updateWellStatus({
      variables: {
        wellId: wellId,
        ops: [
          {
            op: "replace",
            path: "/status",
            value: dropWell.status,
          },
          {
            op: "replace",
            path: "/statusReason",
            value: dropWell.reason,
          },
        ],
      },
    });
    interceptedAction.current = {
      action: INTERCEPTED_ACTIONS.PLATE_OR_WELL_DROPPED,
      value: "",
    };
    setDropWellDiscardModalOpen(false);
    setIsWellAttributesChanged(true);
    if (dropWell.reason !== null) {
      if (dropWell.reason.match(/Contamination/)) {
        setDropWell({
          wellId: `${wellId}`,
          status: "DROP",
          reason: "",
          wellStatus: "DROP",
        });

        setIsWellContaminationSelected(true);
        setDropPlateModalOpen(true);
      } else {
        if (newPolygonData || dropPlate.status === "Drop") {
          interceptedAction.current = {
            action: INTERCEPTED_ACTIONS.WELL_STATUS_CHANGED,
            value: "",
          };

          setDropWell({
            wellId: `${wellId}`,
            status: "DROP",
            reason: "",
            wellStatus: "DROP",
          });
          setCreateClusterDiscardModalOpen(true);
        } else {
          if (dropWell.status === "DROP")
            navigate(`${ROUTES.PLATE}/${plateId}`); // do well still need to redirect after marking  a well as scan!
        }
      }
    }
  };

  return (
    <>
      <Page title="Image Viewer">
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gridAutoFlow: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <TopBarImageView
            zArray={imageSettingData?.zarray ?? []}
            currentZAxis={zAxisIndex || 0}
            handleZaxisChange={handleZaxisChange}
            onPolygonClick={() => {
              if (!creationMode) selectedClusterIdVar("");
              setCreationMode((prevState) => !prevState);
            }}
            creationMode={creationMode}
            internalPolygonDisabled={internalPolygonDisabled}
            handleInternalPolygon={handleInternalPolygon}
            canDrawInternalPolygon={canDrawInternalPolygon}
            handleComplete={handleReviewComplete}
            wellList={data?.wells ? (data.wells as WellList[]) : []}
            selectedWellId={wellId}
            handleWellChange={handleWellChange}
            handleBackToPlate={handleBackToPlate}
            scanObjectMetrics={scanObjectMetrics as ScanObjectMetrics[]}
            triggerAnalysisContextData={{
              plateBarcode: data?.plate?.barcode as string,
              wellPosition: tempWell?.position as string,
              reviewStatus: tempWell?.reviewStatus as string,
              latestImageEvent: thumbnails?.[
                thumbnails?.length - 1
              ] as ImageEvent,
            }}
            isLatestImageEvent={
              selectedImageEventId === thumbnails?.[thumbnails?.length - 1]?.id
            }
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gridAutoFlow: "column",
            }}
          >
            <LeftPaneImageViewer
              expanded={expanded}
              setExpanded={setExpanded}
              newPolygonData={newPolygonData}
              setBaseLayerData={setBaseLayerData}
              baseLayerData={baseLayerData}
              inferenceLayers={inferenceLayers as InferenceLayer[]}
              imageEventData={imageEventData ?? undefined}
              imageEvents={imageEventsByEventIdData ?? undefined}
              scanObjectMetrics={scanObjectMetrics as ScanObjectMetrics[]}
              well={tempWell as Well}
              plate={data?.plate}
              clusterMetrics={clusterMetrics as ClusterMetrics[]}
              colonyMetrics={colonyMetrics as ColonyMetrics}
              imageEventIndex={imageEventIndex}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "1fr auto",
                gridAutoFlow: "row",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Suspense fallback={<div />}>
                  <ZarrImageViewer
                    dataUrl={imageEventData?.artifactPath?.blob_path}
                    baseLayerData={baseLayerData}
                    setBaseLayerData={setBaseLayerData}
                    selectedTimeIndex={
                      imageEventData?.artifactPath?.time_slice_index
                    }
                    handleRightClick={handleRightClick}
                    handleLeftClick={handleLeftClick}
                    handleBrightFieldClick={handleBrightFieldClick}
                    creationMode={creationMode}
                    handleAttributesPanel={handleAttributesPanel}
                    updateNewPolygonPoints={updateNewPolygonPoints}
                    setIsWellAttributesChanged={setIsWellAttributesChanged}
                  />
                </Suspense>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {cookieAuthenticated && (
                  <ClonalityTimeframe
                    setSelectedImageEventId={handleImageEventId}
                    selectedImageEventId={selectedImageEventId}
                    seedingDay={data?.plate?.run?.seedingDay ?? ""}
                    setThumbnails={setThumbnails}
                  />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: `${SIZES.IMAGE_VIEWER_PAGE.RIGHT_PANEL}px`,
              }}
            >
              {well && (
                <RightPaneImageViewer
                  rightPanelOpen={rightPanelOpen}
                  setRightPanelOpen={setRightPanelOpen}
                  newPolygonData={newPolygonData}
                  setNewPolygonData={setNewPolygonData}
                  handleClusterCreation={handleClusterCreation}
                  well={tempWell as Well}
                  selectedImageEventId={selectedImageEventId}
                  handleColonyAndClusterCreation={
                    handleColonyAndClusterCreation
                  }
                  inferenceLayers={inferenceLayers as InferenceLayer[]}
                  plate={data?.plate}
                  dropWell={dropWell}
                  setDropWell={setDropWell}
                  handleDropWell={() => {
                    dropWell.wellStatus !== "DROP"
                      ? handleDropWellDiscardModalContinue()
                      : handleDropWell();
                  }}
                  dropPlate={dropPlate}
                  setDropPlate={setDropPlate}
                  handleDropPlate={handleDropPlate}
                  refetch={refetch}
                  setIsWellAttributesChanged={setIsWellAttributesChanged}
                  imageEvents={thumbnails as ImageEvent[]}
                  handleScanObjectCreation={handleScanObjectCreation}
                  clusterMetrics={clusterMetrics as ClusterMetrics[]}
                  imageEventsData={imageEventsByEventIdData ?? undefined}
                />
              )}
            </Box>
          </Box>
        </Box>
        <RightClickMenu
          show={menuState.show}
          handleClickAway={closeMenu}
          xCoordinate={menuState.coordinates.xCoordinate}
          yCoordinate={menuState.coordinates.yCoordinate}
          handleRightClickDelete={
            menuState.scanObjectData?.scanObjectId
              ? handleScanObjectDeleteConfirmationPopup
              : handleRightClickDelete
          }
          scanObjectId={menuState.scanObjectData?.scanObjectId}
        />

        <CustomDiscardModal
          open={createClusterDiscardModalOpen}
          handleCancel={handleCreateClusterDiscardModalContinue}
          handleContinue={handleCreateClusterDiscardModalCancel}
          heading={imageViewerMessages.CLUSTER_DISCARD_POPUP_TEXT}
          subText={imageViewerMessages.CLUSTER_DISCARD_POPUP_SUBTEXT}
          cancelButtonText={imageViewerMessages.LEAVE_CHANGES_BUTTON_LABEL}
          continueButtonText={imageViewerMessages.STAY_ON_PAGE_BUTTON_LABEL}
        />
        <CustomDiscardModal
          open={isCompleteReviewModalOpen}
          handleCancel={handleCompleteReviewModalCancel}
          handleContinue={handleCompleteReviewModalContinue}
          heading={"Complete Review"}
          subText={COMPLETE_REVIEW_MESSAGE}
          cancelButtonText={imageViewerMessages.CANCEL}
          continueButtonText={imageViewerMessages.CONTINUE}
        />

        <CustomDiscardModal
          open={deleteClusterReviewModalOpen}
          handleCancel={handleDeleteClusterDiscardModalCancel}
          handleContinue={handleDeleteClusterDiscardModalContinue}
          heading={imageViewerMessages.DELETE_CLUSTER_POPUP_TEXT}
          subText={imageViewerMessages.DELETE_CLUSTER_POPUP_SUBTEXT}
        />
        <CustomDiscardModal
          open={deleteScanObjectReviewModalOpen}
          handleCancel={handleDeleteClusterDiscardModalCancel}
          handleContinue={deleteScanObjectOnConfirmation}
          heading={imageViewerMessages.DELETE_SCAN_OBJECT_POPUP_TEXT}
          subText={imageViewerMessages.DELETE_SCAN_OBJECT_POPUP_SUBTEXT}
        />
        <CustomDiscardModal
          open={dropWellDiscardModalOpen}
          handleCancel={handleDropWellDiscardModalCancel}
          handleContinue={handleDropWellDiscardModalContinue}
          heading={imageViewerMessages.DROP_WELL_TEXT}
          subText={`${imageViewerMessages.DROP_WELL_SUBTEXT_START} ${well?.position} ${imageViewerMessages.DROP_WELL_SUBTEXT_END}`}
        />
        <CustomDiscardModal
          open={dropPlateModalOpen}
          handleCancel={handleDropPlateModalCancel}
          handleContinue={handleDropPlateModalContinue}
          heading={"Drop plate?"}
          subText={`You are about to drop plate ${data?.plate?.name}. Are you sure you want to continue?`}
          loading={updatePlateLoading}
          continueButtonText={imageViewerMessages.SAVE_CHANGES_BUTTON_LABEL}
        />
        <CustomDiscardModal
          open={isWellContaminationSelected}
          handleCancel={handleDropPlateModalCancel}
          handleContinue={handleDropPlateModalContinue}
          heading={"Warning"}
          subText={
            "You have dropped a well due to contamination. Would you also like to drop the plate due to contamination?"
          }
          loading={updatePlateLoading}
          cancelButtonText={"Don't drop"}
          continueButtonText={"Drop plate"}
        />
      </Page>
    </>
  );
}

export default ImageViewerPage;
