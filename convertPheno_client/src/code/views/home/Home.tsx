/**
  Home component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

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
          <Typography
            variant={"body2"}
            style={{
              margin: "0px 0px 20px 0px",
              fontSize: "16px",
            }}
          >
            Playground Version
          </Typography>
          <Typography
            variant={"body2"}
            style={{
              margin: "0px 0px 20px 0px",
              fontSize: "16px",
            }}
          >
            {" "}
            To log in, use the following credentials:
          </Typography>
          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant={"body2"}
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              User:
            </Typography>
            <Typography variant={"body2"} style={{ fontSize: "16px" }}>
              convert{" "}
            </Typography>
          </Box>
          <Box
            display="flex"
            gap="0.6rem"
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography
              variant={"body2"}
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Password:
            </Typography>
            <Typography variant={"body2"} style={{ fontSize: "16px" }}>
              pheno
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFA500",
              margin: "20px 20px 20px 20px",
              fontSize: { xs: "12px", sm: "16px", md: "20px" },
              padding: {
                xs: "20px 8px 20px 8px",
                sm: "20px 20px 20px 20px",
                md: "20px 100px 20px 100px",
              },
            }}
          >
            <NavLink
              to={{ pathname: "/conversion/" }}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant={"body2"}
                style={{
                  color: "#1E1E1E",
                  fontWeight: "bold",
                }}
              >
                Login
              </Typography>
            </NavLink>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
