import styled from "@emotion/styled";
import React from "react";

// Hooks -------------------------
import useFetch from "../../hooks/useFetch";
function RecruiterReviewStatusBtn({ status, jobId, fx }) {
  // เก็บเอา userId และ jobId จาก localStorage เพื่อเอาไปใช้ต่อ
  const professionalId = localStorage.getItem("id");

  const { data } = useFetch(
    `${process.env.GTJ_APP_SERVICE_API}/${professionalId}`
  );

  // ปุ่ม markAsStarted กับ markAsFinished and finished  --------------------------------------
  const StartReviewButton = (status, color, text, fx) => {
    return (
      <MarkTextButton
        className={`btn ${color} ${
          status === "applied" ? "btn-lg" : "btn-md"
        } ${color === "btn-white" ? "pink-border" : null} uppercase`}
        onClick={status === "applied" ? fx : null}
        btnStatus={status}
        disabled={status}>
        {status === "applied" ? <MarkText> {text} </MarkText> : null}
      </MarkTextButton>
    );
  };

  // fx ปุ่มเปลี่ยนสถานะได้ ถ้าสมัครงานเข้ามา -------------------------------
  const buttonChecker = (fx, jobId) => {
    let status = null;
    let filterData = null;
    let result = null;
    // Check btn mode ถ้า status or mode = these 3 status
    if (status === "applied" || "reviewing" || "finished") {
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

    // render seemore button
    if (status === "applied") {
      return StartReviewButton(
        `${status}`,
        "btn-white",
        "MARK AS STARTED",
        null,
        fx
      );
    } else if (status === "reviewing") {
      return StartReviewButton(
        `${status}`,
        "btn-white",
        "MARK AS FINISHED",
        true,
        fx
      );
    } else if (!status === "finished") {
      return StartReviewButton(`${status}`, "btn-gray", "FINISHED", false, fx);
    }
  };

  return <Wrapper>{buttonChecker(status, fx, jobId)}</Wrapper>;
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
const MarkText = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
`;
