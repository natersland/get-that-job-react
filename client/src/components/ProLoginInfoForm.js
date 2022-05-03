import { useState } from "react";
import styled from "@emotion/styled";
import "../App.css";

const Input = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
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

function ProLoginInfoForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  /* const clickButton = () => {
    alert("Hellooooooooo");
  }; */

  return (
    <form className="professional-register-form" onSubmit={handleSubmit}>
      <Container>
        <Label>EMAIL</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="some.user@mail.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </Container>
      <Container>
        <Label>PASSWORD</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="**********"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
      </Container>
      <Container>
        <Label>PASSWORD CONFORMATION</Label>
        <Input
          id="password-confiremed"
          name="password-confiremed"
          type="password"
          placeholder="**********"
          onChange={(event) => {
            setPasswordConfirmed(event.target.value);
          }}
          value={passwordConfirmed}
        />
      </Container>
    </form>
  );
}

export default ProLoginInfoForm;
