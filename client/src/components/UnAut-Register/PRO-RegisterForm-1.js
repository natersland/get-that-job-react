import styled from "@emotion/styled";

// Contexts
import { useUserData } from "../../contexts/usersData";

function ProRegisterForm1() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmed,
    setPasswordConfirmed,
  } = useUserData();

  console.log(`Hello ${password}`);

  return (
    <div>
      <Container>
        <Label htmlFor="email">EMAIL</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="some.user@mail.com"
          onChange={(event) => setEmail(event.target.value)}
          required
          value={email}
        />
      </Container>
      <Container>
        <Label htmlFor="password">PASSWORD</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="**********"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
          value={password}
        />
      </Container>
      <Container>
        <Label htmlFor="password-confiremed">PASSWORD CONFORMATION</Label>
        <Input
          id="password-confiremed"
          name="password-confiremed"
          type="password"
          placeholder="**********"
          onChange={(event) => {
            setPasswordConfirmed(event.target.value);
          }}
          required
          value={passwordConfirmed}
        />
      </Container>
    </div>
  );
}

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
  margin-top: 4px;
`;
export default ProRegisterForm1;
