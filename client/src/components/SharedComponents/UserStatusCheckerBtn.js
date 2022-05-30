import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Pictures --------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import CompanyIcon from "../../assets/building-3-line.svg";
import FocusIcon from "../../assets/focus.svg";
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
// Hooks -------------------------
import useFetch from "../../hooks/useFetch";
function UserStatusCheckerBtn({
  jobTitle,
  companyName,
  jobCategory,
  jobType,
  minSalary,
  maxSalary,
  companyDetail,
  jobId,
}) {
  // เก็บเอา userId และ jobId จาก localStorage เพื่อเอาไปใช้ต่อ
  const professionalId = localStorage.getItem("id");
  const { componentDidMount, convertSalary } = UtilitiesFunction();
  const { setLoading } = useVadilation();
  const navigate = useNavigate();
  const { data } = useFetch(`http://localhost:4000/users/${professionalId}`);

  const companyLogoCheck = () => {
    if (companyDetail[0]?.companyLogo[0]) {
      return companyDetail[0]?.companyLogo[0].url;
    } else {
      return null;
    }
  };

  const followButton = (btnStatus) => {
    return (
      <FollowBtnWrapper>
        <FollowCircle btnStatus={btnStatus}>
          <FollowIcon src={FocusIcon}></FollowIcon>
        </FollowCircle>
        <FollowButton className="btn btn-white btn-md uppercase" disabled>
          follow
        </FollowButton>
      </FollowBtnWrapper>
    );
  };

  // fx ปุ่มเปลี่ยนสถานะได้ ถ้าสมัครงานเข้ามา -------------------------------
  const seeMoreButton = (mode) => {
    const applicationsData = data?.applications;
    let status = null;
    const result = applicationsData?.filter((applyJobId) => {
      return applyJobId.jobId === jobId;
    });
    if (result?.length > 0) {
      status = false;
    } else {
      status = true;
    }
    const button = (color, text, status) => {
      const clicktoSeeMore = () => {
        setLoading(true);
        localStorage.setItem("jobId", jobId);
        setTimeout(function () {
          navigate(`/findjobs/${jobId}}`);
          componentDidMount();
          setLoading(false);
        }, 500);
      };
      return (
        <SeeMoreButton
          className={`btn ${color} btn-md ${
            color === "btn-white" ? "pink-border" : null
          } uppercase`}
          onClick={clicktoSeeMore}
          btnStatus={status}
          disabled={status}
        >
          {text}
        </SeeMoreButton>
      );
    };
    if (status) {
      return button("btn-white", "see more", false);
    } else {
      return button("btn-gray", "applied", true);
    }
  };
  // render start here -------------------------------------------------
  return <Wrapper></Wrapper>;
}
export default UserStatusCheckerBtn;

//  CSS Zone --------------------------

const Wrapper = styled.div``;
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
const SeeMoreButton = styled.button`
  &:hover {
    background-color: ${(props) =>
      props.status ? "var(--secoundary-brand-color)" : null};
    color: ${(props) => (props.status ? "white" : null)};
  }
`;
