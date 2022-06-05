import styled from "@emotion/styled";
// Contexts -----------------------------------------
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

  return (
    <Wrapper>
      <div className="mb-5">
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
        {!companyName ? (
          <span className="error-message">Company name is required.</span>
        ) : null}
        <br />
        <Label> EMAIL </Label>
        <br />
        <Input
          type="text"
          name="email"
          className="gtj-input pink-border"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="some company@mail.com"
          id="email"
          rows={4}
          cols={30}
        />{" "}
        <br />
        {!email.includes("@") ? (
          <span className="error-message">
            {" "}
            It should be a valid email address!
          </span>
        ) : null}
        <br />
        <Label> PASSWORD </Label>
        <br />
        <Input
          type="password"
          name="password"
          className="gtj-input pink-border"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="******"
          id="password"
          rows={4}
          cols={30}
        />{" "}
        <br />
        {password.length < 6 || password.length > 18 ? (
          <span className="error-message">
            Password should be 6-18 characters.
          </span>
        ) : null}
        <br />
        <Label> PASSWORD CONFIRMATION </Label>
        <br />
        <Input
          id="password-confirmed"
          name="password-confirmed"
          className="gtj-input pink-border"
          value={passwordConfirmed}
          onChange={(event) => setPasswordConfirmed(event.target.value)}
          placeholder="******"
          type="password"
          rows={4}
          cols={30}
        />
        <br />
        {password !== passwordConfirmed ? (
          <span className="error-message">
            Password comfirmation must be the same as password.
          </span>
        ) : null}
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
  font-size: 400;
  font-size: 10px;
  line-height: 12.1px;
  letter-spacing: 1.5px;
  margin-top: 4px;
  color: var(--primary-text-color);
  font-family: var(--secondary-text-colo);
  text-transform: uppercase;
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
