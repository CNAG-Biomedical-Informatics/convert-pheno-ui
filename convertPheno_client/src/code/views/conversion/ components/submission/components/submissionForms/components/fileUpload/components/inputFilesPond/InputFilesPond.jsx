/**
  Filepond component

  This file is part of convert-pheno-ui

  Last modififed: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState } from "react";
import auth from "../../../../../../../../../../Auth";
import {
  Button,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import {toast} from "react-toastify";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);

const api_endpoint =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_API_URL
    : import.meta.env.VITE_API_URL;

function CustomAlert(props) {
  const { info } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="">
        <IconButton onClick={handleClick}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Info"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {info.map((item) => (
              <Typography key={`${item}-text`}>{item}</Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function InputFilesPond(props) {
  const {
    setUploadedFiles,
    setFilesUploadFinished,
    setRunExampleData,
    inputFormat,
    uploadedFiles
  } = props;

  const [files, setFiles] = useState([]);

  const handleFileUploadFinished = (_, file) => {
    /*
    handleFileUploadFinished function

    Props:
      - file (object): File object that was uploaded

    Functionality:
      - tries to infer based on the file name and extension the file type
        (input file, dictionary, mapping file)

        Purpose:
        - To update the state uploadedFiles with the file that was uploaded
    */

    const returnedFileName = JSON.parse(file.serverId).tempFilename;
    const {filename, fileExtension} = file;

    if (filename in uploadedFiles) {
      toast.error("File already uploaded");
      file.setMetadata("processingAborted", true)
      file.abortProcessing();
      return;
    }

    let fileType = "input-file";
    if (filename.includes("dictionary") && fileExtension === "csv") {
      fileType = "redcap-dictionary";
    } else if (
      filename.includes("mapping") &&
      ["yaml", "yml", "json"].includes(fileExtension)
    ) {
      fileType = "mapping-file";
    }

    setUploadedFiles((prev) => {
      return {
        ...prev,
        [filename]: [fileType, returnedFileName],
      };
    });
  };

  const handleAllFilesUploadFinished = () => {
    setFilesUploadFinished(true);
  };

  const getFileUploadInfo = (inputFormat) => {
    // better get that config from a config file
    const fileTypeToExpected = {
      redcap: {
        fileCount: 3,
        files: ["Input", "Dictionary", "Mapping"],
        fileExtensions: ["csv", "tsv", "txt", "yaml", "yml", "json"],
        info: [
          "The input-file & dictionary can be a .csv, .tsv or .txt",
          "Make sure that the input and the dictionary have the same separator",
          "mapping-file can be .yaml, .yml or .json",
        ],
      },
      bff: {
        fileCount: 1,
        files: ["Input-file"],
        fileExtensions: ["json"],
        info: ["input has to be a .json"],
      },
      omop: {
        fileCount: 1,
        files: ["Input-file"],
        fileExtensions: ["sql", "gz"],
        info: ["input has to be a .sql or .gz"],
      },
      cdisc: {
        fileCount: 3,
        files: ["Input", "Dictionary", "Mapping"],
        fileExtensions: ["xml", "csv", "tsv", "txt", "yaml", "yml", "json"],
        info: [
          "The input-file has to be a .xml",
          "The dictionary can be a .csv, .tsv or .txt",
          "mapping-file can be .yaml, .yml or .json",
        ],
      },
    };
    fileTypeToExpected.pxf = fileTypeToExpected.bff;

    const text = [fileTypeToExpected[inputFormat].info.join(", ")];

    fileTypeToExpected[inputFormat].infoText = text;
    fileTypeToExpected[inputFormat].label = [
      "Drag/Drop or <span class='filepond--label-action'>Browse</span>: <br />",
      `${fileTypeToExpected[inputFormat].files.join(" & ")}`,
    ];
    return fileTypeToExpected[inputFormat];
  };

  // TODO
  // should be in a config file
  const allowMultipleMapping = {
    redcap: true,
    bff: false,
    pxf: false,
    omop: false,
    cdisc: true,
  };

  const acceptedFileTypesMapping = {
    redcap: [
      "application/json",
      "text/csv",
      "text/tsv",
      "text/plain",
      "application/x-yaml",
      ".yaml",
      ".yml",
    ],
    bff: ["application/json"],
    pxf: ["application/json"],
    omop: [
      "application/sql",
      "application/x-sql",
      "application/x-gzip",
      "application/gzip",
    ],
    cdisc: [
      "application/json",
      "application/x-yaml",
      "text/csv",
      "text/plain",
      "text/tsv",
      "text/xml",
      ".yaml",
      ".yml",
    ],
  };

  const expectedFileExtensionsMapping = {
    redcap: "Expect .txt, .c/tsv, .y(a)ml, .json",
    bff: "Expect .json",
    pxf: "Expect .json",
    omop: "Expect .sql(.gz)",
    cdisc: "Expect .txt, .c/tsv, .y(a)ml, .json, .xml",
  };

  const errorHandling = (response) => {
    const responseObj = JSON.parse(response);
    toast.error(responseObj.message);
  };

  return (
    <Grid container>
      <Grid item xs={11}>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={allowMultipleMapping[inputFormat]}
          maxFiles={getFileUploadInfo(inputFormat).fileCount}

          server={{
            url: `${api_endpoint}api/submission/upload`,
            timeout: 7000, // 7 seconds
            process: {
              headers: {
                Authorization: auth.getToken(),
                "X-Custom-InputFormat": inputFormat,
              },
              onerror: (response) => {
                errorHandling(response);
              },
            },
            revert: {
              headers: { Authorization: auth.getToken() },
            },
          }}
          name="files"
          labelIdle={getFileUploadInfo(inputFormat).label.join("")}
          onaddfile={() => {
            setRunExampleData(false);
          }}
          onprocessfile={handleFileUploadFinished}
          onprocessfiles={handleAllFilesUploadFinished}
          onremovefile={(_, file) => {
            setFilesUploadFinished(false);
            const fileName = file.filename;

            // only update state if the file processing was finished (status 2 = IDLE)
            // for reference see
            // github.com/pqina/filepond-docs/blob/master/content/patterns/API/filepond-object.md#filestatus-enum
            if (file.status === 2 && file.getMetadata("processingAborted") !== true) {
              setUploadedFiles((prev) => {
                const prevCopy = { ...prev };
                delete prevCopy[fileName];
                return prevCopy;
              });
            }
          }}
          // option provided by plugins
          acceptedFileTypes={acceptedFileTypesMapping[inputFormat]}
          fileValidateTypeLabelExpectedTypes={
            expectedFileExtensionsMapping[inputFormat]
          }
          // this should be a prop
          // so large file are only expected for OMOP (sqls)
          maxFileSize="1000MB"
          labelMaxFileSize="Maximum file size is 1GB"
        />
      </Grid>
      <Grid item xs={1}>
        <CustomAlert info={getFileUploadInfo(inputFormat).info} />
      </Grid>
    </Grid>
  );
}
