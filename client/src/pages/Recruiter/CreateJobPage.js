import styled from "@emotion/styled";
//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
import { useRecruiter } from "../../contexts/recruiter";
//Components ------------------------------------
const textUpperCase = (props) => {
  const text = props;
  return text.toUpperCase();
};

export default function CreateJobPage() {
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
  } = useJobsData();
  console.log(jobType);

  const { createJob } = useRecruiter();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      jobTitle,
      jobCategory,
      jobType,
      minSalary,
      maxSalary,
      aboutJob,
      mandatoryReq,
      optionalReq,
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
            <option>Manufacturing</option>
            <option>Legal</option>
            <option>Education</option>
            <option>Goverment</option>
            <option>Sales</option>
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
            <option>Full Time</option>
            <option>Part Time</option>
          </SelectListData>
          {/* ------------ Salary Range ------------ */}
          <TextLabel>{textUpperCase("Salary Range")}</TextLabel>
          <SalaryWrapper>
            <InputSalary
              id="min-salary"
              name="min-salary"
              type="text"
              pattern="^[0-9]*"
              maxLength={6}
              onChange={(e) => setMinSalary(e.target.value)}
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
              pattern="^[0-9]*"
              maxLength={6}
              onChange={(e) => setMaxSalary(e.target.value)}
              value={maxSalary}
              className="pink-border gtj-input  dollar-icon"
              placeholder="max"
              required
            ></InputSalary>
          </SalaryWrapper>
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
  /*   border: 1px dotted var(--primary-text-color);
 */
`;
const HeadingText = styled.h1`
  font-size: 2.125rem;
  color: var(--primary-text-color);
`;
const SectionWrapper = styled.div`
  /*   border: 1px dotted var(--primary-text-color); */
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
