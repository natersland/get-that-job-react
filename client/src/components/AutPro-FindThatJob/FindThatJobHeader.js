import styled from "@emotion/styled";
import axios from "axios";
import { useEffect } from "react";
// Contexts --------------------
import { useJobsData } from "../../contexts/jobsData";
import { useUserData } from "../../contexts/usersData";

function FindThatJobHeader() {
  const { setJobs, searchJobText, setSearchJobText } = useJobsData();
  const { setUsers } = useUserData();

  const searchJob = async () => {
    const results = await axios(
      `http://localhost:4000/jobs?keywords=${searchJobText}`
    );
    setJobs(results.data.data);
  };

  const handleSearchJobText = (event) => {
    setSearchJobText(event.target.value);
  };
  useEffect(() => {
    searchJob();
    let timer;

    if (searchJobText) {
      timer = setTimeout(searchJob, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchJobText]);

  return (
    <Wrapper className="pt-8">
      {/* ------------- Header Section  ------------- */}
      <HeaderSection>
        <HeadingText>Find that job</HeadingText>
        {/* ------------- Search Box Zone  ------------- */}
        <InputWrapper>
          <InputBoxLabel>SEARCH BY JOB TITLE OR COMPANY NAME</InputBoxLabel>
          <SearchBox
            className="gtj-input pink-border search-icon"
            id="searchjobword"
            name="searchjobword"
            type="text"
            placeholder="manufacturing, sales, swim"
            onChange={handleSearchJobText}
            value={searchJobText}
          ></SearchBox>
        </InputWrapper>
      </HeaderSection>
      {/* ------------- Category, Type, Salary Range Zone ------------- */}
      <FilterInputWrapper>
        {/* ------------- Box 1: Category ------------- */}
        <InputWrapperSection>
          <InputBoxLabel>CATEGORY</InputBoxLabel>
          <DropDownList className="gtj-input pink-border">
            <option value="" disabled selected>
              Select a category
            </option>
            <option>Manufacturing</option>
            <option>Legal</option>
            <option>Education</option>
            <option>Goverment</option>
            <option>Sales</option>
          </DropDownList>
        </InputWrapperSection>
        {/* ------------- Box 2: Type ------------- */}
        <InputWrapperSection>
          <InputBoxLabel>TYPE</InputBoxLabel>
          <DropDownList className="gtj-input pink-border">
            <option value="" disabled selected>
              Select a type
            </option>
            <option>Full time</option>
            <option>Part time</option>
          </DropDownList>
        </InputWrapperSection>
        {/* ------------- Box 1: Salary Range ------------- */}
        <InputWrapperSection>
          <SalaryBox>
            <InputBoxLabel>SALARY RANGE</InputBoxLabel>
            <SubSalaryBox>
              <SearchSalary
                className="gtj-input pink-border dollar-icon2 "
                id="min-salary-search"
                name="min-salary-search"
                type="text"
                maxLength={6}
                placeholder="min"
              ></SearchSalary>
              <Dash>
                <DashLine></DashLine>
              </Dash>
              <SearchSalary
                className="gtj-input pink-border dollar-icon2 "
                id="max-salary-search"
                name="max-salary-search"
                type="text"
                maxLength={6}
                placeholder="max"
              ></SearchSalary>
            </SubSalaryBox>
          </SalaryBox>
        </InputWrapperSection>
      </FilterInputWrapper>
      {/* ---------------------------------------------------------- */}
    </Wrapper>
  );
}
export default FindThatJobHeader;
const Wrapper = styled.section``;
const HeaderSection = styled.div``;
const HeadingText = styled.h1`
  padding-bottom: 10px;
  font-size: 2.1rem;
  color: var(--primary-text-color);
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InputBoxLabel = styled.p`
  font-family: var(--seconary-font);
  font-size: 0.625rem;
  line-height: 12.1px;
  letter-spacing: 0.25px;
  margin-bottom: 5px;
  color: var(--gray);
`;
const InputWrapperSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding-right: 1rem;
  margin-top: 0.5rem;
`;
const DropDownList = styled.select`
  color: var(--light-gray);
`;

const SearchBox = styled.input`
  width: 420px;
`;

const SalaryBox = styled.div``;

const SubSalaryBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchSalary = styled.input`
  width: 102px;
  height: 36px;
`;

const Dash = styled.div`
  margin: 16px;
`;

const DashLine = styled.div`
  width: 12px;
  background-color: var(--light-gray);
  border: 1.8px solid var(--light-gray);
  border-radius: 30px;
`;
