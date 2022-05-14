import styled from "@emotion/styled";

// Contexts
import { useUserData } from "../../contexts/usersData";
import { useVadilation } from "../../contexts/vadilation";

export default function SelectRole() {
  const { role, setRole } = useUserData();
  const { step } = useVadilation();

  const selectRoleBTN = () => {
    if (role === "professional") {
      setRole("recruiter");
    } else {
      setRole("professional");
    }
  };

  const roleButton = () => {
    if (step === 0) {
      if (role === "professional") {
        return (
          <div>
            {" "}
            <RoleButton onClick={selectRoleBTN} isSelect={true} disabled>
              professional
            </RoleButton>
            <RoleButton onClick={selectRoleBTN} isSelect={false}>
              Recruiter
            </RoleButton>
          </div>
        );
      } else {
        return (
          <div>
            <RoleButton onClick={selectRoleBTN} isSelect={false}>
              professional
            </RoleButton>
            <RoleButton onClick={selectRoleBTN} isSelect={true} disabled>
              Recruiter
            </RoleButton>
          </div>
        );
      }
    } else if (step >= 1) {
      if (role === "professional") {
        return (
          <div>
            {" "}
            <RoleButton onClick={selectRoleBTN} isSelect={true} disabled>
              professional
            </RoleButton>
            <RoleButton onClick={selectRoleBTN} isSelect={false} disabled>
              Recruiter
            </RoleButton>
          </div>
        );
      } else {
        return (
          <div>
            {" "}
            <RoleButton onClick={selectRoleBTN} isSelect={false} disabled>
              professional
            </RoleButton>
            <RoleButton onClick={selectRoleBTN} isSelect={true} disabled>
              Recruiter
            </RoleButton>
          </div>
        );
      }
    }
  };

  return <SelectRoleWrapper>{roleButton()}</SelectRoleWrapper>;
}

// ------------------- CSS Style Component Zone -------------------
const SelectRoleWrapper = styled.div`
  font-family: var(--seconary-font);
`;

const RoleButton = styled.button`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--seconary-font);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.25px;
  border: 0;
  cursor: pointer;

  margin-right: 1rem;
  margin-top: 0.8rem;
  padding-bottom: 0.5rem;

  border-bottom: ${(props) =>
    props.isSelect
      ? "2.5px solid var(--secoundary-brand-color)"
      : "2.5px solid #BDBDBD"};
  /*     border-bottom: 2.5px solid var(--secoundary-brand-color);
    
 */

  color: ${(props) =>
    props.isSelect ? "var(--primary-text-color)" : "#8E8E8E"};
`;
