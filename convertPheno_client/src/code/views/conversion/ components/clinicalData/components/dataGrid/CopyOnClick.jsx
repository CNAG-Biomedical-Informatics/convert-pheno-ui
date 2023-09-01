/**
  helper functions to copy data from the data grid to the clipboard

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState, useRef } from "react";
import { Button, Popover, Tooltip, Typography } from "@mui/material";
import ValueWithTooltip from "./ValueWithTooltip";

const UnstyledButton = ({ onClick, children }) => {
  return (
    <Button
      disableElevation
      disableRipple
      onClick={onClick}
      style={{ color: "inherit", textTransform: "none" }}
    >
      {children}
    </Button>
  );
};

const checkKeyExists = (obj, key) => {
  for (const ObjKey in obj) {
    if (ObjKey === key) {
      return true;
    }
    if (typeof obj[key] === "object") {
      const found = checkKeyExists(obj[key]);
      if (found) {
        return true;
      }
    }
  }
  return false;
};

const getFieldAndToolTipValues = (data, field) => {
  return {
    values: data[field]?.values || [],
    urls: data[field]?.urls || [],
    ontology_ids: data[field]?.ontology_ids || [],
  };
};

const getValue = (props) => {
  const { data, colDef } = props;
  const field = colDef.field;

  const { values, urls, ontology_ids } = getFieldAndToolTipValues(data, field);

  return checkKeyExists(data[field], "count") ? (
    <a
      href={`#${location.pathname}`}
      onClick={(event) => {
        event.preventDefault();
      }}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      {values.map((value, index) => (
        <ValueWithTooltip
          key={index}
          value={value}
          ontology_id={ontology_ids[index]}
          url={urls[index]}
        />
      ))}
    </a>
  ) : (
    <ValueWithTooltip
      value={data[field]}
      ontology_id={ontology_ids[0]}
      url={urls[0]}
    />
    // data[field]
  );
};

const PopoverButton = ({
  children,
  onClick,
  popoverContent,
  anchorEl,
  setAnchorEl,
}) => {
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <div>
      <UnstyledButton onClick={onClick}>{children}</UnstyledButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography>{popoverContent}</Typography>
      </Popover>
    </div>
  );
};

const copyOnClick = (value) => {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

export default function CopyOnClick(props) {
  const { data, colDef } = props;
  const value = getValue(props);
  const popoverTimeout = 500;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    const newValue =
      typeof value === "object" ? data[colDef.field].values.join(", ") : value;
    copyOnClick(newValue);
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setAnchorEl(null);
    }, popoverTimeout);
  };

  return (
    <PopoverButton
      onClick={handleClick}
      popoverContent="copied to clipboard"
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
    >
      {value}
    </PopoverButton>
  );
}
