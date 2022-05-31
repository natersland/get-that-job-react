import styled from "@emotion/styled";
// Contexts
import { useUserData } from "../../contexts/usersData";

function ProRegisterForm2() {
  const {
    name,
    setName,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    linkedin,
    setLinkedin,
  } = useUserData();

  return (
    <div>
      <CaptionInformation>
        YOU CAN COMPLETE THIS INFORMATION LATER BUT WE RECOMEND YOU TO DO IT NOW
      </CaptionInformation>
      <Container>
        <Label htmlFor="name">NAME</Label>
        <Input
          id="name"
          name="name"
          type="text"
          className="gtj-input pink-border"
          placeholder="John Doe"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
      </Container>
      <Container>
        <Label htmlFor="phone">PHONE</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          className="gtj-input pink-border"
          placeholder="0XXXXXXXXX"
          maxlength="10"
          pattern="[0-9]{10}"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          value={phone}
        />
      </Container>
      <Container>
        <Label htmlFor="birthDate">BIRTHDATE</Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          className="gtj-input pink-border "
          placeholder="Pick a date"
          onChange={(event) => {
            setBirthDate(event.target.value);
          }}
          value={birthDate}
        />
      </Container>

      <Container>
        <Label htmlFor="linkedin">LINKEDIN URL</Label>
        <Input
          id="linkedin"
          name="linkedin"
          type="url"
          className="gtj-input pink-border"
          placeholder="https://www.linkedin.com/username"
          onChange={(event) => {
            setLinkedin(event.target.value);
          }}
          value={linkedin}
        />
      </Container>
    </div>
  );
}

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

const CaptionInformation = styled.h4`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 1.5px;
  width: 380px;
  margin-bottom: 5px;
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
  line-height: 12.1px;
  letter: 1.5px;
  letter-spacing: 1.5px;
  margin-top: 4px;
  color: var(--primary-text-color);
  font-family: var(--secondary-text-colo);
  text-transform: uppercase;
`;

export default ProRegisterForm2;
