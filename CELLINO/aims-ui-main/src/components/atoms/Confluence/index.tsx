import * as React from "react";
import { Grid } from "@mui/material";

const Confluence = () => {
  return (
    <Grid
      item
      width="64px"
      height="68vh"
      sx={{
        backgroundImage:
          "linear-gradient(to top, rgba(137, 0, 255,1),rgba(137, 0, 255,.9),rgba(137, 0, 255,.8),rgba(137, 0, 255,.7) ,rgba(137, 0, 255,.6), rgba(137, 0, 255,.45) , rgba(137, 0, 255,.3) ,rgba(137, 0, 255,.2) ,rgba(137, 0, 255,.1), rgba(137, 0, 255,.0))",
      }}
      data-testid="1"
    />
  );
};
export default Confluence;
