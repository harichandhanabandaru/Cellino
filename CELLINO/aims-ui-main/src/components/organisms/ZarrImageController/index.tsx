import { Popover } from "@mui/material";
import { useCallback } from "react";
import BrightFieldController, {
  BrightFieldControllerProps,
} from "../../molecules/BrightFieldController";

export interface ZarrImageControllerProps extends BrightFieldControllerProps {
  setAnchor: Function;
  anchor: Element | null;
}

function ZarrImageController({
  zAxis,
  zArray,
  anchor,
  setAnchor,
  opacity,
  contrastLimit,
  contrastLimitRange,
  handleOpacityChange,
  handleContrastChange,
  handleColormapChange,
  handleZAxisChange,
  color,
  handleDownloadContextJson,
}: ZarrImageControllerProps) {
  const handleClose = useCallback(() => {
    setAnchor(null);
  }, [setAnchor]);

  const open = Boolean(anchor);

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={() => handleClose()}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          borderRadius: "16px 16px 16px 16px",
        },
      }}
    >
      <BrightFieldController
        zAxis={zAxis}
        zArray={zArray}
        opacity={opacity}
        contrastLimit={contrastLimit}
        contrastLimitRange={contrastLimitRange}
        handleOpacityChange={handleOpacityChange}
        handleContrastChange={handleContrastChange}
        handleColormapChange={handleColormapChange}
        handleZAxisChange={handleZAxisChange}
        color={color}
        handleDownloadContextJson={() => {
          handleDownloadContextJson();
          handleClose();
        }}
      />
    </Popover>
  );
}

export default ZarrImageController;
