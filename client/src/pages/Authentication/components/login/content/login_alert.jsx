import { Alert } from "@mui/material";
import React from "react";
function LoginAlert({ isCondition, displayText }) {
  return (
    <>
      {isCondition ? (
        <Alert className="mt-2 mb-2 w-12/12" severity="error">
          {displayText}
        </Alert>
      ) : null}
    </>
  );
}
export default LoginAlert;
