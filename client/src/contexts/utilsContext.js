import React, { useState } from "react";

const UtilsContext = React.createContext();

function UtilsProvider(props) {
  // Others -----------------------------------------
  const [fistLogIn, setFirstLogIn] = useState(false);
  const [language, setLanguage] = useState("en");
  // Backdrop Loading... Zone ---------------------------
  const [loading, setLoading] = React.useState(false);
  // Alert Dialog Zone -----------------------------------
  const [isAlert, setIsAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");


  // GTJ API server --------------------------
  // TODO it's seem .env is not support webpack < 5 and very high effort to fix that so why I use this way instead
  const gtjApiService = 'https://get-that-job-fantasy.onrender.com';

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
    setLoading(false)
  };
  return (
    <UtilsContext.Provider
      value={{
        gtjApiService,
        // Others -----------------------------------------
        fistLogIn,
        setFirstLogIn,
        language,
        setLanguage,
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
