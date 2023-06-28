import Slider, { SliderProps } from "@mui/material/Slider";
import React from "react";

export interface AdjustmentSliderProps extends SliderProps {
  handleSliderChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
}

const AdjustmentSlider: React.FC<AdjustmentSliderProps> = ({
  handleSliderChange,
  ...rest
}) => {
  return (
    <Slider
      onChange={handleSliderChange}
      sx={{
        marginLeft: 0,
        marginTop: 0,
        width: "90%",
        "& .MuiSlider-thumb": {
          width: 10,
          height: 10,
          "&:before": {
            boxShadow: "0 4px 4px rgba(0,0,0,0.4)",
          },
        },
      }}
      {...rest}
    />
  );
};

export default AdjustmentSlider;
