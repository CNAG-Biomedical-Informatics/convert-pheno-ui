/**
  Arrow component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { IconButton, Typography } from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)({
  width: "50%",
  "& svg": {
    fontSize: 200,
  },
  "&:hover svg": {
    color: "#42a5f5",
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: "#42a5f5",
  },
});

const SimpleArrow = () => {
  return (
    <div style={{ width: "100%", float: "left" }}>
      <StyledIconButton disabled>
        <ArrowRightIcon />
      </StyledIconButton>
    </div>
  );
};

const ArrowButton = (props) => {
  // TODO
  // StyleIconButton should be Type "submit"
  // in order to use React-hook-form

  const { enabled, onClick } = props;
  return (
    <div style={{ width: "100%", float: "left" }}>
      {enabled ? (
        <StyledIconButton onClick={onClick}>
          <div>
            <ArrowRightIcon color="primary" />
            <Typography variant="h6">RUN</Typography>
          </div>
        </StyledIconButton>
      ) : (
        <StyledIconButton disabled>
          <ArrowRightIcon />
        </StyledIconButton>
      )}
    </div>
  );
};

export { SimpleArrow, ArrowButton };
