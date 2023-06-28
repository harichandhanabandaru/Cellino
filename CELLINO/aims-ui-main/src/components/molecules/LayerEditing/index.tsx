import { IconButton, Popover, SvgIcon, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { COLORS } from "../../../theme/Colors";
import AdjustmentSlider from "../../atoms/AdjustmentSlider";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/ArrowLeft.svg";

export interface LayerEditingProps {
  layerName: string;
  opacity: { Brightfield: number };
  setOpacity: React.Dispatch<React.SetStateAction<{ Brightfield: number }>>;
  anchor: Element | null;
  setAnchor: React.Dispatch<React.SetStateAction<Element | null>>;
}

const LayerEditing: React.FC<LayerEditingProps> = ({
  layerName,
  opacity,
  setOpacity,
  anchor,
  setAnchor,
}) => {
  const [value, setValue] = React.useState(opacity.Brightfield);
  const handleChange = (e: any) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  useEffect(() => {
    setOpacity({ Brightfield: value });
  }, [value, setOpacity]);

  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      sx={{
        "& .MuiPopover-paper": {
          width: "234px",
          borderRadius: "10px",
          marginLeft: "10px",
        },
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <IconButton onClick={() => setAnchor(null)} disableRipple>
        <SvgIcon component={ArrowLeftIcon} sx={{ height: "18px" }} />
      </IconButton>
      <Typography
        variant="body4"
        noWrap
        sx={{
          marginTop: "5px",
          color: COLORS.BETA_TEXT_HIGH_EMPHASIS,
        }}
      >
        Layer Editing
      </Typography>
      <AdjustmentSlider
        name={"Opacity"}
        value={opacity.Brightfield}
        handleSliderChange={handleChange}
      />
    </Popover>
  );
};

export default LayerEditing;
