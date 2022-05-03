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

function ProProsonalInfoForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkin, setLinkin] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="professional-register-form" onSubmit={handleSubmit}>
      <Container>
        <Label>NAME</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
      </Container>
      <Container>
        <Label>PHONE</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+XXXXXXXXXX"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          value={phone}
        />
      </Container>
      <Container>
        <Label>BIRTHDATE</Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          placeholder="Pick a date"
          onChange={(event) => {
            setBirthDate(event.target.value);
          }}
          value={birthDate}
        />
      </Container>

      <Container>
        <Label>LINKDIN URL</Label>
        <Input
          id="linkin"
          name="linkin"
          type="url"
          placeholder="https://www.linkedin.com/username"
          onChange={(event) => {
            setLinkin(event.target.value);
          }}
          value={linkin}
        />
      </Container>
    </form>
  );
}

export default ProProsonalInfoForm;
