// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { ReactComponent as recenter } from "../../../assets/recenter.svg";
import { COLORS } from "../../../theme/Colors";

function RecenterButton({
  onClick,
}: {
  onClick: (event: React.MouseEvent) => void;
}) {
  return (
    <Tooltip title={"Re-center image"} arrow>
      <IconButton
        css={{
          backgroundColor: COLORS.GAMMA_BACKGROUND_04,
          "&:focus": {
            backgroundColor: COLORS.GAMMA_BACKGROUND_04,
          },
        }}
        onClick={onClick}
      >
        <SvgIcon component={recenter} />
      </IconButton>
    </Tooltip>
  );
}

export default RecenterButton;
