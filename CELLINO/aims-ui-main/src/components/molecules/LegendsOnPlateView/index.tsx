// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { COLORS } from "../../../theme/Colors";
import CircleIcon from "@mui/icons-material/Circle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ReactNode } from "react";

interface ILegendProps {
  icon: ReactNode;
  typography: string;
}

const IconTypography = ({ icon, typography }: ILegendProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon}
      <Typography
        variant="body4"
        sx={{ color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS, marginLeft: "3px" }}
      >
        {typography}
      </Typography>
    </Box>
  );
};

export default function LegendsOnPlateView() {
  return (
    <div css={{ display: "grid", gridAutoFlow: "column", gap: 15 }}>
      <IconTypography
        icon={
          <CircleIcon
            sx={{
              color: COLORS.BETA_TEXT_LOW_EMPHASIS,
              width: "12px",
              height: "12px",
            }}
          />
        }
        typography="Not started"
      />
      <IconTypography
        icon={
          <CircleIcon
            sx={{
              color: COLORS.BETA_SECONDARY_ACCENT_YELLOW,
              width: "12px",
              height: "12px",
            }}
          />
        }
        typography="In review"
      />
      <IconTypography
        icon={
          <CheckBoxIcon
            sx={{
              color: COLORS.BETA_SECONDARY_ACCENT_GREEN,
              fontSize: "24px",
            }}
          />
        }
        typography="Completed"
      />
    </div>
  );
}
