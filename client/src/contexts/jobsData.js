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

  // Others Data -----------------------------------------
  const [createdJobDate, setCreatedJobDate] = useState("");
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [candidatesOnTrack, setCandidatesOnTrack] = useState(0);
  const [jobsStatus, setJobsStatus] = useState(null);

  // Connecting to Jobs Database & Searchbox ---------------------
  const [jobs, setJobs] = useState([]);
  const [searchJobText, setSearchJobText] = useState("");
  const [searchMinSalaryText, setSearchMinSalaryText] = useState(null);
  const [searchMaxSalaryText, setSearchMaxSalaryText] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [keywordsNumber, setKeywordsNumber] = useState("");
  // Error State ------------------------------------------
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // State only for Filter Job Feature -------------------------------
  const [jobCategoryList, setJobCategoryList] = useState([
    "Manufacturing",
    "Legal",
    "Education",
    "Government",
    "Sales",
  ]);
  const [jobTypeList, setJobTypeList] = useState(["Full Time", "Part Time"]);

  // Get Data for mapping in Find that Job Page ----------------------------------------

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
  /*  */
  /*  const getPosts = async (input) => {
    const { status, keywords, page } = input;
    try {
      const params = new URLSearchParams();
      params.append("status", status);
      params.append("keywords", keywords);
      params.append("page", page);
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        `http://localhost:4000/posts?${params.toString()}`
      );
      setPosts(results.data.data);
      setTotalPages(results.data.total_pages);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }; */

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
        // Connecting to Jobs Database & Searchbox ---------------------
        jobs,
        setJobs,
        searchJobText,
        setSearchJobText,
        searchMinSalaryText,
        setSearchMinSalaryText,
        searchMaxSalaryText,
        setSearchMaxSalaryText,
        getJobs,
        // State only for Filter Job Feature -------------------------------
        jobCategoryList,
        setJobCategoryList,
        jobTypeList,
        setJobTypeList,
        keywords,
        setKeywords,
        keywordsNumber,
        setKeywordsNumber,
        // Error State ------------------------------------------
        isError,
        setIsError,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </JobsDataContext.Provider>
  );
}

const useJobsData = () => React.useContext(JobsDataContext);

export { JobsDataProvider, useJobsData };
