import React, { useState } from "react";

const JobsDataContext = React.createContext();

function JobsDataProvider(props) {
  // Main Information
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // Additional Information
  const [aboutJob, setAboutJob] = useState("");
  const [mandatoryReq, setMandatoryReq] = useState("");
  const [optionalReq, setOptionalReq] = useState("");

  // Others Data
  const [createdJobDate, setCreatedJobDate] = useState("");
  const [totalCandidates, setTotalCandidates] = useState("");
  const [candidatesOnTrack, setCandidatesOnTrack] = useState("");
  return (
    <JobsDataContext.Provider
      value={{
        jobTitle,
        setJobTitle,
        jobCategory,
        setJobCategory,
        jobType,
        setJobType,
        minSalary,
        setMinSalary,
        maxSalary,
        setMaxSalary,
        aboutJob,
        setAboutJob,
        mandatoryReq,
        setMandatoryReq,
        optionalReq,
        setOptionalReq,
        createdJobDate,
        setCreatedJobDate,
        totalCandidates,
        setTotalCandidates,
        candidatesOnTrack,
        setCandidatesOnTrack,
      }}
    >
      {props.children}
    </JobsDataContext.Provider>
  );
}

const useJobsData = () => React.useContext(JobsDataContext);

export { JobsDataProvider, useJobsData };
