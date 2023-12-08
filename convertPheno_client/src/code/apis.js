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
  console.log('config', config);
  return config;
}, error => {
  console.log('error', error);
  return Promise.reject(error);
});


const baseUrl =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_API_URL
    : import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, data) {
  try {
    const url = `${baseUrl}api/${endpoint}`;
    const res = await axiosInstance.post(url, data, {
      headers: {
        'Authorization': auth.getToken(),
      },
    });
    console.log(`Response from ${endpoint}:`, res);
    return res;
  } catch (error) {
    console.error(`Error during ${endpoint} request:`, error);
    throw error;
  }
}

export async function fileDownload(endpoint, data) {
  try {
    const url = `${baseUrl}api/${endpoint}`;
    const res = await axiosInstance.post(url, data, {
      headers: {
        'Authorization': auth.getToken(),
      },
      responseType: 'blob'
    });
    const objUrl = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.setAttribute("download", data.downloadName);
    a.style.display = "none";
    a.href = objUrl;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(objUrl);
  } catch (error) {
    console.error('Error during file download:', error);
    throw error;
  }
}
