import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Pictures --------------------
import FocusIconActive from "../../assets/focus.svg";
import FocusIconUnActive from "../../assets/icons/FocusIconUnActive.svg";
import NavigationIcon from "../../assets/navigation-line.svg";
// Contexts --------------------
import { useVadilation } from "../../contexts/vadilation";
import { useUtils } from "../../contexts/utilsContext";
// Utils --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
// Hooks -------------------------
import useFetch from "../../hooks/useFetch";
function RecruiterReviewStatusBtn({ mode, jobId, fx }) {
  // เก็บเอา userId และ jobId จาก localStorage เพื่อเอาไปใช้ต่อ
  const professionalId = localStorage.getItem("id");
  const navigate = useNavigate();
  const { componentDidMount } = UtilitiesFunction();
  const { setLoading } = useUtils();

  const { data, reFetch } = useFetch(
    `http://localhost:4000/users/${professionalId}`
  );

  // ปุ่ม markAsStarted กับ markAsFinished and finished  --------------------------------------
  const StartReviewButton = (mode, color, text, status, fx) => {
    return (
      <MarkTextButton
        className={`btn ${color} ${
          mode === "markAsStart" ? "btn-lg" : "btn-md"
        } ${color === "btn-white" ? "pink-border" : null} uppercase`}
        onClick={mode === "markAsStart" ? fx : null}
        btnStatus={status}
        disabled={status}>
        {mode === "markAsStart" && status === true ? (
          <span>
            <img className="mr-2" src={NavigationIcon} alt="Navigation Icon" />
          </span>
        ) : null}
        {text}
      </MarkTextButton>
    );
  };

  // fx ปุ่มเปลี่ยนสถานะได้ ถ้าสมัครงานเข้ามา -------------------------------
  const buttonChecker = (mode, fx, jobId) => {
    let status = null;
    let filterData = null;
    let result = null;
    // Check btn mode ถ้า status or mode = these 3 status
    if (mode === "markAsStart" || "markAsFinish" || "finished") {
      filterData = data?.applications;
      result = filterData?.filter((item) => {
        return item.jobId === jobId;
      });
    }

    if (result?.length > 0) {
      // สเตตัส = สเตตัสของปุ่ม เปิด/ปิด
      status = true;
    } else {
      status = false;
    }

    console.log(result, mode, "buttonChecker");
    // render seemore button
    if (status && mode === "markAsStart") {
      return StartReviewButton(
        `${mode}`,
        "btn-white",
        "MARK AS STARTED",
        null,
        fx
      );
    } else if (status && mode === "markAsStart") {
      return StartReviewButton(
        `${mode}`,
        "btn-white",
        "MARK AS FINISHED",
        true,
        fx
      );
    } else if (!status && mode === "markAsStart") {
      return StartReviewButton(`${mode}`, "btn-gray", "FINISHED", false, fx);
    }
  };

  return <Wrapper>{buttonChecker(mode, fx, jobId)}</Wrapper>;
}
export default RecruiterReviewStatusBtn;

//  CSS Zone --------------------------

const Wrapper = styled.div``;

const MarkTextButton = styled.button`
  width: 150px;
  height: 35px;
  font-weight: 500px;
  color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border: 1px solid pink;
`;
