import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
// Contexts --------------------
import { useJobsData } from "../../contexts/jobsData";
function FindThatJobHeader() {
  const [searchJobText, setSearchJobText] = useState("");
  const [searchMinSalaryText, setSearchMinSalaryText] = useState("");
  const [searchMaxSalaryText, setSearchMaxSalaryText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keywordsNumber, setKeywordsNumber] = useState("");

  const {
    jobs,
    setJobs,
    setUsers,
    jobCategoryList,
    setJobCategoryList,
    jobTypeList,
    setJobTypeList,
    jobType,
    setJobType,
    jobTitle,
    setJobTitle,
    getJobs,
    filter,
    setFilter,
  } = useJobsData();

  // Filter Seach Text --------------------------------------------
  /*   const searchJobWord = async () => {
    const results = await axios(
      `http://localhost:4000/jobs?keywords=${searchJobText}`
    );
    setJobs(results.data.data);
  }; */

  // Categoty Filter  --------------------------------------------
  const categoryFilter = async (e) => {
    const results = await axios(`http://localhost:4000/jobs`);
    const jobData = results.data.data;
    const userSelect = e.target.value;
    const result = jobData.filter((item) => {
      return item.jobCategory === userSelect;
    });
    setJobs(result);
    console.log(userSelect);
  };
  // Type Filter  --------------------------------------------
  const typeFilter = async (e) => {
    const results = await axios(`http://localhost:4000/jobs`);
    const jobData = results.data.data;
    const userSelect = e.target.value;
    const result = jobData.filter((item) => {
      return item.jobType === userSelect;
    });
    setJobs(result);
    console.log(userSelect);
  };

  // Filter Salary --------------------------------------------
  /*  const searchMinSalary = async () => {
    const results = await axios.get(
      `http://localhost:4000/jobs?searchMinSalaryText=${searchMinSalaryText}`
    );
    setJobs(results.data.data);
  };
  const searchMaxSalary = async () => {
    const results = await axios(
      `http://localhost:4000/jobs?searchMaxSalaryText=${searchMaxSalaryText}`
    );
    setJobs(results.data.data);
  }; */

  /*  const multiverseFilter = async (
    text,
    category,
    type,
    searchMinSalaryText,
    searchMaxSalaryText
  ) => {
    const results = await axios(`http://localhost:4000/jobs`);
    const jobData = results.data.data;
    const filterText = jobData.filter((item) => {
      return (
        item.jobTitle.toLowerCase().match(text) ||
        item.company[0].companyName.toLowerCase().match(text)
      );
    });
    const filterCategory = jobData.filter((item) => {
      return item.jobCategory === category;
    });
    const filterType = jobData.filter((item) =z> {
      return item.jobType === type;
    });
    setJobs(filterText);
  }; */

  const search = async (text) => {
    const results = await axios.get(
      `http://localhost:4000/jobs?keywords=${searchJobText}&searchMinSalaryText=${searchMinSalaryText}&searchMaxSalaryText=${searchMaxSalaryText}`
    );
    const jobData = results.data.data;
    const filter = jobData.filter((item) => {
      return item.company[0].companyName.toLowerCase().match(text);
    });
    setJobs(filter);
  };

  useEffect(() => {
    /* searchJobWord(); */
    /* searchMinSalary();
    searchMaxSalary(); */
    search();
    /*   let timeOut;
    if (searchJobText) {
      timeOut = setTimeout(searchJobWord, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    }; */
  }, [searchJobText, searchMinSalaryText, searchMaxSalaryText]);

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
            onChange={(e) => setSearchJobText(e.target.value)}
            value={searchJobText}
            placeholder="manufacturing, sales, swim"
          ></SearchBox>
        </InputWrapper>
      </HeaderSection>
      {/* ------------- Category, Type, Salary Range Zone ------------- */}
      <FilterInputWrapper>
        {/* ------------- Box 1: Category ------------- */}
        <InputWrapperSection>
          <InputBoxLabel>CATEGORY</InputBoxLabel>
          <DropDownList
            className="gtj-input pink-border"
            onChange={categoryFilter}
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {jobCategoryList.map((items, index) => {
              return (
                <option key={index} value={items}>
                  {items}
                </option>
              );
            })}
          </DropDownList>
        </InputWrapperSection>
        {/* ------------- Box 2: Type ------------- */}
        <InputWrapperSection>
          <InputBoxLabel>TYPE</InputBoxLabel>
          <DropDownList
            className="gtj-input pink-border"
            id="jobType"
            name="jobType"
            onChange={typeFilter}
          >
            <option value="" disabled selected>
              Select a type
            </option>
            {jobTypeList.map((items, index) => {
              return (
                <option key={index} value={items}>
                  {items}
                </option>
              );
            })}
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
                onChange={(e) => setSearchMinSalaryText(e.target.value)}
                value={searchMinSalaryText}
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
                onChange={(e) => setSearchMaxSalaryText(e.target.value)}
                value={searchMaxSalaryText}
              ></SearchSalary>
            </SubSalaryBox>
          </SalaryBox>
        </InputWrapperSection>
      </FilterInputWrapper>
      {/* ---------------------------------------------------------- */}
      {/* {`Search Input Text: ${searchJobText}`}
      <br></br>
      {`Job Data: ${jobs.length}`}
      <br></br>
      {`typeof minSalary input: ${typeof searchMinSalaryText}`}
      <br></br>
      {`typeof maxSalary input: ${typeof searchMaxSalaryText}`} */}
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
