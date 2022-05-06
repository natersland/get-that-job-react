import { useState } from "react";
import styled from "@emotion/styled";
import "../App.css";
import { useAuth } from "../contexts/authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import GTJhooksfantasy from "../hooks/GTJhooksfantasy";

const Input = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  color: #8e8e8e;
`;

const InputLimit = styled.textarea`
  width: 600px;
  height: 65px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  margin-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  color: var(--tertiary-text-color);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const Label = styled.label`
  font-size: 400;
  font-size: 10px;
  margin-top: 0px;
`;

const UploadFileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const UploadButton = styled.button`
  margin-right: 15px;
  width: 134px;
  height: 35px;
  border-radius: 8px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  font-weight: 400;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

const CaptionInformation = styled.h4`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 1.5px;
  width: 380px;
`;

const Limitation = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 1.5px;
  width: 380px;
  margin-top: 0px;
  color: var(--tertiary-text-color);
`;

const ChooseFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FileName = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  color: #616161;
`;

function ProProfessionalInfoForm(props) {
  const {
    title,
    setTitle,
    experience,
    setExperience,
    education,
    setEducation,
    uploadFiles,
    setUploadFiles,
  } = props;

  const { register } = useAuth();

  /* const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      title,
      experience,
      education,
    };

    for (let uploadFileKey in uploadFiles) {
      data.append("uploadFile", uploadFiles[uploadFileKey]);
    }
    register(data);
  }; */

  const handleFileChange = (event) => {
    if (event.target.files[0].size > 5000000) {
      alert("this file is too big!");
    } else {
      const uniqueId = Date.now();
      setUploadFiles({
        ...uploadFiles,
        [uniqueId]: event.target.files[0],
      });
    }
  };

  return (
    <div>
      <CaptionInformation>
        YOU CAN COMPLETE THIS INFORMATION LATER BUT WE RECOMEND YOU TO DO IT NOW
      </CaptionInformation>
      <Container>
        <Label htmlFor="title">TITLE</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Mechanical administrator..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
        />
      </Container>
      <Container>
        <Label htmlFor="experience">PROFESSIONAL EXPERIENCE</Label>
        <InputLimit
          id="experience"
          name="experience"
          type="text"
          minLength="300"
          maxLength="2000"
          placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
          onChange={(event) => {
            setExperience(event.target.value);
          }}
          value={experience}
          rows={4}
          cols={30}
        />
        <Limitation>Between 300 and 2000 characters</Limitation>
      </Container>
      <Container>
        <Label htmlFor="education">EDUCATION</Label>
        <InputLimit
          id="education"
          name="education"
          type="text"
          minLength="100"
          maxLength="2000"
          placeholder="Major in life experiences with a PHD in procrastination..."
          onChange={(event) => {
            setEducation(event.target.value);
          }}
          value={education}
          rows={4}
          cols={30}
        />
        <Limitation>Between 100 and 2000 characters</Limitation>
      </Container>

      <Label>UPLOAD/UPDATE YOUR CV</Label>
      <UploadFileSection>
        {/*         <UploadButton htmlFor="upload">
          <ChooseFile>Choose File</ChooseFile>
        </UploadButton> */}
        <input
          className="uploadBtn"
          id="upload"
          name="uploadResumeFile"
          type="file"
          accept="application/pdf"
          placeholder="Enter last name here"
          onChange={handleFileChange}
        />
        {/*         <FileName>No file chosen</FileName> */}
      </UploadFileSection>
      <Limitation>Only PDF Max size 5MB</Limitation>
      {/* file name */}
      {/*  <button type="submit">submit</button> */}
    </div>
  );
}

export default ProProfessionalInfoForm;
