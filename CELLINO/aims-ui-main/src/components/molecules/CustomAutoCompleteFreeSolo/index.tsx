import * as React from "react";
import { useCallback, useState } from "react";
import {
  InputLabel,
  Box,
  Typography,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { COLORS } from "../../../theme/Colors";

function CustomAutoCompleteFreeSolo({
  label,
  options,
  value,
  onChange,
  isDisabled,
}: {
  label: string;
  options: { label: string; value: string }[];
  onChange: (arg: string) => void;
  value?: string;
  isDisabled?: boolean;
}) {
  const [selectedValue, setSelectedValue] = useState<string>(value ?? "");

  const handleChange = useCallback(
    (_event: any, value: any) => {
      setSelectedValue(value);
      onChange(value);
    },
    [onChange]
  );
  return (
    <Box>
      <InputLabel
        shrink
        sx={{
          color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
        }}
      >
        <Typography variant={"overline"} textTransform={"none"} fontSize="16px">
          {label}
        </Typography>
      </InputLabel>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        blurOnSelect
        disabled={isDisabled}
        sx={{ width: "175px" }}
        value={selectedValue}
        PaperComponent={({ children }) => (
          <Paper
            sx={{
              bgcolor: COLORS.GAMMA_BACKGROUND_02,
              fontSize: 14,
              borderRadius: "12px 12px 12px 12px",
              color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
            }}
          >
            {children}
          </Paper>
        )}
        onInputChange={handleChange}
        options={options.map((option) => option.label)}
        renderInput={(params) => (
          <TextField
            sx={{
              "& input": {
                height: "10px",
                fontSize: 13,
                color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset .Mui-disabled": {
                  borderColor: COLORS.GAMMA_BACKGROUND_02,
                },
                "&:hover fieldset": {
                  borderColor: COLORS.GAMMA_BACKGROUND_02,
                },
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.ALPHA_PRIMARY_PURPLE,
                },
              },
              outline: "none",
              bgcolor: COLORS.GAMMA_BACKGROUND_02,
              borderRadius: "8px",
            }}
            {...params}
            placeholder="-Select-"
          />
        )}
      />
    </Box>
  );
}

export default CustomAutoCompleteFreeSolo;
