/**
  Helper functions for the Login

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import Keycloak from "keycloak-js";

import auth from "./Auth";
import Home from "./views/home/Home";

// const kcConfig = JSON.parse(import.meta.env.VITE_KC_CONFIG);

const kcConfig =
  process.env.NODE_ENV === "production"
    ? JSON.parse(window.REACT_APP_SECURITY)
    : JSON.parse(import.meta.env.VITE_SECURITY);

const keycloakConfig = {
  realm: kcConfig.realm,
  url: kcConfig["auth-server-url"],
  clientId: kcConfig.resource,
};

const Login = (props) => {
  const { authenticated, setAuthenticated } = props;

  const [keycloak, setKeycloak] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);

    if (state) {
      window.location.href = `${window.location.href}?redirect=${state.redirect}`;
    }

    kc.init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        setKeycloak(kc);
        setAuthenticated(authenticated);
        auth.setToken({
          authenticated,
          keycloak: kc,
        });
        if (!authenticated) {
          return;
        }
        navigate(`../${window.location.href.split("=")[1]}`, { replace: true });
      })
      .catch((error) => {
        console.error("Keycloak init failed:", error);
      });
  }, []);

  if (keycloak) {
    return authenticated ? (
      <Home />
    ) : (
      <Typography variant="body2">Unable to authenticate!</Typography>
    );
  }
  return (
    <Typography variant="body2" sx={{ padding: "0px 0px 0px 20px" }}>
      Authenticating...
    </Typography>
  );
};

export default Login;
