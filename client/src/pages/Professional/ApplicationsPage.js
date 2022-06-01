import styled from "@emotion/styled";
import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import axios from "axios";
// components ----------------------------------
import RadioFilter from "../../components/SharedComponents/RadioFilter";
import ApplicationToggle from "../../components/PRO-Applications/ApplicationToggle";
// Hooks ------------------------------------
function ApplicationsPage() {
  const [applications, setApplication] = useState([]);
  const [filterApllication, setFilterApplication] = useState("all");
  const [user, setUser] = useState({});
  const [userJobs, setUserJobs] = useState({});
  const [companiesData, setCompaniesData] = useState({});
  const professionalId = localStorage.getItem("id");
  // ดึงข้อมูลใบสมัครมาแสดงผลใน UI (map) ------------------------------------
  const url = `http://localhost:4000/users/${professionalId}`;
  const getApplications = async () => {
    try {
      const results = await axios.get(url);
      // reverse data เพื่อให้แสดงใบสมัครล่าสุดจากใหม่ -> เก่า
      setApplication(_.reverse(results?.data?.applications));
      setUserJobs(results?.data?.jobDetail);
      setUser(results.data);
      setCompaniesData(results?.data?.companyDetail);
    } catch (error) {
      console.log(error);
    }
    return {
      applications,
    };
  };
  // reFecth ข้อมูลใหม่ เพื่ออัพเดตข้อมูลหลังจากลบใบสมัครไปแล้ว
  const reFetch = async () => {
    try {
      const results = await axios.get(url);
      setApplication(_.reverse(results?.data?.applications));
    } catch (err) {
      console.log(err);
    }
  };

  // fx เปลี่ยนสเตตัสใบสมัคร ----------------------------------------------
  const changeApplicationStatus = async (e) => {
    const appplicationIdforStatus = localStorage.getItem("applicationId");
    try {
      e.preventDefault();
      const data = { applicationStatus: "declined" };
      await axios.patch(
        `http://localhost:4000/applications/${appplicationIdforStatus}`,
        data
      );
      reFetch();
    } catch (error) {
      console.log(error);
    }
  };

  // fx ลบใบสมัคร ----------------------------------------------
  const deleteApplication = async () => {
    const appplicationIdforDelete = localStorage.getItem("applicationId");
    try {
      await axios.delete(
        `http://localhost:4000/applications/${appplicationIdforDelete}`
      );
      localStorage.removeItem("applicationId");
      reFetch();
    } catch (error) {
      console.log(error);
    }
  };

  // เก็บข้อมูล radio เพื่อส่งไปใน component "RadioFilter" (shared component) ----------------
  const radioFilterData = [
    { value: "all", label: "All" },
    { value: "applied", label: "Waiting" },
    { value: "reviewing", label: "In progress" },
    { value: "finished", label: "Finished" },
    { value: "declined", label: "Declined" },
  ];

  // fx แสดงข้อมูลใบสมัครของ professional ทั้งหมด + ฟีลเตอร์ด้วย map ----------------------------------------------
  const applicationsData = applications?.map((applicationData, index) => {
    // หา jobId ที่อยู่ใน application ที่ตรงกับ jobId ใน jobDetail และ company detail ที่ lookup มา
    // ถ้าไม่หาข้อมูลจะ map ออกมามั่วมาก เพราะ jobDetail ไม่ได้เรียงตาม index ของ application ที่ user ส่งใบสมัครมา
    let jobDetail = _.find(userJobs, { _id: applicationData?.jobId });
    let companyDetail = _.find(companiesData, { _id: jobDetail?.recruiterId });
    const data = () => {
      return (
        <ApplicationToggle
          key={index}
          companyLogo={companyDetail?.companyLogo[0].url}
          jobTitle={jobDetail?.jobTitle}
          jobCategory={jobDetail?.jobCategory} // jobId
          JobType={jobDetail?.jobType}
          jobMinSalary={jobDetail?.minSalary}
          jobMaxSalary={jobDetail?.maxSalary}
          companyName={companyDetail?.companyName}
          createdJobDate={moment(jobDetail?.createdJobDate).startOf().fromNow()}
          apllicationCreatedDate={moment(applicationData?.appliedDate)
            .startOf()
            .fromNow()}
          declinedDate={applicationData?.declinedDate}
          applicationStatus={applicationData?.applicationStatus}
          personalExperience={user?.experience}
          education={user?.education}
          deleteApplication={deleteApplication}
          appId={applicationData?._id}
          reFetch={reFetch}
          changeApplicationStatus={changeApplicationStatus}
        />
      );
    };
    // ถ้าสิ่งที่ user เลือก ตรงกันกับ สถานะใบสมัคร ให้แสดงแค่ข้อมูลก้อนนั้นออกมา
    if (filterApllication === "all") {
      return data();
      // ถ้า user เลือก all ให้แสดงข้อมูลทั้งหมดออกมาเลย
    } else if (filterApllication === applicationData?.applicationStatus) {
      return data();
    }
  });

  // นับจำนวนใบสมัครหลังจากที่ professional เลือกใบสมัครตามสถานะออกมาแล้ว
  const countData = applicationsData.filter((items) => {
    return items !== undefined;
  });
  useEffect(() => {
    getApplications();
    changeApplicationStatus();
    reFetch();
  }, []);

  return (
    <Wrapper>
      <HeaderSection>
        <SectionHeadingText>Your applications</SectionHeadingText>
        {/* RadioFilter Component Here -------------------- */}
        <RadioFilter
          formlabel="Filter your applications"
          radioData={radioFilterData}
          stateVariable={filterApllication}
          setStateVariable={setFilterApplication}
        />
      </HeaderSection>
      <p className="bg-pinkprimary text-white p-2 mt-3">
        **เปลี่ยนให้ตอนกดสมัครงาน random สถานะใบสมัคร applied, reviewing,
        finished, ก่อน demo อย่าลืมไปแก้ด้วย
      </p>
      <ApplicationSection>
        <ApplicationFoundText>
          {applications?.length === 0 ? "0" : `${countData.length} `}{" "}
          {/*applications?.length*/}
          applications found
        </ApplicationFoundText>
        {/* ApplicationToggle Component Here -------------------- */}
        {applicationsData}
      </ApplicationSection>
    </Wrapper>
  );
}

export default ApplicationsPage;

const Wrapper = styled.div`
  /*   width: 65%;
  margin: 0 auto; */
  width: 94vw;
  padding-left: 325px;
  padding-bottom: 50px;
`;
const HeaderSection = styled.section``;
const SectionHeadingText = styled.h1`
  font-size: 2.125rem;
  padding-top: 1.5rem;
  padding-top: 20px 0;
`;
const ApplicationSection = styled.section``;
const ApplicationFoundText = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  padding: 10px 0;
`;
