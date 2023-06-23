/**
  Home component

  This file is part of convert-pheno-ui

  Last Modified: Jun/21/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

const teamMembers = [
  {
    name: "Dr. Manuel Rueda",
    role: "Convert-Pheno Perl Module",
  },
  {
    name: "Ivo Christopher Leist",
    role: "Convert-Pheno UI (this web application)",
  },
  {
    name: "Sofia Chavez",
    role: "Design and UX",
  },
  {
    name: "Ivo Gut",
    role: "Biomedical Genomics Group Leader",
  },
];

const logos = [
  {
    name: "CNAG",
    url: "https://www.cnag.crg.eu/",
    image:
      "https://lh4.googleusercontent.com/--THiaUxpKwM/AAAAAAAAAAI/AAAAAAAAAAA/FpbvQedtiXw/s44-p-k-no-ns-nd/photo.jpg",
  },
  {
    name: "3TR",
    url: "https://www.3tr-imi.eu/",
    image:
      "https://www.ihi.europa.eu/sites/default/files/styles/teaser_image_horizontal/public/projects/logos/3TR_logo_final.jpg?itok=fDmi4lFR",
  },
];

export default function About() {
  return (
    <Box textAlign={"center"}>
      <Typography variant="h4">Convert-Pheno</Typography>
      <Typography variant="body1" style={{ marginBottom: "2em" }}>
        is a software toolkit for the interconversion of standard data models
        for phenotypic data. It has been developed at CNAG.
      </Typography>
      <Typography variant="h5">Please cite</Typography>
      <Typography variant="body1" style={{ marginBottom: "2em" }}>
        Rueda, M; Leist, IC et al., "Convert-Pheno: A software toolkit for the
        interconversion of standard data models for phenotypic data". Manuscript
        in preparation.
      </Typography>
      <Typography variant="h5">Developed by</Typography>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {teamMembers.map((member, index) => (
          <Grid item key={index}>
            <Card>
              <CardMedia title={member.name} />
              <CardContent>
                <Typography component="h5" variant="h5">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Link
                component="button"
                variant="h5"
                onClick={() => {
                  window.open(
                    "https://cnag-biomedical-informatics.github.io/convert-pheno/about/",
                    "_blank",
                    "noopener"
                  );
                }}
              >
                Acknowledgements
              </Link>
            </CardContent>
            <Grid container spacing={4}>
              {logos.map((logo, index) => (
                <Link key={index} href={logo.url}>
                  <Grid item xs={12} sm={6} key={index}>
                    <CardMedia
                      component="img"
                      height="140px"
                      image={logo.image}
                      alt={logo.name}
                    />
                  </Grid>
                </Link>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
