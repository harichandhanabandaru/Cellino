import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { COLORS } from "../../../theme/Colors";

const CustomInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 6,
    position: "relative",
    backgroundColor: COLORS.GAMMA_BACKGROUND_02,
    fontSize: 12,
    padding: "10px 12px",
    "&:focus": {
      border: "none",
      borderRadius: 6,
    },
  },
}));

function CustomSelect({
  label,
  value,
  options,
  onChange,
  isDisabled,
}: {
  label: string;
  value?: string;
  options: { label: string; value: string }[];
  onChange: (arg: string) => void;
  isDisabled?: boolean;
}) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue("");
    }
  }, [value]);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );
  return (
    <FormControl variant="standard">
      <InputLabel
        shrink
        sx={{
          color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
        }}
      >
        <Typography
          variant={"overline"}
          textTransform={"none"}
          fontSize="16px"
          color={COLORS.BETA_TEXT_LOW_EMPHASIS}
        >
          {label}
        </Typography>
      </InputLabel>
      <Select
        sx={{
          minWidth: "172px",
        }}
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        input={<CustomInput />}
        value={selectedValue}
        disabled={isDisabled}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: COLORS.GAMMA_BACKGROUND_02,
              borderRadius: "8px 8px 8px 8px",
            },
          },
          MenuListProps: {
            disablePadding: true,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            value={option.value}
            sx={{
              "&.Mui-selected": {
                color: COLORS.ALPHA_PRIMARY_PURPLE,
                borderRadius: "8px",
              },
              "&:hover": {
                borderRadius: "8px",
              },
            }}
          >
            <Typography variant={"caption1"}>{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
