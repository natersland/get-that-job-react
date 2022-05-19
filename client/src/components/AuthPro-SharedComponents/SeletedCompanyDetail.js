import styled from "@emotion/styled";
import moment from "moment";
// Pictures --------------------------------------------------
import CompanyIcon from "../../assets/building-3-line2.svg";
import CalendarIcon from "../../assets/calendar-2-line2.svg";
import MoneyIcon from "../../assets/money-dollar-circle-line2.svg";
import ClockIcon from "../../assets/time-line.svg";
import { useJobsData } from "../../contexts/jobsData";
import UtilitiesFunction from "../../utils/utilitiesFunction";
function SeletedCompanyDetail({ jobId }) {
  const { addCommas } = UtilitiesFunction();
  const { job } = useJobsData();
  const jobDetailsData = [
    {
      label: "Category",
      jobLabel: job.jobCategory,
      icon: CompanyIcon,
    },
    {
      label: "Type",
      jobLabel: job.jobType,
      icon: CalendarIcon,
    },
    {
      label: "Salary",
      jobLabel: `${addCommas(job.minSalary)} - ${addCommas(job.maxSalary)}`,
      icon: MoneyIcon,
    },
  ];
  return (
    <Wrapper>
      <HeaderWrapper>
        <JobTitle>{job.jobTitle}</JobTitle>
        <CreatedDate>
          <span>
            <img className="mr-1" src={ClockIcon} alt="Clock Icon" />
          </span>{" "}
          POSTED {job.createdJobDate}
        </CreatedDate>
      </HeaderWrapper>
      <JobDetailsWrapper>
        {jobDetailsData.map((items, index) => {
          const { label, jobLabel, icon } = items;
          return (
            <DetailsBox className="pink-border shadow-medium" key={index}>
              <DetailLabel>{label}</DetailLabel>
              <JobDetail>
                <span>
                  <img className="mr-2" src={icon} alt="Icon" />
                </span>
                {jobLabel}
              </JobDetail>
            </DetailsBox>
          );
        })}
      </JobDetailsWrapper>
    </Wrapper>
  );
}
export default SeletedCompanyDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;
const JobTitle = styled.h1`
  font-size: 3rem;
`;
const CreatedDate = styled.p`
  display: flex;
  align-content: center;
  text-transform: uppercase;
  font-size: 0.825rem;
`;
const JobDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  padding: 8px 32px 16px;
  gap: 4px;
  margin-top: 10px;
`;
const DetailLabel = styled.p`
  font-size: 1rem;
  color: var(--gray);
`;
const JobDetail = styled.p`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;
