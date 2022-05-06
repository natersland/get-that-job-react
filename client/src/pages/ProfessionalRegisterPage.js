import React, { useState } from "react";
import ProLoginInfoForm from "../components/ProLoginInfoForm";
import ProProsonalInfoForm from "../components/ProProsonalInfoForm";
import ProProfessionalInfoForm from "../components/ProProfessionalInfoForm";
import styled from "@emotion/styled";
import image from "../img/discussing.png";
import "../App.css";
/* import AuthenticatedApp from "./AuthenticatedApp";
import { multiStepContext } from "../contexts/Register"; */
import GTJhooksfantasy from "../hooks/GTJhooksfantasy";
import { useAuth } from "../contexts/authentication";

const Wrapper = styled.div`
  width: 100%;
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 228px;
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
  margin-top: 20px;
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
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
  font-size: 14px;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const InProgress = styled.div`
  font-size: 10px;
  font-family: var(--seconary-font);
  font-weight: 400;
  letter-spacing: 1.5px;
`;

const Done = styled.div`
  font-size: 10px;
  font-family: var(--seconary-font);
  font-weight: 400;
  letter-spacing: 1.5px;
`;

const Pending = styled.div`
  font-size: 10px;
  font-family: var(--seconary-font);
  font-weight: 400;
  color: #8e8e8e;
  letter-spacing: 1.5px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
`;

const StepLeft = styled.div``;

const PendingStepDetail = styled.div`
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  font-weight: 400;
  color: #8e8e8e;
`;

const DoneStepDetail = styled.div`
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  font-weight: 400;
  color: #616161;
`;

const CurrentStep = styled.div`
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

const NextStep = styled.div`
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

const DoneStep = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 62px;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-top: 0px;
  font-family: var(--primary-font);
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: #616161;
`;

const StepNumber = styled.p`
  margin-bottom: 0;
`;

const GirlImage = styled.img`
  overflow: hidden;
`;

const BorderImage = styled.div`
  width: 435px;
  margin-top: 300px;
  margin-left: 65px;
`;

const NextPage1Button = styled.button`
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
  margin-left: 230px;
`;

const NextPage2Button = styled.button`
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
  margin-left: 280px;
  position: absolute;
  bottom: 213px;
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
  margin-left: 32px;
  color: #616161;
  background-color: #f5f5f6;
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
  margin-left: 32px;
`;

const PreviusButton = styled.button`
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
`;

function ProfessionalRegisterPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmed,
    setPasswordConfirmed,
    name,
    setName,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    linkin,
    setLinkin,
    title,
    setTitle,
    experience,
    setExperience,
    education,
    setEducation,
    uploadFiles,
    setUploadFiles,
    role,
    setRole,
  } = GTJhooksfantasy();
  const Arrow = ">";
  const [step, setStep] = useState(0);

  const StepDisplay = () => {
    if (step === 0) {
      return (
        <ProLoginInfoForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordConfirmed={passwordConfirmed}
          setPasswordConfirmed={setPasswordConfirmed}
        />
      );
    } else if (step === 1) {
      return (
        <ProProsonalInfoForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          linkin={linkin}
          setLinkin={setLinkin}
        />
      );
    } else if (step === 2) {
      return (
        <ProProfessionalInfoForm
          title={title}
          setTitle={setTitle}
          experience={experience}
          setExperience={setExperience}
          education={education}
          setEducation={setEducation}
          uploadFiles={uploadFiles}
          setUploadFiles={setUploadFiles}
        />
      );
    }
  };

  const { register } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      passwordConfirmed,
      name,
      phone,
      birthDate,
      title,
      experience,
      education,
    };

    for (let uploadFileKey in uploadFiles) {
      data.append("uploadFile", uploadFiles[uploadFileKey]);
    }
    register(data);
  };

  return (
    <Wrapper>
      <LeftBox>
        <form
          className="professional-register-form"
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
                <Step>
                  <StepLeft>
                    {step === 1 || step === 2 ? (
                      <DoneStep>
                        <StepNumber>1</StepNumber>
                      </DoneStep>
                    ) : (
                      <CurrentStep>
                        <StepNumber>1</StepNumber>
                      </CurrentStep>
                    )}
                  </StepLeft>
                  <div>
                    {step === 0 ? (
                      <InProgress>IN PROGRESS</InProgress>
                    ) : (
                      <Done>DONE!</Done>
                    )}
                    <DoneStepDetail>
                      Login <br />
                      Information
                    </DoneStepDetail>
                  </div>
                </Step>
                <Step>
                  <StepLeft>
                    {step === 0 ? (
                      <NextStep>
                        <StepNumber>2</StepNumber>
                      </NextStep>
                    ) : null || step === 1 ? (
                      <CurrentStep>
                        <StepNumber>2</StepNumber>
                      </CurrentStep>
                    ) : null || step === 2 ? (
                      <DoneStep>
                        <StepNumber>2</StepNumber>
                      </DoneStep>
                    ) : (
                      <DoneStep>
                        <StepNumber>2</StepNumber>
                      </DoneStep>
                    )}
                  </StepLeft>
                  <div>
                    {step === 0 ? (
                      <Pending>PENDING</Pending>
                    ) : null || step === 1 ? (
                      <InProgress>IN PROGRESS</InProgress>
                    ) : null || step === 2 ? (
                      <Done>DONE!</Done>
                    ) : (
                      <Done>DONE!</Done>
                    )}
                    {step === 0 ? (
                      <PendingStepDetail>
                        Personal
                        <br />
                        information
                      </PendingStepDetail>
                    ) : (
                      <DoneStepDetail>
                        Personal
                        <br />
                        information
                      </DoneStepDetail>
                    )}
                  </div>
                </Step>
                <Step>
                  <StepLeft>
                    {step === 2 ? (
                      <CurrentStep>
                        <StepNumber>3</StepNumber>
                      </CurrentStep>
                    ) : (
                      <NextStep>
                        <StepNumber>3</StepNumber>
                      </NextStep>
                    )}
                  </StepLeft>
                  <div>
                    {step === 0 || step === 1 ? (
                      <Pending>PENDING</Pending>
                    ) : (
                      <InProgress>IN PROGRESS</InProgress>
                    )}
                    {step === 0 || step === 1 ? (
                      <PendingStepDetail>
                        Professional
                        <br />
                        information
                      </PendingStepDetail>
                    ) : (
                      <DoneStepDetail>
                        Professional
                        <br />
                        information
                      </DoneStepDetail>
                    )}
                  </div>
                </Step>
              </StepBox>
              <div>{StepDisplay()}</div>

              <div className="form-actions">
                {step === 0 || step === 1 ? null : (
                  <PreviusButton
                    onClick={() => {
                      setStep((currentPage) => currentPage - 1);
                    }}
                  >
                    PREVIUS
                  </PreviusButton>
                )}

                {step === 0 ? null : (
                  <SkipButton form="register-form" type="submit">
                    SKIP THIS!
                  </SkipButton>
                )}

                {step === 0 || step === 1 ? null : (
                  <FinishButton form="register-form" type="submit">
                    {" "}
                    FINISH {Arrow}
                  </FinishButton>
                )}
              </div>
            </Progressbar>
          </Detail>
        </form>
        <FormWrapper>
          {step === 0 ? (
            <NextPage1Button
              onClick={() => {
                setStep((currentPage) => currentPage + 1);
              }}
            >
              {" "}
              NEXT {Arrow}
            </NextPage1Button>
          ) : null}
          {step === 1 ? (
            <NextPage2Button
              onClick={() => {
                setStep((currentPage) => currentPage + 1);
              }}
            >
              {" "}
              NEXT {Arrow}
            </NextPage2Button>
          ) : null}
        </FormWrapper>
      </LeftBox>

      <RightBox>
        <BorderImage>
          <GirlImage src={image} alt="Girl"></GirlImage>
        </BorderImage>
      </RightBox>
    </Wrapper>
  );
}

export default ProfessionalRegisterPage;
