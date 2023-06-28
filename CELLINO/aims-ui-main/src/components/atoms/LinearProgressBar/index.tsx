// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { LinearProgress } from "@mui/material";

function LinearProgressBar({ loading = true }) {
  return (
    <div
      css={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1600,
        position: "absolute",
      }}
    >
      {loading && <LinearProgress data-testid="linearProgressBar" />}
    </div>
  );
}

export default LinearProgressBar;
