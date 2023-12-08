/**
  helper functions to query the database

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../../../../../apis";

export default function useQueryDb(props) {
  const { query, location, setShownColumns, setHeaders } = props;
  const { tabValue, filter, outputFormats, shownColumns } = query;

  const trueProps = Object.keys(outputFormats).filter(
    (prop) => outputFormats[prop]
  );
  query.phenoFormat = trueProps[tabValue];
  delete query.outputFormats;
  delete query.tabValue;

  return useQuery({
    queryKey: ["resultsQuery", tabValue, filter, location, shownColumns],
    queryFn: async () => {
      const res = await apiRequest(
        "clinical/json",
        JSON.stringify(query)
      );
      return res.data;
    },
    retry: 1,
    retryDelay: 10,
    staleTime: 300_000,
    useErrorBoundaries: true,
    onSuccess: (data) => {
      setShownColumns(data.shownColumns);
      setHeaders(data.colHeaders);
    },
  });
}
