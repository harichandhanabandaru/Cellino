import { Typography, MenuItem, Select } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "../../../theme/Colors";

export interface DropDownProps {
  options: string[] | { name: string; disabled: boolean }[];
  defaultValue?: string;
  handleChange: (e: any) => void;
  value: string;
  width?: string;
}

export const DropDown: React.FC<DropDownProps> = ({
  options = [],
  defaultValue,
  handleChange,
  value,
  width,
}) => {
  return (
    <Select
      IconComponent={KeyboardArrowDownIcon}
      defaultValue={defaultValue}
      value={value}
      variant="standard"
      disableUnderline={true}
      renderValue={(selected: string) => {
        return (
          <Typography
            variant="body5"
            sx={{
              color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
              paddingLeft: "10px",
            }}
          >
            {selected}
          </Typography>
        );
      }}
      onChange={handleChange}
      sx={{
        width: width ?? "105px",
        borderRadius: "10px",
        backgroundColor: COLORS.GAMMA_BACKGROUND_02,
        "& .MuiPaper-root": {
          boxShadow: "0",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: "8px 8px 8px 8px",
          },
        },
        MenuListProps: {
          disablePadding: true,
        },
      }}
    >
      {options.map((item: any) => (
        <MenuItem
          key={item?.name ?? item}
          value={item?.name ?? item}
          disabled={item?.disabled ?? false}
          disableRipple
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
          <Typography variant="body5">{item?.name ?? item}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropDown;
