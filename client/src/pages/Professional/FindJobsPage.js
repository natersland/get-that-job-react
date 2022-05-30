import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
// Components
import FindThatJobCard from "../../components/PRO-FindThatJob/FindThatJobCard";
import FindThatJobHeader from "../../components/PRO-FindThatJob/FindThatJobHeader";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
import JobCard from "../../components/SharedComponents/JobCard";
import AlertDialog from "../../components/Utilities/AlertDialog";
// Contexts ----------------------
import { useJobsData } from "../../contexts/jobsData";
// Utils -----------------------------
import Pagination from "@mui/material/Pagination";

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
  const [paginationLoading, setPaginationLoading] = useState(false);

  // Pagination Start Here ----------------------------------
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fecth data from Back-End ---------------------------------
  const search = async () => {
    setPaginationLoading(true);
    const results = await axios.get(
      `http://localhost:4000/jobs?page=${page}&keywords=${searchJobText}&searchMinSalaryText=${searchMinSalaryText}&searchMaxSalaryText=${searchMaxSalaryText}&searchJobCategory=${searchJobCategory}&jobType=${jobType}`
    );
    setJobs(results.data.data);
    setTotalPages(results.data.total_pages);
    setPaginationLoading(false);
  };
  // check if not fetching -> map jobs data ---------------------------------
  const checkIsFecthing = () => {
    if (paginationLoading) {
      return <CircularIndeterminate />;
    } else {
      jobs.map((job, index) => {
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
      });
    }
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
      <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
      <FindThatJobHeader
        setSearchJobText={setSearchJobText}
        setSearchMinSalaryText={setSearchMinSalaryText}
        setSearchMaxSalaryText={setSearchMaxSalaryText}
        setsearchJobCategory={setsearchJobCategory}
        setJobType={setJobType}
        setKeywordsNumber={setKeywordsNumber}
        setPaginationLoading={setPaginationLoading}
        searchJobText={searchJobText}
        searchMinSalaryText={searchMinSalaryText}
        searchMaxSalaryText={searchMaxSalaryText}
        searchJobCategory={searchJobCategory}
        keywordsNumber={keywordsNumber}
        jobType={jobType}
      />
      {/*Old  */}
      {/*       <p className="bg-pinkprimary text-white p-1 mt-4">Old</p>
      <FindThatJobCard paginationLoading={paginationLoading} /> */}
      {/*--------------------------------------------------- */}
      {/*New  */}
      <BackDropLoading />
      {/*       <p className="bg-pinkprimary text-white p-1 mt-4">New</p>
       */}{" "}
      <JobsCounterNumber>{jobs?.length} jobs for you</JobsCounterNumber>
      <FindThatJobWrapper>
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
      </FindThatJobWrapper>
      {/*--------------------------------------------------- */}{" "}
      <NumberOfPage>
        <Pagination
          count={totalPages}
          color="primary"
          defaultPage={page}
          onChange={(event, value) => setPage(value)}
        />
      </NumberOfPage>
    </Wrapper>
  );
}

export default FindJobsPage;
const Wrapper = styled.section`
  width: 75vw;
  padding-left: 325px;
  margin-bottom: 100px;
`;

const JobsCounterNumber = styled.h1`
  padding: 15px 0;
  font-weight: 500;
  font-size: 1.25rem;
`;
const FindThatJobWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px 0;
  width: 100%;
  padding-left: 10px;
`;

const NumberOfPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;
