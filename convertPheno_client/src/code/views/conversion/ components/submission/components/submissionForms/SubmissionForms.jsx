/**
  SubmissionForms component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import FileMappingModal from "./components/fileMappingModal/FileMappingModal";
import FileUpload from "./components/fileUpload/FileUpload";
import OutputFormatsSelection from "./components/outputFormatsSelection/OutputFormatsSelection";
import { SimpleArrow, ArrowButton } from "./components/arrows/Arrows";
import { toast } from "react-toastify";

export default function SubmissionForms(props) {
  const { states, setters } = props;
  const { inputFormat, outputFormats, uploadedFiles, runExampleData } = states;
  const {
    setInputFormat,
    setOutputFormats,
    setUploadedFiles,
    setRunExampleData,
    setStartFileConversion,
  } = setters;

  const [openModal, setOpenModal] = useState(false);
  const [filesUploadFinished, setFilesUploadFinished] = useState(false);
  const [conversionCanBeStarted, setConversionCanBeStarted] = useState(false);

  const renderToast = (opts) => {
    const { id, message } = opts;
    if (toast.isActive(id)) {
      return;
    }
    toast.error(message, { toastId: id });
  };

  useEffect(() => {
    let preselectedOutputFormats = ["bff", "pxf"];
    switch (inputFormat) {
      case "bff":
        preselectedOutputFormats = ["pxf"];
        break;
      case "pxf":
        preselectedOutputFormats = ["bff"];
        break;
    }
    const newOutputFormats = {};
    Object.keys(outputFormats).forEach((key) => {
      newOutputFormats[key] = preselectedOutputFormats.includes(key);
    });
    setOutputFormats(newOutputFormats);
  }, [inputFormat]);

  useEffect(() => {
    // check if conversion can be started
    const isOutputFormatSelected = () =>
      Object.values(outputFormats).some((value) => value);

    const showToast = (id, message) => {
      console.log("uploadFiles", uploadedFiles);
      renderToast({ id, message });
      setConversionCanBeStarted(false);
    };

    const getFileExtension = (fileName) => fileName.split(".").pop();

    const validateFileExtensions = (expectedExtensions, inputFormat) => {
      const fileNames = Object.keys(uploadedFiles);
      const fileExtensions = fileNames.map(getFileExtension);

      if (
        inputFormat === "cdisc" &&
        fileExtensions.filter((ext) => ext === "xml").length !== 1
      ) {
        showToast("oneXmlFileExpected", "One xml file is expected");
        return false;
      }

      if (
        fileNames.some(
          (fileName) => !expectedExtensions.includes(getFileExtension(fileName))
        )
      ) {
        showToast(
          "unacceptedFileExtension",
          "One or more files have an unacceptable file extension"
        );
        return false;
      }
      return true;
    };

    if (!isOutputFormatSelected()) {
      setConversionCanBeStarted(false);
      return;
    }

    if (runExampleData) {
      setConversionCanBeStarted(true);
      return;
    }

    const acceptedFileExtensions = ["txt", "tsv", "csv", "yaml", "yml", "json"];
    const inputFormatsNeedingSingleFile = ["bff", "pxf", "omop"];
    const fileCount = Object.keys(uploadedFiles).length;

    if (["cdisc", "redcap"].includes(inputFormat)) {
      const cdiscFileExtensions =
        inputFormat === "cdisc"
          ? [...acceptedFileExtensions, "xml"]
          : acceptedFileExtensions;

      if (fileCount < 3) {
        setConversionCanBeStarted(false);
        return;
      }

      if (!validateFileExtensions(cdiscFileExtensions, inputFormat)) return;
    }

    if (inputFormatsNeedingSingleFile.includes(inputFormat)) {
      if (fileCount === 0) {
        setConversionCanBeStarted(false);
        return;
      }

      if (fileCount > 1) {
        showToast("onlyOneFileExpected", "Only one file is expected");
        return;
      }

      const fileName = Object.keys(uploadedFiles)[0];
      if (["bff", "pxf"].includes(inputFormat) && !fileName.endsWith(".json")) {
        showToast("jsonFileExpected", "Please upload a .json file");
        return;
      }

      if (
        inputFormat === "omop" &&
        !fileName.endsWith(".sql") &&
        !fileName.endsWith(".gz")
      ) {
        showToast("sqlOrGzFileExpected", "Please upload a .sql or sql.gz file");
        return;
      }
    }
    setConversionCanBeStarted(filesUploadFinished);
  }, [
    inputFormat,
    outputFormats,
    uploadedFiles,
    runExampleData,
    filesUploadFinished,
  ]);

  const handleStartConversionClicked = () => {
    if (runExampleData) {
      setStartFileConversion(true);
      return;
    }

    if (["redcap", "cdisc"].includes(inputFormat)) {
      setOpenModal(true);
      return;
    }
    setStartFileConversion(true);
  };

  return (
    <>
      <FileMappingModal
        open={openModal}
        setOpen={setOpenModal}
        setStartFileConversion={setStartFileConversion}
        setUploadedFiles={setUploadedFiles}
        uploadedFiles={uploadedFiles}
      />
      <Grid container>
        <Grid item xs={4} paddingLeft={5}>
          <FileUpload
            inputFormat={inputFormat}
            filesUploadFinished={filesUploadFinished}
            runExampleData={runExampleData}
            uploadedFiles={uploadedFiles}
            setInputFormat={setInputFormat}
            setRunExampleData={setRunExampleData}
            setUploadedFiles={setUploadedFiles}
            setFilesUploadFinished={setFilesUploadFinished}
          />
        </Grid>
        <Grid item xs={1} align="center">
          <SimpleArrow />
        </Grid>
        <Grid item xs={2} align="center">
          <OutputFormatsSelection
            outputFormats={outputFormats}
            notAllowedSelection={inputFormat}
            setOutputFormats={setOutputFormats}
          />
        </Grid>
        <Grid item xs={1} align="center">
          <ArrowButton
            enabled={conversionCanBeStarted}
            onClick={handleStartConversionClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}
