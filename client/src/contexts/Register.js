import React, { useState } from "react";
import ProfessionalRegisterPage from "../pages/ProfessionalRegisterPage";

const multiStepContext = React.createContext();

function StepContext() {
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  return (
    <div>
      <multiStepContext.Provider
        value={{
          userData,
          setUserData,
          finalData,
          setFinalData,
        }}
      >
        <ProfessionalRegisterPage />
      </multiStepContext.Provider>
    </div>
  );
}

export { multiStepContext, StepContext };
