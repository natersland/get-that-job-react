import React from "react";
import styled from "@emotion/styled";
import "../../App.css";
import leftSign from "../../img/arrow-left-s-line.png";
import Jobcard1 from "../../components/Rec-Viewjob/Jobcard";
import Candidate1 from "../../components/Rec-Viewjob/CandidateCard";
import { useNavigate } from "react-router-dom";

function ViewJobPosting () {
  const navigate = useNavigate();
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
          
       {<Jobcard1/>}
        

        {/*-------------------------------------------------------*Filter part*------------------------------------------*/}
            <FilterDiv>
                <FilterText>FILTER YOUR CANDIDATES</FilterText>
            </FilterDiv>

        {/*-------------------------------------------------------*Radio Form*------------------------------------------*/}

            <RadioFormMain>
                <RadioForm>
                    <RadioBtn
                    className="checked:bg-white"
                    type="radio"
                    id="all"
                    name="filter"
                    //onChange={(event) => handleSelectChange(event)}
                    />
                    <label htmlFor="all">
                    {" "}
                    <Radiotext>All</Radiotext>
                    </label>
                </RadioForm>

                <RadioForm>
                    <RadioBtn
                    type="radio"
                    id="trackedCandidate"
                    name="filter"
                    //onChange={(event) => handleSelectChange(event)}
                    />
                    <label htmlFor="trackedCandidate">
                    <Radiotext>Waiting</Radiotext>
                    </label>
                </RadioForm>

                <RadioForm>
                    <RadioBtn
                    className=""
                    type="radio"
                    id="closed"
                    name="filter"                 
                    //onChange={(event) => handleSelectChange(event)}
                    />
                    <label htmlFor="closed">
                    <Radiotext>In progress</Radiotext>
                    </label>
                </RadioForm>

                <RadioForm>
                    <RadioBtn
                    className=""
                    type="radio"
                    id="closed"
                    name="filter"                 
                    //onChange={(event) => handleSelectChange(event)}
                    />
                    <label htmlFor="closed">
                    <Radiotext>Finished</Radiotext>
                    </label>
                </RadioForm>
        </RadioFormMain>

        {/*-------------------------------------------------------*Found Posting*------------------------------------------*/}
        
        <Found>
        <FoundText> 5 Candidates found</FoundText>
        </Found>
        
        {/*-------------------------------------------------------*Candidate Card*------------------------------------------*/}
        {<Candidate1/>}
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

const FilterDiv = styled.div`
`;

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







