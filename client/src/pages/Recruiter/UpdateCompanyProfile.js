import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import "../../App.css";
import { useUserData } from "../../contexts/usersData";
import {useVadilation} from "../../contexts/vadilation";

function UpdateCompanyProfile() {
  const {
    companyLogo,
    setCompanyLogo,
    email,
    setEmail,
    companyName,
    setCompanyName,
    companyWebsite,
    setCompanyWebsite,
    about,
    setAbout,
  } = useUserData();

  const {isErrorEmail,
    setIsErrorEmail,} = useVadilation();

  const comProfileData = localStorage.getItem("id");
  console.log(comProfileData);

  const getComUsers = async () => {
    const results = await axios.get(
      `http://localhost:4000/users/${comProfileData}`
    );
    //console.log(results.data.email);
    //setCompanyLogo(results.data.companyLogo);
    setEmail(results.data.email);
    setCompanyName(results.data.companyName);
    setCompanyWebsite(results.data.companyWebsite);
    setAbout(results.data.about);
  };

  useEffect(() => {
    getComUsers();
  }, []);
  
  const updateComProfile = async () => {
    await axios.put(`http://localhost:4000/users/${comProfileData}`, {
      companyLogo,
      email,
      companyName,
      companyWebsite,
      about,
    });
  };

  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      setIsErrorEmail(true);
      alert("email can not be blank");
    }
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      //  if email is not validattion
      setIsErrorEmail(true);
    } else {
      updateComProfile();
    alert(`Your company profile has been updated`);
      //setIsErrorEmail(false);
    }
  
    
  };

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setCompanyLogo({
      ...companyLogo,
      [uniqueId]: event.target.files[0],
    });
    console.log(companyLogo);
  };

  return (
    <MarginWrap className="wrapper">
      <div>
        <H1>Profile</H1>
      </div>

      <Form
        id="updateCompany-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <CompanyLogoWrap>
          <div>
            {Object.keys(companyLogo).map((companyLogoKey) => {
              const file = companyLogo[companyLogoKey];
              return (
                <div key={companyLogo}>
                  <img
                    width="100px"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                </div>
              );
            })}
          </div>

          <InputFileWrap>
            <Label2>COMPANY LOGO</Label2>
            <UploadFileSection>
              <Input1
                id="uploadFile"
                name="logo"
                type="file"
                onChange={handleFileChange} 
                accept=".jpg,.jpeg,.png"
              />
            </UploadFileSection>
            <Limitation>PNG, JPEG,IMG</Limitation>
          </InputFileWrap>
        </CompanyLogoWrap>

        <LabelText htmlFor="email">COMPANY EMAIL</LabelText>
        <Input
          type="email"
          className="gtj-input pink-border"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <LabelText>COMPANY NAME</LabelText>
        <Input
          type="text"
          className="gtj-input pink-border"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />

        <LabelText>COMPANY WEBSITE</LabelText>
        <Input
          type="url"
          className="gtj-input pink-border"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
        />

        <LabelText>ABOUT THE COMPANY</LabelText>
        <Textarea
          className="gtj-input pink-border"
          cols="40"
          value={about}
          onChange={(event) => setAbout(event.target.value)}
        />

        <Button
          form="updateCompany-form"
          type="submit"
          className="btn btn-lg btn-pink">
          UPDATE PROFILE
        </Button>
      </Form>
    </MarginWrap>
  );
}

const H1 = styled.h1`
  font-size: 37px;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-family: var(--primary-font);
`;
const MarginWrap = styled.div`
  margin-left: 300px;
  padding-top: 30px;
`;

const Button = styled.button`
  margin-top: 24px;
  width: 195px;
  text-align: center;
  letter-spacing: 1.35px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 400px;
`;
const Textarea = styled.textarea`
  width: 950px;
  height: 200px;
`;

const Label2 = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #616161;
  margin-left: 12px;
`;
const UploadFileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--primary-text-color);
  letter-spacing: 1.25px;
`;
const UploadButton = styled.label`
  margin-right: 15px;
  width: 134px;
  height: 35px;
  border-radius: 8px;
  border-style: hidden;
  color: white;
  font-size: 14px;
  font-weight: 400;
  font-family: var(--secondary-font);
  background-color: var(--secoundary-brand-color);
  cursor: pointer;
`;
const ChooseFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Input1 = styled.input`
  width: 360px;
  height: 36px;
  border-radius: 8px;

  padding-left: 10px;
  padding-right: 10px;
  color: #8e8e8e;
`;

const FileName = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  color: #616161;
  font-size: 14px;
`;

const InputLimit = styled.textarea`
  width: 600px;
  height: 65px;
  border-radius: 8px;
  font-family: var(--secondary-font);
  border: 1px solid var(--secoundary-brand-color);
  padding-left: 10px;
  padding-right: 10px;
  color: var(--tertiary-text-color);
`;

const Limitation = styled.p`
  font-family: var(--secondary-font);
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 1.5px;
  width: 380px;
  margin-top: 0px;
  color: #8e8e8e;
  margin-left: 12px;
`;
const CompanyLogoWrap = styled.div`
  display: flex;
`;
const InputFileWrap = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;

  justify-content: flex-end;
`;

const LabelText = styled.label`
  font-size: 10px;
  color: var(--primary-text-color);
  font-family: var(--seconary-font);
  letter-spacing: 1.5px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export default UpdateCompanyProfile;
