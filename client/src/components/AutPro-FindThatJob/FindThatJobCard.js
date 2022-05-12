import styled from "@emotion/styled";
import React from "react";
import axios from "axios";
// Pictures --------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import CompanyIcon from "../../assets/building-3-line.svg";
import FocusIcon from "../../assets/money-dollar-circle-line.svg";
// Contexts --------------------
import { useUserData } from "../../contexts/usersData";
import { useJobsData } from "../../contexts/jobsData";
// Contexts --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
//
function FindThatJobCard() {
  const { jobs, setJobs, searchJobText, setSearchJobText } = useJobsData();
  const { textUpperCase } = UtilitiesFunction();

  return (
    <Wrapper>
      <JobsCounterNumber>{jobs.length} jobs for you</JobsCounterNumber>
      <FindThatJobWrapper className="shadow-medium">
        {jobs.map((items, index) => {
          const { jobTitle, jobCategory, jobType, minSalary, maxSalary } =
            items;
          return (
            <JobCardWrapper key={index}>
              <JobCardContent>
                <ContentLeft>
                  <CompanyLogoWrapper>
                    <CompanyLogo src="../../assets/placeholder/placeholder-company.jpg"></CompanyLogo>
                  </CompanyLogoWrapper>
                </ContentLeft>
                <ContentRight>
                  <JobCategory>{jobCategory}</JobCategory>
                  <JobTitle>{jobTitle}</JobTitle>
                  <CompanyName>The Company Name</CompanyName>
                  <SubContentWrapper>
                    <JobType>{jobType}</JobType>
                    <Salary>
                      <span>
                        <img src={DollarLineIcon} alt="DollarIcon" />
                      </span>
                      {minSalary}k - {maxSalary}k
                    </Salary>
                  </SubContentWrapper>
                </ContentRight>
              </JobCardContent>
              <JobCardFooter>
                <FollowButton className="btn btn-white btn-lg">
                  <FollowIcon scr={FocusIcon}>
                    {textUpperCase("follow")}
                  </FollowIcon>
                </FollowButton>
                <SeeMoreButton className="btn btn-white btn-lg pink-border">
                  {textUpperCase("see more")}
                </SeeMoreButton>
              </JobCardFooter>
            </JobCardWrapper>
          );
        })}
      </FindThatJobWrapper>
    </Wrapper>
  );
}
export default FindThatJobCard;

//  CSS Zone --------------------------
const Wrapper = styled.section`
  padding-top: 1rem;
`;
const JobsCounterNumber = styled.h1`
  padding: 15px 0;
  font-weight: 500;
  font-size: 1.25rem;
`;
const FindThatJobWrapper = styled.h1`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  border-radius: 8px;
  width: 290px;
  padding: 16px;
  background-color: var(--white);
`;
const JobCardWrapper = styled.div`
  display: flex;
`;
const JobCardContent = styled.div`
  display: flex;
`;
const CompanyLogoWrapper = styled.div`
  width: 74.67px;
  height: 74.67px;
  overflow: hidden;
`;
const CompanyLogo = styled.img`
  object-fit: cover;
  width: 74.67px;
  height: 74.67px;
`;
const ContentLeft = styled.img``;
const ContentRight = styled.img`
  display: flex;
  flex-direction: column;
  line-height: 16px;
`;
const JobCategory = styled.p`
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-size: 0.75rem;
`;
const JobTitle = styled.h1`
  color: var(--primary-text-color);
  font-weight: 500;
  font-size: 1.25rem;
`;
const CompanyName = styled.h3`
  color: var(--gray);
  font-weight: 500;
  font-size: 0.875rem;
`;
const SubContentWrapper = styled.div`
  display: flex;
  color: var(--light-gray);
  font-weight: 400;
  font-size: 0.75rem;
`;
const JobType = styled.p``;
const Salary = styled.p`
  font-family: var(--seconary-font);
`;
const JobCardFooter = styled.img`
  display: flex;
`;
const FollowButton = styled.button``;
const FollowIcon = styled.img``;
const SeeMoreButton = styled.button``;
