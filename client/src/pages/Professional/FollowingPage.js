import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
// Components
import JobCard from "../../components/SharedComponents/JobCard";
// Hooks
import useFetch from "../../hooks/useFetch";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";

function FollowingPage() {
  // Loading ----------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const professionalId = localStorage.getItem("id");
  const [jobs, setJobs] = useState([]);
  const [userFollowingJobId, setUserFollowingJobId] = useState([]);
  const jobdata = async () => {
    setIsLoading(true);
    const results = await axios.get(`http://localhost:4000/jobs/data`);
    setJobs(results.data.data);
  };

  const getUserData = async () => {
    const results = await axios.get(
      `http://localhost:4000/users/${professionalId}`
    );
    setUserFollowingJobId(results?.data?.followingJobs);
    setIsLoading(false);
  };
  // fx แสดงข้อมูลfollowing job ของ user ทั้งหมด + ฟีลเตอร์ด้วย map ----------------------------------------------
  const jobsDataMapping = jobs?.map((job, index) => {
    const jobData = () => {
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
    };
    let i = 0;
    while (i < userFollowingJobId?.length) {
      if (job?._id === userFollowingJobId[i]) {
        return jobData();
      }
      i++;
    }
  });
  const countData = jobsDataMapping.filter((items) => {
    return items !== undefined;
  });
  useEffect(() => {
    jobdata();
    getUserData();
  }, []);
  return (
    <Wrapper>
      <SectionHeadingText>Following</SectionHeadingText>
      <FollowingFoundText>
        You are following{" "}
        {jobsDataMapping?.length === 0 ? "0" : `${countData.length} `} jobs
      </FollowingFoundText>

      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <FindThatJobGrid>{_.reverse(jobsDataMapping)}</FindThatJobGrid>
      )}
    </Wrapper>
  );
}
export default FollowingPage;
const Wrapper = styled.section`
  width: 75vw;
  padding-left: 325px;
  margin-bottom: 100px;
`;
const SectionHeadingText = styled.h1`
  font-size: 2.125rem;
  padding-top: 1.5rem;
  padding-top: 20px 0;
`;
const FollowingFoundText = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  padding: 10px 0;
`;

const FindThatJobGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px 0;
  width: 100%;
  padding-left: 10px;

  /*   display: ${(props) => (props.status ? "none" : null)};
 */
`;
