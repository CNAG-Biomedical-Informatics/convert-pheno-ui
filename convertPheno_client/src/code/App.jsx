/**
  Runs the application and renders the main components.

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useEffect, useContext, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Box, Grid } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import Login from "./Login";
import auth from "./Auth";

import Home from "./views/home/Home";
import Conversion from "./views/conversion/Conversion";
import About from "./views/about/About";

import Header from "./header/Header";

const security =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_SECURITY
    : import.meta.env.VITE_SECURITY;

const matomoUrl =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_MATOMO_URL
    : import.meta.env.MATOMO_TAG_MANAGER_URL;

if (security !== "true" && security !== "false") {
  throw new Error(
    "The security variable must be a string of either 'true' or 'false'"
  );
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
function ErrorFallback({ error, resetErrorBoundary }) {
  if (process.env.NODE_ENV !== "production") {
    return (
      <div role="alert" class="center">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  return <Navigate to="/home" />;
}

const routes = [
  {
    path: "/",
    component: Home,
    security,
  },
  {
    path: "/conversion",
    component: Conversion,
    security,
  },
  {
    path: "/about",
    component: About,
    security: "false",
  },
];

function renderRoutes() {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <AuthenticatedRoute
          key={route.path}
          path={route.path}
          element={route.component}
          security={route.security}
        />
      }
    >
      <Route
        key={`${route.path}_id`}
        path={":jobId"}
        element={
          <AuthenticatedRoute
            key={route.path}
            path={`${route.path}/:jobId`}
            element={route.component}
            security={route.security}
          />
        }
      />
    </Route>
  ));
}

function AuthenticatedRoute({ element: Component, path, security }) {
  const navigate = useNavigate();
  const isAuthenticated = security === "false" || auth.user.authenticated;
  const params = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      if ("jobId" in params) {
        path = `${path}/${params.jobId}`;
      }
      navigate("/login", { state: { redirect: path } });
    }
  }, [auth.user.authenticated, navigate]);

  return isAuthenticated ? <Component /> : null;
}

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=matomoUrl; s.parentNode.insertBefore(g,s);
  }, [])

  useEffect(() => {
    if (auth.user.authenticated) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Grid container direction={"row"}>
        <Grid item xs={12}>
          <Header
            toggleColorMode={colorMode.toggleColorMode}
            currentTheme={theme.palette.mode}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
          <Box mt={5}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <Login
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                  />
                }
              />
              {renderRoutes()}
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
const AppWrapper = ({ children, theme }) => {
  document.body.style.backgroundColor = theme.palette.background.default;
  return <div style={{ flexGrow: true }}>{children}</div>;
};

export default function ToggleColorMode() {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <AppWrapper theme={theme}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </AppWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
