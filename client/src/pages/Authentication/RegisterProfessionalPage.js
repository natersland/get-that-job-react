import React, { useState } from "react";
import styled from "@emotion/styled";
// Images
import image from "../../img/discussing.png";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
//Contexts
import { useAuth } from "../../contexts/authentication";
import { useUserData } from "../../contexts/usersData";
// Components
import ProRegisterForm1 from "../../components/UnAut-Register/PRO-RegisterForm-1";
import ProRegisterForm2 from "../../components/UnAut-Register/PRO-RegisterForm-2";
import ProRegisterForm3 from "../../components/UnAut-Register/PRO-RegisterForm-3";
import SelectRole from "../../components/UnAut-Register/SelectRole";

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

function RegisterProfessionalPage() {
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
    linkedin,
    setLinkedin,
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
  } = useUserData();

  const [step, setStep] = useState(0);

  const StepDisplay = () => {
    if (step === 0) {
      return (
        <ProRegisterForm1
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
        <ProRegisterForm2
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          linkedin={linkedin}
          setLinkin={setLinkedin}
        />
      );
    } else if (step === 2) {
      return (
        <ProRegisterForm3
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

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwaordConfirmed", passwordConfirmed);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("birthDate", birthDate);
    formData.append("linkedin", linkedin);
    formData.append("title", title);
    formData.append("experience", experience);
    formData.append("education", education);

    for (let uploadFileKey in uploadFiles) {
      formData.append("uploadFile", uploadFiles[uploadFileKey]);
    }
    register(formData);
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
              <Caption className="mb-4">Create a new account as...</Caption>
              <SelectRole />
              <StepBox className="mt-8">
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
                )}
                {step === 0 || step === 1 ? (
                  <button
                    className="btn btn-md btn-pink"
                    type="button" //ถ้า button อยู่ใน form ใช้อันนี้ค่าาา เพราะ default = submit
                    onClick={() => {
                      setStep((currentPage) => currentPage + 1);
                    }}
                  >
                    {" "}
                    NEXT <ArrowRight />
                  </button>
                ) : null}

                {step === 0 || step === 1 ? null : (
                  <button
                    className="btn btn-md btn-pink"
                    form="register-form"
                    type="submit"
                  >
                    {" "}
                    FINISH <ArrowRight />
                  </button>
                )}
              </ButtonWrapper>
            </Progressbar>
          </Detail>
        </form>
        <FormWrapper></FormWrapper>
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
  height: 100vh;
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
  margin: 6rem 0 0 0;
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
  align-items: end;
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
  width: 120%;
`;

const BorderImage = styled.div`
  width: 435px;
`;

const ButtonWrapper = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-evenly;
`;

const NextPageButton = styled.button`
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
  margin: 0 16px;
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
`;

const PreviousButton = styled.button`
  width: 131px;
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

export default RegisterProfessionalPage;
