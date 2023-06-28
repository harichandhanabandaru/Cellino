import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { COLORS } from "../../../theme/Colors";
import React from "react";
import { DEFAULT_POLYGON_COLOR } from "../../../constants";
import { colony } from "../../../constants/types";

export default function ColonyAssociate({
  setSelectedColony,
  colonies,
  colonyRequired,
  handleAssociateColonyChange,
  creatingNewCluster = false,
}: {
  setSelectedColony?: React.Dispatch<React.SetStateAction<colony | null>>;
  colonies: colony[];
  colonyRequired?: any;
  handleAssociateColonyChange?: (value: any) => void;
  creatingNewCluster?: boolean;
}) {
  function handleColonyChange(value: colony) {
    if (setSelectedColony !== undefined) {
      setSelectedColony(value);
    }
  }
  const newColonies = [...colonies];
  newColonies.unshift({
    id: "1",
    name: "new colony",
    isSelected: false,
    type: "MANUAL",
    outline: { color: DEFAULT_POLYGON_COLOR },
  });
  return (
    <Autocomplete
      sx={{ width: 172 }}
      options={creatingNewCluster ? newColonies : colonies}
      onChange={(e: React.SyntheticEvent, value: any) => {
        if (creatingNewCluster) {
          handleColonyChange(value);
        } else {
          handleAssociateColonyChange && handleAssociateColonyChange(value);
        }
      }}
      value={colonyRequired || null}
      autoHighlight
      isOptionEqualToValue={(option, value) => option?.name === value?.name}
      getOptionLabel={(option) => option?.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "& .MuiAutocomplete-popper": {
              backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            },
          }}
          {...props}
          key={`${option?.name}-${option?.id}`}
        >
          <Typography variant={"caption1"} component={"span"}>
            {option?.name}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            backgroundColor: COLORS.GAMMA_BACKGROUND_02,
            borderRadius: "8px 8px 8px 8px",
            height: "1.95em",
            marginLeft: "2px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          inputProps={{
            ...params.inputProps,
            style: {
              height: "5px",
              fontFamily: ["Space Grotesk", "sans-serif"].join(","),
              fontSize: "12px",
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "19.5px",
              letterSpacing: "0.25px",
            },
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
