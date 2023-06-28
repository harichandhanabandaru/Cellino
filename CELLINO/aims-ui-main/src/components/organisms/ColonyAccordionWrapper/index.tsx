import { useCallback, useEffect, useReducer, useState } from "react";
import ColonyAccordion from "../../molecules/ColonyAccordion";
import ClusterAccordionWrapper from "../ClusterAccordionWrapper";
import { colony } from "../../../constants/types";
import React from "react";
import {
  useUpdateColonyMutation,
  useUpdateClusterMutation,
  Cluster,
  Colony,
  ClusterMetrics,
} from "../../../generated/graphql";
import CustomDiscardModal from "../../molecules/CustomDiscardModal";
import {
  clustersByAnalysisRequestOrColonyQualityVar,
  coloniesByQualityVar,
  loaderCountVar,
} from "../../../apollo/cache";
import {
  addAlphaToHexCode,
  getAlphaFromHexCode,
} from "../../../utils/getColorWithOpacity";
import { DEFAULT_OPACITY, DEFAULT_POLYGON_COLOR } from "../../../constants";
import { COLORS } from "../../../theme/Colors";

export interface ColonyAccordionState {
  clonality: string;
  name: string;
  isSelected: boolean;
  color: string;
  opacity: number;
}

enum ActionKind {
  UPDATE_NAME = "UPDATE_NAME",
  UPDATE_CLONALITY = "UPDATE_CLONALITY",
  UPDATE_IS_SELECTED = "UPDATE_IS_SELECTED",
  UPDATE_COLOR = "UPDATE_COLOR",
  UPDATE_OPACITY = "UPDATE_OPACITY",
}

const CHANGE_ATTRIBUTE_MESSAGE =
  "You have made changes to the attributes. Do you want to submit the changes?";
const CHANGE_COLOR_MESSAGE =
  "Changing the color/opacity of the colony will apply the same setting to underlying clusters.Do you want to continue?";

type Action = {
  type: ActionKind;
  payload?: string | boolean | number;
};

