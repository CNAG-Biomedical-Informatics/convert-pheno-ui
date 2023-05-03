/**
  trigger new Submission component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Button } from "@mui/material";

export default function TriggerNewSubmissionButton({ handleNewConversion }) {
  return (
    <Button
      variant="contained"
      onClick={handleNewConversion}
      size={"small"}
      sx={{
        fontSize: "14px",
        fontWeight: "bold",
        marginRight: 3,
        backgroundColor: "orange",
        color: "black",
        "&:hover": {
          backgroundColor: "orangered",
        },
      }}
    >
      New Conversion
    </Button>
  );
}
