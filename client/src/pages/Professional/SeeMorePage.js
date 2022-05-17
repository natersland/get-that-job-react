import styled from "@emotion/styled";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//Contexts ------------------------------------
import { useJobsData } from "../../contexts/jobsData";
//Components ------------------------------------
import Alert from "@mui/material/Alert";
// Utils
import UtilitiesFunction from "../../utils/utilitiesFunction";

function SeeMorePage() {
  const { filterComma, textUpperCase, addCommas, removeCommas } =
    UtilitiesFunction();

  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  width: 65%;
  margin: auto;
`;

export default SeeMorePage;
