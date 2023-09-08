import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// TODO
// another thing which could be used to reset the ratelimit
// is to trigger a captcha challenge

function ErrorModal(props) {
  const { error, onClose } = props;

  // TODO do not hardcode the retry time
  const retryTime = 60;

  const [countdown, setCountdown] = useState(retryTime);

  useEffect(() => {
    let timer;

    if (countdown > 0 && open) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, open]);

  useEffect(() => {
    if (countdown === 0) {
      onClose();
    }
  }, [countdown, onClose]);

  return (
    <Dialog open={error !== false} onClose={onClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{error.explanation}</DialogContentText>
        {countdown > 0 && <p>Try again in {countdown} seconds.</p>}
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
