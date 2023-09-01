/**
  Conversion component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Submission from "./ components/submission/Submission";
import ClinicalData from "./ components/clinicalData/ClinicalData";
import useFinishedJobs from "./hooks/finishedJobs";

// TODO
// Make a more user friendly ErrorFallback component
// javascript error messages should not be shown to the user
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export default function Conversion() {
  const { jobId } = useParams();

  const [outputFormats, setOutputFormats] = useState({
    bff: true,
    pxf: false,
    omop: false,
  });

  const [conversionFinished, setConversionFinished] = useState(false);
  const {
    status,
    data: previousJobData,
    error,
  } = useFinishedJobs({
    query: { jobId },
    conversionFinished,
  });

  useEffect(() => {
    if (jobId) {
      setConversionFinished(false);
    }
  }, [jobId]);

  const showJobLoading = jobId && status === "loading" && !conversionFinished;
  const showClinicalData = status === "success" || conversionFinished;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {showJobLoading && <Typography variant="h6">Loading...</Typography>}
      {error ? (
        <Typography variant="h6">Error: {error.message}</Typography>
      ) : (
        <>
          <Submission
            outputFormats={outputFormats}
            setOutputFormats={setOutputFormats}
            setConversionFinished={setConversionFinished}
            conversionFinished={conversionFinished}
            jobId={jobId}
            previousJobData={previousJobData}
          />
          {showClinicalData && (
            <Box sx={{ padding: "0px 20px 00px 20px" }}>
              <ClinicalData
                jobId={jobId}
                outputFormats={
                  previousJobData === undefined
                    ? outputFormats
                    : previousJobData.data.outputFormats.reduce(
                        (obj, item) => ({ ...obj, [item]: true }),
                        {}
                      )
                }
              />
            </Box>
          )}
        </>
      )}
    </ErrorBoundary>
  );
}
