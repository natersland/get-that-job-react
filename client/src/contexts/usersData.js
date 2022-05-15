import React, { useState } from "react";

const UsersDataContext = React.createContext();

function UserDataProvider(props) {
  // Shared state between Professional & Recruiter -----------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [role, setRole] = useState("professional");
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
  // Fx for reset data in state ---------------------------------------
  const resetUserData = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirmed("");
    setRole("");
    // ---------------
    setName("");
    setPhone("");
    setBirthDate("");
    setLinkedin("");
    setTitle("");
    setExperience("");
    setEducation("");
    setUploadFiles("");
    // ---------------
    setCompanyName("");
    setCompanyWebsite("");
    setAbout("");
    setCompanyLogo("");
    // ---------------
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
        // Fx for reset data in state ---------------------------------------
        resetUserData,
      }}
    >
      {props.children}
    </UsersDataContext.Provider>
  );
}

const useUserData = () => React.useContext(UsersDataContext);

export { UserDataProvider, useUserData };
