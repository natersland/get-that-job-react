import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Pictures -----------------------------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import IndustryIcon from "../../assets/building-3-line.svg";
import ClockIcon from "../../assets/time-line.svg";
import CalendarIcon from "../../assets/calendar-2-line.svg";
import EmailIcon from "../../assets/mail-check-line.svg";
import AppliedIcon from "../../assets/status/applied.svg";
import ReviewIcon from "../../assets/status/reviewing.svg";
import FinishedIcon from "../../assets/status/finished.svg";
import DeclineIcon from "../../assets/status/declined.svg";
import ToggleSignIcon from "../../assets/items/Vector.svg";
// Components -----------------------------------------
import IconWithText from "../SharedComponents/IconWithText";
// Hooks -----------------------------------------
import useToggle from "../../hooks/useToggle";
// Contexts -----------------------------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
function ApplicationToggle({
  companyLogo,
  jobTitle,
  companyName,
  jobCategory,
  JobType,
  jobMinSalary,
  jobMaxSalary,
  createdJobDate,
  apllicationCreatedDate,
  applicationStatus,
  personalExperience,
  education,
}) {
  const { isOpen, toggle } = useToggle(false);
  const { convertSalary } = UtilitiesFunction();

  const jobDetailsData = [
    { icon: IndustryIcon, text: jobCategory },
    { icon: CalendarIcon, text: JobType },
    {
      icon: DollarLineIcon,
      text: `${convertSalary(jobMinSalary)}-${convertSalary(jobMaxSalary)}`,
    },
    { icon: ClockIcon, text: createdJobDate },
  ];

  const toggleContent = () => {
    return (
      <ContentWrapper>
        <HeaderText className="mb-2 mt-2">Professional experience</HeaderText>
        <p>{personalExperience}</p>
        <HeaderText className="mb-2 mt-2">Education</HeaderText>
        <p className="mb-8">{education}</p>
      </ContentWrapper>
    );
  };
  const checkApplicationStatus = () => {
    if (applicationStatus === "applied") {
      return (
        <IconWithText
          icon={AppliedIcon}
          status="apllied"
          text="Waiting for review"
        />
      );
    } else if (applicationStatus === "reviewing") {
      return (
        <IconWithText
          icon={ReviewIcon}
          status="reviewing"
          text="Review in progress"
        />
      );
    } else if (applicationStatus === "finished") {
      return (
        <IconWithText
          icon={FinishedIcon}
          status="finished"
          text="Review finished"
        />
      );
    } else if (applicationStatus === "declined") {
      return (
        <IconWithText
          icon={DeclineIcon}
          status="declined"
          text="Declined on 07/11/20" // กลับมาเอา state มาใส่ด้วย
        />
      );
    }
  };
  return (
    <Wrapper className="shadow-md">
      {/* Header Section -----------------------------------*/}
      <HeaderSection>
        <JobWrapper>
          <CompanyLogoWrapper>
            <CompanyLogo src={companyLogo} />
          </CompanyLogoWrapper>
          <JobHeading>
            <JobTitle>{jobTitle}</JobTitle>
            <CompanyName>{companyName}</CompanyName>
          </JobHeading>
        </JobWrapper>
        <JobDetailsWrapper>
          {jobDetailsData.map((item, index) => {
            const { icon, text } = item;
            return (
              <JobDetailsItem key={index}>
                <img src={icon} height="15.5px" width="15.5px" alt="icon" />{" "}
                <SpanText>{text}</SpanText>
              </JobDetailsItem>
            );
          })}
        </JobDetailsWrapper>
        <ApplicationStatusWrapper>
          <IconWithText
            icon={EmailIcon}
            status="default"
            text={apllicationCreatedDate}
          />
          {checkApplicationStatus()}
        </ApplicationStatusWrapper>
        <ToggleWrapper>
          <ToggleIcon src={ToggleSignIcon} onClick={toggle} />
        </ToggleWrapper>
      </HeaderSection>
      {/* Content Section -----------------------------------*/}
      <ContentSection>{isOpen ? toggleContent() : null}</ContentSection>
    </Wrapper>
  );
}
export default ApplicationToggle;

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 20px;
`;
// Header Section -----------------------------------
const HeaderSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  padding: 0 15px;
`;
// Header Section -----------------------------------
// Section 1
const JobWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
`;
const CompanyLogoWrapper = styled.div`
  border: 1px black dotted;
  width: 59.73px;
  height: 59.73px;
  overflow: hidden;
`;
const CompanyLogo = styled.img`
  width: 59.73px;
  height: 59.73px;
  object-fit: cover;
`;
const JobHeading = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 59.73px;
  margin-left: 15px;
`;
const JobTitle = styled.h1`
  font-weight: 500;
  font-size: 1.25rem;
  letter-spacing: 0.15px;
`;
const CompanyName = styled.h3`
  font-weight: 500;
  font-size: 0.875 rem;
  letter-spacing: 0.1px;
`;
// Section 2
const JobDetailsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 25%;
  height: 59.73px;
`;
const JobDetailsItem = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  width: auto;
`;
const SpanText = styled.span`
  color: var(--light-gray);
  font-size: 0.85rem;
  padding-left: 5px;
`;
// Section 3
const ApplicationStatusWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  height: 100%;
`;
// Section 4
const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 59.73px;
  width: 5%;
  cursor: pointer;
`;
const ToggleIcon = styled.img``;
// Content Section -----------------------------------
const ContentSection = styled.section``;
const ContentWrapper = styled.div`
  padding: 20px;
  width: 85%;
`;
const HeaderText = styled.h1`
  font-size: 1rem;
  line-height: 20px;
  letter-spacing: 0.15px;

  color: var(--primary-brand-color);
`;
