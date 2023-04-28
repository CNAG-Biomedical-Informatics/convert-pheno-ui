/** 
  Drag and drop target for the query builder

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { useDrop } from "react-dnd";
import { Typography } from "@mui/material";

const style = {
  border: "1px dashed white",
  borderRadius: "5px",
  height: "3rem",
  marginBottom: "0.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
};

export const ItemTypes = {
  BOX: "box",
};

const DndTarget = (props) => {
  const backgroundsColors = {
    inclusion: {
      inactive: "#008080",
      active: "#006C6C",
      drop: "#63C3C3",
    },
    exclusion: {
      inactive: "#DD4C3A",
      active: "#B73525",
      drop: "#E36B5C",
    },
  };

  const criteria = props.criteria;
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: criteria }),
    // drop: (item) => {
    //   alert(`You just dropped ${item.name} of type ${String(item.type)}`),
    // }
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const inDropArea = canDrop && isOver;

  let color = backgroundsColors[criteria].inactive;
  if (inDropArea) {
    color = backgroundsColors[criteria].drop;
  } else if (canDrop) {
    color = backgroundsColors[criteria].active;
  }
  const borderColor = color;
  return (
    <div ref={drop} style={{ ...style, color, borderColor }}>
      {inDropArea ? (
        <Typography
          variant="body2"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          Release to drop {criteria} criteria
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ fontSize: "16px" }}>
          Drag {criteria} criteria here
        </Typography>
      )}
    </div>
  );
};
export default DndTarget;
