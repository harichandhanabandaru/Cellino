import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const styles = {
  display: "flex",
  alignItems: "center",
  width: "140px",
  height: "43px",
  columnGap: 0.5,
  bgcolor: COLORS.GAMMA_BACKGROUND_02,
  color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
  borderRadius: "10px",
};

const ImageZoom = ({ zommValue }: { zommValue: number }) => {
  return (
    <Box sx={styles} data-testid="imageZoom">
      <IconButton disableRipple>
        <ZoomOutIcon
          sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS }}
          fontSize="large"
        />
      </IconButton>
      <Typography fontSize="16px">{`${zommValue}%`}</Typography>
      <IconButton disableRipple>
        <ZoomInIcon
          sx={{ color: COLORS.BETA_TEXT_LOW_EMPHASIS }}
          fontSize="large"
        />
      </IconButton>
    </Box>
  );
};

export default ImageZoom;
