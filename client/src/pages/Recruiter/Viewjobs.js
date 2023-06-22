import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import "../../App.css";
import mailOpen from "../../img/mail-open-line.png";
import account from "../../img/account-circle-line.png";
import search from "../../img/search-line.png";
import building from "../../img/building-3-line.png";
import calendar from "../../img/calendar-2-line.png";
import money from "../../img/money-dollar-circle-line.png";
import AlertDialog from "../../components/Utilities/AlertDialog";
import { useVadilation } from "../../contexts/vadilation";
import close2 from "../../img/close2.png";
import pinkperson from "../../img/pinkperson.png";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import UtilitiesFunction from "../../utils/utilitiesFunction";
import RadioFilter from "../../components/SharedComponents/RadioFilter";
import IconWithText from "../../components/SharedComponents/IconWithText";
import moment from "moment";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";

//------------------------------1st function -----------------------------------//
function ViewJobs() {
  const [job, setJob] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [filterApllication, setFilterApplication] = useState("all");

  const radioFilterData = [
    { value: "all", label: "All" },
    { value: "true", label: "with candidate on track" },
    { value: "false", label: "closed" },
  ];

  const { setLoading, loading } = useVadilation();
  const navigate = useNavigate();
  const { componentDidMount } = UtilitiesFunction();

  const comProfileData = localStorage.getItem("id");

  // get data to display ---------------
  const getJobPost = async () => {
    try {
      const results = await axios.get(
        `${process.env.GTJ_APP_SERVICE_API}/users/${comProfileData}`
      );
      //setStatus(results.data.jobs);
      setTimeout(function () {
        setJob(_.reverse(results.data.jobs));
        setCandidate(results.data.candidate);
      }, 500);

    } catch (error) {
      console.log(error);
    }
    return {
      job,
      candidate,
    };
  };

  // function ส่งค่าไปหา backend โดยเรารับ jobId เข้ามา
  const updateStatusByJobId = async (jobId) => {
    await axios.put(`${process.env.GTJ_APP_SERVICE_API}/jobs/status/${jobId}`, {});
  };

  useEffect(() => {
    getJobPost();
  }, []);

  return (
    <Content>
      <AlertDialog/>
      <Heading1>
        <HeadingText>Job Posting</HeadingText>
        <RadioForm>
          <RadioFilter
            formlabel="Filter your job posting"
            radioData={radioFilterData}
            stateVariable={filterApllication}
            setStateVariable={setFilterApplication}
          />
        </RadioForm>
      </Heading1>

      <Heading2>
        <Heading2Text> {job?.length} Jobs posting found</Heading2Text>
      </Heading2>

      {job?.map((data) => {
        const countData = candidate.filter((items) => {
          return items.jobId === data._id;
        });

        const countTrack = countData.filter((items) => {
          return items.applicationStatus !== "finished";
        });

        const app = () => {
          return (
            <Job
              id={data._id}
              jobTitle={data.jobTitle}
              jobCategory={data.jobCategory}
              jobType={data.jobType}
              minSalary={data.minSalary}
              maxSalary={data.maxSalary}
              openOn={moment(data.createdJobDate).startOf().fromNow()}
              totalCandidate={countData.length}
              candidateOnTrack={countTrack.length}
              aboutTheJob={data.aboutJob}
              requirement={data.mandatoryReq}
              optionalRequirement={data.optionalReq}
              closedStatus={data.jobStatus}
              jobStatus={data?.jobStatus}
              jobList={job}
            />
          );
        };

        if (filterApllication === "all") {
          return app();
        } else if (filterApllication === data?.jobStatus.toString()) {
          // หาตัวแปรที่ return ค่า job status
          return app();
        }
      })}
    </Content>
  );

  //------------------------------2nd function -----------------------------------//
  function Job(props) {
    const [toggle, setToggle] = useState(false);
    const [close, setClose] = useState(false);
    const [font, setFont] = useState(false);
    const [disable, setDisable] = useState(false);

    const { convertSalary } = UtilitiesFunction();

    useEffect(() => {
      if (props.jobStatus === false) {
        setClose(true);
        setDisable(true);
        setFont(true);
      }
    }, []);

    //-------------------------- function สำหรับการกดปุ่่ม---------------------------//
    const handleCloseCLick = (event) => {
      event.preventDefault();
      getJobPost()
      if (props.jobStatus === true) {
        updateStatusByJobId(props.id);
        setClose(!close);
        setDisable(true);
        setFont(!font);
        window.location.reload(false);

      } else {
        console.log("Error init");
      }
    };

    return (loading ? null:
      <div>
        <Jobcard key={props.id}>
          <JobCardMain>
            <JobCardMainLeft>
              <div>
                {" "}
                <JobTitle key={props.id}>{props.jobTitle}</JobTitle>
              </div>
              <JobCardHeaderLeft>
                <JobCardHeaderLeft1>
                  <Img>
                    <img src={building} />
                  </Img>
                  <div>
                    <Text1 key={props.id}>{props.jobCategory}</Text1>
                  </div>
                </JobCardHeaderLeft1>

                <JobCardHeaderLeft2>
                  <Img>
                    <img src={calendar} />
                  </Img>
                  <div>
                    <Text1 key={props.id}>{props.jobType}</Text1>
                  </div>
                </JobCardHeaderLeft2>

                <JobCardHeaderLeft2>
                  <Img>
                    <img src={money} />
                  </Img>
                  <div>
                    <Text1 key={props.id}>
                      {convertSalary(props.minSalary)} -{" "}
                      {convertSalary(props.maxSalary)}{" "}
                    </Text1>
                  </div>
                </JobCardHeaderLeft2>
              </JobCardHeaderLeft>
            </JobCardMainLeft>

            <JobCenterCard>
              <JobCenterCard1>
                <IconWithText icon={mailOpen} />
                <Text3 key={props.id}>
                  Open on
                  <br />
                  {props.openOn}
                </Text3>
              </JobCenterCard1>
              <JobCenterCard1>
                <IconWithText icon={account} />
                <Text3 key={props.id}>
                  {props.totalCandidate} Total Candidates
                </Text3>
              </JobCenterCard1>

              <JobCenterCard1>
                <IconWithText icon={pinkperson} />
                <Text2 key={props.id}>
                  {props.candidateOnTrack} Candidates on track
                </Text2>
              </JobCenterCard1>
            </JobCenterCard>

            <JobCardMainRight>
              <JobCardRight1>
                <button
                  className="btn btn-md btn-white"
                  onClick={() => {
                    localStorage.setItem("jobId", props.id);
                    setTimeout(function () {
                      navigate(`/viewJobPosting/${props.id}`);
                      componentDidMount();
                    }, 500);
                  }}>
                  <ShowDiv>
                    <Img2>
                      <img src={search} />
                    </Img2>
                    <Show>SHOW</Show>
                  </ShowDiv>
                </button>
              </JobCardRight1>

              <JobCardRight2>
                <form
                  id="submitCloseBtn"
                  onSubmit={(e) => {
                    handleCloseCLick(e);
                  }}>
                  <button
                    htmlFor="submitCloseBtn"
                    id="buttonID"
                    style={{
                      borderRadius: "16px",
                      padding: "8px 16px",
                      height: "40px",
                      width: "140px",
                      backgroundColor: close ? "#E1E2E1" : "#BF5F82",
                    }}
                    disabled={close ? true : false}
                    value={job.jobStatus}
                    type="submit">
                    <CloseDiv>
                      <Img2>
                        <img src={close2} />
                      </Img2>
                      <p
                        style={{
                          color: close ? "lightgray" : "white",
                          paddingLeft: "10px"
                        }} >
                        {" "}
                        {close ? "CLOSED" : "CLOSE"}
                        
                      </p>
                    </CloseDiv>
                  </button>
                </form>
              </JobCardRight2>
            </JobCardMainRight>
          </JobCardMain>

          {toggle && (
            <JobCardDetails>
              <JobCardDetails1>
                <About>About the job position</About>
                <JobCardDetails2>
                  <Detail>
                    <p>{props.aboutTheJob}</p>
                  </Detail>
                </JobCardDetails2>
              </JobCardDetails1>

              <JobCardDetails1>
                <About>Mandatory requirements</About>
                <JobCardDetails2>
                  <Detail>
                    <p>{props.requirement}</p>
                  </Detail>
                </JobCardDetails2>
              </JobCardDetails1>

              <JobCardDetails1>
                <About>Optional Requirements</About>
                <JobCardDetails2>
                  <Detail>
                    <p>{props.optionalRequirement}</p>
                  </Detail>
                </JobCardDetails2>
              </JobCardDetails1>
            </JobCardDetails>
          )}
          <button onClick={() => setToggle(!toggle)}>
            <Toggle>
              {toggle ? (
                <i class="fas fa-angle-up" />
              ) : (
                <i class="fas fa-angle-down" />
              )}
            </Toggle>
          </button>
        </Jobcard>
      </div>
    );
  }
}

