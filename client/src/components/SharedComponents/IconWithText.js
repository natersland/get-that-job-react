import styled from "@emotion/styled";
import React from "react";

function IconWithText({ icon, text, status }) {
  // component for professional & recruiter
  // component พวกที่มีไอคอนข้างบนละมี text ข้างล่าง ความปังคือมี fx เปลี่ยนสีสถานะให้พร้อมเลย ใช้ได้กับทั้ง professional และ recruiter
  // วิธีเซ็ทค่าสี: ส่งผ่าน props มาตามบรรทัดที่ 6 โดย สเตตัสจะมี่ทั้งหมด 5 ค่า คือ
  // 1. default: ตัวหนังสือสีเทาเข้ม
  // 2. applied, reviewing, finished: ตัวหนังสือสีชมพูอ่อน
  // 3.declined: ตัวหนังสือสีชมพูเข้ม
  // ดูตัวอย่างการใช้ที่ components -> P-Page-Applications -> ApplicationToggle -> บรรทัดที่ 49-64

  return (
    <Wrapper>
      <IconWrapper>
        <Icon src={icon} width="15.5px" height="15.5px"></Icon>
      </IconWrapper>
      <TextWrapper>
        <Text status={status}>{text}</Text>
      </TextWrapper>
    </Wrapper>
  );
}
export default IconWithText;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 96px;
  height: 96px;
  color: var(--gray);
  font-size: 0.85rem;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
`;
const Icon = styled.img`
  fill: none;
  stroke-width: 3;
  stroke: red;
`;
const TextWrapper = styled.div``;
const Text = styled.p`
  text-align: center;
  font-family: var(--seconary-font);
  letter-spacing: 0.4px;
  line-height: 16px;
  color: ${(props) =>
    props.status === "default"
      ? "#616161"
      : props.status === "declined"
      ? "#bf5f82"
      : "#f48fb1"};
`;
