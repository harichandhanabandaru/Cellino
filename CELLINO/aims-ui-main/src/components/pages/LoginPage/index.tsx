import { Box, Button, Grid, SvgIcon, Typography } from "@mui/material";
import { COLORS } from "../../../theme/Colors";
import Page from "../Page";
import { useEffect, useState } from "react";
import { ReactComponent as GoogleLogo } from "../../../assets/GoogleLogo.svg";
import "../../../i18n/config";
import { useTranslation } from "react-i18next";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import React from "react";

export function LoginPage() {
  // let navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  // const onSuccess = (tokenResponse: any) => {
  //   console.log(tokenResponse);
  //   setLoggedIn(true);
  //   navigate("/app/image-viewer");
  // };
  // const login = useGoogleLogin({
  //   onSuccess: onSuccess,
  // });

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  };

  const { height } = useWindowSize();

  const { t } = useTranslation(["loginPage"]);

  return (
    <Page title="Login Page">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        height={height}
        overflow="hidden"
      >
        <Grid item xs={4}>
          <img
            src={require("../../../assets/LoginPageImage.jpg")}
            height={height}
            alt={"login"}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={6}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle2">Sign In</Typography>
            <Typography
              variant="body1"
              color={COLORS.BETA_TEXT_LOW_EMPHASIS}
              sx={{
                marginTop: "25px",
              }}
            >
              {t("loginPage:welcomeText1")}
              <br />
              {t("loginPage:welcomeText2")}
            </Typography>
            <Button
              startIcon={
                <SvgIcon sx={{ marginLeft: "-15px" }} component={GoogleLogo} />
              }
              disableRipple
              sx={{
                width: "255px",
                height: "58px",
                backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                color: COLORS.BETA_TEXT_LOW_EMPHASIS,
                border: "none",
                "&:hover": {
                  backgroundColor: COLORS.GAMMA_BACKGROUND_02,
                  color: COLORS.BETA_TEXT_LOW_EMPHASIS,
                  border: "none",
                },
                borderRadius: "10px",
                marginTop: "30px",
                fontWeight: 500,
                fontSize: "16px",
              }}
              variant="outlined"
              onClick={
                () => null
                // login()
              }
            >
              Sign In with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}

export default LoginPage;
