import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
// Picture ------------------------------------
import maleStandingWithSmile from "../../assets/people/man-login.svg";
// components ------------------------------------
import SelectRole from "../../components/Page-Register/SelectRole";
import AlertDialog from "../../components/Utilities/AlertDialog";
//Contexts ------------------------------------
import { useUserData } from "../../contexts/usersData";
import { useAuth } from "../../contexts/authentication";
import { useVadilation } from "../../contexts/vadilation";
import { useNav } from "../../contexts/navigate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
export default function LoginPage() {
  const {
    role,
    setRole,
    password,
    setPassword,
    email,
    setEmail,
    resetUserData,
  } = useUserData();
  const { isErrorPassword, isErrorEmail, isValidAccount, setLoading } =
    useVadilation();
  const { login } = useAuth();
  const { setMenuIndex } = useNav();
  // Controller Fx ------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(function () {
      setMenuIndex(1);
      login({
        email,
        password,
        role,
      });
      resetUserData();
      setRole("professional");
      setLoading(false);
    }, 100);
  };
  return (
    <WrapperLogin>
      <AlertDialog textDialog="Text" />
      <BackDropLoading />
      <WrapperLoginLeft>
        <LoginZoneWrapper>
          <LoginIntroduction>
            <LoginHeaderText>Welcome back</LoginHeaderText>
            <LoginIntroText>Login to you account as...</LoginIntroText>
            {/*             <h1>{`Current Role is ${role}`}</h1>
             */}{" "}
          </LoginIntroduction>
          <SelectRole />

          {/*แจ้งเตือนเมื่อ user ไม่ใส่ Password ------------------------ */}
          {isValidAccount ? (
            <Alert className="mt-2 mb-2 w-12/12" severity="error">
              Wrong account or password. Please try again.
            </Alert>
          ) : null}
          {/*แจ้งเตือนเมื่อ user ไม่ใส่ email ------------------------ */}
          {isErrorEmail ? (
            <Alert className="mt-2 mb-2 w-12/12" severity="error">
              Please enter valid email address
            </Alert>
          ) : null}
          {/*แจ้งเตือนเมื่อ user ไม่ใส่ Password ------------------------ */}
          {isErrorPassword ? (
            <Alert className="mt-2 mb-2 w-12/12" severity="error">
              Please verify and re-enter your password
            </Alert>
          ) : null}
          <LoginFormWrapper onSubmit={handleSubmit}>
            <InputWrapper>
              EMAIL
              <input
                id="email-input"
                name="email-input"
                className="pink-border gtj-input "
                type="email"
                placeholder="some.user@mail.com"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
                required
              ></input>
            </InputWrapper>
            <InputWrapper>
              PASSWORD
              <input
                id="password-input"
                name="password-input"
                className="pink-border gtj-input"
                type="password"
                placeholder="******"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
                required
              ></input>
            </InputWrapper>
            <FormAction>
              <button type="submit" className="btn btn-md btn-pink  mr-2">
                Login
              </button>
            </FormAction>
          </LoginFormWrapper>
        </LoginZoneWrapper>
      </WrapperLoginLeft>
      <WrapperLoginRight>
        <img src={maleStandingWithSmile} alt="Male is Standing With Smile" />
      </WrapperLoginRight>
    </WrapperLogin>
  );
}

// ------------------- CSS Style Component Zone -------------------
const WrapperLogin = styled.section`
  width: 90%;
  display: flex;
  padding: 12rem 0;
  margin: auto;
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
const LoginFormWrapper = styled.div`
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

const FormAction = styled.form`
  display: flex;
  justify-content: flex-end;
`;
