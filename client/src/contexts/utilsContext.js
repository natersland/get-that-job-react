import React, { useState } from "react";

const UtilsContext = React.createContext();

function UtilsProvider(props) {
  // Others -----------------------------------------
  const [fistLogIn, setFirstLogIn] = useState(false);
  // Backdrop Loading... Zone ---------------------------
  const [loading, setLoading] = React.useState(false);
  // Alert Dialog Zone -----------------------------------
  const [isAlert, setIsAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleClose = () => {
    setLoading(false);
  };
  const handleToggle = () => {
    setLoading(!loading);
  };

  const openAlert = () => {
    isAlert(true);
  };

  const closeAlert = () => {
    setIsAlert(false);
    setFirstLogIn(false);
  };
  return (
    <UtilsContext.Provider
      value={{
        // Others -----------------------------------------
        fistLogIn,
        setFirstLogIn,
        // Backdrop Loading... Zone ---------------------------
        loading,
        setLoading,
        handleClose,
        handleToggle,
        // Alert Dialog Zone -----------------------------------
        isAlert,
        setIsAlert,
        alertMessage,
        setAlertMessage,
        openAlert,
        closeAlert,
      }}
    >
      {props.children}
    </UtilsContext.Provider>
  );
}

const useUtils = () => React.useContext(UtilsContext);

export { UtilsProvider, useUtils };
