import {
  Box,
  Divider,
  IconButton,
  Paper,
  SelectChangeEvent,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ReactComponent as FileDownloadIcon } from "../../../assets/file_download.svg";
import { COLORS } from "../../../theme/Colors";
// import { default as ResetIcon } from "@mui/icons-material/RefreshRounded";
import AdjustmentSlider from "../../atoms/AdjustmentSlider";
import ColorMap from "../ColorMap";

export interface BrightFieldControllerProps {
  opacity: number;
  zAxis?: number;
  zArray?: number[];
  contrastLimit: number[];
  contrastLimitRange: number[];
  handleOpacityChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  handleContrastChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  handleColormapChange: (e: SelectChangeEvent) => void;
  handleZAxisChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  color: string;
  handleDownloadContextJson: Function;
}

const SliderStyling = {
  marginLeft: 0,
  marginTop: 0,
  width: "100%",
  "& .MuiSlider-thumb": {
    width: 10,
    height: 10,
    "&:before": {
      boxShadow: "0 4px 4px rgba(0,0,0,0.4)",
    },
  },
};

const PopupHeaderTypographyStyle = {
  fontSize: "16px",
};

const PopupItemTypographyStyle = {
  textTransform: "none",
  fontSize: "12px",
};

function BrightFieldController({
  opacity,
  zAxis,
  zArray,
  contrastLimit,
  contrastLimitRange,
  handleOpacityChange,
  handleContrastChange,
  handleColormapChange,
  handleZAxisChange,
  color,
  handleDownloadContextJson,
}: BrightFieldControllerProps) {
  return (
    <Paper
      elevation={4}
      sx={{
        width: "263px",
        borderRadius: "16px 16px 16px 16px",
        overflowX: "auto",
      }}
    >
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "16px 24px",
        }}
      >
        <Typography variant={"caption2"} sx={PopupHeaderTypographyStyle}>
          Layer controls
        </Typography>
        <div>
          {/* Remove this empty div when implementing RESET button below */}
        </div>
        {/*         
        FIXME: Commenting code until the RESET functionality is ready

        <IconButton disableRipple>
          <ResetIcon
            sx={{
              transform: "scaleX(-1)",
            }}
          />
          <Typography
            variant="overline"
            sx={{
              textTransform: "none",
            }}
          >
            Reset
          </Typography>
        </IconButton> */}
      </Box>
      <Box
        sx={{
          padding: "12px 24px 6px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            justifyContent: "space-between",
            color: COLORS.TEXT_MEDIUM_EMPHASIS,
          }}
        >
          <Typography variant="overline" sx={PopupItemTypographyStyle}>
            Opacity
          </Typography>
          <Typography
            variant="overline"
            sx={PopupItemTypographyStyle}
          >{`${Math.ceil(opacity * 100)}%`}</Typography>
        </Box>
        <AdjustmentSlider
          handleSliderChange={handleOpacityChange}
          min={0}
          max={1}
          step={0.01}
          value={opacity}
          sx={SliderStyling}
        />
      </Box>
      <Box
        sx={{
          padding: "0 24px",
          color: COLORS.TEXT_MEDIUM_EMPHASIS,
        }}
      >
        <Typography variant="overline" sx={PopupItemTypographyStyle}>
          Contrast limit
        </Typography>
        <AdjustmentSlider
          min={contrastLimitRange[0]}
          max={contrastLimitRange[1]}
          valueLabelDisplay="auto"
          step={0.01}
          value={contrastLimit}
          handleSliderChange={handleContrastChange}
          sx={SliderStyling}
        />
      </Box>
      {/* Z-Axis Change */}
      {/* 
          using undefined temporarily because when zAxis or zArray it fails to render.
          FIXME: Remove this once inference zarray is provided
      */}
      {zAxis !== undefined && zArray !== undefined && (
        <Box
          sx={{
            padding: "12px 24px 6px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              justifyContent: "space-between",
              color: COLORS.TEXT_MEDIUM_EMPHASIS,
            }}
          >
            <Typography variant="overline" sx={PopupItemTypographyStyle}>
              Z- axis
            </Typography>
            <Typography variant="overline" sx={PopupItemTypographyStyle}>
              {zArray !== undefined &&
                zAxis !== undefined &&
                `${zArray[zAxis] || 0}/${
                  zArray?.[zArray.length - 1] || 0
                } microns`}
            </Typography>
          </Box>
          <AdjustmentSlider
            value={zAxis || 0}
            onChange={handleZAxisChange}
            min={0}
            max={zArray ? zArray?.length - 1 : 1}
            step={1}
            sx={SliderStyling}
          />
        </Box>
      )}
      <ColorMap color={color} handleColormapChange={handleColormapChange} />
      <Divider />
      <Box
        sx={{
          padding: "16px 24px",
          display: "grid",
          gridAutoFlow: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Typography variant="caption2" sx={PopupHeaderTypographyStyle}>
          Download context
        </Typography>
        <IconButton
          disableRipple
          onClick={() => {
            handleDownloadContextJson();
          }}
        >
          <SvgIcon
            component={FileDownloadIcon}
            sx={{ height: "20px", width: "20px" }}
          />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default BrightFieldController;
