/**
  DataGrid component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ErrorBoundary } from "react-error-boundary";
import TableChartIcon from "@mui/icons-material/TableChart";

import ColumnsTreeViewModal from "../columnsTreeViewModal/ColumnsTreeViewModal";

import auth from "../../../../../../Auth";
import CopyOnClick from "./CopyOnClick";
import ValueWithTooltip from "./ValueWithTooltip";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export default function DataGrid(props) {
  const {
    jsonData,
    colHeaders,
    colTree,
    colTreeNodeIds,
    onGridReady,
    shownColumns,
    setShownColumns,
    colTreeNodeSelected,
    tabValue,
  } = props;

  const defaultColDef = {
    editable: false,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: false,
    resizable: true,
  };

  const theme = useTheme();

  const [clickedCellInfo, setClickedCellInfo] = useState({ id: 0, field: "" });
  const [open, setOpen] = useState(false);
  const [openTreeView, setOpenTreeView] = useState(false);

  // TODO
  // in the basic table view
  // Add to the nodes exposures and measurements
  // the leaf nodes value
  // so you can filter even the basic table
  // based on a value

  const handleClose = () => {
    setOpen(false);
  };

  const handleCellClick = (params) => {
    const colId = params.column.colId;
    const rowId = params.node.rowIndex;

    // below should not be hardcoded get it from the backend
    // depending on what is selected bff or pxf
    const clickableCells = [
      "exposures",
      "measures",
      "treatments",
      "measurements",
      "medicalActions",
      "diseases",
      "interventionsOrProcedures",
      "phenotypicFeatures",
    ];
    if (clickableCells.includes(colId)) {
      setOpen(true);
      setClickedCellInfo({
        id: rowId,
        field: colId,
      });
    }
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

  const getDialogTableRows = (data) => {
    const { id, field } = clickedCellInfo;

    const rows = [];
    if (field === "") {
      return rows;
    }

    const cellData = data[id][field];

    for (const [idx, row] of cellData.data.entries()) {
      const rowData = {
        id: parseInt(idx) + 1,
      };
      for (const [key, value] of Object.entries(row)) {
        let ontology_ids = cellData.ontology_ids_mapping[key];
        let urls = cellData.urls_mapping[key];

        if (ontology_ids === undefined) {
          ontology_ids = [];
          urls = [];
        }

        rowData[key] =
          ontology_ids.length > 0 ? (
            <ValueWithTooltip
              value={value}
              ontology_id={ontology_ids[idx]}
              url={urls[idx]}
            />
          ) : (
            value
          );
      }
      rows.push(rowData);
    }

    console.log("rows", rows);
    return rows;
  };

  const getDialogTableValue = (params) => {
    const { value, colDef } = params;

    console.log("params", params);
    if (value === undefined || value === []) {
      return "";
    }
    return value;
  };

  const getDialogTableColumns = (allRows) => {
    const { field } = clickedCellInfo;
    const cols = [{ field: "id", headerName: "#" }];

    if (field === "") {
      return cols;
    }

    let rowWithFieldData = null;
    for (const row of allRows) {
      if (typeof row[field] === "object" && !Array.isArray(row[field])) {
        rowWithFieldData = row;
        break;
      }
    }

    const cellData = rowWithFieldData[field].data[0];
    for (const key in cellData) {
      cols.push({
        field: key,
        headerName: key,
        flex: 1,
        cellRenderer: getDialogTableValue,
      });
    }
    return cols;
  };

  const getRows = (data) => {
    if (data.length === undefined) {
      return [];
    }
    return data;
  };

  const getColumns = (data) => {
    const cols = [];

    data.forEach((header) => {
      cols.push({
        field: header,
        headerName: header,
        flex: 1,
        cellRenderer: CopyOnClick,
      });
    });

    cols.sort(
      (a, b) => colHeaders.indexOf(a.field) - colHeaders.indexOf(b.field)
    );
    return cols;
  };

  const renderDataGrid = (gridId, rowData, columnDefs, handleCellClick) => {
    const gridClass =
      theme.palette.mode === "dark"
        ? "ag-theme-alpine-dark"
        : "ag-theme-alpine";

    const gridOptions = {
      pagination: true,
      paginationPageSize: 10,
      onGridReady: (params) => {
        onGridReady(params, gridId);
      },
    };

    return (
      <AgGridReact
        id={gridId}
        rowData={rowData}
        className={gridClass}
        gridOptions={gridOptions}
        onCellClicked={handleCellClick}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
      />
    );
  };

  // TDOO
  // below should be depend on if the security is enabled or not

  // if (auth.tokenExpired()) {
  //   return <div>Session expired. Please login again</div>;
  // }

  const handleShowHideColumns = () => {
    setOpenTreeView(true);
  };

  function getSelectedColumnsRecursively(tree, checkedNodes) {
    const result = {};

    function traverseTree(nodeTree, isTopLevel) {
      for (const node of nodeTree) {
        if (checkedNodes[node.nodeId] && isTopLevel) {
          result[node.name] = [];
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            if (checkedNodes[child.nodeId]) {
              if (!result[node.name]) {
                result[node.name] = [];
              }
              result[node.name].push(child.name);
            }
          });
          traverseTree(node.children, false);
        }
      }
    }
    traverseTree(tree, true);
    return result;
  }

  const handleCloseTreeView = (checkedBoxes) => {
    if (checkedBoxes === null) {
      setOpenTreeView(false);
      return;
    }

    // TODO
    // it might make sense to wrap the function below in a useMemo hook
    const selectedColumns = getSelectedColumnsRecursively(
      colTree,
      checkedBoxes
    );
    setShownColumns(selectedColumns);
    setOpenTreeView(false);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ColumnsTreeViewModal
        open={openTreeView}
        handleClose={handleCloseTreeView}
        colTree={colTree}
        colTreeNodeIds={colTreeNodeIds}
        shownColumns={shownColumns}
        colTreeNodeSelected={colTreeNodeSelected}
      />
      <Grid container>
        <Grid item xs={12} sx={{ padding: "0px 0px 10px 0px" }}>
          <Button
            variant="contained"
            onClick={handleShowHideColumns}
            startIcon={<TableChartIcon />}
          >
            show hide table columns
          </Button>
        </Grid>
        <Grid item xs={12} style={{ height: 525 }}>
          {renderDataGrid(
            `${tabValue}-mainGrid`,
            getRows(jsonData),
            getColumns(colHeaders),
            handleCellClick
            // getOntologyMappings(jsonData)
          )}
        </Grid>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {clickedCellInfo.field}
          </DialogTitle>
          <DialogContent style={{ height: "500px" }}>
            {renderDataGrid(
              `${tabValue}-dialogGrid`,
              getDialogTableRows(jsonData),
              getDialogTableColumns(jsonData)
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ErrorBoundary>
  );
}
