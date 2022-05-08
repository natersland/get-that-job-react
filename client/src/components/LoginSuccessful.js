import styled from "@emotion/styled";
// Context ----------------------------
import { useAuth } from "../contexts/authentication";
import { useUserData } from "../contexts/usersData";

export default function LoginSuccessful() {
  const { roleBtn } = useUserData();
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
          className="btn btn-md btn-pink mt-5"
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
