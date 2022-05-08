import { useState } from "react";

export default function GTJhooksfantasy() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [role, setRole] = useState("");

  return {
    companyName,
    setCompanyName,
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
    role,
    setRole,
  };
}
