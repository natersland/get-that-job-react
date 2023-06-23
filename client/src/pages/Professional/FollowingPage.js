import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useLocation } from "react-router-dom";
import useCheckLocation from "../../hooks/useCheckLocation";
// Components ------------------------------------------
import JobCard from "../../components/SharedComponents/JobCard";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
// Contexts ------------------------------------------
import { useUtils } from "../../contexts/utilsContext";
// Hooks -------------------------
import useFetch from "../../hooks/useFetch";
function FollowingPage() {
  // Loading ----------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const professionalId = localStorage.getItem("id");
  const [jobs, setJobs] = useState([]);
  const [userFollowingJobId, setUserFollowingJobId] = useState([]);
  const { loading, gtjApiService } = useUtils();
  // detect user refresh page and setting sidebar index ----------------------------
  const location = useLocation();
  const { checkUserPage } = useCheckLocation(
    location.pathname,
    "/following",
    3
  );

  const fecthData = async () => {
    checkUserPage();
    setIsLoading(true);
    function getJobData() {
      return axios.get(`${gtjApiService}/jobs/data`);
    }
    function getUserData() {
      return axios.get(`${gtjApiService}/users/${professionalId}`);
    }
    await Promise.all([getJobData(), getUserData()]).then(function (results) {
      setJobs(results[0].data.data);
      setUserFollowingJobId(results[1]?.data?.followingJobs);
    });
    setIsLoading(false);
  };
  const { data, reFetch } = useFetch(
    `${gtjApiService}/users/${professionalId}`
  );

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
          data={data}
          reFetch={reFetch}
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
    fecthData();
  }, []);

  return (
    <Wrapper>
      <BackDropLoading />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <div>
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
        </div>
      )}
    </Wrapper>
  );
}
export default FollowingPage;
const Wrapper = styled.section`
  padding-top: 32px;

  margin-bottom: 100px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin: 35px;
    width: 80%;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-left: 35px;
    margin-top: 35px;
    width: 80%;
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    margin-top: 0;
    margin-left: 300px;
    width: 65%;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    margin-left: 325px;
    width: 80%;
  }
  /* Extra (desktops, 1400  and up) */
  @media only screen and (min-width: 1400px) {
    margin-left: 325px;
    width: 70%;
  }
  /* Extra (desktops, 1920 and up) */
  @media only screen and (min-width: 1920px) {
    width: 50%;
  }
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
  width: 100%;
  padding-left: 10px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 20px 0;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  /* Extra (desktops, 1920 and up) */
  @media only screen and (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  /* Extra (desktops, 1920 and up) */
  @media only screen and (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
