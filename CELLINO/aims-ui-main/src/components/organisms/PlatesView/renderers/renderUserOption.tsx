import {
  AutocompleteRenderOptionState,
  Avatar,
  Box,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import { COLORS } from "../../../../theme/Colors";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { formatName, getInitials } from "../../../../utils/formatName";

export interface UserFilterData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role?: string | null;
  imgSrc?: string;
}

const LINES_TO_SHOW = 1;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**
 * Custom Rendering Component for rendering User with their role.
 */
export const renderUserOption = (
  optionProps: React.HTMLAttributes<HTMLLIElement>,
  option: UserFilterData,
  state: AutocompleteRenderOptionState
) => {
  return (
    <li {...optionProps} key={option.id}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "-5px",
          width: "100%",
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
        <Avatar
          sx={{
            backgroundColor: COLORS.ALPHA_PRIMARY_PURPLE,
          }}
        >
          {getInitials(option?.firstName || "", option?.lastName || "")}
        </Avatar>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "row",
            paddingLeft: "5%",
            width: "100%",
          }}
        >
          <Tooltip
            title={formatName(option?.firstName || "", option?.lastName || "")}
            followCursor
            arrow
          >
            <Typography
              variant="subtitle5"
              color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
              sx={{
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: LINES_TO_SHOW,
                WebkitBoxOrient: "vertical",
              }}
            >
              {formatName(option?.firstName || "", option?.lastName || "")}
            </Typography>
          </Tooltip>
          {option?.role && (
            <Tooltip title={option.role} followCursor arrow>
              <Typography variant="body4" color={COLORS.BETA_TEXT_LOW_EMPHASIS}>
                {option.role}
              </Typography>
            </Tooltip>
          )}
        </div>
      </Box>
    </li>
  );
};
