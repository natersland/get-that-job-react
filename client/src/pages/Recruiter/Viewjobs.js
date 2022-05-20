import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
/* import "./App.css"; */
import "../../App.css";
import mailOpen from "../../img/mail-open-line.png";
import account from "../../img/account-circle-line.png";
import search from "../../img/search-line.png";
import close from "../../img/close-circle-line.png";
import building from "../../img/building-3-line.png";
import calendar from "../../img/calendar-2-line.png";
import money from "../../img/money-dollar-circle-line.png";
import arrowUp from "../../img/arrow-up-s-line.png";
import AlertDialog from "../../components/Utilities/AlertDialog";
import { useVadilation } from "../../contexts/vadilation";
//import arrowUp from "../../img/arrow-up-s-line.png";
//import { JobsDataProvider } from "../../contexts/jobsData";

/*
 */ const datas = [
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
    companyName: "Manufactoring",
    aboutTheJob:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis diam fringilla, luctus lectus dictum, volutpat lacus. Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus dapibus egestas. Etiam dolor neque, posuere at purus cursus, molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan ut sit amet odio. Nam maximus varius leo, et porttitor ante sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed fringilla nunc leo, a euismod ipsum aliquet placerat. Integer suscipit semper mi, sit amet mollis augue mollis in. Proin vestibulum accumsan elit, id pellentesque diam fermentum eget. Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec enim eleifend dapibus.",
    requirement:
      "-Lorem ipsum dolor sit amet, consectetur adipiscing -elit Aenean aliquam turpis eget egestas porta.  -Quisque tristique nunc ut sem pretium bibendum. -Phasellus sit amet turpis laoreet, mattis elit ut, luctus ligula. -Nullam blandit arcu eget justo hendrerit finibus.",
    optionalRequirement:
      "- Lorem ipsum dolor sit amet, consectetur adipiscing elit - Maecenas vel metus imperdiet, malesuada dolor a, pulvinar tellus.",
  },
  {
    id: "2",
    jobTitle: "The job title 2",
    openOn: "07/11/20",
    jobsStatus: false,
    totalCandidate: "5",
    candidateOnTrack: "3",
    jobType: "Full Time",
    minSalary: "2.0k",
    maxSalary: "2.5k",
    companyName: "Manufactoring",
    aboutTheJob:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis diam fringilla, luctus lectus dictum, volutpat lacus. Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus dapibus egestas. Etiam dolor neque, posuere at purus cursus, molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan ut sit amet odio. Nam maximus varius leo, et porttitor ante sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed fringilla nunc leo, a euismod ipsum aliquet placerat. Integer suscipit semper mi, sit amet mollis augue mollis in. Proin vestibulum accumsan elit, id pellentesque diam fermentum eget. Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec enim eleifend dapibus.",
    requirement:
      "-Lorem ipsum dolor sit amet, consectetur adipiscing -elit Aenean aliquam turpis eget egestas porta.  -Quisque tristique nunc ut sem pretium bibendum. -Phasellus sit amet turpis laoreet, mattis elit ut, luctus ligula. -Nullam blandit arcu eget justo hendrerit finibus.",
    optionalRequirement:
      "- Lorem ipsum dolor sit amet, consectetur adipiscing elit - Maecenas vel metus imperdiet, malesuada dolor a, pulvinar tellus.",
  },
  {
    id: "3",
    jobTitle: "The job title 3",
    openOn: "07/11/20",
    jobsStatus: false,
    totalCandidate: "5",
    candidateOnTrack: "0",
    jobType: "Full Time",
    minSalary: "2.0k",
    maxSalary: "2.5k",
    companyName: "Manufactoring",
    aboutTheJob:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis diam fringilla, luctus lectus dictum, volutpat lacus. Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus dapibus egestas. Etiam dolor neque, posuere at purus cursus, molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan ut sit amet odio. Nam maximus varius leo, et porttitor ante sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed fringilla nunc leo, a euismod ipsum aliquet placerat. Integer suscipit semper mi, sit amet mollis augue mollis in. Proin vestibulum accumsan elit, id pellentesque diam fermentum eget. Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec enim eleifend dapibus.",
    requirement:
      "-Lorem ipsum dolor sit amet, consectetur adipiscing -elit Aenean aliquam turpis eget egestas porta.  -Quisque tristique nunc ut sem pretium bibendum. -Phasellus sit amet turpis laoreet, mattis elit ut, luctus ligula. -Nullam blandit arcu eget justo hendrerit finibus.",
    optionalRequirement:
      "- Lorem ipsum dolor sit amet, consectetur adipiscing elit - Maecenas vel metus imperdiet, malesuada dolor a, pulvinar tellus.",
  },
  {
    id: "4",
    jobTitle: "The job title 4",
    openOn: "07/11/20",
    jobsStatus: true,
    totalCandidate: "5",
    candidateOnTrack: "2",
    jobType: "Full Time",
    minSalary: "2.0k",
    maxSalary: "2.5k",
    companyName: "Manufactoring",
    aboutTheJob:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis diam fringilla, luctus lectus dictum, volutpat lacus. Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus dapibus egestas. Etiam dolor neque, posuere at purus cursus, molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan ut sit amet odio. Nam maximus varius leo, et porttitor ante sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed fringilla nunc leo, a euismod ipsum aliquet placerat. Integer suscipit semper mi, sit amet mollis augue mollis in. Proin vestibulum accumsan elit, id pellentesque diam fermentum eget. Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec enim eleifend dapibus.",
    requirement:
      "-Lorem ipsum dolor sit amet, consectetur adipiscing -elit Aenean aliquam turpis eget egestas porta.  -Quisque tristique nunc ut sem pretium bibendum. -Phasellus sit amet turpis laoreet, mattis elit ut, luctus ligula. -Nullam blandit arcu eget justo hendrerit finibus.",
    optionalRequirement:
      "- Lorem ipsum dolor sit amet, consectetur adipiscing elit - Maecenas vel metus imperdiet, malesuada dolor a, pulvinar tellus.",
  },
];

