// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

export const RenderReviewer = (props: GridRenderCellParams) => {
  const name = props.value;
  return (
    <div>
      <Typography variant={"caption3"}>{name || "-"}</Typography>
      <br />
      <Typography variant={"caption1"}>{props.row.email || "-"}</Typography>
    </div>
  );
};
