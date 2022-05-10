import styled from "@emotion/styled";
// Components
import LoginSuccessful from "../../components/UnAuthentication/LoginSuccessful";

// Context
import { useUserData } from "../../contexts/usersData";

export default function ProfessionalHomepage() {
  const { roleBtn } = useUserData();

  return (
    <WelcomeSuccessWrapper>
      <RoleIcon>🧏🏻‍♂️</RoleIcon>
      <WelcomeText>Professional Page</WelcomeText>
      <LoginSuccessful roleBtn={roleBtn} />
    </WelcomeSuccessWrapper>
  );
}

// CSS Zone
const WelcomeSuccessWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 90vh;
`;
const WelcomeText = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: var(--secoundary-color-hover);
`;

const RoleIcon = styled.p`
  font-size: 5rem;
  margin: 2rem;
`;
