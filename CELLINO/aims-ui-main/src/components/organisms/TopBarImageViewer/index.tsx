// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Button,
  Typography,
  Divider,
  SvgIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import WellSelector from "../../molecules/WellSelector";
import { COLORS } from "../../../theme/Colors";
import { ReactComponent as polygon } from "../../../assets/polygon.svg";
import { ReactComponent as internal_polygon } from "../../../assets/internal-polygon.svg";
import { ReactComponent as internal_polygon_disabled } from "../../../assets/internal-polygon-disabled.svg";
import ZAxis from "../../molecules/ZAxis";
import EnergyMapModalPopup from "../EnergyMapModalPopup";
import { ImageEvent, ScanObjectMetrics } from "../../../generated/graphql";
import { useSnackbar } from "notistack";
import { WELL_STATUS } from "../../../constants";

const ButtonStyle = {
  borderRadius: "12px",
  height: "40px",
  bgcolor: "#8900FF",
  "&:hover": {
    bgcolor: "#8900FF",
  },
};

const SNACKBAR_MESSAGE =
  "Energy map creation typically takes a few minutes to complete. Please check slack channel for aims notifications for an update.";

interface TopBarImageViewerProps {
  handleZaxisChange: Function;
  zArray: number[];
  currentZAxis: number;
  onPolygonClick: Function;
  creationMode: boolean;
  internalPolygonDisabled: boolean;
  handleInternalPolygon: Function;
  canDrawInternalPolygon: boolean;
  wellList: {
    id: string;
    position: string;
    reviewStatus: string;
  }[];
  selectedWellId: string;
  handleWellChange: (arg: string) => void;
  handleComplete: Function;
  handleBackToPlate: () => void;
  scanObjectMetrics: ScanObjectMetrics[];
  triggerAnalysisContextData?: {
    plateBarcode: string;
    wellPosition: string;
    latestImageEvent: ImageEvent;
    reviewStatus?: string;
  };
  isLatestImageEvent?: boolean;
}

const TopBarImageView = ({
  handleZaxisChange,
  zArray,
  currentZAxis,
  onPolygonClick,
  creationMode,
  internalPolygonDisabled,
  handleInternalPolygon,
  canDrawInternalPolygon,
  handleComplete,
  selectedWellId,
  wellList,
  handleWellChange,
  handleBackToPlate,
  scanObjectMetrics,
  triggerAnalysisContextData: contextData,
  isLatestImageEvent,
}: TopBarImageViewerProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleModalPopupOpen = () => {
    setOpen(true);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCloseSnackbar = React.useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  const handleShowSnackBar = () => {
    enqueueSnackbar(SNACKBAR_MESSAGE, {
      variant: "success",
      anchorOrigin: { horizontal: "center", vertical: "bottom" },
      preventDuplicate: true,
      onClose: handleCloseSnackbar,
    });
  };

  return (
    <AppBar
      sx={{
        backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
        border: "1px solid rgba(0, 0, 0, 0.25)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        minHeight: "64px",
        justifyContent: "center",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
      data-testid="topBar"
      elevation={0}
      position={"static"}
    >
      <div
        css={{
          display: "grid",
          justifyContent: "space-between",
          gridAutoFlow: "column",
          alignItems: "center",
        }}
      >
        <Button
          disableRipple
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          onClick={handleBackToPlate}
        >
          <ArrowBackIcon
            sx={{
              color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
              "&:hover": { color: COLORS.BETA_TEXT_LOW_EMPHASIS },
            }}
          />
          <Typography
            sx={{
              color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
              fontWeight: 400,
              fontSize: "16px",
              paddingLeft: "5px",
            }}
          >
            Back to plate view
          </Typography>
        </Button>
        <WellSelector
          selectedWellId={selectedWellId}
          wellList={wellList}
          handleChange={handleWellChange}
        />

        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            m: "0px",
            width: "2px",
            backgroundColor: COLORS.GAMMA_BACKGROUND_04,
          }}
        />

        <ZAxis
          handleZaxisChange={handleZaxisChange}
          currentZAxis={currentZAxis}
          zArray={zArray}
        />

        <Tooltip title={"Create polygon"} arrow>
          <IconButton
            sx={[
              creationMode && {
                "&.MuiIconButton-root": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                  borderRadius: "5px",
                },
              },
              {
                "&:hover": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                  borderRadius: "5px",
                },
              },
            ]}
            onClick={(e: React.MouseEvent) => onPolygonClick()}
          >
            <SvgIcon component={polygon} />
          </IconButton>
        </Tooltip>

        <Tooltip title={"Create interior polygon"} arrow>
          <IconButton
            disabled={internalPolygonDisabled}
            onClick={() => handleInternalPolygon()}
            sx={[
              canDrawInternalPolygon && {
                "&.MuiIconButton-root": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                  borderRadius: "5px",
                },
              },
              {
                "&:hover": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                  borderRadius: "5px",
                },
              },
            ]}
          >
            <SvgIcon
              component={
                !internalPolygonDisabled
                  ? internal_polygon
                  : internal_polygon_disabled
              }
            />
          </IconButton>
        </Tooltip>
        <div css={{ display: "grid", gridAutoFlow: "column", gap: "12px" }}>
          <Tooltip title={"Create Energy Map"} arrow>
            <Button
              variant="contained"
              sx={{ ...ButtonStyle }}
              onClick={handleModalPopupOpen}
              disabled={
                !isLatestImageEvent ||
                contextData?.reviewStatus === WELL_STATUS.COMPLETED
              }
            >
              Create Energy Map
            </Button>
          </Tooltip>

          <Button
            variant="contained"
            sx={{ ...ButtonStyle }}
            onClick={() => {
              handleComplete();
            }}
            disabled={
              !isLatestImageEvent ||
              contextData?.reviewStatus === WELL_STATUS.COMPLETED
            }
          >
            Complete
          </Button>
        </div>
      </div>
      {open && (
        <EnergyMapModalPopup
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          scanObjectMetrics={scanObjectMetrics}
          contextData={contextData}
          handleShowSnackBar={handleShowSnackBar}
        />
      )}
    </AppBar>
  );
};

export default TopBarImageView;
