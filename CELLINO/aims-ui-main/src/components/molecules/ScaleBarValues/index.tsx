// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { IconButton, Typography } from "@mui/material";
import AngleDoubleRight from "../../../assets/AngleDoubleRight.png";
import AngleDoubleLeft from "../../../assets/AngleDoubleLeft.png";
import { useState } from "react";
import { COLORS } from "../../../theme/Colors";

function ScaleBarValues({
  x,
  y,
  value,
}: {
  value: string;
  x: number;
  y: number;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <div
        css={{
          display: visible ? "grid" : "none",
          gridAutoFlow: "column",
          gap: 4,
          justifyContent: "start",
          color: COLORS.GAMMA_BACKGROUND_WHITE,
          backgroundColor: `${COLORS.ALPHA_PRIMARY_PURPLE}80`,
          padding: "8px 12px",
          borderRadius: 16,
        }}
      >
        <Typography variant={"caption3"}>{`X: ${Math.round(x)}μm`}</Typography>
        <Typography variant={"caption3"}>{`Y: ${Math.round(y)}μm`}</Typography>
        <Typography variant={"caption3"}>{`Value: ${value}`}</Typography>
      </div>
      <IconButton
        disableRipple
        onClick={() => setVisible((prevState) => !prevState)}
      >
        <img
          src={visible ? AngleDoubleRight : AngleDoubleLeft}
          alt={"double-arrow"}
        />
      </IconButton>
    </div>
  );
}

export default ScaleBarValues;
