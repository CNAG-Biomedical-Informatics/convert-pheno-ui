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

// TODO
// another thing which could be used to reset the ratelimit
// is to trigger a captcha challenge

const handleVerificationSuccess = (token, ekey, setError) => {
  console.log(token, ekey);
  setError(false);
  // TODO
  // send token to backend
  // if token is valid, reset ratelimit
  // if token is invalid, show error message
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
