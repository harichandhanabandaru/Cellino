import React, { useCallback, useEffect, useRef } from "react";
import {
  CustomTreeItem,
  StyledTreeItemRoot,
} from "../../organisms/LeftPanelImageViewer";
import CustomTreeItemLabel from "../CustomTreeItemLabel";
import { Cluster, useClustersLazyQuery } from "../../../generated/graphql";
import {
  clustersByAnalysisRequestOrColonyQualityVar,
  loaderCountVar,
  selectedClusterIdVar,
} from "../../../apollo/cache";
import { useReactiveVar } from "@apollo/client";
import { CustomTreeItemContent } from "../CustomTreeItemContent";
import memoize from "memoize-one";

const priorityOrder = ["GOOD", "MEDIUM", "POOR", "UNKNOWN"];

export interface ClusterImageAnalysisProps {
  label: string;
  nodeId: string;
  color?: string;
  imageEventId: string;
  count: number;
  imageAnalysisRequestId: string;
}

const getClustersDivisionOnQuality = memoize((clusters: Cluster[]) => {
  let categorizedClusters: { [p: string]: Cluster[] } = {};
  clusters.forEach((cluster) => {
    if (categorizedClusters[cluster.quality!]) {
      const temp = categorizedClusters[cluster.quality!];
      categorizedClusters[cluster.quality!] = [...temp, cluster];
    } else {
      categorizedClusters[cluster.quality!] = [cluster];
    }
  });
  return categorizedClusters;
});

const emptyClusters: Cluster[] = [];

const DEFAULT_SIZE = 200;

export const ClusterByImageAnalysis = ({
  label,
  nodeId,
  color,
  imageEventId,
  imageAnalysisRequestId,
}: ClusterImageAnalysisProps) => {
  const dataFetched = useRef(false);
  const fetchingData = useRef(false);
  const [getClusters, { loading }] = useClustersLazyQuery({
    fetchPolicy: "network-only",
  });
  const clustersByAnalysisRequest = useReactiveVar(
    clustersByAnalysisRequestOrColonyQualityVar
  );

  const clusters =
    clustersByAnalysisRequest[imageAnalysisRequestId]?.clusters ??
    emptyClusters;
  const isVisible =
    clustersByAnalysisRequest[imageAnalysisRequestId]?.isVisible;
  const characterisedCluster = getClustersDivisionOnQuality(
    clusters as Cluster[]
  );
  const categories = Object.keys(characterisedCluster);
  categories.sort(
    (a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b)
  );

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!loading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (loading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [loading]);

  const getPaginatedClusters = useCallback(async () => {
    if (!dataFetched.current && !fetchingData.current) {
      const clustersByAnalysisRequest =
        clustersByAnalysisRequestOrColonyQualityVar();
      if (
        clustersByAnalysisRequest[imageAnalysisRequestId] &&
        (
          clustersByAnalysisRequest[imageAnalysisRequestId]?.clusters ??
          emptyClusters
        )?.length > 0
      ) {
        dataFetched.current = true;
        return;
      }
      fetchingData.current = true;
      let fetching = true;
      const temp: Cluster[] = [];
      let page = 1;
      while (fetching) {
        const { data } = await getClusters({
          variables: {
            imageAnalysisRequestId,
            imageEventId,
            page,
            size: DEFAULT_SIZE,
            freeClusters: true,
          },
        });
        const { Clusters } = data!;
        const content = Clusters?.content as Cluster[];
        const totalElement = Clusters?.pageInfo?.totalElements;
        temp.push(...content);
        if (totalElement === temp.length) {
          fetching = false;
        } else {
          page++;
        }
      }
      if (clustersByAnalysisRequest.hasOwnProperty(imageAnalysisRequestId)) {
        clustersByAnalysisRequestOrColonyQualityVar({
          ...clustersByAnalysisRequest,
          [imageAnalysisRequestId]: {
            ...clustersByAnalysisRequest[imageAnalysisRequestId],
            clusters: temp,
          },
        });
      } else {
        clustersByAnalysisRequestOrColonyQualityVar({
          ...clustersByAnalysisRequest,
          [imageAnalysisRequestId]: {
            isVisible: false,
            clusters: temp,
          },
        });
      }
      dataFetched.current = true;
      fetchingData.current = false;
    }
  }, [getClusters, imageAnalysisRequestId, imageEventId]);

  useEffect(() => {
    if (isVisible) getPaginatedClusters();
  }, [getPaginatedClusters, isVisible]);

  const handleExpansion = useCallback(
    (expanded: boolean) => {
      if (expanded) {
        getPaginatedClusters();
      }
    },
    [getPaginatedClusters]
  );

  const handleAnalysisShowObject = useCallback(() => {
    const clustersByAnalysisRequest =
      clustersByAnalysisRequestOrColonyQualityVar();
    if (clustersByAnalysisRequest.hasOwnProperty(imageAnalysisRequestId)) {
      clustersByAnalysisRequestOrColonyQualityVar({
        ...clustersByAnalysisRequest,
        [imageAnalysisRequestId]: {
          ...clustersByAnalysisRequest[imageAnalysisRequestId],
          isVisible:
            !clustersByAnalysisRequest[imageAnalysisRequestId].isVisible,
        },
      });
    } else {
      clustersByAnalysisRequestOrColonyQualityVar({
        ...clustersByAnalysisRequest,
        [imageAnalysisRequestId]: {
          isVisible: true,
        },
      });
    }
    selectedClusterIdVar("");
  }, [imageAnalysisRequestId]);

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      label={
        <CustomTreeItemLabel
          label={label}
          showObject={Boolean(isVisible)}
          showHideToggle={true}
          setShowObject={handleAnalysisShowObject}
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
      {clusters?.length === 0 ? (
        <div></div>
      ) : (
        categories.map((category) => {
          const clusters = characterisedCluster[category];
          return (
            <CustomTreeItem
              nodeId={`${category}-CLUSTER-${imageAnalysisRequestId}`}
              label={`${category
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase())} Quality (${
                clusters?.length
              })`}
              showHideToggle={false}
              key={`${category}-CLUSTER-${imageAnalysisRequestId}`}
            >
              {clusters?.map((cluster) => (
                <CustomTreeItem
                  key={`single-cluster-${cluster?.id}`}
                  nodeId={`single-cluster-${cluster?.id}`}
                  label={cluster?.name ?? ""}
                  color={cluster?.outline?.color.substring(0, 7)}
                />
              ))}
            </CustomTreeItem>
          );
        })
      )}
    </StyledTreeItemRoot>
  );
};

export default ClusterByImageAnalysis;
