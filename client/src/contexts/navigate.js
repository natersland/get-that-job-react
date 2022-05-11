import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authentication";

const NavigateContext = React.createContext();

function NavigateProvider(props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  // State ------------------------------------
  const [menuIndex, setMenuIndex] = useState(null);

  // Navbar -----------------------------------
  const homePageRoute = () => {
    navigate("/");
    setMenuIndex(null);
  };
  const navBarLinkChecker = (index) => {
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

  const sidebarLinkChecker = (index) => {
    if (index === 0) {
      navigate("*");
      setMenuIndex(index + 1);
    } else if (index === 1) {
      navigate("/createjob");
      setMenuIndex(index + 1);
    } else if (index === 2) {
      navigate("/recruiter-profile");
      setMenuIndex(index + 1);
    } else if (index === 3) {
      logout();
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
