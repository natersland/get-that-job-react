import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* // Contexts
import { useJobsData } from "./jobsData"; */

const RecruiterContext = React.createContext();
function RecruiterProvider(props) {
  const navigate = useNavigate();
  /*   const {
    setJobTitle,
    setJobCategory,
    setJobType,
    setMinSalary,
    setMaxSalary,
    setAboutJob,
    setMandatoryReq,
    setOptionalReq,
  } = useJobsData(); */
  // Create New Job
  const createJob = async (data) => {
    await axios.post("http://localhost:4000/auth/createjob", data);
    navigate("/jobposting").then(() => {});
  };

  //

  return (
    <RecruiterContext.Provider value={{ createJob }}>
      {props.children}
    </RecruiterContext.Provider>
  );
}

const useRecruiter = () => React.useContext(RecruiterContext);

export { RecruiterProvider, useRecruiter };
