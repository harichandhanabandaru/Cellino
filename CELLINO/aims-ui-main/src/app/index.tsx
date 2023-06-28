import { Suspense } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "../apollo/cache";
import { CssBaseline } from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { properties } from "../utils/properties";
import { HelmetProvider } from "react-helmet-async";
import Router from "../routes";
import LinearProgressBarController from "../components/organisms/LinearProgressBarController";
import CookieManager from "../components/organisms/CookieManager";
import { SnackbarProvider } from "notistack";

const GraphQlPath = properties.GRAPHQL_URL;

const client = new ApolloClient({
  uri: `${GraphQlPath}`,
  cache: cache,
});

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    background-color: black;
  }
`;

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <StyledSnackbarProvider>
          <CssBaseline />
          <ApolloProvider client={client}>
            <LinearProgressBarController />
            <CookieManager />
            <Suspense fallback={<div />}>
              <Router />
            </Suspense>
          </ApolloProvider>
        </StyledSnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
