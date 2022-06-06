import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { useVadilation } from "../../contexts/vadilation";
import AlertDialog from "../Utilities/AlertDialog";
import styled from "@emotion/styled";
import "../../App.css";
import closedMail from "../../img/closedMail.png";
import waiting from "../../img/waiting.png";
import Phone1 from "../../img/phone.png";
import IN from "../../img/linkedin-box-line.png";
import IconWithText from "../SharedComponents/IconWithText";
import ToggleCard from "../SharedComponents/ToggleCard";
import load from "../../img/download-line.png";
import RecruiterReviewStatusBtn from "../SharedComponents/jobsStatusCheckerBtn";
import { useUtils } from "../../contexts/utilsContext";
import useFetch from "../../hooks/useFetch";

function CandidateCard1({
  name,
  email,
  phone,
  linkedin,
  experience,
  createdJobDate,
  CV,
}) {
  const CandidateCardHeader = () => {
    const userRole = localStorage.getItem("role");
    const { fistLogIn } = useVadilation();
    const professionalId = localStorage.getItem("id");
    const jobId = localStorage.getItem("jobId");
    const { setLoading, setIsAlert, setAlertMessage } = useUtils();

    // update status start viewing candidate
    const updateApplication = async (appId) => {
      console.log(appId, "appId");
      await axios.patch(
        `http://localhost:4000/applications/${professionalId}`,
        {}
      );
    };
    const { loading, data, reFetch } = useFetch(
      `http://localhost:4000/users/${professionalId}`
    );
    const checkUserProfile = async (event) => {
      const handleSubmit = () => {
        const applicationStatus = ["applied", "reviewing", "finished"];

        event.preventDefault();
        const data = {
          professionalId,
          jobId,
          appliedDate: Date.now(),
        };
        updateApplication(); // has to be update data
      };

      handleSubmit(data);
      //setAlertMessage(`Congratulation! You already applied ${job?.jobTitle}!`);
    };

    return (
      <BeforeToggleCard>
        {fistLogIn ? (
          <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
        ) : null}
        <CandidateLeftCard>
          <CandidateDiv>
            <CandidateName>{name}</CandidateName>
          </CandidateDiv>

          <MainInformation>
            <MainInformation1>
              <INImg>
                <img src={IN} />
              </INImg>
              <TextInfo>{linkedin}</TextInfo>
            </MainInformation1>
          </MainInformation>
        </CandidateLeftCard>

        <CandidateCenterCard>
          <CandidateCenterCard1>
            <Email>
              <Icon>
                <img src={closedMail} />
              </Icon>
              <EmailText>{email}</EmailText>
            </Email>
            <Phone>
              <Icon>
                <img src={Phone1} />
              </Icon>
              <PhoneText>{phone}</PhoneText>
            </Phone>
          </CandidateCenterCard1>

          <CandidateCenterCard2>
            <IconWithText icon={closedMail} text={createdJobDate} />
          </CandidateCenterCard2>

          <CandidateCenterCard3>
            <IconWithText icon={waiting} text={"Waiting for review"} />
          </CandidateCenterCard3>
        </CandidateCenterCard>

        <CandidateRightCard>
          <RecruiterReviewStatusBtn
            mode="markAsStart"
            fx={checkUserProfile}
            jobId={jobId}>
            <MarkText>MARK AS STARTED</MarkText>
          </RecruiterReviewStatusBtn>
        </CandidateRightCard>
      </BeforeToggleCard>
    );
  };

  const CandidateContent = () => {
    return (
      <div>
        <CandidateDetails>
          <CandidateDetails1>
            <Title>Professional experience</Title>
            <CandidateDetails2>
              <Detail>{experience}</Detail>
            </CandidateDetails2>
          </CandidateDetails1>
        </CandidateDetails>

        <Dowload>
          <MarkTextButton>
            <Icon>
              <img src={load} />
            </Icon>
            <MarkText>DOWLOAD CV {CV}</MarkText>
          </MarkTextButton>
        </Dowload>
      </div>
    );
  };

  return (
    <Wrapper2>
      <ToggleCard header={CandidateCardHeader()} content={CandidateContent()} />
    </Wrapper2>
  );
}

export default CandidateCard1;

const Wrapper2 = styled.div`
  width: 100%;
  border-radius: 8px;
`;
//----------------------------------------Before toggle---------------------------------------------------------//
const BeforeToggleCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15px;
`;

const MainInformation = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainInformation1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 105px;
`;
const Icon = styled.div`
  width: 13px;
  height: 13px;
  margin-bottom: 3px;
  display: flex;
  justify-content: center;
`;
const IconLabel = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--gray);
  font-weight: 400;
  margin-left: 5px;
  line-height: 16px;
  text-align: center;
`;

const TextInfo = styled.p`
  font-size: 12px;
  font-family: var(--primary-font);
  color: var(--light-gray);
  font-weight: 400;
`;

const ToggleButton = styled.button`
  margin-right: 10px;
  margin-top: 40px;
`;

const CandidateDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 285px;
  margin-top: 3px;
`;

const CandidateName = styled.p`
  font-size: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
`;

const CandidateLeftCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 280px;
  margin-bottom: 5px;
`;

const INImg = styled.div`
  width: 15.5px;
  height: 15.5px;
  margin-right: 5px;
`;

const CandidateCenterCard = styled.div`
  width: 415px;
  display: flex;
  flex-direction: row;
`;

const CandidateCenterCard1 = styled.div`
  width: 180px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
`;

const CandidateCenterCard2 = styled.div`
  width: 85px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const CandidateCenterCard3 = styled.div`
  width: 85px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const CandidateRightCard = styled.div`
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Email = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Phone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const EmailText = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
`;

const PhoneText = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
`;

const MarkText = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 5px;
`;
const MarkTextButton = styled.button`
  width: 150px;
  height: 35px;
  font-weight: 500px;
  color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border: 1px solid pink;
`;

//----------------------------------------After toggle---------------------------------------------------------//

const CandidateDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 25px;
`;

const CandidateDetails1 = styled.div`
  margin-bottom: 5px;
`;

const CandidateDetails2 = styled.div`
  margin-top: 5px;
`;

const Title = styled.p`
  font-size: 16px;
  font-family: var(--primary-font);
  color: var(--primary-brand-color);
  font-weight: 400;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  width: 760px;
`;

const Dowload = styled.div`
  width: 944px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
`;

const FilterDiv = styled.div``;

const FilterText = styled.p`
  font-size: 10px;
  font-weight: 400;
  font-font-family: var(--seconary-font);
  color: var(--primary-text- color);
`;

const RadioFormMain = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 300px;
`;

const RadioForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 30px;
`;

const RadioBtn = styled.input`
  accent-color: var(--secoundary-brand-color);
`;

const Radiotext = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-font-family: var(--seconary-font);
  color: var(--gray);
  margin-left: 5px;
`;
