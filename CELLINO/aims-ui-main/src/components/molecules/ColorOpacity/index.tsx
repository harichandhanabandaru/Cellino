// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import { COLORS } from "../../../theme/Colors";
import AdjustmentSlider from "../../atoms/AdjustmentSlider";

export interface ColorOpacityProps {
  opacity: number;
  handleOpacityChange: (event: Event, value: number | number[]) => void;
  handleColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
  color: string;
}

const ColorOpacity = ({
  opacity,
  color,
  handleOpacityChange,
  handleColorChange,
}: ColorOpacityProps) => {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        marginTop: "12px",
      }}
    >
      <Typography
        color={COLORS.BETA_TEXT_LOW_EMPHASIS}
        variant={"overline"}
        sx={{ textTransform: "none", fontSize: "12px" }}
      >
        {"Color"}
      </Typography>
      <input
        type="color"
        value={color}
        style={{ marginTop: "10px" }}
        onChange={handleColorChange}
      />
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "space-between",
          marginTop: "17px",
        }}
      >
        <Typography
          color={COLORS.BETA_TEXT_LOW_EMPHASIS}
          variant={"overline"}
          sx={{ textTransform: "none", fontSize: "12px" }}
        >
          {"Opacity"}
        </Typography>
        <Typography
          variant="overline"
          color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
        >{`${Math.ceil(opacity * 100)}%`}</Typography>
      </div>
      <AdjustmentSlider
        value={opacity}
        handleSliderChange={handleOpacityChange}
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  );
};

export default ColorOpacity;
