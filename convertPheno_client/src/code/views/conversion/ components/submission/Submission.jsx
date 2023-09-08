/**
  Submission component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import useFileConversions from "./hooks/fileConversions";
import LoadingBackdrop from "./components/loadingBackdrop/LoadingBackdrop";
import SubmissionSummary from "./components/submissionSummary/SubmissionSummary";
import SubmissionForms from "./components/submissionForms/SubmissionForms";
import ErrorModal from "./components/modals/errorModal";

export default function Submission(props) {
  const {
    outputFormats,
    setOutputFormats,
    conversionFinished,
    setConversionFinished,
    jobId,
    previousJobData,
    setJsonDataKeys,
  } = props;

  const [inputFormat, setInputFormat] = useState("redcap");
  const [runExampleData, setRunExampleData] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [startFileConversion, setStartFileConversion] = useState(false);
  const [error, setError] = useState(false);
  const [retryTime, setRetryTime] = useState(10);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { status, data } = useFileConversions({
    startFileConversion,
    query: {
      uploadedFiles,
      inputFormat,
      outputFormats,
      runExampleData,
    },
    onSuccessSetters: {
      setStartFileConversion,
      setConversionFinished,
      setJsonDataKeys,
    },
  });

  const handleNewConversion = () => {
    queryClient.resetQueries();
    setConversionFinished(false);
    setUploadedFiles([]);
    navigate("/conversion");
  };

  const showSubmissionSummary = conversionFinished || previousJobData;


  // TODO
  // suggestion by ChatGPT how to reset the ratelimit
  https://chat.openai.com/share/352d4b4e-85d9-4217-9274-58554de8453c

  // const handleOpenErrorModal = (message, retryTime) => {
  //   setErrorMessage(message);
  //   setRetryTime(retryTime);
  //   setIsErrorModalOpen(true);
  // };

  const onErrorModalClose = () => {
    setError(false);
  };

  return (
    <>
      <ErrorModal error={error} onClose={onErrorModalClose} />
      <LoadingBackdrop
        open={startFileConversion}
        status={status}
        setStartFileConversion={setStartFileConversion}
      />
      {showSubmissionSummary ? (
        <SubmissionSummary
          inputFormat={inputFormat}
          outputFormats={outputFormats}
          status={status}
          data={data === undefined ? previousJobData.data : data}
          uploadedFiles={uploadedFiles}
          handleNewConversion={handleNewConversion}
          jobId={jobId}
          loadPreviousResults={data === undefined}
        />
      ) : (
        <SubmissionForms
          states={{
            inputFormat,
            outputFormats,
            status,
            data,
            uploadedFiles,
            runExampleData,
            startFileConversion,
          }}
          setters={{
            setInputFormat,
            setOutputFormats,
            setUploadedFiles,
            setStartFileConversion,
            setRunExampleData,
            setError,
          }}
        />
      )}
    </>
  );
}
