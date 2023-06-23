import { CircularProgress } from "@mui/material";
import React from "react";

function LoginLoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <CircularProgress />
      </div>
    </div>
  );
}

export default LoginLoadingPage;
