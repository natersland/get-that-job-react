import styled from "@emotion/styled";
import React from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

// contexts --------------------------
import { useUserData } from "../../contexts/usersData";

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
  const {
    step,
    setStep,
    role,
    password,
    passwordConfirmed,
    email,
    setIsErrorPassword,
    setIsErrorEmail,
  } = useUserData();
  // Form Vadilate Checker Fx -----------------------------------
  const nextFormVadilateChecker = () => {
    // if input is blank
    if (password === "" || email === "") {
      if (password === "") {
        setIsErrorPassword(true);
      } else if (email === "") {
        setIsErrorEmail(true);
      }
    } else {
      if (!password === "") {
        setIsErrorPassword(false);
      } else if (!email === "") {
        setIsErrorEmail(true);
      }
    }
    //  if email is not validattion
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
    // if password is not correct
    if (password !== passwordConfirmed) {
      setIsErrorPassword(true);
    } else if (password === passwordConfirmed) {
      setIsErrorPassword(false);
    }
    // if all correct
    if (
      password === passwordConfirmed &&
      password !== "" &&
      email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ) {
      setStep(step + 1);
      setIsErrorEmail(false);
      setIsErrorPassword(false);
    }
  };
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
      {step === 0 || step === 1 ? null : (
        <button
          className="btn btn-md btn-pink"
          onClick={() => {
            setStep((currentPage) => currentPage - 1);
          }}
        >
          <ArrowLeft /> PREVIOUS
        </button>
      )}
      {step === 0 ? null : (
        <button
          className="btn btn-md btn-white pink-border"
          form="register-form"
          type="submit"
        >
          SKIP THIS!
        </button>
      )}{" "}
      {nextBtnChecker()}
      {finishBtnChecker()}
      {/* Old Code Start Here ----------------------------------------------------------}
      {/*       {step === 0 || step === 1 ? (
        <button
          className="btn btn-md btn-pink"
          type="button" //ถ้า button อยู่ใน form ใช้อันนี้ค่าาา เพราะ default = submit
          onClick={() => {
            nextFormPasswordChecker(role);
          }}
        >
          {" "}
          NEXT <ArrowRight />
        </button>
      ) : null} */}
      {/*       {step === 0 || step === 1 ? null : (
        <button
          className="btn btn-md btn-pink"
          form="register-form"
          type="submit"
        >
          {" "}
          FINISH <ArrowRight />
        </button>
      )} */}
    </ButtonWrapper>
  );
}

export default RegFormButton;
const ButtonWrapper = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-evenly;
`;
