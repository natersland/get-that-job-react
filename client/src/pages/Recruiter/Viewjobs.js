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

//------------------------------1st function -----------------------------------//
function ViewJobs() {
  const [status, setStatus] = useState("option1");
  const [job, setJob] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const userRole = localStorage.getItem("role");
  const [filterApllication, setFilterApplication] = useState("all");

  const radioFilterData = [
    { value: "all", label: "All" },
    { value: "with candidate on track", label: "with candidate on track" },
    { value: "close", label: "closed" },
  ];

  const { setLoading } = useVadilation();
  const navigate = useNavigate();
  const { componentDidMount } = UtilitiesFunction();

  const comProfileData = localStorage.getItem("id");
  const jobId = localStorage.getItem("jobId");

  // get data to display ---------------
  const getJobPost = async () => {
    try {
      /* */
      const results = await axios.get(
        `http://localhost:4000/users/${comProfileData} `
      );
      //setStatus(results.data.jobs);
      setJob(results?.data?.jobs);
      setCandidatesData(results?.data?.candidate);
      console.log("GET JOB POST", results);
    } catch (error) {
      console.log(error);
    }
  };

  // function ส่งค่าไปหา backend โดยเรารับ jobId เข้ามา
  const updateStatusByJobId = async (jobId) => {
    await axios.put(`http://localhost:4000/jobs/${jobId}`, {});
  };

  const jobData = job?.map((data) => {
    let candidateDetails = _.find(candidatesData, {
      jobId: data?._id,
    });
    /* 
    var array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

    _.pullAllBy(candidatesData, [{ x: 1 }, { x: 3 }], "x");
    console.log(array);
    // => [{ 'x': 2 }]
    console.log("hi", candidateDetails); */
    return (
      <Job
        id={data?._id}
        jobTitle={data?.jobTitle}
        jobCategory={data?.jobCategory}
        jobStatus={data?.jobStatus}
        jobType={data?.jobType}
        minSalary={data?.minSalary}
        maxSalary={data?.maxSalary}
        openOn={moment(data?.createdJobDate).startOf().fromNow()}
        totalCandidate={candidateDetails?.length}
        /* candidateOnTrack={candidateOnTrack}  */
        aboutTheJob={data?.aboutJob}
        requirement={data?.mandatoryReq}
        optionalRequirement={data?.optionalReq}
        closedStatus={data?.jobStatus}
        //jobList={job}
      />
    );
  });
  useEffect(() => {
    getJobPost();
  }, []);

  return (
    <Content>
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
      {}
      {jobData}
    </Content>
  );

  //------------------------------2nd function -----------------------------------//
  function Job(props) {
    const [toggle, setToggle] = useState(false);
    const [close, setClose] = useState(false);
    const [font, setFont] = useState(false);
    const [disable, setDisable] = useState(false);

    const { convertSalary } = UtilitiesFunction();

    //----------------------------------------------------------------------------------------------------------------//

    const [jobDetails, setJobDetails] = useState([]);
    const [userCandidate, setUserCandidates] = useState();

    const recruiterId = localStorage.getItem("id");

    const url = `http://localhost:4000/users/${recruiterId}`;

    const getApplications = async () => {
      try {
        const results = await axios.get(url);
        setJobDetails(_.reverse(results?.data.jobs)); // เก็บข้อมูลจำนวนงานที่มี jobId
        setUserCandidates(results?.data.candidate); // เก็บข้อมูล candidate ที่มี jobId
      } catch (error) {
        console.log(error);
      }
      return {
        jobDetails,
      };
    };

    /*const candidateData = userCandidate?.map((Data,index) => {
    let candidateDetail = _.find(jobDetails, {_id: Data?.jobId });  // หา candidate ที่มี jobId

  const countData = userCandidate?.map((items) => {
    return items !== undefined;
  });*/

    useEffect(() => {
      getApplications();
    }, []);

    //----------------------------------------------------------------------------------------------------------------//

    useEffect(() => {
      if (props.jobStatus === false) {
        setClose(true);
        setDisable(true);
        setFont(true);
      }
    }, []);

    // function สำหรับการกดปุ่่ม
    const handleCloseCLick = (event) => {
      event.preventDefault();

      if (props.jobStatus === true) {
        updateStatusByJobId(props.id);
        setClose(!close);
        setDisable(true);
        setFont(!font);
      } else {
        console.log("Error init");
      }
    };

    return (
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
                <IconWithText icon={mailOpen} text={props.openOn} />
              </JobCenterCard1>
              <JobCenterCard1>
                <IconWithText
                  icon={account}
                  /* text={`${props.totalCandidate} candidates`} */
                  text={`${props.totalCandidate} candidates`}
                />
              </JobCenterCard1>

              <JobCenterCard1>
                <IconWithText
                  icon={pinkperson}
                  number={"props.candidateOnTrack"}
                  text={"Candidates on track"}
                />
              </JobCenterCard1>
            </JobCenterCard>

            <JobCardMainRight>
              <JobCardRight1>
                <button
                  className="btn btn-md btn-white"
                  onClick={() => {
                    setLoading(true);
                    localStorage.setItem("jobId", props.id);
                    setTimeout(function () {
                      navigate(`/viewJobPosting/${props.id}`);
                      componentDidMount();
                      setLoading(false);
                    }, 500);
                  }}
                >
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
                  }}
                >
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
                    value={job.jobStatus}
                    type="submit"
                  >
                    <CloseDiv>
                      <Img2>
                        <img src={close2} />
                      </Img2>
                      <p
                        style={{
                          color: close ? "lightgray" : "white",
                        }}
                      >
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
  width: 88px;
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
  width: 85px;
  height: 55px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
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
