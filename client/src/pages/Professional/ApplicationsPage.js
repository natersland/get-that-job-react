import styled from "@emotion/styled";
import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import axios from "axios";
// components
import RadioFilter from "../../components/SharedComponents/RadioFilter";
import ApplicationToggle from "../../components/P-Page-Applications/ApplicationToggle";

function ApplicationsPage() {
  const [applications, setApplication] = useState([]);
  const [user, setUser] = useState({});
  const professionalId = localStorage.getItem("id");

  // ดึงข้อมูลใบสมัครมาแสดงผลใน UI (map) ------------------------------------
  const getApplications = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/users/${professionalId}`
      );
      setApplication(_.reverse(results?.data?.applications)); // reverse data เพื่อให้แสดงใบสมัครล่าสุดจากใหม่ -> เก่า
      setUser(results.data);
    } catch (error) {
      console.log(error);
    }
    return {
      applications,
    };
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <Wrapper>
      <HeaderSection>
        <SectionHeadingText>Your applications</SectionHeadingText>
        {/* RadioFilter Component Here -------------------- */}
        <RadioFilter />
      </HeaderSection>
      <ApplicationSection>
        <ApplicationFoundText>
          {applications?.length === 0 ? "0 " : `${applications?.length} `}
          applications found
        </ApplicationFoundText>
        {/* ApplicationToggle Component Here -------------------- */}
        {applications?.map((item, index) => {
          return (
            <ApplicationToggle
              key={index}
              companyLogo={item.companyLogo}
              jobTitle={item.jobTitle}
              jobCategory={item.jobCategory}
              JobType={item.JobType}
              jobMinSalary={item.jobMinSalary}
              jobMaxSalary={item.jobMaxSalary}
              companyName={item.companyName}
              createdJobDate={item.createdJobDate}
              apllicationCreatedDate={moment(item?.appliedDate)
                .startOf()
                .fromNow()}
              applicationStatus={item.applicationStatus}
              personalExperience={user?.experience}
              education={user?.education}
            />
          );
        })}
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
