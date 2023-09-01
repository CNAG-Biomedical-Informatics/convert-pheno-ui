/**
  renders the value of a cell in the data grid with a tooltip that shows the ontology id and a link to the ontology term

  This file is part of convert-pheno-ui

  Last Modified: Sep/1/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState, useRef } from "react";
import { Tooltip } from "@mui/material";

export default function ValueWithTooltip(props) {
  const { value, ontology_id, url } = props;

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimeout = useRef({ current: null });

  const handleMouseOver = (value) => {
    if (value === "NA") {
      return;
    }
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
        onMouseOver={() => handleMouseOver(value)}
        onMouseOut={handleMouseOut}
        style={{ marginRight: "5px", cursor: "pointer" }}
      >
        {value}
      </span>
    </Tooltip>
  );
}