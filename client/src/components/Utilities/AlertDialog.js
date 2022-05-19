import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useVadilation } from "../../contexts/vadilation";
export default function AlertDialog({ textDialog }) {
  const { isAlert, setIsAlert, openAlert, closeAlert } = useVadilation();
  return (
    <div>
      <Dialog
        open={isAlert}
        onClose={closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Get that Job"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {textDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="hover:bg-pinktertiary"
            onClick={closeAlert}
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
