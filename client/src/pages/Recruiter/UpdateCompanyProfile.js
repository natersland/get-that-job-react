import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import AlertDialog from "../../components/Utilities/AlertDialog";
import { useUtils } from "../../contexts/utilsContext";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";

function UpdateCompanyProfile() {
  const [companyLogo, setCompanyLogo] = useState({});
  const [showCompanyLogo, setShowCompanyLogo] = useState({});
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [about, setAbout] = useState("");

  const { setAlertMessage, setIsAlert, setLoading, loading } = useUtils();
  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setCompanyLogo({
      [uniqueId]: event.target.files[0],
    });
    setShowCompanyLogo(null);
  };

  const comProfileData = localStorage.getItem("id");
  const getComUsers = async () => {
    setLoading(true);

    const results = await axios.get(
      `http://localhost:4000/users/${comProfileData}`
    );
    setShowCompanyLogo(results?.data?.companyLogo[0]?.url);
    setEmail(results.data.email);
    setCompanyName(results.data.companyName);
    setCompanyWebsite(results.data.companyWebsite);
    setAbout(results.data.about);
    setTimeout(function () {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getComUsers();
  }, []);

  const updateComProfile = async (formData) => {
    setLoading(true);
    await axios.put(`http://localhost:4000/users/${comProfileData}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoading(false);
  };

  const handleSubmit = (event) => {
    console.log(companyName);
    event.preventDefault();
    const formData = new FormData();
    if (companyName) {
      formData.append("email", email);
      formData.append("companyName", companyName);
      formData.append("companyWebsite", companyWebsite);
      formData.append("about", about);

      for (let updateKey in companyLogo) {
        formData.append("companyLogo", companyLogo[updateKey]);
      }
      updateComProfile(formData);
      setAlertMessage(`Your company profile has been updated!`);
      setIsAlert(true);
    } else if (companyName === "") {
      setAlertMessage(`Company name is required.`);
      setIsAlert(true);
    }
  };

  return loading ? (
    <CircularIndeterminate />
  ) : (
    <MarginWrap className="wrapper">
      <BackDropLoading />
      <AlertDialog />
      <div>
        <H1>Profile</H1>
      </div>

      <Form
        id="updateCompany-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <CompanyLogoWrap>
          <div>
            {showCompanyLogo ? (
              <LogoWrapper>
                <LogoImg src={showCompanyLogo} />
              </LogoWrapper>
            ) : (
              Object.keys(companyLogo).map((companyLogoKey) => {
                const file = companyLogo[companyLogoKey];

                return (
                  <Logo key={companyLogo}>
                    <img
                      width="74.67px"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                  </Logo>
                );
              })
            )}
          </div>

          <InputFileWrap>
            <Label2>COMPANY LOGO</Label2>
            <UploadFileSection>
              <Input1
                id="uploadFile"
                name="logoFile"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </UploadFileSection>
            <Limitation>PNG, JPEG,IMG</Limitation>
          </InputFileWrap>
        </CompanyLogoWrap>

        <LabelText htmlFor="email">COMPANY EMAIL</LabelText>
        <Input
          type="email"
          className="gtj-input pink-border  bg-gray text-supergray"
          disabled
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
        {!companyName ? (
          <span className="error-message mt-1 mb-1">
            Company name is required.
          </span>
        ) : null}

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
          className="btn btn-md btn-pink"
        >
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
  width: 65%;
  margin: auto;
  margin-bottom: 100px;
  padding: 2rem 0;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 80%;
    margin-left: 45px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    margin-left: 50px;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    margin-left: 320px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    margin-left: 320px;
  }
`;
const Logo = styled.div`
  margin-right: 10px;
`;
const LogoWrapper = styled.div`
  width: 74.67px;
  height: 74.67px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  overflow: hidden;
`;
const LogoImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const Button = styled.button`
  display: inline-block;
  width: 200px;
  margin-top: 24px;
  text-align: center;
  letter-spacing: 1.35px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 380px;
  }
`;
const Textarea = styled.textarea`
  height: 200px;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 300px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 550px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 744px;
  }

  /* Extra (desktops, 1400  and up) */
  @media only screen and (min-width: 1400px) {
    width: 744px;
  }
`;

const Label2 = styled.label`
  font-family: var(--seconary-font);
  font-weight: 400;
  font-size: 10px;
  color: #616161;
  margin: 0px;
`;
const UploadFileSection = styled.div`
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
`;
const CompanyLogoWrap = styled.div`
  display: flex;
`;
const InputFileWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LabelText = styled.label`
  font-size: 10px;
  color: var(--primary-text-color);
  font-family: var(--seconary-font);
  letter-spacing: 1.5px;
  padding-top: 15px;
  padding-bottom: 5px;
`;

export default UpdateCompanyProfile;
