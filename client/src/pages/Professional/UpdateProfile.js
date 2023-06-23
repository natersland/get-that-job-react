import { React, useState } from "react";
import styled from "@emotion/styled";
import { useUserData } from "../../contexts/usersData";
import axios from "axios";
import { useEffect } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLocation } from "react-router-dom";
import useCheckLocation from "../../hooks/useCheckLocation";
// Images -------------------------------------
import FileIcon from "../../assets/icons/file.png";
// Contexts -------------------------------------
import { useUtils } from "../../contexts/utilsContext";
// Components -------------------------------------
import AlertDialog from "../../components/Utilities/AlertDialog";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";

function UpdatePersonalProfile() {
  const [phone, setPhone] = useState();
  const [showCvFile, setShowCvFile] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [uploadFiles, setUploadFiles] = useState({});

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const { setAlertMessage, setIsAlert, setLoading, loading, gtjApiService } = useUtils();

  // detect user refresh page and setting sidebar index ----------------------------
  const location = useLocation();
  const { checkUserPage } = useCheckLocation(location.pathname, "/profile", 4);
  // Get professional user data ----------------------------------
  const getUsers = async () => {
    setLoading(true);
    checkUserPage();
    const getResults = await axios.get(`${gtjApiService}/users/${userId}`);
    setShowCvFile(getResults?.data.cvFiles[0]?.url);
    setEmail(getResults.data.email);
    setName(getResults.data.name);
    setPhone(getResults.data.phone);
    setCompanyWebsite(getResults.data.companyWebsite);
    setBirthDate(getResults.data.birthDate);
    setLinkedin(getResults.data.linkedin);
    setTitle(getResults.data.title);
    setExperience(getResults.data.experience);
    setEducation(getResults.data.education);
    setUploadFiles(getResults.data.uploadFiles);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // fx update professional data ----------------------------------
  const updateProfile = async (formData) => {
    setLoading(true);
    await axios.put(`${gtjApiService}/users/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    getUsers();
    setLoading(false);
    setAlertMessage(`Your professional profile has been updated!`);
  };

  // fx submit form ----------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (name) {
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("companyWebsite", companyWebsite);
      formData.append("birthDate", birthDate);
      formData.append("linkedin", linkedin);
      formData.append("experience", experience);
      formData.append("title", title);
      formData.append("experience", experience);
      formData.append("education", education);
      formData.append("userRole", userRole);
      if (uploadFiles) {
        for (let updateKey in uploadFiles) {
          formData.append("cvFiles", uploadFiles[updateKey]);
        }
      }
      updateProfile(formData);
      setAlertMessage(`Your company profile has been updated!`);
      setIsAlert(true);
    } else if (name === "" || name === "-") {
      setAlertMessage(`Name is required.`);
      setIsAlert(true);
    }
  };

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setUploadFiles({
      [uniqueId]: event.target.files[0],
    });
  };
  return loading ? (
    <CircularIndeterminate />
  ) : (
    <MarginWrap>
      <BackDropLoading />
      <AlertDialog />

      <Texth1>Profile</Texth1>
      <Texth3>Personal Information</Texth3>
      <Form
        id="update-Professional-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <LabelText htmlFor="email">EMAIL</LabelText>
        <Input
          type="email"
          className="gtj-input pink-border bg-gray text-supergray"
          id="email"
          value={email}
          disabled
          onChange={(event) => setEmail(event.target.value)}
        />

        <LabelText>NAME</LabelText>
        <Input
          type="text"
          className="gtj-input pink-border"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {!name || name.length < 1 || name === "-" ? (
          <span className="error-message mt-1 mb-1">
            Please input your name number before you apply any job.
          </span>
        ) : null}
        <LabelText>PHONE</LabelText>
        <ReactPhoneInput
          country="th"
          value={phone}
          onChange={setPhone}
          autoFormat={true}
          disableDropdown={true}
          placeholder={"+xx xxx xxx xxxx"}
        />
        <LabelUnder>+[country code][number]</LabelUnder>
        {!phone || phone.length < 4 ? (
          <span className="error-message mt-1 mb-1">
            Please input your phone number before you apply any job.
          </span>
        ) : null}

        <LabelText>BIRTHDAY</LabelText>
        <Input
          type="date"
          className="gtj-input pink-border"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />

        <LabelText>LINKEDIN URL</LabelText>
        <Input
          type="text"
          className="gtj-input pink-border"
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
        />

        <Texth4>Professional Information</Texth4>
        <P>
          changes you made here will be reflected in your future application
        </P>
        <LabelText>TITLE</LabelText>
        <Input
          type="text"
          className="gtj-input pink-border"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <LabelText>PROFESSIONAL EXPERIENCE</LabelText>
        <Textarea
          className="gtj-input pink-border"
          cols="60"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
        <LabelText>EDUCATION</LabelText>
        <Textarea
          className="gtj-input pink-border"
          cols="40"
          value={education}
          onChange={(event) => setEducation(event.target.value)}
        />

        <CVFilesWrapper className="shadow-md">
          <CVIconWrapper>
            <a href={showCvFile} target="_blank" rel="noreferrer">
              <CVIcon
                src={FileIcon}
                width="100px"
                className="mt-5 mb-5"
                alt="cv-icon"
              />
            </a>
          </CVIconWrapper>
          <InputFileWrap>
            <CVHeading>Professional CV File</CVHeading>
            <DownloadCVButton
              className={`btn ${
                showCvFile === null || !showCvFile ? "btn-gray" : "btn-active"
              } btn-md`}
              href={showCvFile}
              target="_blank"
            >
              {showCvFile === null || !showCvFile
                ? "No CV File Uploaded"
                : "Download your CV File"}
            </DownloadCVButton>
            <Label2>UPLOAD/UPDATE YOUR CV</Label2>
            <UploadFileSection>
              <Input1
                id="uploadCV"
                name="CV"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                maxSize={5}
              />
            </UploadFileSection>
            <Limitation>Only PDF Max size 5MB</Limitation>
            {!showCvFile || showCvFile === null ? (
              <span className="error-message mt-1">
                Please upload your Cv File before you apply any job.
              </span>
            ) : null}
          </InputFileWrap>
        </CVFilesWrapper>

        <Button
          form="update-Professional-form"
          type="submit"
          className="btn btn-md btn-pink "
        >
          SAVE CHANGE
        </Button>
      </Form>
    </MarginWrap>
  );
}

export default UpdatePersonalProfile;

const Texth1 = styled.h1`
  font-size: 37px;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-family: var(--primary-font);
`;

const Texth3 = styled.p`
  font-size: 24px;
  line-height: 29.26px;
  font-weight: 400;
  font-family: var(--primary-font);
  margin-top: 15px;
`;

const Texth4 = styled.p`
  font-size: 24px;
  line-height: 29.26px;
  font-weight: 400;
  font-family: var(--primary-font);
  margin-top: 35px;
`;
const MarginWrap = styled.div`
  margin-bottom: 100px;
  padding-top: 32px;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 80%;
    margin-left: 45px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-left: 100px;
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

const Button = styled.button`
  display: inline-block;
  width: 150px;
  margin-top: 24px;
  text-align: center;
  letter-spacing: 1.35px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 380px;
  }
`;
const Textarea = styled.textarea`
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

const Label2 = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #616161;
  margin-top: 10px;
  margin-bottom: 3px;
`;

const LabelUnder = styled.label`
  font-family: var(--seconary-font);
  font-size: 12px;
  color: #8e8e8e;
  line-height: 30px; ;
`;
const UploadFileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const CVFilesWrapper = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  margin-top: 20px;
  padding: 10px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 300px;
    flex-direction: column;
    padding: 30px;
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
const CVIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin-right: 20px;
  @media only screen and (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
const CVIcon = styled.img`
  filter: saturate(75%);
`;
const CVHeading = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
  color: var(--gray);
`;
const DownloadCVButton = styled.a`
  width: 220px;
  justify-content: center;
`;

const Input1 = styled.input`
  height: 36px;
  border-radius: 8px;
  color: #8e8e8e;
  /*   width: 360px;
 */
`;

const P = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  color: #616161;
  font-size: 12px;
`;

const Limitation = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 1.5px;
  width: 380px;
  margin-top: 0px;
  color: #8e8e8e;
`;

const InputFileWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LabelText = styled.label`
  font-size: 10px;
  color: var(--primary-text-color);
  font-family: var(--seconary-font);
  letter-spacing: 1.5px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
