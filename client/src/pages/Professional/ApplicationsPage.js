import styled from "@emotion/styled";
import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import axios from "axios";
// components ----------------------------------
import RadioFilter from "../../components/SharedComponents/RadioFilter";
import ApplicationToggle from "../../components/P-Page-Applications/ApplicationToggle";
// Hooks ------------------------------------

function ApplicationsPage() {
  const [applications, setApplication] = useState([]);
  const [filterApllication, setFilterApplication] = useState("all");
  const [user, setUser] = useState({});
  const [userJobs, setUserJobs] = useState({});
  const [companiesData, setCompaniesData] = useState({});
  const professionalId = localStorage.getItem("id");
  const appplicationId = localStorage.getItem("applicationId");
  // ดึงข้อมูลใบสมัครมาแสดงผลใน UI (map) ------------------------------------
  const url = `http://localhost:4000/users/${professionalId}`;

  const getApplications = async () => {
    try {
      const results = await axios.get(url);
      setApplication(_.reverse(results?.data?.applications)); // reverse data เพื่อให้แสดงใบสมัครล่าสุดจากใหม่ -> เก่า
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
  // fx ลบใบสมัคร
  const deleteApplication = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/applications/${appplicationId}`
      );
      localStorage.removeItem("applicationId");
    } catch (error) {
      console.log(error);
    }
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

  // เก็บข้อมูล radio เพื่อส่งไปใน component "RadioFilter" (shared component)
  const radioFilterData = [
    { value: "all", label: "All" },
    { value: "applied", label: "Waiting" },
    { value: "reviewing", label: "In progress" },
    { value: "finished", label: "Finished" },
    { value: "declined", label: "Declined" },
  ];

  // fx แสดงข้อมูลใบสมัครของ professional ทั้งหมด + ฟีลเตอร์ด้วย map
  const applicationsData = applications?.map((item, index) => {
    // หา jobId ที่อยู่ใน application ที่ตรงกับ jobId ใน jobDetail และ company detail ที่ lookup มา
    // ถ้าไม่หาข้อมูลจะ map ออกมามั่วมาก เพราะ jobDetail ไม่ได้เรียงตาม index ของ application ที่ user ส่งใบสมัครมา
    let jobDetail = _.find(userJobs, { _id: item?.jobId });
    let companyDetail = _.find(companiesData, { _id: jobDetail?.recruiterId });
    console.log("hi", companyDetail);
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
          apllicationCreatedDate={item?.appliedDate} // ไม่แปลงวันที่ตรงนี้เพราะจะเอาวันที่ไป reuse ตรง decline status ช่วงก่อน demo
          applicationStatus={item?.applicationStatus}
          personalExperience={user?.experience}
          education={user?.education}
          deleteApplication={deleteApplication}
          appId={item?._id}
          reFetch={reFetch}
        />
      );
    };
    // ถ้าสิ่งที่ user เลือก ตรงกันกับ สถานะใบสมัคร ให้แสดงแค่ข้อมูลก้อนนั้นออกมา
    if (filterApllication === "all") {
      return data();
      // ถ้า user เลือก all ให้แสดงข้อมูลทั้งหมดออกมาเลย
    } else if (filterApllication === item?.applicationStatus) {
      return data();
    }
  });

  // นับจำนวนใบสมัครหลังจากที่ professional เลือกใบสมัครตามสถานะออกมาแล้ว
  const countData = applicationsData.filter((items) => {
    return items !== undefined;
  });
  useEffect(() => {
    getApplications();
    deleteApplication();
    reFetch();
  }, [appplicationId]);

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
        declined, finished, ก่อน demo อย่าลืมไปแก้ด้วย
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
