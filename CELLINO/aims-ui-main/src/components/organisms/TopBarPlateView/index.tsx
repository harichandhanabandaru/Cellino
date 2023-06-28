// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */

import Button from "@mui/material/Button";
import { COLORS } from "../../../theme/Colors";
import Typography from "@mui/material/Typography";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../constants";
import { Link } from "react-router-dom";

export default function TopBarPlateView() {
  return (
    <AppBar
      position="static"
      sx={{
        height: "73px !important",
        backgroundColor: COLORS.GAMMA_BACKGROUND_WHITE,
        border: "1px solid #EAE4F0",
        top: 0,
      }}
      elevation={0}
    >
      <Toolbar sx={{ height: "100%" }}>
        <div
          css={{
            paddingLeft: 20,
          }}
        >
          <Button
            disableRipple
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
            component={Link}
            to={ROUTES.PLATES}
          >
            <IconButton>
              <ArrowBackIcon
                sx={{
                  color: COLORS.BETA_TEXT_MEDIUM_EMPHASIS,
                  "&:hover": { color: COLORS.BETA_TEXT_LOW_EMPHASIS },
                }}
              />
            </IconButton>
            <Typography
              sx={{ color: "#27242A", fontWeight: 400, fontSize: "17px" }}
            >
              Back to plates
            </Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