export default ViewJobs;

//------------------------------------Div-----------------------------------------------//

const Heading1 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 944px;
  margin-top: 20px;
`;
const Heading2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 944px;
  margin-top: 10px;
`;
const RadioForm = styled.div`
  margin-top: 30px;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f6;
`;

const Jobcard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: 0 0 5px 3px #e1e2e1;
  width: 944px;
  margin-top: 10px;
  background-color: white;
  overflow: hidden;
`;

const Toggle = styled.div`
  color: #616161;
  width: 50px;
  margin-left: 890px;
`;

const JobCardMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15px;
  margin-top: 10px;
`;

const JobCardMainLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 350px;
  margin-top: 10px;
`;

const JobCardHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
`;

const JobCardHeaderLeft1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 120px;
`;

const JobCardHeaderLeft2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100px;
  margin-left: 5px;
`;

const JobCardRight1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  margin-left: 15px;
`;

const JobCardRight2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  margin-left: 50px;
`;

const Img2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20px;
  height: 20px;
`;

const Img = styled.div`
  width: 12.5px;
  height: 12.5px;
`;

const JobCardMainRight = styled.div`
  display: flex;
  flex-direction: row;
  width: 280px;
  justify-content: space-between;
  margin-right: 105px;
  margin-top: 15px;
