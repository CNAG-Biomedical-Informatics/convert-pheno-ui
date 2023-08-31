/**
  helper functions to copy data from the data grid to the clipboard

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React, { useState, useRef } from "react";
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

  const values =
    data[field] && Array.isArray(data[field]["values"])
      ? data[field]["values"]
      : [];

  const urls =
    data[field] && Array.isArray(data[field]["urls"])
      ? data[field]["urls"]
      : [];

  const ontology_ids =
    data[field] && Array.isArray(data[field]["ontology_ids"])
      ? data[field]["ontology_ids"]
      : [];

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
    data[field]
  );
};

const ValueWithTooltip = ({ value, ontology_id, url }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeout = useRef({ current: null });

  const handleMouseOver = () => {
    setIsTooltipOpen(true);
    clearTimeout(tooltipTimeout.current);
  };

  const handleMouseOut = () => {
    tooltipTimeout.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 1000);
  };

  const handleLinkClick = () => {
    clearTimeout(tooltipTimeout.current);
    window.open(url, "_blank");
  };

  return (
    <Tooltip
      open={isTooltipOpen}
      title={
        <span>
          Click to open{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            {ontology_id}
          </a>
        </span>
      }
      placement="bottom"
    >
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
