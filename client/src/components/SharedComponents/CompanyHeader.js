import styled from "@emotion/styled";
// Contexts -------------------------------------------
import { useNavigate } from "react-router-dom";
import { useJobsData } from "../../contexts/jobsData";
import { useNav } from "../../contexts/navigate";
// Images -------------------------------------------
import FocusIcon from "../../assets/focus.svg";
import BackArrow from "../../assets/items/backArrow.svg";

function CompanyHeader() {
  // component for professional only
  // component ตรงข้อมูลบริษัทในหน้า FindThatJob -> See More เอาไปใช้ได้กับหน้า ดูงานของบริษัทนี้ทั้งหมด (ไม่มีใน scope งาน)
  const { job } = useJobsData();
  const navigate = useNavigate();
  const { menuIndex } = useNav();

  return (
    <Wrapper>
      <BackBtn
        className="btn"
        onClick={() => {
          {
            menuIndex === 1 ? navigate("/findjobs") : navigate("/following");
          }

          localStorage.removeItem("jobId");
        }}
      >
        <img src={BackArrow} className="mr-3" alt="back-arrow-icon" />
        back
      </BackBtn>
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
export default CompanyHeader;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-bottom: 10px;
  margin-top: -50px;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
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
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;

const LeftWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    justify-content: start;
  }
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
  width: 100%;
  height: 100%;
`;
const RightWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;

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
