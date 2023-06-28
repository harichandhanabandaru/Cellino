import { useReactiveVar } from "@apollo/client";
import { inferenceDataVar } from "../../../apollo/cache";
import getColorLabel from "../../../utils/getColorLabel";
import { useCallback } from "react";
import { SelectChangeEvent } from "@mui/material";
import { COLORMAP, DEFAULT_LAYER_PROP } from "../../../constants";
import ZarrImageController from "../ZarrImageController";

interface InferenceLayerControllerWrapperProps {
  setAnchor: Function;
  anchor: Element | null;
  index: number;
  handleDownloadContextJson: Function;
}

function InferenceLayerControllerWrapper({
  anchor,
  index,
  setAnchor,
  handleDownloadContextJson,
}: InferenceLayerControllerWrapperProps) {
  const inferenceLayerData = useReactiveVar(inferenceDataVar);

  const layerData = inferenceLayerData?.[index];

  const lp = layerData?.layerProps ?? DEFAULT_LAYER_PROP;
  const contrastLimit = [...lp?.contrastLimits[0]];
  const contrastLimitRange = lp.contrastLimitsRange[0];
  const opacity = lp.opacity;

  const color = getColorLabel(lp?.colors?.[0]);

  const handleOpacityChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void = useCallback(
    (_event: Event, value: number | number[]) => {
      const temp = inferenceDataVar();
      temp[index] = {
        ...temp[index],
        layerProps: { ...temp[index].layerProps, opacity: value },
      };
      inferenceDataVar([...temp]);
    },
    [index]
  );

  const handleContrastChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void = useCallback(
    (_event: Event, value: number | number[]) => {
      const temp = inferenceDataVar();
      temp[index] = {
        ...temp[index],
        layerProps: { ...temp[index].layerProps, contrastLimits: [value] },
      };
      inferenceDataVar([...temp]);
    },
    [index]
  );

  const handleColormapChange = useCallback(
    (e: SelectChangeEvent) => {
      const newColor = e.target.value;
      const rgb = COLORMAP[newColor];
      const temp = inferenceDataVar();
      temp[index] = {
        ...temp[index],
        layerProps: { ...temp[index].layerProps, colors: [rgb] },
      };
      inferenceDataVar([...temp]);
    },
    [index]
  );

  return (
    <ZarrImageController
      setAnchor={setAnchor}
      anchor={anchor}
      opacity={opacity}
      contrastLimit={contrastLimit}
      contrastLimitRange={contrastLimitRange}
      handleOpacityChange={handleOpacityChange}
      handleContrastChange={handleContrastChange}
      handleColormapChange={handleColormapChange}
      color={color}
      handleDownloadContextJson={handleDownloadContextJson}
    />
  );
}

export default InferenceLayerControllerWrapper;
