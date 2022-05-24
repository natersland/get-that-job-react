import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Pictures --------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import CompanyIcon from "../../assets/building-3-line.svg";
import FocusIcon from "../../assets/focus.svg";
import CompanyLogo from "../../assets/placeholder/placeholder-company.jpg";
import CalendarIcon from "../../assets/calendar-2-line.svg";
// Contexts --------------------
import { useJobsData } from "../../contexts/jobsData";
import { useVadilation } from "../../contexts/vadilation";
// Contexts --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
//Components --------------------
import BackDropLoading from "../Utilities/BackDropLoading";
import CircularIndeterminate from "../Utilities/CircularIndeterminate";

function FindThatJobCard({ paginationLoading }) {
  const { jobs } = useJobsData();
  const { textUpperCase, componentDidMount } = UtilitiesFunction();
  const navigate = useNavigate();
  const { setLoading } = useVadilation();

  return (
    <Wrapper>
      <BackDropLoading />
      <JobsCounterNumber>{jobs?.length} jobs for you</JobsCounterNumber>
      {paginationLoading ? (
        <CircularIndeterminate />
      ) : (
        <FindThatJobWrapper>
          {jobs?.map((items, index) => {
            const {
              _id,
              jobTitle,
              jobCategory,
              jobType,
              minSalary,
              maxSalary,
              company,
            } = items;
            const newMinNumber = minSalary / 1000;
            const newMaxNumber = maxSalary / 1000;

            return (
              <JobCardWrapper className="shadow-medium" key={index}>
                <JobCardContent>
                  {/* Left Side ---------------------------------------------- */}
                  <ContentLeft>
                    <CompanyLogoWrapper>
                      <CompanyLogoJa
                        src={
                          company[0].companyLogo[0]
                            ? company[0].companyLogo[0].url
                            : { CompanyLogo }
                        }
                      ></CompanyLogoJa>
                    </CompanyLogoWrapper>
                  </ContentLeft>
                  {/* Right Side ---------------------------------------------- */}
                  <ContentRight>
                    <JobCategory>
                      <span>
                        <img
                          className="mr-1"
                          src={CompanyIcon}
                          alt="Company Icon"
                        />
                      </span>{" "}
                      {jobCategory}
                    </JobCategory>
                    <JobTitle>{jobTitle}</JobTitle>
                    <CompanyName>{company[0].companyName}</CompanyName>
                    {/* Left Side: Sub Content ---------------------------------------------- */}
                    <SubContentWrapper>
                      {" "}
                      <JobType>
                        <span className="mr-1">
                          <img src={CalendarIcon} alt="Calendar Icon" />
                        </span>
                        {jobType}
                      </JobType>
                      <Salary>
                        <span className="mr-1">
                          <img src={DollarLineIcon} alt="DollarIcon" />
                        </span>
                        {minSalary < 100
                          ? `${minSalary}$ - `
                          : `${newMinNumber.toFixed(1)}k - `}
                        {maxSalary < 100
                          ? `${maxSalary}$`
                          : `${newMaxNumber.toFixed(1)}k`}
                      </Salary>
                    </SubContentWrapper>
                  </ContentRight>
                </JobCardContent>
                {/* Left Side: Footer ---------------------------------------------- */}
                <JobCardFooter>
                  <FollowCircle>
                    <FollowIcon src={FocusIcon}></FollowIcon>
                  </FollowCircle>
                  <FollowButton className="btn btn-white btn-md">
                    {textUpperCase("follow")}
                  </FollowButton>
                  <SeeMoreButton
                    className="btn btn-white btn-md pink-border uppercase"
                    onClick={() => {
                      setLoading(true);
                      localStorage.setItem("jobId", _id);
                      setTimeout(function () {
                        navigate(`/findjobs/${_id}}`);
                        componentDidMount();
                        setLoading(false);
                      }, 500);
                    }}
                  >
                    see more
                  </SeeMoreButton>
                </JobCardFooter>
              </JobCardWrapper>
            );
          })}
        </FindThatJobWrapper>
      )}
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

const FindThatJobWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px 0;
  width: 83%;
  padding-left: 10px;
`;

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
const JobTitle = styled.h1`
  color: var(--primary-text-color);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 28px;
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
  margin-top: 5px;
`;
const JobType = styled.p`
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
const FollowButton = styled.p`
  padding-left: 0;
  margin-left: -2px;
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
const SeeMoreButton = styled.button`
  &:hover {
    background-color: var(--secoundary-brand-color);
    color: white;
  }
`;
