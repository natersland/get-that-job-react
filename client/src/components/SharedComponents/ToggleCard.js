import styled from "@emotion/styled";
import React from "react";
import ToggleSignIcon from "../../assets/items/Vector.svg";
// Hooks -----------------------------------------
import useToggle from "../../hooks/useToggle";
// Contexts -----------------------------------------
function ToggleCard({ header, content }) {
  const { isOpen, toggle } = useToggle(false);

  const toggleContent = () => {
    return <ContentWrapper>{content}</ContentWrapper>;
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
  justify-content: center;
  align-items: center;
  height: 96px;
  width: 100%;
  padding: 0 15px;
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
  width: 5%;
  cursor: pointer;
`;
const ToggleIcon = styled.img``;
// Content Section -----------------------------------
const ContentSection = styled.section``;
const ContentWrapper = styled.div`
  padding: 20px;
  width: 85%;
`;
