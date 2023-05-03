/**
  Drag and drop box for the query builder

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { useDrag } from "react-dnd";
import { Typography } from "@mui/material";

const style = {
  border: "1px solid gray",
  borderRadius: "5px",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

export const ItemTypes = {
  BOX: "box",
};

const DndBox = function Box({ name, droppedCriteria, handleDropped }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          handleDropped(dropResult.name, item.name);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [droppedCriteria]
  );

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
      <Typography variant="body1">{name}</Typography>
    </div>
  );
};

export default DndBox;
