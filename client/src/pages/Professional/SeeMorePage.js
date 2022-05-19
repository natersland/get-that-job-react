import styled from "@emotion/styled";
import moment from "moment";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
//Components ------------------------------------
import SeletedCompanyDetail from "../../components/AuthPro-SharedComponents/SeletedCompanyDetail.js";
import SeletedCompany from "../../components/AuthPro-SharedComponents/SeletedCompany";
// Pictures -------------------------------------
import NavigationIcon from "../../assets/navigation-line.svg";

function SeeMorePage() {
  const { job, setJob } = useJobsData();
  const location = useLocation();
  console.log("hi", location);
  const getOneJob = async () => {
    try {
      const jobId = localStorage.getItem("jobId");
      const results = await axios.get(`http://localhost:4000/jobs/${jobId}`);
      console.log("getOneJob", results.data.data);
      setJob(results.data.data);
    } catch (error) {
      console.log(error);
    }
    return {
      job,
    };
  };

  useEffect(() => {
    getOneJob();
    let timeOut;
    if (job) {
      timeOut = setTimeout(job, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  /*   useMemo(() => {
    getOneJob();
  }, [job]); */

  const contentData = [
    { title: "About The company name SA", content: "job" }, // aboutCompany
    { title: "About the job position", content: job.aboutJob }, // aboutJob
    { title: "Mandatory Requirements", content: job.mandatoryReq }, // mandatoryReq
    { title: "Optional Requirements", content: job.optionalReq }, // optionalReq
  ];

  const applyNowBtn = () => {
    return (
      <button className="btn btn-lg btn-pink uppercase">
        <span>
          <img className="mr-2" src={NavigationIcon} alt="Navigation Icon" />
        </span>
        apply now
      </button>
    );
  };
  return (
    <Wrapper>
      <Header>
        <CompanyWrapper>
          <HeaderLeft>
            <SeletedCompany />
          </HeaderLeft>
          <HeaderRight>{applyNowBtn()}</HeaderRight>
        </CompanyWrapper>
        <HeaderTitleWrapper>
          <SeletedCompanyDetail />
        </HeaderTitleWrapper>
      </Header>
      <ContentWrapper>
        {contentData.map((items, index) => {
          const { title, content } = items;
          return (
            <ContentBox key={index}>
              <ContentHeading className="text-pinkprimary">
                {title}
              </ContentHeading>
              {content}
            </ContentBox>
          );
        })}

        <ContentFooter>{applyNowBtn()}</ContentFooter>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 75%;
  border: 1px dash black;
  padding: 25px 0;
  margin-left: 350px;
`;
const Header = styled.section`
  display: flex;
  flex-direction: column;
`;
const CompanyWrapper = styled.div`
  display: flex;
`;

const HeaderLeft = styled.div`
  width: 80%;
`;
const HeaderRight = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const HeaderTitleWrapper = styled.div`
  padding: 45px;
`;
const ContentWrapper = styled.section``;
const Content = styled.section``;
const ContentBox = styled.div`
  width: 80%;
  margin: 10px 0;
`;

const ContentHeading = styled.h3`
  font-size: 1.5rem;
`;
const ContentText = styled.p`
  color: var(--primary-text-color);
  font-size: 1rem;
`;
const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

export default SeeMorePage;
