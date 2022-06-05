import styled from "@emotion/styled";
import React, { useEffect } from "react";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
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
import CrossIcon from "../../assets/icons/cross-icon.svg";
// Components -----------------------------------------
import IconWithText from "../SharedComponents/IconWithText";
import ToggleCard from "../SharedComponents/ToggleCard";
import Tooltip from "@mui/material/Tooltip";
// Utils -----------------------------------------
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
  deleteApplication,
  appId,
  reFetch,
  changeApplicationStatus,
  declinedDate,
}) {
  // Convert Salary มีอยู่ใน utils -> UtilitiesFunction เอาไว้ใช้แปลงเงินเดือนให้เป็นหน่วย k ได้
  const { convertSalary } = UtilitiesFunction();

  // อันนี้เป็นข้อมูลที่อยู่ในส่วน JobDetail ใน Header Zone ----------------
  const jobDetailsData = [
    { icon: IndustryIcon, text: jobCategory },
    { icon: CalendarIcon, text: JobType },
    {
      icon: DollarLineIcon,
      text: `${convertSalary(jobMinSalary)} - ${convertSalary(jobMaxSalary)}`,
    },
    { icon: ClockIcon, text: createdJobDate },
  ];

  // fx เช็คสถานะต่างๆ ถ้าสถานะตรงตามเงื่อนไขให้เปลี่ยนสี / ดีไซน์  ----------------
  // IconWithText มีอยุู่ใน SharedComponents ใช้ด้วยกันได้
  const checkApplicationStatus = () => {
    const statusComponent = (icon, status, text) => {
      // status จะมีทั้งหมด 5 อัน  (default, apllied, reviewing, finished,declined) ถ้าใส่ไปแล้วมัันจะเปลี่ยนสีตามสถานะ
      // ดูวิธีใช้ตรงหน้า components -> SharedComponents -> IconWithText
      return <IconWithText icon={icon} status={status} text={text} />;
    };
    if (applicationStatus === "applied") {
      return statusComponent(AppliedIcon, "applied", "Waiting for review");
    } else if (applicationStatus === "reviewing") {
      return statusComponent(ReviewIcon, "reviewing", "Review in progress");
    } else if (applicationStatus === "finished") {
      return statusComponent(FinishedIcon, "finished", "Review finished");
    } else if (applicationStatus === "declined") {
      return statusComponent(
        DeclineIcon,
        "declined",
        `Declined on ${moment(declinedDate).format("L")}`
      );
    }
  };
  // fx เก็บคอนเทนท์ส่วน Header ของ ToggleCard Component ------------------
  // ToggleCard มีอยุู่ใน SharedComponents ใช้ด้วยกันได้
  const headerContent = () => {
    return (
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
                <img src={icon} height="15.5px" width="15.5px" alt="icon" />
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
          <Tooltip title="Delete this application" arrow>
            <CloseBtnWrapper
              className="btn btn-pink"
              onClick={() => {
                localStorage.setItem("applicationId", appId);
                deleteApplication();
                reFetch();
              }}
            >
              <CloseBtn>X</CloseBtn>
            </CloseBtnWrapper>
          </Tooltip>
        </ApplicationStatusWrapper>
      </HeaderSection>
    );
  };

  // fx Decline Button Status Checker ------------------------
  const declineBtnStatusChecker = (status) => {
    const declineBtn = (text, color, btnStatus) => {
      return (
        <DeclineBtn
          className={`btn btn-md ${color} uppercase`}
          disabled={btnStatus}
          onClick={(e) => {
            localStorage.setItem("applicationId", appId);
            changeApplicationStatus(e);
          }}
        >
          <span className="mr-2">
            {status === "declined" ? null : (
              <img src={CrossIcon} alt="cross-icon" />
            )}
          </span>
          {text}
        </DeclineBtn>
      );
    };
    if (status !== "declined") {
      return declineBtn("decline application", "btn-active", false);
    } else {
      return declineBtn(
        `declined on ${moment(declinedDate).format("L")}`,
        "btn-gray",
        true
      );
    }
  };

  // fx เก็บคอนเทนท์ส่วน Content(ที่ซ่อนใน toggle) ของ ToggleCard Component ------------------
  const toggleContent = () => {
    return (
      <ContentWrapper>
        <HeaderText className="mb-2 mt-2">Professional experience</HeaderText>
        <p>{personalExperience}</p>
        <HeaderText className="mb-2 mt-2">Education</HeaderText>
        <p className="mb-8">{education}</p>
        <DeclineBtnWrapper>
          {declineBtnStatusChecker(applicationStatus)}
        </DeclineBtnWrapper>
      </ContentWrapper>
    );
  };

  return (
    <Wrapper className="shadow-md">
      <ToggleCard header={headerContent()} content={toggleContent()} />
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
  justify-content: space-around;
  align-items: center;
  height: 96px;
  width: 100%;
  position: relative;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  /*   display: flex;
  flex-wrap: wrap; */
  width: 22%;
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
  width: 35%;
  height: 100%;
`;
const CloseBtnWrapper = styled.div`
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -60px;
`;
const CloseBtn = styled.p``;
// Content Zone ---------------
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
const DeclineBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
`;
const DeclineBtn = styled.button`
  padding: 20px;
`;
