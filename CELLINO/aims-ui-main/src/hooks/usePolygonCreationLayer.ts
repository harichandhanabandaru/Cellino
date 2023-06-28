import { useEffect, useState, useRef, MutableRefObject } from "react";
import {
  EditableGeoJsonLayer,
  ModifyMode,
  DrawPolygonByDraggingMode,
} from "nebula.gl";
import hexToRGB from "../utils/hexToRGB";
import { COLORS } from "../theme/Colors";
import { useReactiveVar } from "@apollo/client";
import { canDrawInternalPolygonVar } from "../apollo/cache";
import getPolygonPoints from "../utils/getPolygonPoints";

interface coordinates {
  x: number;
  y: number;
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
  colony: { id: string };
}

interface features {
  type: string;
  features: Array<any>;
}

function usePolygonCreationLayer(
  creationMode: boolean,
  handleAttributesPanel: Function,
  updateNewPolygonPoints: Function,
  isValidInternalPolygon: MutableRefObject<boolean>
) {
  const [features, setFeatures] = useState<features>({
    type: "FeatureCollection",
    features: [],
  });

  const [selectedFeatureIndexes, setSelectedFeatureIndex] = useState<
    Array<number>
  >([]);

  const [layer, setLayer] = useState<EditableGeoJsonLayer | null>(null);

  const [canDrawExternalPolygon, setCanDrawExternalPolygon] =
    useState<boolean>(true);

  const shouldUpdate = useRef<boolean>(false);
  const openAttributionPanel = useRef<boolean>(true);

  const canDrawInternalPolygon = useReactiveVar(canDrawInternalPolygonVar);

  useEffect(() => {
    const modeConfig =
      canDrawExternalPolygon || canDrawInternalPolygon
        ? {
            throttleMs: 50,
          }
        : null;
    const mode =
      canDrawExternalPolygon || canDrawInternalPolygon
        ? DrawPolygonByDraggingMode
        : ModifyMode;

    // @ts-ignore
    const polygonLayer = new EditableGeoJsonLayer({
      id: "polygon-creation-layer",
      data: features,
      mode,
      modeConfig,
      selectedFeatureIndexes,
      getFillColor: hexToRGB(COLORS.GAMMA_HEATMAP_300, 0.2),
      getLineColor: hexToRGB(COLORS.GAMMA_HEATMAP_400, 1),
      getEditHandlePointColor: hexToRGB(COLORS.GAMMA_HEATMAP_400, 1),
      onEdit: /* istanbul ignore next */ ({ updatedData, editType }) => {
        if (mode && !canDrawInternalPolygon) {
          setFeatures(updatedData);
        } else if (
          editType === "addFeature" &&
          mode === DrawPolygonByDraggingMode
        ) {
          if (!isValidInternalPolygon.current) {
            isValidInternalPolygon.current = true;
          } else {
            const temp = updatedData.features.pop().geometry.coordinates[0];
            setFeatures((prevState) => {
              const coordinates = [
                ...prevState.features[0].geometry.coordinates,
              ];
              const feature = {
                ...prevState.features[0],
                geometry: {
                  ...prevState.features[0].geometry,
                  coordinates,
                },
              };
              coordinates.push(temp);
              return {
                ...prevState,
                features: [feature],
              };
            });
          }
        } else {
          setFeatures(updatedData);
        }
      },
    });
    setLayer(polygonLayer);
  }, [
    selectedFeatureIndexes,
    features,
    canDrawExternalPolygon,
    canDrawInternalPolygon,
    isValidInternalPolygon,
  ]);

  useEffect(() => {
    if (features?.features?.length > 0) {
      setCanDrawExternalPolygon(false);
      setSelectedFeatureIndex([0]);
      shouldUpdate.current = true;
    }
  }, [features]);

  useEffect(() => {
    if (creationMode) {
      setCanDrawExternalPolygon(true);
    } else {
      setCanDrawExternalPolygon(false);
    }
  }, [creationMode]);

  useEffect(() => {
    if (features?.features?.length > 0 && openAttributionPanel.current) {
      openAttributionPanel.current = false;
      handleAttributesPanel(true);
    }
  }, [handleAttributesPanel, features]);

  useEffect(() => {
    if (shouldUpdate.current) {
      const externalPolygon =
        features.features?.[0]?.geometry?.coordinates?.[0];
      const internalPolygon =
        features.features?.[0]?.geometry?.coordinates?.slice(1);
      const interiors = internalPolygon.map((polygon: number[][]) =>
        getPolygonPoints(polygon)
      );
      const exterior = getPolygonPoints(externalPolygon);

      updateNewPolygonPoints(exterior, interiors);
    }
  }, [features, updateNewPolygonPoints]);

  useEffect(() => {
    if (!creationMode && !canDrawExternalPolygon) {
      setSelectedFeatureIndex([]);
      setFeatures({
        type: "FeatureCollection",
        features: [],
      });
      handleAttributesPanel(false);
      shouldUpdate.current = false;
      canDrawInternalPolygonVar(false);
      openAttributionPanel.current = true;
    }
  }, [canDrawExternalPolygon, creationMode, handleAttributesPanel]);

  return { layer };
}

export default usePolygonCreationLayer;
