import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
// Components
import JobCard from "../../components/SharedComponents/JobCard";
function FollowingPage() {
  return (
    <Wrapper>
      <JobCard />
    </Wrapper>
  );
}

export default FollowingPage;
const Wrapper = styled.section`
  width: 65%;
  margin: auto;
  margin-bottom: 100px;
  padding-top: 2rem;
`;
