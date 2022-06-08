import styled from "@emotion/styled";
// Contexts ---------------------------------------
import { useJobsData } from "../../contexts/jobsData";

function FindThatJobHeader({
  setSearchJobText,
  setSearchMinSalaryText,
  setSearchMaxSalaryText,
  setsearchJobCategory,
  setJobType,
  searchJobText,
  searchMinSalaryText,
  searchMaxSalaryText,
  jobType,
  searchJobCategory,
}) {
  const { jobTypeList, jobCategoryList } = useJobsData();

  const resetData = () => {
    setSearchJobText("");
    setSearchMinSalaryText("");
    setSearchMaxSalaryText("");
    setsearchJobCategory("");
    setJobType("");
    searchJobCategory("");
  };
  return (
    <Wrapper className="pt-8">
      {/* ------------- Header Section  ------------- */}
      <HeaderSection>
        <HeadingText>Find that job</HeadingText>
        {/* ------------- Search Box Zone  ------------- */}
        <InputWrapper>
          <form action="/jobs" method="get">
            <div className="flex items-center justify-items-center">
              <div>
                <InputBoxLabel>
                  SEARCH BY JOB TITLE OR COMPANY NAME
                </InputBoxLabel>
                <SearchBox
                  className="gtj-input pink-border search-icon"
                  id="searchJobText"
                  name="searchjobword"
                  type="text"
                  onChange={(e) => setSearchJobText(e.target.value)}
                  value={searchJobText}
                  placeholder="manufacturing, sales, swim"
                ></SearchBox>
              </div>
              {/*   <div>
                <span className="inline">
                  <SearchButton
                    className="btn btn-md btn-active mt-5 ml-3"
                    type="submit"
                  >
                    Search
                  </SearchButton>
                </span>
              </div> */}
              <div>
                <span className="inline">
                  <button
                    type="button"
                    className="btn btn-pink btn-md mt-5 ml-3"
                    onClick={resetData}
                  >
                    Clear
                  </button>
                </span>
              </div>
            </div>
          </form>
        </InputWrapper>
      </HeaderSection>

      {/* ------------- Category, Type, Salary Range Zone ------------- */}
      <FilterInputWrapper>
        {/* ------------- Box 1: Category ------------- */}
        <InputWrapperSection>
          <InputBoxLabel>CATEGORY</InputBoxLabel>
          <DropDownList
            className="gtj-input pink-border"
            onChange={(e) => setsearchJobCategory(e.target.value)}
            value={searchJobCategory}
          >
            <option value="" selected>
              All
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
            onChange={(e) => setJobType(e.target.value)}
            value={jobType}
          >
            <option value="" selected>
              All
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
    </Wrapper>
  );
}
export default FindThatJobHeader;
const Wrapper = styled.section``;
const HeaderSection = styled.div`
  width: 100%;
`;
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
  @media only screen and (max-width: 600px) {
    visibility: hidden;
  }
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
  height: 38px;
`;

const SearchBox = styled.input`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 332px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 500px;
  }
`;
const SearchButton = styled.button`
  display: inline;
  background-color: var(--primary-brand-color);
`;

const SalaryBox = styled.div`
  @media only screen and (max-width: 600px) {
    visibility: hidden;
  }
`;

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
