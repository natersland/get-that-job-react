import styled from "@emotion/styled";
import axios from "axios";
import { useEffect } from "react";
// Pictures --------------------
import MignifyingGlassIcon from "../../assets/search-line.svg";
import DollarFillIcon from "../../assets/money-dollar-circle-fill.svg";
// Contexts --------------------
import { useJobsData } from "../../contexts/jobsData";

function FindThatJobHeader() {
  const { jobs, setJobs, searchText, setSearchText } = useJobsData();
  return (
    <Wrapper>
      {" "}
      {/* ------------- Header Section  ------------- */}
      <HeaderSection>
        <HeadingText></HeadingText>
        {/* ------------- Search Box Zone  ------------- */}
        <InputWrapper>
          <InputBoxLabel></InputBoxLabel>
          <SearchBox></SearchBox>
        </InputWrapper>
      </HeaderSection>
      {/* ------------- Category, Type, Salary Range Zone ------------- */}
      <InputWrapper>
        {/* ------------- Box 1: Category ------------- */}
        <InputWrapperSection>
          <InputBoxLabel></InputBoxLabel>
          <DropDownList></DropDownList>
        </InputWrapperSection>
        {/* ------------- Box 2: Type ------------- */}
        <InputWrapperSection>
          <InputBoxLabel></InputBoxLabel>
          <DropDownList></DropDownList>
        </InputWrapperSection>
        {/* ------------- Box 1: Salary Range ------------- */}
        <InputWrapperSection>
          <InputBoxLabel></InputBoxLabel>
          <DropDownList></DropDownList>
        </InputWrapperSection>
      </InputWrapper>
      {/* ---------------------------------------------------------- */}
    </Wrapper>
  );
}
export default FindThatJobHeader;
const Wrapper = styled.section``;
const HeaderSection = styled.div``;
const HeadingText = styled.h1``;
const InputWrapper = styled.div``;
const InputBoxLabel = styled.p``;
const SearchBox = styled.input``;
const InputWrapperSection = styled.div``;
const DropDownList = styled.select``;
