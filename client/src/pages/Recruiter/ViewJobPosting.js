import React, { useState } from "react";
import _ from "lodash";
import styled from "@emotion/styled";
import "../../App.css";
import leftSign from "../../img/arrow-left-s-line.png";
import ShowJob2 from "../../components/Rec-Viewjob/Jobcard";
import CandidateCard1 from "../../components/Rec-Viewjob/CandidateCard";
import { useNavigate } from "react-router-dom";
import RadioFilter from "../../components/SharedComponents/RadioFilter";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";


function ViewJobPosting () {
  const [jobDetails, setJobDetails] = useState([]);
  const [filterApllication, setFilterApplication] = useState("all");
  const [userCandidate, setUserCandidates] = useState({});
  const navigate = useNavigate();

  const recruiterId = localStorage.getItem("jobId");  
  const url = `http://localhost:4000/jobs/${recruiterId}`;
  const getApplications = async () => {
    try {
      const results = await axios.get(url);
      // reverse data เพื่อให้แสดงใบสมัครล่าสุดจากใหม่ -> เก่า
      setJobDetails(_.reverse(results?.data.data.applications));
      setUserCandidates(results?.data.data.candidate);
    } catch (error) {
      console.log(error);
    }
    return {
      jobDetails,
    };
  };

  console.log(jobDetails);
  console.log(userCandidate);
  //console.log(jobs);
 
  const radioFilterData = [
    { value: "all", label: "All" },
    { value: "waiting", label: "Waiting" },
    { value: "In progress", label: "In progress" },
    { value: "finished", label: "Finished" },
  ];

  const candidateData = jobDetails?.map((jobDetailData, index) => {

        let candidateDetail = _.find(userCandidate, { _id: jobDetailData?.professionalId });
        

    console.log(candidateDetail);
    const data = () => {
      return (
        <CandidateCard1
          key={index}
          name={candidateDetail?.name}
          email={candidateDetail?.email}
          phone={candidateDetail?.phone}
          linkedin={candidateDetail?.linkedin}
          experience={candidateDetail?.experience}
          createdJobDate={moment(jobDetailData?.appliedDate).startOf().fromNow()}
          CV = {candidateDetail?.cvFiles[0]?.url}
        />
      );
    };

   if (filterApllication === "all") {
      return data();
   } else if (filterApllication === jobDetailData?.applicationStatus) {
     return data();
    }
  });
  
  console.log(candidateData);
  const countData = candidateData.filter((items) => {
    return items !== undefined;
  });
  useEffect(() => {
    getApplications();
  }, []);


    return (
    <Main>
        {/*-------------------------------------------------------*Header*------------------------------------------*/}
            <Back
            onClick={() => {
              navigate("/viewjobs");
              localStorage.removeItem("userId");
            }}
            >
                <IconBack><img src={leftSign} /></IconBack> 
                <BackText> Back </BackText>
            </Back>
            <HeadingText>Show Job Posting</HeadingText>

        {/*-------------------------------------------------------*Job Card*------------------------------------------*/}
          
       {<ShowJob2/>}
        

        {/*-------------------------------------------------------*Filter part*------------------------------------------*/}
            
          <RadioFilter
          formlabel="Filter your applications"
          radioData={radioFilterData}
          stateVariable={filterApllication}
          setStateVariable={setFilterApplication}
          />

        {/*-------------------------------------------------------*Found Posting*------------------------------------------*/}
        
        <Found>
        <FoundText> {jobDetails?.length === 0 ? "0" : `${countData.length} `}{" "}Candidates found</FoundText>
        </Found>
        
        {/*-------------------------------------------------------*Candidate Card*------------------------------------------*/}
        
        {candidateData}
    </Main>
    )
};

export default ViewJobPosting

const HeadingText = styled.p`
  font-size: 34px;
  line-height: 20px;
  font-weight: 400;
  margin-top: 20px;
  font-font-family: var(--primary-font);
`;

//---------------------------------------------shared style -----------------------------------------------------//
const Main = styled.div`
  margin-left: 380px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 944px;
`;

//---------------------------------------------Nav Part -----------------------------------------------------//
const Back = styled.button`
  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
`;

const BackText = styled.p`
  width: 45px;
  font-size: 14px;
  color: #616161;
  font-font-family: var(--secondary-font);
`;

const IconBack = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: flex-start;
  font-size: 8px;
`;

//---------------------------------------------Filter Part-----------------------------------------------------//


const RadioForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 30px;
`;

//---------------------------------------------Found Part -----------------------------------------------------//
const Found = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 944px;
  margin-top: 10px;
`;

const FoundText = styled.p`
  font-size: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
`;