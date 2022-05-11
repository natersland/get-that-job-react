import styled from "@emotion/styled";
// Pictures --------------------
import DollarLineIcon from "../../assets/money-dollar-circle-line.svg";
import CompanyIcon from "../../assets/building-3-line.svg";
import FocusIcon from "../../assets/money-dollar-circle-line.svg";
// Contexts --------------------
import { useUserData } from "../../contexts/usersData";
import { useJobsData } from "../../contexts/jobsData";
// Contexts --------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";
//
function FindThatJobCard() {
  const {
    jobTitle,
    setJobTitle,
    jobCategory,
    setJobCategory,
    jobType,
    setJobType,
    minSalary,
    setMinSalary,
    maxSalary,
    setMaxSalary,
  } = useJobsData();
  const { textUpperCase } = UtilitiesFunction();

  return (
    <Wrapper>
      <JobsCounterNumber></JobsCounterNumber>
      <FindThatJobWrapper></FindThatJobWrapper>
    </Wrapper>
  );
}
export default FindThatJobCard;

//  CSS Zone --------------------------
const Wrapper = styled.section``;
const JobsCounterNumber = styled.h1``;
const FindThatJobWrapper = styled.h1``;
