/**
  Submission summary component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InputSummary from "./components/inputSummary/InputSummary";
import OutputSummary from "./components/outputSummary/OutputSummary";
import TriggerNewSubmissionButton from "./components/triggerNewSubmissionButton/TriggerNewSubmissionButton";

export default function SubmissionSummary(props) {
  const {
    status,
    data,
    handleNewConversion,
    inputFormat,
    outputFormats,
    jobId,
    loadPreviousResults,
  } = props;

  const showSubmissionSummary = status === "success" || loadPreviousResults;
  const showLoading = status === "loading" && !loadPreviousResults;
  const showError = status === "error" && !loadPreviousResults;

  const theme = useTheme();
  const backgroundColor = theme.palette.mode === "dark" ? "#272727" : "#F2F2F2";
  return (
    <>
      {showLoading && <p>Loading...</p>}
      {showError === "error" && <p>Error...</p>}
      {showSubmissionSummary && (
        <Grid container sx={{ backgroundColor, padding: "20px 0" }}>
          <Grid item xs={2} sx={{ padding: "0 0 0 35px" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Conversion finished
            </Typography>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                Job ID:
              </span>
              <span style={{ fontSize: "16px", padding: "0 0 0 4px" }}>
                {jobId}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item>
                <InputSummary inputFormat={inputFormat} />
              </Grid>
              <Grid item>
                <OutputSummary data={data} outputFormats={outputFormats} />
              </Grid>
            </Grid>
          </Grid>
          {/* the xs on container level is a trick and causes a warning */}
          {/* <Grid container justifyContent="flex-end"> */}
          <Grid container xs={4} justifyContent="flex-end">
            <TriggerNewSubmissionButton
              handleNewConversion={handleNewConversion}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
