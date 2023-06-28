import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CustomTreeItem,
  StyledTreeItemRoot,
} from "../../organisms/LeftPanelImageViewer";
import CustomTreeItemLabel from "../CustomTreeItemLabel";
import {
  ScanObject,
  useScanObjectsLazyQuery,
} from "../../../generated/graphql";
import {
  scanObjectsByAnalysisIdVar,
  selectedScanObjectIndexVar,
  showScanObjectVar,
} from "../../../apollo/cache";
import { useReactiveVar } from "@apollo/client";
import { CustomTreeItemContent } from "../CustomTreeItemContent";

interface ScanObjectImageAnalysisProps {
  label: string;
  nodeId: string;
  color?: string;
  imageEventId: string;
  count: number;
  imageAnalysisRequestId: string;
}

const emptyScanObjects: ScanObject[] = [];

const ScanObjectImageAnalysis = ({
  label,
  nodeId,
  color,
  count,
  imageEventId,
  imageAnalysisRequestId,
}: ScanObjectImageAnalysisProps) => {
  const dataFetched = useRef(false);
  const [getScanObjects, { data, refetch }] = useScanObjectsLazyQuery();
  const showScanObject = useReactiveVar(showScanObjectVar);

  const [showObject, setShowObject] = useState(false);

  useEffect(() => {
    if (showScanObject) {
      setShowObject(true);
      showScanObjectVar(false);
    }
  }, [showScanObject]);

  useEffect(() => {
    if (!dataFetched.current && showObject) {
      getScanObjects({
        variables: { imageAnalysisRequestId, imageEventId },
      }).then(() => {
        dataFetched.current = true;
      });
    }
  }, [showObject, imageAnalysisRequestId, imageEventId, getScanObjects]);

  useEffect(() => {
    if (dataFetched.current) refetch();
  }, [count, refetch]);

  const handleExpansion = useCallback(
    (expanded: boolean) => {
      if (expanded) {
        getScanObjects({
          variables: { imageAnalysisRequestId, imageEventId },
        }).then(() => {
          dataFetched.current = true;
        });
      }
    },
    [getScanObjects, imageEventId, imageAnalysisRequestId]
  );

  const scanObjects = data?.scanObjects?.content ?? emptyScanObjects;

  useEffect(() => {
    const scanObjectsByAnalysisId = scanObjectsByAnalysisIdVar();
    if (scanObjects.length > 0 && showObject) {
      if (
        !scanObjectsByAnalysisId[imageAnalysisRequestId] ||
        (scanObjectsByAnalysisId[imageAnalysisRequestId]?.length ?? 0) !==
          scanObjects.length
      ) {
        const temp = { ...scanObjectsByAnalysisId };
        temp[imageAnalysisRequestId] = scanObjects as ScanObject[];
        scanObjectsByAnalysisIdVar(temp);
      }
    } else if (!showObject) {
      if (scanObjectsByAnalysisId[imageAnalysisRequestId]) {
        const temp = { ...scanObjectsByAnalysisId };
        delete temp[imageAnalysisRequestId];
        scanObjectsByAnalysisIdVar(temp);
      }
    }
  }, [imageAnalysisRequestId, scanObjects, showObject]);

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      label={
        <CustomTreeItemLabel
          label={label}
          showObject={showObject}
          showHideToggle={true}
          setShowObject={function (
            _event: React.MouseEvent<Element, MouseEvent>
          ) {
            if (showObject) selectedScanObjectIndexVar(-1);
            setShowObject((prevState) => !prevState);
          }}
        />
      }
      ContentProps={
        {
          color: color,
          handleFetchOnExpansion: handleExpansion,
        } as any
      }
      ContentComponent={CustomTreeItemContent}
    >
      {scanObjects.length === 0
        ? Array(count)
            .fill("")
            .map((value: string, index) => (
              <CustomTreeItem
                label={value}
                nodeId={`${nodeId}${index}`}
                key={index}
              />
            ))
        : scanObjects.map((scanObject) => (
            <CustomTreeItem
              label={scanObject?.name ?? ""}
              nodeId={`scan_object-${scanObject?.id!}`}
              key={scanObject?.id}
            />
          ))}
    </StyledTreeItemRoot>
  );
};

export default ScanObjectImageAnalysis;
