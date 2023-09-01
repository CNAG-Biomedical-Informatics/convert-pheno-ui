/**
  OutputSummary

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import {
  DownloadButtons,
  DownloadAllFilesButton,
} from "../downloadButtons/DownloadButtons";

export default function OutputSummary(props) {
  const { data, outputFormats } = props;
  const trueProps = Object.values(outputFormats).filter((value) => value);
  return (
    <Box sx={{ padding: "0 0 0 60px" }}>
      <Typography
        variant="body2"
        sx={{ fontSize: "14px", padding: "2px 0px 4px 0px" }}
      >
        {"Output Format(s)"}
      </Typography>
      <Grid container>
        <Grid item>
          <DownloadButtons data={data} />
        </Grid>
        <Grid item>
          {trueProps.length > 1 && <DownloadAllFilesButton data={data} />}
        </Grid>
      </Grid>
    </Box>
  );
}
