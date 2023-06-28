import {
  AutocompleteRenderOptionState,
  Box,
  Checkbox,
  Typography,
} from "@mui/material";
import { COLORS } from "../../../../theme/Colors";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const LINES_TO_SHOW = 2;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface RunAndPassageFilterData {
  id: string;
  name: string;
}

export const renderRunAndPassageName = (
  optionProps: React.HTMLAttributes<HTMLLIElement>,
  option: RunAndPassageFilterData,
  state: AutocompleteRenderOptionState
) => {
  return (
    <li {...optionProps}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "-5px",
        }}
      >
        <Checkbox
          icon={icon}
          disableRipple
          checkedIcon={checkedIcon}
          checked={state.selected}
          sx={{
            "&.Mui-checked": {
              color: COLORS.ALPHA_PRIMARY_PURPLE,
            },
          }}
        />
        <Typography
          variant="body4"
          width="300px"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: LINES_TO_SHOW,
            WebkitBoxOrient: "vertical",
          }}
        >
          {option.name}
        </Typography>
      </Box>
    </li>
  );
};
