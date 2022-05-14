import React, { useState } from "react";
// Contexts
import { useUserData } from "./usersData";

const VadilationContext = React.createContext();

function VadilationProvider(props) {
  const { password, email, passwordConfirmed } = useUserData();
  // Others -----------------------------------------
  const [roleBtn, setRoleBtn] = useState("");
  // This Zone is for Register form vadilate only -------------------------------------
  const [step, setStep] = useState(0);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorRoleRec, setIsErrorRoleRec] = useState(false);
  const [isErrorRolePro, setIsErrorRolePro] = useState(false);

  // Form Vadilate Checker Fx -----------------------------------
  const ifInputIsBlank = () => {
    // if input is blank
    if (password === "" || email === "") {
      if (password === "") {
        setIsErrorPassword(true);
      } else if (email === "") {
        setIsErrorEmail(true);
      }
    } else {
      if (!password === "") {
        setIsErrorPassword(false);
      } else if (!email === "") {
        setIsErrorEmail(true);
      }
    }
  };

  const ifPasswordIsBlank = () => {
    // if password & confirm password is blank
    if (password === "" && passwordConfirmed === "") {
      setIsErrorPassword(true);
      console.log("hi");
    }
    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      //  if email is not validattion
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
  };

  const ifPassWordIsNotCorrect = () => {
    // if password is not correct
    if (password !== passwordConfirmed) {
      setIsErrorPassword(true);
    } else if (
      password === passwordConfirmed &&
      password !== "" &&
      passwordConfirmed !== ""
    ) {
      setIsErrorPassword(false);
    }
  };

  const nextFormVadilateChecker = () => {
    ifInputIsBlank();
    ifPasswordIsBlank();
    ifPassWordIsNotCorrect();
    // if all correct
    if (
      password === passwordConfirmed &&
      password !== "" &&
      passwordConfirmed !== "" &&
      email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ) {
      setStep(step + 1);
      setIsErrorEmail(false);
      setIsErrorPassword(false);
    }
  };
  return (
    <VadilationContext.Provider
      value={{
        // Others -----------------------------------------
        roleBtn,
        setRoleBtn,
        // This Zone is for Register form vadilate only -------------------------------------
        step,
        setStep,
        isErrorEmail,
        setIsErrorEmail,
        isErrorPassword,
        setIsErrorPassword,
        isErrorRoleRec,
        setIsErrorRoleRec,
        isErrorRolePro,
        setIsErrorRolePro,
        // vadilate fx only -------------------------------------
        ifInputIsBlank,
        ifPasswordIsBlank,
        ifPassWordIsNotCorrect,
        nextFormVadilateChecker,
      }}
    >
      {props.children}
    </VadilationContext.Provider>
  );
}

const useVadilation = () => React.useContext(VadilationContext);

export { VadilationProvider, useVadilation };
