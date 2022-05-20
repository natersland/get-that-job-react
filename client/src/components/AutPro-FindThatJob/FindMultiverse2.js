import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
// Contexts --------------------
import { useJobsData } from "../../contexts/jobsData";
function FindMultiverse2() {
  const [searchJobText, setSearchJobText] = useState("");
  const [searchMinSalaryText, setSearchMinSalaryText] = useState("");
  const [searchMaxSalaryText, setSearchMaxSalaryText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobCateGory, setJobCateGory] = useState("");
  const [keywordsNumber, setKeywordsNumber] = useState("");

  const { jobs, setJobs, jobCategoryList, jobTypeList } = useJobsData();

  // Filter Seach Text --------------------------------------------
  const selectedCategory = async (e) => {
    const userSelect = e.target.value;
    setJobCateGory(userSelect);
    console.log(jobCateGory);
  };
  const selectedType = async (e) => {
    const userSelect = e.target.value;
    setJobType(userSelect);
  };

  const [filter, setFilter] = useState({ active: false });

  const multiverseFilter = async (
    text,
    category,
    type,
    searchMinSalaryText,
    searchMaxSalaryText
  ) => {
    const results = await axios(`http://localhost:4000/jobs`);
    const jobData = results.data.data;

    // Filter Everything ---------------------

    const filterText = jobData.filter((item) => {
      return (
        item.jobTitle.toLowerCase().match(text) ||
        item.company[0].companyName.toLowerCase().match(text)
      );
    });

    const filterCategory = filterText.filter((item) => {
      return item.jobCategory === category;
    });
    const filterType = filterCategory.filter((item) => {
      return item.jobType === type;
    });

    const filterAll = jobData.filter((item) => {
      return (
        item.jobTitle.toLowerCase().match(text) &&
        item.company[0].companyName.toLowerCase().match(text) &&
        item.jobCategory === category &&
        item.jobType === type
      );
    });
    // Condition Here ---------------------
    if (text !== "" || category !== "" || type !== "") {
      if (text !== "") {
        setJobs(filterText);
      } else if (category !== "") {
        setJobs(filterCategory);
      } else if (category !== "") {
        setJobs(filterType);
      }
    }

    if ((text !== "" && category !== "") || (text !== "" && type !== "")) {
      if (text !== "" && category !== "") {
        let result = jobData
          .filter((items) => {
            return (
              items.jobTitle.toLowerCase().match(text) ||
              items.company[0].companyName.toLowerCase().match(text)
            );
          })
          .filter((items) => {
            return items.jobType === type;
          });
        setJobs(result);
      }
    }
  };

  useEffect(() => {
    multiverseFilter(
      searchJobText,
      jobCateGory,
      jobType,
      searchMinSalaryText,
      searchMaxSalaryText
    );
  }, [jobs]);

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
            onChange={selectedCategory}
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
            onChange={selectedType}
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
export default FindMultiverse2;
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
