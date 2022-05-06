import React, { useState } from "react";
import App from "../App";

const userDataContext = React.createContext();

function UserData() {
  /*   Step 1 */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  /*   Step 2 */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkin, setLinkin] = useState("");
  /*   Step 3 */
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [uploadFiles, setUploadFiles] = useState({});

  return (
    <userDataContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmed,
        setPasswordConfirmed,
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
      }}
    ></userDataContext.Provider>
  );
}

export { userDataContext, UserData };
