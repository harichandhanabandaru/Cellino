// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Typography, Box } from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";
import { getRunStatusIcon } from "../RunAccordionDetails";
import CircleIcon from "@mui/icons-material/Circle";
import { getRunStatusValue } from "../../organisms/RunTabs";

export interface RunTabDetailItemProps {
  label: string;
  value: string | number;
  isIcon?: boolean;
  isEditable?: boolean;
}

const getCloneReviewStatusIcon = (status: string | number) => {
  return (
    <CircleIcon
      sx={{
        color:
          status === "In review"
            ? COLORS.BETA_SECONDARY_ACCENT_YELLOW
            : COLORS.BETA_SECONDARY_ACCENT_GREEN,
        width: "12px",
        height: "12px",
      }}
    />
  );
};

const RunTabDetailItem = ({
  label,
  value,
  isIcon,
  isEditable,
}: RunTabDetailItemProps) => {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "0.5fr 2.2fr 0.3fr",
        gap: 10,
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: "13px", mt: "4px" }}
        color={COLORS.BETA_TEXT_LOW_EMPHASIS}
      >
        {label}
      </Typography>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "flex-start",
          gap: "5px",
          alignItems: "center",
        }}
      >
        {isIcon ? (
          label === "Run status" ? (
            <img src={getRunStatusIcon(value)} alt="status" />
          ) : (
            getCloneReviewStatusIcon(value)
          )
        ) : (
          ""
        )}
        <Box
          sx={{
            backgroundColor: isEditable
              ? COLORS.GAMMA_BACKGROUND_WHITE
              : "none",
            borderRadius: isEditable ? "6px" : "0px",
            paddingLeft: isEditable ? "8px" : "0px",
            paddingRight: isEditable ? "8px" : "0px",
            margin: "auto",
          }}
        >
          <Typography variant="body5" color={COLORS.BETA_TEXT_HIGH_EMPHASIS}>
            {label === "Run status" ? getRunStatusValue(value) : value}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default RunTabDetailItem;
