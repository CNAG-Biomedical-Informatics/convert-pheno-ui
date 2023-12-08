/**
  helper function query finished jobs

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../ApiRequest";

export default function useFinishedJobs(props) {
  const { query, conversionFinished } = props;
  const { jobId } = query;

  return useQuery(
    ["finishedJob", jobId],
    async () => {
      const res = await apiRequest(
        "jobs/job",
        JSON.stringify(query)
      );
      return res.data;
    },
    {
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
