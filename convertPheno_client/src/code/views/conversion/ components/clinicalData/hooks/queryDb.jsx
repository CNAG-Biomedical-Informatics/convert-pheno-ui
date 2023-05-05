/**
  helper functions to query the database

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import { useQuery } from "@tanstack/react-query";

import { getJson } from "../../../../../apis";
import auth from "../../../../../Auth";

// const api_endpoint = import.meta.env.VITE_API_URL;

const api_endpoint =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_API_URL
    : import.meta.env.VITE_API_URL;

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
      const res = await getJson(
        auth.getToken(),
        api_endpoint,
        JSON.stringify(query)
      );
      if (!res.ok) {
        const error = await res.json();
        return Promise.reject(error);
      }
      return res.json();
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
