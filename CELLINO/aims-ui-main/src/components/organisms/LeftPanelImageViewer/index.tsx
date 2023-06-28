// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemContentProps, useTreeItem } from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import { COLORS } from "../../../theme/Colors";
import BrightFieldControllerWrapper from "../BrightFieldControllerWrapper";
import { useReactiveVar } from "@apollo/client";
import {
  inferenceDataVar,
  selectedClusterIdVar,
  imageEventDataVar,
  imageEventIndexVar,
  showInferenceLayerVar,
} from "../../../apollo/cache";
import InferenceLayerControllerWrapper from "../InferenceLayerControllerWrapper";
import { useCallback } from "react";
import {
  InferenceLayer,
  ImageEventQuery,
  Plate,
  Well,
} from "../../../constants/types";
import CustomTreeItemLabel from "../../molecules/CustomTreeItemLabel";
import { treeItemClasses } from "@mui/lab/TreeItem";
import { styled } from "@mui/material/styles";
import ScanObjectImageAnalysis from "../../molecules/ScanObjectImageAnalysis";
import {
  ClusterMetrics,
  ScanObjectMetrics,
  ColonyMetrics,
  ImageEventsQuery,
} from "../../../generated/graphql";
import ClusterByImageAnalysis from "../../molecules/ClusterByImageAnalysis";
import ColonyByQuality from "../ColonyByQuality";
import { handleDownloadContextJsonFile } from "../../../utils/handleDownloadContextJsonFile";
import memoize from "memoize-one";
import { getchannelType } from "../../../utils/getChannelType";

interface CustomTreeItemProps {
  label: string;
  nodeId: string;
  color?: string;
  children?: React.ReactNode;
  showHideToggle?: boolean;
  showMoreIcon?: boolean;
  handleClick?: any;
  showObject?: boolean;
  setShowObject?: any;
  disableShowMoreIcon?: boolean;
}

export const StyledTreeItemRoot = styled(TreeItem)(() => ({
  [`& .${treeItemClasses.content}`]: {
    padding: 0,
    "&:hover": {
      backgroundColor: COLORS.GAMMA_BACKGROUND_01,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: COLORS.GAMMA_BACKGROUND_02,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
  },
}));

export const CustomTreeItem = ({
  label,
  nodeId,
  color,
  children,
  showHideToggle = false,
  showMoreIcon = false,
  handleClick,
  showObject = false,
  disableShowMoreIcon = false,
  setShowObject,
}: CustomTreeItemProps) => {
  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      label={
        <CustomTreeItemLabel
          label={label}
          showMoreIcon={showMoreIcon}
          showHideToggle={showHideToggle}
          showObject={showObject}
          setShowObject={() => setShowObject(nodeId)}
          handleMoreItemClick={handleClick}
          disableShowMoreIcon={disableShowMoreIcon}
        />
      }
      ContentComponent={CustomContent}
      ContentProps={{
        color: color,
      }}
      color={color}
    >
      {children}
    </StyledTreeItemRoot>
  );
};

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    color,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleSelection(event);
  };

  const marginRightValue = nodeId.match(/^c-.*$/)
    ? "24%"
    : nodeId.match(/^single-cluster-.*$/) || nodeId.includes("colony-cluster")
    ? "27%"
    : nodeId.includes(`CLUSTER`) || nodeId.includes("colony-associated")
    ? "18%"
    : "10px";

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      style={{
        paddingTop: "8px",
      }}
    >
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div
          css={{
            width: "3px",
            marginRight: marginRightValue,
            height: "40px",
            backgroundColor: color,
          }}
        />
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {label}
        </Typography>
      </div>
    </div>
  );
});

interface LeftPaneImageViewerProps {
  expanded?: string[];
  setExpanded?: Function;
  newPolygonData: any;
  baseLayerData: any;
  setBaseLayerData: Function;
  inferenceLayers: InferenceLayer[];
  imageEventData?: ImageEventQuery;
  imageEvents?: ImageEventsQuery;
  scanObjectMetrics: ScanObjectMetrics[];
  plate?: Plate | undefined;
  well?: Well;
  clusterMetrics: ClusterMetrics[];
  colonyMetrics: ColonyMetrics;
  imageEventIndex: number;
}

const getContextJson = memoize((plateData, wellData, imageEventData) => {
  return {
    context: {
      plate: {
        id: plateData.id,
        name: plateData.name,
        barcode: plateData.barcode,
      },
      well: {
        id: wellData?.id,
        position: wellData?.position,
      },
      imageEvent: {
        id: imageEventData?.id,
      },
    },
  };
});
interface ScanObjectClickedOnImageViewerEvent extends Event {
  detail: {
    id: string;
    imageAnalysisRequestId: string;
  };
}

