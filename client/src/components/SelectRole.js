// tools
import styled from "@emotion/styled";
import { useState } from "react";

//CSS
import "../App.css";

export default function SelectRole() {
  // State
  const [userRole, setUserRole] = useState("professional");

  const selectRole = () => {
    if (userRole === "professional") {
      setUserRole("recruiter");
    } else {
      setUserRole("professional");
    }
  };
  console.log(userRole);
  return (
    <SelectRoleWrapper>
      {userRole === "professional" ? (
        <div>
          {" "}
          <RoleButton onClick={selectRole} isSelect={true}>
            professional
          </RoleButton>
          <RoleButton onClick={selectRole} isSelect={false}>
            Recruiter
          </RoleButton>
        </div>
      ) : (
        <div>
          {" "}
          <RoleButton onClick={selectRole} isSelect={false}>
            professional
          </RoleButton>
          <RoleButton onClick={selectRole} isSelect={true}>
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

  // Style When User Select
  border-bottom: ${(props) =>
    props.isSelect
      ? "2.5px solid var(--secoundary-brand-color)"
      : "2.5px solid #BDBDBD"};
  /*     border-bottom: 2.5px solid var(--secoundary-brand-color);
    
 */
  color: ${(props) =>
    props.isSelect ? "var(--primary-text-color)" : "#8E8E8E"};
  // Style When User UnSelect
`;
