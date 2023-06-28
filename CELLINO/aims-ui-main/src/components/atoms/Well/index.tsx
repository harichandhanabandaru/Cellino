// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Box, SxProps } from "@mui/system";
import { Typography } from "@mui/material";
import { WELL_STATUS } from "../../../constants";
import InProgressSvg from "../../../assets/well-progress.svg";
import CompletedSvg from "../../../assets/well-completed.svg";
import NotStartedSvg from "../../../assets/well-notstarted.svg";
import { COLORS } from "../../../theme/Colors";
export interface WellProps {
  confluenceValue?: number;
  status?: string;
  sx?: SxProps;
  onClick?: any;
  wellStatus?: string;
  noImageData?: boolean;
  noMlAttributes?: boolean;
  isMLAttributeAvailable?: boolean;
  isCircular?: boolean;
  aspectRatio?: number;
}

const getWellStatusIcon = (status: string) => {
  if (status === WELL_STATUS.COMPLETED) {
    return CompletedSvg;
  } else if (status === WELL_STATUS.IN_REVIEW) {
    return InProgressSvg;
  } else if (status === WELL_STATUS.NOT_STARTED) {
    return NotStartedSvg;
  }
};

const getRequiredColor = (
  noImageData: boolean | undefined,
  isMLAttributeAvailable: boolean | undefined,
  confluence: number | undefined
) => {
  if (noImageData) {
    return "#FEF1D7";
  } else if (confluence === undefined) {
    return "#EAE4F0";
  } else if (!isMLAttributeAvailable) {
    return "#BCB7C0";
  } else if (confluence !== undefined) {
    const opacity = confluence ? confluence / 100 : 0;
    return `rgba(137, 0, 255,${opacity})`;
  }
};

export const Well = ({
  confluenceValue,
  status,
  onClick,
  sx,
  noImageData,
  noMlAttributes,
  isCircular = false,
  wellStatus,
  isMLAttributeAvailable,
  aspectRatio,
}: WellProps) => {
  return (
    <Box
      data-testid={"Well"}
      sx={{
        position: "relative",
        cursor: !status || noImageData ? "default" : "pointer",
        minHeight: "25px",
        ...sx,
        width: "100%",
        aspectRatio: String(aspectRatio ?? 1),
      }}
      onClick={onClick}
    >
      <Box
        data-testid={"WellBoxColor"}
        sx={{
          backgroundColor: getRequiredColor(
            noImageData,
            isMLAttributeAvailable,
            confluenceValue
          ),
          margin: "1px 1px !important",
          width: "97%",
          position: "absolute",
          alignContent: "end",
          height: "96%",
          borderTop: wellStatus === "DROP" ? 2 : 0,
          borderRight: wellStatus === "DROP" ? 2 : 0,
          borderLeft: wellStatus === "DROP" ? 2 : 0,
          borderColor:
            wellStatus === "DROP"
              ? COLORS.BETA_SECONDARY_ACCENT_RED
              : "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: COLORS.BETA_TEXT_LOW_EMPHASIS,
          borderRadius: isCircular ? "50%" : undefined,
        }}
      >
        {noImageData && (
          <Typography variant="overline" sx={{ textTransform: "none" }}>
            No Image available
          </Typography>
        )}
        {wellStatus === "DROP" && (
          <Box
            sx={{
              width: "100%",
              height: 12,
              backgroundColor: COLORS.BETA_SECONDARY_ACCENT_RED,
              position: "absolute",
              bottom: 0,
            }}
          >
            <Typography
              variant={"overline"}
              textAlign="right"
              sx={{
                color: "#fff",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              DROPPED
            </Typography>
          </Box>
        )}
        {status && (
          <img
            src={getWellStatusIcon(status)}
            alt="status icon"
            style={{
              position: "absolute",
              zIndex: 200,
              bottom: status === WELL_STATUS.COMPLETED ? 0 : "7px",
              left:
                wellStatus === "DROP"
                  ? "-2px"
                  : status === WELL_STATUS.COMPLETED
                  ? 0
                  : "7px",
            }}
          />
        )}
        {confluenceValue === undefined && <></>}
      </Box>
    </Box>
  );
};
