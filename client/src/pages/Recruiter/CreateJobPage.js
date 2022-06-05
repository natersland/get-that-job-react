import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
import { useVadilation } from "../../contexts/vadilation";
import { useUtils } from "../../contexts/utilsContext";
//Components ------------------------------------
import Alert from "@mui/material/Alert";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
import AlertDialog from "../../components/Utilities/AlertDialog";
// Utils ------------------------------------
import UtilitiesFunction from "../../utils/utilitiesFunction";

function CreateJobPage() {
  const [isError, setIsError] = useState(false);
  const userLanguage = localStorage.getItem("language");

  const { filterComma, textUpperCase, addCommas, removeCommas } =
    UtilitiesFunction();
  const settingUserLanguage = () => {
    setLanguage(userLanguage);
  };
  // state for this page form start here -------------------------------
  const { jobCategoryList, jobTypeList } = useJobsData();
  const { setLoading, setIsAlert, setAlertMessage, language, setLanguage } =
    useUtils();
  const [jobTitle, setJobTitle] = useState(String);
  const [jobCategory, setJobCategory] = useState(String);
  const [jobType, setJobType] = useState(String);
  const [minSalary, setMinSalary] = useState(Number);
  const [maxSalary, setMaxSalary] = useState(Number);
  const [aboutJob, setAboutJob] = useState(String);
  const [mandatoryReq, setMandatoryReq] = useState(String);
  const [optionalReq, setOptionalReq] = useState(String);

  const navigate = useNavigate(); // หลังจากสร้าง job ต้อง redirect ไปที่หน้า nikki

  const resetJobData = () => {
    setJobTitle("");
    setJobCategory("");
    setJobType("");
    setMinSalary(0);
    setMaxSalary(0);
    setAboutJob("");
    setMandatoryReq("");
    setOptionalReq("");
  };
  // Connect to server: Create Job  -----------------------------------------
  const createJob = async (data) => {
    await axios.post("http://localhost:4000/jobs/create", data);
    window.location.reload(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const recruiterId = localStorage.getItem("id");
    // เงินเดือนที่ ส่งเข้ามาเก็บใน state มันจะมี comma ติดมาด้วย ต้องกรองออกก่อนเอามาเช็คเงื่อนไข
    // ถ้าเงินเดือน maxSalary มากกว่า minSalary ให้ user สร้างงานได้เลย ถ้าไม่ ให้ขึ้นแจ้งให้ user ไปกรอกใหม่
    if (filterComma(maxSalary) > filterComma(minSalary)) {
      setAlertMessage(
        ` ${
          language === "en" && language === undefined
            ? `Your job "${jobTitle}" has beed created successful!`
            : `งานตำแหน่ง "${jobTitle}" ถูกสร้างเรียบร้อย!`
        }`
      );
      setIsAlert(true);
      const data = {
        recruiterId,
        jobTitle,
        jobCategory,
        jobType,
        minSalary,
        maxSalary,
        aboutJob,
        mandatoryReq,
        optionalReq,
        createdJobDate: Date.now(),
      };
      setTimeout(function () {
        createJob(data);
        resetJobData();
        setIsError(false);
        setLoading(false);
      }, 2000);
      navigate("/viewjobs");
    } else {
      setIsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    settingUserLanguage();
    console.log("hi", language);
  }, [minSalary, maxSalary, language]);
  return (
    <Wrapper>
      <AlertDialog />
      <BackDropLoading />
      <form id="createjob-form" onSubmit={handleSubmit}>
        <HeadingText className="pt-8">
          {language === "en" || language === undefined
            ? "Create new job posting"
            : "สร้างงานใหม่"}
        </HeadingText>
        <SectionWrapper>
          <SectionText>
            {language === "en" || language === undefined
              ? "Main information"
              : "ข้อมูลหลัก"}
          </SectionText>
          {/* ------------ Job Title ------------ */}
          <TextLabel className="uppercase">
            {language === "en" || language === undefined
              ? "Job Title"
              : "ชื่อตำแหน่ง"}
          </TextLabel>
          <InputText
            id="job-title"
            name="jobTitle"
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
            className="pink-border gtj-input"
            placeholder="Software engineer"
            required
          ></InputText>
          <br></br>
          {!jobTitle ? (
            <span className="error-message">
              {" "}
              {language === "en" || language === undefined
                ? "*required"
                : "*กรุณาชื่อตำแหน่ง"}
            </span>
          ) : null}
          {/* ------------ Job Category ------------ */}
          <SectionText>
            <TextLabel className="uppercase">
              {" "}
              {language === "en" || language === undefined
                ? "Job Category"
                : "หมวดหมู่"}
            </TextLabel>
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
              {language === "en" || language === undefined
                ? "Select category"
                : "เลือกหมวดหมู่"}
            </option>
            {jobCategoryList.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </SelectListData>
          <br></br>
          {!jobCategory ? (
            <span className="error-message">
              {language === "en" || language === undefined
                ? "*required"
                : "*กรุณาเลือกหมวดหมู่"}
            </span>
          ) : null}
          {/* ------------ Job Type ------------ */}
          <TextLabel className="uppercase">
            {language === "en" || language === undefined ? "Type" : "ประเภท"}
          </TextLabel>
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
              {language === "en" || language === undefined
                ? "Select a type"
                : "เลือกประเภท"}
            </option>
            {jobTypeList.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </SelectListData>
          <br></br>
          {!jobType ? (
            <span className="error-message">
              {language === "en" || language === undefined
                ? "*required"
                : "*กรุณาเลือกประเภท"}
            </span>
          ) : null}
          {/* ------------ Salary Range ------------ */}
          <TextLabel className="uppercase">
            {language === "en" || language === undefined
              ? "Salary Range"
              : "เงินเดือน"}
          </TextLabel>
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
          {!minSalary || !maxSalary ? (
            <span className="error-message">
              {language === "en" || language === undefined
                ? "*Min salary and max salary is required."
                : "*กรุณาใส่เงินเดือน"}
            </span>
          ) : null}
          {/*แจ้งเตือนเมื่อ user ใส่ เงินเดือน max salary < min salary */}
          {isError ? (
            <Alert className="mt-4 mb-2 w-8/12" severity="error">
              {language === "en" || language === undefined
                ? "Your max salary is greater more than min salary. Please try again."
                : "จำนวนเงินเดือนสูงสุดน้อยกว่าจำนวนเงินเดือนต่ำสุด กรุณาใส่ใหม่อีกครั้ง"}
            </Alert>
          ) : null}
          {/*--------------------------------------------------- */}
        </SectionWrapper>

        {/* ----------------------------------------------------------- */}
        <SectionWrapper>
          <SectionText>
            {language === "en" || language === undefined
              ? "Addtional information"
              : "ข้อมูลเพิ่มเติม"}
          </SectionText>
          {/* ------------ About the job position ------------ */}
          <TextLabel className="uppercase">
            {language === "en" || language === undefined
              ? "About the job position"
              : "ข้อมูลเกี่ยวกับตำแหน่งงานนี้"}
          </TextLabel>
          <TextAreaInput
            id="about-job"
            name="about-job"
            onChange={(e) => setAboutJob(e.target.value)}
            value={aboutJob}
            className="pink-border gtj-input"
            placeholder={
              language === "en" || language === undefined
                ? "Describe the main functions and characteristics of your job position"
                : "อธิบายเกี่ยวกับหน้าที่หลัก และ รายละเอียดเกี่ยวกับตำแหน่งงานของคุณ"
            }
            rows={7}
          ></TextAreaInput>
          {/* ------------ Mandatory Requirements ------------ */}
          <TextLabel className="uppercase">
            {language === "en" || language === undefined
              ? "Mandatory Requirements"
              : "ข้อบังคับ"}
          </TextLabel>
          <TextAreaInput
            id="mandatory-req"
            name="mandatory-req"
            onChange={(e) => setMandatoryReq(e.target.value)}
            value={mandatoryReq}
            className="pink-border gtj-input"
            placeholder={
              language === "en" || language === undefined
                ? "List each mandatory requirement in a new line"
                : "รายละเอียดเกี่ยวกับข้อบังคับ"
            }
            rows={7}
          ></TextAreaInput>
          {/* ------------ Optional Requirements ------------ */}
          <TextLabel className="uppercase">
            {language === "en" || language === undefined
              ? "Optional Requirements"
              : "รายละเอียดอื่นๆ"}
          </TextLabel>
          <TextAreaInput
            id="optional-req"
            name="optional-req"
            onChange={(e) => setOptionalReq(e.target.value)}
            value={optionalReq}
            className="pink-border gtj-input"
            placeholder={
              language === "en" || language === undefined
                ? "List each optional requirement in a new line"
                : "รายละเอียดอื่นๆ"
            }
            rows={3}
          ></TextAreaInput>
        </SectionWrapper>
        <SectionWrapper>
          <Button
            className="btn btn-md btn-pink"
            type="submit"
            form="createjob-form"
            lang={language}
          >
            {language === "en" || language === undefined
              ? "Post this job"
              : "สร้างงานใหม่"}
          </Button>
        </SectionWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 80%;
    margin-left: 25px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-left: 50px;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    margin-left: 320px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    margin-left: 320px;
  }
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
  margin-top: 10px;
`;
const InputText = styled.input`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 380px;
  }
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
  height: 200px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 550px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 744px;
  }

  /* Extra (desktops, 1400  and up) */
  @media only screen and (min-width: 1400px) {
    width: 744px;
  }
`;
const Button = styled.button`
  font-size: ${(props) =>
    props.lang === "en" || props.lang !== "th" ? "0.95rem" : "0.95rem"};
`;

export default CreateJobPage;
