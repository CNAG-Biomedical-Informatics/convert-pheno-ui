/**
  Input Summary

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Box, Typography } from "@mui/material";

// TODO
// render here buttons to download the uploaded files
// render here a button to download all files

export default function InputSummary(props) {
  const { inputFormat } = props;

  const inputFormatMapping = {
    redcap: "RedCap",
    bff: "BFF (Beacon v2)",
    pxf: "PXF (Phenopackets v2)",
    omop: "OMOP-CDM",
    cdisc: "CDISC-ODM",
  };

  return (
    <Box sx={{ padding: "0 0 0 40px" }}>
      <Typography
        variant="body2"
        sx={{ fontSize: "14px", padding: "2px 0px 0px 0" }}
      >
        {"Input Format"}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontSize: "20px", padding: "2px 0px 0px 0" }}
      >
        {inputFormatMapping[inputFormat]}
      </Typography>
    </Box>
  );
}
