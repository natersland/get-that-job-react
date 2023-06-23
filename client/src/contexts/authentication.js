import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Contexts
import { useUserData } from "./usersData";
import { useVadilation } from "./vadilation";
import { useUtils } from "./utilsContext";
import { APIServiceContext } from "../service/API_Service";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const navigate = useNavigate();
  const { resetUserData, role, setRole, email, password } = useUserData();
  const { ifInputIsBlank } = useVadilation();
  const { setLoading, setIsAlert, setAlertMessage } = useUtils();
  const apiService = useContext(APIServiceContext);

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const isProfessional = localStorage.getItem("role") === "professional";
  const isRecruiter = localStorage.getItem("role") === "recruiter";
  const isRightAccount = localStorage.getItem("rightAcc");

  const removeLocalStorageData = () => {
    [
      "token",
      "role",
      "id",
      "rightAcc",
      "language",
      "name",
    ].forEach((key) => localStorage.removeItem(key));
  };

  const addDataToLocalStorage = (token, userDataFromToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userDataFromToken.role);
    localStorage.setItem("id", userDataFromToken.id);
    localStorage.setItem("language", userDataFromToken.language);
    localStorage.setItem("name", userDataFromToken.name);
    setState({ ...state, user: userDataFromToken });
  };

  const authenticatedWithRole = (userDataFromToken) => {
    if (userDataFromToken.role === role) {
      localStorage.setItem("rightAcc", true);
      const userName = userDataFromToken.name;
      const welcomeMessage = `Login Successful. Welcome ${
        userName !== "" && userName !== "-" ? userName : role
      }!`;
      setAlertMessage(welcomeMessage);
      setIsAlert(true);
      navigate(userDataFromToken.role === "professional" ? "/findjobs" : "/viewjobs");
    } else {
      setAlertMessage("Wrong account type. Please try again.");
      setIsAlert(true);
      removeLocalStorageData();
      navigate("/login");
    }
  };

  const login = async (data) => {
    ifInputIsBlank();
    try {
      const result = await apiService.login(data);
      const token = result.data.token;
      const userDataFromToken = jwtDecode(token);

      addDataToLocalStorage(token, userDataFromToken);
      authenticatedWithRole(userDataFromToken);
      resetUserData();
      setRole("professional");
    } catch (error) {
      console.log(error);
      setAlertMessage("Wrong password or account, please try again.");
      setIsAlert(true);
    }
  };

  const register = async (data) => {
    try {
      await apiService.register(data);
      setTimeout(() => {
        login({
          email,
          password,
        });
        setLoading(false);
        navigate("/");
      }, 250);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      removeLocalStorageData();
      setState({ ...state, user: null, error: null });
      navigate("/");
      setLoading(false);
    }, 500);
  };

  const authContextValue = {
    state,
    login,
    logout,
    register,
    isAuthenticated,
    isProfessional,
    isRecruiter,
    isRightAccount,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
