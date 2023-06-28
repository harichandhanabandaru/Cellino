import React from "react";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import DropDown from "../DropDown";
import { COLORMAP } from "../../../constants";
import { COLORS } from "../../../theme/Colors";

export interface ColorMapProps {
  color: string;
  handleColormapChange: (e: SelectChangeEvent) => void;
}

const ColorMap: React.FC<ColorMapProps> = ({ color, handleColormapChange }) => {
  return (
    <Box
      sx={{
        padding: " 0 24px 12px 24px",
        color: COLORS.TEXT_MEDIUM_EMPHASIS,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          textTransform: "none",
          fontSize: "12px",
        }}
      >
        Colormap
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gap: "16px",
          justifyContent: "start",
          alignItems: "center",
          paddingTop: "12px",
        }}
      >
        <Box
          sx={{
            width: "48px",
            height: "30px",
            borderRadius: "4px",
            background: `linear-gradient(to right, rgb(0, 0, 0), rgb(${COLORMAP[color][0]},${COLORMAP[color][1]},${COLORMAP[color][2]}))`,
          }}
        />
        <DropDown
          options={Object.keys(COLORMAP)}
          handleChange={handleColormapChange}
          value={color}
        />
      </Box>
    </Box>
  );
};

export default ColorMap;
