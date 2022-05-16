import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
// Images
import image from "../../img/discussing.png";
//Contexts
import { useAuth } from "../../contexts/authentication";
import { useUserData } from "../../contexts/usersData";
import { useVadilation } from "../../contexts/vadilation";
// Components
import MainRegisterForm from "../../components/UnAut-Register/MainRegisterForm";
import SelectRole from "../../components/UnAut-Register/SelectRole";
/* import AlertNotification from "../../components/Utilities/AlertNotification";
 */ import RoleStepsBox from "../../components/UnAut-Register/RoleStepsBox";
import RegFormButton from "../../components/UnAut-Register/RegFormButton";
function RegisterPage() {
  const {
    // Shared state between Professional & Recruiter -----------------------------------------
    email,
    password,
    passwordConfirmed,
    role,
    setRole,
    // State Only for Professional -----------------------------------------
    name,
    phone,
    birthDate,
    linkedin,
    title,
    experience,
    education,
    uploadFiles,
    userAppiedJobs,
    userFollowJobs,
    // State Only for Recruiter -----------------------------------------
    companyName,
    companyWebsite,
    about,
    companyLogo,
    resetUserData,
  } = useUserData();
  const {
    // This Zone is for Register form vadilate only -------------------------------------
    step,
    setStep,
    isErrorEmail,
    isErrorPassword,
  } = useVadilation();
  const { register, login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "professional") {
      setRole("professional");
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwaordConfirmed", passwordConfirmed);
      formData.append("role", role);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("birthDate", birthDate);
      formData.append("linkedin", linkedin);
      formData.append("title", title);
      formData.append("experience", experience);
      formData.append("education", education);
      formData.append("userAppiedJobs", userAppiedJobs);
      formData.append("userFollowJobs", userFollowJobs);

      for (let uploadFileKey in uploadFiles) {
        formData.append("cvFile", uploadFiles[uploadFileKey]);
      }
      register(formData);
    } else if (role === "recruiter") {
      setRole("recruiter");
      const formData = new FormData();

      formData.append("companyName", companyName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("companyWebsite", companyWebsite);
      formData.append("about", about);

      for (let uploadFileKey in companyLogo) {
        formData.append("logoFile", companyLogo[uploadFileKey]);
      }

      register(formData);
    }
    login({
      email,
      password,
    });
    resetUserData();
    setStep(0);
    setRole("professional");
  };

  return (
    <Wrapper>
      <LeftBox>
        <form
          className="professional-register-form"
          id="register-form"
          onSubmit={handleSubmit}
        >
          <Detail>
            <Progressbar>
              <Title>Good choice!</Title>
              <Caption className="mb-4">Create a new account as...</Caption>
              <h1>{`Current Role is: ${role}`}</h1>
              <h1>{`Current Step is: ${step}`}</h1>
              <SelectRole />
              {/* เช็ค role: แล้วให้ใช้  step box ของ role นั้นๆ ------------------------ */}
              {role === "professional" ? (
                <RoleStepsBox userRole={"Personal"} />
              ) : (
                <RoleStepsBox userRole={"Company"} />
              )}

              {/*แจ้งเตือนเมื่อ user ไม่ใส่ email ------------------------ */}
              {isErrorEmail ? (
                <Alert className="mt-2 mb-2 w-8/12" severity="error">
                  Please enter valid email address
                </Alert>
              ) : null}
              {/*แจ้งเตือนเมื่อ user ไม่ใส่ Password ------------------------ */}
              {isErrorPassword ? (
                <Alert className="mt-2 mb-2 w-8/12" severity="error">
                  Please verify and re-enter your password
                </Alert>
              ) : null}
              {/* Step display เก่าของครีม ที่มีการเช็ค role เพิ่มเข้ามา: ไว้ใช้เช็คว่าตอนนี้อยู่หน้าไหน ให้ใช้ form ของหน้านั้นๆ ------------------------ */}
              <MainRegisterForm userRole={role} />
              {/* ปุ่ม next, previous, finish: ที่มีการเช็ค role เข้ามาเพิ่ม ------------------------ */}
              <RegFormButton />
            </Progressbar>
          </Detail>
        </form>
        <FormWrapper></FormWrapper> {/* <--- อันนี้มันมีไว้ทำไมอ่ะ  */}
      </LeftBox>

      <RightBox>
        <BorderImage>
          <GirlImage src={image} alt="Girl"></GirlImage>
        </BorderImage>
      </RightBox>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f6;
  position: relative;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin: 6rem 0 0 0;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 228px;
`;

const Title = styled.h1`
  color: var(--primary-text-color);
  font-family: var(--primary-font);
  font-weight: 400;
  font-size: 48px;
`;

const Progressbar = styled.div`
  width: 70%;
`;

const Caption = styled.h3`
  color: var(--primary-text-color);
  font-family: var(--primary-font);
  font-weight: 500;
  font-size: 20px;
  margin-top: 20px;
`;

const LeftBox = styled.div`
  width: 60%;
`;

const RightBox = styled.div`
  width: 40%;
  display: flex;
  align-items: end;
`;

const GirlImage = styled.img`
  width: 120%;
`;

const BorderImage = styled.div`
  width: 435px;
`;

/* 
const NextPageButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

const SkipButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid var(--secoundary-brand-color);
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  cursor: pointer;
  margin: 0 16px;
  color: #616161;
  background-color: #f5f5f6;
`;

const FinishButton = styled.button`
  width: 106px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;

const PreviousButton = styled.button`
  width: 131px;
  height: 40px;
  border-radius: 16px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`; */

export default RegisterPage;
