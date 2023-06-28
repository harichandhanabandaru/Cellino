// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import React from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OverflowTip from "../OverflowTip";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { HIDE, UN_HIDE } from "../../../constants";

interface CustomTreeItemLabelProps {
  label: string;
  showMoreIcon?: boolean;
  showHideToggle: boolean;
  showObject: boolean;
  setShowObject: (event: React.MouseEvent) => void;
  handleMoreItemClick?: (event: React.MouseEvent) => void;
  disableShowMoreIcon?: boolean;
}

function CustomTreeItemLabel({
  label,
  showMoreIcon,
  showHideToggle,
  showObject,
  setShowObject,
  handleMoreItemClick,
  disableShowMoreIcon = false,
}: CustomTreeItemLabelProps) {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "1fr auto",
        gap: 8,
        alignItems: "center",
      }}
    >
      <OverflowTip text={label} variant={"body4"} />
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
        }}
      >
        {showMoreIcon && (
          <IconButton
            onClick={handleMoreItemClick}
            disableRipple
            disabled={!!disableShowMoreIcon}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        {showHideToggle && (
          <IconButton onClick={setShowObject} disableRipple>
            <Tooltip title={showObject ? UN_HIDE : HIDE} arrow>
              <div>
                {showObject ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </div>
            </Tooltip>
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default CustomTreeItemLabel;
