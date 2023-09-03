import React from "react";
import styled from "@emotion/styled";
import { useNav } from "../../contexts/navigate";
import { useUserData } from "../../contexts/usersData";
import { useVadilation } from "../../contexts/vadilation";
import { useNavigate } from "react-router-dom";

function IAlreadyHaveAnAccount() {
  const { setMenuIndex } = useNav();
  const { setRole, resetUserData } = useUserData();
  const { setIsErrorEmail, setIsErrorPassword, setStep } = useVadilation();
  const navigate = useNavigate();

  return (
    <LoginText
      className=""
      onClick={() => {
        navigate("/login");
        resetUserData();
        setIsErrorEmail(false);
        setIsErrorPassword(false);
        setMenuIndex(1);
        setStep(0);
        setRole("professional");
      }}
    >
      I already have an account.
    </LoginText>
  );
}

export default IAlreadyHaveAnAccount;

const LoginText = styled.p`
  font-size: 0.85rem;
  margin-top: -28px;
  margin-bottom: 25px;
  cursor: pointer;
`;
