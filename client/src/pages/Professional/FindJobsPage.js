import styled from "@emotion/styled";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
// Components
import FindThatJobHeader from "../../components/PRO-FindThatJob/FindThatJobHeader";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
import JobCard from "../../components/SharedComponents/JobCard";
import AlertDialog from "../../components/Utilities/AlertDialog";
import Pagination from "@mui/material/Pagination";
// Contexts ----------------------
import { useJobsData } from "../../contexts/jobsData";
// Utils -----------------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
// Hooks -----------------------------
function FindJobsPage() {
  const userRole = localStorage.getItem("role");
  // State for filter searching ----------------------------------
  const [searchJobText, setSearchJobText] = useState("");

  const [searchMinSalaryText, setSearchMinSalaryText] = useState("");
  const [searchMaxSalaryText, setSearchMaxSalaryText] = useState("");
  const [searchJobCategory, setsearchJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [keywordsNumber, setKeywordsNumber] = useState("");
  const { jobs, setJobs } = useJobsData();
  // Loading ----------------------------------
  const [isLoading, setIsLoading] = useState(false);
  // Pagination Start Here ----------------------------------
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCompany, setTotalCompany] = useState(0);
  const [sum, setSum] = useState(0);

  const { componentDidMount } = UtilitiesFunction();
  // Fecth data from Back-End ---------------------------------
  const search = async () => {
    setIsLoading(true);
    const results = await axios.get(
      `http://localhost:4000/jobs?page=${page}&keywords=${searchJobText}&searchMinSalaryText=${searchMinSalaryText}&searchMaxSalaryText=${searchMaxSalaryText}&searchJobCategory=${searchJobCategory}&jobType=${jobType}`
    );
    setJobs(results.data.data);
    setTotalPages(results.data.total_pages);
    setSum(results.data.sum);
    setTotalJobs(results.data.total_jobs);
    /* setTotalCompany(results.data.total_Company); */

    setIsLoading(false);
  };

  useEffect(() => {
    search();
  }, [
    searchJobText,

    searchMinSalaryText,
    searchMaxSalaryText,
    searchJobCategory,
    jobType,
    page,
  ]);

  // render start here ----------------------------------------
  return (
    <Wrapper>
      <AlertDialog />
      {/*Header: filter box zone --------------------------------------- */}{" "}
      <FindThatJobHeader
        setSearchJobText={setSearchJobText}
        setSearchMinSalaryText={setSearchMinSalaryText}
        setSearchMaxSalaryText={setSearchMaxSalaryText}
        setsearchJobCategory={setsearchJobCategory}
        setJobType={setJobType}
        setKeywordsNumber={setKeywordsNumber}
        setIsLoading={setIsLoading}
        searchJobText={searchJobText}
        searchMinSalaryText={searchMinSalaryText}
        searchMaxSalaryText={searchMaxSalaryText}
        searchJobCategory={searchJobCategory}
        keywordsNumber={keywordsNumber}
        jobType={jobType}
      />
      {/*Body: job card zone --------------------------------------- */}{" "}
      <FindThatJobWrapper>
        <BackDropLoading />
        <JobsCounterNumber>{sum} jobs for you</JobsCounterNumber>
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <FindThatJobGrid>
            {jobs.map((job, index) => {
              return (
                <JobCard
                  key={index}
                  jobTitle={job?.jobTitle}
                  companyName={job?.company[0]?.companyName}
                  jobCategory={job?.jobCategory}
                  jobType={job?.jobType}
                  minSalary={job?.minSalary}
                  maxSalary={job?.maxSalary}
                  companyDetail={job?.company}
                  jobId={job?._id}
                />
              );
            })}
          </FindThatJobGrid>
        )}
        {/*Pagination --------------------------------------- */}{" "}
        <NumberOfPage>
          <Pagination
            count={totalPages}
            showFirstButton
            showLastButton
            color="primary"
            defaultPage={page}
            onClick={componentDidMount}
            onChange={(event, value) => setPage(value)}
            sx={{ marginLeft: "19px" }}
          />
        </NumberOfPage>
      </FindThatJobWrapper>
    </Wrapper>
  );
}

export default FindJobsPage;
const Wrapper = styled.section`
  margin-bottom: 100px;

  @media only screen and (max-width: 600px) {
    margin: 30px;
    width: 80%;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin: 30px;
    width: 90%;
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    margin-top: 0;
    margin-left: 300px;
    width: 70%;
  }
  /* Extra (desktops, 1400 and up) */
  @media only screen and (min-width: 1200px) {
    width: 60%;
    padding: 10px;
    margin-left: 300px;
  }
  /* Extra (desktops, 1920 and up) */
  @media only screen and (min-width: 1400px) {
    margin-left: 300px;
  }
  /* Extra (desktops, 1920 and up) */
  @media only screen and (min-width: 1920px) {
    margin-left: 300px;
  }
`;

const JobsCounterNumber = styled.h1`
  font-weight: 500;
  font-size: 1.25rem;
`;
const FindThatJobWrapper = styled.div`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin-top: -50px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-top: 50px;
  }
`;
const FindThatJobGrid = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  padding-left: 10px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 20px 0;
    margin-top: 20px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-top: 20px;
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-top: 20px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  /* Extra (laptops/desktops, 1400 and up) */
  @media only screen and (min-width: 1400px) {
    grid-gap: 30px;
  }
  /* Extra (desktops, 1920 and up) */
  @media only screen and (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const NumberOfPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;
