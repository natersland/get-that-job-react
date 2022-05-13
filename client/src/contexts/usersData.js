import React, { useState } from "react";

const UsersDataContext = React.createContext();

function UserDataProvider(props) {
  // Shared state between Professional & Recruiter -----------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [role, setRole] = useState("");
  // State Only for Professional -----------------------------------------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [uploadFiles, setUploadFiles] = useState({});
  // State Only for Recruiter -----------------------------------------
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [about, setAbout] = useState("");
  // User & Company Profile -----------------------------------------
  const [companyLogo, setCompanyLogo] = useState({});
  // State for Connecting to Users Database -----------------------------------------
  const [users, setUsers] = useState([]);
  const [userAppiedJobs, setUserAppiedJobs] = useState([]);
  const [userFollowJobs, setUserFollowJobs] = useState([]);
  // Others -----------------------------------------
  const [roleBtn, setRoleBtn] = useState("");
  // This Zone is for Register form vadilate only -------------------------------------
  const [step, setStep] = useState(0);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const nextFormPasswordChecker = (userRole) => {
    // if input is blank
    if (password === "" || email === "") {
      if (password === "") {
        setIsErrorPassword(true);
      } else if (email === "") {
        setIsErrorEmail(true);
      }
    } else {
      if (!password === "") {
        setIsErrorPassword(false);
      } else if (!email === "") {
        setIsErrorEmail(true);
      }
    }
    //  if email is not validattion
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
    // if password is not correct
    if (password !== passwordConfirmed) {
      setIsErrorPassword(true);
    } else if (password === passwordConfirmed) {
      setIsErrorPassword(false);
    }
    // if all correct
    if (
      password === passwordConfirmed &&
      password !== "" &&
      email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ) {
      setIsErrorEmail(false);
      setIsErrorPassword(false);
      setRole(userRole);
      setStep(step + 1);
    }
  };

  return (
    <UsersDataContext.Provider
      value={{
        // Shared state between Professional & Recruiter -----------------------------------------
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmed,
        setPasswordConfirmed,
        role,
        setRole,
        // State Only for Professional -----------------------------------------
        name,
        setName,
        phone,
        setPhone,
        birthDate,
        setBirthDate,
        linkedin,
        setLinkedin,
        title,
        setTitle,
        experience,
        setExperience,
        education,
        setEducation,
        uploadFiles,
        setUploadFiles,
        // State Only for Recruiter -----------------------------------------
        companyName,
        setCompanyName,
        companyWebsite,
        setCompanyWebsite,
        about,
        setAbout,
        // User & Company Profile -----------------------------------------
        companyLogo,
        setCompanyLogo,
        // State for Connecting to Users Database -----------------------------
        users,
        setUsers,
        userAppiedJobs,
        setUserAppiedJobs,
        userFollowJobs,
        setUserFollowJobs,
        // Others -----------------------------------------
        roleBtn,
        setRoleBtn,
        // This Zone is for Register form vadilate only -------------------------------------
        step,
        setStep,
        isErrorEmail,
        setIsErrorEmail,
        isErrorPassword,
        setIsErrorPassword,
        nextFormPasswordChecker,
      }}
    >
      {props.children}
    </UsersDataContext.Provider>
  );
}

const useUserData = () => React.useContext(UsersDataContext);

export { UserDataProvider, useUserData };
