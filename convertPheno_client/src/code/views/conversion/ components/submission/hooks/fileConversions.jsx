/**
  helper function to trigger the file conversion

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";

import apiRequest from "../../../../../ApiRequest";

export default function useFileConversions(props) {
  const navigate = useNavigate();
  const { startFileConversion, query, onSuccessSetters } = props;
  return useQuery(
    ["allfileconversions"],
    async () => {
      const res = await apiRequest(
        "submission/convert",
        JSON.stringify(query)
      );
      return res.data;
    },
    {
      enabled: startFileConversion,
      retry: 3,
      retryDelay: 10,
      cacheTime: 200,
      staleTime: 300_000,
      onError: (error) =>
        toast.error(
          <Typography variant="body2">
            Something went wrong while converting the file
          </Typography>
        ),
      onSuccess: (data) => {
        const { setStartFileConversion, setConversionFinished } =
          onSuccessSetters;
        setStartFileConversion(false);
        setConversionFinished(true);
        navigate(`/conversion/${data.jobId}`);
      },
    }
  );
}
