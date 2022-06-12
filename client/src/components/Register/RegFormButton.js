import styled from "@emotion/styled";
import React from "react";
// Icons -----------------------------
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
// contexts --------------------------
import { useUserData } from "../../contexts/usersData";
import { useVadilation } from "../../contexts/vadilation";

class ArrowRight extends React.Component {
  render() {
    return <AiOutlineRight />;
  }
}
class ArrowLeft extends React.Component {
  render() {
    return <AiOutlineLeft />;
  }
}
function RegFormButton() {
  const { role } = useUserData();
  const { nextFormVadilateChecker, step, setStep } = useVadilation();

  //  fx เก็บปุ่ม Next Button -----------------------------------
  const nextButton = () => {
    return (
      <button
        className="btn btn-md btn-pink"
        type="button" //ถ้า button อยู่ใน form ใช้อันนี้ค่าาา เพราะ default = submit
        onClick={() => {
          nextFormVadilateChecker();
        }}
      >
        {" "}
        NEXT <ArrowRight />
      </button>
    );
  };
  //  fx เก็บปุ่ม Previous Button -----------------------------------
  const previousButton = () => {
    return (
      <Button
        className="btn btn-md btn-pink"
        onClick={() => {
          setStep((currentPage) => currentPage - 1);
        }}
      >
        <ArrowLeft /> PREVIOUS
      </Button>
    );
  };
  //  fx เก็บปุ่ม SkipThis Button -----------------------------------
  const skipButton = () => {
    return (
      <Button
        className="btn btn-md btn-white pink-border"
        form="register-form"
        type="submit"
      >
        SKIP THIS!
      </Button>
    );
  };
  // fx เก็บปุ่ม Finish Button -----------------------------------
  const finishButton = () => {
    return (
      <button
        className="btn btn-md btn-pink"
        form="register-form"
        type="submit"
      >
        {" "}
        FINISH <ArrowRight />
      </button>
    );
  };
  // เช็คว่าเข้าเงื่อนไขหรือไม่ ถ้าใช่ให้แสดงปุ่ม next --------------------------
  const nextBtnChecker = () => {
    if (role === "professional") {
      if (step === 0 || step === 1) {
        return nextButton();
      }
    } else {
      if (step === 0) {
        return nextButton();
      }
    }
  };
  // เช็คว่าเข้าเงื่อนไขหรือไม่ ถ้าใช่ให้แสดงปุ่ม finish --------------------------
  const finishBtnChecker = () => {
    if (role === "professional" && step === 2) {
      return finishButton();
    } else if (role === "recruiter" && step === 1) {
      return finishButton();
    }
  };
  return (
    <ButtonWrapper>
      {step === 0 || step === 1 ? null : previousButton()}
      {step === 0 ? null : skipButton()}
      {nextBtnChecker()}
      {finishBtnChecker()}
    </ButtonWrapper>
  );
}

export default RegFormButton;
const ButtonWrapper = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;
const Button = styled.button`
  border-radius: 16px;
`;
