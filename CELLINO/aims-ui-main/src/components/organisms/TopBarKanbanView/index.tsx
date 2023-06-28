// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { COLORS } from "../../../theme/Colors";
import { AppBar } from "@mui/material";

export default function TopBarKanbanView({
  label = "Dashboard",
}: {
  label?: string;
}) {
  return (
    <AppBar
      position="static"
      sx={{
        height: "88px !important",
        backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
        borderBottom: `2px solid ${COLORS.GAMMA_BACKGROUND_04}`,
      }}
      elevation={0}
    >
      <Toolbar sx={{ height: "100%" }}>
        <div
          css={{
            paddingLeft: 8,
          }}
        >
          <Typography
            variant={"subtitle4"}
            color={COLORS.BETA_TEXT_MEDIUM_EMPHASIS}
          >
            {label}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
