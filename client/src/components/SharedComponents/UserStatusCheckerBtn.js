import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Pictures --------------------
import FocusIconActive from "../../assets/focus.svg";
import FocusIconUnActive from "../../assets/icons/FocusIconUnActive.svg";
import NavigationIcon from "../../assets/navigation-line.svg";
// Contexts --------------------
import { useUtils } from "../../contexts/utilsContext";
// Utils --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";

function UserStatusCheckerBtn({ mode, jobId, fx, data, reFetch }) {
  // เก็บเอา userId และ jobId จาก localStorage เพื่อเอาไปใช้ต่อ
  const professionalId = localStorage.getItem("id");
  const navigate = useNavigate();
  const { componentDidMount } = UtilitiesFunction();
  const { setLoading } = useUtils();

  // ปุ่ม follow --------------------------------------
  const followButton = (text, status) => {
    const handleSubmitFollowData = async (e, mode) => {
      e.preventDefault();
      const data = {
        jobId: jobId,
        mode: `${mode}`,
      };
      await axios.patch(
        `http://localhost:4000/users/followjob/${professionalId}`,
        data
      );
      reFetch();
    };
    const followJob = (e) => {
      handleSubmitFollowData(e, "follow");
    };
    const unFollowJob = (e) => {
      handleSubmitFollowData(e, "unfollow");
    };
    return (
      <FollowBtnWrapper onClick={status ? unFollowJob : followJob}>
        <FollowCircle btnStatus={status}>
          <FollowIcon
            src={status ? FocusIconActive : FocusIconUnActive}
          ></FollowIcon>
        </FollowCircle>
        <FollowButton
          className={`btn btn-white btn-md uppercase`}
          disabled={status}
        >
          {text}
        </FollowButton>
      </FollowBtnWrapper>
    );
  };
  // ปุ่ม see more กับ applynow --------------------------------------
  const applyStatusButton = (mode, color, text, status, fx) => {
    const clicktoSeeMore = () => {
      setLoading(true);
      localStorage.setItem("jobId", jobId);
      setTimeout(function () {
        navigate(`/findjobs/${jobId}}`);
        componentDidMount();
        setLoading(false);
      }, 700);
    };
    return (
      <SeeMoreButton
        className={`btn ${color} ${mode === "applynow" ? "btn-lg" : "btn-md"} ${
          color === "btn-white" ? "pink-border" : null
        } uppercase`}
        onClick={mode === "seemore" ? clicktoSeeMore : fx}
        btnStatus={status}
        disabled={status}
      >
        {mode === "applynow" && status === false ? (
          <span>
            <img className="mr-2" src={NavigationIcon} alt="Navigation Icon" />
          </span>
        ) : null}
        {text}
      </SeeMoreButton>
    );
  };

  // fx ปุ่มเปลี่ยนสถานะได้ -------------------------------
  const buttonChecker = (mode, fx, jobId) => {
    let status = null;
    let filterData = null;
    let result = null;
    // Check btn mode
    if (mode === "seemore" || "applynow") {
      filterData = data?.applications;
      result = filterData?.filter((item) => {
        return item.jobId === jobId;
      });
    }
    if (mode === "follow") {
      filterData = data?.followingJobs;
      result = filterData?.filter((item) => {
        return item === jobId;
      });
    }
    if (result?.length > 0) {
      // สเตตัส = สเตตัสของปุ่ม เปิด/ปิด
      status = false;
    } else {
      status = true;
    }
    // render seemore button
    if (status && mode === "seemore") {
      return applyStatusButton(`${mode}`, "btn-white", "see more", false);
    } else if (!status && mode === "seemore") {
      return applyStatusButton(`${mode}`, "btn-gray", "applied", true);
    }
    // render applynow button
    if (status && mode === "applynow") {
      return applyStatusButton(`${mode}`, "btn-pink", "Apply Now", false, fx);
    } else if (!status && mode === "applynow") {
      return applyStatusButton(`${mode}`, "btn-gray", "applied", true, fx);
    }
    // render follow button
    if (status && mode === "follow") {
      return followButton("follow", false, fx);
    } else if (!status && mode === "follow") {
      return followButton("following", true, fx);
    }
  };

  return <Wrapper>{buttonChecker(mode, fx, jobId)}</Wrapper>;
}
export default UserStatusCheckerBtn;

//  CSS Zone --------------------------

const Wrapper = styled.div``;
const FollowBtnWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;
const FollowButton = styled.p`
  padding-left: 0;
  margin-left: 10px;
`;
const FollowCircle = styled.div`
  background-color: ${(props) =>
    props.btnStatus ? "var(--secoundary-brand-color)" : null};
  border-radius: 50px;
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 500;
`;
const FollowIcon = styled.img``;
const SeeMoreButton = styled.button`
  &:hover {
    background-color: ${(props) =>
      !props.btnStatus ? "var(--secoundary-brand-color)" : null};
    color: ${(props) => (!props.btnStatus ? "white" : null)};
  }
`;
