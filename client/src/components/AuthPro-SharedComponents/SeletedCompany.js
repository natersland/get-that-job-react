import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useJobsData } from "../../contexts/jobsData";
import CompanyIcon from "../../assets/building-3-line2.svg";
import CalendarIcon from "../../assets/calendar-2-line2.svg";
import MoneyIcon from "../../assets/calendar-2-line2.svg";
import FocusIcon from "../../assets/focus.svg";
import CompanyLogo from "../../assets/placeholder/placeholder-company.jpg";

function SeletedCompany({ jobId }) {
  const { job } = useJobsData();
  const navigate = useNavigate();
  console.log(job);
  return (
    <Wrapper>
      <BackBtn
        className="btn"
        onClick={() => {
          navigate("/findjobs");
          localStorage.removeItem("jobId");
        }}
      >{`<   back`}</BackBtn>
      <CompanyWrapper>
        <LeftWrapper>
          <LogoWrapper>
            <LogoImg src={job.company?.[0]?.companyLogo?.[0].url} />
          </LogoWrapper>
        </LeftWrapper>
        <RightWrapper>
          {" "}
          <JobTitleText className="uppercase">
            {job.company?.[0]?.companyName}
          </JobTitleText>
          <FollowingBox>
            <FollowCircle>
              <FollowIcon src={FocusIcon}></FollowIcon>
            </FollowCircle>
            <FollowButton className="btn btn-white btn-md uppercase">
              following
            </FollowButton>
          </FollowingBox>
        </RightWrapper>
      </CompanyWrapper>
    </Wrapper>
  );
}
export default SeletedCompany;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-bottom: 10px;
`;
const BackButtonWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BackBtn = styled.button`
  letter-spacing: 1.25px;
  line-height: 24px;
  font-weight: 500;
  font-family: var(--secondary-text-color);
  margin-bottom: 10px;
`;
const CompanyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LeftWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LogoWrapper = styled.div`
  width: 74.67px;
  height: 74.67px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const LogoImg = styled.img`
  object-fit: cover;
`;
const RightWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;
const JobTitleText = styled.h1`
  font-size: 1.5rem;
`;
const FollowingBox = styled.div`
  display: flex;
  margin: 5px 0;
`;
const FollowButton = styled.p`
  padding-left: 0;
  margin-left: -2px;
  cursor: pointer;
  letter-spacing: 1.25px;
  background-color: #f5f5f6;
  &:hover {
    background-color: #f5f5f6;
  }
`;
const FollowCircle = styled.div`
  background-color: var(--secoundary-brand-color);
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 500;
  cursor: pointer;
`;
const FollowIcon = styled.img``;
