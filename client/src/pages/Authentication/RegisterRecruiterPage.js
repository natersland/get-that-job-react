import "../../App.css";
import React, { useState } from "react";
import styled from "@emotion/styled";

// Images
import image from "../../img/discussing.png";
import { AiOutlineRight } from "react-icons/ai";

// Context
import { useAuth } from "../../contexts/authentication";
import { useUserData } from "../../contexts/usersData";

// components
import RecRegisterForm1 from "../../components/UnAut-Register/REC-RegisterFrom-1";
import RecRegisterForm2 from "../../components/UnAut-Register/REC-RegisterFrom-2";
import AlertNotification from "../../components/Utilities/AlertNotification";

class Question extends React.Component {
  render() {
    return <AiOutlineRight />;
  }
}

function RegisterRecruiterPage() {
  const {
    companyName,
    email,
    password,
    role,
    setRole,
    companyWebsite,
    about,
    companyLogo,
    step,
    setStep,
    isErrorEmail,
    setIsErrorEmail,
    isErrorPassword,
    setIsErrorPassword,
    nextFormPasswordChecker,
    uploadFiles,
  } = useUserData();

  const StepDisplay = () => {
    if (step === 0) {
      return <RecRegisterForm1 />;
    } else if (step === 1) {
      return <RecRegisterForm2 />;
    } else {
      return "find that job";
    }
  };

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setRole("recruiter");
    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("companyWebsite", companyWebsite);
    formData.append("about", about);
    formData.append("companyLogo", companyLogo);

    for (let uploadFileKey in uploadFiles) {
      formData.append("logoFile", uploadFiles[uploadFileKey]);
    }
    register(formData);
  };

  return (
    <Wrapper>
      <LeftBox>
        <form
          className="recruiter-register-form"
          id="register-form"
          onSubmit={handleSubmit}
        >
          <Detail>
            <Progressbar>
              <Title>Good choice!</Title>
              <Caption>Create a new account as...</Caption>
              <SelectRole>
                <Role>PROFESSIONAL</Role>
                <Role>RECRUITER</Role>
              </SelectRole>

              <StepBox>
                {step === 0 ? (
                  <StepLeft>
                    <div>
                      <NumberOfStep>
                        <p>1</p>
                      </NumberOfStep>
                    </div>
                    <div>
                      <Status>IN PROGRESS</Status>
                      <StepDetail>
                        Login <br />
                        Information
                      </StepDetail>
                    </div>
                    <Box2>
                      <NumberOfStep2>
                        <p>2</p>
                      </NumberOfStep2>
                    </Box2>
                    <div>
                      <Status>PENDING</Status>
                      <StepDetail>
                        Company
                        <br />
                        Information
                      </StepDetail>
                    </div>
                  </StepLeft>
                ) : (
                  <StepLeft>
                    <div>
                      <NumberOfStep1>
                        <p>1</p>
                      </NumberOfStep1>
                    </div>
                    <div>
                      <Status>DONE !</Status>
                      <StepDetail>
                        Login <br />
                        Information
                      </StepDetail>
                    </div>
                    <Box3>
                      <NumberOfStep3>
                        <p>2</p>
                      </NumberOfStep3>
                    </Box3>
                    <div>
                      <Status>PENDING</Status>
                      <StepDetail>
                        Company
                        <br />
                        Information
                      </StepDetail>
                    </div>
                  </StepLeft>
                )}
              </StepBox>
              {/*แจ้งเตือนเมื่อ user ไม่ใส่ email*/}
              {isErrorEmail ? (
                <AlertNotification text="Please enter valid email address" />
              ) : null}
              {/*แจ้งเตือนเมื่อ user ไม่ใส่ Password*/}
              {isErrorPassword ? (
                <AlertNotification text="Please verify and re-enter your password" />
              ) : null}

              <div>{StepDisplay()}</div>

              <div className="form-actions">
                {step === 0 || step === 2 ? null : (
                  <SkipButton form="register-form" type="submit">
                    SKIP THIS!
                  </SkipButton>
                )}

                {step === 0 || step === 2 ? null : (
                  <FinishButton form="register-form" type="submit">
                    {" "}
                    FINISH <Question />
                  </FinishButton>
                )}
              </div>
            </Progressbar>
          </Detail>
        </form>

        <div>
          {step === 1 ? null : (
            <NextButton
              form="register-form"
              type="submit"
              onClick={() => {
                nextFormPasswordChecker("recruiter");
              }}
            >
              NEXT <Question />
            </NextButton>
          )}
        </div>
      </LeftBox>

      <RightBox>
        <BorderImage>
          <GirlImage src={image} alt="Girl"></GirlImage>
        </BorderImage>
      </RightBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f6;
  position: relative;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;

const Title = styled.h1`
  color: var(--primary-text-color);
  font-family: var(--primary-font);
  font-weight: 400;
  font-size: 48px;
`;

const Progressbar = styled.div`
  width: 70%;
`;

const Caption = styled.h3`
  color: var(--primary-text-color);
  font-family: var(--primary-font);
  font-weight: 500;
  font-size: 20px;
`;

const LeftBox = styled.div`
  width: 60%;
`;
const RightBox = styled.div`
  width: 40%;
  display: flex;
`;

const SelectRole = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
`;

const Role = styled.h3`
  margin-right: 6px;
  font-family: var(--seconary-font);
  color: var(--primary-text-color);
  font-weight: 500;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Status = styled.div`
  font-size: 10px;
  font-family: var(--seconary-font);
  font-weight: 400;
  letter-spacing: 1.5px;
`;

const StepLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
`;

const NumberOfStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 62px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 0px;
  font-family: var(--primary-font);
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: var(--secoundary-brand-color);
`;

const NumberOfStep1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 62px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 0px;
  font-family: var(--primary-font);
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: #e1e2e1;
`;
const NumberOfStep2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 62px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 0px;
  font-family: var(--primary-font);
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: #e1e2e1;
`;

const NumberOfStep3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 62px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-bottom: 0px;
  font-family: var(--primary-font);
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: var(--secoundary-brand-color);
`;

const StepDetail = styled.div`
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  font-weight: 400;
`;
const GirlImage = styled.img`
  overflow: hidden;
`;

const BorderImage = styled.div`
  width: 435px;
  margin-top: 300px;
  margin-left: 65px;
`;

const NextButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
  margin-left: 400px;
  margin-top: 15px;
`;

const FinishButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
  margin-left: 30px;
  margin-top: 15px;
`;

const SkipButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid var(--secoundary-brand-color);
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  cursor: pointer;
  margin-left: 100px;
  color: #616161;
  background-color: #f5f5f6;
`;

const Box2 = styled.div`
  margin-left: 64px;
`;

const Box3 = styled.div`
  margin-left: 50px;
`;
export default RegisterRecruiterPage;
