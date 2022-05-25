import React from "react";
import styled from "@emotion/styled";
import "../../App.css";
import closedMail from "../../img/closedMail.png";
import waiting from "../../img/waiting.png";
import phone from "../../img/phone.png";
import IN from "../../img/linkedin-box-line.png";

function Candidate () {
    return(
        <CandidateCard>
                <BeforeToggleCard>

                    <CandidateLeftCard>
                        <CandidateDiv>
                         <CandidateName>Name Lastname here</CandidateName> 
                        </CandidateDiv>

                        <MainInformation>
                            <MainInformation1>
                            <INImg>
                                <img src={IN} />
                            </INImg>
                                <TextInfo>Linked URL</TextInfo>                         
                            </MainInformation1>
                        </MainInformation>
                    </CandidateLeftCard>

                    <CandidateCenterCard>
                        <CandidateCenterCard1>
                                <Email>
                                    <Icon><img src={closedMail}/></Icon>
                                    <EmailText>Your Personal Email here</EmailText>
                                </Email>
                                <Phone>
                                    <Icon><img src={phone}/></Icon>
                                    <PhoneText>+6612345678</PhoneText>  
                                </Phone>                          
                        </CandidateCenterCard1>

                        <CandidateCenterCard2>
                            <Icon><img src={closedMail}/></Icon>
                            <IconLabel>Sent 1 day ago</IconLabel>
                        </CandidateCenterCard2>

                        <CandidateCenterCard3>
                            <Icon><img src={waiting}/></Icon>
                            <IconLabel> Waiting for review</IconLabel>
                        </CandidateCenterCard3>

                    </CandidateCenterCard>   

                    <CandidateRightCard>
                            <MarkTextButton>
                                <MarkText>MARK AS STARTED</MarkText>
                            </MarkTextButton>
                    </CandidateRightCard> 
                    <ToggleButton>Tog</ToggleButton>
                </BeforeToggleCard>
            </CandidateCard>
    )
}

export default Candidate;

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

const CandidateCard = styled.div`
display: flex;
flex-direction: column;
border: 1px solid white;
border-radius: 8px;
box-shadow: 0 0 5px 3px #e1e2e1;
width: 944px;
height: 80px;
background-color: white;
padding-top: 10px;
margin-top: 10px;
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
  border-radius: 12px;
  border:1px solid pink;
`;
