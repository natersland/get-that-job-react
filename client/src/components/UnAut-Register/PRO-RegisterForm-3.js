import styled from "@emotion/styled";

// Contexts
import { useUserData } from "../../contexts/usersData";

function ProRegisterForm3() {
  const {
    title,
    setTitle,
    experience,
    setExperience,
    education,
    setEducation,
    uploadFiles,
    setUploadFiles,
  } = useUserData();

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
          className="gtj-input pink-border"
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
          className="gtj-input pink-border"
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
          className="gtj-input pink-border"
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
        <input
          id="upload"
          name="uploadResumeFile"
          type="file"
          accept="application/pdf"
          placeholder="Enter last name here"
          onChange={handleFileChange}
        />
      </UploadFileSection>
      <Limitation>Only PDF Max size 5MB</Limitation>
    </div>
  );
}

const Input = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  margin-bottom: 15px;
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
  margin-bottom: 5px;
  color: #8e8e8e;
`;

export default ProRegisterForm3;
