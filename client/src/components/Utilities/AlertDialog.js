import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import { useUtils } from "../../contexts/utilsContext";

export default function AlertDialog() {
  const { isAlert, closeAlert, alertMessage } = useUtils();
  return (
    <div>
      <Dialog
        open={isAlert}
        onClose={closeAlert}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          color="secondary"
          sx={{
            borderRadius: "50px 50px 0",
          }}
        >
          {"Notification"}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "10px",
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: "1.05rem",
            }}
          >
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "20px",
            marginTop: "-20px",
          }}
        >
          <PinkButton className="btn-pink btn btn-md" onClick={closeAlert}>
            Continue
          </PinkButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const PinkButton = styled.button``;
