/**
  helper function query finished jobs

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import { useQuery } from "@tanstack/react-query";

import { getJobData } from "../../../apis";
import auth from "../../../Auth";

// const api_endpoint = import.meta.env.VITE_API_URL;

const api_endpoint =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_API_URL
    : import.meta.env.VITE_API_URL;

export default function useFinishedJobs(props) {
  const { query, conversionFinished } = props;
  const { jobId } = query;

  return useQuery(
    ["finishedJob", jobId],
    async () => {
      const res = await getJobData(
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
    {
      //! when enabled is used query invalidation is not working
      //! figure out a way how to enable/disable the query
      //with out the need to using the enabled property

      // !figure out to enable the query when the location is changed

      enabled: query.jobId !== undefined && !conversionFinished,
      // maybe do a retry depending on the error -> no when the job is not found
      retry: 0,
      retryDelay: 10,
      cacheTime: 200,
      staleTime: 300_000,
      onSuccess: (data) => {},
    }
  );
}
