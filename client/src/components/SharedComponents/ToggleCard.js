import styled from "@emotion/styled";
import React from "react";
import ToggleSignIcon from "../../assets/items/Vector.svg";
// Hooks -----------------------------------------
import useToggle from "../../hooks/useToggle";
// Contexts -----------------------------------------
function ToggleCard({ header, content }) {
  // component for professional & recruiter
  // component toggle ที่เอาไปใช้ได้ทุกหน้า มีโครง toggle พร้อม กดเปิด-ปิดได้
  // วิธีการใช้:
  // Component มันจะแบ่งเป็น 2 ส่วน ตามชื่อ props บรรทัดที่ 7 คือ มี header กับ content
  // ส่วน header เป็นส่วนยาวๆ ที่โชว์ตอนหุบ toggle อันนี้ สร้าง fx มาเก็บ ดีไซน์ตรงนั้นแล้วเอามาแปะผ่าน props ได้เลย
  // ดูตัวอย่างการใช้ที่ P-Page-Applications -> ApplicationToggle -> บรรทัดที่ 65 - 100
  // ส่วน content เป็นส่วนที่หุบเอาไว้ วิธีใช้เหมือน header เลย
  // ดูตัวอย่างการใช้ที่ P-Page-Applications -> ApplicationToggle -> บรรทัดที่ 102 - 112
  const { isOpen, toggle } = useToggle(false);

  const toggleContent = () => {
    return content;
  };

  return (
    <Wrapper className="shadow-md">
      {/* Header Section -----------------------------------*/}
      <HeaderSection>
        <HeaderContent>{header}</HeaderContent>{" "}
        <ToggleWrapper>
          <ToggleIcon src={ToggleSignIcon} onClick={toggle} />
        </ToggleWrapper>
      </HeaderSection>
      {/* Content Section -----------------------------------*/}
      <ContentSection>{isOpen ? toggleContent() : null}</ContentSection>
    </Wrapper>
  );
}
export default ToggleCard;

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 20px;
`;
// Header Section -----------------------------------
const HeaderSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 96px;
  width: 100%;
`;
// Header Section -----------------------------------
// Section 1
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 100%;
`;

// Section 4
const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 59.73px;
  width: 1%;
  cursor: pointer;
`;
const ToggleIcon = styled.img``;
// Content Section -----------------------------------
const ContentSection = styled.section``;
const ContentWrapper = styled.div`
  padding: 20px;
  width: 85%;
`;
