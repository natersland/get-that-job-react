import React, { useState } from "react";

const UsersDataContext = React.createContext();

function UserDataProvider(props) {
  // Shared state between Professional & Recruiter -----------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [role, setRole] = useState({});
  // State Only for Professional -----------------------------------------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkin, setLinkin] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [uploadFiles, setUploadFiles] = useState({});
  // State Only for Recruiter -----------------------------------------
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [about, setAbout] = useState("");
  // User & Company Profile -----------------------------------------
  const [userAvartar, setUserAvartar] = useState({});
  const [companyLogo, setCompanyLogo] = useState({});
  // State for Connecting to Users Database -----------------------------------------
  const [users, setUsers] = useState([]);
  // State to update profile -----------------------------------
  // Others -----------------------------------------
  const [roleBtn, setRoleBtn] = useState("professional".toLocaleLowerCase());

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
        linkin,
        setLinkin,
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
        userAvartar,
        setUserAvartar,
        companyLogo,
        setCompanyLogo,
        // State for Connecting to Users Database -----------------------------
        users,
        setUsers,
        // Others -----------------------------------------
        roleBtn,
        setRoleBtn,
      }}
    >
      {props.children}
    </UsersDataContext.Provider>
  );
}

const useUserData = () => React.useContext(UsersDataContext);

export { UserDataProvider, useUserData };
