import { useAuth } from "../contexts/authentication";
// tools
import styled from "@emotion/styled";
// css
import "../App.css";

export default function LoginSuccessful(props) {
  const { roleBtn } = props;
  const { logout } = useAuth();
  console.log(`🚀Login Sucessful Current Role is ${roleBtn}`);
  return (
    <div>
      <RoleStatusText>
        🥳Login Successful! Role:{" "}
        {roleBtn.charAt(0).toUpperCase() + roleBtn.slice(1)}🥳
      </RoleStatusText>
      <LogoutBtnWrapper>
        {" "}
        <button
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </button>
      </LogoutBtnWrapper>
    </div>
  );
}

const LogoutBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RoleStatusText = styled.p`
  color: var(--primary-text-color);
  font-weight: 500;
`;