function ViewJobs() {
  const [select, setSelect] = useState("option1");
  const userRole = localStorage.getItem("role");
  const { fistLogIn } = useVadilation();
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };

  /* const  handleCloseBtn = event => {
    const value= event.target.value
    setDisable(value)
    if(disable === disable){

    }
  } */

  //const [color,setColor]=useState('#f48fb1');
  //const [textColor,setTextColor]=useState('white');

  //const { jobsStatus, setJobsStatus } = JobsDataProvider();

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
              className="form-check-input form-check-input appearance-none rounded-full h-3 w-3 border border-pink-400 bg-white checked:bg-pink-400 checked:border-pink-400 focus:outline-none cursor-pointer transition duration-200"
              type="radio"
              id="all"
              name="filter"
              value="option1"
              checked={select === "option1"}
              onChange={(event) => handleSelectChange(event)}
            />

            <label htmlFor="all">
              {" "}
              <HeadingText3>All</HeadingText3>
            </label>
          </RadioForm1>

          <RadioForm1>
            <RadioBtn
              className="form-check-input form-check-input appearance-none rounded-full h-3 w-3 border border-pink-400 bg-white checked:bg-pink-400 checked:border-pink-400 focus:outline-none cursor-pointer transition duration-200"
              type="radio"
              id="trackedCandidate"
              name="filter"
              value="option2"
              checked={select === "option2"}
              onChange={(event) => handleSelectChange(event)}
            />
            <label htmlFor="trackedCandidate">
              <HeadingText3>With candidates on track</HeadingText3>
            </label>
          </RadioForm1>

          <RadioForm1>
            <RadioBtn
              className="form-check-input form-check-input appearance-none rounded-full h-3 w-3 border border-pink-400 bg-white checked:bg-pink-400 checked:border-pink-400 focus:outline-none cursor-pointer transition duration-200"
              type="radio"
              id="closed"
              name="filter"
              value="option3"
              checked={select === "option3"}
              onChange={(event) => handleSelectChange(event)}
            />
            <label htmlFor="closed">
              <HeadingText3>closed</HeadingText3>
            </label>
          </RadioForm1>
        </RadioForm>
      </Heading>

      <Heading1>
        <Text5>4 Jobs posting found</Text5>
      </Heading1>
      {datas.map((data) => {
        return (
          <Job
            id={data.id}
            jobTitle={data.jobTitle}
            companyName={data.companyName}
            jobsStatus={data.jobsStatus}
            jobType={data.jobType}
            minSalary={data.minSalary}
            maxSalary={data.maxSalary}
            openOn={data.openOn}
            totalCandidate={data.totalCandidate}
            candidateOnTrack={data.candidateOnTrack}
            aboutTheJob={data.aboutTheJob}
            requirement={data.requirement}
            optionalRequirement={data.optionalRequirement}
          />
        );
      })}
    </Content>
  );

  function Job(props) {
    const [toggle, setToggle] = useState(false);

    const closeJobStatus = (index) => {
      datas[index].jobsStatus = false;
      console.log(index);
      console.log(datas[index].jobsStatus);
    };

    //const [jobsStatus, setJobsStatus] = useState(false);

    return (
      <div>
        <Jobcard key={datas.id}>
          <JobCardHeader>
            <JobCardHeader1>
              <div>
                <JobTitle>{props.jobTitle}</JobTitle>
              </div>
              <JobCardHeader1Left>
                <JobCardHeader1Left1>
                  <Img>
                    <img src={building} />
                  </Img>
                  <div>
                    <Text1>{props.companyName}</Text1>
                  </div>
                </JobCardHeader1Left1>
                <JobCardHeader1Left2>
                  <Img>
                    <img src={calendar} />
                  </Img>
                  <div>
                    <Text1>{props.jobType}</Text1>
                  </div>
                </JobCardHeader1Left2>
                <JobCardHeader1Left2>
                  <Img>
                    <img src={money} />
                  </Img>
                  <div>
                    <Text1>
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
                <Text2>Open on</Text2> <Text2>{props.openOn}</Text2>
              </JobCardHeader2Left5>
              <JobCardHeader2Left2>
                <JobCardHeader2Left3>
                  <Img>
                    <img src={account} />
                  </Img>
                  <Text2>{props.totalCandidate}</Text2>{" "}
                </JobCardHeader2Left3>
                <Text2>Total</Text2> <Text2>Candidates</Text2>
              </JobCardHeader2Left2>
              <JobCardHeader2Left2>
                <JobCardHeader2Left3>
                  <Img>
                    <img src={account} />
                  </Img>
                  <Text2>{props.candidateOnTrack}</Text2>{" "}
                </JobCardHeader2Left3>
                <Text2>Candidates </Text2> <Text2> on track</Text2>
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
                {props.jobsStatus ? (
                  <CloseJobButton
                    className="btn btn-md"
                    type="button"
                    onClick={() => {
                      closeJobStatus(props.id - 1);
                    }}
                    isActive={props.jobsStatus}
                  >
                    <CloseDiv>
                      <Img2>
                        <img src={close} />
                      </Img2>
                      <Text3>ClOSE</Text3>
                    </CloseDiv>
                  </CloseJobButton>
                ) : (
                  <CloseJobButton
                    className="btn btn-md"
                    type="button"
                    isActive={props.jobsStatus}
                    disabled
                  >
                    <CloseDiv>
                      <Img2>
                        <img src={close} />
                      </Img2>
                      <Text3>ClOSED</Text3>
                    </CloseDiv>
                  </CloseJobButton>
                )}
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
  color: var(--primary-text-color);
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

  width: 280px;
`;
const RadioBtn = styled.input`
  /* accent-color: var(--secoundary-brand-color); */
  /* color: violet; */
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
const Text3 = styled.p`
  font-size: 14px;
  font-family: var(--seconary-font);
  color: var(--black);
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
  justify-content: space-between;
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
  width: 180px;
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
  width: 70px;
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
      ? "var(--primary-brand-color)"
      : "var(--tertiary-text-color)"};
`;
