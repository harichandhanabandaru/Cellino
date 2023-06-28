import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditableGeoJsonLayer, ModifyMode } from "nebula.gl";
import hexToRGB from "../utils/hexToRGB";
import { coordinates, ScanObjectsByAnalysisId } from "../constants/types";
import { createPolygonPoints } from "../utils/createPolygonPoints";
import memoize from "memoize-one";
import { ScanObject, useUpdateScanObjectMutation } from "../generated/graphql";
import {
  loaderCountVar,
  scanObjectsByAnalysisIdVar,
  selectedScanObjectIndexVar,
} from "../apollo/cache";
import { useReactiveVar } from "@apollo/client";
import { getAlphaFromHexCode } from "../utils/getColorWithOpacity";
import fitBounds from "../components/organisms/ZarrImageViewer/utils/fitBounds";
import { ViewState } from "../components/organisms/ZarrImageViewer";
import { DeckGLRef } from "@deck.gl/react/typed";
import debounce from "lodash.debounce";
import getPolygonPoints from "../utils/getPolygonPoints";

export interface CustomScanObjectEvent extends Event {
  detail: {
    id: string;
  };
}

interface features {
  type: string;
  features: Array<any>;
}

const prepareScanObjectsForRendering = memoize(
  (scanObjectsByAnalysisId: ScanObjectsByAnalysisId) => {
    const scanObjects: ScanObject[] = [];
    for (let value of Object.values(scanObjectsByAnalysisId)) {
      scanObjects.push(...value);
    }
    return scanObjects;
  }
);

function useScanObjectLayer(
  deckRef: React.MutableRefObject<DeckGLRef | null>,
  setViewState: (
    value:
      | ((prevState: Record<string, any>) => Record<string, any>)
      | Record<string, any>
  ) => void
) {
  const scanObjectsByAnalysisId = useReactiveVar(scanObjectsByAnalysisIdVar);
  const selectedScanObjectIndex = useReactiveVar(selectedScanObjectIndexVar);
  const scanObjects = prepareScanObjectsForRendering(scanObjectsByAnalysisId);
  const [features, setFeatures] = useState<features>({
    type: "FeatureCollection",
    features: [],
  });
  const [selectedFeatureIndexes, setSelectedFeatureIndex] = useState<
    Array<number>
  >([]);
  const [layer, setLayer] = useState<EditableGeoJsonLayer | null>(null);
  const [updateScanObject] = useUpdateScanObjectMutation();

  const handleUpdate = useCallback(
    async (feature: any) => {
      try {
        const count = loaderCountVar().count;
        loaderCountVar({ count: count + 1 });
        const id = feature.id;
        const imageEventId = feature.imageEventId;
        const externalPolygon = feature?.geometry?.coordinates?.[0];
        const internalPolygon = feature?.geometry?.coordinates?.slice(1);

        const interiors = internalPolygon?.map((polygon: number[][]) => {
          const pol = getPolygonPoints(polygon);
          pol.pop();
          return pol;
        });
        const exterior = getPolygonPoints(externalPolygon);
        exterior.pop();
        await updateScanObject({
          variables: {
            id,
            imageEventId,
            exterior,
            interiors,
          },
        });
      } catch (e) {
      } finally {
        const count = loaderCountVar().count;
        loaderCountVar({ count: count - 1 });
      }
    },
    [updateScanObject]
  );

  const debouncedHandler = useMemo(
    () => debounce(handleUpdate, 2000),
    [handleUpdate]
  );

  useEffect(() => {
    if (selectedScanObjectIndex > -1) {
      setSelectedFeatureIndex([selectedScanObjectIndex]);
    } else {
      setSelectedFeatureIndex([]);
    }
  }, [selectedScanObjectIndex]);

  useEffect(() => {
    if (scanObjects.length > 0) {
      const temp = scanObjects.map((scanObject) => {
        const coords = [];
        let polygon = createPolygonPoints(scanObject?.outline?.exterior);
        coords.push(polygon);
        const interiors = scanObject?.outline?.interiors ?? [];
        interiors.forEach((p: coordinates[]) => {
          const pol = createPolygonPoints(p);
          coords.push(pol);
        });
        const color = scanObject?.outline?.color?.substring(0, 7);
        const opacity = getAlphaFromHexCode(scanObject?.outline?.color ?? "");
        return {
          type: "Feature",
          id: scanObject?.id,
          objectType: "scan-object",
          imageEventId: scanObject.imageEvent?.id,
          imageAnalysisRequestId: scanObject?.imageAnalysisRequest?.id,
          properties: {
            stroke: color,
            "stroke-width": 3,
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
  }, [scanObjects]);

  useEffect(() => {
    const polygonLayer = new EditableGeoJsonLayer({
      id: "scan-object-layer",
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
      const scanObject = scanObjects?.[selectedFeatureIndexes[0]];
      if (scanObject) {
        const boundingBox = scanObject.outline.boundingBox;
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
  }, [deckRef, scanObjects, selectedFeatureIndexes, setViewState]);

  const handleScanObjectClick = useCallback(
    (e: Event) => {
      const { detail } = e as CustomScanObjectEvent;
      const { id } = detail;

      const index = scanObjects.findIndex((scanObject) => scanObject.id === id);
      if (index > -1) {
        selectedScanObjectIndexVar(index);
      }
    },
    [scanObjects]
  );

  useEffect(() => {
    document.addEventListener("scan-object-clicked", handleScanObjectClick);

    return () => {
      document.removeEventListener(
        "scan-object-clicked",
        handleScanObjectClick
      );
    };
  }, [handleScanObjectClick]);

  return { layer, setSelectedFeatureIndex };
}

export default useScanObjectLayer;
