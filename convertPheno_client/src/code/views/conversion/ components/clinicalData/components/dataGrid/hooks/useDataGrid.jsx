import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import DataGrid from "../DataGrid";

export default function useDataGrid({
  data,
  status,
  error,
  tabValue,
  setters,
}) {
  const { setJsonDataKeys, setShownColumns } = setters;
  const [renderDataGrid, setRenderDataGrid] = useState(null);

  const onGridReady = (params, gridId) => {
    const gridType = gridId.split("-")[1];
    if (gridType === "dialogGrid") {
      return;
    }
    const cols = params.columnApi.getColumns();
    const columnHeaders = cols.map((column) => column.getColDef().field);
    const filteredCols = columnHeaders.filter((col) => col !== "#");
    setJsonDataKeys(filteredCols);
  };

  useEffect(() => {
    if (status === "loading" && !error) {
      setRenderDataGrid(<Typography variant="body2">Loading Table</Typography>);
    }
    if (status === "error") {
      setRenderDataGrid(
        <Typography variant="body2">Error: {error.message}</Typography>
      );
    }
    if (status === "success") {
      setRenderDataGrid(
        <DataGrid
          tabValue={tabValue}
          jsonData={data.json}
          colHeaders={data.colHeaders}
          colTree={data.colTree}
          colTreeNodeIds={data.colNodeIds}
          colTreeNodeSelected={data.nodeToSelected}
          onGridReady={onGridReady}
          setShownColumns={setShownColumns}
        />
      );
    }
  }, [data]);
  return renderDataGrid;
}
