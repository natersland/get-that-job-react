import React from "react";
/* import ProLoginInfoForm from "../components/ProLoginInfoForm"; */
/* import ProProsonalInfoForm from "../components/ProProsonalInfoForm"; */
import ProProfessionalInfoForm from "../components/ProProfessionalInfoForm";
import styled from "@emotion/styled";
import image from "../img/discussing.png";
import "../App.css";

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  height: 100vh;
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

const Step = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
`;

const StepLeft = styled.div``;

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

const StepDetail = styled.div`
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  font-weight: 400;
`;
const GirlImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 200px;
`;
const Button = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  font-weight: 500;
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

function ProfessionalRegisterPage() {
  const Arrow = ">";
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
                  <NumberOfStep>
                    <p>1</p>
                  </NumberOfStep>
                </StepLeft>
                <div>
                  <Status>IN PROGRESS</Status>
                  <StepDetail>
                    Login <br />
                    Information
                  </StepDetail>
                </div>
              </Step>
              <Step>
                <StepLeft>
                  <NumberOfStep>
                    <p>2</p>
                  </NumberOfStep>
                </StepLeft>
                <div>
                  <Status>PENDING</Status>
                  <StepDetail>
                    Personal
                    <br />
                    information
                  </StepDetail>
                </div>
              </Step>
              <Step>
                <StepLeft>
                  <NumberOfStep>
                    <p>3</p>
                  </NumberOfStep>
                </StepLeft>
                <div>
                  <Status>PENDING</Status>
                  <StepDetail>
                    Professional
                    <br />
                    information
                  </StepDetail>
                </div>
              </Step>
            </StepBox>
            <ProProfessionalInfoForm />
            <div className="form-actions">
              <Button type="Submit">NEXT {Arrow}</Button>
            </div>
          </Progressbar>
        </Detail>
      </LeftBox>
      <RightBox>
        <GirlImage src={image} alt="Girl"></GirlImage>
      </RightBox>
    </Wrapper>
  );
}

export default ProfessionalRegisterPage;
