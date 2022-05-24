import styled from "@emotion/styled";
import { useEffect, useState } from "react";
// Components
import FindThatJobCard from "../../components/P-Page-FindThatJob/FindThatJobCard";
import FindThatJobHeader from "../../components/P-Page-FindThatJob/FindThatJobHeader";
/* import Pagination from "../../components/AutPro-FindThatJob/Pagination";
 */ import AlertDialog from "../../components/Utilities/AlertDialog";
// Contexts ----------------------
import { useJobsData } from "../../contexts/jobsData";
function FindJobsPage() {
  const userRole = localStorage.getItem("role");
  const { jobs } = useJobsData();
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

  return (
    <Wrapper>
      <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
      <FindThatJobHeader setPaginationLoading={setPaginationLoading} />
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
