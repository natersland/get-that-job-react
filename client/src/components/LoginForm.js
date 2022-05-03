// Tools
import styled from "@emotion/styled";
import { useState } from "react";

//CSS
import "../App.css";

// Picture
import maleStandingWithSmile from "../img/Group 65.png";

// components
import SelectRole from "./SelectRole";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {};
  return (
    <WrapperLogin>
      <WrapperLoginLeft>
        <LoginZoneWrapper>
          <LoginIntroduction>
            <LoginHeaderText>Welcome back</LoginHeaderText>
            <LoginIntroText>Login to you account as...</LoginIntroText>
          </LoginIntroduction>
          <SelectRole />
          <LoginFormWrapper onSubmit={handleSubmit}>
            <InputWrapper>
              EMAIL
              <Input
                id="email-input"
                name="email-input"
                type="email"
                placeholder="some.user@mail.com"
              ></Input>
            </InputWrapper>
            <InputWrapper>
              PASSWORD
              <Input
                id="password-input"
                name="password-input"
                type="password"
                placeholder="******"
              ></Input>
            </InputWrapper>
            <FormAction>
              <Button type="Submit">Login</Button>
            </FormAction>
          </LoginFormWrapper>
        </LoginZoneWrapper>
      </WrapperLoginLeft>
      <WrapperLoginRight>
        <img src={maleStandingWithSmile} />
      </WrapperLoginRight>
    </WrapperLogin>
  );
}

// ------------------- CSS Style Component Zone -------------------
const WrapperLogin = styled.section`
  width: 90%;
  display: flex;
  margin: auto;
  padding: 6rem;
`;
const WrapperLoginLeft = styled.div`
  width: 55%;

  display: flex;
  justify-content: flex-end;
  align-content: center;
`;
const WrapperLoginRight = styled.div`
  width: 45%;
`;

const LoginZoneWrapper = styled.div`
  width: 45%;
  height: 70%;
  margin: 0 4rem;
`;
const LoginIntroduction = styled.div`
  font-family: var(--primary-font);
  color: var(--primary-text-color);
`;
const LoginHeaderText = styled.h1`
  font-weight: 400;
  font-size: 3rem;
  margin: 0;
`;
const LoginIntroText = styled.p`
  font-size: 1.25rem;
  line-height: 28px;
  font-weight: 500;
`;
// Login Form Zone -------------------
const LoginFormWrapper = styled.form`
  font-family: var(--seconary-font);
  color: #373737;
  height: 50%;
  margin-top: 1rem;
`;
const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.625rem;
  margin: 1rem 0;
`;
const Input = styled.input`
  font-family: var(--seconary-font);
  color: var(--secondary-text-color);
  border: 1px solid var(--secoundary-brand-color);
  border-radius: 8px;
  padding: 8px;
  margin-top: 0.5rem;
  transition: 0.5s;
  &:hover {
    border: 1px solid var(--secoundary-color-hover);
  }
  &:focus {
    outline: none;
    border: 1px solid var(--secoundary-color-hover);
  }
`;
const Button = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  font-weight: 500;
  background-color: var(--secoundary-brand-color);

  cursor: pointer;
  margin-top: 0.5rem;
  transition: 0.5s;

  &:hover {
    background-color: var(--secoundary-color-hover);
  }
`;
const FormAction = styled.form`
  display: flex;
  justify-content: flex-end;
`;
