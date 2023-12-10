/**
  FileUpload component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Button, Grid, ToggleButton, Typography } from "@mui/material";

import InputFilesPond from "./components/inputFilesPond/InputFilesPond";
import InputFormatSelection from "./components/inputFormatSelection/InputFormatSelection";
import apiRequest from "../../../../../../../../ApiRequest";

export default function fileUpload(props) {
  const {
    inputFormat,
    filesUploadFinished,
    runExampleData,
    setInputFormat,
    setRunExampleData,
    setUploadedFiles,
    setFilesUploadFinished,
  } = props;

  const triggerFileDownload = async ({ inputFormat }) => {
    // TODO
    // should not be hardcoded
    // but in the config file
    const inputFormatToFileNameMapping = {
      redcap: "redcap.zip",
      bff: "individuals.bff.json",
      pxf: "all.pxf.json",
      omop: "omop_cdm_eunomia.sql.gz",
      cdisc: "cdisc.zip",
    };

    const query = {
      inputFormat,
      downloadName: inputFormatToFileNameMapping[inputFormat],
    };
    await apiRequest(
      "submission/download/example",
      query
    );
  };

  return (
    <>
      <Typography variant="h6">Input Format</Typography>
      <Grid container>
        <Grid item xs={6}>
          <InputFormatSelection
            key={"inputFormat-Selection"}
            inputFormat={inputFormat}
            setInputFormat={setInputFormat}
          />
        </Grid>
        <Grid item xs={6}>
          {/* TODO wrap everything in react-hook-form */}
          <InputFilesPond
            setUploadedFiles={setUploadedFiles}
            setFilesUploadFinished={setFilesUploadFinished}
            setRunExampleData={setRunExampleData}
            inputFormat={inputFormat}
          />
          <ToggleButton
            value="check"
            variant="contained"
            selected={runExampleData}
            color="primary"
            disabled={filesUploadFinished}
            onClick={() => {
              setRunExampleData(true);
            }}
          >
            Use Example Data
          </ToggleButton>

          <Button
            color="primary"
            disabled={filesUploadFinished}
            onClick={() => {
              triggerFileDownload({ inputFormat });
            }}
            sx={{
              padding: "20px 10px 20px 10px",
            }}
          >
            Download Example
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
