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
import closeWhite from "../../img/closeWhite.png";
import pinkperson from "../../img/pinkperson.png";
import { AppBar } from "@mui/material";
import { useJobsData } from "../../contexts/jobsData";
import _ from "lodash";

/*
const datas = [
  {
    id: "1",
    jobTitle: "The job title",
    openOn: "07/11/20",
    jobsStatus: true,
    totalCandidate: "5",
    candidateOnTrack: "3",
    jobType: "Full Time",
    minSalary: "2.0k",
    maxSalary: "2.5k",
    jobCategory: "Manufactoring",
    aboutTheJob:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis diam fringilla, luctus lectus dictum, volutpat lacus. Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus dapibus egestas. Etiam dolor neque, posuere at purus cursus, molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan ut sit amet odio. Nam maximus varius leo, et porttitor ante sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed fringilla nunc leo, a euismod ipsum aliquet placerat. Integer suscipit semper mi, sit amet mollis augue mollis in. Proin vestibulum accumsan elit, id pellentesque diam fermentum eget. Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec enim eleifend dapibus.",
    requirement:
      "-Lorem ipsum dolor sit amet, consectetur adipiscing -elit Aenean aliquam turpis eget egestas porta.  -Quisque tristique nunc ut sem pretium bibendum. -Phasellus sit amet turpis laoreet, mattis elit ut, luctus ligula. -Nullam blandit arcu eget justo hendrerit finibus.",
    optionalRequirement:
      "- Lorem ipsum dolor sit amet, consectetur adipiscing elit - Maecenas vel metus imperdiet, malesuada dolor a, pulvinar tellus.",
  }
];*/

