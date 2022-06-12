import styled from "@emotion/styled";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
import { useNav } from "../../contexts/navigate";
// Hooks --------------------------------------
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useUtils } from "../../contexts/utilsContext";
//Components ------------------------------------
import CompanyHeader from "../../components/SharedComponents/CompanyHeader";
import JobDetails from "../../components/SharedComponents/JobDetails";
import AlertDialog from "../../components/Utilities/AlertDialog";
import CircularIndeterminate from "../../components/Utilities/CircularIndeterminate";
import BackDropLoading from "../../components/Utilities/BackDropLoading";
// Pictures -------------------------------------
import UserStatusCheckerBtn from "../../components/SharedComponents/UserStatusCheckerBtn";
import { height } from "@mui/system";

function SeeMorePage() {
  // เก็บเอา userId และ jobId จาก localStorage เพื่อเอาไปใช้ต่อ
  const professionalId = localStorage.getItem("id");
  const jobId = localStorage.getItem("jobId");
  // -----------------------------------------------------
  const navigate = useNavigate();
  const { job, setJob } = useJobsData();
  const { setMenuIndex } = useNav();
  const { loading, setLoading, setIsAlert, setAlertMessage } = useUtils();

  // ดีงข้อมูลงานมาแสดง ----------------------------------
  const fetchData = async () => {
    setLoading(true);
    function getOneJob() {
      return axios.get(`http://localhost:4000/jobs/${jobId}`);
    }
    function getButtonStatus() {
      return axios.get(`http://localhost:4000/users/${professionalId}`);
    }
    try {
      await Promise.all([getOneJob(), getButtonStatus()]).then(function (
        results
      ) {
        setJob(results[0].data.data);
      });
    } catch (error) {
      process.stdin.resume();
      process.stdin.setEncoding("utf8");

      process.stdin.on("data", function (data) {
        if (data === "exit\n") process.exit();
      });
      console.log(error);
      navigate("*");
    } finally {
      setTimeout(function () {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // fx สร้างใบสมัครงาน ----------------------------------
  const createApplication = async (data) => {
    await axios.post("http://localhost:4000/applications/create", data);
  };

  // Check user condition ว่ามีเอกสารและข้อมูลสำหรับสมัครงานมั้ย -------------------------
  const { data, reFetch } = useFetch(
    `http://localhost:4000/users/${professionalId}`
  );
  const checkUserProfile = async (event) => {
    const handleSubmit = () => {
      const applicationStatus = ["applied", "reviewing", "finished"];
      const randomStatus =
        applicationStatus[Math.floor(Math.random() * applicationStatus.length)];

      event.preventDefault();
      const data = {
        professionalId,
        jobId,
        appliedDate: Date.now(),
        applicationStatus: randomStatus,
      };
      createApplication(data);
    };
    if (
      data?.cvFiles?.[0] === undefined ||
      data?.cvFiles?.[0]?.url === null ||
      data?.phone === "" ||
      data?.phone === "-" ||
      data?.name === "" ||
      data?.name === "-"
    ) {
      setAlertMessage(
        "Please upload your cv file, fill your name and phone before apply a job."
      );
      setIsAlert(true);
      navigate("/profile");
    } else {
      handleSubmit();
      setAlertMessage(`Congratulation! You already applied ${job?.jobTitle}!`);
      setIsAlert(true);
      setMenuIndex(2);
      reFetch();
      navigate("/applications");
    }
  };

  const contentData = [
    { title: "About The company name SA", content: job?.company?.[0].about }, // aboutCompany
    { title: "About the job position", content: job?.aboutJob }, // aboutJob
    { title: "Mandatory Requirements", content: job?.mandatoryReq }, // mandatoryReq
    { title: "Optional Requirements", content: job?.optionalReq }, // optionalReq
  ];

  return (
    <Wrapper>
      <BackDropLoading />
      <AlertDialog />
      {loading ? (
        <Box
          sx={{
            width: "100%",
          }}
        >
          <LinearProgress />
        </Box>
      ) : (
        <div>
          <Header>
            {/*โซนแสดงข้อมูลบริษัท Start Here -----------------------------  */}
            <CompanyWrapper>
              <HeaderLeft>
                <CompanyHeader />
              </HeaderLeft>
              <HeaderRight>
                <UserStatusCheckerBtn
                  mode="applynow"
                  fx={checkUserProfile}
                  jobId={jobId}
                  data={data}
                  reFetch={reFetch}
                />
              </HeaderRight>
            </CompanyWrapper>
            {/*โซนแสดงข้อมูลงาน Start Here -----------------------------  */}
            <HeaderTitleWrapper>
              <JobDetails />
            </HeaderTitleWrapper>
          </Header>
          {/*โซนแสดงรายละเอียดงาน Start Here -----------------------------  */}
          <ContentWrapper>
            {contentData.map((items, index) => {
              const { title, content } = items;
              return (
                <ContentBox key={index}>
                  <ContentHeading className="text-pinkprimary">
                    {title}
                  </ContentHeading>
                  <Content>{content}</Content>
                </ContentBox> //
              );
            })}
            <ContentFooter>
              <UserStatusCheckerBtn
                mode="applynow"
                fx={checkUserProfile}
                jobId={jobId}
                data={data}
                reFetch={reFetch}
              />
            </ContentFooter>
          </ContentWrapper>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 90%;
    padding: 25px;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 80px;
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    margin-left: 250px;
  }
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    margin-left: 250px;
    width: 80%;
  }
`;
const Header = styled.section`
  display: flex;
  flex-direction: column;
`;
const CompanyWrapper = styled.div`
  display: flex;
`;

const HeaderLeft = styled.div`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 70%;
  }
`;
const HeaderRight = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    visibility: hidden;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 30%;
  }
`;
const HeaderTitleWrapper = styled.div`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    padding: 25px;
  }
`;
const ContentWrapper = styled.section``;
const ContentBox = styled.div`
  width: 80%;
  margin: 10px 0;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 90%;
  }
`;

const ContentHeading = styled.h3`
  font-size: 1.5rem;
`;
const Content = styled.p`
  font-size: 1rem;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

export default SeeMorePage;
