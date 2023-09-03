import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//Contexts --------------------------------
import { useAuth } from "./authentication";
import { useUserData } from "./usersData";
import { useVadilation } from "./vadilation";

const NavigateContext = React.createContext();

function NavigateProvider(props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { setRole, resetUserData } = useUserData();
  const { setIsErrorEmail, setIsErrorPassword, setStep } = useVadilation();
  // State ------------------------------------
  const [menuIndex, setMenuIndex] = useState(1);

  // Navbar -----------------------------------
  const homePageRoute = () => {
    navigate("/");
    resetUserData();
    setStep(0);
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setMenuIndex(1);
  };
  const navBarLinkChecker = (index) => {
    resetUserData();
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setMenuIndex(1);
    setRole("professional");
    if (index === 1) {
      navigate("/register");
    } else if (index === 0) {
      navigate("/login");
      setMenuIndex(1);
    }
  };
  // Homepage -----------------------------------
  const registerRoute = () => {
    resetUserData();
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setMenuIndex(1);
    setStep(0);
    setRole("professional");
    navigate("/register");
  };
  // SideBar -----------------------------------

  const sidebarLinkChecker = (index, role) => {
    localStorage.removeItem("jobId");
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    if (role === "professional") {
      if (index === 0) {
        navigate("/findjobs"); // Find that job
        setMenuIndex(index + 1); // setMenuIndex มีไว้เพื่อเซ็ทให้เมื่อกด sidebar ที่ปุ่มหน้าไหนแล้วจะเปลี่ยนเป็นสีขาวตรงปุ่ม
      } else if (index === 1) {
        navigate("/applications"); // Your applications
        setMenuIndex(index + 1);
      } else if (index === 2) {
        navigate("/following"); // Following
        setMenuIndex(index + 1);
      } else if (index === 3) {
        navigate("/profile"); // Profile
        setMenuIndex(index + 1);
      } else if (index === 4) {
        logout(); // logout
      }
    } else {
      if (index === 0) {
        navigate("/viewjobs"); // Job Postings
        setMenuIndex(index + 1);
      } else if (index === 1) {
        navigate("/createjob"); // Create New Job
        setMenuIndex(index + 1);
      } else if (index === 2) {
        navigate("/profile"); // Profile
        setMenuIndex(index + 1);
      } else if (index === 3) {
        logout(); // Log out
      }
    }
  };

  return (
    <NavigateContext.Provider
      value={{
        homePageRoute,
        navBarLinkChecker,
        registerRoute,
        sidebarLinkChecker,
        menuIndex,
        setMenuIndex,
      }}
    >
      {props.children}
    </NavigateContext.Provider>
  );
}

const useNav = () => React.useContext(NavigateContext);

export { NavigateProvider, useNav };
