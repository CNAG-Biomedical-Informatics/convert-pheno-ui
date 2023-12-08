/**
  Filepond component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

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
    setError,
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

    const fileName = file.filename;
    const extension = fileName.split(".").pop();

    let fileType = "input-file";
    if (fileName.includes("dictionary") && extension === "csv") {
      fileType = "redcap-dictionary";
    } else if (
      fileName.includes("mapping") &&
      ["yaml", "yml", "json"].includes(extension)
    ) {
      fileType = "mapping-file";
    }

    setUploadedFiles((prev) => {
      return {
        ...prev,
        [fileName]: [fileType, returnedFileName],
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
        fileExtensions: ["sql", "sql.gz"],
        info: ["input has to be a .sql or sql.gz"],
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
    const responseCode = responseObj.status_code;
    const limit = responseObj.limit;

    // console.log(responseObj);
    // console.log(responseCode);
    // console.log(typeof responseCode);

    if (responseCode === "429") {
      console.log("limit", limit);

      const splittedLimitText = limit.split(" per ");
      const maxNumberOfFiles = splittedLimitText[0];
      const maxTime = splittedLimitText[1];

      const explanation = `
        You cannot upload more than ${maxNumberOfFiles} file per ${maxTime} minute(s).
        Please wait ${maxTime} minute(s) and then try again.
      `;

      setError({
        status_code: responseCode,
        explanation,
      });
      return;
    }
  };

  return (
    <Grid container>
      <Grid item xs={11}>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={allowMultipleMapping[inputFormat]}
          maxFiles={getFileUploadInfo(inputFormat).fileCount}
          // modify below
          // to be able to pass file meta data
          // how to suggestion by ChatGPT
          // https://chat.openai.com/share/5e7342b9-75e3-4dd3-bbca-f06e4032cf69
          // server={serverConfig}

          server={{
            url: `${api_endpoint}api/submission/upload`,
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
            // TODO
            // remove file from list of uploaded files
            // setSelectedFile(null);
          }}
          // option provided by plugins
          acceptedFileTypes={acceptedFileTypesMapping[inputFormat]}
          fileValidateTypeLabelExpectedTypes={
            expectedFileExtensionsMapping[inputFormat]
          }
          // TODO
          // when showing an error message increase the size of the filepond component

          // fileValidateTypeDetectType={ ( source, type ) =>
          // {
          //   console.log( source, type );
          //   resolve( type );
          // } }

          // better get this from the server

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
