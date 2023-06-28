import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditableGeoJsonLayer, ModifyMode } from "nebula.gl";
import { ViewState } from "../components/organisms/ZarrImageViewer";
import fitBounds from "../components/organisms/ZarrImageViewer/utils/fitBounds";
import hexToRGB from "../utils/hexToRGB";
import { Cluster, useUpdateClusterOutlineMutation } from "../generated/graphql";
import debounce from "lodash.debounce";
import getPolygonPoints from "../utils/getPolygonPoints";
import {
  clustersByAnalysisRequestOrColonyQualityVar,
  loaderCountVar,
  selectedClusterIdVar,
} from "../apollo/cache";
import memoize from "memoize-one";
import { useReactiveVar } from "@apollo/client";
import { createPolygonPoints } from "../utils/createPolygonPoints";
import { getAlphaFromHexCode } from "../utils/getColorWithOpacity";

interface coordinates {
  x: number;
  y: number;
}

export interface CustomClusterEvent extends Event {
  detail: {
    id: string;
  };
}

interface Attributes {
  circularity: number;
  area: number;
}

interface Outline {
  exterior: coordinates[];
  interiors: Array<coordinates[]>;
  color: string;
  center?: coordinates;
  boundingBox?: {
    xmin: number;
    xmax: number;
    ymax: number;
    ymin: number;
  };
  opacity: number;
}

export interface cluster {
  id: string;
  name?: string;
  nameId?: string;
  parents?: number[];
  clonality: string;
  quality: string;
  imageEvent: { id: string };
  attributes: Attributes;
  outline: Outline;
  colony: { id: string; outline: object };
  type?: string;
  imageAnalysisRequest: { id: string; name: string };
}

interface features {
  type: string;
  features: Array<any>;
}

const prepareClustersForRendering = memoize(
  (clustersByAnalysisId: {
    [p: string]: { clusters?: Cluster[]; isVisible: Boolean };
  }) => {
    const clusters: Cluster[] = [];
    for (const imageAnalysisRequestId of Object.keys(clustersByAnalysisId)) {
      const temp = clustersByAnalysisId[imageAnalysisRequestId];
      if (temp.isVisible && temp.clusters && temp.clusters.length > 0) {
        clusters.push(...temp.clusters);
      }
    }
    return clusters;
  }
);

const getClusterIndex = memoize((clusters, selectedClusterId) => {
  return clusters.findIndex(
    (cluster: { id: string }) => cluster.id === selectedClusterId
  );
});

