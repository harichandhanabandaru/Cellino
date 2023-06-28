// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";
import inProgress from "../../../assets/inProgress.svg";
import completed from "../../../assets/completed.svg";
import aborted from "../../../assets/aborted.svg";

const RunTile = ({
  value,
  label,
  status,
  selectedRunStatus,
  handleSelectedRunStatus,
}: {
  value: number;
  label: string;
  status: string;
  selectedRunStatus: string;
  handleSelectedRunStatus: (status: string) => void;
}) => {
  let icon = null;
  switch (label) {
    case "In progress":
      icon = inProgress;
      break;
    case "Completed":
      icon = completed;
      break;
    case "Aborted":
      icon = aborted;
      break;
  }

  return (
    <div
      css={{
        width: "18vw",
        height: "84px",
        display: "grid",
        gridAutoFlow: "row",
        border: `1px solid ${COLORS.GAMMA_HEATMAP_300}`,
        borderRadius: "12px",
        alignContent: "center",
        justifyItems: "center",
        cursor: "pointer",
        backgroundColor:
          selectedRunStatus === status
            ? COLORS.GAMMA_BACKGROUND_03
            : COLORS.GAMMA_BACKGROUND_WHITE,
        gap: 3,
        "&:hover": {
          backgroundColor: COLORS.GAMMA_BACKGROUND_02,
        },
      }}
      onClick={() => handleSelectedRunStatus(status)}
    >
      <Typography variant="subtitle5">{value}</Typography>
      <div css={{ display: "grid", gridAutoFlow: "column" }}>
        {icon && <img src={icon} alt={label} style={{ paddingRight: "8px" }} />}
        <Typography variant="body4" color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}>
          {label}
        </Typography>
      </div>
    </div>
  );
};

export default RunTile;
