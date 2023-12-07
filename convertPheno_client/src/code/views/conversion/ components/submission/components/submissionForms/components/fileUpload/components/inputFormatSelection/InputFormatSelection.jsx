/**
  InputFormatSelection component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";

const renderRadio = (key) => {
  let disabled = false;
  if (key === "openEHR") {
    disabled = true;
  }
  return <Radio key={`${key}-RadioSelector`} disabled={disabled} />;
};

export default function InputFormatSelection(props) {
  const { inputFormat, setInputFormat } = props;

  // TODO
  // get the mapping from the server
  const radioValueToLabelMappings = {
    redcap: "REDCap",
    bff: "BFF (Beacon v2)",
    pxf: "PXF (Phenopackets v2)",
    omop: "OMOP-CDM",
    cdisc: "CDISC-ODM",
    openEHR: "OpenEHR (coming soon)",
  };

  const handleChange = (event) => {
    setInputFormat(event.target.value);
  };

  return (
    <FormControl key={"inputFormat-Selection-FormControl"} component="fieldset">
      <RadioGroup
        key={"inputFormat-Selection"}
        value={inputFormat}
        onChange={handleChange}
        defaultValue="Redcap"
      >
        {Object.keys(radioValueToLabelMappings).map((key) => {
          return (
            <FormControlLabel
              key={`${key}-FormControlLabel`}
              value={key}
              control={renderRadio(key)}
              label={
                <Typography key={`${key}-label`} variant="body2">
                  {radioValueToLabelMappings[key]}
                </Typography>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
