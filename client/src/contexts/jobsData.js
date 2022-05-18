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
  const [job, setJob] = useState([]);
  const [filter, setFilter] = useState([]);
  const [seeMore, setSeeMore] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState();
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
  // Get Data from server fx  ----------------------------------------
  const getJobs = async () => {
    try {
      /*  const params = new URLSearchParams();
      params.append("searchJobText", searchJobText);
      params.append("keywords", keywords);
      params.append("keywordsNumber", keywordsNumber);
      params.append("jobType", jobType);
      params.append("jobTitle", jobTitle);
      params.append("minSalary", minSalary);
      params.append("searchMinSalaryText", searchMinSalaryText);
      params.append("searchMaxSalaryText", searchMaxSalaryText); */
      /*       setIsError(false);
      setIsLoading(true); */

      const results = await axios.get(`http://localhost:4000/jobs?`);
      console.log(results);
      setJobs(results.data.data);
      setFilter(results.data.search);

      /*       setIsLoading(false); */
    } catch (error) {
      /*       setIsError(true);
      setIsLoading(false); */
    }
    return {
      jobs,
      isError,
      isLoading,
    };
  };

  const getOneJob = async (jobId) => {
    try {
      const results = await axios.get(`http://localhost:4000/jobs/${jobId}`);
      console.log(results.data.data);
      setJob(results.data.data);
    } catch (error) {
      console.log(error);
    }
    return {
      job,
    };
  };
  /*   useEffect(() => {
    job;
  }, [job]); */

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
        getJobs,
        getOneJob,
        filter,
        setFilter,
        seeMore,
        setSeeMore,
        getOneJob,
        selectedJobId,
        setSelectedJobId,
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
