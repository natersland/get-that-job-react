import React, { useState } from "react";
import ProLoginInfoForm from "../components/ProLoginInfoForm";
import ProProsonalInfoForm from "../components/ProProsonalInfoForm";
import ProProfessionalInfoForm from "../components/ProProfessionalInfoForm";
import FindThatJobPage from "./FindThatJobPage";
import styled from "@emotion/styled";
import image from "../img/discussing.png";
import "../App.css";

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
  margin-bottom: 0px;
  font-family: var(--primary-font);
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: #616161;
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
  margin-left: 32px;
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
  const Arrow = ">";

  const [step, setStep] = useState(0);

  const StepDisplay = () => {
    if (step === 0) {
      return <ProLoginInfoForm />;
    } else if (step === 1) {
      return <ProProsonalInfoForm />;
    } else if (step === 2) {
      return <ProProfessionalInfoForm />;
    } else {
      return <FindThatJobPage />;
    }
  };

  


  return (
    <Wrapper>
      <LeftBox>
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
                      <p>1</p>
                    </DoneStep>
                  ) : (
                    <CurrentStep>
                      <p>1</p>
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
                      <p>2</p>
                    </NextStep>
                  ) : null || step === 1 ? (
                    <CurrentStep>
                      <p>2</p>
                    </CurrentStep>
                  ) : null || step === 2 ? (
                    <DoneStep>
                      <p>2</p>
                    </DoneStep>
                  ) : (
                    <DoneStep>
                      <p>2</p>
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
                      <p>3</p>
                    </CurrentStep>
                  ) : (
                    <NextStep>
                      <p>3</p>
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
                <SkipButton
                  type="Submit"
                  onClick={() => {
                    setStep((currentPage) => currentPage + 2);
                  }}
                >
                  SKIP THIS!
                </SkipButton>
              )}

              {step === 2 ? null : (
                <NextButton
                  onClick={() => {
                    setStep((currentPage) => currentPage + 1);
                  }}
                >
                  NEXT {Arrow}
                </NextButton>
              )}

              {step === 0 || step === 1 ? null : (
                <NextButton
                  type="Submit"
                  onClick={() => {
                    setStep((currentPage) => currentPage + 1);
                  }}
                >
                  FINISH {Arrow}
                </NextButton>
              )}
            </div>
          </Progressbar>
        </Detail>
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
