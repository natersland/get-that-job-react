import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";

import { useVadilation } from "../../contexts/vadilation";
import { theme } from "../../styles/MuiTheme";
export default function AlertDialog({ textDialog }) {
  const { isAlert, setIsAlert, openAlert, closeAlert } = useVadilation();
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
            {textDialog}
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
