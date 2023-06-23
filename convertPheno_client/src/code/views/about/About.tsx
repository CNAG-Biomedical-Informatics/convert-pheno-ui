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
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";

// Idea mouse over should show social media icons
// eg. GitHub, Twitter, LinkedIn, ResearchGate, Google Scholar, ORCID etc.

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
  {
    name: "IMI",
    url: "https://cnag-biomedical-informatics.github.io/convert-pheno/citation/",
    image:
      "https://cnag-biomedical-informatics.github.io/convert-pheno/img/3tr-funding.png",
  },
];

const ImageComponent = ({ src, alt, href }) => (
  <Grid item>
    <a href={href}>
      <ButtonBase>
        <Paper elevation={2} sx={{ backgroundColor: "white" }}>
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", display: "block" }}
          />
        </Paper>
      </ButtonBase>
    </a>
  </Grid>
);

const CenteredImageButtons = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <Grid container spacing={2} justifyContent="center">
      <ImageComponent
        src="https://solve-rd.eu/wp-content/uploads/2018/05/cnag-300x127.png"
        alt="CNAG"
        href="https://www.cnag.crg.eu/"
      />
      <ImageComponent
        src="https://www.ihi.europa.eu/sites/default/files/styles/teaser_image_horizontal/public/projects/logos/3TR_logo_final.jpg?itok=fDmi4lFR"
        alt="3TR"
        href="https://www.3tr-imi.eu/"
      />
      <ImageComponent
        src="https://cnag-biomedical-informatics.github.io/convert-pheno/img/3tr-funding.png"
        alt="IMI"
        href="https://cnag-biomedical-informatics.github.io/convert-pheno/citation/"
      />
    </Grid>
  </Box>
);

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

      <Grid item xs={12} sm={12}>
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
      </Grid>
      <br />
      <Grid item xs={12} sm={12}>
        <CenteredImageButtons />
      </Grid>
    </Box>
  );
}
