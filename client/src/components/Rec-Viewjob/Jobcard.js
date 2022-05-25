import React from "react";
import styled from "@emotion/styled";
import "../../App.css";
import building from "../../img/building-3-line.png";
import calendar from "../../img/calendar-2-line.png";
import money from "../../img/money-dollar-circle-line.png";
import search from "../../img/search-line.png";
import close2 from "../../img/close2.png";
import mailOpen from "../../img/mail-open-line.png";
import account from "../../img/account-circle-line.png";
import pinkperson from "../../img/pinkperson.png";


function Jobcard () {
    return (
        <JobCard>
                <BeforeToggleCard>
                    <JobLeftCard>
                        <JobCardDiv>
                        <JobTitle>The Job Title</JobTitle>
                        </JobCardDiv>

                        <MainInformation>
                            <MainInformation1>
                            <ImgInfoLeft>
                                <img src={building} />
                            </ImgInfoLeft>                          
                                <TextInfo>jobCategory</TextInfo>                           
                            </MainInformation1>

                            <JobMainInformation2>
                            <ImgInfoLeft>
                                <img src={calendar} />
                            </ImgInfoLeft>
                            <div>
                                <TextInfo>Job Type</TextInfo>
                            </div>
                            </JobMainInformation2>

                            <JobMainInformation2>
                            <ImgInfoLeft>
                                <img src={money} />
                            </ImgInfoLeft>
                            <div>
                                <TextInfo> minSalary - maxSalary </TextInfo>
                            </div>
                            </JobMainInformation2>
                        </MainInformation>
                    </JobLeftCard>

                    <JobCenterCard>

                        <JobCenterCard1>
                            <Icon><img src={mailOpen} /></Icon>
                            <IconLabel>Open on</IconLabel>
                            <IconLabel>18/11/2022</IconLabel>
                        </JobCenterCard1>

                        <JobCenterCard1>
                            <Icon><img src={account} /><Number>5</Number></Icon>
                            <IconLabel>Total</IconLabel>
                            <IconLabel>Candidates</IconLabel>
                        </JobCenterCard1>

                        <JobCenterCard1>
                            <Icon><img src={pinkperson} /><Number>3</Number></Icon>
                            <IconLabel>Candiadtes</IconLabel>
                            <IconLabel>on track</IconLabel>
                        </JobCenterCard1>

                    </JobCenterCard>   

                    <JobRightCard>
                        
                        <button className="btn btn-md btn-white">
                            <ShowDiv>
                                <ButtonImg>
                                <img src={search} />
                                </ButtonImg>
                                <ShowText>SHOW</ShowText>
                            </ShowDiv>
                        </button>

                        <button className="btn btn-md btn-pink">
                            <CloseDiv>
                                <ButtonImg>
                                <img src={close2} />
                                </ButtonImg>
                                <CloseText>CLOSE</CloseText>
                            </CloseDiv>
                        </button>
                    </JobRightCard>
                    <ToggleButton>Tog</ToggleButton> 
                </BeforeToggleCard>
            </JobCard>
    )
}

export default Jobcard;

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
  text-align:center;
`;

const ImgInfoLeft = styled.div`
  width: 15.5px;
  height: 15.5px;
  margin-right: 5px;
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

const JobCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    border-radius: 8px;
    box-shadow: 0 0 5px 3px #e1e2e1;
    width: 944px;
    height: 80px;
    margin-top: 20px;
    background-color: white;
`;

const JobCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 285px;
`;

const JobTitle = styled.p`
  font-size: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
  padding-top: 10px;
`;

const JobLeftCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 350px;
    margin-bottom: 5px;
`;
const JobMainInformation2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-left: 8px;
`;
const JobCenterCard = styled.div` 
    width: 280px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`;

const JobCenterCard1 = styled.div` 
  width: 85px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const JobRightCard = styled.div` 
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const ButtonImg = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20px;
  height: 20px;
`;
const CloseDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80px;
  align-items: center;
`;

const ShowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 75px;
`;
const CloseText = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--white);
  font-weight: 500;
`;

const ShowText = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--gray);
  font-weight: 500;
`;

const Number = styled.div`
  width: 15px;
  height: 15px;
  padding-left: 5px;
  display: flex;
  align-content: center;
  font-size: 12px;
`;
