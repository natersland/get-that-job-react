import styled from "@emotion/styled";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Pictures --------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import CompanyIcon from "../../assets/building-3-line.svg";
import FocusIconActive from "../../assets/focus.svg";
import FocusIconUnActive from "../../assets/icons/FocusIconUnActive.svg";
import CalendarIcon from "../../assets/calendar-2-line.svg";
import NavigationIcon from "../../assets/navigation-line.svg";

// Contexts --------------------
import { useJobsData } from "../../contexts/jobsData";
import { useVadilation } from "../../contexts/vadilation";
// Utils --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
//Components --------------------
import BackDropLoading from "../Utilities/BackDropLoading";
import CircularIndeterminate from "../Utilities/CircularIndeterminate";
import UserStatusCheckerBtn from "./UserStatusCheckerBtn";

function JobCard({
  jobTitle,
  companyName,
  jobCategory,
  jobType,
  minSalary,
  maxSalary,
  companyDetail,
  jobId,
}) {
  const { convertSalary } = UtilitiesFunction();

  const companyLogoCheck = () => {
    if (companyDetail[0]?.companyLogo[0]) {
      return companyDetail[0]?.companyLogo[0].url;
    } else {
      return null;
    }
  };

  // render start here -------------------------------------------------
  return (
    <JobCardWrapper className={`shadow-medium `}>
      <JobCardContent>
        {/* Left Side ---------------------------------------------- */}
        <ContentLeft>
          <CompanyLogoWrapper>
            <CompanyLogoJa src={companyLogoCheck()}></CompanyLogoJa>
          </CompanyLogoWrapper>
        </ContentLeft>
        {/* Right Side ---------------------------------------------- */}
        <ContentRight>
          <JobCategory>
            <span>
              <img className="mr-1" src={CompanyIcon} alt="Company Icon" />
            </span>{" "}
            {jobCategory}
          </JobCategory>
          <JobTitleText>{jobTitle}</JobTitleText>
          <CompanyNameText>{companyName}</CompanyNameText>
          {/* Left Side: Sub Content ---------------------------------------------- */}
          <SubContentWrapper>
            <JobTypeText>
              <span className="mr-1">
                <img src={CalendarIcon} alt="Calendar Icon" />
              </span>
              {jobType}
            </JobTypeText>
            <Salary>
              <span className="mr-1">
                <img src={DollarLineIcon} alt="DollarIcon" />
              </span>
              {convertSalary(minSalary)} - {convertSalary(maxSalary)}
            </Salary>
          </SubContentWrapper>
        </ContentRight>
      </JobCardContent>

      {/* Left Side: Footer ---------------------------------------------- */}
      <JobCardFooter>
        <UserStatusCheckerBtn mode="follow" jobId={jobId} />
        <UserStatusCheckerBtn mode="seemore" jobId={jobId} />
      </JobCardFooter>
    </JobCardWrapper>
  );
}
export default JobCard;

//  CSS Zone --------------------------

const JobCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 8px;
  width: 320px;
  padding: 16px;
  background-color: var(--white);
`;
const JobCardContent = styled.div`
  display: flex;
`;
const ContentLeft = styled.div`
  margin-right: 15px;
`;

const CompanyLogoWrapper = styled.div`
  width: 74.67px;
  height: 74.67px;
  overflow: hidden;
`;
const CompanyLogoJa = styled.img`
  object-fit: cover;
  width: 74.67px;
  height: 74.67px;
  border: 1px solid dotted;
`;
const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 16px;
  width: 100%;
`;
const JobCategory = styled.p`
  display: flex;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-size: 0.75rem;
`;
const JobTitleText = styled.h1`
  color: var(--primary-text-color);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 28px;
`;
const CompanyNameText = styled.h3`
  color: var(--gray);
  font-weight: 500;
  font-size: 0.875rem;
`;
const SubContentWrapper = styled.div`
  display: flex;
  color: var(--light-gray);
  font-weight: 400;
  font-size: 0.75rem;
  margin-top: 5px;
`;
const JobTypeText = styled.p`
  line-height: 16px;
  width: 50%;
  display: flex;
`;
const Salary = styled.p`
  font-family: var(--seconary-font);
  display: flex;
  justify-content: center;
`;
const JobCardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;
const FollowBtnWrapper = styled.div`
  display: flex;
`;
const FollowButton = styled.p`
  padding-left: 0;
  margin-left: 10px;
  cursor: pointer;
`;
const FollowCircle = styled.div`
  background-color: var(--secoundary-brand-color);
  border-radius: 50px;
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 500;
  cursor: pointer;
`;
const FollowIcon = styled.img``;