function reducer(
  state: ColonyAccordionState,
  action: Action
): ColonyAccordionState {
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
    case ActionKind.UPDATE_IS_SELECTED: {
      return {
        ...state,
        isSelected: action.payload === "true" || action.payload === true,
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
    default: {
      return state;
    }
  }
}

const getColonyType = (type: string | null | undefined) => {
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

const getColonyColor = (colony: colony) => {
  if (colony?.isSelected) {
    return COLORS.BETA_SECONDARY_ACCENT_GREEN;
  } else {
    return colony?.outline?.color
      ? colony?.outline?.color.substring(0, 7)
      : DEFAULT_POLYGON_COLOR;
  }
};
function createInitialState(colonyAssociatedWithCluster: colony) {
  return {
    name: colonyAssociatedWithCluster?.name ?? "name",
    clonality: "UNKNOWN",
    isSelected: colonyAssociatedWithCluster?.isSelected,
    color: getColonyColor(colonyAssociatedWithCluster),
    opacity: colonyAssociatedWithCluster?.isSelected
      ? DEFAULT_OPACITY
      : getAlphaFromHexCode(colonyAssociatedWithCluster?.outline?.color),
  };
}

const colonyRelatedClusters = (
  colonyClusters: Cluster[],
  selectedClusterId: string | undefined,
  selectedImageEventId: string | null,
  clusterMetrics: ClusterMetrics[],
  setIsWellAttributesChanged?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let colonyClustersList = [];
  for (let i = 0; i < colonyClusters.length; i++) {
    let expandedCluster = false;
    if (colonyClusters[i].id === selectedClusterId) {
      expandedCluster = true;
    }
    colonyClustersList.push(
      <ClusterAccordionWrapper
        key={i}
        cluster={colonyClusters[i]}
        expandedCluster={expandedCluster}
        setIsWellAttributesChanged={setIsWellAttributesChanged}
        selectedImageEventId={selectedImageEventId}
        clusterMetrics={clusterMetrics}
      />
    );
  }
  return colonyClustersList;
};

function ColonyAccordionWrapper({
  colonyAssociatedWithCluster,
  selectedClusterId,
  selectedImageEventId,
  setIsWellAttributesChanged,
  clusterMetrics,
}: {
  colonyAssociatedWithCluster: colony;
  selectedClusterId: string | undefined;
  selectedImageEventId: string | null;
  setIsWellAttributesChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  clusterMetrics: ClusterMetrics[];
}) {
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(colonyAssociatedWithCluster!)
  );
  const [expanded, setExpanded] = useState(true);
  const [onSubmitClicked, setOnSubmitClicked] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false);

  //Queries
  const [updateColony, { loading: colonyLoading }] = useUpdateColonyMutation({
    notifyOnNetworkStatusChange: true,
  });
  const [updateCluster, { loading: clusterLoading }] = useUpdateClusterMutation(
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const color = colonyAssociatedWithCluster?.outline?.color
    ? colonyAssociatedWithCluster?.outline?.color.substring(0, 7)
    : DEFAULT_POLYGON_COLOR;
  const opacity = getAlphaFromHexCode(
    colonyAssociatedWithCluster?.outline?.color
  );

  let colonyClonality = "";
  //get the clusters associated with a colony and determine colony clonality based on clusters clonality
  const colonyClustersFunction = (colonyId: string) => {
    const clustersByColonyQuality =
      clustersByAnalysisRequestOrColonyQualityVar();
    const quality = colonyAssociatedWithCluster?.quality ?? "";
    const colonyClusters: Cluster[] = [];
    const clusterClonality: string[] = [];
    if (
      clustersByColonyQuality.hasOwnProperty(quality) &&
      clustersByColonyQuality[quality]?.clusters &&
      Array.isArray(clustersByColonyQuality[quality].clusters)
    ) {
      const tempClusters = [...clustersByColonyQuality[quality].clusters!];
      tempClusters?.forEach((cluster: Cluster) => {
        if (cluster.colony?.id === colonyId) {
          clusterClonality.push(cluster?.clonality!);
          colonyClusters.push(cluster);
        }
      });
    }

    if (clusterClonality.includes("UNKNOWN")) {
      colonyClonality = "UNKNOWN";
    } else if (clusterClonality.includes("POLYCLONAL")) {
      colonyClonality = "POLYCLONAL";
    } else {
      colonyClonality = "MONOCLONAL";
    }

    return colonyClusters;
  };

  const colonyClusters = colonyClustersFunction(
    colonyAssociatedWithCluster?.id
  );

  useEffect(() => {
    dispatch({
      type: ActionKind.UPDATE_NAME,
      payload: createInitialState(colonyAssociatedWithCluster).name,
    });
    dispatch({
      type: ActionKind.UPDATE_IS_SELECTED,
      payload: createInitialState(colonyAssociatedWithCluster).isSelected,
    });
    dispatch({
      type: ActionKind.UPDATE_COLOR,
      payload: createInitialState(colonyAssociatedWithCluster).color,
    });
    dispatch({
      type: ActionKind.UPDATE_OPACITY,
      payload: createInitialState(colonyAssociatedWithCluster).opacity,
    });
    dispatch({
      type: ActionKind.UPDATE_CLONALITY,
      payload: colonyClonality,
    });
  }, [colonyAssociatedWithCluster, colonyClonality]);

  //set loading state when data is being fetched
  useEffect(() => {
    const count = loaderCountVar().count;
    if (!colonyLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (colonyLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [colonyLoading]);

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!clusterLoading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (clusterLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [clusterLoading]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //TODO: Needs to be implemented in backend to update clusters clonality when colony clonality changes
  const clusterClonalityUpdate = React.useCallback(
    async (colonyClusters: Cluster[]) => {
      for (let i = 0; i < colonyClusters.length; i++) {
        updateCluster({
          variables: {
            ops: [
              { op: "replace", path: "/clonality", value: state.clonality },
            ],
            updateClusterId: colonyClusters[i].id,
          },
        });
      }
    },
    [state.clonality, updateCluster]
  );

  //Handlers
  const handleSubmitClicked = React.useCallback(async () => {
    setOnSubmitClicked(true);
  }, []);

  const handleColonyCancel = React.useCallback(async () => {
    setOnSubmitClicked(false);
  }, []);

  const handleColorOpacityChange = (event: Event, value: number | number[]) => {
    dispatch({
      type: ActionKind.UPDATE_OPACITY,
      payload: value as number,
    });
  };

  const updateColonyDataByQuality = useCallback((colony: Colony) => {
    const coloniesByQuality = coloniesByQualityVar();
    const quality = colony.quality as string;
    if (
      coloniesByQuality.hasOwnProperty(quality) &&
      Array.isArray(coloniesByQuality[quality])
    ) {
      const colonies = [...coloniesByQuality[quality]];
      const index = colonies.findIndex((x) => x.id === colony.id);
      colonies[index] = colony;
      coloniesByQualityVar({ ...coloniesByQuality, [quality]: colonies });
    }
  }, []);

  const updateClustersColor = useCallback((colony: Colony) => {
    const clustersByColonyQuality =
      clustersByAnalysisRequestOrColonyQualityVar();
    const quality = colony.quality as string;
    if (
      clustersByColonyQuality.hasOwnProperty(quality) &&
      clustersByColonyQuality[quality]?.clusters &&
      Array.isArray(clustersByColonyQuality[quality].clusters)
    ) {
      const clusters = [...clustersByColonyQuality[quality].clusters!];
      clusters.forEach((cluster) => {
        if (cluster?.colony?.id === colony.id)
          cluster.outline = {
            ...cluster.outline,
            color: colony?.outline?.color,
          };
      });
      clustersByAnalysisRequestOrColonyQualityVar({
        ...clustersByColonyQuality,
        [quality]: { ...clustersByColonyQuality[quality], clusters },
      });
    }
  }, []);

  const handleColonyContinue = React.useCallback(async () => {
    setOnSubmitClicked(false);
    const { data } = await updateColony({
      variables: {
        ops: [
          {
            op: "replace",
            path: "/isSelected",
            value: state.isSelected,
          },
          {
            op: "replace",
            path: "/name",
            value: state.name,
          },
          {
            op: "replace",
            path: "/outline/color",
            value: addAlphaToHexCode(state.color, state.opacity), //convert color with opacity to 8 digit hex code
          },
        ],
        updateColonyId: colonyAssociatedWithCluster?.id,
      },
    });
    const updatedColony = data?.updateColony;
    if (state.clonality !== colonyClonality) {
      clusterClonalityUpdate(colonyClusters);
    }
    updateColonyDataByQuality(updatedColony as Colony);
    if (state.color !== color || state.opacity !== opacity) {
      updateClustersColor(updatedColony as Colony);
    }
    setSubmitEnable(false);
    setIsWellAttributesChanged && setIsWellAttributesChanged(true);
  }, [
    clusterClonalityUpdate,
    colonyAssociatedWithCluster,
    colonyClonality,
    colonyClusters,
    color,
    opacity,
    state,
    updateColony,
    setIsWellAttributesChanged,
    updateColonyDataByQuality,
    updateClustersColor,
  ]);

  //to determine whether to enable or disable submit button when attribute value changes
  useEffect(() => {
    if (
      (state.name === colonyAssociatedWithCluster.name &&
        state.color === color &&
        state.opacity === opacity &&
        state.isSelected === colonyAssociatedWithCluster.isSelected &&
        state.clonality === colonyClonality) ||
      state.name === ""
    ) {
      setSubmitEnable(false);
    } else {
      setSubmitEnable(true);
    }
  }, [state, colonyAssociatedWithCluster, colonyClonality, opacity, color]);

  return (
    <>
      <ColonyAccordion
        expanded={expanded}
        colonyData={state}
        onNameChange={(arg: string) => {
          dispatch({ type: ActionKind.UPDATE_NAME, payload: arg });
        }}
        type={getColonyType(colonyAssociatedWithCluster.type)}
        noOfClusters={`${colonyClusters.length}`}
        onSubmitClick={handleSubmitClicked}
        handleClonalityChange={(arg: string) => {
          dispatch({ type: ActionKind.UPDATE_CLONALITY, payload: arg });
        }}
        handleIsSelectedChange={(arg: string) => {
          dispatch({ type: ActionKind.UPDATE_IS_SELECTED, payload: arg });
        }}
        handleOpacityChange={handleColorOpacityChange}
        handleColorChange={(event: any) => {
          dispatch({
            type: ActionKind.UPDATE_COLOR,
            payload: event.target.value,
          });
        }}
        submitDisabled={!submitEnable}
        onExpandedChange={() => setExpanded((prevState) => !prevState)}
      />
      {colonyClusters?.length > 0 &&
        colonyRelatedClusters(
          colonyClusters,
          selectedClusterId,
          selectedImageEventId,
          clusterMetrics,
          setIsWellAttributesChanged
        )}
      {onSubmitClicked && (
        <CustomDiscardModal
          open={onSubmitClicked}
          handleCancel={handleColonyCancel}
          handleContinue={handleColonyContinue}
          heading={"Submit Changes?"}
          subText={
            state.color !== color || state.opacity !== opacity
              ? CHANGE_COLOR_MESSAGE
              : CHANGE_ATTRIBUTE_MESSAGE
          }
        />
      )}
    </>
  );
}

export default ColonyAccordionWrapper;
