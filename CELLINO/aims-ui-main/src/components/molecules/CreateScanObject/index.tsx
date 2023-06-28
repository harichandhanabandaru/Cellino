// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import { Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { COLORS } from "../../../theme/Colors";
import ColorOpacity from "../ColorOpacity";
import CustomInputField from "../CustomInputField";

interface CreateScanObjectProps {
  opacity: number;
  handleOpacityChange: (event: Event, value: number | number[]) => void;
  handleColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEnergyLevelChange: (value: string) => void;
  color: string;
  energyLevel: string;
  handleNameChange: (value: string) => void;
}

export const validateEnergyLevel = (value: string) => {
  if (value === "") {
    return false;
  }
  const re = /^[0-9\b]+$/;
  return !re.test(value);
};

const ENERGY_LEVEL_MESSAGE = "Energy level only takes positive numbers";

const CreateScanObject = ({
  handleColorChange,
  handleOpacityChange,
  handleEnergyLevelChange,
  opacity,
  color,
  energyLevel,
  handleNameChange,
}: CreateScanObjectProps) => {
  return (
    <div
      css={{
        display: "grid",
        gridAutoFlow: "row",
        rowGap: 8,
        paddingTop: "10px",
      }}
    >
      {/* TODO: Render a name field once scan object is created and it should not be editable */}

      {/* <CustomInputField
        label={"Name"}
        value={"Scan object 1"}
        onChange={handleNameChange}
      /> */}
      <ColorOpacity
        opacity={opacity}
        handleOpacityChange={handleOpacityChange}
        handleColorChange={handleColorChange}
        color={color}
      />
      <div css={{ display: "grid", gridAutoColumns: "row", rowGap: 3 }}>
        <CustomInputField
          label={"Energy level"}
          value={energyLevel}
          onChange={handleEnergyLevelChange}
        />
        {validateEnergyLevel(energyLevel) && (
          <Typography
            variant="overline"
            color={COLORS.BETA_SECONDARY_ACCENT_RED}
            sx={{ textTransform: "none" }}
          >
            {ENERGY_LEVEL_MESSAGE}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default CreateScanObject;
