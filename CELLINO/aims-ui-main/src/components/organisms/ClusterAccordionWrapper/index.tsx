import { useCallback, useEffect, useReducer, useState } from "react";
import ClusterAccordion from "../../molecules/ClusterAccordion";
import {
  Cluster,
  ClusterMetrics,
  Colony,
  useTempColoniesQuery,
  useUpdateClusterMutation,
} from "../../../generated/graphql";
import React from "react";
import CustomDiscardModal from "../../molecules/CustomDiscardModal";
import {
  addAlphaToHexCode,
  getAlphaFromHexCode,
} from "../../../utils/getColorWithOpacity";
import { DEFAULT_POLYGON_COLOR } from "../../../constants";
import memoize from "memoize-one";
import { useApolloClient } from "@apollo/client";
import { clustersByAnalysisRequestOrColonyQualityVar } from "../../../apollo/cache";
import updateClusterMetricsCache from "../../../utils/updateClusterMetricsCache";
import { colony } from "../../../constants/types";

export interface ClusterAccordionState {
  name: string;
  clonality: string;
  color: string;
  opacity: number;
  imageAnalysisRequestId?: string;
}

const getColonyAssociatedWithCluster = memoize((colonies, colonyId) => {
  const index: number = colonies?.findIndex(
    (colony: { id: string }) => colony.id === colonyId
  );
  if (index > -1) return colonies[index];
});

const emptyColonies: colony[] = [];

interface ClusterAccordionWrapperProps {
  cluster: Cluster;
  expandedCluster: boolean;
  setIsWellAttributesChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  clusterMetrics?: ClusterMetrics[];
  selectedImageEventId: string | null;
}

enum ActionKind {
  UPDATE_NAME = "UPDATE_NAME",
  UPDATE_CLONALITY = "UPDATE_CLONALITY",
  UPDATE_COLOR = "UPDATE_COLOR",
  UPDATE_OPACITY = "UPDATE_OPACITY",
  UPDATE_IMAGE_ANALYSIS_REQUEST = "UPDATE_IMAGE_ANALYSIS_REQUEST",
}

type Action = {
  type: ActionKind;
  payload?: string | boolean | number;
};

function reducer(
  state: ClusterAccordionState,
  action: Action
): ClusterAccordionState {
  switch (action.type) {
    case ActionKind.UPDATE_NAME: {
      return {
        ...state,
        name: action.payload as string,
      };
    }
    case ActionKind.UPDATE_CLONALITY: {
      return {
        ...state,
        clonality: action.payload as string,
      };
    }
    case ActionKind.UPDATE_COLOR: {
      return {
        ...state,
        color: action.payload as string,
      };
    }
    case ActionKind.UPDATE_OPACITY: {
      return {
        ...state,
        opacity: action.payload as number,
      };
    }
    case ActionKind.UPDATE_IMAGE_ANALYSIS_REQUEST: {
      return {
        ...state,
        imageAnalysisRequestId: action.payload as string,
      };
    }
    default: {
      return state;
    }
  }
}

const getClusterType = (type: string | null | undefined) => {
  if (type === "MANUAL") {
    return "Manual";
  } else if (type === "SYSTEMGENERATED") {
    return "System Generated";
  } else if (type === "EDITED") {
    return "Edited";
  } else {
    return "-";
  }
};
function createInitialState(cluster: Cluster) {
  return {
    name: cluster?.name ?? "name",
    clonality: cluster?.clonality!,
    imageAnalysisRequestId: cluster?.imageAnalysisRequest?.id ?? "",
    color: cluster?.outline?.color?.substring(0, 7),
    opacity: getAlphaFromHexCode(cluster?.outline?.color ?? ""),
  };
}

