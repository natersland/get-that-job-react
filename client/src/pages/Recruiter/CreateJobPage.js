import styled from "@emotion/styled";
import moment from "moment";
import Alert from "@mui/material/Alert";

//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
import { useRecruiter } from "../../contexts/recruiter";
import { useState } from "react";
//Components ------------------------------------
import AlertNotification from "../../components/Utilities/AlertNotification";
// Utils
import UtilitiesFunction from "../../utils/utilitiesFunction";

function CreateJobPage() {
  const [isError, setIsError] = useState(false);
  const { filterComma, textUpperCase } = UtilitiesFunction();
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
    aboutJob,
    setAboutJob,
    mandatoryReq,
    setMandatoryReq,
    optionalReq,
    setOptionalReq,
    createdJobDate,
    setCreatedJobDate,
    totalCandidates,
    setTotalCandidates,
    candidatesOnTrack,
    setCandidatesOnTrack,
    jobsStatus,
    setJobsStatus,
    jobCategoryList,
    jobTypeList,
  } = useJobsData();
  const { createJob } = useRecruiter();

  // Add Comma Function -------------------------------------------------
  const addCommas = (num) =>
    Number(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeCommas = (num) => num.toString().replace(/[^0-9]/g, "");
  // ---------------------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    setCreatedJobDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    setJobsStatus(true);
    setTotalCandidates(0);
    setCandidatesOnTrack(0);
    if (filterComma(maxSalary) > filterComma(minSalary)) {
      const data = {
        jobTitle,
        jobCategory,
        jobType,
        minSalary,
        maxSalary,
        aboutJob,
        mandatoryReq,
        optionalReq,
        createdJobDate,
        totalCandidates,
        candidatesOnTrack,
        jobsStatus,
      };
      createJob(data);

      setJobTitle("");
      setJobCategory("");
      setJobType("");
      setMinSalary("");
      setMaxSalary("");
      setAboutJob("");
      setMandatoryReq("");
      setOptionalReq("");
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <Wrapper>
      <form id="createjob-form" onSubmit={handleSubmit}>
        <HeadingText className="pt-8">Create new job posting</HeadingText>
        <SectionWrapper>
          <SectionText>Main information</SectionText>
          {/* ------------ Job Title ------------ */}
          <TextLabel>{textUpperCase("Job title")}</TextLabel>
          <InputText
            id="job-title"
            name="job-title"
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
            className="pink-border gtj-input"
            placeholder="Software engineer"
            required
          ></InputText>
          {/* ------------ Job Category ------------ */}
          <SectionText>
            <TextLabel>{textUpperCase("Job Category")}</TextLabel>
          </SectionText>
          <SelectListData
            id="job-category"
            name="job-category"
            onChange={(e) => setJobCategory(e.target.value)}
            value={jobCategory}
            className="pink-border gtj-input"
            placeholder="Select or create a category"
            required
          >
            <option value="" disabled selected>
              Select or create a category
            </option>
            {jobCategoryList.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </SelectListData>
          {/* ------------ Job Type ------------ */}
          <TextLabel>{textUpperCase("Type")}</TextLabel>
          <SelectListData
            id="job-type"
            name="job-type"
            onChange={(e) => setJobType(e.target.value)}
            value={jobType}
            className="pink-border gtj-input"
            placeholder="Select a type"
            required
          >
            {" "}
            <option value="" disabled selected>
              Select a type
            </option>
            {jobTypeList.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </SelectListData>
          {/* ------------ Salary Range ------------ */}
          <TextLabel>{textUpperCase("Salary Range")}</TextLabel>
          <SalaryWrapper>
            <InputSalary
              id="min-salary"
              name="min-salary"
              type="text"
              maxLength={6}
              onChange={(e) =>
                setMinSalary(addCommas(removeCommas(e.target.value)))
              }
              value={minSalary}
              className="pink-border gtj-input dollar-icon"
              placeholder="min"
              required
            ></InputSalary>
            <Dash>
              <DashLine></DashLine>
            </Dash>
            <InputSalary
              id="max-salary"
              name="max-salary"
              type="text"
              maxLength={6}
              onChange={(e) =>
                setMaxSalary(addCommas(removeCommas(e.target.value)))
              }
              value={maxSalary}
              className="pink-border gtj-input  dollar-icon"
              placeholder="max"
              required
            ></InputSalary>
          </SalaryWrapper>
          {/*แจ้งเตือนเมื่อ user ใส่ เงินเดือน max salary < min salary */}
          {isError ? (
            <Alert className="mt-4 mb-2 w-8/12" severity="error">
              Your max salary is greater more than min salary. Please try again.
            </Alert>
          ) : null}
          {/*--------------------------------------------------- */}
        </SectionWrapper>

        {/* ----------------------------------------------------------- */}
        <SectionWrapper>
          <SectionText>Addtional information</SectionText>
          {/* ------------ About the job position ------------ */}
          <TextLabel>{textUpperCase("About the job position")}</TextLabel>
          <TextAreaInput
            id="about-job"
            name="about-job"
            onChange={(e) => setAboutJob(e.target.value)}
            value={aboutJob}
            className="pink-border gtj-input"
            placeholder="Describe the main functions and characteristics of your job position"
            rows={7}
          ></TextAreaInput>
          {/* ------------ Mandatory Requirements ------------ */}
          <TextLabel>{textUpperCase("Mandatory Requirements")}</TextLabel>
          <TextAreaInput
            id="mandatory-req"
            name="mandatory-req"
            onChange={(e) => setMandatoryReq(e.target.value)}
            value={mandatoryReq}
            className="pink-border gtj-input"
            placeholder="List each mandatory requirement in a new line"
            rows={7}
          ></TextAreaInput>
          {/* ------------ Optional Requirements ------------ */}
          <TextLabel>{textUpperCase("Optional Requirements")}</TextLabel>
          <TextAreaInput
            id="optional-req"
            name="optional-req"
            onChange={(e) => setOptionalReq(e.target.value)}
            value={optionalReq}
            className="pink-border gtj-input"
            placeholder="List each mandatory requirement in a new line"
            rows={3}
          ></TextAreaInput>
        </SectionWrapper>
        <SectionWrapper>
          <button
            className="btn btn-md btn-pink"
            type="submit"
            form="createjob-form"
          >
            Post this job
          </button>
        </SectionWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 65%;
  margin: auto;
`;
const HeadingText = styled.h1`
  font-size: 2.125rem;
  color: var(--primary-text-color);
`;
const SectionWrapper = styled.div`
  margin: 1.5rem 0;
  padding-left: 1rem;
  width: 100%;
`;
const SectionText = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-text-color);
`;

const TextLabel = styled.p`
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  margin-top: 1rem;
`;
const InputText = styled.input`
  width: 300px;
`;

const SelectListData = styled.select`
  width: 300px;
  letter-spacing: 0.25px;
`;
const SalaryWrapper = styled.div`
  display: flex;
`;
const InputSalary = styled.input`
  display: flex;
  width: 102px;
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

const TextAreaInput = styled.textarea`
  width: 760px;
  letter-spacing: 0.25px;
`;

export default CreateJobPage;
