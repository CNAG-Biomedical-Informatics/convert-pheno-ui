/**
  Arrow component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { IconButton } from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { styled } from "@mui/system";

// const StyledIconButton = styled(IconButton)({
//   width: "50%",
//   "& svg": {
//     fontSize: 200,
//   },
// });

const StyledIconButton = styled(IconButton)(({ disableHover }) => ({
  width: "50%",
  "& svg": {
    fontSize: 200,
  },
  ...(disableHover && {
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "default",
    },
  }),
}));

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
        <StyledIconButton onClick={onClick} disableHover>
          <ArrowRightIcon color="primary" /> runs
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
