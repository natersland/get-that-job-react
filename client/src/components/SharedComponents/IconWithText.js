import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IconWithText({ icon, text, status }) {
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
