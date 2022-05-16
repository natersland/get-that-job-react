import styled from "@emotion/styled";
// contexts --------------------------
import { useUserData } from "../../contexts/usersData";
import { useVadilation } from "../../contexts/vadilation";
function RoleStepsBox({ userRole }) {
  const { role } = useUserData();
  const { step } = useVadilation();

  return (
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
              {userRole}
              <br />
              Information
            </PendingStepDetail>
          ) : (
            <DoneStepDetail>
              {userRole}
              <br />
              Information
            </DoneStepDetail>
          )}
        </div>
      </Step>
      {role === "professional" ? (
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
                Information
              </PendingStepDetail>
            ) : (
              <DoneStepDetail>
                Professional
                <br />
                Information
              </DoneStepDetail>
            )}
          </div>
        </Step>
      ) : null}
    </StepBox>
  );
}

// ------------------- CSS Style Component Zone -------------------

export default RoleStepsBox;

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
