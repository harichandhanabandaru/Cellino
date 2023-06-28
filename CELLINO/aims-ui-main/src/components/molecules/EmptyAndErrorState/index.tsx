// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Button, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../../../theme/Colors";

interface EmptyAndErrorStateProps {
  image: string;
  heading: string;
  subText: string;
}

const EmptyAndErrorState = ({
  image,
  heading,
  subText,
}: EmptyAndErrorStateProps) => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        gap: 15,
        height: "fit-content",
        justifyItems: "center",
      }}
    >
      <img src={image} alt="error-icon" />
      <Typography variant="body3" color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}>
        {heading}
      </Typography>
      <Typography
        variant="body4"
        color={COLORS.BETA_TEXT_LOW_EMPHASIS}
        sx={{ width: "306px", textAlign: "center" }}
      >
        {subText}
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE,
          borderRadius: "8px",
          height: "40px",
          mt: "10px",
          "&:hover": { backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE },
        }}
        onClick={handleReload}
      >
        Reload
      </Button>
    </div>
  );
};

export default EmptyAndErrorState;
