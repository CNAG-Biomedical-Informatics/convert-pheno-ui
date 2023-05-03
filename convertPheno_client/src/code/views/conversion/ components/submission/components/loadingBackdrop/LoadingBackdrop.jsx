/**
  LoadingBackdrop component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

const RetryButton = (setStartFileConversion) => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        setStartFileConversion(true);
      }}
    >
      Retry
    </Button>
  );
};

export default function LoadingBackdrop(props) {
  /*
   * renderLoadingBackdrop
   *
   * Displays a backdrop with a loading indicator and text while file conversion is in progress.
   *
   * Parameters:
   * - startFileConversion (boolean): Whether file conversion is currently in progress.
   * The backdrop is displayed when this is true.
   *
   * Returns:
   * - A <Backdrop> component containing a centered <Stack> with a <CircularProgress> loading indicator,
   * conversion progress text from renderLoadingScreenWords(), and a retry button from renderRetryButton().
   * The backdrop has a higher z-index than the drawer and a white color.
   */

  const { open, setStartFileConversion, status } = props;

  // TODO
  // Below need another reactQuery to get the status of the file conversion
  const returnConversionStatus = () => {
    if (status === "loading") {
      return "Starting conversion";
    } else if (status === "success") {
      return "File conversion complete";
    } else if (status === "error") {
      return "Error";
    }
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack gap={1} justifyContent="center" alignItems="center">
        <CircularProgress color="inherit" />
        <Typography>{returnConversionStatus()}</Typography>
        {status === "error" && (
          <RetryButton setStartFileConversion={setStartFileConversion} />
        )}
      </Stack>
    </Backdrop>
  );
}
