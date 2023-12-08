/**
  Clinical data component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import SimpleTabs from "./components/simpleTabs/SimpleTabs";
import useQueryBuilder from "./components/queryBuilder/hooks/useQueryBuilder";
import useDataGrid from "./components/dataGrid/hooks/useDataGrid";
import useQueryDb from "./hooks/queryDb";

export default function ClinicalData(props) {
  /*
  hierarchy:
  Tabs (outputFormats)
    --> queryBuilder
    --> dataGrid
  */
  const { outputFormats, jobId } = props;
  const location = useLocation();
  const queryClient = useQueryClient();

  const [tabValue, setTabValue] = useState(0);
  const [jsonDataKeys, setJsonDataKeys] = useState([]);

  const [shownColumns, setShownColumns] = useState({});

  const [headers, setHeaders] = useState([]);

  // for the query builder
  const [droppedCriteria, setDroppedCriteria] = useState({
    inclusion: [],
    exclusion: [],
  });

  const [filter, setFilter] = useState({
    inclusion: {},
    exclusion: {},
  });

  const { error, status, data } = useQueryDb({
    query: {
      jobId,
      outputFormats,
      filter,
      tabValue,
      shownColumns,
    },
    location,
    setShownColumns,
    setHeaders,
  });

  useEffect(() => {
    queryClient.invalidateQueries("resultsQuery", { refetchActive: true });
  }, [location, queryClient, shownColumns]);

  const renderQueryBuilder = useQueryBuilder({
    data,
    error,
    status,
    droppedCriteria,
    filter,
    tabValue,
    setters: {
      setFilter,
      setDroppedCriteria,
    },
    shownColumns,
    headers,
  });
  const renderDataGrid = useDataGrid({
    error,
    data,
    status,
    tabValue,
    setters: {
      setJsonDataKeys,
      setShownColumns,
    },
  });

  const resetAfterTabChange = () => {
    setDroppedCriteria({
      inclusion: [],
      exclusion: [],
    });
    setFilter({
      inclusion: {},
      exclusion: {},
    });
    setShownColumns({});
  };

  const handleTabChanged = (_, tab) => {
    setTabValue(tab);
    resetAfterTabChange();
  };

  return (
    <SimpleTabs
      outputFormats={outputFormats}
      tabValue={tabValue}
      handleTabChanged={handleTabChanged}
    >
      {renderQueryBuilder}
      {renderDataGrid}
    </SimpleTabs>
  );
}
