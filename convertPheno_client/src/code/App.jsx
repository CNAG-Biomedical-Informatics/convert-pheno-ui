/**
  Runs the application and renders the main components.

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React, { useEffect, useContext, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Box, Grid } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import Login from "./Login";
import auth from "./Auth";

import Home from "./views/home/Home";
import Conversion from "./views/conversion/Conversion";

import Header from "./header/Header";

const security = import.meta.env.VITE_SECURITY;

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
          enabled={route.security}
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
            enabled={route.security}
          />
        }
      />
    </Route>
  ));
}

const AuthenticatedRoute = ({ element: Component, enabled, path }) => {
  const navigate = useNavigate();
  const isAuthenticated = auth.user.authenticated === true || !enabled;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { redirect: path } });
    }
  }, [auth.user.authenticated, navigate]);

  return isAuthenticated ? <Component /> : null;
};

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [authenticated, setAuthenticated] = useState(false);

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
