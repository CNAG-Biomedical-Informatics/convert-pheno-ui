/**
  apis

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import auth from "./Auth";
import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

axiosInstance.interceptors.request.use(config => {
  if (window.location.hostname.endsWith('.github.dev') ) {
    console.log('Running in Codespaces');
    config.headers['X-Github-Token'] = import.meta.env.VITE_GITHUB_TOKEN;
  }
  return config;
}, error => {
  console.error('error', error);
  return Promise.reject(error);
});

const baseUrl =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_API_URL
    : import.meta.env.VITE_API_URL;

export default async function apiRequest(endpoint, data, method = "POST") {
  const isFileDownload = endpoint.includes('download');
  try {
    const url = `${baseUrl}api/${endpoint}`;
    const headers = {
      'Authorization': auth.getToken(),
    };

    const config = {
      method: method,
      url: url,
      headers: headers,
      responseType: isFileDownload
        ? 'blob'
        : undefined
    };

    if (method === "GET") {
      const timeout = 5000; // 5 seconds
      config.params = data;
      config.timeout = timeout;
    } else {
      config.data = data;
    }

    const res = await axiosInstance.request(config);

    if (isFileDownload) {
      const objUrl = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.setAttribute("download", data.downloadName);
      a.style.display = "none";
      a.href = objUrl;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(objUrl);
    }
    return res;
  } catch (error) {
    const errorContext = isFileDownload
      ? 'Error during file download:'
      : `Error during ${endpoint} request:`;
    console.error(errorContext, error);
    throw error;
  }
}
