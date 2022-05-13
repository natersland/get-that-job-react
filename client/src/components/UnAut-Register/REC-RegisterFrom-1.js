import styled from "@emotion/styled";

// Contexts
import { useUserData } from "../../contexts/usersData";

function RecRegisterForm1() {
  const {
    companyName,
    setCompanyName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmed,
    setPasswordConfirmed,
  } = useUserData();

  console.log(companyName, email, password, passwordConfirmed);

  return (
    <Wrapper>
      <div>
        <Label> COMPANY NAME </Label>
        <br />
        <Input
          className="gtj-input pink-border"
          type="text"
          name="companyName"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="My Company S.A"
          id="companyName"
        />{" "}
        <br />
        <Label> EMAIL </Label>
        <br />
        <Input
          type="text"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="some company@mail.com"
          id="email"
          rows={4}
          cols={30}
        />{" "}
        <br />
        <Label> PASSWORD </Label>
        <br />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="******"
          id="password"
          rows={4}
          cols={30}
        />{" "}
        <br />
        <Label> PASSWORD CONFIRMATION </Label>
        <br />
        <Input
          id="password-confirmed"
          name="password-confirmed"
          value={passwordConfirmed}
          onChange={(event) => setPasswordConfirmed(event.target.value)}
          placeholder="******"
          type="password"
          rows={4}
          cols={30}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f6;
  position: relative;
`;

const Label = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
`;

const Input = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--secoundary-brand-color);
  padding-left: 10px;
  padding-right: 10px;
  color: #8e8e8e;
`;

export default RecRegisterForm1;
