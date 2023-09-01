/**
  hook to initialize the query builder component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import QueryBuilder from "../QueryBuilder";

export default function useQueryBuilder({
  status,
  error,
  droppedCriteria,
  tabValue,
  setters,
  headers,
  shownColumns,
}) {
  const { setFilter, setDroppedCriteria } = setters;

  const [renderQueryBuilder, setRenderQueryBuilder] = useState(null);

  const handleApplyFilter = (filterCriteria) => {
    setFilter(filterCriteria);
  };

  useEffect(() => {
    if (status === "loading" && !error) {
      setRenderQueryBuilder(
        <Typography variant="body2">Loading Query Builder</Typography>
      );
    }
    if (status === "error") {
      setRenderQueryBuilder(
        <Typography variant="body2">Error: {error.message}</Typography>
      );
    }
    setRenderQueryBuilder(
      <QueryBuilder
        jsonDataKeys={headers}
        droppedCriteria={droppedCriteria}
        setFilter={setFilter}
        setDropped={setDroppedCriteria}
        tabValue={tabValue}
        handleApplyFilter={handleApplyFilter}
      />
    );
  }, [droppedCriteria, shownColumns, status]);
  return renderQueryBuilder;
}
