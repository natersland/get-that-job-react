import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useVadilation } from "../../contexts/vadilation";

export default function BackDropLoading() {
  const { loading } = useVadilation();
  return (
    <div>
      <Backdrop
        sx={{
          color: "#f48fb1",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
