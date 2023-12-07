/**
  apis

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import axiosInstance from "./axiosInstance";


// ist this function actually still used?
export async function fileUpload(token, urlprefix, data) {
  return fetch(`${urlprefix}api/submission/upload`, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
      connection: "keep-alive",
      Authorization: token,
    },
  });
}

// TODO
// reimplment this function using Axios
export async function fileConversion(token, urlprefix, data) {
  return fetch(`${urlprefix}api/submission/convert`, {
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

// TODO
// reimplment this function using Axios
export async function fileDownload(token, urlprefix, data) {
  try {
    const res = await fetch(`${urlprefix}api/submission/download`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("download", data.downloadName);
    a.style.display = "none";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    return console.error(err);
  }
}

// TODO
// merge this function with fileDownload
export async function fileDownloadExample(token, urlprefix, data) {
  try {
    const res = await fetch(`${urlprefix}api/submission/download/example`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("download", data.downloadName);
    a.style.display = "none";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    return console.error(err);
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
