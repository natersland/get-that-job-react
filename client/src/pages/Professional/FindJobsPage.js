import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
// Components
import FindThatJobCard from "../../components/PRO-FindThatJob/FindThatJobCard";
import FindThatJobHeader from "../../components/PRO-FindThatJob/FindThatJobHeader";
/* import Pagination from "../../components/AutPro-FindThatJob/Pagination";
 */ import AlertDialog from "../../components/Utilities/AlertDialog";
// Contexts ----------------------
import { useJobsData } from "../../contexts/jobsData";
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

  // Pagination Start Here ----------------------------------
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(12);
  // Get current posts
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  /*   const currentCards = jobs.slice(indexOfFirstJob, indexOfLastJob);
   */
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const search = async () => {
    setPaginationLoading(true);
    const results = await axios.get(
      `http://localhost:4000/jobs?keywords=${searchJobText}&searchMinSalaryText=${searchMinSalaryText}&searchMaxSalaryText=${searchMaxSalaryText}&searchJobCategory=${searchJobCategory}&jobType=${jobType}`
    );
    setJobs(results.data.data);
    setPaginationLoading(false);
  };

  useEffect(() => {
    search();
  }, [
    searchJobText,
    searchMinSalaryText,
    searchMaxSalaryText,
    searchJobCategory,
    jobType,
  ]);

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
      <FindThatJobCard
        /*         currentPage={currentPage}
         */ paginationLoading={paginationLoading}
      />
      {/*       <Pagination
        jobPerPage={jobsPerPage}
        totalJobs={jobs.length}
        paginate={paginate}
      /> */}
    </Wrapper>
  );
}

export default FindJobsPage;

const Wrapper = styled.section`
  width: 65%;
  margin: auto;
  margin-bottom: 100px;
`;
