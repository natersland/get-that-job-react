import styled from "@emotion/styled";
// Contexts ----------------------------------------
import { useUserData } from "../../contexts/usersData";
import { useVadilation } from "../../contexts/vadilation";

export default function SelectRole() {
  const { role, setRole } = useUserData();
  const { step } = useVadilation();

  // เช็คเงื่อนไข ถ้า user มี state เป็น role อะไรอยู่ (ที่เลือกค้างไว้) เมื่อคลิกให้เซ็ทเป็นค่าตรงกันข้าม
  const selectRoleBTN = () => {
    if (role === "professional") {
      setRole("recruiter");
    } else {
      setRole("professional");
    }
  };

  // fx เก็บปุ่ม select role
  const roleButton = () => {
    // fx เก็บเทมเพลทปุ่มเลือก role
    const roleBtnTemplete = (isSelect, status, text) => {
      return (
        <RoleButton
          onClick={selectRoleBTN}
          isSelect={isSelect}
          disabled={status}
        >
          {text}
        </RoleButton>
      );
    };
    // เช็คเงื่อนไข: ถ้า user อยู่ที่ register step ที่ 1 ให้เซ็ทค่าปุ่ม select role ตามนี้
    if (step === 0) {
      if (role === "professional") {
        return (
          <div>
            {roleBtnTemplete(true, true, "professional")}
            {roleBtnTemplete(false, false, "Recruiter")}
          </div>
        );
      } else {
        return (
          <div>
            {roleBtnTemplete(false, false, "professional")}
            {roleBtnTemplete(true, true, "Recruiter")}
          </div>
        );
      }
      // เช็คเงื่อนไข: ถ้า user อยู่ที่ register step มากกว่า 1 ให้เซ็ทค่าปุ่ม select role ตามนี้
    } else if (step >= 1) {
      if (role === "professional") {
        return (
          <div>
            {roleBtnTemplete(true, true, "professional")}
            {roleBtnTemplete(false, true, "Recruiter")}
          </div>
        );
      } else {
        return (
          <div>
            {roleBtnTemplete(false, true, "professional")}
            {roleBtnTemplete(true, true, "Recruiter")}
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

  color: ${(props) =>
    props.isSelect ? "var(--primary-text-color)" : "#8E8E8E"};
`;