//------------------------------1st function -----------------------------------//
function ViewJobs() {
  const [job, setJob] = useState([]);
  const userRole = localStorage.getItem("role");
  const { fistLogIn } = useVadilation();
  //console.log(job);
  let { jobStatus, setJobStatus } = useJobsData();
  const handleSelectChange = (event) => {
    const value = event.target.value;
  }; //---delete----

  const comProfileData = localStorage.getItem("id");

  const getJobPost = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/users/${comProfileData}`
      );
      // console.log(results.data.job[0].jobStatus);
      //setJobStatus(results.data.jobs[0].jobStatus);
      console.log(results.data.jobs, "results.data.jobs");
      setJob(_.reverse(results.data.jobs));

      // console.log("GET JOB POST", results.data.jobs);
    } catch (error) {
      console.log(error);
    }
    return {
      job,
    };
  };
  const updateStatus = async (newJob) => {
    console.log(newJob, "job");
    await axios.put(`http://localhost:4000/users/${comProfileData}`, {
      jobs: newJob,
    });
  };

  const updateStatusByJobId = async (jobId, job) => {
    console.log(jobId, job, "job");
    await axios.put(`http://localhost:4000/users/${jobId}`, {
      job,
    });
  };
  //console.log(jobStatus);

  //console.log("STATE job",job);
  useEffect(() => {
    getJobPost();
  }, []);

  return (
    <Content>
      {fistLogIn ? (
        <AlertDialog textDialog={`Login successful! Welcome ${userRole}`} />
      ) : null}
      <Heading>
        <HeadingText>Job Posting</HeadingText>
        <HeadingText2Title>
          <HeadingText2>FILTER YOUR JOB POSTINGS</HeadingText2>
        </HeadingText2Title>
        <RadioForm>
          <RadioForm1>
            <RadioBtn
              className="checked:bg-white"
              type="radio"
              id="all"
              name="filter"
              //value="option1"

              onChange={(event) => handleSelectChange(event)}
            />

            <label htmlFor="all">
              {" "}
              <HeadingText3>All</HeadingText3>
            </label>
          </RadioForm1>

          <RadioForm1>
            <RadioBtn
              //className=" form-check-input appearance-none rounded-full h-3 w-3 border border-pink-400 bg-white checked:bg-pink-400 checked:border-pink-400 focus:outline-none cursor-pointer transition duration-200"
              type="radio"
              id="trackedCandidate"
              name="filter"
              //checked={select === "option2"}
              onChange={(event) => handleSelectChange(event)}
            />
            <label htmlFor="trackedCandidate">
              <HeadingText3>With candidates on track</HeadingText3>
            </label>
          </RadioForm1>

          <RadioForm1>
            <RadioBtn
              className=""
              type="radio"
              id="closed"
              name="filter"
              //value="option3"
              //checked={select === "option3"}
              onChange={(event) => handleSelectChange(event)}
            />
            <label htmlFor="closed">
              <HeadingText3>closed</HeadingText3>
            </label>
          </RadioForm1>
        </RadioForm>
      </Heading>

      <Heading1>
        <Text5> {job.length} Jobs posting found</Text5>
      </Heading1>
      {job?.map((data) => {
        return (
          <Job
            id={data._id}
            jobTitle={data.jobTitle}
            jobCategory={data.jobCategory}
            jobStatus={data.jobStatus}
            jobType={data.jobType}
            minSalary={data.minSalary}
            maxSalary={data.maxSalary}
            openOn={data.openOn}
            totalCandidate={data.totalCandidate}
            candidateOnTrack={data.candidateOnTrack}
            aboutTheJob={data.aboutJob}
            requirement={data.mandatoryReq}
            optionalRequirement={data.optionalReq}
            jobList={job}
          />
        );
      })}
    </Content>
  );
  //------------------------------2nd function -----------------------------------//

  function Job(props) {
    const [toggle, setToggle] = useState(false);
    const [close, setClose] = useState(false);
    const [font, setFont] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
      if (props.jobStatus === false) {
        console.log(props.jobStatus, "props.jobStatus");
        setClose(true);
        setDisable(true);
        setFont(true);
      }
    }, []);

    //document.getElementById('buttonID').disabled = true;

    /*const closeJobStatus = (index) => {
      job[index].jobStatus = true;
      console.log(index);
      console.log(job[index].jobStatus);
    };*/
    let handleCloseCLick1 = (event) => {
      event.preventDefault();
      job.jobStatus = false;
      updateStatus();
      setClose(!close);
      setDisable(true);
      setFont(!font);

      console.log(jobStatus);
    };

    let handleCloseCLick = (event) => {
      event.preventDefault();

      if (props.jobStatus === true) {
        let newJob = props.jobList;

        const objIndex = props.jobList.findIndex((j) => j._id === props.id);

        newJob[objIndex].jobStatus = false;

        console.log(newJob, "newJob");

        // updateStatus(newJob);
        updateStatusByJobId(newJob[objIndex]._id, newJob[objIndex]);
        setClose(!close);
        setDisable(true);
        setFont(!font);
      }
      console.log(jobStatus);
    };
    //const [jobsStatus, setJobsStatus] = useState(false);

    const click = () => {
      setClose(!close);
      setDisable(true);
      setFont(!font);
    };
    //console.log(job[0].jobStatus);
    return (
      <div>
        <Jobcard key={props._id}>
          <JobCardHeader>
            <JobCardHeader1>
              <div>
                <JobTitle key={props._id}>{props.jobTitle}</JobTitle>
              </div>
              <JobCardHeader1Left>
                <JobCardHeader1Left1>
                  <Img>
                    <img src={building} />
                  </Img>
                  <div>
                    <Text1 key={props._id}>{props.jobCategory}</Text1>
                  </div>
                </JobCardHeader1Left1>
                <JobCardHeader1Left2>
                  <Img>
                    <img src={calendar} />
                  </Img>
                  <div>
                    <Text1 key={props._id}>{props.jobType}</Text1>
                  </div>
                </JobCardHeader1Left2>
                <JobCardHeader1Left2>
                  <Img>
                    <img src={money} />
                  </Img>
                  <div>
                    <Text1 key={props._id}>
                      {props.minSalary} {props.maxSalary}{" "}
                    </Text1>
                  </div>
                </JobCardHeader1Left2>
              </JobCardHeader1Left>
            </JobCardHeader1>
            <JobCardHeader2>
              <JobCardHeader2Left5>
                <JobCardHeader2Left4>
                  <img src={mailOpen} />
                </JobCardHeader2Left4>
                <Text2>Open on</Text2>{" "}
                <Text2 key={props._id}>{props.openOn}</Text2>
              </JobCardHeader2Left5>
              <JobCardHeader2Left2>
                <JobCardHeader2Left3>
                  <Img>
                    <img src={account} />
                  </Img>
                  <Text2 key={props._id}>{props.totalCandidate}</Text2>{" "}
                </JobCardHeader2Left3>
                <Text2>Total</Text2> <Text2>Candidates</Text2>
              </JobCardHeader2Left2>
              <JobCardHeader2Left2>
                <JobCardHeader2Left3>
                  <Img>
                    <img src={pinkperson} />
                  </Img>
                  <Text2 key={props._id}>{props.candidateOnTrack}</Text2>{" "}
                </JobCardHeader2Left3>
                <Text2p>Candidates </Text2p> <Text2p> on track</Text2p>
              </JobCardHeader2Left2>
            </JobCardHeader2>

            <JobCardHeader3>
              <JobCardHeader3Left3>
                <button className="btn btn-md btn-white">
                  <ShowDiv>
                    <Img2>
                      <img src={search} />
                    </Img2>
                    <Text6>SHOW</Text6>
                  </ShowDiv>
                </button>
              </JobCardHeader3Left3>

              <JobCardHeader3Left3>
                <JobCardHeader3Left3>
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
                      value={job.jobStatus}
                      type="submit"
                      //disabled={disable}
                      /* onClick={handleCloseCLick}*/
                    >
                      <CloseDiv>
                        <Img2>
                          <img src={close2} />
                        </Img2>
                        <p
                          style={{
                            color: close ? "lightgray" : "white",
                          }}>
                          {" "}
                          {close ? "CLOSED" : "CLOSE"}
                        </p>
                      </CloseDiv>
                    </button>
                  </form>
                </JobCardHeader3Left3>
              </JobCardHeader3Left3>
            </JobCardHeader3>
          </JobCardHeader>

          {toggle && (
            <JobCardDetails>
              <JobCardDetails1>
                <Text4>About the job position</Text4>
                <JobCardDetails2>
                  <Detail>
                    <p>{props.aboutTheJob}</p>
                  </Detail>
                </JobCardDetails2>
              </JobCardDetails1>

              <JobCardDetails1>
                <Text4>Mandatory requirements</Text4>
                <JobCardDetails2>
                  <Detail>
                    <p>{props.requirement}</p>
                  </Detail>
                </JobCardDetails2>
              </JobCardDetails1>

              <JobCardDetails1>
                <Text4>Optional Requirements</Text4>
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
                <i className="fas fa-angle-up" />
              ) : (
                <i className="fas fa-angle-down" />
              )}
            </Toggle>
          </button>
        </Jobcard>
      </div>
    );
  }
}

