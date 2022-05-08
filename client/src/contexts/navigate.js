import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigateContext = React.createContext();

function NavigateProvider(props) {
  const navigate = useNavigate();

  // Navbar -----------------------------------
  const homePageRoute = () => {
    navigate("/");
  };
  const navBarLinkChecker = (index) => {
    if (index === 0) {
      console.log("Register");
      navigate("/register");
    } else if (index === 1) {
      console.log("Login");
      navigate("/login");
    }
  };

  // Homepage -----------------------------------
  const registerRoute = () => {
    navigate("/register");
  };

  return (
    <NavigateContext.Provider
      value={{ homePageRoute, navBarLinkChecker, registerRoute }}
    >
      {props.children}
    </NavigateContext.Provider>
  );
}

const useNav = () => React.useContext(NavigateContext);

export { NavigateProvider, useNav };
