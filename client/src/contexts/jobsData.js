import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
  const [createdJobDate, setCreatedJobDate] = useState("");
  // State for Connecting to Jobs Database Backend ---------------------
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});
  const [filter, setFilter] = useState([]);
  const [seeMore, setSeeMore] = useState([]);
  // Conditional State ------------------------------------------
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // State only for Gathered Data -------------------------------
  const [jobCategoryList, setJobCategoryList] = useState([
    "Manufacturing",
    "Legal",
    "Education",
    "Government",
    "Sales",
    "Sports & Outdoor",
    "Transporation",
    "Science",
    "Entertrainment",
    "Food",
    "Electronics",
    "Finance",
  ]);
  const [jobTypeList, setJobTypeList] = useState(["Full Time", "Part Time"]);
  // Fx for reset data in state ---------------------------------------
  const resetJobData = () => {
    setJobTitle("");
    setJobCategory("");
    setJobType("");
    setMinSalary("");
    setMaxSalary("");
    setAboutJob("");
    setMandatoryReq("");
    setOptionalReq("");
  };

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
        createdJobDate,
        setCreatedJobDate,
        // Connecting to Jobs Database  ---------------------
        jobs,
        setJobs,
        job,
        setJob,
        filter,
        setFilter,
        seeMore,
        setSeeMore,
        // State only for Filter Job Feature -------------------------------
        jobCategoryList,
        setJobCategoryList,
        jobTypeList,
        setJobTypeList,
        // Error State ------------------------------------------
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        // Fx for reset data in state ---------------------------------------
        resetJobData,
      }}
    >
      {props.children}
    </JobsDataContext.Provider>
  );
}

const useJobsData = () => React.useContext(JobsDataContext);

export { JobsDataProvider, useJobsData };
