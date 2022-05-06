import { useState } from "react";

export default function GTJhooksfantasy() {
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

 
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [about, setAbout] = useState("");
    const [uploadFile, setUploadFile] = useState({});

   const [role, setRole] = useState("");

  return {
    companyName, 
    setCompanyName,
    email, 
    setEmail,
    password, 
    setPassword,
    confirmPassword, 
    setConfirmPassword,
    companyWebsite,
    setCompanyWebsite,
    about, 
    setAbout,
    uploadFile, 
    setUploadFile,
    role,
    setRole,
  };
}
