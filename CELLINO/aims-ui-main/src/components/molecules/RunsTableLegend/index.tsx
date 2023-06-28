// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import inProgress from "../../../assets/inProgress.svg";
import completed from "../../../assets/completed.svg";
import aborted from "../../../assets/aborted.svg";
import { Typography } from "@mui/material";

const RunsTableLegend = () => {
  return (
    <div css={{ display: "grid", gridAutoFlow: "column" }}>
      <img src={inProgress} alt="" style={{ padding: "0px 8px" }} />
      <Typography variant="caption2">In progress</Typography>
      <img src={completed} alt="" style={{ padding: "0px 8px" }} />
      <Typography variant="caption2">Completed </Typography>
      <img src={aborted} alt="" style={{ padding: "0px 8px" }} />
      <Typography variant="caption2">Aborted</Typography>
    </div>
  );
};
export default RunsTableLegend;