export default ViewJobs;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 944px;
`;
const Heading1 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 944px;
  margin-top: 10px;
`;
const HeadingText = styled.p`
  font-size: 34px;
  line-height: 20px;
  font-weight: 400;
  margin-top: 20px;
  font-font-family: var(--primary-font);
`;
const HeadingText2Title = styled.div`
  margin-top: 20px;
`;
const HeadingText2 = styled.p`
  font-size: 10px;
  font-weight: 400;
  font-font-family: var(--seconary-font);
  color: var(--primary-text- color);
`;
const HeadingText3 = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-font-family: var(--seconary-font);
  color: var(--gray);
`;
const RadioForm = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 300px;
`;
const RadioBtn = styled.input`
  accent-color: var(--secoundary-brand-color);
`;

const RadioForm1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 30px;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f6;
`;
const Text1 = styled.p`
  font-size: 12px;
  font-family: var(--primary-font);
  color: var(--light-gray);
  font-weight: 400;
`;
const Text2 = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: var(--gray);
  font-weight: 400;
`;
const Text2p = styled.p`
  font-size: 12px;
  font-family: var(--seconary-font);
  color: #f48fb1;
  font-weight: 400;
`;
const Text3 = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: white;
  font-weight: 500;
`;

const Text8 = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: white;
  font-weight: 500;
`;

const Text6 = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--gray);
  font-weight: 500;
`;

const Text4 = styled.p`
  font-size: 16px;
  font-family: var(--primary-font);
  color: var(--primary-brand-color);
  font-weight: 400;
`;

const Text5 = styled.p`
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

const JobCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15px;
  margin-top: 10px;
`;

const JobCardHeader1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 285px;
`;

const JobCardHeader1Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const JobCardHeader1Left1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 110px;
`;

const JobCardHeader1Left2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80px;
`;

const JobCardHeader2Left2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
`;

const JobCardHeader2Left5 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 180px;
`;

const JobCardHeader2Left3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 28px;
`;

const JobCardHeader2Left4 = styled.div`
  display: flex;
  justify-content: center;
  width: 15px;
  height: 15px;
`;

const JobCardHeader3Left3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 70px;
`;

const Img2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20px;
  height: 20px;
`;
const JobCardHeader2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 230px;
`;

const Img = styled.div`
  width: 12.5px;
  height: 12.5px;
`;

/*const Img3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;*/
const JobCardHeader3 = styled.div`
  display: flex;
  flex-direction: row;
  width: 220px;
  justify-content: space-between;
  margin-right: 95px;
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

const CloseJobButton = styled.button`
  background-color: ${(props) =>
    props.isActive
      ? "var(--tertiary-text-color)"
      : "var(--primary-brand-color)"};
`;
