import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authentication";

//Contexts
import { useUserData } from "./usersData";
import { useVadilation } from "./vadilation";

const NavigateContext = React.createContext();

function NavigateProvider(props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { setRole, resetUserData } = useUserData();
  const { setIsErrorEmail, setIsErrorPassword } = useVadilation();
  // State ------------------------------------
  const [menuIndex, setMenuIndex] = useState(1);

  // Navbar -----------------------------------
  const homePageRoute = () => {
    navigate("/");
    resetUserData();
    setMenuIndex(null);
  };
  const navBarLinkChecker = (index) => {
    resetUserData();
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setRole("professional");
    if (index === 0) {
      navigate("/register");
    } else if (index === 1) {
      navigate("/login");
    }
  };
  // Homepage -----------------------------------
  const registerRoute = () => {
    navigate("/register");
  };
  // SideBar -----------------------------------

  const sidebarLinkChecker = (index, role) => {
    localStorage.removeItem("jobId");
    if (role === "professional") {
      if (index === 0) {
        navigate("/findjobs"); // Find that job
        setMenuIndex(index + 1); // setMenuIndex มีไว้เพื่อเซ็ทให้เมื่อกด sidebar ที่ปุ่มหน้าไหนแล้วจะเปลี่ยนเป็นสีขาวตรงปุ่ม
      } else if (index === 1) {
        navigate("*"); // Your applications
        setMenuIndex(index + 1);
      } else if (index === 2) {
        navigate("*"); // Following
        setMenuIndex(index + 1);
      } else if (index === 3) {
        navigate("*"); // Profile
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
