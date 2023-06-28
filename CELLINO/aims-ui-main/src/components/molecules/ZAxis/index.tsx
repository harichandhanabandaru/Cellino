import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "../../../theme/Colors";

const styles = {
  display: "flex",
  alignItems: "center",
  jutifyContent: "center",
  maxWidth: "300px",
  height: "43px",
  columnGap: 1,
  bgcolor: COLORS.GAMMA_BACKGROUND_02,
  color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
  borderRadius: "10px",
};

const ZAxis = ({
  handleZaxisChange,
  currentZAxis = 0,
  zArray,
}: {
  handleZaxisChange: Function;
  currentZAxis: number;
  zArray: number[];
}) => {
  const numberOfZStep = zArray.length;
  return (
    <Box sx={styles} data-testid="Zaxis">
      <IconButton
        disableRipple
        sx={{ ml: "4px" }}
        onClick={() => {
          handleZaxisChange(
            currentZAxis === 0 ? currentZAxis : currentZAxis - 1
          );
        }}
        disabled={currentZAxis === 0 || numberOfZStep === 0}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: "1.7rem" }} />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Typography sx={{ fontSize: "14px" }}>{`Z-axis: ${
        zArray[currentZAxis] ?? ""
      } microns`}</Typography>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton
        disableRipple
        onClick={() => {
          handleZaxisChange(
            currentZAxis === numberOfZStep - 1 ? currentZAxis : currentZAxis + 1
          );
        }}
        disabled={currentZAxis === numberOfZStep - 1 || numberOfZStep === 0}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: "1.7rem" }} />
      </IconButton>
    </Box>
  );
};

export default ZAxis;
