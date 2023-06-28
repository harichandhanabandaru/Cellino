// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";
import InprogressSvg from "../../../../src/assets/inProgress.svg";
import CompletedSvg from "../../../../src/assets/completed.svg";
import AbortedSvg from "../../../../src/assets/aborted.svg";
import { RUN_STATUS } from "../../../constants";
import { getRunStatusValue } from "../../organisms/RunTabs";

interface RunAccordionDetailsProps {
  label: string;
  value: string | number;
  isIcon?: boolean;
}

export const getRunStatusIcon = (status: string | number) => {
  if (status === RUN_STATUS.IN_PROGRESS) {
    return InprogressSvg;
  } else if (status === RUN_STATUS.ABORTED) {
    return AbortedSvg;
  } else {
    return CompletedSvg;
  }
};

const RunAccordionDetails = ({
  label,
  value,
  isIcon,
}: RunAccordionDetailsProps) => {
  return (
    <div css={{ display: "grid", gap: 2 }}>
      <Typography
        variant="caption1"
        color={COLORS.BETA_TEXT_LOW_EMPHASIS}
        sx={{ fontSize: "13px" }}
      >
        {label}
      </Typography>
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "start",
          gap: "5px",
          marginTop: "7px",
        }}
      >
        {isIcon && <img src={getRunStatusIcon(value)} alt="status" />}
        <Typography
          variant="body5"
          sx={{ color: COLORS.BETA_TEXT_HIGH_EMPHASIS, wordBreak: "break-all" }}
        >
          {label === "Run status" ? getRunStatusValue(value) : value}
        </Typography>
      </div>
    </div>
  );
};

export default RunAccordionDetails;
