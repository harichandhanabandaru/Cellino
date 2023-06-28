import React, { useCallback, useEffect, useRef } from "react";
import {
  Cluster,
  Colony,
  useClustersLazyQuery,
  useTempColoniesLazyQuery,
} from "../../../generated/graphql";
import { CustomTreeItemContent } from "../../molecules/CustomTreeItemContent";
import CustomTreeItemLabel from "../../molecules/CustomTreeItemLabel";
import { StyledTreeItemRoot, CustomTreeItem } from "../LeftPanelImageViewer";
import memoize from "memoize-one";
import {
  clustersByAnalysisRequestOrColonyQualityVar,
  coloniesByQualityVar,
  loaderCountVar,
  selectedClusterIdVar,
} from "../../../apollo/cache";
import { useReactiveVar } from "@apollo/client";

interface ColonyByQualityProps {
  nodeId: string;
  imageEventId: string;
  label: string;
  quality: string; // give proper type
}

const DEFAULT_SIZE = 50;

const groupClustersUnderColonies = memoize((clusters: Cluster[]) => {
  const clusterColonyAssociation: { [p: string]: Cluster[] } = {};
  clusters.forEach((cluster: any) => {
    if (clusterColonyAssociation[cluster?.colony?.id]) {
      clusterColonyAssociation[cluster?.colony?.id].push(cluster);
    } else {
      clusterColonyAssociation[cluster?.colony?.id] = [cluster];
    }
  });
  return clusterColonyAssociation;
});

const emptyClusters: Cluster[] = [];
const emptyColonies: Colony[] = [];

const ColonyByQuality = ({
  nodeId,
  imageEventId,
  label,
  quality,
}: ColonyByQualityProps) => {
  const dataFetched = useRef(false);
  const fetchingData = useRef(false);

  const clustersByColonyQuality = useReactiveVar(
    clustersByAnalysisRequestOrColonyQualityVar
  );

  const clusters = clustersByColonyQuality[quality]?.clusters ?? emptyClusters;
  const isVisible = clustersByColonyQuality[quality]?.isVisible;

  const coloniesByQuality = useReactiveVar(coloniesByQualityVar);
  const colonies = coloniesByQuality[quality] ?? emptyColonies;

  const [getColonies, { loading }] = useTempColoniesLazyQuery();
  const [getClusters, { loading: clustersLoading }] = useClustersLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const count = loaderCountVar().count;
    if ((!clustersLoading || !loading) && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (clustersLoading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [clustersLoading, loading]);

  const getColoniesAndClusters = useCallback(async () => {
    if (!dataFetched.current && !fetchingData.current) {
      const coloniesByQuality = coloniesByQualityVar();
      let colonies: Colony[];
      if (
        coloniesByQuality[quality] &&
        Array.isArray(coloniesByQuality[quality])
      ) {
        colonies = coloniesByQuality[quality];
      } else {
        const { data } = await getColonies({
          variables: {
            imageEventId,
            // @ts-ignore
            quality,
          },
        });
        colonies = data?.Colonies as Colony[];
        coloniesByQualityVar({ ...coloniesByQuality, [quality]: colonies });
      }
      const clustersByColonyQuality =
        clustersByAnalysisRequestOrColonyQualityVar();
      const temp = clustersByColonyQuality[quality];
      if (temp && temp.clusters && Array.isArray(temp.clusters)) {
        dataFetched.current = true;
        fetchingData.current = false;
        return;
      } else {
        const colonyIds = colonies.map((x) => x.id!);
        let fetching = true;
        const clusters: Cluster[] = [];
        let page = 1;
        while (fetching) {
          const { data } = await getClusters({
            variables: {
              colonyIds: colonyIds,
              imageEventId,
              page,
              size: DEFAULT_SIZE,
            },
          });
          const { Clusters } = data!;
          const content = Clusters?.content as Cluster[];
          const totalElement = Clusters?.pageInfo?.totalElements;
          clusters.push(...content);
          if (totalElement === clusters.length) {
            fetching = false;
          } else {
            page++;
          }
        }
        if (temp) {
          clustersByAnalysisRequestOrColonyQualityVar({
            ...clustersByColonyQuality,
            [quality]: { ...temp, clusters },
          });
        } else {
          clustersByAnalysisRequestOrColonyQualityVar({
            ...clustersByColonyQuality,
            [quality]: { isVisible: false, clusters },
          });
        }
      }
      dataFetched.current = true;
      fetchingData.current = false;
    }
  }, [quality, getColonies, imageEventId, getClusters]);

  useEffect(() => {
    if (isVisible) {
      getColoniesAndClusters();
    }
  }, [isVisible, getColoniesAndClusters]);

  const handleShowObject = useCallback(() => {
    const clustersByColonyQuality =
      clustersByAnalysisRequestOrColonyQualityVar();
    if (clustersByColonyQuality.hasOwnProperty(quality)) {
      clustersByAnalysisRequestOrColonyQualityVar({
        ...clustersByColonyQuality,
        [quality]: {
          ...clustersByColonyQuality[quality],
          isVisible: !clustersByColonyQuality[quality].isVisible,
        },
      });
    } else {
      clustersByAnalysisRequestOrColonyQualityVar({
        ...clustersByColonyQuality,
        [quality]: {
          isVisible: true,
        },
      });
    }
    selectedClusterIdVar("");
  }, [quality]);

  const handleExpansion = useCallback(
    (expanded: boolean) => {
      if (expanded) {
        getColoniesAndClusters();
      }
    },
    [getColoniesAndClusters]
  );

  const groupedCluster = groupClustersUnderColonies(clusters);

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      label={
        <CustomTreeItemLabel
          label={label}
          showObject={Boolean(isVisible)}
          showHideToggle={true}
          setShowObject={() => handleShowObject()}
        />
      }
      ContentProps={
        {
          handleFetchOnExpansion: handleExpansion,
        } as any
      }
      ContentComponent={CustomTreeItemContent}
    >
      {!(colonies.length > 0) ? (
        <div></div>
      ) : (
        colonies.map((colony: any) => {
          const clusters = groupedCluster[colony?.id] ?? [];
          return (
            <CustomTreeItem
              key={`colony-associated-${colony.id}`}
              nodeId={`colony-associated-${colony.id}`}
              label={`${colony.name} (${clusters.length})`}
              color={colony.outline.color}
            >
              {clusters.map((cluster: any) => (
                <CustomTreeItem
                  key={`colony-cluster-${cluster.id}`}
                  nodeId={`colony-cluster-${cluster.id}`}
                  label={cluster.name}
                  color={cluster.color}
                />
              ))}
            </CustomTreeItem>
          );
        })
      )}
    </StyledTreeItemRoot>
  );
};

export default ColonyByQuality;
