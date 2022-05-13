import styled from "@emotion/styled";
import { useState } from "react";
// Contexts
import { useUserData } from "../../contexts/usersData";
// Components
import RoleButton from "./RoleButton";

export default function SelectRole() {
  const { role, setRole, step, roleBtn, setRoleBtn } = useUserData();
  const [isActivePro, setIsActivePro] = useState(true);
  const [isActiveRec, setIsActiveRec] = useState(false);

  const selectRoleBTN = () => {
    if (role === "professional") {
      setRole("recruiter");
      setIsActivePro(false);
      setIsActiveRec(true);
      console.log(role);
    } else {
      setRole("professional");
      setIsActiveRec(false);
      setIsActivePro(true);
      console.log(role);
    }
    /*     if (roleBtn === "professional") {
      setRole("professional");
      setRoleBtn("recruiter");
      console.log(role);
    } else {
      setRole("recruiter");
      setRoleBtn("professional");
      console.log(role);
    } */
  };

  return (
    <SelectRoleWrapper>
      <RoleButton
        text="professional"
        onClick={selectRoleBTN}
        isSelect={isActivePro}
      />
      <RoleButton
        text="recruiter"
        onClick={selectRoleBTN}
        isSelect={isActiveRec}
      />
    </SelectRoleWrapper>
  );
}

// ------------------- CSS Style Component Zone -------------------
const SelectRoleWrapper = styled.div`
  font-family: var(--seconary-font);
`;
