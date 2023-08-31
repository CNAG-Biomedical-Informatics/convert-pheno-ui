/**
  helper functions to copy data from the data grid to the clipboard

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React, { useState } from "react";
import { Button, Popover, Tooltip, Typography } from "@mui/material";

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

const getValue = (props) => {
  const { data, colDef } = props;
  const field = colDef.field;

  // const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipValue, setTooltipValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseOver = (event, value) => {
    setTooltipValue(value);
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseOut = () => {
    setTooltipValue("");
    setAnchorEl(null);
  };

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
      {data[field]["values"].map((value, index) => (
        <ValueWithTooltip key={index} value={value} />
        // <Tooltip key={index} open={isTooltipOpen} title={tooltipValue}>
        // <span
        //   onMouseOver={(event) => handleMouseOver(event, value)}
        //   onMouseOut={handleMouseOut}
        // >
        //   {value}
        //   {index === data[field]["values"].length - 1 ? "" : ", "}
        // </span>
        // </Tooltip>
      ))}

      {/* <Tooltip
        open={tooltipValue !== ""}
        title={tooltipValue}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <span style={{ display: "none" }}>Hidden span for the Tooltip</span>
      </Tooltip> */}
      {/* {data[field]["values"].join(", ")} */}
    </a>
  ) : (
    data[field]
  );
};

const ValueWithTooltip = ({ value }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleMouseOver = () => {
    setIsTooltipOpen(true);
  };

  const handleMouseOut = () => {
    setIsTooltipOpen(false);
  };

  return (
    <Tooltip open={isTooltipOpen} title={value} placement="bottom">
      <span
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ marginRight: "5px", cursor: "pointer" }}
      >
        {value}
      </span>
    </Tooltip>
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
    let newValue = value;
    if (typeof value === "object") {
      newValue = data[colDef.field]["values"].join(", ");
    }
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