function usePolygonLayer(
  setViewState: Function,
  deckRef: any,
  setIsWellAttributesChanged?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const clustersByAnalysisId = useReactiveVar(
    clustersByAnalysisRequestOrColonyQualityVar
  );
  const selectedClusterId = useReactiveVar(selectedClusterIdVar);

  const clustersTemp = prepareClustersForRendering(clustersByAnalysisId);

  const [features, setFeatures] = useState<features>({
    type: "FeatureCollection",
    features: [],
  });
  const [selectedFeatureIndexes, setSelectedFeatureIndex] = useState<
    Array<number>
  >([]);
  const [layer, setLayer] = useState<EditableGeoJsonLayer | null>(null);

  const [updateClusterOutline, { loading }] = useUpdateClusterOutlineMutation();

  const handleUpdateCluster = useCallback(
    async (requiredClusterData: any) => {
      const imageEventId = requiredClusterData.imageEventId;
      const externalPolygon = requiredClusterData?.geometry?.coordinates?.[0];
      const internalPolygon =
        requiredClusterData?.geometry?.coordinates?.slice(1);

      const interiors = internalPolygon?.map((polygon: number[][]) =>
        getPolygonPoints(polygon)
      );
      const exterior = getPolygonPoints(externalPolygon);
      //handle editing type if the cluster is a system generated one
      await updateClusterOutline({
        variables: {
          id: requiredClusterData?.id,
          imageEventId,
          exterior,
          interiors,
        },
      });
      setIsWellAttributesChanged && setIsWellAttributesChanged(true);
    },
    [setIsWellAttributesChanged, updateClusterOutline]
  );

  const debouncedHandler = useMemo(
    () => debounce(handleUpdateCluster, 2000),
    [handleUpdateCluster]
  );

  useEffect(() => {
    const count = loaderCountVar().count;
    if (!loading && count > 0) {
      loaderCountVar({ count: count - 1 });
    } else if (loading) {
      loaderCountVar({ count: count + 1 });
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      debouncedHandler.cancel();
    };
  }, [debouncedHandler]);

  useEffect(() => {
    if (selectedClusterId && clustersTemp) {
      const index = getClusterIndex(clustersTemp, selectedClusterId);
      if (index >= 0) {
        setSelectedFeatureIndex([index]);
      }
    } else {
      setSelectedFeatureIndex([]);
    }
  }, [selectedClusterId, clustersTemp]);

  useEffect(() => {
    if (clustersTemp?.length > 0) {
      const temp = clustersTemp.map((cluster) => {
        const coords = [];
        let polygon = createPolygonPoints(cluster?.outline?.exterior);
        coords.push(polygon);
        const interiors = cluster?.outline?.interiors ?? [];
        interiors.forEach((p: coordinates[]) => {
          const pol = createPolygonPoints(p);
          coords.push(pol);
        });
        const color = cluster?.outline?.color?.substring(0, 7);
        const opacity = getAlphaFromHexCode(cluster?.outline?.color ?? "");
        return {
          type: "Feature",
          id: cluster?.id,
          objectType: "cluster",
          colonyId: cluster?.colony?.id,
          imageEventId: cluster.imageEvent?.id,
          imageAnalysisRequestId: cluster?.imageAnalysisRequest?.id,
          quality: cluster?.quality,
          clusterType: cluster?.type,
          properties: {
            stroke: color,
            "stroke-width": 4,
            "stroke-opacity": 0.5,
            fill: color,
            "fill-opacity": opacity,
          },
          geometry: {
            type: "Polygon",
            coordinates: coords,
          },
        };
      });
      setSelectedFeatureIndex([]);
      setFeatures((prevState: any) => {
        return {
          ...prevState,
          features: temp,
        };
      });
    } else {
      setFeatures({
        type: "FeatureCollection",
        features: [],
      });
    }
  }, [clustersTemp]);

  useEffect(() => {
    const polygonLayer = new EditableGeoJsonLayer({
      id: "geojson-layer",
      data: features,
      mode: ModifyMode,
      selectedFeatureIndexes,
      getFillColor: (feature: any) => {
        return hexToRGB(
          feature?.properties?.fill,
          feature?.properties["fill-opacity"]
        );
      },
      getLineColor: (feature: any) => {
        return hexToRGB(
          feature?.properties?.stroke,
          feature?.properties["stroke-opacity"]
        );
      },
      getEditHandlePointColor: () => {
        const color = "#ffffff";
        return hexToRGB(color, 1);
      },
      getLineWidth: (f: any) => {
        return f.properties["stroke-width"];
      },
      onEdit: ({
        updatedData,
        editType,
        editContext,
      }: {
        updatedData: any;
        editType: string;
        editContext: any;
      }) => {
        /* istanbul ignore next */
        setFeatures(updatedData);
        if (
          editType === "finishMovePosition" ||
          "addPosition" ||
          "removePosition"
        ) {
          const index = editContext.featureIndexes?.[0];
          const requiredData = updatedData.features[index];
          debouncedHandler(requiredData);
        }
      },
    });
    setLayer(polygonLayer);
  }, [selectedFeatureIndexes, features, debouncedHandler]);

  useEffect(() => {
    if (selectedFeatureIndexes.length > -1) {
      const cluster = clustersTemp?.[selectedFeatureIndexes[0]];
      if (cluster) {
        const boundingBox = cluster.outline.boundingBox;
        const { height, width } = deckRef.current!.deck!;
        const currentWidth = boundingBox?.xmax - boundingBox?.xmin;
        const currentHeight = boundingBox?.ymax - boundingBox?.ymin;
        const computedLength = Math.max(currentHeight, currentWidth);
        const { zoom } = fitBounds(
          [2 * computedLength, 2 * computedLength],
          [width, height],
          Infinity,
          0
        );
        const x = (boundingBox?.xmin + boundingBox?.xmax) / 2;
        const y = (boundingBox?.ymin + boundingBox?.ymax) / 2;
        setViewState((prevState: ViewState) => ({
          ...prevState,
          target: [x, y],
          zoom,
        }));
      }
    }
  }, [deckRef, clustersTemp, selectedFeatureIndexes, setViewState]);

  const handleClusterClick = useCallback((e: Event) => {
    const { detail } = e as CustomClusterEvent;
    const { id } = detail;
    selectedClusterIdVar(id);
  }, []);

  useEffect(() => {
    document.addEventListener("cluster-clicked", handleClusterClick);

    return () => {
      document.removeEventListener("cluster-clicked", handleClusterClick);
    };
  }, [handleClusterClick]);

  return { layer, setSelectedFeatureIndex };
}

export default usePolygonLayer;
