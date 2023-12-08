/**
  DownloadButtons

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Button } from "@mui/material";

import apiRequest from "../../../../../../../../ApiRequest";

function FileDownloadButton(jobId, tempFilename, newFilename, targetFormat) {
  // better on the server side
  const abbreviationToFullMapping = {
    bff: "Beacon v2",
    pxf: "Phenopackets v2",
  };

  const data = { jobId, tempFilename, downloadName: newFilename };
  const triggerFileDownload = async (data) => {
    await apiRequest(
      "submission/download",
      data
    );
  };
  return (
    <Button
      key={targetFormat}
      variant="contained"
      size="small"
      onClick={() => triggerFileDownload(data)}
      sx={{ margin: "0px 2px 0px 2px", fontSize: "14px", fontWeight: "bold" }}
    >
      {abbreviationToFullMapping[targetFormat]}
    </Button>
  );
}

const DownloadButtons = ({ data }) => {
  const downloadButtons = [];

  for (const tempFilename of data.tempFilenames) {
    const targetFormat = tempFilename.split(".")[1];
    const newFilename = `${tempFilename.split(".")[0]}.${targetFormat}.json`;
    downloadButtons.push(
      FileDownloadButton(data.jobId, tempFilename, newFilename, targetFormat)
    );
  }
  return downloadButtons;
};

const DownloadAllFilesButton = ({ data }) => {
  const downloadAllFiles = async (data) => {
    // TODO
    // replace below with ReactQuery
    try {
      const query = {
        jobId: data.jobId,
        tempFilenames: data.tempFilenames,
        downloadName: `${data.jobId}.zip`,
        downloadAllFiles: true,
      };
      await apiRequest(
        "submission/download",
        query
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Button
      key={"downloadAll"}
      size="small"
      onClick={() => downloadAllFiles(data)}
      sx={{ margin: "0px 2px 0px 2px", fontSize: "14px", fontWeight: "bold" }}
    >
      (Download all)
    </Button>
  );
};

export { DownloadButtons, DownloadAllFilesButton };
