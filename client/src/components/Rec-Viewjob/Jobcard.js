import React , { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
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
import IconWithText from "../SharedComponents/IconWithText";
import ToggleCard from "../SharedComponents/ToggleCard";
import UtilitiesFunction from "../../utils/utilitiesFunction";
import moment from "moment";

function ShowJob2 () {
  const jobId = localStorage.getItem("jobId");
  const [job, setJob ] = useState({});
  const [jobDetails, setJobDetails] = useState([]);
  const [closed,setClosed] = useState([]);

  const getJobPost = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/jobs/${jobId}`
      );
      console.log(results);

      setJob(results.data.data);
      setJobDetails(_.reverse(results?.data.data.applications));
      setClosed(results.data.data.jobStatus)
      console.log(results.data.data);

    } catch (error) {
      console.log(error);
    }
    return {
      job,
      jobDetails
    };
  };

  const countData = jobDetails.filter((items) => {
    return items !== undefined;
  });

  const countCandidate = jobDetails.filter((items) => {
    return items.applicationStatus !== "finished";
  });

  
  console.log(countCandidate);
  console.log(job);
  console.log(jobDetails);
  console.log(closed);
  

  const title = job.jobTitle;
  const category= job.jobCategory;
  const type = job.jobType;
  const maxSalary = job.maxSalary;
  const minSalary = job.minSalary;
  const mendatoryReq = job.mendatoryReq;
  const optionalReq = job.optionalReq;
  const about = job.aboutJob;


  const { convertSalary } = UtilitiesFunction();


  useEffect(() => {
    getJobPost ();
  }, []);

    const JobCardHeader = () => {
    return (
        
                <BeforeToggleCard>
                    <JobLeftCard>
                        <JobCardDiv>
                        <JobTitle>{title}</JobTitle>
                        </JobCardDiv>

                        <MainInformation>
                            <MainInformation1>
                            <ImgInfoLeft>
                                <img src={building} />
                            </ImgInfoLeft>                          
                                <TextInfo>{category}</TextInfo>                           
                            </MainInformation1>

                            <JobMainInformation2>
                            <ImgInfoLeft>
                                <img src={calendar} />
                            </ImgInfoLeft>
                            <div>
                                <TextInfo>{type}</TextInfo>
                            </div>
                            </JobMainInformation2>

                            <JobMainInformation2>
                            <ImgInfoLeft>
                                <img src={money} />
                            </ImgInfoLeft>
                            <div>
                                <TextInfo> {convertSalary(minSalary)} - {convertSalary(maxSalary)}</TextInfo>
                            </div>
                            </JobMainInformation2>
                        </MainInformation>
                    </JobLeftCard>

                    <JobCenterCard>

                        <JobCenterCard1>
                            <IconWithText icon={mailOpen}  text={moment(job?.createdJobDate).startOf().fromNow()}/>                     
                        </JobCenterCard1>

                        <JobCenterCard1>
                            <IconWithText icon={account} text={jobDetails?.length === 0 ? "0" : `${countData.length}`}/>                          
                        </JobCenterCard1>

                        <JobCenterCard1>
                            <IconWithText icon={pinkperson} text={jobDetails?.length === 0 ? "0" : `${countCandidate.length}`}/>
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

                        <button
                      htmlFor="submitCloseBtn"
                      id="buttonID"
                      style={{
                      borderRadius: "16px",
                      padding: "8px 16px",
                      height: "40px",
                      width: "140px",
                      backgroundColor: closed ? "#BF5F82" : "#E1E2E1",
                        }}
                        value={closed}
                        type="submit">
                        <CloseDiv>                         
                            <img src={close2} />                         
                            <p
                            style={{
                              color: closed ? "white" : "#8E8E8E",
                            }}>
                        {" "}
                        {closed ? "CLOSE" : "CLOSED"}
                      </p>
                    </CloseDiv>
                  </button>
                    </JobRightCard>
                </BeforeToggleCard>
            
    )}
      const JobcardContent = () => {
      return (
        <JobCardDetails>
              <JobCardDetails1>
                  <Title>About the job position</Title>
                  <JobCardDetails2>
                    <Detail>
                      {about}
                    </Detail>
                  </JobCardDetails2>
              </JobCardDetails1>

              <JobCardDetails1>
                  <Title>Mandatory requirements</Title>
                  <JobCardDetails2>
                    <Detail>
                    {mendatoryReq}
                    </Detail>
                  </JobCardDetails2>
              </JobCardDetails1>

              <JobCardDetails1>
                  <Title>Optional Requirements</Title>
                  <JobCardDetails2>
                    <Detail>
                      {optionalReq}
                    </Detail>
                  </JobCardDetails2>
              </JobCardDetails1>
        </JobCardDetails>
      )
    }

    return (
      <Wrapper1>
        <ToggleCard header={JobCardHeader()} content={JobcardContent()} />
      </Wrapper1>
    );
} 

export default ShowJob2;

const Wrapper1 = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
`;
//------------------------------------------Before toggle----------------------------------------------------------//
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
  width: 115px;
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
  width: 95px;
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

//------------------------------------------After toggle----------------------------------------------------------//

const JobCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 25px;
`;

const JobCardDetails1 = styled.div`
  margin-bottom: 5px;
`;

const JobCardDetails2 = styled.div`
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