/** 
  Output Formats Selection component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

export default function OutputFormatsSelection(props) {
  const { outputFormats, setOutputFormats, notAllowedSelection } = props;

  const checkboxNameToLabelMappings = {
    bff: "BFF (Beacon v2)",
    pxf: "PXF (Phenopackets v2)",
    omop: "OMOP-CDM (coming soon)",
  };

  useEffect(() => {
    if (outputFormats[notAllowedSelection]) {
      setOutputFormats((prevState) => {
        return {
          ...prevState,
          [notAllowedSelection]: false,
        };
      });
    }
  }, [notAllowedSelection]);

  const changeHandler = (event) => {
    setOutputFormats({
      ...outputFormats,
      [event.target.name]: event.target.checked,
    });
  };

  const checkAllBoxes = () => {
    setOutputFormats({
      bff: true,
      pxf: true,
      omop: false,
    });
  };

  if (outputFormats === undefined) {
    return null;
  }

  return (
    <>
      <Grid container paddingLeft={5}>
        <Typography variant="h6">Output Format(s)</Typography>
        <Button onClick={checkAllBoxes}>(all)</Button>
      </Grid>
      <FormControl component="fieldset">
        <FormGroup>
          {Object.keys(checkboxNameToLabelMappings).map((key) => {
            let checkboxProps = {
              name: key,
              onChange: changeHandler,
              checked: key !== notAllowedSelection && outputFormats[key],
            };
            if (key === "omop" || key === notAllowedSelection) {
              checkboxProps = {
                ...checkboxProps,
                disabled: true,
              };
            }
            return (
              // TODO
              // the labels are the wrong font size
              <FormControlLabel
                key={key}
                control={<Checkbox {...checkboxProps} />}
                label={
                  <Typography variant="body2">
                    {checkboxNameToLabelMappings[key]}
                  </Typography>
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </>
  );
}
