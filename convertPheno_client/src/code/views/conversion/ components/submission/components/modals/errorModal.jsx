/**
  Error Modal to be displayed when the user has reached the ratelimit
  (currently not in use)

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

// TODO
// suggestion by ChatGPT how to reset the ratelimit
// https://chat.openai.com/share/352d4b4e-85d9-4217-9274-58554de8453c

import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import apiRequest from "../../../../../../ApiRequest";

// TODO
// another thing which could be used to reset the ratelimit
// is to trigger a captcha challenge
const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? window.REACT_APP_API_URL
    : import.meta.env.VITE_API_URL;

const handleVerificationSuccess = async (token, ekey, setError) => {
  console.log(token, ekey);
  // setError(false);
  // TODO
  // send token to backend
  // if token is valid, reset ratelimit
  // if token is invalid, show error message

  const data = {
    token: token,
    ekey: ekey,
  };

  console.log("handleVerificationSuccess data", data);

  const res = await apiRequest(
    "captcha/store",
    JSON.stringify(data)
  );
  return res.data;

  // const response = await postCaptchaToken(
  //   auth.getToken(),
  //   api_endpoint,
  //   JSON.stringify(data)
  // );
  // const responseJson = await response.json();
  // console.log(responseJson);
  // if (responseJson.success) {
  //   setError(false);
  // } else {
  //   setError({
  //     explanation: "captcha token could not be stored in the redis cache",
  //   });
  // }
};

function ErrorModal(props) {
  const { error, onClose, setError } = props;

  // TODO do not hardcode the retry time
  // const retryTime = 60;

  // const [countdown, setCountdown] = useState(retryTime);

  // useEffect(() => {
  //   let timer;

  //   if (countdown > 0 && open) {
  //     timer = setInterval(() => {
  //       setCountdown((prevCountdown) => prevCountdown - 1);
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [countdown, open]);

  // useEffect(() => {
  //   if (countdown === 0) {
  //     onClose();
  //   }
  // }, [countdown, onClose]);

  return (
    <Dialog open={error !== false} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{error.explanation}</DialogContentText>
        {/* {countdown > 0 && <p>Try again in {countdown} seconds.</p>} */}
        <HCaptcha
          sitekey="cbcfa41a-f11d-43c6-86e9-4af79299a00b"
          onVerify={(token, ekey) =>
            handleVerificationSuccess(token, ekey, setError)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
