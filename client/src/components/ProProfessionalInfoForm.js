import { useState } from "react";
import styled from "@emotion/styled";
import "../App.css";

const Input = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  margin-bottom: 16px;
  padding-left: 10px;
  padding-right: 10px;
  color: #8e8e8e;
`;

const InputLimit = styled.textarea`
  width: 600px;
  height: 76px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  margin-bottom: 5px;
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
  margin: 4px;
`;

const UploadFileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;

const UploadButton = styled.label`
  margin-right: 15px;
  width: 134px;
  height: 40px;
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

function ProProfessionalInfoForm() {
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [uploadFile, setUploadFile] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setUploadFile({
      ...uploadFile,
      [uniqueId]: event.target.files[0],
    });
  };

  return (
    <form className="professional-register-form" onSubmit={handleSubmit}>
      <CaptionInformation>
        YOU CAN COMPLETE THIS INFORMATION LATER BUT WE RECOMEND YOU TO DO IT NOW
      </CaptionInformation>
      <Container>
        <Label>TITLE</Label>
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
        <Label>PROFESSIONAL EXPERIENCE</Label>
        <InputLimit
          id="experience"
          name="experience"
          type="text"
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
        <Label>EDUCATION</Label>
        <InputLimit
          id="education"
          name="education"
          type="text"
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
        <UploadButton htmlFor="upload">
          <ChooseFile>Choose File</ChooseFile>
        </UploadButton>
        <input
          id="upload"
          name="cv"
          type="file"
          placeholder="Enter last name here"
          onChange={handleFileChange}
          hidden
        />
        <FileName>No file chosen</FileName>
      </UploadFileSection>
      <Limitation>Only PDF Max size 5MB</Limitation>
    </form>
  );
}

export default ProProfessionalInfoForm;
