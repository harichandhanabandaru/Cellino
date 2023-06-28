import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { COLORMAP, DEFAULT_LAYER_PROP } from "../../../constants";
import getColorLabel from "../../../utils/getColorLabel";
import ZarrImageController from "../ZarrImageController";
import {
  imageEventDataVar,
  zAxisIndexVar,
  zAxisValueVar,
} from "../../../apollo/cache";
import { useReactiveVar } from "@apollo/client";

interface BrightFiledControllerWrapperProps {
  baseLayerData: any;
  setLayerData: Function;
  setAnchor: Function;
  anchor: Element | null;
  zArray?: number[];
  handleDownloadContextJson: Function;
  index: number;
}

function BrightFieldControllerWrapper({
  baseLayerData,
  setLayerData,
  anchor,
  setAnchor,
  zArray,
  handleDownloadContextJson,
  index,
}: BrightFiledControllerWrapperProps) {
  const imageEventDataReactiveVar = useReactiveVar(imageEventDataVar);
  const zAxisIndex = useReactiveVar(zAxisIndexVar);
  const layerData = imageEventDataReactiveVar?.[index]
    ? imageEventDataReactiveVar[index]
    : baseLayerData;
  const lp = layerData?.layerProps ?? DEFAULT_LAYER_PROP;
  const contrastLimit = [...lp?.contrastLimits[0]];
  const contrastLimitRange = lp.contrastLimitsRange[0];
  const zAxis = zAxisIndex || lp?.selections[0][2];
  const opacity = lp.opacity;

  const color = getColorLabel(lp?.colors?.[0]);

  const handleOpacityChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void = useCallback(
    (_event: Event, value: number | number[]) => {
      if (imageEventDataReactiveVar?.[index]) {
        const temp = imageEventDataVar();
        temp[index] = {
          ...temp[index],
          layerProps: { ...temp[index].layerProps, opacity: value },
        };
        imageEventDataVar([...temp]);
      } else {
        setLayerData((prev: any) => ({
          ...prev,
          layerProps: { ...prev.layerProps, opacity: value },
        }));
      }
    },
    [imageEventDataReactiveVar, index, setLayerData]
  );

  const handleContrastChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void = useCallback(
    (_event: Event, value: number | number[]) => {
      if (imageEventDataReactiveVar?.[index]) {
        const temp = imageEventDataVar();
        temp[index] = {
          ...temp[index],
          layerProps: { ...temp[index].layerProps, contrastLimits: [value] },
        };
        imageEventDataVar([...temp]);
      } else {
        setLayerData((prev: any) => {
          const contrastLimits = [...prev.layerProps.contrastLimits];
          contrastLimits[0] = value;
          return {
            ...prev,
            layerProps: { ...prev.layerProps, contrastLimits },
          };
        });
      }
    },
    [imageEventDataReactiveVar, index, setLayerData]
  );

  const handleColormapChange = useCallback(
    (e: SelectChangeEvent) => {
      const newColor = e.target.value;
      const rgb = COLORMAP[newColor];
      const colors = [rgb];
      if (imageEventDataReactiveVar?.[index]) {
        const temp = imageEventDataVar();
        temp[index] = {
          ...temp[index],
          layerProps: { ...temp[index].layerProps, colors },
        };
        imageEventDataVar([...temp]);
      } else {
        setLayerData((prev: any) => {
          return { ...prev, layerProps: { ...prev.layerProps, colors } };
        });
      }
    },
    [imageEventDataReactiveVar, index, setLayerData]
  );

  const handlezAxisChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void = useCallback(
    (_event: Event, value: number | number[]) => {
      if (typeof value === "number") {
        if (zArray && zArray.length > 0) {
          zAxisValueVar(zArray[value]);
        }
      }
      if (imageEventDataReactiveVar?.[index]) {
        let temp = [...imageEventDataReactiveVar];
        const newSelections = [...temp?.[index].layerProps?.selections[0]];
        newSelections[2] = value;
        temp[index] = {
          ...temp[index],
          layerProps: {
            ...temp[index].layerProps,
            selections: [newSelections],
          },
        };
        imageEventDataVar([...temp]);
      } else {
        let newSelections = baseLayerData?.layerProps?.selections[0];
        newSelections[2] = value;
        setLayerData({
          ...baseLayerData,
          layerProps: {
            ...baseLayerData.layerProps,
            selections: [newSelections],
          },
        });
      }
    },
    [baseLayerData, imageEventDataReactiveVar, index, setLayerData, zArray]
  );

  return (
    <ZarrImageController
      zAxis={zAxis}
      zArray={zArray}
      setAnchor={setAnchor}
      anchor={anchor}
      opacity={opacity}
      contrastLimit={contrastLimit}
      contrastLimitRange={contrastLimitRange}
      handleOpacityChange={handleOpacityChange}
      handleContrastChange={handleContrastChange}
      handleColormapChange={handleColormapChange}
      handleZAxisChange={handlezAxisChange}
      color={color}
      handleDownloadContextJson={handleDownloadContextJson}
    />
  );
}

export default BrightFieldControllerWrapper;
