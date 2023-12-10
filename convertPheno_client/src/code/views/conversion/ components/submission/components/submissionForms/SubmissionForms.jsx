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
import toast from "react-hot-toast";

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

  const conversionCanBeStarted = () => {
    // what is this for?
    const trueVals = Object.values(outputFormats).filter((value) => value);
    if (trueVals.length === 0) {
      // TODO
      // show an error toast
      return false;
    }
    if (runExampleData || filesUploadFinished) return true;
  };

  const handleStartConversionClicked = () => {
    if (runExampleData) {
      setStartFileConversion(true);
      return;
    }

    if (inputFormat === "omop") {
      const fileName = Object.keys(uploadedFiles)[0];
      if (!fileName.endsWith(".sql") || !fileName.endsWith(".gz")) {
        toast.error("Please upload a .sql or sql.gz file");
        return;
      }
    }

    if(["bff", "pxf"].includes(inputFormat)) {
      if (Object.keys(uploadedFiles).length > 1) {
        toast.error("Only one json file is expected");
        return;
      }
      const fileName = Object.keys(uploadedFiles)[0];
      if (!fileName.endsWith(".json")) {
        toast.error("Please upload a .json file");
        return;
      }
    }

    if (["redcap", "cdisc"].includes(inputFormat)) {
      if (Object.keys(uploadedFiles).length < 3) {
        toast.error("Please upload all required files");
        console.log(uploadedFiles);
        return;
      }

      // if cdisc check if at least one of the files is a .xml file
      if (inputFormat === "cdisc") {
        const fileNames = Object.keys(uploadedFiles);
        const xmlFileNames = fileNames.filter((fileName) =>
          fileName.endsWith(".xml")
        );
        if (xmlFileNames.length === 0) {
          toast.error("One of the files must be a .xml file");
          return;
        }
      }
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
            enabled={conversionCanBeStarted()}
            onClick={handleStartConversionClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}
