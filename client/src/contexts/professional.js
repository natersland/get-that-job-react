import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruiterContext = React.createContext();
function RecruiterProvider(props) {
  //const navigate = useNavigate();

  // Updated profile  -----------------------------------------
  const getCurrentJob = async (data) => {
    await axios.get ("http://localhost:4000//${params.profileId}", data);
    //navigate("/jobposting").then(() => {});
  };

  const updatedJob = async (data) => {
    await axios.put("http://localhost:4000//${params.profileId}", data);
    //navigate("/jobposting").then(() => {});
  };  

  return (
    <RecruiterContext.Provider value={{ getCurrentJob, updatedJob }}>
      {props.children}
    </RecruiterContext.Provider>
  );
}

const useRecruiter = () => React.useContext(RecruiterContext);

export { RecruiterProvider, useRecruiter };