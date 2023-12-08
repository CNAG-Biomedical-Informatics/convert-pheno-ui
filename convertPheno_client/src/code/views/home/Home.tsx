/**
  Home component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import auth from "../../Auth";

const buttonStyle = {
  backgroundColor: "#FFA500",
  margin: "20px 20px 20px 20px",
  fontSize: { xs: "12px", sm: "16px", md: "20px" },
  padding: {
    xs: "20px 8px 20px 8px",
    sm: "20px 20px 20px 20px",
    md: "20px 100px 20px 100px",
  },
};

function StyledTypography(props: any) {
  return (
    <Typography
      variant={"body2"}
      style={{
        margin: "0px 0px 20px 0px",
        fontSize: "16px",
      }}
    >
      {props.text}
    </Typography>
  );
}

function StyledButtonTypography(props: any) {
  return (
    <Typography
      variant={"body2"}
      style={{
        color: "#1E1E1E",
        fontWeight: "bold",
      }}
    >
      {props.text}
    </Typography>
  );
}

const InfoBox = ({ label, value }) => {
  return (
    <Box
      display="flex"
      gap="0.5rem"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="body2"
        style={{ fontWeight: "bold", fontSize: "16px" }}
      >
        {label}:
      </Typography>
      <Typography variant="body2" style={{ fontSize: "16px" }}>
        {value}
      </Typography>
    </Box>
  );
};

const UserInfo = () => {
  return (
    <>
      <InfoBox label="User" value="convert" />
      <InfoBox label="Password" value="pheno" />
    </>
  );
};

export default function Home() {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box textAlign={"center"}>
          <Typography variant={"h4"}>Welcome to Convert-Pheno</Typography>
          <Typography variant={"h5"}>
            {" "}
            Your interactive tool for interconverting pheno-clinical data
            formats
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4} md={12}>
        <Box
          sx={{
            textAlign: "center",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(56, 56, 56, 0.2)"
                : "#F2F2F2",
            margin: {
              xs: "10px 50px 0px 50px",
              sm: "10px 200px 0px 200px",
              md: "10px 400px 0px 400px",
            },
            padding: {
              xs: "5px 0px 5px 0px",
              sm: "10px 0px 10px 0px",
              md: "20px 0px 20px 0px",
            },
          }}
        >
          <StyledTypography text="Playground Version" />
          {auth.user.authenticated ? (
            <>
              <StyledTypography
                text={`You are logged in with the user: ${auth.getUserName()}`}
              />
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => auth.user.keycloak.logout()}
              >
                <StyledButtonTypography text="Logout" />
              </Button>
            </>
          ) : (
            <>
              <StyledTypography text="To log in, use the following credentials:" />
              <UserInfo />
              <NavLink
                to={{ pathname: "/conversion/" }}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" sx={buttonStyle}>
                  <StyledButtonTypography text="Login" />
                </Button>
              </NavLink>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
