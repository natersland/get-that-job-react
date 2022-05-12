import React, { useState } from "react";

const JobsDataContext = React.createContext();

function JobsDataProvider(props) {
  // Main Information -----------------------------------------
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // Additional Information -----------------------------------------
  const [aboutJob, setAboutJob] = useState("");
  const [mandatoryReq, setMandatoryReq] = useState("");
  const [optionalReq, setOptionalReq] = useState("");

  // Others Data -----------------------------------------
  const [createdJobDate, setCreatedJobDate] = useState("");
  const [totalCandidates, setTotalCandidates] = useState("");
  const [candidatesOnTrack, setCandidatesOnTrack] = useState("");
  const [jobsStatus, setJobsStatus] = useState(true);
  // ABC
  const [disable, setDisable] = useState(false);

  // State for Connecting to Jobs Database & Searchbox ---------------------
  const [jobs, setJobs] = useState([]);
  const [searchJobText, setSearchJobText] = useState("");

  return (
    <JobsDataContext.Provider
      value={{
        // Main Information -----------------------------------------
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
        // Additional Information -----------------------------------------
        aboutJob,
        setAboutJob,
        mandatoryReq,
        setMandatoryReq,
        optionalReq,
        setOptionalReq,
        // Others Data -----------------------------------------
        createdJobDate,
        setCreatedJobDate,
        totalCandidates,
        setTotalCandidates,
        candidatesOnTrack,
        setCandidatesOnTrack,
        jobsStatus,
        setJobsStatus,
        disable,
        setDisable,
        // State for Searchbox (Professional Findthatjob Page) -----------------------------------------
        jobs,
        setJobs,
        searchJobText,
        setSearchJobText,
      }}
    >
      {props.children}
    </JobsDataContext.Provider>
  );
}

const useJobsData = () => React.useContext(JobsDataContext);

export { JobsDataProvider, useJobsData };
