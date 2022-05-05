// tools
import styled from "@emotion/styled";
import GTJHooksFantasy from "../hooks/GTJHooksFantasy";

//CSS
import "../App.css";

export default function SelectRole() {
  const { roleBtn, setRoleBtn } = GTJHooksFantasy();
  // State

  const selectRoleBTN = () => {
    console.log(roleBtn);
    if (roleBtn === "professional") {
      setRoleBtn("recruiter");
    } else {
      setRoleBtn("professional");
    }
  };
  return (
    <SelectRoleWrapper>
      {roleBtn === "recruiter" ? (
        <div>
          {" "}
          <RoleButton onClick={selectRoleBTN} isSelect={true} disabled>
            professional
          </RoleButton>
          <RoleButton onClick={selectRoleBTN} isSelect={false}>
            Recruiter
          </RoleButton>
        </div>
      ) : (
        <div>
          {" "}
          <RoleButton onClick={selectRoleBTN} isSelect={false}>
            professional
          </RoleButton>
          <RoleButton onClick={selectRoleBTN} isSelect={true} disabled>
            Recruiter
          </RoleButton>
        </div>
      )}
    </SelectRoleWrapper>
  );
}

// ------------------- CSS Style Component Zone -------------------
const SelectRoleWrapper = styled.div`
  font-family: var(--seconary-font);
`;

const RoleButton = styled.button`
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--seconary-font);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.25px;
  border: 0;
  cursor: pointer;
  background-color: white;

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