`;

const JobCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 15px;
`;
const JobCardDetails1 = styled.div`
  margin-bottom: 5px;
`;

const JobCardDetails2 = styled.div`
  margin-top: 5px;
`;

const ShowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70px;
  align-items: center;
`;

const CloseDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100px;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  width: 760px;
`;

const JobCenterCard = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const JobCenterCard1 = styled.div`
  width: 95px;
  height: 55px;
  margin-left: 10px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//------------------------------------Text-----------------------------------------------//

const HeadingText = styled.p`
  font-size: 34px;
  line-height: 20px;
  font-weight: 400;
  margin-top: 20px;
  font-font-family: var(--primary-font);
`;

const Text1 = styled.p`
  font-size: 12px;
  font-family: var(--primary-font);
  color: var(--light-gray);
  font-weight: 400;
  margin-left: 8px;
`;

const Text2 = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: #f48fb1;
  font-weight: 400;
  margin-left: 8px;
  text-align: center;
  letter-spacing: 0.4px;
  line-height: 16px;
`;

const Text3 = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: #616161;
  font-weight: 400;
  margin-left: 8px;
  text-align: center;
  letter-spacing: 0.4px;
  line-height: 16px;
`;

const Show = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--gray);
  font-weight: 500;
`;

const About = styled.p`
  font-size: 16px;
  font-family: var(--primary-font);
  color: var(--primary-brand-color);
  font-weight: 400;
`;

const Heading2Text = styled.p`
  font-size: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
`;

const JobTitle = styled.p`
  font-size: 20px;
  font-family: var(--primary-font);
  color: var(--primary-text-color);
  font-weight: 500;
`;
