import styled from "@emotion/styled";
import moment from "moment";
// Pictures --------------------------------------------------
import CompanyIcon from "../../assets/building-3-line2.svg";
import CalendarIcon from "../../assets/calendar-2-line2.svg";
import MoneyIcon from "../../assets/money-dollar-circle-line2.svg";
import ClockIcon from "../../assets/time-line.svg";
// Contexts --------------------------------------------------
import { useJobsData } from "../../contexts/jobsData";
// Utils --------------------------------------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";

function JobDetails() {
  // component for professional only
  // component ตรงข้อมูลบริษัทในหน้า FindThatJob -> See More เอาไปใช้ได้กับหน้าสร้างใบสมัคร (ตัดออกจาก scope งานแล้ว)
  const { addCommas } = UtilitiesFunction();
  const { job } = useJobsData();
  const jobDetailsData = [
    {
      label: "Category",
      jobLabel: job?.jobCategory,
      icon: CompanyIcon,
    },
    {
      label: "Type",
      jobLabel: job?.jobType,
      icon: CalendarIcon,
    },
    {
      label: "Salary",
      jobLabel: `${addCommas(job?.minSalary)} - ${addCommas(job?.maxSalary)}`,
      icon: MoneyIcon,
    },
  ];
  return (
    <Wrapper>
      <HeaderWrapper>
        <JobTitle>{job?.jobTitle}</JobTitle>
        <CreatedDate>
          <span>
            <img className="mr-1" src={ClockIcon} alt="Clock Icon" />
          </span>{" "}
          POSTED {moment(job?.createdJobDate).startOf().fromNow()}{" "}
        </CreatedDate>
      </HeaderWrapper>
      <JobDetailsWrapper>
        {jobDetailsData?.map((items, index) => {
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
export default JobDetails;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 50px 0;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const JobTitle = styled.h1`
  margin-bottom: 20px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    font-size: 2.2rem;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;
const CreatedDate = styled.p`
  display: flex;
  align-content: center;
  text-transform: uppercase;
  font-size: 0.825rem;
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-top: -10px;
  }
`;
const JobDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;
const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    padding: 4px 16px 8px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 10px 8px;
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    padding: 4px 16px 8px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    padding: 8px 32px 16px;
  }
`;
const DetailLabel = styled.p`
  font-size: 1rem;
  color: var(--gray);
`;
const JobDetail = styled.p`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    font-size: 1.1rem;
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    font-size: 1.3rem;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    font-size: 1.5rem;
  }
`;