interface ClusterClickedOnImageViewerEvent extends Event {
  detail: {
    id: string;
    imageAnalysisRequestId: string;
    colonyId: string;
  };
}

export default function LeftPaneImageViewer({
  expanded,
  setExpanded,
  newPolygonData,
  baseLayerData,
  setBaseLayerData,
  inferenceLayers,
  imageEventData,
  imageEvents,
  scanObjectMetrics,
  plate,
  well,
  clusterMetrics,
  colonyMetrics,
  imageEventIndex,
}: LeftPaneImageViewerProps) {
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded?.(nodeIds);
  };

  const selectedClusterByAnalysisId = useReactiveVar(selectedClusterIdVar);

  const parentRef = useRef<HTMLDivElement>(null);

  const [anchor, setAnchor] = React.useState<Element | null>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchor(event.currentTarget);
  };

  const [selectedNode, setSelectedNode] = React.useState<string | undefined>(
    undefined
  );

  const inferenceLayerData = useReactiveVar(inferenceDataVar);
  const imageEventReactVar = useReactiveVar(imageEventDataVar);
  const showInferenceLayer = useReactiveVar(showInferenceLayerVar);
  const [inferenceLayerAnchor, setInferenceLayerAnchor] =
    React.useState<Element | null>(null);
  const [inferenceIndex, setInferenceIndex] = React.useState<number>(0);

  useEffect(() => {
    if (newPolygonData) {
      setSelectedNode("new-object");
    }
  }, [newPolygonData]);

  const handleScanObjectClick = useCallback(
    (e: Event) => {
      const { detail } = e as ScanObjectClickedOnImageViewerEvent;
      const { id, imageAnalysisRequestId } = detail;
      const nodeId = `scan_object-${id}`;
      const expanded = ["scan-object", imageAnalysisRequestId];
      setSelectedNode(nodeId);
      setExpanded!(expanded);
    },
    [setExpanded]
  );

  useEffect(() => {
    if (selectedClusterByAnalysisId && parentRef?.current) {
      const isElementVisible = (el: Element, parent: Element) => {
        const rect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        return (
          rect.top >= parentRect.top &&
          rect.left >= parentRect.left &&
          rect.bottom <= parentRect.bottom &&
          rect.right <= parentRect.right
        );
      };
      const element = document.querySelector(
        `li[id*="${selectedClusterByAnalysisId}"]`
      );
      if (element && !isElementVisible(element, parentRef.current)) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 1000);
      }
    }
  }, [selectedClusterByAnalysisId]);

  const handleClusterClick = useCallback((e: Event) => {
    const { detail } = e as ClusterClickedOnImageViewerEvent;
    const { id, colonyId } = detail;
    const nodeId = colonyId ? `colony-cluster-${id}` : `single-cluster-${id}`;
    setSelectedNode(nodeId);
  }, []);

  useEffect(() => {
    document.addEventListener(
      "cluster-clicked-on-image-viewer",
      handleClusterClick
    );

    return () => {
      document.removeEventListener(
        "cluster-clicked-on-image-viewer",
        handleClusterClick
      );
    };
  }, [handleClusterClick]);

  useEffect(() => {
    document.addEventListener(
      "scan-object-clicked-on-image-viewer",
      handleScanObjectClick
    );

    return () => {
      document.removeEventListener(
        "scan-object-clicked-on-image-viewer",
        handleScanObjectClick
      );
    };
  }, [handleScanObjectClick]);

  const handleInferenceShowObject = useCallback((index: number) => {
    const temp = inferenceDataVar();
    temp[index] = { ...temp[index], on: !temp[index].on };
    const allHidden = temp.every((inference) => !inference.on);
    const someUnhidden = temp.some((inference) => inference.on);
    if (allHidden) {
      showInferenceLayerVar(false);
    } else if (someUnhidden) {
      showInferenceLayerVar(true);
    }
    inferenceDataVar([...temp]);
  }, []);

  const handleImageEventShowObject = useCallback((index: number) => {
    const temp = imageEventDataVar();
    imageEventIndexVar(
      !temp[index].on ? imageEventIndexVar(index) : imageEventIndexVar(-1)
    );
    temp[index] = { ...temp[index], on: !temp[index].on };
    imageEventDataVar([...temp]);
  }, []);

  useEffect(() => {
    if (!imageEventIndex || imageEventIndex === -1) {
      const index = imageEvents?.imageEvents?.findIndex(
        (ie) => ie?.id === imageEventData?.id
      );
      imageEventIndexVar(index);
    }
  }, [imageEventData?.id, imageEventIndex, imageEvents?.imageEvents]);

  const handleInferenceContextDownload = useCallback(() => {
    const artifactPath = inferenceLayers?.[inferenceIndex]?.artifactPath;
    const path = artifactPath && new URL(artifactPath?.blob_path as string);
    const blobPath = path?.pathname ? decodeURI(path.pathname.slice(1)) : "";
    const contextJson = getContextJson(plate, well, imageEventData);
    const updatedJson = {
      context: {
        ...contextJson?.context,
        artifactPath: {
          ...artifactPath,
          blob_path: blobPath,
        },
      },
    };
    handleDownloadContextJsonFile(updatedJson);
  }, [imageEventData, inferenceIndex, inferenceLayers, plate, well]);

  const handleBrightFieldContextDownload = useCallback(() => {
    const imageEvent = imageEvents?.imageEvents?.[imageEventIndex];
    const artifactPath = imageEvent?.artifactPath;
    const path = artifactPath && new URL(artifactPath?.blob_path as string);
    const blobPath = path?.pathname ? decodeURI(path.pathname.slice(1)) : "";
    const contextJson = getContextJson(plate, well, imageEvent);
    const updatedJson = {
      context: {
        ...contextJson?.context,
        artifactPath: {
          ...imageEventData?.artifactPath,
          blob_path: blobPath,
        },
      },
    };
    handleDownloadContextJsonFile(updatedJson);
  }, [
    imageEventData?.artifactPath,
    imageEventIndex,
    imageEvents?.imageEvents,
    plate,
    well,
  ]);

  return (
    <Paper
      elevation={10}
      data-testid={"LeftPaneImageViewer"}
      sx={{
        width: "252px",
        position: "relative",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
      ref={parentRef}
    >
      <div>
        <div
          css={{
            paddingLeft: "14%",
          }}
        >
          <Typography color={COLORS.BETA_TEXT_LOW_EMPHASIS} variant="caption1">
            Plate Name
          </Typography>
          <br />
          <Typography color={COLORS.BETA_TEXT_HIGH_EMPHASIS} variant="body5">
            {plate?.name ?? "Unknown"}
          </Typography>
        </div>
        <Divider />
      </div>
      <div css={{ position: "relative" }}>
        <div
          css={{
            position: "absolute",
            inset: 0,
            overflowY: "scroll",
          }}
        >
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={`${selectedNode}`}
            expanded={expanded}
            onNodeSelect={(_: React.SyntheticEvent, nodeIds: string) => {
              if (nodeIds.includes("scan_object")) {
                const event = new CustomEvent("scan-object-clicked", {
                  detail: { id: nodeIds.slice(12) },
                });
                document.dispatchEvent(event);
                setSelectedNode(nodeIds);
              }
              if (
                nodeIds.includes("single-cluster") ||
                nodeIds.includes("colony-cluster")
              ) {
                const event = new CustomEvent("cluster-clicked", {
                  detail: { id: nodeIds.slice(15) },
                });
                document.dispatchEvent(event);
                setSelectedNode(nodeIds);
              }
            }}
            onNodeToggle={handleToggle}
          >
            <CustomTreeItem
              nodeId={"scan-object"}
              label={`Scan Objects (${scanObjectMetrics?.length ?? 0})`}
              color={COLORS.ALPHA_PRIMARY_PURPLE}
            >
              {scanObjectMetrics?.map((scanObjectMetric) => {
                const analysisId = scanObjectMetric.imageAnalysisRequest?.id;
                const analysisName =
                  scanObjectMetric.imageAnalysisRequest?.name;
                const count = scanObjectMetric.count;
                return (
                  <ScanObjectImageAnalysis
                    key={`${analysisId}`}
                    nodeId={`${analysisId}`}
                    label={`${analysisName} (${count})`}
                    color={COLORS.ALPHA_PRIMARY_PURPLE}
                    imageEventId={imageEventData?.id!}
                    count={count}
                    imageAnalysisRequestId={analysisId}
                  />
                );
              })}
            </CustomTreeItem>
            <CustomTreeItem
              nodeId={"cluster"}
              label={`Clusters (${clusterMetrics?.length ?? 0})`}
              color={COLORS.ALPHA_PRIMARY_PURPLE}
            >
              {clusterMetrics?.map((clusterMetric) => {
                const analysisId = clusterMetric.imageAnalysisRequest?.id;
                const analysisName = clusterMetric.imageAnalysisRequest?.name;
                const count = clusterMetric.count;
                return (
                  <ClusterByImageAnalysis
                    key={`cluster-image-analysis-${analysisId}`}
                    nodeId={`cluster-image-analysis-${analysisId}`}
                    label={`${analysisName} (${count})`}
                    color={COLORS.ALPHA_PRIMARY_PURPLE}
                    imageEventId={imageEventData?.id!}
                    count={count}
                    imageAnalysisRequestId={analysisId}
                  />
                );
              })}
            </CustomTreeItem>
            <CustomTreeItem
              nodeId={"colony"}
              label={`Colonies`} // how should we get colonies length
              color={COLORS.ALPHA_PRIMARY_PURPLE}
            >
              {colonyMetrics?.colonyCountByQuality?.map((colonyMetric) => {
                const quality = colonyMetric?.quality as string;
                const count = colonyMetric?.count;
                return (
                  <ColonyByQuality
                    key={`${quality}_COLONY`}
                    nodeId={`${quality}_COLONY`}
                    label={`${quality
                      .toLowerCase()
                      .replace(/^\w/, (c) =>
                        c.toUpperCase()
                      )} Quality (${count})`}
                    imageEventId={colonyMetrics?.imageEventId ?? ""}
                    quality={quality}
                  />
                );
              })}
            </CustomTreeItem>
            {newPolygonData && (
              <CustomTreeItem
                nodeId={"new-object"}
                label={"New Object"}
                color={COLORS.BETA_SECONDARY_ACCENT_GREEN}
              />
            )}
            <CustomTreeItem
              nodeId={"findings"}
              label={"Findings (0)"}
              color={COLORS.BETA_SECONDARY_ACCENT_YELLOW}
            />
            <CustomTreeItem
              nodeId={"inference"}
              label={`Inference (${inferenceLayerData.length})`}
              color={COLORS.BETA_SECONDARY_GREY}
              showHideToggle={inferenceLayerData.length > 0}
              showObject={showInferenceLayer}
              setShowObject={() => {
                showInferenceLayerVar(!showInferenceLayer);
                const temp = inferenceDataVar();
                temp.map((inference) => (inference.on = !showInferenceLayer));
              }}
            >
              {inferenceLayerData.map((x, index) => (
                <CustomTreeItem
                  label={inferenceLayers?.[index]?.name ?? ``}
                  nodeId={`inference-layer-${index}`}
                  key={index}
                  showMoreIcon={true}
                  handleClick={(event: React.MouseEvent) => {
                    setInferenceLayerAnchor(event.currentTarget);
                    setInferenceIndex(index);
                  }}
                  showHideToggle={true}
                  showObject={inferenceLayerData[index].on}
                  setShowObject={() => handleInferenceShowObject(index)}
                />
              ))}
            </CustomTreeItem>
            {imageEvents?.imageEvents?.map((x, index) =>
              imageEvents?.imageEvents &&
              imageEvents?.imageEvents?.length > 1 &&
              x?.imageSetting?.channelType !== "BRT" ? (
                <CustomTreeItem
                  label={
                    x?.imageSetting?.channelType
                      ? getchannelType(x.imageSetting.channelType)
                      : ""
                  }
                  nodeId={`imaging-${index}`}
                  key={index}
                  color={COLORS.BETA_SECONDARY_ACCENT_RED}
                  showMoreIcon={true}
                  handleClick={(event: React.MouseEvent) => {
                    handleClick(event);
                    imageEventIndexVar(index);
                  }}
                  showHideToggle={true}
                  showObject={imageEventReactVar?.[index]?.on}
                  setShowObject={() => handleImageEventShowObject(index)}
                  disableShowMoreIcon={!baseLayerData}
                />
              ) : (
                <CustomTreeItem
                  nodeId={`imaging-${index}`}
                  key={index}
                  label={
                    x?.imageSetting?.channelType
                      ? getchannelType(x.imageSetting.channelType)
                      : ""
                  }
                  color={COLORS.BETA_SECONDARY_ACCENT_RED}
                  showMoreIcon={true}
                  handleClick={(event: React.MouseEvent) => {
                    handleClick(event);
                    imageEventIndexVar(index);
                  }}
                  disableShowMoreIcon={!baseLayerData}
                />
              )
            )}
          </TreeView>
        </div>
        <BrightFieldControllerWrapper
          baseLayerData={baseLayerData}
          setLayerData={setBaseLayerData}
          setAnchor={setAnchor}
          anchor={anchor}
          zArray={
            imageEvents?.imageEvents?.[imageEventIndex]?.imageSetting?.zarray ??
            []
          }
          handleDownloadContextJson={handleBrightFieldContextDownload}
          index={imageEventIndex}
        />
        <InferenceLayerControllerWrapper
          setAnchor={setInferenceLayerAnchor}
          anchor={inferenceLayerAnchor}
          index={inferenceIndex}
          handleDownloadContextJson={handleInferenceContextDownload}
        />
      </div>
    </Paper>
  );
}
