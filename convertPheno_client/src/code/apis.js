/**
  apis

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import axiosInstance from "./axiosInstance";

export async function fileConversion(token, urlprefix, data) {
  try {
    const res = await axiosInstance.post(`${urlprefix}api/submission/convert`, data, {
      headers: {
        'Authorization': token
      }
    });
    console.log('res', res);
    return res;
  } catch (error) {
    console.error('Error during file conversion:', error);
    throw error;
  }
}

// TODO
// reimplment this function using Axios
export async function fileDownload(token, urlprefix, data, endpoint = "download") {
  try {
    const res = await axiosInstance.post(`${urlprefix}api/submission/${endpoint}`, data, {
      headers: {
        'Authorization': token,
      },
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.setAttribute("download", data.downloadName);
    a.style.display = "none";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error during file download:', error);
  }
}

export async function getJson(token, urlprefix, data) {
  return fetch(`${urlprefix}api/clinical/json`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      connection: "keep-alive",
      Authorization: token,
    },
  });
}

export async function getJobData(token, urlprefix, data) {
  return fetch(`${urlprefix}api/jobs/job`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      connection: "keep-alive",
      Authorization: token,
    },
  });
}

export async function postCaptchaToken(token, urlprefix, data) {
  console.log("postCaptchaToken data", data);
  console.log("postCaptchaToken urlprefix", urlprefix);
  console.log("postCaptchaToken token", token);

  return fetch(`${urlprefix}api/captcha/store`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      connection: "keep-alive",
      Authorization: token,
    },
  });
}
