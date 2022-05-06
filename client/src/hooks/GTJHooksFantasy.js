import { useState } from "react";

export default function GTJhooksfantasy() {
  // Step 1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");

  // Step 2
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkin, setLinkin] = useState("");

  // Step 3
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [uploadFiles, setUploadFiles] = useState({});

  // Others
  const [role, setRole] = useState({});
  const [roleBtn, setRoleBtn] = useState("professional".toLocaleLowerCase());

  return {
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
    role,
    setRole,
    roleBtn,
    setRoleBtn,
  };
}