function ClusterAccordionWrapper({
  cluster,
  expandedCluster,
  setIsWellAttributesChanged,
  clusterMetrics,
  selectedImageEventId,
}: ClusterAccordionWrapperProps) {
  const [onSubmitClicked, setOnSubmitClicked] = useState(false);
  const [expanded, setExpanded] = useState(expandedCluster);
  const [state, dispatch] = useReducer(reducer, createInitialState(cluster!));
  const [submitEnable, setSubmitEnable] = useState(false);
  const [selectedColony, setSelectedColony] = useState<colony | null>(null);
  const { cache } = useApolloClient();

  const [updateCluster] = useUpdateClusterMutation();
  const { data } = useTempColoniesQuery({
    variables: { imageEventId: selectedImageEventId ?? "" },
  });

  const clusterOpacity = getAlphaFromHexCode(cluster?.outline?.color ?? "");
  const clusterColor = cluster?.outline?.color?.substring(0, 7);
  const colonies = data?.Colonies ?? emptyColonies;

  const updateSelectedClusterData = useCallback(
    (cluster: Cluster, previousCluster: Cluster, selectedColony: Colony) => {
      const clustersByColonyQuality =
        clustersByAnalysisRequestOrColonyQualityVar();
      const clustersByAnalysisRequest =
        clustersByAnalysisRequestOrColonyQualityVar();

      const tempAllClusters = { ...clustersByColonyQuality };

      const imageAnalysisRequestId = cluster?.imageAnalysisRequest?.id;
      const temp = clustersByAnalysisRequest[imageAnalysisRequestId!];
      //if deassociating a colony then remove the cluster from colony quality and add the cluster to free clustrer by analysis request
      if (!cluster?.colony?.id && previousCluster?.colony?.id) {
        const quality = getColonyAssociatedWithCluster(
          colonies,
          previousCluster?.colony?.id
        )?.quality;
        if (
          clustersByColonyQuality.hasOwnProperty(quality) &&
          clustersByColonyQuality[quality]?.clusters &&
          Array.isArray(clustersByColonyQuality[quality].clusters)
        ) {
          const clusters = [...clustersByColonyQuality[quality].clusters!];
          const index = clusters.findIndex((x) => x.id === cluster.id);
          clusters.splice(index, 1);
          tempAllClusters[quality] = {
            ...clustersByColonyQuality[quality],
            clusters,
          };
        }
        if (temp && temp.clusters && Array.isArray(temp.clusters)) {
          const clusters = [...temp.clusters];
          clusters.push(cluster as Cluster);
          tempAllClusters[imageAnalysisRequestId!] = { ...temp, clusters };
        }
        updateClusterMetricsCache(
          cache,
          imageAnalysisRequestId,
          selectedImageEventId
        );
      }
      //if associating a colony then remove cluster from free cluster metric image analysis and add it to the selected colony quality
      else if (cluster?.colony?.id && !previousCluster?.colony?.id) {
        const quality: string = selectedColony.quality as string;
        if (
          clustersByColonyQuality.hasOwnProperty(quality) &&
          clustersByColonyQuality[quality]?.clusters &&
          Array.isArray(clustersByColonyQuality[quality].clusters)
        ) {
          const clusters = [...clustersByColonyQuality[quality].clusters!];
          clusters.push(cluster as Cluster);
          tempAllClusters[quality] = {
            ...clustersByColonyQuality[quality],
            clusters,
          };
        }
        if (temp && temp.clusters && Array.isArray(temp.clusters)) {
          const clusters = [...temp.clusters];
          const index = clusters.findIndex((x) => x.id === cluster.id);
          clusters.splice(index, 1);
          tempAllClusters[imageAnalysisRequestId!] = { ...temp, clusters };
        }
        updateClusterMetricsCache(
          cache,
          imageAnalysisRequestId,
          selectedImageEventId,
          "decrement"
        );
      }
      // if changing image analysis request then decrement and remove the cluster from old one and increment , add the cluster to new analysis
      else if (
        cluster?.imageAnalysisRequest?.id !==
          previousCluster?.imageAnalysisRequest?.id &&
        !cluster?.colony?.id
      ) {
        const previousImageAnalysisRequestId =
          previousCluster?.imageAnalysisRequest?.id;
        const previousTemp = clustersByAnalysisRequest[imageAnalysisRequestId!];
        if (temp && temp.clusters && Array.isArray(temp.clusters)) {
          const clusters = [...temp.clusters];
          clusters.push(cluster as Cluster);
          tempAllClusters[imageAnalysisRequestId!] = { ...temp, clusters };
          updateClusterMetricsCache(
            cache,
            imageAnalysisRequestId,
            selectedImageEventId
          );
        }
        if (
          previousTemp &&
          previousTemp.clusters &&
          Array.isArray(previousTemp.clusters)
        ) {
          const clusters = [...previousTemp.clusters];
          const index = clusters.findIndex((x) => x.id === cluster.id);
          clusters.splice(index, 1);
          tempAllClusters[previousImageAnalysisRequestId!] = {
            ...previousTemp,
            clusters,
          };
          updateClusterMetricsCache(
            cache,
            previousImageAnalysisRequestId,
            selectedImageEventId,
            "decrement"
          );
        }
      }
      //if same cluster editing free clusters
      else if (!cluster?.colony?.id) {
        if (temp && temp.clusters && Array.isArray(temp.clusters)) {
          const clusters = [...temp.clusters];
          const index = clusters.findIndex((x) => x.id === cluster.id);
          clusters[index] = cluster;
          tempAllClusters[imageAnalysisRequestId!] = { ...temp, clusters };
        }
      }
      //if same cluster editing colony associated cluster
      else if (cluster?.colony?.id) {
        const quality: string = selectedColony.quality as string;
        if (
          clustersByColonyQuality.hasOwnProperty(quality) &&
          clustersByColonyQuality[quality]?.clusters &&
          Array.isArray(clustersByColonyQuality[quality].clusters)
        ) {
          const clusters = [...clustersByColonyQuality[quality].clusters!];
          const index = clusters.findIndex((x) => x.id === cluster.id);
          clusters[index] = cluster;
          tempAllClusters[quality] = {
            ...clustersByColonyQuality[quality],
            clusters,
          };
        }
      }
      clustersByAnalysisRequestOrColonyQualityVar(tempAllClusters);
    },
    [cache, colonies, selectedImageEventId]
  );

  const handleClusterContinue = React.useCallback(async () => {
    setOnSubmitClicked(false);
    setExpanded(false);
    let color =
      selectedColony === null
        ? state.color
        : selectedColony?.id !== cluster?.colony?.id
        ? selectedColony?.outline?.color.substring(0, 7)
        : state.color;

    const { data } = await updateCluster({
      variables: {
        ops: [
          { op: "replace", path: "/name", value: state.name },
          { op: "replace", path: "/clonality", value: state.clonality },
          {
            op: "replace",
            path: "/imageAnalysisRequest",
            value: { id: state.imageAnalysisRequestId },
          },
          {
            op: "replace",
            path: "/colony",
            value: selectedColony === null ? null : { id: selectedColony?.id },
          },
          {
            op: "replace",
            path: "/outline/color",
            value:
              addAlphaToHexCode(color, state.opacity) ?? DEFAULT_POLYGON_COLOR,
          },
        ],
        updateClusterId: cluster.id,
      },
    });
    const updatedClusterData = data?.updateCluster;
    //update the clusters data with the new data
    updateSelectedClusterData(
      updatedClusterData as Cluster,
      cluster as Cluster,
      selectedColony as Colony
    );
    setSubmitEnable(false);
    setIsWellAttributesChanged && setIsWellAttributesChanged(true);
  }, [
    selectedColony,
    cluster,
    state,
    updateCluster,
    updateSelectedClusterData,
    setIsWellAttributesChanged,
  ]);

  useEffect(() => {
    if (cluster?.colony?.id) {
      setSelectedColony(
        getColonyAssociatedWithCluster(colonies, cluster?.colony?.id)
      );
    } else {
      setSelectedColony(null);
    }
  }, [cluster?.colony?.id, colonies]);

  React.useEffect(() => {
    dispatch({
      type: ActionKind.UPDATE_NAME,
      payload: cluster?.name,
    });
    dispatch({
      type: ActionKind.UPDATE_CLONALITY,
      payload: cluster?.clonality!,
    });
    dispatch({
      type: ActionKind.UPDATE_COLOR,
      payload: clusterColor,
    });
    dispatch({
      type: ActionKind.UPDATE_OPACITY,
      payload: clusterOpacity,
    });
    dispatch({
      type: ActionKind.UPDATE_IMAGE_ANALYSIS_REQUEST,
      payload: cluster?.imageAnalysisRequest?.id,
    });
    setExpanded(expandedCluster);
  }, [cluster, clusterColor, clusterOpacity, expandedCluster]);

  const handleClusterCancel = React.useCallback(async () => {
    setOnSubmitClicked(false);
  }, []);
  const handleSubmitClicked = React.useCallback(async () => {
    setOnSubmitClicked(true);
  }, []);

  const handleOpacityChange = (event: Event, value: number | number[]) => {
    dispatch({
      type: ActionKind.UPDATE_OPACITY,
      payload: value as number,
    });
  };

  //to determine whether to enable or disable submit button based on attributes change
  //TODO: move this logic to a function and get the button disabled state

  const getButtonEnabledState = useCallback(() => {
    if (!state.imageAnalysisRequestId) {
      return false;
    } else if (!state.name) {
      return true;
    } else if (
      state.name !== cluster?.name ||
      state.color !== clusterColor ||
      state.opacity !== clusterOpacity ||
      selectedColony?.id !== cluster?.colony?.id ||
      state.imageAnalysisRequestId !== cluster?.imageAnalysisRequest?.id
    ) {
      return true;
    }
    return false;
  }, [cluster, clusterColor, clusterOpacity, selectedColony?.id, state]);

  useEffect(() => {
    const isButtonDisabled = getButtonEnabledState();
    setSubmitEnable(isButtonDisabled);
  }, [getButtonEnabledState]);

  return (
    <>
      <ClusterAccordion
        accordionName={cluster?.name ?? "-"}
        expanded={expanded}
        onNameChange={(arg: string) => {
          dispatch({ type: ActionKind.UPDATE_NAME, payload: arg });
        }}
        handleClonalityChange={(arg: string) => {
          dispatch({ type: ActionKind.UPDATE_CLONALITY, payload: arg });
        }}
        handleImageAnalysisRequestChange={(value: string) => {
          dispatch({
            type: ActionKind.UPDATE_IMAGE_ANALYSIS_REQUEST,
            payload: value,
          });
        }}
        handleAssociateColonyChange={(value: any) => {
          setSelectedColony(value);
        }}
        type={getClusterType(cluster?.type)}
        onSubmitClick={handleSubmitClicked}
        handleColorChange={(event: any) => {
          dispatch({
            type: ActionKind.UPDATE_COLOR,
            payload: event.target.value,
          });
        }}
        selectedColony={selectedColony}
        submitDisabled={!submitEnable}
        onExpandedChange={() => setExpanded((prevState) => !prevState)}
        colonies={colonies as colony[]}
        clusterData={state}
        clusterMetrics={clusterMetrics as ClusterMetrics[]}
        handleOpacityChange={handleOpacityChange}
      />
      {onSubmitClicked && (
        <CustomDiscardModal
          open={onSubmitClicked}
          handleCancel={handleClusterCancel}
          handleContinue={handleClusterContinue}
          heading={"Submit Changes?"}
          subText={
            "You have made changes to the attributes. Do you want to submit the changes?"
          }
        />
      )}
    </>
  );
}

export default ClusterAccordionWrapper;
